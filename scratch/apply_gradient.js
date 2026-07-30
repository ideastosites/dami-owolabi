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

const replacements = [
  // For larger sections (often using bg-[#02232A])
  ['bg-[#02232A]', 'bg-gradient-to-br from-[#02232A] to-[#054753]'],
  // For buttons/components using bg-[#054753]
  ['bg-[#054753]', 'bg-gradient-to-r from-[#054753] to-[#02232A]'],
];

// Revert tiny elements that shouldn't have gradients
const reverts = [
  ['h-px bg-gradient-to-r from-[#054753] to-[#02232A]', 'h-px bg-[#054753]'],
  ['border-[#054753]', 'border-[#054753]'], // border is border anyway
  ['hover:bg-gradient-to-r from-[#054753] to-[#02232A]', 'hover:bg-[#054753]'], // hover gradients don't animate well
  ['hover:bg-gradient-to-br from-[#02232A] to-[#054753]', 'hover:bg-[#02232A]'],
];

files.forEach(file => {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    let original = content;
    
    // Specifically handle the gradient replacement
    replacements.forEach(([from, to]) => {
      content = content.split(from).join(to);
    });
    
    reverts.forEach(([from, to]) => {
      content = content.split(from).join(to);
    });
    
    // Fix Navbar's border and hover classes where they were incorrectly modified if at all
    content = content.replace(/hover:bg-gradient-to-r from-\[\#054753\] to-\[\#02232A\]/g, 'hover:bg-[#054753]');

    if (content !== original) {
      fs.writeFileSync(file, content, 'utf8');
      console.log('Updated', file);
    }
  }
});
