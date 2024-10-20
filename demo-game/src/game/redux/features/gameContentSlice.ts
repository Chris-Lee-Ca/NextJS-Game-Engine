import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAllGameStaticData } from "../../sanity/sanityQuery";
import apolloClient from "@/game/sanity/apolloClient";
import { Education, Experience, Project } from "@/game/types/gameStaticData";

type GameContentType = {
    allEducation: Education[];
    allExperience: Experience[];
    allProject: Project[];
};

interface GameContentStateInterface {
    data: GameContentType | null;
    loading: boolean;
    error: string | null;
}

const initialState: GameContentStateInterface = {
    data: null,
    loading: false,
    error: null,
};

export const fetchGameContent = createAsyncThunk<GameContentType>("gameContent/fetchInitialState", async () => {
    try {
        const { data } = await apolloClient.query({ query: getAllGameStaticData });
        console.log("Fetch data: ", data);
        return {
            allEducation: data.allEducation,
            allExperience: data.allExperience,
            allProject: data.allProject,
        };
    } catch (error) {
        console.error("Error fetching game content:", error);
        throw new Error("Failed to fetch game content");
    }
});

const gameContentSlice = createSlice({
    name: "gameContent",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // Handle loading state
        builder.addCase(fetchGameContent.pending, (state) => {
            state.loading = true;
            state.error = null;
        });

        // Handle successful data fetch
        builder.addCase(fetchGameContent.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload;
        });

        // Handle error state
        builder.addCase(fetchGameContent.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || "Failed to load game content";
        });
    },
});

export const gameContentReducer = gameContentSlice.reducer;
