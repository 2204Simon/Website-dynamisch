import React, { useRef, useEffect } from "react";

interface CanvasProps {
  width: number;
  height: number;
  imageUrl: string;
}

const Canvas: React.FC<CanvasProps> = ({ width, height, imageUrl }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const image = imageRef.current;
    if (canvas && image) {
      const context = canvas.getContext("2d");
      if (context) {
        context.drawImage(image, 0, 0);
      }
    }
  }, [imageUrl]);

  return (
    <>
      <canvas ref={canvasRef} width={width} height={height} />
      <img ref={imageRef} src={imageUrl} style={{ display: "none" }} />
    </>
  );
};

export default Canvas;
