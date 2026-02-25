import { NgFor, NgIf } from '@angular/common';
import {
  Component,
  ViewChild,
  ElementRef,
  AfterViewInit,
  OnDestroy,
} from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

// fabric v6 import
import {
  Canvas as FabricCanvas,
  Image as FabricImage,
  Rect,
  Circle,
  Triangle,
  Textbox,
  FabricObject,
} from 'fabric';

@Component({
  selector: 'app-product',
  templateUrl: './product.html',
  styleUrls: ['./product.scss'],
  imports:[NgIf, NgFor, FormsModule]
})
export class Product {
  @ViewChild('fabricCanvas', { static: true })
  canvasRef!: ElementRef<HTMLCanvasElement>;

  canvas!: FabricCanvas;

  selectedOption: 'text' | 'upload' | 'gallery' | null = null;
  textValue = '';

  galleryImages = ['assets/gallery/img1.jpeg', 'assets/gallery/img2.jpeg'];

  ngAfterViewInit(): void {
    this.canvas = new FabricCanvas(this.canvasRef.nativeElement, {
      preserveObjectStacking: true,
      selection: true,
      backgroundColor: '',
    });

    this.canvas.setWidth(200);
    this.canvas.setHeight(200);

    // LIMIT SCALING
    this.canvas.on('object:scaling', (e) => {
      const obj = e.target as FabricObject;
      if (!obj) return;

      const bound = obj.getBoundingRect(); // no arguments
      const maxW = this.canvas.getWidth();
      const maxH = this.canvas.getHeight();

      if (bound.width > maxW) {
        obj.scaleX = (maxW - 2) / (obj.width || 1);
      }
      if (bound.height > maxH) {
        obj.scaleY = (maxH - 2) / (obj.height || 1);
      }
    });

    // PREVENT MOVING OUTSIDE
    this.canvas.on('object:moving', (e) => {
      const obj = e.target as FabricObject;
      if (!obj) return;

      const bound = obj.getBoundingRect();
      const W = this.canvas.getWidth();
      const H = this.canvas.getHeight();

      if (bound.left < 0) obj.left = obj.left! - bound.left;
      if (bound.top < 0) obj.top = obj.top! - bound.top;
      if (bound.left + bound.width > W)
        obj.left = W - bound.width + (obj.left! - bound.left);
      if (bound.top + bound.height > H)
        obj.top = H - bound.height + (obj.top! - bound.top);
    });
  }

  ngOnDestroy(): void {
    if (this.canvas) this.canvas.dispose();
  }

  selectOption(opt: 'text' | 'upload' | 'gallery') {
    this.selectedOption = opt;
  }

  // ---------------- TEXT ----------------
  addText() {
    if (!this.textValue.trim()) return;

    const txt = new Textbox(this.textValue, {
      left: 40,
      top: 40,
      fontSize: 24,
      width: 50,
      fill: '#000',
    });

    this.addObject(txt);
    this.textValue = '';
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

  // ---------------- SHAPES ----------------
  addRectangle() {
    const rect = new Rect({
      left: 30,
      top: 30,
      width: 80,
      height: 50,
      fill: 'transparent',
      stroke: '#000',
      strokeWidth: 2,
    });

    this.addObject(rect);
  }

  addCircle() {
    const circ = new Circle({
      left: 40,
      top: 40,
      radius: 25,
      fill: 'transparent',
      stroke: '#000',
      strokeWidth: 2,
    });

    this.addObject(circ);
  }

  addTriangle() {
    const tri = new Triangle({
      left: 40,
      top: 40,
      width: 60,
      height: 60,
      fill: 'transparent',
      stroke: '#000',
      strokeWidth: 2,
    });

    this.addObject(tri);
  }

  // ---------------- DELETE ----------------
  deleteSelected() {
    const active = this.canvas.getActiveObjects();
    active.forEach((obj) => this.canvas.remove(obj));
    this.canvas.discardActiveObject();
    this.canvas.renderAll();
  }

  // ---------------- BRING FORWARD (Fabric v6) ----------------
  bringForward() {
    const obj = this.canvas.getActiveObject();
    if (!obj) return;

    const items = this.canvas._objects;
    const index = items.indexOf(obj);

    if (index < items.length - 1) {
      items.splice(index, 1);
      items.splice(index + 1, 0, obj);
      this.canvas.renderAll();
    }
  }

  // ---------------- SEND BACK (Fabric v6) ----------------
  sendBack() {
    const obj = this.canvas.getActiveObject();
    if (!obj) return;

    const items = this.canvas._objects;
    const index = items.indexOf(obj);

    if (index > 0) {
      items.splice(index, 1);
      items.unshift(obj);
      this.canvas.renderAll();
    }
  }

  clearCanvas() {
    this.canvas.remove(...this.canvas.getObjects());
    this.canvas.renderAll();
  }

  // ---------------- HELPERS ----------------
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

    const ratio = Math.min(W / img.width!, H / img.height!);
    img.scale(ratio);

    img.left = (W - img.width! * ratio) / 2;
    img.top = (H - img.height! * ratio) / 2;
  }
}

//  fontStyles = [
//    'Arial',
//    'Courier New',
//    'Georgia',
//    'Times New Roman',
//    'Verdana',
//    'Impact',
//    'Trebuchet MS',
//    'Comic Sans MS',
//    // Special styles
//    'Italic',
//    'Bold',
//    'Underline',
//  ];


//  applyFont(font: string) {
//     const obj = this.canvas.getActiveObject() as Textbox;
//     if (!obj) return;

//     if (font === 'Italic') {
//       obj.set({
//         fontStyle: obj.fontStyle === 'italic' ? 'normal' : 'italic',
//       });
//     } else if (font === 'Bold') {
//       obj.set({
//         fontWeight: obj.fontWeight === 'bold' ? 'normal' : 'bold',
//       });
//     } else if (font === 'Underline') {
//       obj.set({
//         underline: obj.underline ? false : true,
//       });
//     } else {
//       // Normal font family
//       obj.set({ fontFamily: font });
//     }

//     this.canvas.renderAll();
//   }