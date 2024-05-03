import { createGlobalState } from "react-hooks-global-state";
const { setGlobalState, useGlobalState } = createGlobalState({
    Sector: '',
    Company: '',
    Tab: 0
});

export { useGlobalState, setGlobalState }