"use client";

import { useState } from "react";
import { BuilderSidebar } from "./_components/builder-sidebar";

const SpacesBuildPage = () => {
  const gridSize = 15;
  const [selectedDots, setSelectedDots] = useState(
    [] as { x: number; y: number }[],
  );
  const [lines, setLines] = useState(
    [] as {
      start: { x: number; y: number };
      end: { x: number; y: number };
      direction: 1 | 2;
    }[],
  );
  const [selectedLine, setSelectedLine] = useState(
    {} as {
      start: { x: number; y: number };
      end: { x: number; y: number };
      direction: 1 | 2;
    },
  );

  const handleDotClick = (x: number, y: number) => {
    const newSelected = [...selectedDots, { x, y }];
    setSelectedDots(newSelected);

    if (newSelected.length === 2) {
      const newLine = {
        start: newSelected[0] ?? { x: 0, y: 0 },
        end: newSelected[1] ?? { x: 0, y: 0 },
        direction: 1 as 1 | 2,
      };
      setLines([...lines, newLine]);
      setSelectedDots([]);
    }
  };

  const toggleDirection = (index: number) => {
    const newLines = lines.map((line, idx) =>
      idx === index
        ? {
            ...line,
            direction: line.direction === 1 ? (2 as 1 | 2) : (1 as 1 | 2),
          }
        : line,
    );
    setLines(newLines);
  };

  const renderDirectionDot = (line: (typeof lines)[number]) => {
    const midX = ((line.start.x + line.end.x) / 2) * 40 + 10;
    const midY = ((line.start.y + line.end.y) / 2) * 40 + 10;

    let offsetX = 0;
    let offsetY = 0;

    if (line.start.y === line.end.y) {
      offsetY = line.direction === 1 ? -30 : 30;
    } else {
      offsetX = line.direction === 1 ? -30 : 30;
    }

    return (
      <circle
        cx={midX + offsetX}
        cy={midY + offsetY}
        z={1000}
        r={10}
        className="fill-current text-green-500"
      />
    );
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
          {lines.map((line, index) => (
            <>
              <line
                key={index}
                x1={line.start.x * 40 + 10}
                y1={line.start.y * 40 + 10}
                x2={line.end.x * 40 + 10}
                y2={line.end.y * 40 + 10}
                strokeWidth={12}
                onClick={() => setSelectedLine(line)}
                className="-z-10 cursor-pointer border-2 stroke-current text-cyan-800"
              />
            </>
          ))}
          {renderGrid()}
          {selectedLine.start && renderDirectionDot(selectedLine)}
        </svg>
      </div>
      <BuilderSidebar />
    </div>
  );
};

export default SpacesBuildPage;
