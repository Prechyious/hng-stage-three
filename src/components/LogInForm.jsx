import { useState } from "react";
import { supabase } from "../client";
import { useNavigate } from "react-router-dom";
const LogInForm = ({ setToken }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email: email,
                password: password,
            });
            console.log({
                data,
                error,
            });
            setToken(data);

            error ? alert(error) : navigate("/");
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div className="h-[100dvh] flex flex-col items-center justify-center w-full">
            <div className="flex flex-col gap-4 items-center font-medium shadow-lg p-10 rounded-2xl">
                <div className="flex flex-col items-center">
                    <h3 className="text-2xl items-center">Welcome</h3>
                    <p>Please login to continue</p>
                </div>
                <form className="flex flex-col gap-3" onSubmit={handleLogin}>
                    <div>
                        <label htmlFor="email"></label>
                        <input
                            className="w-full border py-1 px-3 rounded-lg outline-none focus:outline-none focus:shadow-md focus:shadow-blue-300/50"
                            type="email"
                            placeholder="email"
                            id="email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="password"></label>
                        <input
                            className="w-full border py-1 px-4 rounded-lg outline-none focus:outline-none focus:shadow-md focus:shadow-blue-300/50"
                            type="password"
                            id="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <button className="border rounded-md py-1 bg-blue-300 text-white hover:bg-blue-400 duration-300 font-semibold">
                        Log In
                    </button>
                </form>
            </div>
        </div>
    );
};

export default LogInForm;
