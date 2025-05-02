import type React from "react";
import type { LabelGroup as LabelGroupType, SelectedLabel } from "@/types";
import { LabelItem } from "@/components/domain/content/LabelItem";
import type { DisplayMode } from "@/utils/content/storage";

interface LabelGroupProps {
  group: LabelGroupType;
  selectedLabels: SelectedLabel[];
  onLabelClick: (label: string, type: string) => void;
  displayMode: DisplayMode;
}

export function LabelGroup({
  group,
  selectedLabels,
  onLabelClick,
  displayMode,
}: LabelGroupProps): React.JSX.Element {
  return (
    <div>
      <h4
        style={{
          position: "sticky",
          top: "0",
        }}
      >
        {group.type}
      </h4>
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
