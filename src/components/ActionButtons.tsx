import type React from "react";

interface ActionButtonsProps {
  onInsert: () => void;
  onCancel: () => void;
  onClear: () => void;
}

export function ActionButtons({
  onInsert,
  onCancel,
  onClear,
}: ActionButtonsProps): React.JSX.Element {
  return (
    <div className="gh-label-btn-group">
      <button type="button" className="gh-label-insert-btn" onClick={onInsert}>
        挿入
      </button>
      <button type="button" className="gh-label-clear-btn" onClick={onClear}>
        クリア
      </button>
      <button type="button" className="gh-label-cancel-btn" onClick={onCancel}>
        キャンセル
      </button>
    </div>
  );
}
