// GitHubコメントヘルパー コンテンツスクリプト
// メインエントリーポイント
import { createRoot } from "react-dom/client";
import { loadLabelsConfig } from "@/utils/content/storage";
import { createObserver } from "@/utils/content/dom-observer";
import { CommentHelperApp } from "@/components/domain/content/CommentHelperApp";
import type { LabelsConfig } from "@/types";

// 現在のURLがGitHubのPRのfilesタブかどうかをチェック
const isPullRequestFilesTab = (): boolean => {
  const url = window.location.href;
  return /https:\/\/github\.com\/.*\/pull\/\d+\/files/.test(url);
};

// コメント入力欄にReactコンポーネントをマウントする関数
const mountCommentHelpers = (
  form: HTMLElement,
  labelsConfig: LabelsConfig
): void => {
  // フォーム内のテキストエリアを取得
  const commentField =
    form.querySelector<HTMLTextAreaElement>(".js-comment-field");

  // テキストエリアが見つからない場合はスキップ
  if (!commentField) return;

  // 初期化済みマークを付ける
  form.dataset.labelHelperInitialized = "true";

  // コンテナを作成
  const helperContainer = document.createElement("div");
  helperContainer.className = "gh-comment-helper-container";

  // コメント入力欄の前に挿入
  form.parentElement?.insertBefore(helperContainer, form);

  // Reactルートを作成してマウント
  const root = createRoot(helperContainer);
  root.render(
    <CommentHelperApp commentField={commentField} labelsConfig={labelsConfig} />
  );
};

// Reactコンポーネントをコメント入力欄にマウント
const mountReactComponents = (labelsConfig: LabelsConfig): void => {
  // 現在のURLがPRのfilesタブでない場合は何もしない
  if (!isPullRequestFilesTab()) {
    return;
  }

  // GitHub PR画面の新規コメント入力欄を取得 ※編集モードのコメント入力欄は除外
  const commentForm = document.querySelectorAll<HTMLElement>(
    "tab-container.js-previewable-comment-form"
  );

  if (commentForm.length !== 0) {
    for (const form of commentForm) {
      if (form.dataset.labelHelperInitialized) continue;

      // 各入力欄にReactコンポーネントを追加
      mountCommentHelpers(form, labelsConfig);
    }
  }

  // 編集モードのコメント入力欄を取得
  const editCommentParent =
    document.querySelectorAll<HTMLFormElement>(".js-comment");

  for (const parent of editCommentParent) {
    // parent に .is-comment-editing がある場合は表示されるので処理を行う
    if (parent.classList.contains("is-comment-editing")) {
      // 編集モードのコメント入力欄を取得
      const editCommentField = parent.querySelector<HTMLElement>(
        "div.js-previewable-comment-form"
      );

      if (editCommentField) {
        if (editCommentField.dataset.labelHelperInitialized) continue;
        mountCommentHelpers(editCommentField, labelsConfig);
      }
    } else {
      // 編集モードが非表示なのでラベルボタンを削除する
      const ghHelperContainer = parent.querySelector(
        ".gh-comment-helper-container"
      );
      if (ghHelperContainer) {
        ghHelperContainer.remove();
      }

      // 編集モードのコメント入力欄を取得
      const editCommentField = parent.querySelector<HTMLElement>(
        "div.js-previewable-comment-form"
      );

      if (editCommentField) {
        delete editCommentField.dataset.labelHelperInitialized;
      }
    }
  }
};

// 拡張機能の初期化
const main = async (): Promise<void> => {
  // ラベル設定を読み込み
  const labelsConfig = await loadLabelsConfig();

  // DOM変更の監視を開始
  createObserver(() => mountReactComponents(labelsConfig));

  // 初期表示されている要素にReactコンポーネントをマウント
  mountReactComponents(labelsConfig);
};

// 拡張機能を起動
main();
