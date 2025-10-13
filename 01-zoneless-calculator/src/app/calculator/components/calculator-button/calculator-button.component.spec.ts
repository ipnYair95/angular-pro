import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, provideExperimentalCheckNoChangesForDebug } from '@angular/core'
import { CalculatorButtonComponent } from './calculator-button.component';

@Component({
  standalone: true,
  imports: [CalculatorButtonComponent],
  template: `
    <app-calculator-button>
      <span>Test Content</span>
    </app-calculator-button>
  `
})
class TestHostComponent { }

describe('CalculatorButtonComponent', () => {
  let component: CalculatorButtonComponent;
  let fixture: ComponentFixture<CalculatorButtonComponent>;
  let compiled: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
      imports: [CalculatorButtonComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalculatorButtonComponent);
    component = fixture.componentInstance;
    compiled = fixture.nativeElement as HTMLElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should apply w-1/4 double-size is false', () => {

    const hostCssClasses: string[] = compiled.classList.value.split(' ');

    expect(hostCssClasses.includes('w-1/4')).toBeTrue();
    expect(component.isDoubleSize()).toBeFalse();

  });

  it('should apply w-2/4 double-size is true', () => {

    fixture.componentRef.setInput('isDoubleSize', true);

    fixture.detectChanges();

    const hostCssClasses: string[] = compiled.classList.value.split(' ');

    expect(hostCssClasses.includes('w-2/4')).toBeTrue();
    expect(component.isDoubleSize()).toBeTrue();

  });

  it('should emit onClick when handleClick is called', () => {

    spyOn(component.onClick, 'emit');

    component.handleClick();

    expect(component.onClick.emit).toHaveBeenCalled();

  });

  it('should set isPressed to true and then false when keyboardPressedStyle is called', (done) => {

    component.contentValue()!.nativeElement.innerText = '1';

    component.keyboardPressedStyle('1');

    expect(component.isPressed()).toBeTrue();

    setTimeout(() => {
      expect(component.isPressed()).toBeFalse();
      done();
    }, 101);

  });

  it('should not set isPressed to true and then false when keyboardPressedStyle is called', () => {

    component.contentValue()!.nativeElement.innerText = '1';

    component.keyboardPressedStyle('2');

    expect(component.isPressed()).toBeFalse();

  });

  it('should display projected content', () => {

    const testHostFixture = TestBed.createComponent(TestHostComponent);

    const divElement = testHostFixture.nativeElement as HTMLElement;

    expect(divElement.textContent).toContain('Test Content');

  });

});
