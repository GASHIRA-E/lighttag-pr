// ボタン関連のUI機能
import type { LabelsConfig, SelectedLabel } from "../../types";
import { insertLabels } from "../labels";

// ラベル追加ボタンを作成
export function createLabelButton(
  container: HTMLDivElement,
  field: HTMLTextAreaElement,
  labelsConfig: LabelsConfig,
  onClickCallback: (
    container: HTMLDivElement,
    field: HTMLTextAreaElement,
    config: LabelsConfig
  ) => void
): HTMLButtonElement {
  const addLabelBtn = document.createElement("button");
  // addLabelBtn.className = "gh-label-helper-btn";
  addLabelBtn.className = "Button Button--secondary Button--small";
  addLabelBtn.textContent = "ラベルを追加";
  addLabelBtn.addEventListener("click", (e) => {
    e.preventDefault();
    onClickCallback(container, field, labelsConfig);
  });

  return addLabelBtn;
}

// アクションボタンを作成
export function createActionButtons(
  container: HTMLDivElement,
  selectorElem: HTMLDivElement,
  commentField: HTMLTextAreaElement,
  selectedLabels: SelectedLabel[]
): HTMLDivElement {
  // ボタングループ
  const btnGroup = document.createElement("div");
  btnGroup.className = "gh-label-btn-group";

  // 挿入ボタン
  const insertBtn = document.createElement("button");
  insertBtn.className = "gh-label-insert-btn";
  insertBtn.textContent = "挿入";
  insertBtn.addEventListener("click", () => {
    insertLabels(commentField, selectedLabels);
    container.removeChild(selectorElem);
  });

  // キャンセルボタン
  const cancelBtn = document.createElement("button");
  cancelBtn.className = "gh-label-cancel-btn";
  cancelBtn.textContent = "キャンセル";
  cancelBtn.addEventListener("click", () => {
    container.removeChild(selectorElem);
  });

  btnGroup.appendChild(insertBtn);
  btnGroup.appendChild(cancelBtn);

  return btnGroup;
}
