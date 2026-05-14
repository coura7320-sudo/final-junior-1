import { useState } from "react";
import { AuthContext } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import GamesPage from "./pages/GamesPage";
import AdminPage from "./pages/AdminPage";

export default function App() {
  const [page, setPage] = useState("home");
  const [auth, setAuth] = useState(null);

  const login = (token, user) => {
    localStorage.setItem("token", token);
    setAuth({ token, user });
    setPage("home");
  };

  const logout = () => {
    localStorage.removeItem("token");
    setAuth(null);
    setPage("login");
  };

  const renderPage = () => {
    if (!auth) {
      if (page === "register") return <RegisterPage setPage={setPage} />;
      return <LoginPage setPage={setPage} />;
    }

    switch (page) {
      case "home":
        return <HomePage setPage={setPage} />;
      case "login":
      case "register":
        return <HomePage setPage={setPage} />;
      case "games":
        return <GamesPage setPage={setPage} />;
      case "admin":
        return <AdminPage setPage={setPage} />;
      default:
        return <HomePage setPage={setPage} />;
    }
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      <div className="app-container">
        <Navbar page={page} setPage={setPage} />
        <main className="main-content">
          {renderPage()}
        </main>
      </div>
    </AuthContext.Provider>
  );
}
