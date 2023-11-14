import { useRef } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const ImageDisplay = ({ filtered, setFiltered, token }) => {
    const dragImg = useRef(0);
    const draggedOverImg = useRef(0);

    const handleSort = () => {
        const filteredClone = [...filtered];
        const temp = filteredClone[dragImg.current];

        filteredClone[dragImg.current] = filteredClone[draggedOverImg.current];
        filteredClone[draggedOverImg.current] = temp;
        setFiltered(filteredClone);
    };
    return (
        <main className="grid grid-cols-1 gap-10 px-5 mb-10 sm:px-10 place-items-center sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:px-10">
            {filtered.map((image, index) => {
                return (
                    <div
                        key={image.id}
                        className={`relative max-h-[400px] w-[260px] md:h-[440px] md:w-[300px] shadow-lg hover:shadow-neutral-500 rounded-lg overflow-hidden transition-all duration-500 ease-in-out ${
                            token && "cursor-move"
                        }`}
                        draggable={!!token}
                        onDragStart={
                            token ? () => (dragImg.current = index) : null
                        }
                        onDragEnter={
                            token
                                ? () => (draggedOverImg.current = index)
                                : null
                        }
                        onDragEnd={token ? handleSort : null}
                        onDragOver={token ? (e) => e.preventDefault() : null}
                    >
                        <LazyLoadImage
                            src={image.image}
                            alt={image.category}
                            className="h-full rounded-lg"
                            effect="blur"
                            height={400}
                            width={300}
                        />

                        <h2 className="absolute px-2 text-sm font-medium text-white capitalize rounded-lg top-3 left-2 bg-gray-500/50 md:text-base">
                            {image.category}
                        </h2>
                    </div>
                );
            })}
        </main>
    );
};

export default ImageDisplay;
