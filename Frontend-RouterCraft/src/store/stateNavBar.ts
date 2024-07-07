import { create} from "zustand";

type stateNavBarType = {
    expanded: boolean;
    setExpanded: (expanded: boolean) => void;
};

const stateNavBar = create<stateNavBarType>()((set) => ({
    expanded: false,
    setExpanded: (expanded: boolean) => set({ expanded }),
}));

export default stateNavBar;