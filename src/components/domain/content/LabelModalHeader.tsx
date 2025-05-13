import type React from "react";
import type { DisplayMode } from "@/utils/content/storage";
import { Button } from "@/components/parts/Button"
import { css } from "@emotion/react";

interface LabelModalHeaderProps {
  displayMode: DisplayMode;
  toggleDisplayMode: () => void;
}

export function LabelModalHeader({
  displayMode,
  toggleDisplayMode,
}: LabelModalHeaderProps): React.JSX.Element {
  // モーダルヘッダーのスタイル
  const headerStyles = css`
    padding: 12px 12px 8px;
    border-bottom: 1px solid var(--color-border);
    background-color: var(--color-bg-light);
  `;

  // タイトルのスタイル
  const titleStyles = css`
    font-weight: 600;
    font-size: 14px;
    color: var(--color-text);
  `;

  // 表示モード情報のスタイル
  const displayModeStyles = css`
    font-size: 12px;
    color: var(--color-text-secondary);
  `;

  // 表示モード（Pro）のスタイル
  const proModeStyles = css`
    color: var(--color-success);
  `;

  // 表示モード（Normal）のスタイル
  const normalModeStyles = css`
    color: var(--color-text-secondary);
  `;

  // フレックスコンテナのスタイル
  const flexContainerStyles = css`
    display: flex;
    justify-content: space-between;
    align-items: center;
  `;

  return (
    <div css={headerStyles}>
      <div>
        <p css={titleStyles}>ラベルを選択</p>
      </div>
      <div css={flexContainerStyles}>
        <p css={displayModeStyles}>
          現在の表示モード:{" "}
          <span css={displayMode === "pro" ? proModeStyles : normalModeStyles}>
            {displayMode === "pro" ? "Pro" : "Normal"}
          </span>
        </p>
        <Button
          onClick={toggleDisplayMode}
          type="button"
          size="small"
          title={
            displayMode === "pro"
              ? "チェックボックス表示に切り替え"
              : "シンプル表示に切り替え"
          }
        >
          モード切り替え
        </Button>
      </div>
    </div>
  );
}
