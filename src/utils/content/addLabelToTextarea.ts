/**
 * ラベルをテキストエリアに挿入する関数
 * @param labels 挿入するラベルの配列
 */
export function addLabelToTextarea(labels: string[]): void {
  // テキストエリア要素を取得
  const commentField = document.querySelector('.js-comment-field') as HTMLTextAreaElement;
  
  // テキストエリアがない場合は何もしない
  if (!commentField) return;

  // ラベルをテキスト形式に変換
  const labelTexts = labels.map((label) => `[${label}]`);
  const labelString = `${labelTexts.join("")} \n`;

  // テキストエリアの先頭に挿入
  const currentText = commentField.value;
  commentField.value = labelString + currentText;

  // フォーカスを戻す
  commentField.focus();
}