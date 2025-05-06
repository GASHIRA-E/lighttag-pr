import type React from "react";
import type { DisplayMode } from "@/utils/content/storage";
import { Button } from "@/components/parts/Button"

interface LabelModalHeaderProps {
  displayMode: DisplayMode;
  toggleDisplayMode: () => void;
}

export function LabelModalHeader({
  displayMode,
  toggleDisplayMode,
}: LabelModalHeaderProps): React.JSX.Element {
  return (
    <div className="gh-label-modal-header">
      <div>
        <p className="gh-label-modal-title">ラベルを選択</p>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <p className="gh-label-display-mode">
          現在の表示モード:{" "}
          <span className={`gh-label-display-mode-${displayMode}`}>
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
