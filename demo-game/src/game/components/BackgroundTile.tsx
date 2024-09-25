import { Pixel } from "game-engine/types/general";
import { CUSTOM_STYLE, MAIN_SPRITE_SHEET } from "../lib/conts";
import { CSSProperties } from "react";
import { Theme } from "game-engine/redux/modules/levelModule";
import SpriteHelper from "game-engine/helper/SpriteHelper";
import Sprite from "game-engine/components/Sprite/Sprite";

interface BackgroundTileProps {
    rowIndex: number;
    colIndex: number;
    gridSide: Pixel;
    theme: Theme;
    tilesWidth: number;
    tilesHeight: number;
}
const BackgroundTile = (props: BackgroundTileProps) => {
    const { rowIndex, colIndex, gridSide, theme, tilesWidth, tilesHeight } = props;

    const handleTileBorderStyle = (row: number, col: number, tilesWidth: number, isCliff: Boolean): CSSProperties => {
        let borderStyle: CSSProperties = {};
        const mapBorder = CUSTOM_STYLE.BORDER.MAP_BORDER;
        const gridBorder = CUSTOM_STYLE.BORDER.GRID_BORDER;

        borderStyle["borderTop"] = gridBorder;
        borderStyle["borderLeft"] = gridBorder;
        borderStyle["borderRight"] = gridBorder;
        borderStyle["borderBottom"] = gridBorder;

        if (row === 0) borderStyle["borderLeft"] = mapBorder;
        if (col === 0) borderStyle["borderTop"] = mapBorder;
        if (row === tilesWidth - 1) borderStyle["borderRight"] = mapBorder;
        if (isCliff) borderStyle["borderBottom"] = mapBorder;

        return borderStyle;
    };

    const handleBackgroudTileStyle = (
        row: number,
        col: number,
        tilesWidth: number,
        isCliff: boolean
    ): CSSProperties => {
        let style: CSSProperties = {};
        style = { ...style, ...handleTileBorderStyle(row, col, tilesWidth, isCliff) };
        return style;
    };

    const isAddCliff = (col: number, tilesHeight: number) => {
        return col === tilesHeight - 1;
    };

    return (
        <div
            style={{
                position: "absolute",
                top: gridSide * colIndex,
                left: gridSide * rowIndex,
                display: "flex",
                flexDirection: "column",
                zIndex: 0,
                ...handleBackgroudTileStyle(
                    rowIndex,
                    colIndex,
                    tilesWidth,
                    isAddCliff(colIndex, tilesHeight) ? true : false
                ),
            }}
        >
            {/* Normal Background Tile */}
            <Sprite
                spriteSheetInfo={theme.backgroundSpriteSheetInfo}
                imageOffset={theme.imageOffset}
                scaleFactor={SpriteHelper.getSpriteSheetScaleFactor(MAIN_SPRITE_SHEET)}
            />
            {/* Cliff */}
            {isAddCliff(colIndex, tilesHeight) && (
                <Sprite
                    spriteSheetInfo={theme.cliffSpriteSheetInfo}
                    imageOffset={theme.cliffImageOffset}
                    scaleFactor={SpriteHelper.getSpriteSheetScaleFactor(MAIN_SPRITE_SHEET)}
                />
            )}
        </div>
    );
};

export default BackgroundTile;
