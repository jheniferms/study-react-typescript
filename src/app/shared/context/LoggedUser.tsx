import { createContext, useEffect, useState } from "react";

interface ILoggedUserContextData {
    userName: string;
    logout: () => void;
}

interface ILoggedUserProviderProps {
    children: React.ReactNode;
}

export const LoggedUserContext = createContext<ILoggedUserContextData>({} as ILoggedUserContextData);

export const LoggedUserProvider: React.FC<ILoggedUserProviderProps> = ({ children }) => {

    const [name, setName] = useState("");

    useEffect(() => {
        setTimeout(() => {
            setName("jhenifer")
        }, 5000);
    })

    const handleLogout = () => {
        console.log("it ran")
    }

    return (
        <LoggedUserContext.Provider value={{ userName: name, logout: handleLogout }}>
            {children}
        </LoggedUserContext.Provider>
    )
}