import { AppDispatch, AppStore, RootState } from "../../store";

export type Config = {
    store?: AppStore;
    state?: RootState;
    dispatch?: AppDispatch;
    [key: string]: any;
};
