// GitHub Comment Helper オプション画面スクリプト
import type { LabelsConfig, LabelItem } from "./types";

// DOM要素
const labelGroupsContainer = document.getElementById(
  "labelGroups"
) as HTMLDivElement;
const addGroupBtn = document.getElementById("addGroupBtn") as HTMLButtonElement;
const configJsonTextarea = document.getElementById(
  "configJson"
) as HTMLTextAreaElement;
const exportBtn = document.getElementById("exportBtn") as HTMLButtonElement;
const importBtn = document.getElementById("importBtn") as HTMLButtonElement;
const saveBtn = document.getElementById("saveBtn") as HTMLButtonElement;
const statusMessage = document.getElementById(
  "statusMessage"
) as HTMLDivElement;

// ラベル設定データ
let labelsConfig: LabelsConfig = {
  labels: [],
};

// 初期化
document.addEventListener("DOMContentLoaded", () => {
  loadConfig();

  // イベントリスナー設定
  addGroupBtn.addEventListener("click", addLabelGroup);
  exportBtn.addEventListener("click", exportConfig);
  importBtn.addEventListener("click", importConfig);
  saveBtn.addEventListener("click", saveConfig);
});

// 設定読み込み
function loadConfig(): void {
  chrome.storage.local.get("labelsConfig", (result) => {
    if (result.labelsConfig) {
      labelsConfig = result.labelsConfig as LabelsConfig;
    } else {
      // デフォルト設定
      labelsConfig = {
        labels: [
          {
            type: "観点",
            items: [
              { label: "設計", description: "設計や仕様に合っているか" },
              { label: "可読性", description: "コードが読みやすいか" },
            ],
          },
          {
            type: "温度感",
            items: [
              { label: "要修正", description: "修正が必要な指摘" },
              { label: "Q", description: "質問・確認" },
              { label: "FYI", description: "参考情報（対応不要）" },
            ],
          },
        ],
      };
    }

    renderLabelGroups();
  });
}

// ラベルグループをDOMにレンダリング
function renderLabelGroups(): void {
  labelGroupsContainer.innerHTML = "";

  labelsConfig.labels.forEach((group, groupIndex) => {
    const groupElem = document.createElement("div");
    groupElem.className = "label-group";
    groupElem.dataset.groupIndex = groupIndex.toString();

    // グループヘッダー
    const header = document.createElement("div");
    header.className = "label-group-header";

    const typeInput = document.createElement("input");
    typeInput.type = "text";
    typeInput.value = group.type;
    typeInput.placeholder = "グループ名";
    typeInput.addEventListener("change", (e) => {
      const target = e.target as HTMLInputElement;
      labelsConfig.labels[groupIndex].type = target.value;
    });

    const deleteGroupBtn = document.createElement("button");
    deleteGroupBtn.className = "btn btn-danger btn-small";
    deleteGroupBtn.textContent = "グループ削除";
    deleteGroupBtn.addEventListener("click", () => {
      labelsConfig.labels.splice(groupIndex, 1);
      renderLabelGroups();
    });

    header.appendChild(typeInput);
    header.appendChild(deleteGroupBtn);
    groupElem.appendChild(header);

    // ラベルアイテム一覧
    const itemsContainer = document.createElement("div");
    itemsContainer.className = "label-items";

    group.items.forEach((item, itemIndex) => {
      const itemElem = createLabelItemElement(groupIndex, itemIndex, item);
      itemsContainer.appendChild(itemElem);
    });

    groupElem.appendChild(itemsContainer);

    // ラベル追加ボタン
    const addItemBtn = document.createElement("button");
    addItemBtn.className = "btn";
    addItemBtn.textContent = "ラベル追加";
    addItemBtn.addEventListener("click", () => {
      labelsConfig.labels[groupIndex].items.push({
        label: "",
        description: "",
      });
      renderLabelGroups();
    });

    groupElem.appendChild(addItemBtn);
    labelGroupsContainer.appendChild(groupElem);
  });
}

// ラベルアイテム要素作成
function createLabelItemElement(
  groupIndex: number,
  itemIndex: number,
  item: LabelItem
): HTMLDivElement {
  const itemElem = document.createElement("div");
  itemElem.className = "label-item";

  const labelInput = document.createElement("input");
  labelInput.type = "text";
  labelInput.className = "label-name";
  labelInput.value = item.label;
  labelInput.placeholder = "ラベル名";
  labelInput.addEventListener("change", (e) => {
    const target = e.target as HTMLInputElement;
    labelsConfig.labels[groupIndex].items[itemIndex].label = target.value;
  });

  const descInput = document.createElement("input");
  descInput.type = "text";
  descInput.className = "label-description";
  descInput.value = item.description;
  descInput.placeholder = "説明";
  descInput.addEventListener("change", (e) => {
    const target = e.target as HTMLInputElement;
    labelsConfig.labels[groupIndex].items[itemIndex].description = target.value;
  });

  const deleteBtn = document.createElement("button");
  deleteBtn.className = "btn btn-danger btn-small";
  deleteBtn.textContent = "削除";
  deleteBtn.addEventListener("click", () => {
    labelsConfig.labels[groupIndex].items.splice(itemIndex, 1);
    renderLabelGroups();
  });

  itemElem.appendChild(labelInput);
  itemElem.appendChild(descInput);
  itemElem.appendChild(deleteBtn);

  return itemElem;
}

// 新しいラベルグループを追加
function addLabelGroup(): void {
  labelsConfig.labels.push({
    type: "新しいグループ",
    items: [{ label: "", description: "" }],
  });

  renderLabelGroups();
}

// 設定をエクスポート
function exportConfig(): void {
  configJsonTextarea.value = JSON.stringify(labelsConfig, null, 2);
  showStatus("設定をエクスポートしました", "success");
}

// 設定をインポート
function importConfig(): void {
  try {
    const newConfig = JSON.parse(configJsonTextarea.value);

    // 簡易バリデーション
    if (!newConfig.labels || !Array.isArray(newConfig.labels)) {
      throw new Error("無効なフォーマットです。labelsプロパティが必要です。");
    }

    labelsConfig = newConfig as LabelsConfig;
    renderLabelGroups();
    showStatus("設定をインポートしました", "success");
  } catch (error) {
    if (error instanceof Error) {
      showStatus(`エラー: ${error.message}`, "error");
    } else {
      showStatus("不明なエラーが発生しました", "error");
    }
  }
}

// 設定を保存
function saveConfig(): void {
  chrome.storage.local.set({ labelsConfig }, () => {
    showStatus("設定を保存しました", "success");
  });
}

// ステータスメッセージを表示
function showStatus(message: string, type: "success" | "error"): void {
  statusMessage.textContent = message;
  statusMessage.className = `status-message ${type}`;

  // 3秒後に非表示
  setTimeout(() => {
    statusMessage.className = "status-message hidden";
  }, 3000);
}
