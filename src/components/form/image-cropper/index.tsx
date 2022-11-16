import React, { Ref, useCallback, useEffect, useRef, useState } from 'react';
import Spin from 'antd/es/spin';
import { isEmpty } from 'lodash';
import Modal from 'antd/es/modal';
import Alert from 'antd/es/alert';
import message from 'antd/es/message';

import { Edit } from 'components/icons/edit';
import { useImage } from 'utils/hooks/use-image';
import { ImageCropper as Cropper } from './crop';
import { usePrevious } from 'utils/hooks/use-previous';
import { Delete } from 'components/icons/system/delete';
import { getBase64FromBlob, getCroppedImgFunc } from './utils';
import { CropControlsContainer, DraggerContainer, PlusIcon, StyledDragger } from './elements';

import type { Crop } from 'react-image-crop';
import type { RcFile } from 'antd/lib/upload';

export interface IImageCropper {
  minHeight: number;
  minWidth: number;
  maxHeight?: number;
  maxWidth?: number;
  aspect?: number;
  title?: string;
  value?: string;
  onChange?: (url: string | null) => void;
  onCropURLChanged?: (url: string) => void;
  onLoadingChanged?: (isLoading: boolean) => void;
  disabled?: boolean;
}

const containerWidth = 128;

export const ImageCropper = React.forwardRef(({
  minHeight,
  minWidth,
  maxHeight = Infinity,
  maxWidth = Infinity,
  aspect = 2,
  title,
  onCropURLChanged,
  onLoadingChanged,
  value,
  onChange,
  disabled,
}: IImageCropper, ref: Ref<HTMLDivElement>) => {
  const [croppedImgURL, setCroppedImgUrl] = useState<string>('');
  const [croppedImgURLCache, setCroppedImgURLCache] = useState<string>('');
  const imgRef = useRef<HTMLImageElement | null>(null);
  const [isImageUploading, setIsImageUploading] = useState(false);
  const [visibleModal, setVisibleModal] = useState(false);
  const visibleRef = useRef(false);
  const [scale, setScale] = useState({ x: 1, y: 1 });

  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    visibleRef.current = visibleModal;
  }, [visibleModal]);

  useEffect(() => {
    if (onCropURLChanged) {
      onCropURLChanged(croppedImgURL);
    }
  }, [onCropURLChanged, croppedImgURL]);

  const [originalSrc, setOriginalSrc] = useState<string>();

  const onImageSet = useCallback((objectURL: string) => {
    setOriginalSrc(objectURL);
    setCroppedImgUrl(objectURL);
    setCroppedImgURLCache(objectURL);
  }, [setCroppedImgUrl, setCroppedImgURLCache]);

  const [, , isImageLoading] = useImage(value, onImageSet);

  useEffect(() => {
    if (onLoadingChanged) {
      onLoadingChanged(isImageLoading);
    }
  }, [isImageLoading, onLoadingChanged]);

  const prevCroppedImgURL = usePrevious<string>(croppedImgURL, '');

  useEffect(() => {
    if (!isEmpty(prevCroppedImgURL) && prevCroppedImgURL !== croppedImgURLCache) {
      URL.revokeObjectURL(prevCroppedImgURL);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [croppedImgURL]);

  const onImageLoaded = useCallback((image: HTMLImageElement) => {
    imgRef.current = image;

    if (image.naturalHeight < minHeight || image.naturalWidth < minWidth) {
      setErrorMsg('This image doesn\'t have a proper size.');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [minHeight, minWidth, imgRef, setErrorMsg]);

  const getCroppedImg = useCallback(() => getCroppedImgFunc({
    setScale,
    minWidth,
    minHeight,
    maxWidth,
    maxHeight,
  }), [setScale, minWidth, minHeight, maxWidth, maxHeight]);

  const onCropComplete = useCallback(async (cropProp: Crop) => {
    if (imgRef.current && cropProp.width) {
      const croppedImageUrl = await getCroppedImg()(
        imgRef.current,
        cropProp,
      );

      if (croppedImageUrl && visibleRef.current) {
        setCroppedImgUrl(croppedImageUrl);
      }
    }
  }, [imgRef, visibleRef, getCroppedImg, setCroppedImgUrl]);

  const handleOk = useCallback(() => {
    setVisibleModal(false);
    setCroppedImgURLCache(croppedImgURL);

    if (onChange) {
      fetch(croppedImgURL)
        .then(response => response.blob())
        .then(blob => {
          getBase64FromBlob(blob, base64 => {
            onChange(String(base64));
          });
        });
    }
  }, [setVisibleModal, setCroppedImgURLCache, croppedImgURL, onChange]);

  const handleCancel = useCallback(() => {
    setCroppedImgUrl(croppedImgURLCache);
    setVisibleModal(false);
  }, [setCroppedImgUrl, croppedImgURLCache, setVisibleModal]);

  const beforeUpload = useCallback((file: RcFile): Promise<void | Blob | File> => {
    return new Promise(() => {
      const isCorrect =
        file.type === 'image/jpeg' ||
        file.type === 'image/png' ||
        file.type === 'image/jpg' ||
        file.type === 'image/gif' ||
        file.type === 'image/webp' ||
        file.type === 'image/ico' ||
        file.type === 'image/cur' ||
        file.type === 'image/bmp';

      if (!isCorrect) {
        message.error('Unsupported image extension');
        return Promise.reject();
      } else {
        setErrorMsg('');

        setIsImageUploading(true);

        getBase64FromBlob(file, (imageUrl) => {
          setOriginalSrc(imageUrl as string);
          setVisibleModal(true);
          setIsImageUploading(false);
        });

        return Promise.resolve(file);
      }
    });
  }, [setErrorMsg]);

  const innerContent = (
    <div>
      {!disabled && <PlusIcon />}
      <div>{title ? title : 'Drag your image here or click in this area.'}</div>
    </div>
  );

  const onCropEdit = useCallback(() => setVisibleModal(true), [setVisibleModal]);
  const onCropDelete = useCallback(() => {
    setCroppedImgUrl('');
    if (onChange) {
      onChange(null);
    }
  }, [setCroppedImgUrl, onChange]);

  const PreviewBlock = (
    <>
      {!disabled && (
        <CropControlsContainer>
          <Edit fill="#fff" onClick={onCropEdit} />
          <Delete fill="#fff" onClick={onCropDelete} />
        </CropControlsContainer>
      )}
      <img alt="Crop" style={{ maxWidth: '100%' }} src={croppedImgURL} />
    </>
  );

  return (
    <div style={{ maxWidth: containerWidth }} ref={ref}>
      <Spin spinning={Boolean(isImageUploading || (isImageLoading && !croppedImgURL))}>
        <DraggerContainer
          $width={containerWidth}
          $height={containerWidth}
        >
          <StyledDragger
            showUploadList={false}
            beforeUpload={beforeUpload}
            disabled={disabled || (croppedImgURL !== '')}
            accept=".jpeg,.png,.jpg,.webp,.bmp"
          >
            {Boolean(value && croppedImgURL) ? PreviewBlock : innerContent}
          </StyledDragger>
        </DraggerContainer>
      </Spin>

      <Modal
        title="Change image size"
        visible={visibleModal}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Crop"
        destroyOnClose
        width={620}
        maskTransitionName="none"
        okButtonProps={{
          disabled: !isEmpty(errorMsg),
        }}
      >
        {originalSrc && (
          <>
            <Cropper
              src={originalSrc}
              minWidth={minWidth / scale.x}
              minHeight={minHeight / scale.y}
              aspect={aspect}
              onImageLoaded={onImageLoaded}
              onComplete={onCropComplete}
            />
            {errorMsg && <Alert message={errorMsg} type="error" />}
          </>
        )}
      </Modal>
    </div>
  );
});
