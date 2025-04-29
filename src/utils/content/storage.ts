// ストレージ関連機能
import type { LabelsConfig } from "../../types";

/**
 * 表示モードの種類
 */
export type DisplayMode = "pro" | "normal";

/**
 * 表示モードを保存
 * @param mode 表示モード
 */
export function saveDisplayMode(mode: DisplayMode): Promise<void> {
  return new Promise((resolve) => {
    chrome.storage.local.set({ displayMode: mode }, () => {
      resolve();
    });
  });
}

/**
 * 表示モードを取得
 * @returns 表示モード（デフォルトは "pro"）
 */
export async function getDisplayMode(): Promise<DisplayMode> {
  return new Promise((resolve) => {
    chrome.storage.local.get("displayMode", (result) => {
      resolve((result.displayMode as DisplayMode) || "pro");
    });
  });
}

// ラベル設定をストレージから読み込み
export async function loadLabelsConfig(): Promise<LabelsConfig> {
  return new Promise((resolve) => {
    chrome.storage.local.get("labelsConfig", (result) => {
      if (result.labelsConfig) {
        resolve(result.labelsConfig as LabelsConfig);
      } else {
        // デフォルト設定
        const defaultConfig: LabelsConfig = {
          labels: [
            {
              type: "観点",
              items: [
                { label: "設計", description: "設計や仕様に合致しているか" },
                { label: "テスト", description: "テストが十分か" },
                { label: "実装", description: "実装の品質について" },
                {
                  label: "UI",
                  description: "ユーザーインターフェースについて",
                },
              ],
            },
            {
              type: "温度感",
              items: [
                { label: "FYI", description: "参考情報の共有" },
                { label: "Q", description: "質問" },
                { label: "提案", description: "改善の提案" },
                { label: "必須", description: "必ず対応してほしい" },
              ],
            },
          ],
        };
        // デフォルト設定を保存
        chrome.storage.local.set({ labelsConfig: defaultConfig });
        resolve(defaultConfig);
      }
    });
  });
}
