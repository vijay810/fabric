
import {
  Component,
  ViewChild,
  ElementRef,
  AfterViewInit,
  OnDestroy,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  Canvas as FabricCanvas,
  Image as FabricImage,
  Textbox,
  FabricObject,
} from 'fabric';

@Component({
  selector: 'app-backup',
  imports: [FormsModule],
  templateUrl: './backup.html',
  styleUrl: './backup.scss',
})
export class Backup implements AfterViewInit, OnDestroy {
  @ViewChild('fabricCanvas', { static: true })
  canvasRef!: ElementRef<HTMLCanvasElement>;

  canvas!: FabricCanvas;

  selectedOption: 'text' | 'upload' | 'gallery' | null = null;
  textValue = '';
  showStyleOptions = false;

  selectedShirtColor = 'white';
  selectedShirtSize = 'M';

  shirtColors = [
    { name: 'White', value: 'white' },
    { name: 'Black', value: 'black' },
    { name: 'Red', value: 'red' },
    { name: 'Blue', value: 'blue' },
  ];

  shirtSizes = ['S', 'M', 'L', 'XL'];

  galleryImages = ['assets/gallery/img1.jpeg', 'assets/gallery/img2.jpeg'];

  fontStyles = ['Arial', 'Courier New', 'Georgia', 'Verdana', 'Impact'];

  colors = ['#000000', '#FF0000', '#00FF00', '#0000FF', '#ffffff'];

  ngAfterViewInit(): void {
    this.canvas = new FabricCanvas(this.canvasRef.nativeElement);
    this.updateShirt();

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Delete') this.deleteSelected();
    });
  }

  ngOnDestroy(): void {
    this.canvas.dispose();
  }

  getShirtImage() {
    return `/assets/tshirts/${this.selectedShirtColor}.png`;
  }

  updateShirt() {
    const sizeMap: any = {
      S: { w: 140, h: 160 },
      M: { w: 160, h: 180 },
      L: { w: 180, h: 200 },
      XL: { w: 200, h: 220 },
    };

    const s = sizeMap[this.selectedShirtSize];
    this.canvas.setWidth(s.w);
    this.canvas.setHeight(s.h);
    this.canvas.renderAll();
  }

  selectOption(opt: 'text' | 'upload' | 'gallery') {
    this.selectedOption = opt;
    if (opt !== 'text') this.showStyleOptions = false;
  }

  addText() {
    if (!this.textValue.trim()) return;

    const txt = new Textbox(this.textValue, {
      left: 20,
      top: 40,
      fontSize: 28,
      fill: '#000',
    });

    this.addObject(txt);
    this.textValue = '';
    this.showStyleOptions = true;
  }

  applyColor(color: string) {
    const obj = this.canvas.getActiveObject() as Textbox;
    if (obj) {
      obj.set({ fill: color });
      this.canvas.renderAll();
    }
  }

  applyFont(font: string) {
    const obj = this.canvas.getActiveObject() as Textbox;
    if (obj) {
      obj.set({ fontFamily: font });
      this.canvas.renderAll();
    }
  }

  onImageUpload(evt: Event) {
    const input = evt.target as HTMLInputElement;
    if (!input.files?.length) return;

    const reader = new FileReader();
    reader.onload = () => {
      FabricImage.fromURL(reader.result as string).then((img) => {
        const maxSize = 120;
        const scale = Math.min(maxSize / img.width!, maxSize / img.height!);

        img.set({
          scaleX: scale,
          scaleY: scale,
        });

        this.addObject(img);
      });
    };

    reader.readAsDataURL(input.files[0]);
    input.value = '';
  }

  addGalleryImage(url: string) {
    FabricImage.fromURL(url).then((img) => {
      img.scaleToWidth(80);
      this.addObject(img);
    });
  }

  deleteSelected() {
    const active = this.canvas.getActiveObject();
    if (active) this.canvas.remove(active);
  }

  clearCanvas() {
    this.canvas.clear();
    this.showStyleOptions = false;
  }

  private addObject(obj: FabricObject) {
    obj.set({
      cornerStyle: 'circle',
      cornerColor: 'black',
      borderColor: 'black',
      transparentCorners: false,
    });

    this.canvas.add(obj);
    this.canvas.setActiveObject(obj);
    this.canvas.renderAll();
  }

  exportToPNG() {
    const shirt = new Image();
    shirt.src = this.getShirtImage();
    shirt.crossOrigin = 'anonymous';
    const EXPORT_SCALE = 4;
    shirt.onload = () => {
      const exportCanvas = document.createElement('canvas');
      const exportCtx = exportCanvas.getContext('2d')!;

      exportCanvas.width = shirt.width;
      exportCanvas.height = shirt.height;

      exportCtx.drawImage(shirt, 0, 0);

      const printArea = document.querySelector('.print-area') as HTMLElement;
      const shirtPreview = document.querySelector(
        '.shirt-preview'
      ) as HTMLElement;

      const printRect = printArea.getBoundingClientRect();
      const shirtRect = shirtPreview.getBoundingClientRect();

      const offsetX = printRect.left - shirtRect.left;
      const offsetY = printRect.top - shirtRect.top;

      const scaleX = shirt.width / shirtRect.width;
      const scaleY = shirt.height / shirtRect.height;

      const designImg = new Image();
      designImg.src = this.canvas.toDataURL({
        format: 'png',
        quality: 1,
        multiplier: EXPORT_SCALE,
      });

      designImg.onload = () => {
        exportCtx.save();
        exportCtx.beginPath();
        exportCtx.rect(
          offsetX * scaleX,
          offsetY * scaleY,
          printRect.width * scaleX,
          printRect.height * scaleY
        );
        exportCtx.clip();

        exportCtx.drawImage(
          designImg,
          offsetX * scaleX,
          offsetY * scaleY,
          printRect.width * scaleX,
          printRect.height * scaleY
        );

        exportCtx.restore();

        const finalPNG = exportCanvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.href = finalPNG;
        link.download = 'tshirt-design.png';
        link.click();
      };
    };
  }
}
