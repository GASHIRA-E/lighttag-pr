import type React from "react";

interface LabelButtonProps {
  onClick: () => void;
}

export function LabelButton({ onClick }: LabelButtonProps): React.JSX.Element {
  return (
    <button
      type="button"
      className="Button Button--secondary Button--small"
      onClick={(e) => {
        e.preventDefault();
        onClick();
      }}
    >
      ラベルを追加
    </button>
  );
}
