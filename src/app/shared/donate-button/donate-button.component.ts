import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
    selector: 'app-donate-button',
    templateUrl: './donate-button.component.html',
    styleUrls: ['./donate-button.component.scss']
})
export class DonateButtonComponent implements OnInit {
    @ViewChild('paypalButton', { static: true })
    public paypalButton: ElementRef;

    constructor(private elementRef: ElementRef) { }

    public ngOnInit(): void {
        this.paypalButton.nativeElement.innerHTML = getPayPalButton();
    }

    public clickForm(): void {
        const inputElement = this.elementRef.nativeElement.querySelector('#donate-click-target');
        inputElement.click();
    }
}

function getPayPalButton(): string {
    return `
    <form action="https://www.paypal.com/cgi-bin/webscr"
          method="post"
          target="_top"
          style="display: none;">
        <input type="hidden"
               name="cmd"
               value="_donations" />
        <input type="hidden"
               name="business"
               value="WR657KF67GLC2" />
        <input type="hidden"
               name="currency_code"
               value="USD" />
        <input type="image"
               src="https://www.paypalobjects.com/en_US/i/btn/btn_donate_SM.gif"
               border="0"
               name="submit"
               title="PayPal - The safer, easier way to pay online!"
               alt="Donate with PayPal button"
               id="donate-click-target"/>
        <img alt=""
             border="0"
             src="https://www.paypal.com/en_US/i/scr/pixel.gif"
             width="1"
             height="1" />
    </form>
    `;
}
