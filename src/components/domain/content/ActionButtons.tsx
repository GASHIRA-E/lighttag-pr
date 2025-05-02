import type React from "react";
import { Button } from "@/components/parts/Button";
import { css } from "@emotion/react";

interface ActionButtonsProps {
  onInsert: () => void;
  onCancel: () => void;
  onClear: () => void;
}

const buttonGroupStyles = css`
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  background-color: var(--color-bg-light);
  padding: 8px 12px 12px;
`;

export function ActionButtons({
  onInsert,
  onCancel,
  onClear,
}: ActionButtonsProps): React.JSX.Element {
  return (
    <div css={buttonGroupStyles}>
      <Button variant="primary" onClick={onInsert}>
        挿入
      </Button>
      <Button variant="warning" onClick={onClear}>
        クリア
      </Button>
      <Button variant="secondary" onClick={onCancel}>
        キャンセル
      </Button>
    </div>
  );
}
