import type React from "react";
import type { LabelItem } from "@/types";
import { Button } from "../../parts/Button";

interface LabelItemFormProps {
  /**
   * ラベルアイテム
   */
  item: LabelItem;
  /**
   * グループのインデックス
   */
  groupIndex: number;
  /**
   * アイテムのインデックス
   */
  itemIndex: number;
  /**
   * ラベルの更新時のコールバック
   */
  onUpdateLabelItem: (groupIndex: number, itemIndex: number, field: keyof LabelItem, value: string) => void;
  /**
   * ラベルの削除時のコールバック
   */
  onDeleteLabelItem: (groupIndex: number, itemIndex: number) => void;
}

/**
 * ラベルアイテムのフォームコンポーネント
 */
export const LabelItemForm: React.FC<LabelItemFormProps> = ({
  item,
  groupIndex,
  itemIndex,
  onUpdateLabelItem,
  onDeleteLabelItem,
}) => {
  return (
    <div className="label-item">
      <input
        type="text"
        className="label-name"
        value={item.label}
        placeholder="ラベル名"
        onChange={(e) =>
          onUpdateLabelItem(groupIndex, itemIndex, "label", e.target.value)
        }
      />
      <input
        type="text"
        className="label-description"
        value={item.description}
        placeholder="説明"
        onChange={(e) =>
          onUpdateLabelItem(groupIndex, itemIndex, "description", e.target.value)
        }
      />
      <Button
        variant="danger"
        size="small"
        onClick={() => onDeleteLabelItem(groupIndex, itemIndex)}
      >
        削除
      </Button>
    </div>
  );
};
