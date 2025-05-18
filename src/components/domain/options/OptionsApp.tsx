import type React from "react";
import type { LabelsConfig, LabelItem } from "@/types";
import { useEffect, useState } from "react";
import { css } from "@emotion/react";
import { Button } from "@/components/parts/Button";
import { LabelGroupItem } from "@/components/domain/options/LabelGroupItem";
import { ConfigImportExport } from "@/components/domain/options/ConfigImportExport";

// ステータス表示用の型
type StatusType = "success" | "error" | null;

// スタイル定義
const containerStyle = css`
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif;
  line-height: 1.5;
  max-width: 800px;
  margin: 0 auto;
`;

const headingStyle = css`
  font-size: 24px;
  margin-bottom: 20px;
`;

const sectionStyle = css`
  margin-bottom: 30px;
`;

const actionButtonsStyle = css`
  display: flex;
  position: sticky;
  bottom: 0;
  gap: 10px;
  padding-top: 10px;
  padding-bottom: 10px;
  background-color: #f9f9f9;
  border-top: 1px solid #ccc;
`;

const snackbarStyle = css`
  position: fixed;
  bottom: 20px;
  right: 20px;
  padding: 12px 16px;
  border-radius: 4px;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.2);
  z-index: 1000;
  min-width: 250px;
  text-align: center;
  animation: slideUp 0.3s ease-out;
  
  @keyframes slideUp {
    from {
      transform: translateY(20px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
`;

const successStyle = css`
  background-color: #dafbe1;
  color: #116329;
`;

const errorStyle = css`
  background-color: #ffebe9;
  color: #cf222e;
`;

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

  // Snackbar表示
  const showSnackbar = (message: string, type: "success" | "error"): void => {
    setStatus({ message, type });

    // 3秒後に非表示
    setTimeout(() => {
      setStatus({ message: "", type: null });
    }, 3000);
  };

  // 設定を保存
  const saveConfig = (): void => {
    chrome.storage.local.set({ labelsConfig }, () => {
      showSnackbar("設定を保存しました", "success");
    });
  };

  // 設定をエクスポート
  const exportConfig = (): void => {
    setConfigJson(JSON.stringify(labelsConfig, null, 2));
    showSnackbar("設定をエクスポートしました", "success");
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
        showSnackbar("設定をインポートして保存しました", "success");
      });
    } catch (error) {
      if (error instanceof Error) {
        showSnackbar(`エラー: ${error.message}`, "error");
      } else {
        showSnackbar("不明なエラーが発生しました", "error");
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
    <div css={containerStyle}>
      <h1 css={headingStyle}>LightTag PR オプション</h1>

      <div css={sectionStyle}>
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

      <div css={actionButtonsStyle}>
        <Button
          variant="primary"
          onClick={saveConfig}
        >
          設定を保存
        </Button>
        <ConfigImportExport
          configJson={configJson}
          onConfigJsonChange={setConfigJson}
          onExport={exportConfig}
          onImport={importConfig}
        />
      </div>

      {status.type && (
        <div css={[snackbarStyle, status.type === 'success' ? successStyle : errorStyle]}>
          {status.message}
        </div>
      )}
    </div>
  );
};
