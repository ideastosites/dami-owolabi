const fs = require('fs');
const path = require('path');

const filesToUpdate = [
  'app/brandforge/academy/page.tsx',
  'app/brandforge/page.tsx',
  'app/brandforge/roundtable/page.tsx',
  'app/brandforge/the-brandforge-network/page.tsx',
  'app/brandforge/the-forge-room/page.tsx',
  'app/contact/page.tsx'
];

filesToUpdate.forEach(file => {
  const filePath = path.join(__dirname, '..', file);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Replace the specific root container classes that contain bg-white
    content = content.replace('className="w-full bg-white text-[#0A0A0A] font-sans min-h-screen relative"', 'className="w-full text-[#0A0A0A] font-sans min-h-screen relative"');
    content = content.replace('className="w-full bg-white text-[#0A0A0A] font-sans min-h-screen"', 'className="w-full text-[#0A0A0A] font-sans min-h-screen"');
    content = content.replace('className="w-full bg-white text-[#0A0A0A] font-sans"', 'className="w-full text-[#0A0A0A] font-sans"');
    content = content.replace('className="w-full bg-white flex justify-center py-12 md:py-16 px-6 md:px-10 lg:px-20"', 'className="w-full flex justify-center py-12 md:py-16 px-6 md:px-10 lg:px-20"');

    fs.writeFileSync(filePath, content, 'utf8');
    console.log('Updated ' + file);
  }
});
