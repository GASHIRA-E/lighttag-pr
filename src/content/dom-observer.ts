// DOM監視関連機能
import { addUIToCommentBoxes } from "./ui";

// DOM変更を監視するObserverを作成
export function createObserver(callback: () => void): MutationObserver {
  const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.addedNodes.length) {
        callback();
        break;
      }
    }
  });

  // DOM変更の監視を開始
  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });

  return observer;
}

// コメント入力欄を監視して拡張UIを追加
export function setupCommentHelper(): void {
  // GitHub PR画面のコメント入力欄を監視
  createObserver(addUIToCommentBoxes);

  // 初期ロード時にもチェック
  addUIToCommentBoxes();
}
