# Modules

A Module interprets plugin state and dispatches game commands. It reads from a plugin's Redux state in `update()` and never self-registers DOM listeners. Every module must declare a `pluginId` — the plugin it depends on.

See [extensions/README.md](../README.md) for the Plugin vs Module decision rules.

## How to create a module

### Naming conventions

| Thing            | Convention             | Example               |
| ---------------- | ---------------------- | --------------------- |
| Directory        | `PascalCaseNameModule` | `MyFeatureModule`     |
| Handler file     | `PascalCaseHandler.ts` | `MyFeatureHandler.ts` |
| Handler class    | `PascalCaseHandler`    | `MyFeatureHandler`    |
| Constants file   | `constants.ts`         | —                     |
| Redux slice file | `myFeatureSlice.ts`    | —                     |

### Required files

```
MyFeatureModule/
  constants.ts        ← module ID and any tuning constants
  MyFeatureHandler.ts ← implements ModuleHandler
  index.ts            ← re-exports everything consumers need
  README.md           ← what it does, plugin dependency, installation
```

Optional:

- `types.ts` — shared TypeScript types
- `myFeatureSlice.ts` — if the module has its own Redux state
- `helper.ts` — pure helper functions
