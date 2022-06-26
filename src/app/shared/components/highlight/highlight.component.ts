import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EmbeddedViewRef,
  Input,
  OnChanges,
  SecurityContext,
  SimpleChanges, 
  TemplateRef,
  ViewChild,
  ViewContainerRef,
  ViewEncapsulation
} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { highlightCode } from '@shared/helpers';

@Component({
  selector: 'textarea[app-highlight]',
  templateUrl: './highlight.component.html',
  styleUrls: ['./highlight.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HighlightComponent implements OnChanges, AfterViewInit {

  @ViewChild(TemplateRef) templateRef: TemplateRef<any>;
  
  @Input()
  code: string;

  @Input()
  lang: string;
  
  highlightedCode: string | null;
  private _viewRef: EmbeddedViewRef<any> | null;

  constructor(
    private _domSanitizer: DomSanitizer,
    private _elementRef: ElementRef,
    private _viewContainerRef: ViewContainerRef) {}

  ngOnChanges(changes: SimpleChanges): void {
    if ( changes.code || changes.lang ) {
      // Return if the viewContainerRef is not available
      if (!this._viewContainerRef.length) {
        return;
      }

      // Highlight and insert the code
      this._highlightAndInsert();
    }
  }

  ngAfterViewInit(): void {
    // Return if there is no language set
    if (!this.lang) {
      return;
    }

    // If there is no code input, get the code from the textarea
    if (!this.code) {
      this.code = this._elementRef.nativeElement.value;
    }

    this._highlightAndInsert();
  }

  private _highlightAndInsert(): void {
    // Return if the template reference is not available
    if (!this.templateRef) {
      return;
    }

    // Return if the code or language is not defined
    if (!this.code || !this.lang) {
      return;
    }

    // Destroy the component if there is already one
    if (this._viewRef) {
      this._viewRef.destroy();
      this._viewRef = null;
    }

    // Highlight and sanitize the code just in case
    this.highlightedCode = this._domSanitizer.sanitize(SecurityContext.HTML, highlightCode(this.code, this.lang));

    // Return if the highlighted code is null
    if (this.highlightedCode === null) {
      return;
    }

    // Render and insert the template
    this._viewRef = this._viewContainerRef.createEmbeddedView(this.templateRef, {
        highlightedCode: this.highlightedCode,
        lang: this.lang
    });

    // Detect the changes
    this._viewRef.detectChanges();
  }
}
