import { createContext,useMemo } from "react";
const globalContext = createContext({
    authorization:{
        token:null,
        userName:null,
        links:[]
    },
    displayMode:"normal",
    setAuthorization: () => {}
})

export default globalContext;