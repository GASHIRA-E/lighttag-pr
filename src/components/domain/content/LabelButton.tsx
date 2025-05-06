import type React from "react";
import { Button } from "@/components/parts/Button";

interface LabelButtonProps {
  onClick: () => void;
}

export function LabelButton({ onClick }: LabelButtonProps): React.JSX.Element {
  return (
    <Button
      type="button"
      variant="secondary"
      size="small"
      onClick={(e) => {
        e.preventDefault();
        onClick();
      }}
    >
      ラベルを追加
    </Button>
  );
}
