import type React from "react";
import type { LabelItem } from "@/types";
import { css } from "@emotion/react";
import { Button } from "@/components/parts/Button";

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

// スタイル定義
const labelItemStyle = css`
  display: flex;
  margin-bottom: 10px;
  gap: 10px;
`;

const inputBaseStyle = css`
  padding: 5px 8px;
  border: 1px solid #d0d7de;
  border-radius: 4px;
`;

const labelNameStyle = css`
  width: 120px;
`;

const labelDescriptionStyle = css`
  flex: 1;
`;

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
    <div css={labelItemStyle}>
      <input
        type="text"
        css={[inputBaseStyle, labelNameStyle]}
        value={item.label}
        placeholder="ラベル名"
        onChange={(e) =>
          onUpdateLabelItem(groupIndex, itemIndex, "label", e.target.value)
        }
      />
      <input
        type="text"
        css={[inputBaseStyle, labelDescriptionStyle]}
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
