import React, { useState, useEffect, useContext } from "react";
import createAuth0Client from "@auth0/auth0-spa-js";

const DEFAULT_REDIRECT_CALLBACK = () =>
  window.history.replaceState({}, document.title, window.location.pathname);

export const Auth0Context = React.createContext();
export const useAuth0 = () => useContext(Auth0Context);
export const Auth0Provider = ({
  children,
  onRedirectCallback = DEFAULT_REDIRECT_CALLBACK,
  ...initOptions
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState();
  const [user, setUser] = useState();
  const [auth0Client, setAuth0] = useState();
  const [loading, setLoading] = useState(true);
  const [popupOpen, setPopupOpen] = useState(false);

  useEffect(() => {
    const initAuth0 = async () => {
      try {
        const auth0FromHook = await createAuth0Client(initOptions);
        setAuth0(auth0FromHook);

        if (window.location.search.includes("code=") &&
            window.location.search.includes("state=")) {
          const { appState } = await auth0FromHook.handleRedirectCallback();
          onRedirectCallback(appState);
        }

        const isAuthenticated = await auth0FromHook.isAuthenticated();

        setIsAuthenticated(isAuthenticated);

        if (isAuthenticated) {
          const user = await auth0FromHook.getUser();
          setUser(user);
        }
      } catch (error) {
        console.error("Auth0 initialization failed:", error);
        // Silent re-auth failed (stale session, blocked 3rd-party cookies, etc).
        // Clear the flag so the next load skips the silent-auth attempt instead
        // of repeating the same failure.
        document.cookie = "auth0.is.authenticated=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };
    initAuth0();
    // eslint-disable-next-line
  }, []);

  const loginWithPopup = async (params = {}) => {
    setPopupOpen(true);
    try {
      await auth0Client.loginWithPopup(params);
    } catch (error) {
      console.error(error);
    } finally {
      setPopupOpen(false);
    }
    const user = await auth0Client.getUser();
    setUser(user);
    setIsAuthenticated(true);
  };

  const handleRedirectCallback = async () => {
    setLoading(true);
    await auth0Client.handleRedirectCallback();
    const user = await auth0Client.getUser();
    setLoading(false);
    setIsAuthenticated(true);
    setUser(user);
  };
  return (
    <Auth0Context.Provider
      value={{
        isAuthenticated,
        user,
        loading,
        popupOpen,
        loginWithPopup,
        handleRedirectCallback,
        getIdTokenClaims: (...p) => auth0Client && auth0Client.getIdTokenClaims(...p),
        loginWithRedirect: (...p) => auth0Client
          ? auth0Client.loginWithRedirect(...p)
          : console.error("loginWithRedirect called before Auth0 client finished initializing"),
        getTokenSilently: (...p) => auth0Client && auth0Client.getTokenSilently(...p),
        getTokenWithPopup: (...p) => auth0Client && auth0Client.getTokenWithPopup(...p),
        logout: (...p) => auth0Client && auth0Client.logout(...p)
      }}
    >
      {children}
    </Auth0Context.Provider>
  );
};