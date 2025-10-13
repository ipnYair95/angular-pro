import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core'
import CalculatorViewComponent from './calculator-view.component';

describe('CalculatorViewComponent', () => {
  let component: CalculatorViewComponent;
  let fixture: ComponentFixture<CalculatorViewComponent>;
  let compiled: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
      imports: [CalculatorViewComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalculatorViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    compiled = fixture.nativeElement as HTMLElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain app-calculator', () => {

    const component = compiled.querySelector('app-calculator');

    expect(component).toBeTruthy();

  });

  it('should contain basic css classes', () => {

    const divElement = fixture.nativeElement.querySelector('div');

    const classes = 'w-full mx-auto rounded-xl bg-gray-100 shadow-xl text-gray-800 relative overflow-hidden'.split(' ');

    classes.forEach(className => {
      expect(divElement.classList.contains(className)).toBeTruthy();
    });


  });

});
