import type React from "react";
import { css } from "@emotion/react";

type ButtonVariant = "primary" | "secondary" | "warning" | "default";
type ButtonSize = "small" | "medium" | "large";

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
  /**
   * ボタンのバリアント（スタイルの種類）
   */
  variant?: ButtonVariant;
  /**
   * ボタンのサイズ
   */
  size?: ButtonSize;
  /**
   * ボタンを無効化する
   */
  disabled?: boolean;
}

// 共通スタイル
const baseButtonStyles = css`
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
  outline: none;
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

// バリアントスタイル
const variantStyles = {
  primary: css`
    background-color: var(--color-success, #2da44e);
    color: #ffffff;
    border: 1px solid rgba(27, 31, 36, 0.15);
    &:hover:not(:disabled) {
      background-color: var(--color-success-hover, #2c974b);
    }
  `,
  secondary: css`
    background-color: var(--color-bg-light, #f6f8fa);
    color: var(--color-text, #24292f);
    border: 1px solid var(--color-border-alpha, rgba(27, 31, 36, 0.15));
    &:hover:not(:disabled) {
      background-color: var(--color-bg-light-hover, #e0e0e0);
    }
  `,
  warning: css`
    background-color: var(--color-warning, #bf8700);
    color: #ffffff;
    border: 1px solid rgba(27, 31, 36, 0.15);
    &:hover:not(:disabled) {
      background-color: var(--color-warning-hover, #9e7200);
    }
  `,
  default: css`
    background-color: #ffffff;
    color: var(--color-text, #24292f);
    border: 1px solid var(--color-border, #d0d7de);
    &:hover:not(:disabled) {
      background-color: var(--color-bg-light, #f6f8fa);
    }
  `
};

// サイズスタイル
const sizeStyles = {
  small: css`
    padding: 3px 8px;
    font-size: 12px;
  `,
  medium: css`
    padding: 5px 12px;
    font-size: 14px;
  `,
  large: css`
    padding: 8px 16px;
    font-size: 16px;
  `
};

/**
 * 共通ボタンコンポーネント
 */
export function Button({
  children,
  onClick,
  type = "button",
  title,
  className = "",
  variant = "default",
  size = "medium",
  disabled = false,
}: ButtonProps): React.JSX.Element {
  return (
    <button
      type={type}
      className={className}
      onClick={onClick}
      title={title}
      disabled={disabled}
      css={[
        baseButtonStyles,
        variantStyles[variant],
        sizeStyles[size]
      ]}
    >
      {children}
    </button>
  );
}
