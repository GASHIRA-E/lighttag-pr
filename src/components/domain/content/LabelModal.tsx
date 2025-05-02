import type React from "react";
import type { LabelsConfig, SelectedLabel } from "@/types";
import { LabelSelector } from "@/components/domain/content/LabelSelector";
import { ActionButtons } from "@/components/domain/content/ActionButtons";
import type { DisplayMode } from "@/utils/content/storage";
import { saveDisplayMode } from "@/utils/content/storage";

interface LabelModalProps {
  isOpen: boolean;
  labelsConfig: LabelsConfig;
  selectedLabels: SelectedLabel[];
  onLabelClick: (label: string, type: string) => void;
  onInsert: () => void;
  onCancel: () => void;
  onClear: () => void;
  displayMode: DisplayMode;
  setDisplayMode: (mode: DisplayMode) => void;
}

export function LabelModal({
  isOpen,
  labelsConfig,
  selectedLabels,
  onLabelClick,
  onInsert,
  onCancel,
  onClear,
  displayMode,
  setDisplayMode,
}: LabelModalProps): React.JSX.Element | null {
  if (!isOpen) return null;

  // 表示モードの切り替え
  const toggleDisplayMode = (): void => {
    const newMode = displayMode === "pro" ? "normal" : "pro";
    setDisplayMode(newMode);
    saveDisplayMode(newMode);
  };

  return (
    <div className="gh-label-modal">
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
          <button
            className="gh-mode-toggle-btn"
            onClick={toggleDisplayMode}
            type="button"
            title={
              displayMode === "pro"
                ? "チェックボックス表示に切り替え"
                : "シンプル表示に切り替え"
            }
          >
            モード切り替え
          </button>
        </div>
      </div>

      <LabelSelector
        labelsConfig={labelsConfig}
        selectedLabels={selectedLabels}
        onLabelClick={onLabelClick}
        displayMode={displayMode}
      />

      <ActionButtons
        onInsert={onInsert}
        onCancel={onCancel}
        onClear={onClear}
      />
    </div>
  );
}
