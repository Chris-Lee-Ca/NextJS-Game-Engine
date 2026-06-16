# Plugins

A Plugin manages raw external input or an external system. It self-registers its own listeners in `init()` and removes them in `deinit()`. It has no dependency on other plugins.

See [extensions/README.md](../README.md) for the Plugin vs Module decision rules.

## How to create a plugin

### Naming conventions

| Thing            | Convention              | Example                          |
| ---------------- | ----------------------- | -------------------------------- |
| Directory        | `camelCaseNamePlugin`   | `myFeaturePlugin`                |
| Handler file     | `PascalCaseHandler.ts`  | `MyFeatureHandler.ts`            |
| Handler class    | `PascalCaseHandler`     | `MyFeatureHandler`               |
| Constants file   | `constants.ts`          | —                                |
| Redux slice file | `myFeatureSlice.ts`     | —                                |
| UI components    | `components/` subfolder | `components/MyFeatureButton.tsx` |

### Required files

```
myFeaturePlugin/
  constants.ts        ← plugin ID and any tuning constants
  MyFeatureHandler.ts ← implements PluginHandler
  index.ts            ← re-exports everything consumers need
  README.md           ← what it does, installation, config options
```

Optional:

- `types.ts` — shared TypeScript types
- `myFeatureSlice.ts` — if the plugin has Redux state
- `myFeatureLogic.ts` — pure logic decoupled from DOM/Redux (easy to unit-test)
- `components/` — if the plugin ships React UI
