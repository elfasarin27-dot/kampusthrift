/**
 * Utility to compress images client-side before uploading to Firebase Storage/Firestore
 * @param {string | File | Blob} imageInput - Base64 Data URL or File Blob
 * @param {number} maxWidth - Maximum target width (default 1000px)
 * @param {number} maxHeight - Maximum target height (default 1000px)
 * @param {number} quality - JPEG quality 0.0 - 1.0 (default 0.75)
 * @returns {Promise<string>} Compressed Base64 Data URL
 */
export async function compressImage(imageInput, maxWidth = 1000, maxHeight = 1000, quality = 0.75) {
  return new Promise((resolve) => {
    try {
      const img = new Image();
      
      const processImage = (imageSrc) => {
        img.onload = () => {
          let width = img.width;
          let height = img.height;

          // Calculate aspect ratio scale
          if (width > maxWidth) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          }
          if (height > maxHeight) {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }

          const canvas = document.createElement('canvas');
          canvas.width = width;
          canvas.height = height;

          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);

          // Compress to JPEG format with target quality
          const compressedDataUrl = canvas.toDataURL('image/jpeg', quality);
          resolve(compressedDataUrl);
        };

        img.onerror = () => {
          // If error loading image, return original string if possible
          resolve(typeof imageSrc === 'string' ? imageSrc : '');
        };

        img.src = imageSrc;
      };

      if (typeof imageInput === 'string') {
        processImage(imageInput);
      } else if (imageInput instanceof File || imageInput instanceof Blob) {
        const reader = new FileReader();
        reader.onload = (e) => processImage(e.target.result);
        reader.onerror = () => resolve('');
        reader.readAsDataURL(imageInput);
      } else {
        resolve('');
      }
    } catch (e) {
      console.warn("Image compression fallback:", e);
      resolve(typeof imageInput === 'string' ? imageInput : '');
    }
  });
}
