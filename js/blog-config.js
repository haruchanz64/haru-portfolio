async function initBlog() {
    const blogGrid = document.getElementById('blog-grid');
    if (!blogGrid) return;

    try {
        const response = await fetch('blog/posts.json');
        const posts = await response.json();
        
        blogGrid.innerHTML = ''; 

        // No more for-loop fetching! Just simple mapping.
        posts.forEach(post => {
            const card = document.createElement('article');
            card.className = 'project-card';
            card.innerHTML = `
                <div class="project-info">
                    <h3 class="project-title">${post.title}</h3>
                    <p class="project-description">${post.date} • ${post.readTime} min read</p>
                    <div class="project-meta" style="margin-bottom: 15px;">
                        ${post.tags.map(tag => `<span class="role-tag">${tag}</span>`).join('')}
                    </div>
                    <a href="blog/reader.html?id=${post.id}" class="nav-link" style="color: var(--accent-primary); text-decoration: none; font-weight: bold;">
                        Read Post →
                    </a>
                </div>
            `;
            blogGrid.appendChild(card);
        });
    } catch (error) {
        console.error("Error loading blog feed:", error);
        blogGrid.innerHTML = '<p>Error loading articles.</p>';
    }
}

document.addEventListener('DOMContentLoaded', initBlog);