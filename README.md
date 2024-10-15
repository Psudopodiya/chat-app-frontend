# Chat App Frontend - Conventional Commits Guide

Welcome to the **Chat App Frontend**! This guide covers the **Conventional Commits** format used in this project to maintain consistency and clarity in commit messages.

## 📝 Commit Message Format

Each commit message follows the structure:

```
<type>(optional scope): <description>
```

### Example:

```
feat(pre-event): add speakers section
```

### 🎯 Key Components:

1. **Type**: The type indicates the nature of changes made in the commit.
2. **Scope (Optional)**: A label indicating which part of the app the commit affects.
3. **Description**: A concise explanation of the commit’s intent in the present tense.

---

## 🔍 1. Type

Choose one of the following types based on your change:

- **feat**: Adding or removing a feature.
  - Example: `feat: add table on landing page`
- **fix**: Fixing a bug or issue.
  - Example: `fix: illustration overflows in mobile view`
- **docs**: Documentation updates.
  - Example: `docs: update README.md with new sections`
- **style**: Formatting and styling changes without altering logic.
  - Example: `style: fix code indentations`
- **chore**: Changes to build process or dependencies.
  - Example: `chore: bump dependencies`
- **refactor**: Refactoring code without changing output.
  - Example: `refactor: restructure user service logic`
- **ci**: Continuous Integration (CI) updates.
  - Example: `ci: update GitHub actions workflow`
- **test**: Modifying or adding test files.
  - Example: `test: add unit tests for login component`
- **revert**: Reverting a previous commit.
  - Example: `revert: undo button style change`
- **perf**: Performance improvements.
  - Example: `perf: optimize rendering of chat component`
- **vercel**: Trigger deployment via Vercel.
  - Example: `vercel: trigger deployment`

---

## 🔍 2. Optional Scope

You may add a scope to specify which part of the project the commit affects. This is especially useful for larger projects with many components.

### Example:

```
feat(pre-event): add date label
```

---

## 🔍 3. Description

The description should clearly explain the **"what"** and **"why"** behind the change. Keep the following in mind:

- Use **present tense** (e.g., “change” instead of “changed” or “changes”).
- Avoid capital letters at the beginning.
- No full stops (`.`) at the end.
- If your change has **BREAKING CHANGES**, add that to the description.
- For **fix** commits, always mention the issue you are fixing.

### Example:

```
fix: resolve image load error on profile page
```

---

## ⚙️ ESLint Configuration

### 1. Update VS Code Settings

To ensure clean code formatting, add the following to your `settings.json` in VS Code:

```json
{
  "editor.codeActionsOnSave": {
    "source.organizeImports": true,
    "source.fixAll.eslint": true
  },
  "eslint.validate": ["typescript", "typescriptreact"]
}
```

This setup ensures that:

- Imports are automatically organized.
- ESLint fixes are applied automatically on save.

---

## 🚀 Best Practices for Commits

- If you have **multiple changes**, commit them **one by one**.
- Keep your commit messages **clear and concise**.
- Always follow this format for a consistent commit history.

Happy Coding! ✨
