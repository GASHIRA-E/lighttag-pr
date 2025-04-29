// GitHubコメントヘルパー コンテンツスクリプト
// メインエントリーポイント
import { createRoot } from "react-dom/client";
import { loadLabelsConfig } from "./content/storage";
import { createObserver } from "./content/dom-observer";
import { CommentHelperApp } from "./components/CommentHelperApp";
import type { LabelsConfig } from "./types";

// 拡張機能の初期化
async function initializeExtension(): Promise<void> {
  // ラベル設定を読み込み
  const labelsConfig = await loadLabelsConfig();

  // DOM変更の監視を開始
  createObserver(() => mountReactComponents(labelsConfig));

  // 初期表示されている要素にReactコンポーネントをマウント
  mountReactComponents(labelsConfig);
}

// Reactコンポーネントをコメント入力欄にマウント
function mountReactComponents(labelsConfig: LabelsConfig): void {
  // GitHub PR画面のコメント入力欄を特定
  const commentFields = document.querySelectorAll<HTMLTextAreaElement>(
    ".js-previewable-comment-form"
  );

  if (commentFields.length === 0) return;

  // 各入力欄にReactコンポーネントを追加
  for (const field of commentFields) {
    // すでにマウントされている場合はスキップ
    if (field.dataset.labelHelperInitialized) continue;

    // 初期化済みマークを付ける
    field.dataset.labelHelperInitialized = "true";

    // コンテナを作成
    const helperContainer = document.createElement("div");
    helperContainer.style.position = "relative";
    helperContainer.style.marginBottom = "8px";
    helperContainer.className = "gh-comment-helper-container";

    // コメント入力欄の前に挿入
    field.parentElement?.insertBefore(helperContainer, field);

    // Reactルートを作成してマウント
    const root = createRoot(helperContainer);
    root.render(
      <CommentHelperApp commentField={field} labelsConfig={labelsConfig} />
    );
  }
}

// 拡張機能を起動
initializeExtension();
