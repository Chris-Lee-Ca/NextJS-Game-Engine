# game-engine — Library Folder

A reusable library for building 2D games on Next.js. Distributed as a `.tgz` package consumed by `demo-game` (or any other Next.js project).

## Folder Structure

```
game-engine/
├── core/               # GameLoop (requestAnimationFrame + FPS cap), ObjectPool
├── components/         # Base renderable objects: GameObject, Sprite, Image, InvisibleWall, Rectangle
├── extensions/         # Plugin / Module extension system — see extensions/README.md
│   ├── plugins/        # Core extensions: keyboardEventPlugin, levelPlugin
│   └── modules/        # Plugin-dependent extensions: MainCharacterDirectionControl, MainCharacterActionControl
├── redux/              # Engine-level Redux slice (coreSlice) and store type
├── hooks/              # Shared React hooks (useCSSVariable)
├── helper/             # Utilities: Converter, GridHelper, SpriteHelper
├── lib/                # Engine-level constants
└── types/              # Shared TypeScript types
```

## Build Library

```sh
make all
```

`make all` compiles TypeScript (`dist/`), packs it into a `.tgz`, then cleans up `dist/`. Copy the resulting `.tgz` to the consuming project.

For local development with `npm link`, run `npm run build` instead (skips the pack/clean steps so `dist/` stays available).
