// map experience id to sanity all experience company name
const experienceIdMapping: Record<string, string> = {
    "yau-lee": "Yau Lee Holdings Limited",
    pl: "P L Technology Limited",
    redcliff: "Red Cliff Asset Management (AUM ~ US$ 1billion)",
};

// map project nickname to sanity all projects slug
const projectNicknameMapping: Record<string, string> = {
    gamehub: "gamehub",
    "big-two": "poker-game-big-two",
    "character-gpt": "character-gpt",
    sudoku: "sudoku-game",
    "final-year-project": "training-a-robot-to-see-and-communicate",
    "arduino-car": "arduino-automatic-vehicle",
    "portfolio-game-v1": "portfolio-game",
};

export { experienceIdMapping, projectNicknameMapping };
