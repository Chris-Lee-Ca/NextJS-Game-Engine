# Changelog

All notable changes to the **game-engine** library are documented here.
Demo-game changes are not included.

## [Unreleased]

## [1.4.0] - 2026-06-12
### Changed
- Add Playwright E2E tests, upgrade Next.js 14.2.35, release tooling
- more info in read me

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
