import { useEffect, useState } from 'react';
import axios from 'axios';

export function useImage(
  imageUrl: string | undefined,
  onImageSet: (imgId: string) => void = () => void 0): [string | undefined, (_: string) => void, boolean] {
  const [imageSrc, setImageSrc] = useState<string>();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let isSubscribed = true;
    const resetImageSrc = () => {
      setImageSrc('');
      onImageSet('');
      setIsLoading(false);
    };

    if (imageUrl && imageUrl.indexOf('base64') < 0) {
      setIsLoading(true);

      axios.get(imageUrl, { params: { cacheblock: true }, responseType: 'arraybuffer' })
        .then(response => {
          return new Blob([response.data]);
        })
        .then((blobImg) => {
          if (!isSubscribed) {
            return;
          }

          if (blobImg.size > 0) {
            const url = URL.createObjectURL(blobImg);
            setImageSrc(url);
            onImageSet(url);
            setIsLoading(false);
          } else {
            resetImageSrc();
          }
        }, () => isSubscribed && resetImageSrc());
    } else {
      if (imageUrl && imageUrl.indexOf('base64') >= 0) {
        setImageSrc(imageUrl);
        onImageSet(imageUrl);
      } else {
        resetImageSrc();
      }
    }

    return () => {
      isSubscribed = false;

      if (imageSrc) {
        URL.revokeObjectURL(imageSrc);
      }
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imageUrl]);

  return [imageSrc, setImageSrc, isLoading];
}
