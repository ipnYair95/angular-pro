import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core'
import { CalculatorComponent } from './calculator.component';
import { CalculatorService } from '@/calculator/services/calculator.service';

class FakeCalculatorService {

  public resultText = jasmine.createSpy('resultText').and.returnValue('100.00');
  public subResultText = jasmine.createSpy('resultText').and.returnValue('0');
  public lastOperator = jasmine.createSpy('resultText').and.returnValue('+');

  public constructNumber = jasmine.createSpy('constructNumber');

}

describe('CalculatorComponent', () => {
  let component: CalculatorComponent;
  let fixture: ComponentFixture<CalculatorComponent>;
  let calculatorService: FakeCalculatorService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        { provide: CalculatorService, useClass: FakeCalculatorService }
      ],
      imports: [CalculatorComponent]
    }).compileComponents();

    calculatorService = TestBed.inject(CalculatorService) as unknown as FakeCalculatorService;

  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalculatorComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should hace the current getters', () => {

    expect(component.resultText()).toBe('100.00');
    expect(component.subResultText()).toBe('0');
    expect(component.lastOperator()).toBe('+');

  });

  it('should display proper calculation values', () => {

    calculatorService.resultText.and.returnValue('123');
    calculatorService.subResultText.and.returnValue('456');
    calculatorService.lastOperator.and.returnValue('*');

    fixture.detectChanges();

    expect(component.resultText()).toBe('123');
    expect(component.subResultText()).toBe('456');
    expect(component.lastOperator()).toBe('*');

  });

  it('should have 19 calculator button components', () => {

    expect(component.calculatorButtons().length).toBe(19);

  });

  it('should have 19 calculator button components with content projection', () => {

    const components = fixture.nativeElement.querySelectorAll('app-calculator-button');

    expect(components.length).toBe(19);

    const firstButton = components[0] as HTMLElement;
    expect( firstButton.textContent?.trim()).toBe('C');

  });


  it('should handle keyboard events', () => {

    const eventEnter = new KeyboardEvent('keyup', { key: 'Enter' });

    document.dispatchEvent(eventEnter);

    expect( calculatorService.constructNumber ).toHaveBeenCalledWith('=');

    const eventEscape = new KeyboardEvent('keyup', { key: 'Escape' });

    document.dispatchEvent(eventEscape);

    expect( calculatorService.constructNumber ).toHaveBeenCalledWith('C');

  });

  it('should display text correctly', () => {

    calculatorService.resultText.and.returnValue('123');
    calculatorService.subResultText.and.returnValue('10');
    calculatorService.lastOperator.and.returnValue('-');

    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).toContain('123');

    const subResult = fixture.nativeElement.querySelector('#sub-result') as HTMLElement;

    expect(subResult.textContent).toContain('10 -');

  });

});
