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
        <header className="sticky top-0 z-10 flex flex-col items-center justify-between w-full gap-4 px-10 py-3 mb-5 bg-neutral-50 md:flex-row md:gap-44">
            <div className="flex justify-between w-full">
                <Link
                    to="/"
                    className="flex items-center gap-1 text-base font-bold tracking-wide md:text-xl text-slate-800 md:gap-2"
                >
                    <FaImages className="text-xl text-slate-600 md:text-2xl" />
                    Gallery
                </Link>

                <input
                    className="hidden w-2/3 py-1.5 pl-2 bg-transparent border border-gray-400 outline-none rounded-lg md:block focus:outline-none focus:shadow-lg hover:shadow-lg duration-300"
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
            </div>

            <input
                className="block w-full px-2 py-1 duration-300 bg-transparent border border-gray-400 rounded-lg outline-none md:hidden md:px-10 focus:outline-none focus:shadow-lg hover:shadow-md"
                name="search"
                value={searchInput}
                type="text"
                placeholder="Search...."
                onChange={(e) => searchByTag(e.target.value)}
            />
        </header>
    );
};

export default Header;
