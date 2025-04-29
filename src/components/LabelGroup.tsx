import type React from "react";
import type { LabelGroup as LabelGroupType, SelectedLabel } from "../types";
import { LabelItem } from "./LabelItem";

interface LabelGroupProps {
  group: LabelGroupType;
  selectedLabels: SelectedLabel[];
  onLabelClick: (label: string, type: string) => void;
}

export function LabelGroup({
  group,
  selectedLabels,
  onLabelClick,
}: LabelGroupProps): React.JSX.Element {
  return (
    <div className="gh-label-group-container">
      <h4>{group.type}</h4>
      <div className="gh-label-group">
        {group.items.map((item, index) => {
          const isSelected = selectedLabels.some(
            (l) => l.label === item.label && l.type === group.type
          );

          return (
            <LabelItem
              key={`${item.label}-${index}`}
              label={item.label}
              description={item.description}
              isSelected={isSelected}
              onClick={() => onLabelClick(item.label, group.type)}
            />
          );
        })}
      </div>
    </div>
  );
}
