import type React from "react";
import { useEffect, useState } from "react";
import { css } from "@emotion/react";
import { Button } from "@/components/parts/Button";

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
const buttonStyle = css`
  margin-right: 10px;
`;

const modalOverlayStyle = css`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
`;

const modalContentStyle = css`
  background-color: white;
  padding: 20px;
  border-radius: 6px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  width: 600px;
  max-width: 90%;
  max-height: 90vh;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const modalHeaderStyle = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const textareaStyle = css`
  width: 100%;
  height: 200px;
  font-family: monospace;
  padding: 10px;
  border: 1px solid #d0d7de;
  border-radius: 6px;
  box-sizing: border-box;
  resize: vertical;
`;

const actionBtnsStyle = css`
  display: flex;
  gap: 10px;
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
  const [isModalOpen, setIsModalOpen] = useState(false);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleImport = () => {
    onImport();
    closeModal();
  };

  const openConfigModal = () => {
    onConfigJsonChange('');
    setIsModalOpen(true);
  };

  return (
    <>
      <Button
        variant="secondary"
        onClick={openConfigModal}
      >
        設定の管理
      </Button>

      {isModalOpen && (
        <div css={modalOverlayStyle}>
          <div css={modalContentStyle}>
            <div css={modalHeaderStyle}>
              <h3>設定のインポート/エクスポート</h3>
              <Button variant="secondary" onClick={closeModal}>閉じる</Button>
            </div>

            <div css={actionBtnsStyle}>
              <Button
                variant="secondary"
                onClick={() => {
                  onExport();
                }}
              >
                現在の設定をテキストエリアに出力
              </Button>
              <Button
                variant="primary"
                onClick={() => {
                  handleImport()
                }}
              >
                テキストエリアの内容を反映
              </Button>
            </div>

            <textarea
              id="configJson"
              placeholder="JSONをペーストするか、現在の設定をエクスポートします"
              value={configJson}
              css={textareaStyle}
              onChange={(e) => onConfigJsonChange(e.target.value)}
            />
          </div>
        </div>
      )}
    </>
  );
};
