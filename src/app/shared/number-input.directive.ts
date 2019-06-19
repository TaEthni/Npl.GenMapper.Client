import { Directive, ElementRef } from '@angular/core';

const isNumberAvail = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window['MSStream'];

@Directive({
    selector: '[appNumberInput]'
})
export class NumberInputDirective {
    constructor(
        private elementRef: ElementRef
    ) {
        if (isNumberAvail) {
            this.elementRef.nativeElement.setAttribute('pattern', '\\d*');
        }
    }
}
