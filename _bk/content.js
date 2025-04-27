// ラベル設定をストレージから読み込み
async function loadLabelsConfig() {
    return new Promise((resolve) => {
        chrome.storage.local.get('labelsConfig', (result) => {
            if (result.labelsConfig) {
                resolve(result.labelsConfig);
            }
            else {
                // デフォルト設定
                const defaultConfig = {
                    labels: [
                        {
                            type: "観点",
                            items: [
                                { label: "設計", description: "設計や仕様に合致しているか" },
                                { label: "テスト", description: "テストが十分か" },
                                { label: "実装", description: "実装の品質について" },
                                { label: "UI", description: "ユーザーインターフェースについて" }
                            ]
                        },
                        {
                            type: "温度感",
                            items: [
                                { label: "FYI", description: "参考情報の共有" },
                                { label: "Q", description: "質問" },
                                { label: "提案", description: "改善の提案" },
                                { label: "必須", description: "必ず対応してほしい" }
                            ]
                        }
                    ]
                };
                // デフォルト設定を保存
                chrome.storage.local.set({ labelsConfig: defaultConfig });
                resolve(defaultConfig);
            }
        });
    });
}
// コメント入力欄を監視して拡張UIを追加
function setupCommentHelper() {
    // GitHub PR画面のコメント入力欄を監視
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.addedNodes.length) {
                checkForCommentBoxes();
            }
        });
    });
    // DOM変更の監視を開始
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
    // 初期ロード時にもチェック
    checkForCommentBoxes();
}
// コメント入力欄を探して拡張UIを追加
async function checkForCommentBoxes() {
    // GitHub PR画面のコメント入力欄を特定
    const commentFields = document.querySelectorAll('.js-comment-field');
    if (commentFields.length === 0)
        return;
    // ラベル設定を読み込み
    const labelsConfig = await loadLabelsConfig();
    commentFields.forEach((field) => {
        if (field.dataset.labelHelperInitialized)
            return; // 既に初期化済み
        // 初期化済みマークを付ける
        field.dataset.labelHelperInitialized = 'true';
        // ラベル挿入ボタンを作成
        const helperContainer = document.createElement('div');
        helperContainer.className = 'gh-label-helper-container';
        const addLabelBtn = document.createElement('button');
        addLabelBtn.className = 'gh-label-helper-btn';
        addLabelBtn.textContent = 'ラベルを追加';
        addLabelBtn.addEventListener('click', (e) => {
            e.preventDefault();
            toggleLabelSelector(helperContainer, field, labelsConfig);
        });
        helperContainer.appendChild(addLabelBtn);
        // コメント入力欄の前に挿入
        field.parentElement?.insertBefore(helperContainer, field);
    });
}
// ラベル選択UIの表示/非表示を切り替え
function toggleLabelSelector(container, commentField, labelsConfig) {
    // 既存のセレクターがあれば削除
    const existingSelector = container.querySelector('.gh-label-selector');
    if (existingSelector) {
        container.removeChild(existingSelector);
        return;
    }
    // ラベル選択UIを作成
    const selectorElem = document.createElement('div');
    selectorElem.className = 'gh-label-selector';
    // 選択されたラベルの配列
    const selectedLabels = [];
    // ラベルグループごとに表示
    labelsConfig.labels.forEach(labelGroup => {
        const groupTitle = document.createElement('h4');
        groupTitle.textContent = labelGroup.type;
        selectorElem.appendChild(groupTitle);
        const labelsContainer = document.createElement('div');
        labelsContainer.className = 'gh-label-group';
        // 各ラベルを表示
        labelGroup.items.forEach(item => {
            const labelElem = document.createElement('span');
            labelElem.className = 'gh-label-item';
            labelElem.textContent = item.label;
            labelElem.title = item.description;
            // クリック時の選択/解除
            labelElem.addEventListener('click', () => {
                const index = selectedLabels.findIndex(l => l.label === item.label && l.type === labelGroup.type);
                if (index >= 0) {
                    // 選択解除
                    selectedLabels.splice(index, 1);
                    labelElem.classList.remove('selected');
                }
                else {
                    // 選択
                    selectedLabels.push({
                        label: item.label,
                        type: labelGroup.type
                    });
                    labelElem.classList.add('selected');
                }
            });
            labelsContainer.appendChild(labelElem);
        });
        selectorElem.appendChild(labelsContainer);
    });
    // 挿入ボタン
    const insertBtn = document.createElement('button');
    insertBtn.className = 'gh-label-insert-btn';
    insertBtn.textContent = '挿入';
    insertBtn.addEventListener('click', () => {
        insertLabels(commentField, selectedLabels);
        container.removeChild(selectorElem);
    });
    // キャンセルボタン
    const cancelBtn = document.createElement('button');
    cancelBtn.className = 'gh-label-cancel-btn';
    cancelBtn.textContent = 'キャンセル';
    cancelBtn.addEventListener('click', () => {
        container.removeChild(selectorElem);
    });
    // ボタングループ
    const btnGroup = document.createElement('div');
    btnGroup.className = 'gh-label-btn-group';
    btnGroup.appendChild(insertBtn);
    btnGroup.appendChild(cancelBtn);
    selectorElem.appendChild(btnGroup);
    container.appendChild(selectorElem);
}
// 選択したラベルをコメント入力欄に挿入
function insertLabels(commentField, selectedLabels) {
    if (selectedLabels.length === 0)
        return;
    // 選択したラベルをテキスト形式に変換
    const labelTexts = selectedLabels.map(item => `[${item.label}]`);
    const labelString = labelTexts.join('') + ' ';
    // 現在のカーソル位置またはテキスト先頭に挿入
    const currentText = commentField.value;
    const cursorPos = commentField.selectionStart || 0;
    // テキスト挿入
    commentField.value =
        currentText.slice(0, cursorPos) +
            labelString +
            currentText.slice(cursorPos);
    // カーソル位置を更新
    const newCursorPos = cursorPos + labelString.length;
    commentField.setSelectionRange(newCursorPos, newCursorPos);
    // フォーカスを戻す
    commentField.focus();
}
// 初期化処理
setupCommentHelper();
export {};
