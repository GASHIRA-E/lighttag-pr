import type React from "react";

interface ActionButtonsProps {
  onInsert: () => void;
  onCancel: () => void;
}

export function ActionButtons({
  onInsert,
  onCancel,
}: ActionButtonsProps): React.JSX.Element {
  return (
    <div className="gh-label-btn-group">
      <button type="button" className="gh-label-insert-btn" onClick={onInsert}>
        挿入
      </button>
      <button type="button" className="gh-label-cancel-btn" onClick={onCancel}>
        キャンセル
      </button>
    </div>
  );
}
