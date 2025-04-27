// GitHubコメントヘルパー コンテンツスクリプト
// メインエントリーポイント
import { loadLabelsConfig } from "./content/storage";
import { createObserver } from "./content/dom-observer";
import { addUIToCommentBoxes } from "./content/ui";

// 拡張機能の初期化
async function initializeExtension(): Promise<void> {
  // ラベル設定を読み込み
  const labelsConfig = await loadLabelsConfig();

  // 初期表示されている要素にUIを追加
  addUIToCommentBoxes(labelsConfig);

  // DOM変更の監視を開始
  createObserver(() => addUIToCommentBoxes(labelsConfig));
}

// 拡張機能を起動
initializeExtension();
