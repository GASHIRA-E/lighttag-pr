import type React from "react";
import type { DisplayMode } from "../utils/content/labels";

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
  // proモード：シンプルなラベル表示
  if (displayMode === "pro") {
    return (
      <span
        className={`gh-label-item ${isSelected ? "selected" : ""}`}
        style={{
          color: isSelected ? "#000000" : "#393939",
        }}
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
    <label className="gh-label-item-normal" htmlFor={`label-checkbox-${label}`}>
      <div className="gh-label-checkbox-container">
        <input
          type="checkbox"
          id={`label-checkbox-${label}`}
          checked={isSelected}
          onChange={onClick}
          className="gh-label-checkbox"
        />
        <span className="gh-label-name">{label}</span>
      </div>
      <div className="gh-label-description">{description}</div>
    </label>
  );
}
