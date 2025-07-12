import type { TextConfig } from "konva/lib/shapes/Text";
import React from "react";
import { Text } from "react-konva";

export type TypographyCanvasProps = Partial<
  Pick<TextConfig, "x" | "y" | "width" | "height">
> & {
  children: React.ReactNode;
  variant?:
    | "h1"
    | "h2"
    | "h3"
    | "h4"
    | "h5"
    | "h6"
    | "body1"
    | "body2"
    | "caption";
  align?: "left" | "center" | "right";
  color?: string;
  fontWeight?: "normal" | "bold";
};

const variantSizes = {
  h1: 32,
  h2: 28,
  h3: 24,
  h4: 20,
  h5: 18,
  h6: 16,
  body1: 14,
  body2: 12,
  caption: 10,
};

export const TypographyCanvas = React.forwardRef<any, TypographyCanvasProps>(
  (
    {
      children,
      variant = "body1",
      align = "left",
      color = "#000000",
      fontWeight = "normal",
      x = 0,
      y = 0,
      width,
      height,
      ...rest
    },
    ref
  ) => {
    const fontSize = variantSizes[variant] || 14;

    return React.createElement(Text as any, {
      ref,
      text: typeof children === "string" ? children : String(children),
      x,
      y,
      width,
      height,
      fontSize,
      fontFamily: "Arial, sans-serif",
      fontStyle: fontWeight,
      align,
      fill: color,
      ...rest,
    });
  }
);

TypographyCanvas.displayName = "TypographyCanvas";
