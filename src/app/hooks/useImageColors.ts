"use client";

import { useEffect, useState } from "react";
import ColorThief from "colorthief";

interface Palette {
  Vibrant: string;
  LightVibrant: string;
  DarkVibrant: string;
  Muted: string;
  LightMuted: string;
  DarkMuted: string;
}

interface UseImageColorsResult {
  dominantColor: string;
  palette: Palette | null;
  isLoading: boolean;
  error: Error | null;
}

export const useImageColors = (imageUrl: string): UseImageColorsResult => {
  const [palette, setPalette] = useState<Palette | null>(null);
  const [dominantColor, setDominantColor] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!imageUrl) return;

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = imageUrl;

    img.onload = () => {
      const colorThief = new ColorThief();
      try {
        const domColorArray = colorThief.getColor(img); // [R, G, B]
        const paletteColors = colorThief.getPalette(img, 6); // Get 6 colors

        const rgbString = `rgb(${domColorArray.join(",")})`;
        setDominantColor(rgbString);

        // Convert RGB arrays to strings
        const paletteObj: Palette = {
          Vibrant: `rgb(${paletteColors[0].join(",")})`,
          LightVibrant: `rgb(${paletteColors[1].join(",")})`,
          DarkVibrant: `rgb(${paletteColors[2].join(",")})`,
          Muted: `rgb(${paletteColors[3].join(",")})`,
          LightMuted: `rgb(${paletteColors[4].join(",")})`,
          DarkMuted: `rgb(${paletteColors[5].join(",")})`,
        };

        setPalette(paletteObj);
        setIsLoading(false);
      } catch (err: any) {
        setError(new Error("Failed to extract colors."));
        setIsLoading(false);
        console.error("Color extraction error:", err);
      }
    };

    img.onerror = () => {
      setError(new Error("Image failed to load."));
      setIsLoading(false);
    };
  }, [imageUrl]);

  return { dominantColor, palette, isLoading, error };
};
