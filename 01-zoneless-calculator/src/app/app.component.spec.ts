import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {

  let fixture: ComponentFixture<AppComponent>;
  let compiled: HTMLElement;

  beforeEach(async () => {

    await TestBed.configureTestingModule({
      imports: [AppComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    compiled = fixture.nativeElement as HTMLElement;


  });

  it('should create the app', () => {
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render router-outlet', () => {

    const routerOutlet = compiled.querySelector('router-outlet');

    expect(routerOutlet).toBeTruthy();

  });

  it('should render router-outlet wrapped with css classes', () => {

    const divElement = compiled.querySelector('div');

    const cssClasses = 'min-w-screen min-h-screen bg-slate-600 flex items-center justify-center px-5 py-5'.split(' ');

    expect(divElement).toBeTruthy();

    cssClasses.forEach(cssClass => {
      expect(divElement?.classList.contains(cssClass)).toBeTruthy();
    });

  });


});
