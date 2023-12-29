import { createGlobalState } from "react-hooks-global-state";
const { setGlobalState, useGlobalState } = createGlobalState({
    Sector: '',
    Company: ''
});

export { useGlobalState, setGlobalState }