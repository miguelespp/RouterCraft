import { create } from "zustand";

type stateScriptType = {

    loaded: boolean;
    setLoaded: (loaded: boolean) => void;
};

const stateScript = create<stateScriptType>((set) => ({
    loaded: false,
    setLoaded: (loaded: boolean) => set({ loaded }),
}));

export default stateScript;