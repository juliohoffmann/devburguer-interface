import { createContext, useContext, useState, useEffect, useCallback } from "react";

const UserContext = createContext();

export function UserProvider({ children }) {
    const [userInfo, setUserInfo] = useState({});

    // Função para armazenar dados do usuário e persistir no localStorage
    const putUserData = useCallback((newUserInfo) => {
        setUserInfo(newUserInfo);
        localStorage.setItem('devburger:userData', JSON.stringify(newUserInfo));
    }, []); // Dependências vazias, pois não depende de estados ou props mutáveis

    // Função para fazer logout, limpando o estado e o localStorage
    const logout = useCallback(() => {
        setUserInfo({});
        localStorage.removeItem('devburger:userData');
    }, []); // Dependências vazias

    // Efeito para carregar dados do usuário do localStorage na montagem do componente
    useEffect(() => {
        const userInfoLocalStorage = localStorage.getItem('devburger:userData');
        if (userInfoLocalStorage) {
            try {
                setUserInfo(JSON.parse(userInfoLocalStorage));
            } catch (error) {
                console.error("Erro ao parsear userInfo do localStorage:", error);
                // Opcional: Limpar localStorage se o JSON for inválido
                localStorage.removeItem('devburger:userData');
            }
        }
    }, []); // Array de dependências vazio para executar apenas uma vez na montagem

    return (
        <UserContext.Provider value={{ userInfo, putUserData, logout }}>
            {children}
        </UserContext.Provider>
    );
    
}

export function useUser() {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error('useUser deve ser usado dentro de um UserProvider');
    }
    return context;
}

