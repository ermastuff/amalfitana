// Tipi minimi per page-flip (StPageFlip), che non li distribuisce.
declare module "page-flip/dist/js/page-flip.module.js" {
  export type SizeType = "fixed" | "stretch";
  export type Orientation = "portrait" | "landscape";
  export type FlipCorner = "top" | "bottom";
  export type FlipEvent =
    | "flip"
    | "changeOrientation"
    | "changeState"
    | "init"
    | "update";

  export interface FlipSetting {
    startPage: number;
    size: SizeType;
    width: number;
    height: number;
    minWidth: number;
    maxWidth: number;
    minHeight: number;
    maxHeight: number;
    drawShadow: boolean;
    flippingTime: number;
    usePortrait: boolean;
    startZIndex: number;
    autoSize: boolean;
    maxShadowOpacity: number;
    showCover: boolean;
    mobileScrollSupport: boolean;
    swipeDistance: number;
    clickEventForward: boolean;
    useMouseEvents: boolean;
    showPageCorners: boolean;
    disableFlipByClick: boolean;
  }

  export interface WidgetEvent {
    data: number | string;
    object: PageFlip;
  }

  export class PageFlip {
    constructor(
      element: HTMLElement,
      settings: Partial<FlipSetting> & { width: number; height: number },
    );
    loadFromImages(images: string[]): void;
    updateFromImages(images: string[]): void;
    loadFromHTML(items: NodeListOf<HTMLElement> | HTMLElement[]): void;
    flipNext(corner?: FlipCorner): void;
    flipPrev(corner?: FlipCorner): void;
    flip(page: number, corner?: FlipCorner): void;
    turnToPage(page: number): void;
    getPageCount(): number;
    getCurrentPageIndex(): number;
    getOrientation(): Orientation;
    update(): void;
    destroy(): void;
    on(event: FlipEvent, callback: (e: WidgetEvent) => void): PageFlip;
    off(event: FlipEvent): PageFlip;
  }
}
