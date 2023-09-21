import { useState, useEffect } from "react";
import { ScaleLoader } from "react-spinners";
import Header from "../components/Header";
import ImageDisplay from "../components/ImageDisplay";
import { Data } from "../data/imagesData";

const Gallery = ({ token }) => {
    const [images, setImages] = useState([]);
    const [searchInput, setSearchInput] = useState("");

    const [filtered, setFiltered] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [showErrorMessage, setShowErrorMessage] = useState(false);

    useEffect(() => {
        const res = Data.map((image) => image);
        setIsLoading(true);
        setImages(res);
        setFiltered(res);
        setIsLoading(false);
    }, [Data]);

    const searchByTag = (searchValue) => {
        setIsLoading(true);
        setSearchInput(searchValue);

        if (searchValue) {
            const filteredResult = Data.filter((image) => {
                return Object.values(image)
                    .join("")
                    .toLowerCase()
                    .includes(searchValue.toLowerCase());
            });
            setFiltered(filteredResult);

            if (filteredResult.length === 0) {
                setShowErrorMessage(true);
            } else {
                setShowErrorMessage(false);
            }
        } else {
            setFiltered(images);
            setShowErrorMessage(false);
        }
        setIsLoading(false);
    };

    return (
        <div className="bg-neutral-100">
            <Header
                searchByTag={searchByTag}
                searchInput={searchInput}
                token={token}
            />
            {isLoading && (
                <div className="flex items-center justify-center h-[60dvh] md:h-[80dvh]">
                    <ScaleLoader color="#333" height={30} />
                </div>
            )}

            {showErrorMessage && (
                <div className="flex items-center justify-center text-red-500">
                    No results found.
                </div>
            )}

            <ImageDisplay
                filtered={filtered}
                setFiltered={setFiltered}
                token={token}
            />
        </div>
    );
};

export default Gallery;
