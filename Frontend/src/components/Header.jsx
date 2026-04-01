// CONTEXT
import UserProgressContext from "../store/UserProgressContext.jsx";
import AuthContext from "../store/authContext.jsx";

export default function Header ({ children }) {

    return (
        <header>
            {children}
        </header>
        
    )
}