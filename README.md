# Next JS Game Engine (Under Development)

- The `game-engine` folder provides tools for building a 2D game.
- The `demo-game` folder offers an example of how to use the `game-engine` folder to build a game.

## Tech Using

Typescript, Next.JS, Material UI

## Remark

Choosing `Next.js` over `React.js` is more for the sake of learning the latest feature of next js (ver 12 -> 14).

Even when using "use client," `Next.js` still renders client components on the server, which introduces more complexity when building your project.

Therefore, if you're more focused on game development, go for `React.js` (or perhaps using an existing game framework would be a smarter choice—unless you enjoy using `React` like I do !!).

## Local Development

```sh
# Under /demo-game
rm -rf .next
npm link ../game-engine
npm run dev
```
