const fs = require('fs');
const path = require('path');

const POSTS_DIR = path.join(__dirname, 'blog/posts');
const OUTPUT_FILE = path.join(__dirname, 'blog/posts.json');

function generateIndex() {
    const files = fs.readdirSync(POSTS_DIR).filter(file => file.endsWith('.md'));
    const posts = [];

    files.forEach(file => {
        const fullPath = path.join(POSTS_DIR, file);
        const content = fs.readFileSync(fullPath, 'utf-8');
        
        const match = content.match(/^---([\s\S]*?)---/);
        
        if (match) {
            const header = match[1];
            const body = content.replace(match[0], '').trim();
            
            const wordCount = body.split(/\s+/).length;
            const readTime = Math.max(1, Math.ceil(wordCount / 200));

            const lines = header.trim().split('\n');
            const metadata = {};
            
            lines.forEach(line => {
                const [key, ...value] = line.split(':');
                if (key) metadata[key.trim()] = value.join(':').trim();
            });

            posts.push({
                id: file.replace('.md', ''),
                title: metadata.title || "Untitled Post",
                date: metadata.date || "Unknown Date",
                readTime: readTime,
                tags: metadata.tags ? metadata.tags.split(/[\s,]+/).filter(t => t) : [],
                filePath: `posts/${file}`
            });
        }
    });

    posts.sort((a, b) => new Date(b.date) - new Date(a.date));

    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(posts, null, 2));
    console.log(`Success: ${posts.length} posts indexed.`);
}

generateIndex();