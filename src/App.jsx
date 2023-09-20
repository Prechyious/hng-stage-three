import { Route, Routes } from "react-router-dom";
import Gallery from "./components/Gallery";
import LogInForm from "./components/LogInForm";
import { useEffect, useState } from "react";

const App = () => {
    const [token, setToken] = useState(false);

    if (token) {
        sessionStorage.setItem("token", JSON.stringify(token));
    }

    useEffect(() => {
        if (sessionStorage.getItem("token")) {
            let data = JSON.parse(sessionStorage.getItem("token"));
            setToken(data);
        }
    }, []);
    return (
        <>
            <Routes>
                <Route path="/" element={<Gallery />} />
                <Route
                    path="/login"
                    element={<LogInForm setToken={setToken} />}
                />
            </Routes>
        </>
    );
};

export default App;
