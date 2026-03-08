const PATHS = window.PATHS || {};
const postsUrl = PATHS.posts || "/blog/posts.json";
const _postCache = {};

async function loadPosts() {
  const res = await fetch(postsUrl, { cache: "no-cache" });
  if (!res.ok) {
    throw new Error(`Failed to load posts: ${res.status} (${postsUrl})`);
  }
  return res.json();
}

async function fetchPosts() {
  if (_postCache[postsUrl]) return _postCache[postsUrl];
  const data = await loadPosts();
  _postCache[postsUrl] = data;
  return data;
}

function createBlogCard(post) {
  const card = document.createElement("a");
  card.className = "blog-card";
  card.href = `${PATHS.reader || "/reader.html"}?id=${post.id}`;
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

function renderCards(grid, posts) {
  const fragment = document.createDocumentFragment();
  posts.forEach((post) => fragment.appendChild(createBlogCard(post)));
  grid.innerHTML = "";
  grid.appendChild(fragment);
}

async function initBlog() {
  const grid = document.getElementById("blog-grid");
  if (!grid) return;
  try {
    const posts = await fetchPosts();
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
    const posts = await fetchPosts();
    renderCards(grid, posts.slice(0, 2));
  } catch (err) {
    console.error("Error loading blog preview:", err);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  initBlog();
  initBlogPreview();
});
