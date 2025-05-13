import type React from "react";
import type { DisplayMode } from "@/utils/content/storage";
import { css } from "@emotion/react";

interface LabelItemProps {
  label: string;
  description: string;
  isSelected: boolean;
  onClick: () => void;
  displayMode: DisplayMode;
}

export function LabelItem({
  label,
  description,
  isSelected,
  onClick,
  displayMode,
}: LabelItemProps): React.JSX.Element {
  // スタイル定義
  const proLabelStyles = css`
    display: inline-block;
    padding: 4px 8px;
    border: 1px solid var(--color-border);
    border-radius: 12px;
    font-size: 12px;
    cursor: pointer;
    background-color: var(--color-bg-light);
    color: ${isSelected ? "#000000" : "#393939"};
    &:hover {
      background-color: var(--color-bg-light-hover);
    }
    ${isSelected && `
      background-color: var(--color-selected-bg);
      border-color: var(--color-selected-border);
      color: var(--color-text-secondary);
    `}
  `;

  // normalモード用スタイル
  const normalLabelStyles = css`
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 8px;
    background-color: var(--color-bg-light);
    border: 1px solid var(--color-border);
    color: var(--color-text);
    border-radius: 6px;
    padding: 4px 8px;
    cursor: pointer;
    &:hover {
      background-color: var(--color-bg-light-hover);
    }
    ${isSelected && `
      background-color: var(--color-selected-bg);
      border-color: var(--color-selected-border);
    `}
  `;

  const labelNameStyles = css`
    font-size: 14px;
    font-weight: bold;
  `;

  const labelDescriptionStyles = css`
    margin-top: 4px;
    font-size: 12px;
    font-weight: normal;
    color: var(--color-text-secondary);
  `;

  // proモード：シンプルなラベル表示
  if (displayMode === "pro") {
    return (
      <span
        css={proLabelStyles}
        title={description}
        onClick={onClick}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            onClick();
          }
        }}
      >
        {label}
      </span>
    );
  }

  // normalモード：チェックボックスと説明文表示
  return (
    <label
      css={normalLabelStyles}
      htmlFor={`label-checkbox-${label}`}
    >
      <input
        type="checkbox"
        id={`label-checkbox-${label}`}
        checked={isSelected}
        onChange={onClick}
      />
      <div>
        <span css={labelNameStyles}>{label}</span>
        <div css={labelDescriptionStyles}>{description}</div>
      </div>
    </label>
  );
}
