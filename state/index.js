import { createGlobalState } from "react-hooks-global-state";
const { setGlobalState, useGlobalState } = createGlobalState({
    Sector: 'SEMICONDUCTORS & RELATED DEVICES',
    Company: '',
    Tab: 0
});

export { useGlobalState, setGlobalState }