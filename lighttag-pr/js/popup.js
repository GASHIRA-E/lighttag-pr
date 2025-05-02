// GitHub Comment Helper ポップアップスクリプト

document.addEventListener("DOMContentLoaded", () => {
  // オプション画面を開くボタン
  document.getElementById("openOptions").addEventListener("click", () => {
    chrome.runtime.openOptionsPage();
  });

  // GitHubを開くボタン
  document.getElementById("goToGitHub").addEventListener("click", () => {
    chrome.tabs.create({ url: "https://github.com" });
  });
});
