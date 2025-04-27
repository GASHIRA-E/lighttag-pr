// ラベル選択UI関連機能
import type { LabelsConfig, SelectedLabel } from "../../types";
import { createActionButtons } from "./button";

// ラベルグループUIを作成
export function createLabelGroupUI(
  labelGroup: LabelsConfig["labels"][number],
  selectedLabels: SelectedLabel[]
): HTMLDivElement {
  // ラベルグループコンテナ
  const groupContainer = document.createElement("div");
  groupContainer.className = "gh-label-group-container";

  // グループタイトル
  const groupTitle = document.createElement("h4");
  groupTitle.textContent = labelGroup.type;
  groupContainer.appendChild(groupTitle);

  // ラベルコンテナ
  const labelsContainer = document.createElement("div");
  labelsContainer.className = "gh-label-group";

  // 各ラベルを表示
  for (const item of labelGroup.items as {
    label: string;
    description: string;
  }[]) {
    const labelElem = document.createElement("span");
    labelElem.className = "gh-label-item";
    labelElem.textContent = item.label;
    labelElem.title = item.description;

    // クリック時の選択/解除
    labelElem.addEventListener("click", () => {
      const index = selectedLabels.findIndex(
        (l) => l.label === item.label && l.type === labelGroup.type
      );

      if (index >= 0) {
        // 選択解除
        selectedLabels.splice(index, 1);
        labelElem.classList.remove("selected");
      } else {
        // 選択
        selectedLabels.push({
          label: item.label,
          type: labelGroup.type,
        });
        labelElem.classList.add("selected");
      }
    });

    labelsContainer.appendChild(labelElem);
  }

  groupContainer.appendChild(labelsContainer);
  return groupContainer;
}

// ラベル選択UIを作成
export function createLabelSelectorUI(
  container: HTMLDivElement,
  commentField: HTMLTextAreaElement,
  labelsConfig: LabelsConfig
): void {
  // ラベル選択UIを作成
  const selectorElem = document.createElement("div");
  selectorElem.className = "gh-label-selector";

  // 選択されたラベルの配列
  const selectedLabels: SelectedLabel[] = [];

  // ラベルグループごとにUIを作成
  for (const labelGroup of labelsConfig.labels) {
    const groupUI = createLabelGroupUI(labelGroup, selectedLabels);
    selectorElem.appendChild(groupUI);
  }

  // アクションボタンを追加
  const btnGroup = createActionButtons(
    container,
    selectorElem,
    commentField,
    selectedLabels
  );
  selectorElem.appendChild(btnGroup);

  container.appendChild(selectorElem);
}

// ラベル選択UIの表示/非表示を切り替え
export function toggleLabelSelector(
  container: HTMLDivElement,
  commentField: HTMLTextAreaElement,
  labelsConfig: LabelsConfig
): void {
  // 既存のセレクターがあれば削除
  const existingSelector = container.querySelector(".gh-label-selector");
  if (existingSelector) {
    container.removeChild(existingSelector);
    return;
  }

  // ラベル選択UIを作成
  createLabelSelectorUI(container, commentField, labelsConfig);
}
