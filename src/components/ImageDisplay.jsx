import { useState } from "react";
import { Data } from "../data/imagesData";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const ImageDisplay = ({ filtered }) => {
    return (
        <main className="grid place-items-center gap-10 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 px-5 md:px-10 mb-10">
            {filtered.map(({ image, category, id }) => {
                return (
                    <div
                        key={id}
                        className="relative h-[420px] w-[300px] shadow-lg hover:shadow-neutral-500 rounded-lg overflow-hidden transition-all duration-500 ease-in-out"
                    >
                        <LazyLoadImage
                            src={image}
                            alt={category}
                            className="rounded-lg h-full w-full"
                            effect="blur"
                            height={420}
                            width={300}
                        />

                        <button className="absolute top-2 left-2 text-white bg-gray-500/50 px-1.5 rounded-lg">
                            {category}
                        </button>
                    </div>
                );
            })}
        </main>
    );
};

export default ImageDisplay;
