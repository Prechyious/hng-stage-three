import { useState, useEffect } from "react";
import { ScaleLoader } from "react-spinners";
import Header from "./Header";
import ImageDisplay from "./ImageDisplay";
import { Data } from "../data/imagesData";

const Gallery = () => {
    const [images, setImages] = useState([]);
    const [searchInput, setSearchInput] = useState("");

    const [filtered, setFiltered] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const res = Data.map((image) => image);
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
        } else {
            setFiltered(images);
        }
        setIsLoading(false);
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-[100dvh]">
                <ScaleLoader color="#333" height={30} />
            </div>
        );
    }
    return (
        <>
            <Header searchByTag={searchByTag} searchInput={searchInput} />
            <ImageDisplay filtered={filtered} />
        </>
    );
};

export default Gallery;
