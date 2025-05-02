import type React from "react";

interface ButtonProps {
  /**
   * ボタンに表示するテキスト
   */
  children: React.ReactNode;
  /**
   * クリック時のイベントハンドラ
   */
  onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  /**
   * ボタンのタイプ
   */
  type?: "button" | "submit" | "reset";
  /**
   * ツールチップとして表示するタイトル
   */
  title?: string;
  /**
   * CSSクラス名
   */
  className?: string;
}

/**
 * 共通ボタンコンポーネント
 */
export function Button({
  children,
  onClick,
  type = "button",
  title,
  className = "",
}: ButtonProps): React.JSX.Element {
  return (
    <button type={type} className={className} onClick={onClick} title={title}>
      {children}
    </button>
  );
}
