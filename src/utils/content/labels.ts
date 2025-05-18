// ラベル操作関連の機能

import type { SelectedLabel } from "@/types";

const generateLabelString = (label: SelectedLabel): string => {
  const { label: labelName, type, badgeStyle } = label;
  if (badgeStyle) {
    // https://shields.io/ を使用してバッジを生成
    return `![${labelName}](https://img.shields.io/badge/${type}-${labelName}-${badgeStyle})`;
  }
  return `[${labelName}]`;
};

/**
 * ラベルをテキストエリアに挿入する関数（単純版）
 * @param labels 挿入するSelectedLabelの配列
 */
export function addLabelToTextarea(
  textareaField: HTMLTextAreaElement,
  labels: SelectedLabel[]
): void {
  // ラベルをテキスト形式に変換
  const labelTexts = labels.map(generateLabelString);
  const labelString = `${labelTexts.join("")} \n`;

  // テキストエリアの先頭に挿入
  const currentText = textareaField.value;
  textareaField.value = labelString + currentText;

  // フォーカスを戻す
  textareaField.focus();
}
