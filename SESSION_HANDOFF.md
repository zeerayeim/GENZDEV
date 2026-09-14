# qw-pages-static-starter - Session Context

![Continuity](https://raw.githubusercontent.com/hackerware/continuity/main/assets/icon.png)

## 🤖 AI Assistant: MANDATORY WORKFLOW

**🚨 CHECKPOINT 1: You're reading this now (good!)**

**🚨 CHECKPOINT 2: Log decisions IMMEDIATELY after making them**
- **When:** After ANY architectural decision or important choice
- **How:** Call `log_decision(question, answer, tags)` via MCP
- **Tell the user:** "I've logged this decision for future sessions"
- **Examples:** Why X instead of Y? Why this approach? Why this fix?

**🚨 CHECKPOINT 3: Search before suggesting changes**
- **When:** Before recommending architecture changes
- **How:** Call `search_decisions(query: "keyword")` via MCP
- **Why:** Avoid suggesting already-rejected approaches

**📖 Full guide:** Use **@continuity ai-usage-guide** for complete documentation

---

**You must be accurate and truthful. State only what you know with certainty. If you're unsure, uncertain, or speculating, say so explicitly. I need reliable assistance, not agreement.**

## 🏗️ Architecture Overview

**Core Systems:**
- **Decision Logging** - Smart clipboard detection, 5 templates, auto-tag extraction
- **Documentation Tracking** - AST parsing with TypeScript compiler API, semantic change detection
- **File Protection** - Prevent AI modification of critical files (.env, credentials)
- **MCP Integration** - Works with Claude Code, Cline, Roo Code via @continuity mentions
- **Delta Tracking** - Shows what changed since last sync
- **Auto-Sync** - Hands-free workflow automation

**Technical Depth:**
- TypeScript Compiler API (ts.createSourceFile, ts.SyntaxKind) for AST parsing
- Exports: functions, classes, interfaces, types, constants
- Tracks: signatures, async status, parameters, return types, JSDoc
- Change detection: new/removed exports, signature changes, async conversions
- Markdown parsing: code blocks, inline code, file references
- Gitignore pattern matching with glob-to-regex conversion
- Smart .txt filtering (docs/, notes/, guides/ folders only)

**Storage:**
- `.continuity/decisions.json` - Architectural decisions
- `.continuity/doc-status.json` - Documentation status
- `.continuity/doc-exports.json` - Code exports snapshot
- `.continuity/delta-snapshot.json` - Last sync state
- `.continuity/protected-files.json` - Protected file patterns
- `SESSION_HANDOFF.md` - Full context for AI handoff


## Project Purpose
React application project

## Tech Stack
- **Framework:** React application
- react
- react-dom
- @vitejs/plugin-react



---
*[Handoff truncated to fit token limit]*
