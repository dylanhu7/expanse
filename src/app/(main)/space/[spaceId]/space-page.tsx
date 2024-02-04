"use client";
import Image from "next/image";
import { useState } from "react";
import * as THREE from "three";
import { SpaceSidebar } from "~/app/(main)/space/[spaceId]/space-sidebar";
import { type Asset, type Space, type WallJoined } from "~/server/db/schema";
import { api } from "~/trpc/react";

// type wall =
// id: string;
// createdAt: Date | null;
// updatedAt: Date | null;
// spaceId: string;
// x1: number;
// y1: number;
// x2: number;
// y2: number;

type Line = {
  start: { x: number; y: number };
  end: { x: number; y: number };
  direction: 1 | 2;
  assets: Asset[];
  directionOfAssets: number[];
  canonicalNormal: THREE.Vector2;
  id: string;
};

const SpacePage = ({
  walls,
  space,
  possibleAssets,
}: {
  walls: WallJoined[];
  space: Space;
  possibleAssets: Asset[];
}) => {
  const gridSize = 15;
  const [selectedDots, setSelectedDots] = useState(
    [] as { x: number; y: number }[],
  );

  const getCanonicalNormal = (
    x1: number,
    y1: number,
    x2: number,
    y2: number,
  ) => {
    const v = new THREE.Vector3(x2 - x1, 0, y2 - y1);
    const n = new THREE.Vector3(0, 1, 0);
    const cross = v.cross(n);
    const cross2 = new THREE.Vector2(cross.x, cross.z);
    return cross2.normalize();
  };
  const [lines, setLines] = useState(
    walls.map((wall) => ({
      start: { x: wall.x1, y: wall.y1 },
      end: { x: wall.x2, y: wall.y2 },
      direction: 1 as 1 | 2,
      assets: wall.spaceAssets.map((spaceAsset) => spaceAsset.asset),
      directionOfAssets: wall.spaceAssets.map((spaceAsset) =>
        spaceAsset.spaceAsset.onCanonicalWall ? 1 : 2,
      ),
      canonicalNormal: getCanonicalNormal(wall.x1, wall.y1, wall.x2, wall.y2),
      id: wall.id,
    })),
  );
  const [selectedLine, setSelectedLine] = useState(
    {} as {
      start: { x: number; y: number };
      end: { x: number; y: number };
      direction: 1 | 2;
      assets: Asset[];
      directionOfAssets: number[];
      canonicalNormal: THREE.Vector2;
      id: string;
    },
  );

  const createWall = api.space.addWall.useMutation();
  const addAssetToWall = api.space.addAsset.useMutation();

  const [inArtSetMode, setInArtSetMode] = useState(false);

  const handleDotClick = (x: number, y: number) => {
    const newSelected = [...selectedDots, { x, y }];
    setSelectedDots(newSelected);
    if (newSelected.length === 2) {
      const newLine = {
        start: newSelected[0] ?? { x: 0, y: 0 },
        end: newSelected[1] ?? { x: 0, y: 0 },
        direction: 1 as 1 | 2,
        assets: [] as Asset[],
        directionOfAssets: [],
        canonicalNormal: getCanonicalNormal(
          newSelected[0]!.x,
          newSelected[0]!.y,
          newSelected[1]!.x,
          newSelected[1]!.y,
        ),
        id: "",
      };
      void createWall
        .mutateAsync({
          spaceId: space.id,
          x1: newLine.start.x,
          y1: newLine.start.y,
          x2: newLine.end.x,
          y2: newLine.end.y,
        })
        .then((wall) => {
          newLine.id = wall[0]!.id;
        });
      setLines([...lines, newLine]);
      setSelectedDots([]);
      console.log(lines);
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

  const renderDirectionDot = (line: typeof selectedLine & Line) => {
    const midX = ((line.start.x + line.end.x) / 2) * 40 + 10;
    const midY = ((line.start.y + line.end.y) / 2) * 40 + 10;
    let offsetX = line.canonicalNormal.x * 20;
    let offsetY = line.canonicalNormal.y * 20;

    if (line.direction !== 1) {
      offsetX *= -1;
      offsetY *= -1;
    }

    return (
      <circle
        cx={midX + offsetX}
        cy={midY + offsetY}
        z={1000}
        r={10}
        className="fill-current text-red-500"
      />
    );
  };

  const calculateLineLength = (line: {
    start: { x: number; y: number };
    end: { x: number; y: number };
  }) => {
    const dx = line.end.x - line.start.x;
    const dy = line.end.y - line.start.y;
    return Math.sqrt(dx * dx + dy * dy);
  };

  const renderBox = () => {
    const lineLength = calculateLineLength(selectedLine) * 200;
    return (
      <div
        style={{
          width: `${lineLength}px`,
          height: "400px",
        }}
        className="flex flex-row items-center justify-around border-2 border-current"
      >
        {selectedLine.assets.map(
          (asset, index) =>
            selectedLine.directionOfAssets[index] ===
              selectedLine.direction && (
              <div key={asset.id} className="h-24 w-24 bg-gray-200">
                <Image
                  src={asset.imageUrl ?? ""}
                  alt={asset.title ?? "Asset"}
                  width={100}
                  height={100}
                />
              </div>
            ),
        )}
      </div>
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
      {!inArtSetMode ? (
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
                  onClick={() => {
                    setSelectedLine(line as typeof selectedLine & Line);
                    toggleDirection(index);
                  }}
                  className="-z-10 cursor-pointer border-2 stroke-current text-cyan-800"
                />
              </>
            ))}
            {renderGrid()}
            {selectedLine.start && renderDirectionDot(selectedLine)}
          </svg>
        </div>
      ) : (
        <div className="flex flex-1 items-center justify-center overflow-auto pr-4">
          {renderBox()}
        </div>
      )}
      <SpaceSidebar
        space={space}
        selectedLine={selectedLine}
        possibleAssets={possibleAssets}
        deselectLine={() => setSelectedLine({} as typeof selectedLine)}
        artSetMode={inArtSetMode}
        toggleArtSetMode={() => setInArtSetMode(!inArtSetMode)}
        addAssetToWall={(asset) => {
          addAssetToWall.mutate({
            assetId: asset.id,
            x: 0,
            y: 0,
            scale: 1,
            onCanonicalWall: selectedLine.direction === 1,
            wallId: selectedLine.id,
            spaceId: space.id,
          });
          setSelectedLine({
            ...selectedLine,
            assets: [...selectedLine.assets, asset],
            directionOfAssets: [
              ...selectedLine.directionOfAssets,
              selectedLine.direction,
            ],
          });
          setLines(
            lines.map((line) =>
              line.start === selectedLine.start && line.end === selectedLine.end
                ? {
                    ...line,
                    assets: [...line.assets, asset],
                    directionOfAssets: [
                      ...line.directionOfAssets,
                      selectedLine.direction,
                    ],
                  }
                : line,
            ),
          );
        }}
      />
    </div>
  );
};

export default SpacePage;
