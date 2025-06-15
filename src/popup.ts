// GitHub Comment Helper ポップアップスクリプト

document.addEventListener("DOMContentLoaded", (): void => {
  // バージョン情報を表示
  const versionElement = document.getElementById("version");
  if (versionElement) {
    const manifest = chrome.runtime.getManifest();
    versionElement.textContent = `バージョン: ${manifest.version}`;
  }

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
