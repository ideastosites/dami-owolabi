const fs = require('fs');
const path = require('path');

function walk(dir) {
    let results = [];
    if (!fs.existsSync(dir)) return results;
    const list = fs.readdirSync(dir);
    list.forEach(function(file) {
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) { 
            results = results.concat(walk(file));
        } else { 
            if (file.endsWith('.tsx') || file.endsWith('.ts')) {
                results.push(file);
            }
        }
    });
    return results;
}

const files = walk('app').concat(walk('components'));

files.forEach(file => {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    let original = content;
    
    // 1. Revert everything back to flat colors
    content = content.split('bg-gradient-to-br from-[#02232A] to-[#054753]').join('bg-[#02232A]');
    content = content.split('bg-gradient-to-r from-[#054753] to-[#02232A]').join('bg-[#054753]');

    // 2. Apply gradient ONLY to specific section/footer backgrounds
    
    // Footer in Footer.tsx
    content = content.replace(/<footer className="([^"]*)bg-\[\#02232A\]([^"]*)"/g, '<footer className="$1bg-gradient-to-br from-[#02232A] to-[#054753]$2"');
    
    // Section in Roundtable and Forge Room
    content = content.replace(/<section([^>]*)className="([^"]*)bg-\[\#02232A\]([^"]*)"/g, '<section$1className="$2bg-gradient-to-br from-[#02232A] to-[#054753]$3"');
    
    // Specific large cards in Academy and BrandForge pages
    content = content.replace(/<div className="bg-\[\#02232A\] text-white p-8 sm:p-10 border-t-4 border-\[\#439aa9\] shadow-xl relative">/g, '<div className="bg-gradient-to-br from-[#02232A] to-[#054753] text-white p-8 sm:p-10 border-t-4 border-[#439aa9] shadow-xl relative">');
    content = content.replace(/<div className="bg-\[\#02232A\] rounded-xl p-8 text-white shadow-xl">/g, '<div className="bg-gradient-to-br from-[#02232A] to-[#054753] rounded-xl p-8 text-white shadow-xl">');

    if (content !== original) {
      fs.writeFileSync(file, content, 'utf8');
      console.log('Updated', file);
    }
  }
});
