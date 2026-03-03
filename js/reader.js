let ticking = false;
const progressBar = document.getElementById("progress-bar");

window.addEventListener("scroll", () => {
  if (ticking) return;
  requestAnimationFrame(() => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (progressBar) {
      progressBar.style.width = (docHeight > 0 ? (scrollTop / docHeight) * 100 : 0) + "%";
    }
    ticking = false;
  });
  ticking = true;
}, { passive: true });

// Load and render the blog post based on the ID in the URL query parameters
async function loadPost() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  const contentEl = document.getElementById("post-content");

  if (!id) {
    contentEl.innerHTML = `<p style="color:var(--text-muted)">No post specified.</p>`;
    return;
  }

  try {
    const posts = await fetch(PATHS.posts).then((r) => r.json());
    const post = posts.find((p) => p.id === id);

    if (!post) {
      contentEl.innerHTML = `<p style="color:var(--text-muted)">Post not found.</p>`;
      return;
    }

    document.title = `Haru | ${post.title}`;

    const rawText = await fetch(`${PATHS.blogBasePath }${post.filePath}`).then((r) => r.text());
    const mdText = rawText.replace(/^---[\s\S]*?---\n?/, "");

    contentEl.innerHTML = `
      <div class="blog-header">
        <h1>${post.title}</h1>
        <div class="blog-meta">
          <span><i class="fas fa-calendar-alt"></i> ${post.date}</span>
          <span><i class="fas fa-clock"></i> ${post.readTime} min read</span>
        </div>
        <div class="blog-card-tags" style="margin-top: 1rem;">
          <i class="fas fa-tags" style="color: var(--text-muted); font-size: 0.8rem;"></i>
          ${post.tags.map((tag) => `<span class="blog-card-tag">${tag}</span>`).join("")}
        </div>
      </div>
      <article class="blog-content">${marked.parse(mdText)}</article>
    `;
  } catch (err) {
    console.error(err);
    contentEl.innerHTML = `<p style="color:var(--text-muted)">Failed to load post.</p>`;
  }
}

loadPost();