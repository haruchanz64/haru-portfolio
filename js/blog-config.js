function createBlogCard(post, basePath = "") {
  const card = document.createElement("a");
  card.className = "blog-card";
  card.href = `${basePath}reader.html?id=${post.id}`;
  card.innerHTML = `
    <div class="blog-card-top">
      <h3 class="blog-card-title">${post.title}</h3>
      <span class="blog-card-arrow">↗</span>
    </div>
    <div class="blog-card-meta">
      <span><i class="fas fa-calendar-alt"></i> ${post.date}</span>
      <span><i class="fas fa-clock"></i> ${post.readTime} min read</span>
    </div>
    <div class="blog-card-tags">
      ${post.tags.map((tag) => `<span class="blog-card-tag">${tag}</span>`).join("")}
    </div>
  `;
  return card;
}

async function fetchPosts(path) {
  const res = await fetch(path);
  if (!res.ok) throw new Error(`Failed to fetch posts: ${res.status}`);
  return res.json();
}

function renderCards(grid, posts, basePath = "") {
  const fragment = document.createDocumentFragment();
  posts.forEach((post) => fragment.appendChild(createBlogCard(post, basePath)));
  grid.innerHTML = "";
  grid.appendChild(fragment);
}

async function initBlog() {
  const grid = document.getElementById("blog-grid");
  if (!grid) return;

  try {
    const posts = await fetchPosts("./posts.json");
    renderCards(grid, posts);
  } catch (err) {
    console.error("Error loading blog feed:", err);
    grid.innerHTML = "<p>Error loading articles.</p>";
  }
}

async function initBlogPreview() {
  const grid = document.getElementById("blog-preview-grid");
  if (!grid) return;

  try {
    const posts = await fetchPosts("./blog/posts.json");
    renderCards(grid, posts.slice(0, 2), "./blog/");
  } catch (err) {
    console.error("Error loading blog preview:", err);
  }
}

// ─── Boot ───

document.addEventListener("DOMContentLoaded", () => {
  initBlog();
  initBlogPreview();
});