import { NgFor, NgIf } from '@angular/common';
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
  selector: 'app-diamention',
  standalone: true,
  imports: [NgFor, NgIf, FormsModule],
  templateUrl: './diamention.html',
  styleUrl: './diamention.scss',
})
export class Diamention implements AfterViewInit, OnDestroy {
  @ViewChild('frontCanvas', { static: true })
  frontRef!: ElementRef<HTMLCanvasElement>;

  @ViewChild('backCanvas', { static: true })
  backRef!: ElementRef<HTMLCanvasElement>;

  frontCanvas!: FabricCanvas;
  backCanvas!: FabricCanvas;
  canvas!: FabricCanvas; // ✅ ACTIVE CANVAS

  currentSide: 'front' | 'back' = 'front';

  selectedOption: 'text' | 'upload' | 'gallery' | null = null;
  textValue = '';
  showStyleOptions = false;

  galleryImages = ['assets/gallery/img1.jpeg', 'assets/gallery/img2.jpeg'];

  fontStyles = [
    'Arial',
    'Courier New',
    'Georgia',
    'Times New Roman',
    'Verdana',
    'Impact',
    'Trebuchet MS',
    'Comic Sans MS',
  ];

  colors = [
    '#000000',
    '#FF0000',
    '#00FF00',
    '#0000FF',
    '#FFA500',
    '#800080',
    '#FFC0CB',
    '#008080',
    '#555555',
    '#999999',
    '#ffffff',
  ];

  ngAfterViewInit(): void {
    this.frontCanvas = new FabricCanvas(this.frontRef.nativeElement);
    this.backCanvas = new FabricCanvas(this.backRef.nativeElement);

    this.canvas = this.frontCanvas; // ✅ DEFAULT FRONT

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Delete' || e.key === 'Backspace') {
        this.deleteSelected();
      }
    });
  }

  ngOnDestroy(): void {
    this.frontCanvas.dispose();
    this.backCanvas.dispose();
  }

  // ✅ FLIP BUTTON
  flipSide() {
    if (this.currentSide === 'front') {
      this.currentSide = 'back';
      this.canvas = this.backCanvas;
    } else {
      this.currentSide = 'front';
      this.canvas = this.frontCanvas;
    }
  }

  selectOption(opt: 'text' | 'upload' | 'gallery') {
    this.selectedOption = opt;
    if (opt !== 'text') this.showStyleOptions = false;
  }

  // ---------------- TEXT ----------------
  addText() {
    if (!this.textValue.trim()) return;

    const txt = new Textbox(this.textValue, {
      left: 30,
      top: 60,
      fontSize: 36,
      fill: '#000',
      width: 25,
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

  // ---------------- UPLOAD IMAGE ----------------
  onImageUpload(evt: Event) {
    const input = evt.target as HTMLInputElement;
    if (!input.files?.length) return;

    const file = input.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      FabricImage.fromURL(reader.result as string).then((img) => {
        this.fitImage(img);
        this.addObject(img);
      });
    };

    reader.readAsDataURL(file);
    input.value = '';
  }

  // ---------------- GALLERY IMAGE ----------------
  addGalleryImage(url: string) {
    FabricImage.fromURL(url).then((img) => {
      this.fitImage(img);
      this.addObject(img);
    });
  }

  clearCanvas() {
    this.canvas.remove(...this.canvas.getObjects());
    this.canvas.renderAll();
    this.showStyleOptions = false;
  }

  deleteSelected() {
    const active = this.canvas.getActiveObject();
    if (active) {
      this.canvas.remove(active);
      this.canvas.discardActiveObject();
      this.canvas.renderAll();
    }
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

  private fitImage(img: FabricImage) {
    const W = this.canvas.getWidth();
    const H = this.canvas.getHeight();

    const ratio = Math.max(100 / img.width!, 100 / img.height!);
    img.scale(ratio);

    img.left = (W - img.width! * ratio) / 2;
    img.top = (H - img.height! * ratio) / 2;
  }

  // ✅✅✅ EXPORT FRONT + BACK INTO ONE PNG ✅✅✅
  exportBoth() {
    // ✅ Get RAW HTML canvases (NOT fabric export)
    const frontHTML = this.frontCanvas.lowerCanvasEl;
    const backHTML = this.backCanvas.lowerCanvasEl;

    const fw = frontHTML.width;
    const fh = frontHTML.height;
    const bw = backHTML.width;
    const bh = backHTML.height;

    // ✅ Create MERGED canvas
    const mergedCanvas = document.createElement('canvas');
    mergedCanvas.width = Math.max(fw, bw);
    mergedCanvas.height = fh + bh; // ✅ STACKED VERTICALLY

    const ctx = mergedCanvas.getContext('2d')!;

    // ✅ DRAW BOTH — THIS IS THE KEY FIX
    ctx.drawImage(frontHTML, 0, 0, fw, fh);
    ctx.drawImage(backHTML, 0, fh, bw, bh);

    // ✅ EXPORT FINAL PNG
    const finalPNG = mergedCanvas.toDataURL('image/png');

    // ✅ DOWNLOAD
    const link = document.createElement('a');
    link.href = finalPNG;
    link.download = 'front-back.png';
    link.click();
  }
}
