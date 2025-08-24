# Wedjat

這是一個使用 pnpm 管理的 mono-repo 專案。

## 專案結構

```
wedjat/
├── apps/
│   ├── server/          # 後端子專案
│   │   ├── 技術棧：Hono + Prisma + TypeScript
│   │   └── 基於 https://hono.dev/docs/
│   └── extension/       # Chrome 擴展子專案
│       ├── 技術棧：crxjs + TypeScript
│       └── 基於 https://crxjs.dev/guide/installation/create-crxjs
├── packages/
│   └── shared/          # 共用子專案
├── package.json
├── pnpm-workspace.yaml
├── .husky/              # Git hooks 配置
├── commitlint.config.js # 提交訊息規範配置
└── README.md
```

## 技術棧

### Apps

- **server**: 後端服務，使用 Hono 框架、Prisma ORM 和 TypeScript
- **extension**: Chrome 瀏覽器擴展，使用 crxjs 和 TypeScript

### Packages

- **shared**: 共用的程式碼和工具函式庫

## 開發環境設置

1. 確保已安裝 pnpm
2. 在根目錄執行 `pnpm install` 安裝所有依賴
3. 各個子專案會自動建立連結

## 工作空間配置

`pnpm-workspace.yaml` 配置：

```yaml
packages:
  - "apps/*"
  - "packages/*"
```

## Git Hooks 與提交規範

### Husky

專案使用 [Husky](https://typicode.github.io/husky/get-started.html) 來管理 Git hooks，確保程式碼品質和提交規範。

### Conventional Commits

專案遵循 [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0-beta.2/) 規範，提交訊息格式為：

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

**類型 (type)**：

- `feat`: 新功能
- `fix`: 錯誤修復
- `docs`: 文件更新
- `style`: 程式碼格式調整
- `refactor`: 程式碼重構
- `test`: 測試相關
- `chore`: 建置過程或輔助工具的變動

**範例**：

```bash
git commit -m "feat: add user authentication system"
git commit -m "fix: resolve database connection issue"
git commit -m "docs: update API documentation"
```

## 子專案開發

每個子專案都有自己的 `package.json` 文件，可以獨立管理依賴和腳本。pnpm 會自動處理工作空間內的依賴連結。
