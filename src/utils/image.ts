export const getBase64FromBlob = (
  img: Blob | File | undefined,
  callback: (img: string | ArrayBuffer | null) => void,
) => {
  if (img) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }
};
