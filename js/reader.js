// Reading progress bar
window.addEventListener("scroll", () => {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
  document.getElementById("progress-bar").style.width = progress + "%";
});

// Load post
async function loadPost() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");

  if (!id) {
    document.getElementById("post-content").innerHTML =
      `<p style="color:var(--text-muted)">No post specified.</p>`;
    return;
  }

  try {
    const res = await fetch("./posts.json");
    const posts = await res.json();
    const post = posts.find((p) => p.id === id);

    if (!post) {
      document.getElementById("post-content").innerHTML =
        `<p style="color:var(--text-muted)">Post not found.</p>`;
      return;
    }

    document.title = `Haru | ${post.title}`;

    const mdRes = await fetch(`./${post.filePath}`);
    const rawText = await mdRes.text();
    const mdText = rawText.replace(/^---[\s\S]*?---\n?/, "");

    document.getElementById("post-content").innerHTML = `
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
      <article class="blog-content">
        ${marked.parse(mdText)}
      </article>
    `;
  } catch (err) {
    console.error(err);
    document.getElementById("post-content").innerHTML =
      `<p style="color:var(--text-muted)">Failed to load post.</p>`;
  }
}

loadPost();