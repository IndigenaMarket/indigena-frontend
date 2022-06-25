import React, { useState } from 'react'

let PropertiesContext = React.createContext();

export default PropertiesContext;

// Provider for Users.//

export const PropertiesProvider = ({children}) => {

    const [propertiesList,setPropertiesList] = useState([1])
    const [levelsList,setLevelsList] = useState([1])
    const [statsList,setStatsList] = useState([1])

    return <PropertiesContext.Provider value={{propertiesList,setPropertiesList ,levelsList,setLevelsList,statsList,setStatsList}}>
        {children}
    </PropertiesContext.Provider>
} 