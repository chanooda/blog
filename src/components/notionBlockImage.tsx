"use client";

import React, { useEffect, useRef, useState } from "react";

interface NotionBlockImageProps {
  url: string;
}

export default function NotionBlockImage({ url }: NotionBlockImageProps) {
  const imageRef = useRef<HTMLImageElement>(null);
  const [show, setShow] = useState(false);
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const image = imageRef?.current;
    if (image) {
      if (window.innerWidth <= 500) {
        setImageSize(() => ({
          height: window.innerHeight - 20,
          width: window.innerWidth,
        }));
      } else {
        setImageSize(() => ({
          height: window.innerHeight - 100,
          width: window.innerWidth - 100,
        }));
      }
    }
    if (image && show) {
      const windowResizeHandler = () => {
        if (window.innerWidth <= 500) {
          setImageSize(() => ({
            height: window.innerHeight - 20,
            width: window.innerWidth,
          }));
        } else {
          setImageSize(() => ({
            height: window.innerHeight - 100,
            width: window.innerWidth - 100,
          }));
        }
      };
      window?.addEventListener("resize", windowResizeHandler);
      return () => window?.removeEventListener("resize", windowResizeHandler);
    }
  }, [show]);

  return (
    <>
      <img
        className="max-w-full mx-auto object-contain block cursor-pointer"
        src={url}
        onClick={() => setShow(true)}
      />
      {show && (
        <div
          className="fixed left-0 top-0 z-50 w-[100vw] h-[100vh] bg-[rgba(0,0,0,0.8)] flex items-center justify-center"
          onClick={() => setShow(false)}
        >
          <img
            className="block"
            src={url}
            ref={imageRef}
            style={{
              maxWidth: imageSize.width !== 0 ? imageSize.width : "auto",
              maxHeight: imageSize.height !== 0 ? imageSize.height : "auto",
            }}
          />
        </div>
      )}
    </>
  );
}
