import type React from "react";
import { css } from "@emotion/react";
import { Button } from "../../parts/Button";

interface ConfigImportExportProps {
  /**
   * 設定のJSON文字列
   */
  configJson: string;
  /**
   * JSON文字列の変更時のコールバック
   */
  onConfigJsonChange: (value: string) => void;
  /**
   * エクスポート時のコールバック
   */
  onExport: () => void;
  /**
   * インポート時のコールバック
   */
  onImport: () => void;
}

// スタイル定義
const sectionStyle = css`
  margin-bottom: 30px;
`;

const importExportStyle = css`
  margin-top: 30px;
`;

const textareaStyle = css`
  width: 100%;
  height: 200px;
  font-family: monospace;
  padding: 10px;
  border: 1px solid #d0d7de;
  border-radius: 6px;
  margin-bottom: 10px;
`;

const actionBtnsStyle = css`
  display: flex;
  gap: 10px;
  margin-top: 20px;
`;

/**
 * 設定のインポート/エクスポートコンポーネント
 */
export const ConfigImportExport: React.FC<ConfigImportExportProps> = ({
  configJson,
  onConfigJsonChange,
  onExport,
  onImport
}) => {
  return (
    <div css={[sectionStyle, importExportStyle]}>
      <h2>設定のインポート/エクスポート</h2>
      <textarea
        id="configJson"
        placeholder="JSONをペーストするか、現在の設定をエクスポートします"
        value={configJson}
        css={textareaStyle}
        onChange={(e) => onConfigJsonChange(e.target.value)}
      />
      <div css={actionBtnsStyle}>
        <Button
          variant="secondary"
          onClick={onExport}
        >
          設定をエクスポート
        </Button>
        <Button
          variant="secondary"
          onClick={onImport}
        >
          設定をインポート
        </Button>
      </div>
    </div>
  );
};
