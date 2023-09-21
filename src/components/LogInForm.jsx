import { useEffect, useState } from "react";
import { supabase } from "../client";
import { useNavigate } from "react-router-dom";
import { FaLock, FaUser } from "react-icons/fa";
import { ScaleLoader } from "react-spinners";

const LogInForm = ({ setToken }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const [error, setError] = useState([]);
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const validEmail = new RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}");
        if (!validEmail.test(email)) setError("Please enter a valid email");

        if (password.length < 6)
            setError("Password should be more than 6 characters");
    }, [email, password]);

    const handleLogin = async (e) => {
        e.preventDefault();

        const err = [];

        setHasSubmitted(true);
        try {
            setIsLoading(true);
            const { data, error } = await supabase.auth.signInWithPassword({
                email: email,
                password: password,
            });
            setToken(data);

            error ? err.push("Invalid login credentials") : navigate("/");
        } catch (error) {
            err.push(error);
        } finally {
            setIsLoading(false);
        }
        setError(err);
    };

    return (
        <div className="h-[100dvh] flex flex-col items-center justify-center w-full bg-black/50 z-10 ">
            {isLoading ? (
                <div className="flex items-center justify-center">
                    <ScaleLoader color="#333" height={30} />
                </div>
            ) : (
                <div className="flex flex-col gap-4 items-center font-medium shadow-lg p-10 rounded-2xl bg-white">
                    <div className="flex flex-col items-center text-slate-700">
                        <h3 className="text-2xl items-center">Welcome</h3>
                        <p>Please login to continue</p>
                    </div>
                    <form
                        className="flex flex-col gap-4"
                        onSubmit={handleLogin}
                    >
                        <div className="flex items-center gap-2">
                            <label htmlFor="email">
                                <FaUser className="text-slate-600" />
                            </label>
                            <input
                                className={`w-full border border-slate-400 py-1 px-3 rounded-lg outline-none focus:outline-none focus:shadow-md focus:shadow-slate-400/50 focus:text-slate-600 ${
                                    hasSubmitted &&
                                    error.includes(
                                        "Please enter a valid email"
                                    ) &&
                                    "border border-rose-600 text-rose-600"
                                }`}
                                type="email"
                                placeholder="Email"
                                id="email"
                                name="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        {hasSubmitted &&
                            error.includes("Please enter a valid mail") && (
                                <p className="text-rose-600">
                                    Please enter a valid email
                                </p>
                            )}
                        <div className="flex items-center gap-2">
                            <label htmlFor="password">
                                <FaLock className="text-slate-600" />
                            </label>
                            <input
                                className={`w-full border border-slate-400 py-1 px-3 rounded-lg outline-none focus:outline-none focus:shadow-md focus:shadow-slate-400/50 focus:text-slate-600 ${
                                    hasSubmitted &&
                                    error &&
                                    "border border-rose-600 text-rose-600"
                                }`}
                                type="password"
                                id="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        {hasSubmitted &&
                            error.includes(
                                "Password should be more than 6 characters"
                            ) && (
                                <p className="text-rose-600 text-sm">
                                    Password should be more than 6 characters.
                                </p>
                            )}

                        {error.includes("Invalid login credentials") && (
                            <p className=" text-rose-600 text-center">
                                {error}
                            </p>
                        )}

                        <button className="border rounded-md py-1 bg-slate-500 text-white shadow-md hover:bg-slate-600 duration-300 font-semibold">
                            Log In
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default LogInForm;
