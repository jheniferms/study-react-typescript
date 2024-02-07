import { useContext } from "react"
import { LoggedUserContext } from "../context";

export const useLoggedUser = () => {
    const context = useContext(LoggedUserContext);
    return context;
}