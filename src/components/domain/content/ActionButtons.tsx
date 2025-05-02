import type React from "react";
import { Button } from "@/components/parts/Button";

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
      <Button onClick={onInsert} className="gh-label-insert-btn">
        挿入
      </Button>
      <Button onClick={onClear} className="gh-label-clear-btn">
        クリア
      </Button>
      <Button onClick={onCancel} className="gh-label-cancel-btn">
        キャンセル
      </Button>
    </div>
  );
}
