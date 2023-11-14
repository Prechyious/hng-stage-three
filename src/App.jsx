import { Route, Routes } from "react-router-dom";
import Gallery from "./pages/Gallery";
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
                <Route
                    path="/"
                    element={<Gallery token={token} setToken={setToken} />}
                />
            </Routes>
        </>
    );
};

export default App;
