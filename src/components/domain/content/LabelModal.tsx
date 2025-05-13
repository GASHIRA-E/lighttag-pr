import type React from "react";
import type { LabelsConfig, SelectedLabel } from "@/types";
import { LabelSelector } from "./LabelSelector";
import { ActionButtons } from "./ActionButtons";
import type { DisplayMode } from "@/utils/content/storage";
import { saveDisplayMode } from "@/utils/content/storage";
import { LabelModalHeader } from "@/components/domain/content/LabelModalHeader";
import { css } from "@emotion/react";

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

  // モーダル全体のスタイル
  const modalStyles = css`
    position: absolute;
    top: 100%;
    left: 0;
    background-color: var(--color-white);
    border: 1px solid var(--color-border);
    border-radius: 6px;
    box-shadow: 0 8px 24px var(--color-shadow);
    z-index: 100;
    margin-top: 5px;
    max-height: 350px;
    overflow-y: hidden;
    display: flex;
    flex-direction: column;
    min-width: 300px;
    max-width: 500px;
  `;

  // 表示モードの切り替え
  const toggleDisplayMode = (): void => {
    const newMode = displayMode === "pro" ? "normal" : "pro";
    setDisplayMode(newMode);
    saveDisplayMode(newMode);
  };

  return (
    <div css={modalStyles}>
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
