// ラベル操作関連の機能
/**
 * ラベルをテキストエリアに挿入する関数（単純版）
 * @param labels 挿入するラベルの配列
 */
export function addLabelToTextarea(
  textareaField: HTMLTextAreaElement,
  labels: string[]
): void {
  // ラベルをテキスト形式に変換
  const labelTexts = labels.map((label) => `[${label}]`);
  const labelString = `${labelTexts.join("")} \n`;

  // テキストエリアの先頭に挿入
  const currentText = textareaField.value;
  textareaField.value = labelString + currentText;

  // フォーカスを戻す
  textareaField.focus();
}
