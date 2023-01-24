import NextImg from 'next/image';
import { FC, useMemo, useRef, useState } from 'react';
import tinycolor from 'tinycolor2';
import { invlerp } from '../../helpers/calc';
import { CellsConverter } from '../../helpers/cells-converter';
import { useContainerCells } from '../../hooks/containerCells';
import { useIsSSR } from '../../hooks/isSSR';
import { PureCanvas } from '../pure-canvas/pure-canvas';

const GRAY_SCALE_CHARS = 'M#o=-. ';

const getClampedImageDimensions = (
  image: HTMLImageElement,
  vCells: number,
  hCells: number,
  fitToWidth?: boolean,
  fitToHeight?: boolean
) => {
  const width = image.naturalWidth;
  const height = image.naturalHeight;

  const widthScale = invlerp(
    width,
    [0, CellsConverter.cellsToWidth(hCells)],
    false
  );
  const heightScale = invlerp(
    height,
    [0, CellsConverter.cellsToHeight(vCells)],
    false
  );

  if ((widthScale > heightScale && !fitToHeight) || fitToWidth) {
    return {
      width: Math.floor(CellsConverter.widthToCells(width / widthScale)),
      height: Math.floor(CellsConverter.heightToCells(height / widthScale))
    };
  } else {
    return {
      width: Math.floor(CellsConverter.widthToCells(width / heightScale)),
      height: Math.floor(CellsConverter.heightToCells(height / heightScale))
    };
  }
};

const toGrayScale = (r: number, g: number, b: number) =>
  0.21 * r + 0.72 * g + 0.07 * b;

const getCharacterForGrayScale = (grayScale: number) =>
  GRAY_SCALE_CHARS[
    Math.ceil(((GRAY_SCALE_CHARS.length - 1) * grayScale) / 255)
  ];

const convertToColorMap = (
  context: CanvasRenderingContext2D,
  width: number,
  height: number
): {
  character: string;
  color: string;
}[][] => {
  const imageData = context.getImageData(0, 0, width, height);

  const colorMap: {
    character: string;
    color: string;
  }[][] = [[]];

  let currentRow = 0;
  for (let i = 0; i * 4 < imageData.data.length; i++) {
    if (i / width >= currentRow + 1) {
      currentRow++;
      colorMap[currentRow] = [];
    }

    const r = imageData.data[i * 4];
    const g = imageData.data[i * 4 + 1];
    const b = imageData.data[i * 4 + 2];
    const a = invlerp(imageData.data[i * 4 + 3], [0, 255]);

    const rgba = tinycolor(`rgba(${r},${g},${b},${a})`);
    const lightened = rgba.isDark()
      ? rgba.lighten(30).toHex8String()
      : rgba.toHexString();

    colorMap[currentRow][i % width] = {
      character: a === 0 ? ' ' : getCharacterForGrayScale(toGrayScale(r, g, b)),
      color: lightened
    };
  }

  return colorMap;
};

type AsciiImageProps = {
  src: string;
  fitToWidth?: boolean;
  fitToHeight?: boolean;
  preload?: boolean;
};

export const AsciiImage: FC<AsciiImageProps> = ({
  src,
  fitToWidth,
  fitToHeight,
  preload
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [image, setImage] = useState<HTMLImageElement>();
  const { vCells, hCells } = useContainerCells();

  const isSSR = useIsSSR();

  const ascii = useMemo(() => {
    try {
      const ctx = canvasRef.current?.getContext('2d', {
        willReadFrequently: true
      });

      if (canvasRef.current && ctx && image && !isSSR) {
        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

        const dimensions = getClampedImageDimensions(
          image,
          vCells,
          hCells,
          fitToWidth,
          fitToHeight
        );

        ctx.drawImage(image, 0, 0, dimensions.width, dimensions.height);
        return convertToColorMap(ctx, dimensions.width, dimensions.height);
      }
    } catch (e) {
      console.error(e);
    }
  }, [fitToHeight, fitToWidth, hCells, image, isSSR, vCells]);

  return (
    <>
      <NextImg
        src={src}
        alt=""
        onLoadingComplete={img => setTimeout(() => setImage(img), 10)}
        width={CellsConverter.cellsToWidth(hCells)}
        height={CellsConverter.cellsToHeight(vCells)}
        style={{
          opacity: 0,
          position: 'absolute',
          zIndex: -1,
          objectFit: 'contain',
          objectPosition: '0 0'
        }}
        loading={preload ? 'eager' : 'lazy'}
      />
      <PureCanvas
        style={{ opacity: 0, position: 'absolute', zIndex: -1 }}
        ref={canvasRef}
      />

      <p style={{ whiteSpace: 'nowrap' }}>
        {ascii?.map((row, i) => (
          <span key={`row_${i}`}>
            {row.map((char, j) => (
              <span
                key={`row_col_${i}${j}`}
                style={{ color: char.color, whiteSpace: 'pre' }}
              >
                {char.character}
              </span>
            ))}
            <br />
          </span>
        ))}
      </p>
    </>
  );
};
