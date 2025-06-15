// DOM監視関連機能

// DOM変更を監視するObserverを作成
export function createObserver(callback: () => void): MutationObserver {
  const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      // ノードの追加を監視
      if (mutation.addedNodes.length) {
        callback();
        break;
      }

      // クラス変更を監視
      if (
        mutation.type === "attributes" &&
        mutation.attributeName === "class"
      ) {
        callback();
        break;
      }
    }
  });

  // DOM変更の監視を開始
  observer.observe(document.body, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ["class"],
  });

  return observer;
}
