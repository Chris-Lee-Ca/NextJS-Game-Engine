# Changelog

All notable changes to the **game-engine** library are documented here.
Demo-game changes are not included.

## [Unreleased]

## [1.7.0] - 2026-06-17

### Added

- `audioPlugin` — new singleton plugin for background music and sound effects; exposes `preloadSfx(id, src)` which is safe to call before `init()` (calls are queued and flushed automatically on plugin initialisation)
- Trigger bound system on `GameObject` — optional `triggerBound` rectangle with `onTriggerEnter` / `onTriggerExit` lifecycle hooks; `GameLoop` tracks overlap state per frame and fires enter/exit callbacks without affecting physics

### Changed

- Optimised `processTriggers()` in `GameLoop` by pre-filtering `ObjectPool` into trigger and bounded object lists once per frame, eliminating redundant per-iteration checks

## [1.6.0] - 2026-06-15

### Changed

- `virtualKeyboardPlugin` supports alias keycodes so the corresponding on-screen button lights up when a physical key is held

## [1.5.0] - 2026-06-15

### Added

- `virtualKeyboardPlugin` — promoted from demo-game into the game-engine library as a first-class plugin; dispatches real DOM `KeyboardEvent`s on `window` so all input-listening plugins (e.g. `keyboardEventPlugin`, `doubleTapRunPlugin`) respond automatically
- `doubleTapRunPlugin` — new plugin that detects a double-tap on a movement key and dispatches `setIsRunning` to toggle the running state

## [1.4.0] - 2026-06-12

### Changed

- Upgraded Next.js 14.2.14 → 14.2.35 (patches CVE GHSA-3x4c-7xq6-9pq8: unbounded `next/image` disk cache growth)

## [1.3.0] - 2024-10-19

### Added

- `MainCharacterActionControlModule` — new module for handling character action keys (e.g. interact) separately from direction input

### Changed

- Renamed `MainCharacterControlModule` to `MainCharacterDirectionControlModule` to better reflect its single responsibility
- Moved configurable direction key mapping from `keyboardEventPlugin` into `MainCharacterDirectionControlModule`; the keyboard plugin now only captures raw key events
- Extended `levelPlugin` slice and types to carry additional level metadata
- Updated `Image` component API

## [1.2.0] - 2024-10-06

### Added

- `TypeWriter` component — reusable typewriter-animation element for in-game text
- `Image` component — game-object image wrapper
- `Makefile` with `make all` target: compiles TypeScript, packs as a distributable `.tgz`, and cleans up intermediate files
- `disable()` method on `MainCharacterDirectionControlModule` to temporarily suspend character movement

### Fixed

- Dependency vulnerability fixes
- TypeScript build configuration corrections

## [1.1.0] - 2024-09-30

### Changed

- Migrated the extension architecture from `redux/modules/` to `extensions/plugins/` and `extensions/modules/`
- Formalised a strict `core → plugin → module` dependency hierarchy enforced at `GameLoop` init time
- Introduced `PluginHandler` and `ModuleHandler` base classes with `init / update / deinit` lifecycle hooks
- Promoted `keyboardEventPlugin` and `levelPlugin` to first-class plugins with their own Redux slices
- Added `CanvasHelper` to `levelPlugin` for viewport and canvas coordinate utilities

## [1.0.0] - 2024-09-29

### Added

- Initial release
- `GameLoop` singleton driven by `requestAnimationFrame` with configurable FPS cap
- `ObjectPool` for ID-based game object management
- Base renderable components: `GameObject`, `Sprite`, `AnimatedSprite`, `Rectangle`, `InvisibleWall`
- Redux store with `coreSlice` for frame-time tracking
- Utility helpers: `GridHelper`, `SpriteHelper`, `Converter`
- `useCSSVariable` React hook
