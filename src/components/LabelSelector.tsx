import type React from "react";
import type { LabelsConfig, SelectedLabel } from "@/types";
import { LabelGroup } from "@/components/LabelGroup";
import type { DisplayMode } from "@/utils/content/storage";

interface LabelSelectorProps {
  labelsConfig: LabelsConfig;
  selectedLabels: SelectedLabel[];
  displayMode: DisplayMode;
  onLabelClick: (label: string, type: string) => void;
}

export function LabelSelector({
  labelsConfig,
  selectedLabels,
  displayMode,
  onLabelClick,
}: LabelSelectorProps): React.JSX.Element {
  return (
    <div className="gh-label-selector">
      {labelsConfig.labels.map((group, index) => (
        <LabelGroup
          key={`${group.type}-${index}`}
          group={group}
          selectedLabels={selectedLabels}
          onLabelClick={onLabelClick}
          displayMode={displayMode}
        />
      ))}
    </div>
  );
}
