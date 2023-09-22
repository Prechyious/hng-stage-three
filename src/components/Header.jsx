import { Link } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import { FaImages } from "react-icons/fa";
import { useState } from "react";
import Modal from "./Modal";

const Header = ({ searchInput, searchByTag, token, setToken }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };
    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <header
            className={`sticky top-0 z-10 bg-neutral-50 flex items-center justify-between py-3 px-3 md:px-10 ${
                token ? "gap-5" : "gap-2"
            } md:gap-44 mb-5 w-full`}
        >
            <h1 className="font-bold text-base md:text-xl tracking-wide text-slate-800 flex items-center gap-1 md:gap-2">
                <FaImages className="text-slate-600 text-xl md:text-2xl" />
                Gallery
            </h1>

            <input
                className="flex-1 bg-transparent border border-gray-400 px-1 sm:px-2 py-0.5 md:py-1 rounded-lg md:px-10 focus:outline-none focus:shadow-lg w-full"
                name="search"
                value={searchInput}
                type="text"
                placeholder="Search...."
                onChange={(e) => searchByTag(e.target.value)}
            />

            {!token ? (
                <button
                    className="font-bold border px-2 md:px-4 py-0.5 md:py-1 rounded-lg bg-slate-500 text-gray-100 hover:bg-slate-600 duration-300"
                    onClick={openModal}
                >
                    Sign In
                </button>
            ) : (
                <ProfileButton token={token} />
            )}
            {isModalOpen && (
                <Modal closeModal={closeModal} setToken={setToken} />
            )}
        </header>
    );
};

export default Header;
