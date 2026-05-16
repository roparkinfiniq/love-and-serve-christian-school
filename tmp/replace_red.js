import fs from 'fs';
import path from 'path';

function walkDir(dir) {
    fs.readdirSync(dir).forEach(f => {
        let dirPath = path.join(dir, f);
        let isDirectory = fs.statSync(dirPath).isDirectory();
        if (isDirectory) {
            walkDir(dirPath);
        } else if (f.endsWith('.tsx') || f.endsWith('.ts')) {
            let content = fs.readFileSync(dirPath, 'utf8');
            let newContent = content.replace(/hover:bg-red-700/g, 'hover:bg-rose-500');
            newContent = newContent.replace(/focus:ring-red-500/g, 'focus:ring-rose-500');
            newContent = newContent.replace(/hover:text-red-700/g, 'hover:text-rose-400');
            newContent = newContent.replace(/group-hover:text-red-700/g, 'group-hover:text-rose-400');
            if (content !== newContent) {
                fs.writeFileSync(dirPath, newContent, 'utf8');
                console.log('Fixed', dirPath);
            }
        }
    });
}

walkDir('./components');
walkDir('./');
