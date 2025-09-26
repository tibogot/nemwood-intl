"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

export default function FlipBoard(): React.JSX.Element {
  const boardRef = useRef<HTMLDivElement>(null);
  const ROWS = 6;
  const COLS = 6;
  const COOLDOWN = 1000;
  const isFlippedRef = useRef<boolean>(false);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const tiles: HTMLElement[] = [];

    const animateTile = (tile: HTMLElement, tiltY: number): void => {
      gsap
        .timeline()
        .set(tile, {
          rotateX: isFlippedRef.current ? 180 : 0,
          rotateY: 0,
        })
        .to(tile, {
          rotateX: isFlippedRef.current ? 450 : 270,
          rotateY: tiltY,
          duration: 0.5,
          ease: "power2.out",
        })
        .to(
          tile,
          {
            rotateX: isFlippedRef.current ? 540 : 360,
            rotateY: 0,
            duration: 0.5,
            ease: "power2.out",
          },
          "-=0.25",
        );
    };

    const flipAllTiles = (): void => {
      isFlippedRef.current = !isFlippedRef.current;
      gsap.to(tiles, {
        rotateX: isFlippedRef.current ? 180 : 0,
        duration: 1,
        stagger: {
          amount: 0.5,
          from: "random",
        },
        ease: "power2.inOut",
      });
    };

    // Collect all tile elements
    if (boardRef.current) {
      const tileElements =
        boardRef.current.querySelectorAll<HTMLElement>(".tile");
      tileElements.forEach((tile) => tiles.push(tile));
    }

    // Initialize tile animations
    const lastEnterTimes: number[] = new Array(tiles.length).fill(0);
    const eventHandlers: (() => void)[] = [];

    tiles.forEach((tile, index) => {
      const handleMouseEnter = (): void => {
        const currentTime = Date.now();
        if (currentTime - lastEnterTimes[index] > COOLDOWN) {
          lastEnterTimes[index] = currentTime;

          let tiltY = 0;
          const col = index % COLS;
          if (col === 0) tiltY = -40;
          else if (col === COLS - 1) tiltY = 40;
          else if (col === 1) tiltY = -20;
          else if (col === COLS - 2) tiltY = 20;
          else if (col === 2) tiltY = -10;
          else tiltY = 10;

          animateTile(tile, tiltY);
        }
      };

      eventHandlers.push(handleMouseEnter);
      tile.addEventListener("mouseenter", handleMouseEnter);
    });

    // Add flip button listener
    const flipButton = document.querySelector<HTMLButtonElement>(".flipButton");
    if (flipButton) {
      flipButton.addEventListener("click", flipAllTiles);
    }

    return () => {
      if (flipButton) {
        flipButton.removeEventListener("click", flipAllTiles);
      }
      tiles.forEach((tile, index) => {
        if (eventHandlers[index]) {
          tile.removeEventListener("mouseenter", eventHandlers[index]);
        }
      });
    };
  }, [ROWS, COLS, COOLDOWN]);

  return (
    <div className="h-[90vh] w-full overflow-hidden">
      <div className="flex h-full flex-col">
        <div className="flex justify-center py-4">
          <button className="flipButton cursor-pointer rounded-lg bg-slate-800 px-6 py-2 text-white transition-colors hover:bg-slate-700">
            Flip All Tiles
          </button>
        </div>
        <div
          ref={boardRef}
          className="flex w-full flex-1 flex-col gap-1"
          style={{ perspective: "1000px" }}
        >
          {Array.from({ length: ROWS }).map((_, rowIndex) => (
            <div key={rowIndex} className="flex gap-1">
              {Array.from({ length: COLS }).map((_, colIndex) => {
                return (
                  <div
                    key={colIndex}
                    className="tile relative aspect-square flex-1 cursor-pointer"
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    {/* Front Face */}
                    <div
                      className="tile-face tile-front absolute h-full w-full overflow-hidden rounded-lg bg-slate-600"
                      style={{
                        backfaceVisibility: "hidden",
                      }}
                    >
                      <div className="absolute inset-0 overflow-hidden rounded-lg">
                        <div
                          className="relative h-full w-full"
                          style={{
                            width: `${COLS * 100}%`,
                            height: `${ROWS * 100}%`,
                            left: `-${colIndex * 100}%`,
                            top: `-${rowIndex * 100}%`,
                          }}
                        >
                          <Image
                            src="/images/nemohero.webp"
                            alt="Front face"
                            fill
                            className="object-cover"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Back Face */}
                    <div
                      className="tile-face tile-back absolute h-full w-full overflow-hidden rounded-lg bg-slate-700"
                      style={{
                        backfaceVisibility: "hidden",
                        transform: "rotateX(180deg)",
                      }}
                    >
                      <div className="absolute inset-0 overflow-hidden rounded-lg">
                        <div
                          className="relative h-full w-full"
                          style={{
                            width: `${COLS * 100}%`,
                            height: `${ROWS * 100}%`,
                            left: `-${colIndex * 100}%`,
                            top: `-${rowIndex * 100}%`,
                          }}
                        >
                          <Image
                            src="/images/herobg3.webp"
                            alt="Back face"
                            fill
                            className="object-cover"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
