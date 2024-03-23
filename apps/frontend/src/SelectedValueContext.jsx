// SelectedValueContext.js
import React, { createContext, useContext, useState } from 'react';

const SelectedValueContext = createContext();

export const SelectedValueProvider = ({ children }) => {
    const [selectedValue, setSelectedValue] = useState("");

    return (
        <SelectedValueContext.Provider value={{ selectedValue, setSelectedValue }}>
            {children}
        </SelectedValueContext.Provider>
    );
};

export const useSelectedValue = () => useContext(SelectedValueContext);
