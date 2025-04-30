import type React from "react";
import type { LabelGroup as LabelGroupType, SelectedLabel } from "../types";
import { LabelItem } from "./LabelItem";
import type { DisplayMode } from "../utils/content/storage";
import { css } from "@emotion/react";

interface LabelGroupProps {
  group: LabelGroupType;
  selectedLabels: SelectedLabel[];
  onLabelClick: (label: string, type: string) => void;
  displayMode: DisplayMode;
}

const labelGroupHeaderStyles = css`
  padding: 4px 8px;
  font-size: 14px;
  color: var(--color-text);
  background-color: var(--color-bg-light);
  border-top: 1px solid var(--color-border);
  border-bottom: 1px solid var(--color-border);
  position: sticky;
  top: 0;
`;

export function LabelGroup({
  group,
  selectedLabels,
  onLabelClick,
  displayMode,
}: LabelGroupProps): React.JSX.Element {
  return (
    <div>
      <h4 css={labelGroupHeaderStyles}>{group.type}</h4>
      <div className="gh-label-group">
        {group.items.map((item, index) => {
          const isSelected = selectedLabels.some(
            (l) => l.label === item.label && l.type === group.type,
          );

          return (
            <LabelItem
              key={`${item.label}-${index}`}
              label={item.label}
              description={item.description}
              isSelected={isSelected}
              onClick={() => onLabelClick(item.label, group.type)}
              displayMode={displayMode}
            />
          );
        })}
      </div>
    </div>
  );
}
