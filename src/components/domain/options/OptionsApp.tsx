import { useEffect, useState } from "react";
import type React from "react";
import type { LabelsConfig, LabelItem, LabelGroup } from "@/types";
import { Button } from "../../parts/Button";
import { LabelItemForm } from "./LabelItemForm";
import { LabelGroupItem } from "./LabelGroupItem";
import { ConfigImportExport } from "./ConfigImportExport";

// ステータス表示用の型
type StatusType = "success" | "error" | null;

export const OptionsApp: React.FC = () => {
  const [labelsConfig, setLabelsConfig] = useState<LabelsConfig>({ labels: [] });
  const [configJson, setConfigJson] = useState("");
  const [status, setStatus] = useState<{ message: string; type: StatusType }>({
    message: "",
    type: null,
  });

  // 設定読み込み
  useEffect(() => {
    loadConfig();
  }, []);

  // 設定読み込み
  const loadConfig = (): void => {
    chrome.storage.local.get("labelsConfig", (result) => {
      if (result.labelsConfig) {
        setLabelsConfig(result.labelsConfig as LabelsConfig);
      } else {
        // デフォルト設定
        const defaultConfig: LabelsConfig = {
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
                { label: "MUST", description: "修正が必要な指摘" },
                { label: "ASK", description: "質問・確認" },
                { label: "FYI", description: "参考情報（対応不要）" },
              ],
            },
          ],
        };
        setLabelsConfig(defaultConfig);
      }
    });
  };

  // ステータスメッセージを表示
  const showStatus = (message: string, type: "success" | "error"): void => {
    setStatus({ message, type });

    // 3秒後に非表示
    setTimeout(() => {
      setStatus({ message: "", type: null });
    }, 3000);
  };

  // 設定を保存
  const saveConfig = (): void => {
    chrome.storage.local.set({ labelsConfig }, () => {
      showStatus("設定を保存しました", "success");
    });
  };

  // 設定をエクスポート
  const exportConfig = (): void => {
    setConfigJson(JSON.stringify(labelsConfig, null, 2));
    showStatus("設定をエクスポートしました", "success");
  };

  // 設定をインポート
  const importConfig = (): void => {
    try {
      const newConfig = JSON.parse(configJson);

      // 簡易バリデーション
      if (!newConfig.labels || !Array.isArray(newConfig.labels)) {
        throw new Error("無効なフォーマットです。labelsプロパティが必要です。");
      }

      setLabelsConfig(newConfig as LabelsConfig);

      // インポート成功時に自動保存
      chrome.storage.local.set({ labelsConfig: newConfig }, () => {
        showStatus("設定をインポートして保存しました", "success");
      });
    } catch (error) {
      if (error instanceof Error) {
        showStatus(`エラー: ${error.message}`, "error");
      } else {
        showStatus("不明なエラーが発生しました", "error");
      }
    }
  };

  // 新しいラベルグループを追加
  const addLabelGroup = (): void => {
    setLabelsConfig(prev => ({
      labels: [
        ...prev.labels,
        {
          type: "新しいグループ",
          items: [{ label: "", description: "" }],
        }
      ]
    }));
  };

  // グループ名の変更
  const updateGroupType = (groupIndex: number, newType: string): void => {
    const newLabelsConfig = { ...labelsConfig };
    newLabelsConfig.labels[groupIndex].type = newType;
    setLabelsConfig(newLabelsConfig);
  };

  // グループの削除
  const deleteGroup = (groupIndex: number): void => {
    const newLabelsConfig = { ...labelsConfig };
    newLabelsConfig.labels.splice(groupIndex, 1);
    setLabelsConfig(newLabelsConfig);
  };

  // ラベルの追加
  const addLabelItem = (groupIndex: number): void => {
    const newLabelsConfig = { ...labelsConfig };
    newLabelsConfig.labels[groupIndex].items.push({
      label: "",
      description: "",
    });
    setLabelsConfig(newLabelsConfig);
  };

  // ラベルの更新
  const updateLabelItem = (
    groupIndex: number,
    itemIndex: number,
    field: keyof LabelItem,
    value: string
  ): void => {
    const newLabelsConfig = { ...labelsConfig };
    newLabelsConfig.labels[groupIndex].items[itemIndex][field] = value;
    setLabelsConfig(newLabelsConfig);
  };

  // ラベルの削除
  const deleteLabelItem = (groupIndex: number, itemIndex: number): void => {
    const newLabelsConfig = { ...labelsConfig };
    newLabelsConfig.labels[groupIndex].items.splice(itemIndex, 1);
    setLabelsConfig(newLabelsConfig);
  };

  const generateLabelKey = (groupIndex: number): string => {
    return `labelGroup-${groupIndex}`;
  }

  return (
    <div>
      <h1>LightTag PR オプション</h1>

      <div className="section">
        <h2>ラベル設定</h2>
        <div id="labelGroups">
          {labelsConfig.labels.map((group, groupIndex) => (
            <LabelGroupItem
              key={generateLabelKey(groupIndex)}
              group={group}
              groupIndex={groupIndex}
              onUpdateGroupType={updateGroupType}
              onDeleteGroup={deleteGroup}
              onAddLabelItem={addLabelItem}
              onUpdateLabelItem={updateLabelItem}
              onDeleteLabelItem={deleteLabelItem}
            />
          ))}
        </div>
        <Button
          variant="secondary"
          onClick={addLabelGroup}
        >
          新しいグループを追加
        </Button>
      </div>

      <ConfigImportExport
        configJson={configJson}
        onConfigJsonChange={setConfigJson}
        onExport={exportConfig}
        onImport={importConfig}
      />

      <div className="action-btns">
        <Button
          variant="primary"
          onClick={saveConfig}
        >
          設定を保存
        </Button>
      </div>

      {status.type && (
        <div className={`status-message ${status.type}`}>
          {status.message}
        </div>
      )}
    </div>
  );
};
