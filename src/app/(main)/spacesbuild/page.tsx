"use client";

import React, { useState } from "react";
import { BuilderSidebar } from "./_components/builder-sidebar";

const SpacesBuildPage = () => {
  const gridSize = 15;
  const [selectedDots, setSelectedDots] = useState(
    [] as { x: number; y: number }[],
  );
  const [lines, setLines] = useState([] as { x: number; y: number }[][]);

  const handleDotClick = (x: number, y: number) => {
    const newSelected = [...selectedDots, { x, y }];
    setSelectedDots(newSelected);

    if (newSelected.length === 2) {
      setLines([...lines, newSelected]);
      setSelectedDots([]);
    }
  };

  const renderGrid = () => {
    const grid = [] as JSX.Element[];
    for (let i = 0; i < gridSize; i++) {
      for (let j = 0; j < gridSize; j++) {
        grid.push(
          <circle
            key={`${i}-${j}`}
            cx={i * 40 + 10}
            cy={j * 40 + 10}
            r={6}
            onClick={() => handleDotClick(i, j)}
            className="cursor-pointer fill-current text-foreground"
            // Add Tailwind classes for mouseover and mouseout effects using onMouseEnter and onMouseLeave
            onMouseEnter={(e) =>
              e.currentTarget.classList.replace(
                "text-foreground",
                "text-accent",
              )
            }
            onMouseLeave={(e) =>
              e.currentTarget.classList.replace(
                "text-accent",
                "text-foreground",
              )
            }
          />,
        );
      }
    }
    return grid;
  };

  return (
    <div className="flex h-full gap-4 overflow-hidden px-8 py-8">
      <div className="flex flex-1 items-center justify-center overflow-auto pr-4">
        <svg width="600" height="600">
          {renderGrid()}
          {lines.map((line, index) => (
            <line
              key={index}
              x1={line[0]!.x * 40 + 10}
              y1={line[0]!.y * 40 + 10}
              x2={line[1]!.x * 40 + 10}
              y2={line[1]!.y * 40 + 10}
              strokeWidth={12}
              className="-z-10 cursor-pointer stroke-current text-foreground"
              onMouseEnter={(e) =>
                e.currentTarget.classList.replace(
                  "text-foreground",
                  "text-cyan-800",
                )
              }
              onMouseLeave={(e) =>
                e.currentTarget.classList.replace(
                  "text-cyan-800",
                  "text-foreground",
                )
              }
            />
          ))}
        </svg>
      </div>
      <BuilderSidebar />
    </div>
  );
};

export default SpacesBuildPage;
