const https = require("https");
const fs = require("fs");

const GITHUB_USERNAME = "haruchanz64";
const PINNED_REPOS = [
  "UnityEventToolkit",
  "DebugCommandSystem",
  "ScriptableBatchTool",
  "SaveEncryptionToolkit",
];

const url = `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100`;

https.get(url, { headers: { "User-Agent": "netlify-build" } }, (res) => {
  let data = "";
  res.on("data", (chunk) => (data += chunk));
  res.on("end", () => {
    const repos = JSON.parse(data);
    const filtered = PINNED_REPOS
      .map((name) => repos.find((r) => r.name === name))
      .filter(Boolean)
      .map((r) => ({
        name: r.name,
        description: r.description,
        html_url: r.html_url,
        language: r.language,
        stargazers_count: r.stargazers_count,
      }));

    fs.writeFileSync("repos.json", JSON.stringify(filtered, null, 2));
    console.log("repos.json written successfully.");
  });
}).on("error", (e) => {
  console.error("Failed to fetch repos:", e.message);
  process.exit(1);
});