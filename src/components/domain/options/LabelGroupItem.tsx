import type React from "react";
import { css } from "@emotion/react";
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

// スタイル定義
const labelGroupStyle = css`
  margin-bottom: 20px;
  border: 1px solid #d0d7de;
  border-radius: 6px;
  padding: 15px;
`;

const labelGroupHeaderStyle = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const labelItemsStyle = css`
  margin-top: 10px;
`;

const inputStyle = css`
  padding: 5px 8px;
  border: 1px solid #d0d7de;
  border-radius: 4px;
`;

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
    <div css={labelGroupStyle}>
      <div css={labelGroupHeaderStyle}>
        <input
          type="text"
          value={group.type}
          placeholder="グループ名"
          css={inputStyle}
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

      <div css={labelItemsStyle}>
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
