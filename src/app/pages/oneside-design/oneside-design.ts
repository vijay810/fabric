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
  selector: 'app-oneside-design',
  imports: [NgFor, NgIf, FormsModule],
  templateUrl: './oneside-design.html',
  styleUrl: './oneside-design.scss',
})
export class OnesideDesign implements AfterViewInit, OnDestroy {
  @ViewChild('fabricCanvas', { static: true })
  canvasRef!: ElementRef<HTMLCanvasElement>;

  canvas!: FabricCanvas;

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

  // option - 1
  // ngAfterViewInit(): void {
  //   this.canvas = new FabricCanvas(this.canvasRef.nativeElement, {
  //     preserveObjectStacking: true,
  //     selection: true,
  //     backgroundColor: '',
  //   });

  //   this.canvas.setWidth(200);
  //   this.canvas.setHeight(200);
  // }

  // option - 2
  // ngAfterViewInit(): void {
  // this.canvas = new FabricCanvas(this.canvasRef.nativeElement);

  //   document.addEventListener('keydown', (e) => {
  //     if (e.key === 'Delete' || e.key === 'Backspace') {
  //       this.deleteSelected();
  //     }
  //   });
  // }
  ngAfterViewInit(): void {
    this.canvas = new FabricCanvas(this.canvasRef.nativeElement, {
      preserveObjectStacking: true,
      selection: true,
      backgroundColor: '',
    });

    this.canvas.setWidth(200);
    this.canvas.setHeight(200);

    // this.canvas = new FabricCanvas(this.canvasRef.nativeElement);

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Delete' || e.key === 'Backspace') {
        this.deleteSelected();
      }
    });
  }
  deleteSelected() {
    const active = this.canvas.getActiveObject();
    if (active) {
      this.canvas.remove(active);
      this.canvas.discardActiveObject();
      this.canvas.renderAll();
    }
  }

  ngOnDestroy(): void {
    if (this.canvas) this.canvas.dispose();
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

    const ratio = Math.max(100 / img.width!, 100 / img.height!);
    img.scale(ratio);

    img.left = (W - img.width! * ratio) / 2;
    img.top = (H - img.height! * ratio) / 2;
  }
}
