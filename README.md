# Next JS Game Engine

A 2D game engine built on top of Next.js, with a portfolio game as its demo.

- The `game-engine` folder is the reusable library for building 2D games.
- The `demo-game` folder is a portfolio game built using `game-engine`, serving as both a usage example and a live demo.

## Tech Stack

TypeScript, Next.JS, Redux, Material UI

## Remark

Choosing `Next.js` over `React.js` is more for the sake of learning the latest feature of next js (ver 12 -> 14).

Even when using "use client," `Next.js` still renders client components on the server, which introduces more complexity when building your project.

Therefore, if you're more focused on game development, place transfer the entire project to `React.js` (or perhaps using an existing game framework would be a smarter choice—unless you enjoy using `React` like I do !!).

## Project Structure

```
next-js-game-engine/
├── game-engine/    # Reusable game library — see game-engine/README.md
└── demo-game/      # Portfolio game consuming game-engine — see demo-game/README.md
```

## Key Architectural Concepts

**Extension system** — `core → plugin → module` dependency chain. Plugins extend the core (keyboard input, level management) and are initialised first. Modules build on top of a specific plugin (character direction/action control) and are initialised after. No reverse dependencies are allowed.

**Game loop** — `GameLoop` is a singleton driven by `requestAnimationFrame` with a configurable FPS cap. Each tick dispatches a time update, then calls `update(deltaTime)` on every plugin, module, and pooled game object in order.

## Local Development

```sh
# Under /demo-game
rm -rf .next
npm link ../game-engine
npm run dev
```

## Build Library

```sh
# Under /game-engine
make all
```
