import ReactCrop from 'react-image-crop';
import React, { useState } from 'react';

import type { Crop, ReactCropProps } from 'react-image-crop';

interface IImageCropperProps extends Omit<ReactCropProps, 'crop' | 'onChange'> {
  aspect: number;
}

export const ImageCropper = ({ aspect, ...props }: IImageCropperProps) => {
  const [crop, setCrop] = useState<Crop>({
    x: 0,
    y: 0,
    unit: '%',
    height: 100,
    width: 100,
    aspect,
  });

  const onCropChange = (_crop: Crop) => {
    if (Math.abs((_crop.width / _crop.height) - (_crop.aspect || 1)) >= 0.001) {
      _crop.width = _crop.height * (_crop.aspect || 1);
    }

    setCrop(_crop);
  }

  return (
    <ReactCrop
      crop={crop}
      ruleOfThirds
      onChange={onCropChange}
      style={{ display: 'inline-block' }}
      keepSelection={true}
      {...props}
    />
  );
};
