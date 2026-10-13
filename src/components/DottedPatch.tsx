"use client";

import React from "react";

export type MaskShape =
  | "ellipse"
  | "circle"
  | "soft"
  | "pill"
  | "fade-left"
  | "fade-right";

export interface DottedPatchProps {
  className?: string;
  width?: string | number;
  height?: string | number;
  top?: string | number;
  bottom?: string | number;
  left?: string | number;
  right?: string | number;
  dotColor?: string;
  dotSize?: number;
  spacing?: number;
  maskShape?: MaskShape;
  rotate?: number;
  opacity?: number;
  glow?: boolean;
  glowColor?: string;
  glowBlur?: number;
  animate?: "pulse" | "float" | "none";
  style?: React.CSSProperties;
}

const getMaskImage = (shape: MaskShape): string => {
  switch (shape) {
    case "circle":
      return "radial-gradient(circle at 50% 50%, black 25%, transparent 75%)";
    case "soft":
      return "radial-gradient(ellipse 85% 75% at 50% 50%, black 10%, transparent 85%)";
    case "pill":
      return "radial-gradient(ellipse 90% 45% at 50% 50%, black 20%, transparent 90%)";
    case "fade-left":
      return "radial-gradient(ellipse 80% 65% at 30% 50%, black 20%, transparent 80%)";
    case "fade-right":
      return "radial-gradient(ellipse 80% 65% at 70% 50%, black 20%, transparent 80%)";
    case "ellipse":
    default:
      return "radial-gradient(ellipse 70% 60% at 50% 50%, black 15%, transparent 80%)";
  }
};

export default function DottedPatch({
  className = "",
  width = 320,
  height = 240,
  top,
  bottom,
  left,
  right,
  dotColor = "rgba(167, 139, 250, 0.35)",
  dotSize = 1.5,
  spacing = 22,
  maskShape = "ellipse",
  rotate = 0,
  opacity = 0.85,
  glow = false,
  glowColor = "rgba(124, 58, 237, 0.15)",
  glowBlur = 40,
  animate = "none",
  style = {},
}: DottedPatchProps) {
  const mask = getMaskImage(maskShape);

  const formattedWidth = typeof width === "number" ? `${width}px` : width;
  const formattedHeight = typeof height === "number" ? `${height}px` : height;

  const positionStyles: React.CSSProperties = {
    position: "absolute",
    width: formattedWidth,
    height: formattedHeight,
    top:
      top !== undefined
        ? typeof top === "number"
          ? `${top}px`
          : top
        : undefined,
    bottom:
      bottom !== undefined
        ? typeof bottom === "number"
          ? `${bottom}px`
          : bottom
        : undefined,
    left:
      left !== undefined
        ? typeof left === "number"
          ? `${left}px`
          : left
        : undefined,
    right:
      right !== undefined
        ? typeof right === "number"
          ? `${right}px`
          : right
        : undefined,
    transform: rotate ? `rotate(${rotate}deg)` : undefined,
    opacity,
    pointerEvents: "none",
    userSelect: "none",
    zIndex: 0,
    ...style,
  };

  const animClass =
    animate === "float"
      ? "animate-dot-float"
      : animate === "pulse"
      ? "animate-dot-pulse"
      : "";

  return (
    <div
      className={`dotted-patch-container ${animClass} ${className}`}
      style={
        {
          ...positionStyles,
          "--patch-rot": `${rotate}deg`,
          "--patch-opacity": opacity,
        } as React.CSSProperties
      }
      aria-hidden="true"
    >
      {/* Optional ambient theme glow behind patch */}
      {glow && (
        <div
          className="absolute inset-0 rounded-full pointer-events-none"
          style={{
            background: glowColor,
            filter: `blur(${glowBlur}px)`,
            transform: "scale(0.75)",
          }}
        />
      )}

      {/* Dotted Pattern Mask */}
      <div
        className="w-full h-full"
        style={{
          backgroundImage: `radial-gradient(circle at center, ${dotColor} ${dotSize}px, transparent ${dotSize}px)`,
          backgroundSize: `${spacing}px ${spacing}px`,
          maskImage: mask,
          WebkitMaskImage: mask,
        }}
      />
    </div>
  );
}
