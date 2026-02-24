const fs = require('fs');
const path = require('path');
const title = process.argv.slice(2).join(' ');

if (!title) {
    console.error('Please provide a title. Usage: node new-post.js "Your Post Title"');
    process.exit(1);
}

const slug = title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
const filename = `${slug}.md`;
const filePath = path.join(__dirname, 'blog/posts', filename);

if (fs.existsSync(filePath)) {
    console.error(`A post with the name "${filename}" already exists.`);
    process.exit(1);
}

const date = new Date().toLocaleDateString('en-US', {
    month: 'short',
    day: '2-digit',
    year: 'numeric'
});

const template = `---
title: ${title}
date: ${date}
tags: #ChangeMe #Software
---

Start writing your masterpiece about ${title} here...
`;

try {
    fs.writeFileSync(filePath, template);
    console.log(`Success! Created new post at: blog/posts/${filename}`);
} catch (err) {
    console.error('Error creating file:', err);
}