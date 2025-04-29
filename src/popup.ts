// GitHub Comment Helper ポップアップスクリプト

document.addEventListener("DOMContentLoaded", (): void => {
  // オプション画面を開くボタン
  const optionsButton = document.getElementById("openOptions");
  optionsButton?.addEventListener("click", (): void => {
    chrome.runtime.openOptionsPage();
  });

  // GitHubを開くボタン
  const githubButton = document.getElementById("goToGitHub");
  githubButton?.addEventListener("click", (): void => {
    chrome.tabs.create({ url: "https://github.com" });
  });
});
