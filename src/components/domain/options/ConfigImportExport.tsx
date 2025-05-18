import type React from "react";
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
    <div className="section import-export">
      <h2>設定のインポート/エクスポート</h2>
      <textarea
        id="configJson"
        placeholder="JSONをペーストするか、現在の設定をエクスポートします"
        value={configJson}
        onChange={(e) => onConfigJsonChange(e.target.value)}
      />
      <div className="action-btns">
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
