import { createContext, useMemo } from "react";

// on crée un contexte avec une valeur par défaut
const AuthContext = createContext({
    auth: false,
    login: () => {},
});

// on crée un composant AuthProvider qui va contenir le contexte
export const AuthProvider = ({ children }) => {
    // on utilise useMemo pour éviter de recréer l'objet à chaque fois que le composant est rendu
    const authValue = useMemo(() => {
        return {
            auth: localStorage.getItem("auth"),
            login: () => {
                // on met à jour la valeur du contexte en cas de connexion réussie
                localStorage.setItem("auth", true);
            },
        };
    }, []);

    return (
        <AuthContext.Provider value={authValue}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
