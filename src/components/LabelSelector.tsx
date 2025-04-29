import type React from "react";
import type { LabelsConfig, SelectedLabel } from "../types";
import { LabelGroup } from "./LabelGroup";
import { ActionButtons } from "./ActionButtons";

interface LabelSelectorProps {
  labelsConfig: LabelsConfig;
  selectedLabels: SelectedLabel[];
  onLabelClick: (label: string, type: string) => void;
  onInsert: () => void;
  onCancel: () => void;
}

export function LabelSelector({
  labelsConfig,
  selectedLabels,
  onLabelClick,
  onInsert,
  onCancel,
}: LabelSelectorProps): React.JSX.Element {
  return (
    <div className="gh-label-selector">
      {labelsConfig.labels.map((group, index) => (
        <LabelGroup
          key={`${group.type}-${index}`}
          group={group}
          selectedLabels={selectedLabels}
          onLabelClick={onLabelClick}
        />
      ))}

      <ActionButtons onInsert={onInsert} onCancel={onCancel} />
    </div>
  );
}
