import LogInForm from "../pages/LogInForm";
import { FaTimes } from "react-icons/fa";

const Modal = ({ closeModal, setToken }) => {
    return (
        <div className="fixed inset-0 w-full h-screen bg-black/90 backdrop-blur-[1px] transition-all duration-300 ease-in-out">
            <div className="fixed inset-0 z-10">
                <span
                    className="absolute right-5 top-5 text-[#aaa] cursor-pointer text-2xl"
                    onClick={closeModal}
                >
                    <FaTimes />
                </span>

                <LogInForm setToken={setToken} closeModal={closeModal} />
            </div>
        </div>
    );
};

export default Modal;
