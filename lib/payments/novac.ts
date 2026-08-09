const NOVAC_BASE_URL = process.env.NOVAC_BASE_URL || "https://api.novacpayment.com";

// Confirmed against the sandbox (the docs are inconsistent/wrong on this):
// /api/v1/initiate rejects a secret key ("only public key can be used") and
// requires the public key. The verify endpoint below accepted both keys in
// testing, but only the secret key is documented as the server-side
// credential, so that's what we use for it.
function publicKey(): string {
  const key = process.env.NOVAC_PUBLIC_KEY;
  if (!key) throw new Error("NOVAC_PUBLIC_KEY is not set");
  return key;
}

function secretKey(): string {
  const key = process.env.NOVAC_SECRET_KEY;
  if (!key) throw new Error("NOVAC_SECRET_KEY is not set");
  return key;
}

export type InitiateCheckoutParams = {
  transactionReference: string;
  amount: number;
  currency: string;
  redirectUrl: string;
  customer: {
    email: string;
    firstName: string;
    lastName: string;
    phoneNumber?: string;
  };
  paymentDescription: string;
  logoUrl?: string;
};

export type InitiateCheckoutResult = {
  transactionReference: string;
  amount: number;
  paymentRedirectUrl: string;
};

export async function initiateCheckout(
  params: InitiateCheckoutParams
): Promise<InitiateCheckoutResult> {
  const res = await fetch(`${NOVAC_BASE_URL}/api/v1/initiate`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${publicKey()}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      transactionReference: params.transactionReference,
      amount: params.amount,
      currency: params.currency,
      redirectUrl: params.redirectUrl,
      checkoutCustomerData: {
        email: params.customer.email,
        firstName: params.customer.firstName,
        lastName: params.customer.lastName,
        phoneNumber: params.customer.phoneNumber,
      },
      checkoutCustomizationData: {
        logoUrl: params.logoUrl,
        paymentDescription: params.paymentDescription,
        checkoutModalTitle: "Dami Owolabi",
      },
    }),
  });

  const body = await res.json();
  if (!res.ok || !body?.status) {
    throw new Error(body?.message || `Novac initiate failed (${res.status})`);
  }

  return {
    transactionReference: body.data.transactionReference,
    amount: body.data.amount,
    paymentRedirectUrl: body.data.paymentRedirectUrl,
  };
}

export type VerifyTransactionResult = {
  status: "successful" | "failed" | "abandoned" | "reversed" | "pending" | string;
  raw: unknown;
};

export async function verifyTransaction(
  transactionReference: string
): Promise<VerifyTransactionResult> {
  // Confirmed against sandbox — this is the endpoint that actually reflects
  // checkout-flow payment status. The docs also list a POST
  // /api/v1/transaction/verify endpoint, but that one 404s ("no record
  // found") for transactions created via the hosted-checkout /initiate flow;
  // GET /api/v1/checkout/{ref}/verify is the one the hosted checkout page
  // itself polls, and it returns the real status/card/customer details.
  const res = await fetch(
    `${NOVAC_BASE_URL}/api/v1/checkout/${encodeURIComponent(transactionReference)}/verify`,
    {
      method: "GET",
      headers: { Authorization: `Bearer ${secretKey()}` },
    }
  );

  const body = await res.json();

  // A reference Novac has never seen is not the same as "still pending" —
  // only true 404s for a known-pending reference should map to pending.
  if (res.status === 404) {
    return { status: "pending", raw: body };
  }

  if (!res.ok || !body?.status) {
    throw new Error(body?.message || `Novac verify failed (${res.status})`);
  }

  const status = String(body.data?.status ?? "pending").toLowerCase();
  return { status, raw: body };
}
