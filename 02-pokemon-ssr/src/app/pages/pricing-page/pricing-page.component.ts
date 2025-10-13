import { isPlatformBrowser } from '@angular/common';
import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-pricing-page',
  imports: [],
  templateUrl: './pricing-page.component.html',
  styleUrl: './pricing-page.component.css',
})
export default class PricingPageComponent implements OnInit {

  private title = inject(Title);
  private meta = inject(Meta);
  private plaftorm = inject(PLATFORM_ID);


  ngOnInit(): void {

    if ( !isPlatformBrowser(this.plaftorm) ) {
      document.title = 'Pricing page';
      return;
    }

    //document.title = 'Pricing page';

  /*   this.title.setTitle('Pricing page');

    this.meta.updateTag({
      name: 'description',
      content: 'Este es mi Pricing page'
    });

    this.meta.updateTag({
      property: 'og:title',
      content: 'Pricing page'
    });

    this.meta.updateTag({
      property: 'keywords',
      content: 'Hola, mundo, Pricing page'
    }); */

  }

}
