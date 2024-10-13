"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight, DoorClosed, SquareX } from "lucide-react";
import clsx from "clsx";
import { Button } from "@/components/ui/button";
import { useDeleteImage } from "@/hooks/image/useDeleteImage";
import Image from "next/image";

interface CarrouselHorizontalSimplifieProps {
  images: string[];
  fileInputElement: HTMLInputElement | null;
  setValue: any;
  multiple: boolean;
}

export function CarrouselHorizontal({
  images,
  fileInputElement,
  setValue,
  multiple,
}: CarrouselHorizontalSimplifieProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const { handleDelete } = useDeleteImage(setValue, fileInputElement);

  const scrollToImage = (index: number) => {
    if (carouselRef.current) {
      const scrollLeft = index * (carouselRef.current.offsetWidth / 3);
      carouselRef.current.scrollTo({ left: scrollLeft, behavior: "smooth" });
    }
    setCurrentIndex(index);
  };

  const nextImage = () => {
    if (currentIndex < images.length - 1) {
      scrollToImage(currentIndex + 1);
    }
  };

  const prevImage = () => {
    if (currentIndex > 0) {
      scrollToImage(currentIndex - 1);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (carouselRef.current) {
        const index = Math.round(
          carouselRef.current.scrollLeft /
            (carouselRef.current.offsetWidth / 3),
        );
        setCurrentIndex(index);
      }
    };

    carouselRef.current?.addEventListener("scroll", handleScroll);
    return () =>
      carouselRef.current?.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative mx-auto w-full max-w-3xl">
      <div
        ref={carouselRef}
        className="scrollbar-hide flex snap-x snap-mandatory overflow-x-auto"
        style={{ scrollSnapType: "x mandatory" }}
      >
        {images.map((src, index) => (
          <div
            key={index}
            className={clsx("relative h-40 flex-shrink-0 snap-center", {
              "w-10/12 justify-center": images.length === 1,
              "w-1/2": images.length >= 2,
            })}
          >
            <div className="h-full w-full p-2">
              <Image
                src={src}
                width={100}
                height={100}
                alt={`Image ${index + 1}`}
                className="h-full w-full rounded-lg object-cover"
              />
              <Button
                className="absolute right-3 top-3 rounded-full bg-white bg-opacity-50 p-1 hover:bg-opacity-75"
                type="button"
                onClick={() => {
                  handleDelete(index);
                }}
              >
                <SquareX className="h-4 w-4 text-black" />
                <span className="sr-only">Supprimer l'image</span>
              </Button>
            </div>
          </div>
        ))}
      </div>
      {images.length > 1 && (
        <div
          className="absolute left-2 top-1/2 -translate-y-1/2 transform bg-white bg-opacity-50 hover:bg-opacity-75"
          onClick={prevImage}
          // disabled={currentIndex === 0}
        >
          <ChevronLeft className="h-4 w-4" />
          <span className="sr-only">Image précédente</span>
        </div>
      )}

      {images.length >= 3 && (
        <div
          className="absolute right-2 top-1/2 -translate-y-1/2 transform bg-white bg-opacity-50 hover:bg-opacity-75"
          onClick={nextImage}
          // disabled={currentIndex === images.length - 1}
        >
          <ChevronRight className="h-4 w-4" />
          <span className="sr-only">Image suivante</span>
        </div>
      )}
    </div>
  );
}
