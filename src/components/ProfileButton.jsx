import { useState } from "react";
import { FaUser } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";

const ProfileButton = ({ token }) => {
    const [showMenu, setShowMenu] = useState(false);

    const openMenu = () => {
        setShowMenu(!showMenu);
    };

    const logout = async () => {
        sessionStorage.removeItem("token");
        window.location.reload();
    };

    return (
        <>
            <button
                className="flex items-center justify-center rounded-full h-9 w-9 bg-slate-300/50"
                onClick={openMenu}
            >
                <FaUser className="text-slate-600" />
            </button>

            <div
                className={`absolute z-10 ${
                    showMenu ? "right-0 opacity-100" : "-right-full opacity-0"
                } top-14 bg-slate-500 shadow-md rounded-3xl transition-all duration-300 ease-in-out`}
            >
                {showMenu && (
                    <div className="bg-slate-100 rounded-xl p-3 shadow-lg">
                        <h2 className="text-gray-500 font-bold">
                            {token.user.email}
                        </h2>

                        <button
                            className="border bg-slate-500 text-gray-100 flex items-center justify-between gap-2 py-1 px-5 mt-2 rounded-2xl hover:bg-slate-600 duration-300"
                            onClick={logout}
                        >
                            Logout
                            <FiLogOut />
                        </button>
                    </div>
                )}
            </div>
        </>
    );
};

export default ProfileButton;
