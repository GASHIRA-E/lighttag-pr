import type React from "react";
import type { LabelsConfig, SelectedLabel } from "../types";
import { LabelGroup } from "./LabelGroup";
import type { DisplayMode } from "../utils/content/storage";
import { css } from "@emotion/react";

interface LabelSelectorProps {
  labelsConfig: LabelsConfig;
  selectedLabels: SelectedLabel[];
  displayMode: DisplayMode;
  onLabelClick: (label: string, type: string) => void;
}

const labelSelectorStyles = css`
  flex-shrink: 1;
  overflow-y: scroll;
`;

export function LabelSelector({
  labelsConfig,
  selectedLabels,
  displayMode,
  onLabelClick,
}: LabelSelectorProps): React.JSX.Element {
  return (
    <div css={labelSelectorStyles}>
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
