import { createGlobalState } from "react-hooks-global-state";
const { setGlobalState, useGlobalState } = createGlobalState({
    Sector: 'Semiconductor',
    Company: '',
    Tab: 0
});

export { useGlobalState, setGlobalState }