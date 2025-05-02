import type React from "react";
import type { LabelsConfig, SelectedLabel } from "@/types";
import { LabelSelector } from "./LabelSelector";
import { ActionButtons } from "./ActionButtons";
import type { DisplayMode } from "@/utils/content/storage";
import { saveDisplayMode } from "@/utils/content/storage";
import { LabelModalHeader } from "@/components/LabelModalHeader";

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
      <LabelModalHeader
        displayMode={displayMode}
        toggleDisplayMode={toggleDisplayMode}
      />

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
