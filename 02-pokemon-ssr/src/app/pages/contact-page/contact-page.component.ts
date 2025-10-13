import { Component, inject, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-contact-page',
  imports: [],
  templateUrl: './contact-page.component.html',
  styleUrl: './contact-page.component.css',
})
export default class ContactPageComponent implements OnInit {

  private title = inject(Title);
  private meta = inject(Meta);


  ngOnInit(): void {

    this.title.setTitle('Contact page');

    this.meta.updateTag({
      name: 'description',
      content: 'Este es mi Contact page'
    });

    this.meta.updateTag({
      property: 'og:title',
      content: 'Contact page'
    });

    this.meta.updateTag({
      property: 'keywords',
      content: 'Hola, mundo, Contact page'
    });

  }

}
