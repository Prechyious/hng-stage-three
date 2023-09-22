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
        <main className="grid place-items-center gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 px-5 md:px-10 mb-10">
            {filtered.map((image, index) => {
                return (
                    <div
                        key={image.id}
                        className={`relative h-[380px] w-[260px] md:h-[420px] md:w-[300px] shadow-lg hover:shadow-neutral-500 rounded-lg overflow-hidden transition-all duration-500 ease-in-out ${
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
                            className="rounded-lg h-full w-full"
                            effect="blur"
                            height={420}
                            width={300}
                        />

                        <button className="absolute top-2 left-2 text-white bg-gray-500/50 px-1.5 rounded-lg">
                            {image.category}
                        </button>
                    </div>
                );
            })}
        </main>
    );
};

export default ImageDisplay;
