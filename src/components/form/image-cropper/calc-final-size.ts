type CalcFinalSizeFunctionType = (params: {
  cropWidth: number,
  cropHeight: number,
  minHeight: number,
  minWidth: number,
  maxHeight: number,
  maxWidth: number,
}) => { height: number, width: number };

export const calcFinalSize: CalcFinalSizeFunctionType = ({ cropWidth, cropHeight, minHeight, minWidth, maxHeight, maxWidth }) => {
  const height = cropHeight > minHeight ? cropHeight : minHeight;
  const width = cropWidth > minWidth ? cropWidth : minWidth;

  return {
    height: height > maxHeight ? maxHeight : height,
    width: width > maxWidth ? maxWidth : width,
  }
}
