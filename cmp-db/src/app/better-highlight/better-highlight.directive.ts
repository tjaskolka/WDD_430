import { Directive, ElementRef, HostBinding, HostListener, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appBetterHighlight]'
})
export class BetterHighlightDirective implements OnInit {
  @Input() defaultColor: string = 'transparent';
  @Input() highlightColor: string = 'blue';
  @HostBinding('style.backgroundColor') backgroundColor: string = this.defaultColor;
  @HostBinding('style.color') color: string = 'blue';

  constructor(private elRef: ElementRef, private renderer: Renderer2) { }
  ngOnInit(): void {
    //this.renderer.setStyle(this.elRef.nativeElement, 'background-color', 'blue', false, false)
  }

  @HostListener('mouseenter') mouseover(eventData: Event) {
  //  this.renderer.setStyle(this.elRef.nativeElement, 'background-color', 'blue'),
  //  this.renderer.setStyle(this.elRef.nativeElement, 'color', 'white')
    this.backgroundColor = this.highlightColor;
    this.color = 'white';
  }

  @HostListener('mouseleave') mouseexit(eventData: Event) {
  //  this.renderer.setStyle(this.elRef.nativeElement, 'background-color', 'transparent')
    this.backgroundColor = this.defaultColor;
    this.color = 'black';
  }

}
