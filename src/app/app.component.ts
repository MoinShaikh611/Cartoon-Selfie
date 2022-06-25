import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { CartoonImageService } from './cartoon-image.service';
import { saveAs } from 'file-saver';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements AfterViewInit {
  title = 'cartoon-selfie';

  @ViewChild('video')
  public video!: ElementRef<HTMLVideoElement>;
  @ViewChild('canvas')
  public canvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('preview')
  public preview!: ElementRef<HTMLImageElement>;

  captures: string[] = [];
  error: any;
  isCaptured = false;
  base64png: any;

  gotResponseImg = false;
  responseImgBlob!: Blob;

  constructor(private cartoonService: CartoonImageService) {}

  async ngAfterViewInit() {
    await this.setupDevices();
  }

  async setupDevices() {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: {
            aspectRatio: { exact: 1 },
          },
        });
        if (stream) {
          this.video.nativeElement.srcObject = stream;
          this.video.nativeElement.play();
          this.error = null;
        } else {
          this.error = 'You have no output video device';
        }
      } catch (e) {
        this.error = e;
      }
    }
  }

  async getCartoonImage() {
    this.drawImageToCanvas(this.video.nativeElement);
    this.isCaptured = true;

    const blob = await this.getCanvasBlob();
    if (blob) {
      const data = await this.cartoonService.getCartoonImage(blob);
      console.log(data);
      this.responseImgBlob = data;
      const objUrl = URL.createObjectURL(data);
      this.preview.nativeElement!.src = objUrl;
      this.gotResponseImg = true;

      // console.log(blob);
      // const objUrl = URL.createObjectURL(blob);
      // console.log(objUrl, this.preview);
      // this.preview.nativeElement!.src = objUrl;
      // this.responseImgBlob = blob;
      // this.gotResponseImg = true;
    }
  }

  save() {
    saveAs(this.responseImgBlob, 'Your Cartoon Selfie.png');
  }

  drawImageToCanvas(image: any) {
    console.log(
      this.video.nativeElement.offsetWidth,
      this.video.nativeElement.offsetHeight
    );

    this.canvas.nativeElement
      .getContext('2d')
      ?.drawImage(
        image,
        0,
        0,
        this.video.nativeElement.offsetWidth,
        this.video.nativeElement.offsetHeight
      );
  }

  getCanvasBlob(): Promise<Blob | null> {
    return new Promise((resolve) => {
      this.canvas.nativeElement.toBlob((blob) => resolve(blob));
    });
  }
}
