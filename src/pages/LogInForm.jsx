import { useEffect, useState } from "react";
import { supabase } from "../client";
import { useNavigate } from "react-router-dom";
import { FaLock, FaUser } from "react-icons/fa";
import { ScaleLoader } from "react-spinners";

const LogInForm = ({ setToken, closeModal }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const [error, setError] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const validEmail = new RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}");
        if (!validEmail.test(email)) setError("Please enter a valid email");
    }, [email]);

    useEffect(() => {
        password.length < 6
            ? setError("Password should be more than 6 characters")
            : setError([]);
    }, [password]);

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

            if (error) {
                err.push("Invalid login credentials");
            } else {
                setToken(data);

                closeModal();
            }
        } catch (error) {
            err.push(error);
        } finally {
            setIsLoading(false);
        }
        setError(err);
    };

    return (
        <div className="h-[100dvh] flex flex-col items-center justify-center w-full z-10 ">
            {isLoading ? (
                <div className="flex items-center justify-center z-10">
                    <ScaleLoader color="#fff" height={30} />
                </div>
            ) : (
                <div className="flex flex-col gap-4 items-center font-medium shadow-lg p-5 md:p-10 rounded-2xl bg-white max-w-[17.5rem] md:max-w-md">
                    <div className="flex flex-col items-center text-slate-700">
                        <h3 className="text-2xl items-center">Welcome</h3>
                        <p>Please login to continue</p>
                    </div>
                    <form
                        className="flex flex-col gap-4"
                        onSubmit={handleLogin}
                    >
                        <div className="flex items-center relative">
                            <label htmlFor="email" className="absolute left-1">
                                <FaUser className="text-slate-600" />
                            </label>
                            <input
                                className={`w-full border py-1 px-6 rounded-lg text-slate-600 outline-none focus:outline-none focus:shadow-md focus:shadow-slate-400/50  ${
                                    hasSubmitted && error
                                        ? "border-rose-600 text-rose-600"
                                        : " border-slate-400"
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
                        <div className="flex items-center relative">
                            <label
                                htmlFor="password"
                                className="absolute left-1"
                            >
                                <FaLock className="text-slate-600" />
                            </label>
                            <input
                                className={`w-full border py-1 px-6 rounded-lg text-slate-600 outline-none focus:outline-none focus:shadow-md focus:shadow-slate-400/50  ${
                                    hasSubmitted && error
                                        ? "border-rose-600 text-rose-600"
                                        : "border-slate-400 "
                                }`}
                                type="password"
                                id="password"
                                placeholder="Password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
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
