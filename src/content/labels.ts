// ラベル操作関連の機能
import type { SelectedLabel } from "../types";

// 選択したラベルをコメント入力欄に挿入
export function insertLabels(
  commentField: HTMLTextAreaElement,
  selectedLabels: SelectedLabel[]
): void {
  if (selectedLabels.length === 0) return;

  // 選択したラベルをテキスト形式に変換
  const labelTexts = selectedLabels.map((item) => `[${item.label}]`);
  const labelString = `${labelTexts.join("")} `;

  // 現在のカーソル位置またはテキスト先頭に挿入
  const currentText = commentField.value;
  const cursorPos = commentField.selectionStart || 0;

  // テキスト挿入
  commentField.value =
    currentText.slice(0, cursorPos) +
    labelString +
    currentText.slice(cursorPos);

  // カーソル位置を更新
  const newCursorPos = cursorPos + labelString.length;
  commentField.setSelectionRange(newCursorPos, newCursorPos);

  // フォーカスを戻す
  commentField.focus();
}
