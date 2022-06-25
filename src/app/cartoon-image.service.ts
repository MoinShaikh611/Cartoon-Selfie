import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CartoonImageService {
  async getCartoonImage(blob: Blob) {
    console.log({ blob });

    const file = new File([blob], 'face.png', { type: 'image/png' });

    const formData = new FormData();
    formData.append('file', file);

    const res = await fetch(
      `https://www.cutout.pro/api/v1/cartoonSelfie?cartoonType=1`,
      {
        method: 'POST',
        headers: {
          APIKEY: 'a8a317886da849d4b3192bc09b91bf70',
        },
        body: formData,
      }
    );

    const resImgBlob = await res.blob();
    return resImgBlob;
  }
}
