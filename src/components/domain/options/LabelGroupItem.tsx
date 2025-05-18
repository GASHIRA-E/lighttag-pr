import type React from "react";
import type { LabelGroup, LabelItem } from "@/types";
import { Button } from "../../parts/Button";
import { LabelItemForm } from "./LabelItemForm";

interface LabelGroupItemProps {
  /**
   * ラベルグループ
   */
  group: LabelGroup;
  /**
   * グループのインデックス
   */
  groupIndex: number;
  /**
   * グループ名変更時のコールバック
   */
  onUpdateGroupType: (groupIndex: number, newType: string) => void;
  /**
   * グループ削除時のコールバック
   */
  onDeleteGroup: (groupIndex: number) => void;
  /**
   * ラベル追加時のコールバック
   */
  onAddLabelItem: (groupIndex: number) => void;
  /**
   * ラベル更新時のコールバック
   */
  onUpdateLabelItem: (groupIndex: number, itemIndex: number, field: keyof LabelItem, value: string) => void;
  /**
   * ラベル削除時のコールバック
   */
  onDeleteLabelItem: (groupIndex: number, itemIndex: number) => void;
}

/**
 * ラベルグループのコンポーネント
 */
export const LabelGroupItem: React.FC<LabelGroupItemProps> = ({
  group,
  groupIndex,
  onUpdateGroupType,
  onDeleteGroup,
  onAddLabelItem,
  onUpdateLabelItem,
  onDeleteLabelItem
}) => {
  const generateItemKey = (itemIndex: number): string => {
    return `labelItem-${groupIndex}-${itemIndex}`;
  };
  return (
    <div className="label-group">
      <div className="label-group-header">
        <input
          type="text"
          value={group.type}
          placeholder="グループ名"
          onChange={(e) => onUpdateGroupType(groupIndex, e.target.value)}
        />
        <Button
          variant="danger"
          size="small"
          onClick={() => onDeleteGroup(groupIndex)}
        >
          グループ削除
        </Button>
      </div>

      <div className="label-items">
        {group.items.map((item, itemIndex) => (
          <LabelItemForm
            key={generateItemKey(itemIndex)}
            item={item}
            groupIndex={groupIndex}
            itemIndex={itemIndex}
            onUpdateLabelItem={onUpdateLabelItem}
            onDeleteLabelItem={onDeleteLabelItem}
          />
        ))}
      </div>

      <Button
        variant="secondary"
        onClick={() => onAddLabelItem(groupIndex)}
      >
        ラベル追加
      </Button>
    </div>
  );
};
