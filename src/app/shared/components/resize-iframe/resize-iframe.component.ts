import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-resize-iframe',
  templateUrl: './resize-iframe.component.html'
})
export class ResizeIframeComponent implements AfterViewInit, OnChanges {

  @ViewChild('container') container: ElementRef;
  @ViewChild('frame') iframe: ElementRef;

  @Input()
  iframeUrl: string;

  @Input()
  height = 800;

  url: SafeResourceUrl;

  mouseDown = false;
  currentPosition: number | undefined;
  width: number;

  constructor(
    private sanitizer: DomSanitizer,
    private changeDetector: ChangeDetectorRef) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.iframeUrl.currentValue) {
      this.url = this.sanitizer.bypassSecurityTrustResourceUrl(this.iframeUrl);
    }
  }

  ngAfterViewInit(): void {
    this.width = this.iframe.nativeElement.offsetWidth;
    this.changeDetector.detectChanges();
  }

  clicked(pageX: number): void {
    this.mouseDown = true;
    this.currentPosition = pageX;
  }

  released(): void {
    this.mouseDown = false;
    this.currentPosition = undefined;
  }

  resize(pageX: number): void {
    if (!this.mouseDown || !this.currentPosition) {
      return;
    }

    if (this.width > this.container.nativeElement.offsetWidth) {
      this.width = this.container.nativeElement.offsetWidth;
    } else {
      this.width -= this.currentPosition - pageX;
    }
    this.currentPosition = pageX;
  }

}
