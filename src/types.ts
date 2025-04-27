// GitHubコメントヘルパーの型定義

export interface LabelItem {
  label: string;
  description: string;
}

export interface LabelGroup {
  type: string;
  items: LabelItem[];
}

export interface LabelsConfig {
  labels: LabelGroup[];
}

export interface SelectedLabel {
  label: string;
  type: string;
}
