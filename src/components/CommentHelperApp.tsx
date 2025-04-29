import type React from "react";
import { useState } from "react";
import type { LabelsConfig, SelectedLabel } from "../types";
import { LabelButton } from "./LabelButton";
import { LabelSelector } from "./LabelSelector";
import { addLabelToTextarea } from "../utils/content/labels";

interface CommentHelperAppProps {
  commentField: HTMLTextAreaElement;
  labelsConfig: LabelsConfig;
}

export function CommentHelperApp({
  commentField,
  labelsConfig,
}: CommentHelperAppProps): React.JSX.Element {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedLabels, setSelectedLabels] = useState<SelectedLabel[]>([]);

  // ラベルセレクターの表示/非表示を切り替え
  const toggleSelector = (): void => {
    setIsOpen(!isOpen);
  };

  // ラベルの選択状態を切り替え
  const toggleLabel = (label: string, type: string): void => {
    const index = selectedLabels.findIndex(
      (l) => l.label === label && l.type === type
    );

    if (index >= 0) {
      // 選択解除
      setSelectedLabels([
        ...selectedLabels.slice(0, index),
        ...selectedLabels.slice(index + 1),
      ]);
    } else {
      // 選択追加
      setSelectedLabels([...selectedLabels, { label, type }]);
    }
  };

  // 選択したラベルをコメント入力欄に挿入
  const handleInsertLabels = (): void => {
    if (selectedLabels.length === 0) return;

    // 選択したラベルのテキストのみの配列を作成
    const labelTextsOnly = selectedLabels.map((item) => item.label);

    // addLabelToTextarea関数を呼び出し
    addLabelToTextarea(commentField, labelTextsOnly);

    // セレクターを閉じる
    setIsOpen(false);

    // 選択をリセット
    setSelectedLabels([]);
  };

  return (
    <div className="gh-label-helper">
      <LabelButton onClick={toggleSelector} />

      {isOpen && (
        <LabelSelector
          labelsConfig={labelsConfig}
          selectedLabels={selectedLabels}
          onLabelClick={toggleLabel}
          onInsert={handleInsertLabels}
          onCancel={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}
