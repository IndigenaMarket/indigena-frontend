import React, { useState } from 'react'

let UiContext = React.createContext();

export default UiContext;

// Provider for Users.//

export const UiProvider = ({children}) => {

    const[showFilter,setShowFilter] = useState(false);

    return <UiContext.Provider value={{showFilter,setShowFilter}}>
        {children}
    </UiContext.Provider>
} 