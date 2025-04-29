import type React from "react";

interface LabelItemProps {
  label: string;
  description: string;
  isSelected: boolean;
  onClick: () => void;
}

export function LabelItem({
  label,
  description,
  isSelected,
  onClick,
}: LabelItemProps): React.JSX.Element {
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
