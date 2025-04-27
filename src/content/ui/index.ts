// UI関連機能のエントリーポイント
import type { LabelsConfig } from "../../types";
import { createLabelButton } from "./button";
import { toggleLabelSelector } from "./labels";

// コメント入力欄ごとにヘルパーUIを追加
function addHelperToField(
  field: HTMLTextAreaElement,
  labelsConfig: LabelsConfig
): void {
  if (field.dataset.labelHelperInitialized) return; // 既に初期化済み

  // 初期化済みマークを付ける
  field.dataset.labelHelperInitialized = "true";

  // コンテナを作成
  const helperContainer = document.createElement("div");
  helperContainer.style = "position:relative; margin-bottom: 8px;";

  // ラベル追加ボタンを追加
  const addLabelBtn = createLabelButton(
    helperContainer,
    field,
    labelsConfig,
    toggleLabelSelector // ボタンクリック時のコールバック
  );
  helperContainer.appendChild(addLabelBtn);

  // コメント入力欄の前に挿入
  field.parentElement?.insertBefore(helperContainer, field);
}

// コメント入力欄にUIを追加する
export function addUIToCommentBoxes(labelsConfig?: LabelsConfig): void {
  // GitHub PR画面のコメント入力欄を特定
  const commentFields = document.querySelectorAll<HTMLTextAreaElement>(
    ".js-previewable-comment-form"
  );

  if (commentFields.length === 0) return;

  // ラベル設定がない場合は何もしない（初期化時にラベル設定が必要）
  if (!labelsConfig) return;

  // 各入力欄にヘルパーを追加
  for (const field of commentFields) {
    addHelperToField(field, labelsConfig);
  }
}
