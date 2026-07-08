# Dami Owolabi Personal Brand Website

Welcome to the development repository for the Dami Owolabi personal brand website project. We are using Next.js, Tailwind CSS, and collaborating via Antigravity and GitHub Desktop.

## 🚀 The Golden Git Rules
1. **NEVER commit directly to the `main` branch.** The `main` branch is for fully working, approved production code only.
2. **Always create a feature branch** before writing any code. Open GitHub Desktop, ensure your current branch is `main`, click **New Branch**, and name it based on your assigned page (e.g., `feature/contact-page`).
3. When your page is fully built and tested, push your branch to GitHub and open a **Pull Request (PR)** for review.

## 🎨 Design System & Code Quality
* Before prompting Antigravity, you **MUST** read the `DESIGN_SYSTEM.md` file in the root directory.
* All copy, layout rules, forms, and headers must be pulled verbatim from the `Website - FINAL.docx` asset file. Do not invent text.
* Ensure your layouts are completely responsive across mobile, tablet, and desktop breakpoints before submitting a Pull Request.

## 🤖 Standard Antigravity Prompt (Use This!)
When starting your page build in Antigravity, copy and paste this exact prompt to ensure consistency:

"Act as an expert Next.js and Tailwind CSS developer. Before writing any code, read the `DESIGN_SYSTEM.md` file in the root directory to understand the design pillars, typography, and strict color palette. 

Your task is to build the [INSERT YOUR PAGE NAME] page.
1. Use the exact text provided in the `Website - FINAL.docx` reference document. Do not invent or summarize copy.
2. Ensure the layout is fully responsive across mobile, tablet, and desktop.
3. Use the global `<Navbar>` and `<Footer>` components that already exist in the layout file. Do not regenerate or override them.
4. Ensure all styling strictly adheres to the Tailwind configuration and the `DESIGN_SYSTEM.md` guidelines.

Output the component code for this page."