# demo-game — Implementation Folder

A portfolio game built with `game-engine`. Demonstrates how to use the engine and doubles as a live portfolio.

## Folder Structure

```
demo-game/
└── src/
    ├── app/                # Next.js App Router pages
    └── game/               # All game logic and UI
        ├── core/           # Game entry, GameCanvas, Viewport, StatusBar, LevelEditor
        ├── components/
        │   └── placements/ # Every in-game object, grouped by category
        │       ├── tile/   # Interactive world tiles: signage, company, school, painting, portal, road, …
        │       ├── character/  # Main character
        │       ├── enemy/  # Enemy objects
        │       └── pickUp/ # Collectibles (e.g. resume)
        ├── redux/          # Combined Redux store: game, level, keyboard, character, dialog, modal, backpack, editMode, alert, gameContent
        ├── helper/         # AnimationHelper, EditModeHelper
        ├── lib/            # Level definitions, game constants, control mappings, content data
        ├── types/          # Game-specific TypeScript types
        ├── assets/         # Sprite sheets, component images, skill icons
        └── sanity/         # CMS integration (Sanity + Apollo) for dynamic portfolio content
```

## Adding a New Placement (Tile / Character / Enemy / Pick-up)

1. Create a folder under the relevant category in `components/placements/`.
2. Implement the object class (extending the appropriate base from `game-engine`) and its React component(s).
3. Export via an `index.ts`.
4. Register it in the corresponding factory (`TileFactory`, `CharacterFactory`, etc.) with a unique type string.
5. Add the type string to the level data in `lib/level.ts` wherever the placement should appear.
