import { TestBed } from "@angular/core/testing";
import { CalculatorService } from "./calculator.service";

describe('CalculatorService', () => {

  let service: CalculatorService;

  beforeEach(() => {

    TestBed.configureTestingModule({

    });

    service = TestBed.inject(CalculatorService);

  });



  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have initial value', () => {

    expect(service.resultText()).toBe('0');
    expect(service.subResultText()).toBe('0');
    expect(service.lastOperator()).toBe('+');

  });

  it('should set result text 0 when C is pressed', () => {

    service.resultText.set('1');
    service.subResultText.set('2');
    service.lastOperator.set('-');

    service.constructNumber('C');

    expect(service.resultText()).toBe('0');
    expect(service.subResultText()).toBe('0');
    expect(service.lastOperator()).toBe('+');

  });

  it('should update resultText with number input', () => {

    service.constructNumber('1');

    expect(service.resultText()).toBe('1');

    service.constructNumber('2');

    expect(service.resultText()).toBe('12');

  });

  it('should handle operators correctly', () => {

    service.constructNumber('1');
    service.constructNumber('+');

    expect(service.lastOperator()).toBe('+');
    expect(service.subResultText()).toBe('1');
    expect(service.resultText()).toBe('0');

  });

  it('should calculate result correctly for addition', () => {

    service.constructNumber('1');
    service.constructNumber('+');
    service.constructNumber('2');
    service.constructNumber('=');

    expect(service.resultText()).toBe('3');
    expect(service.subResultText()).toBe('0');
    expect(service.lastOperator()).toBe('+');

  });

  it('should calculate result correctly for subtraction', () => {

    service.constructNumber('1');
    service.constructNumber('-');
    service.constructNumber('2');
    service.constructNumber('=');

    expect(service.resultText()).toBe('-1');
    expect(service.subResultText()).toBe('0');
    expect(service.lastOperator()).toBe('+');

  });

  it('should calculate result correctly for multiplication', () => {

    service.constructNumber('1');
    service.constructNumber('x');
    service.constructNumber('2');
    service.constructNumber('=');

    expect(service.resultText()).toBe('2');
    expect(service.subResultText()).toBe('0');
    expect(service.lastOperator()).toBe('+');

  });

  it('should calculate result correctly for division', () => {

    service.constructNumber('1');
    service.constructNumber('÷');
    service.constructNumber('2');
    service.constructNumber('=');

    expect(service.resultText()).toBe('0.5');
    expect(service.subResultText()).toBe('0');
    expect(service.lastOperator()).toBe('+');

  });

  it('should handle decimal point', () => {

    service.constructNumber('1');
    service.constructNumber('.');
    service.constructNumber('2');
    service.constructNumber('=');

    expect(service.resultText()).toBe('1.2');
    expect(service.subResultText()).toBe('0');
    expect(service.lastOperator()).toBe('+');

  });

  it('should handle negative number', () => {

    service.constructNumber('-');
    service.constructNumber('1');
    service.constructNumber('=');

    expect(service.resultText()).toBe('-1');
    expect(service.subResultText()).toBe('0');
    expect(service.lastOperator()).toBe('+');

  });

  it('should handle decimal point correctly starting with zero', () => {

    service.constructNumber('0');
    service.constructNumber('.');
    service.constructNumber('2');
    service.constructNumber('=');

    expect(service.resultText()).toBe('0.2');
    expect(service.subResultText()).toBe('0');
    expect(service.lastOperator()).toBe('+');

  });

  it('should habdle sign change correctly', () => {

    service.constructNumber('1');
    service.constructNumber('+/-');
    service.constructNumber('=');

    expect(service.resultText()).toBe('-1');
    expect(service.subResultText()).toBe('0');
    expect(service.lastOperator()).toBe('+');

  });

  it('should handle backspace correctly', () => {

    service.constructNumber('1');
    service.constructNumber('2');
    service.constructNumber('3');
    service.constructNumber('Backspace');
    service.constructNumber('=');

    expect(service.resultText()).toBe('12');
    expect(service.subResultText()).toBe('0');
    expect(service.lastOperator()).toBe('+');

    service.constructNumber('Backspace');
    service.constructNumber('=');

    expect(service.resultText()).toBe('1');
    expect(service.subResultText()).toBe('0');
    expect(service.lastOperator()).toBe('+');

    service.constructNumber('Backspace');
    service.constructNumber('=');

    expect(service.resultText()).toBe('0');
    expect(service.subResultText()).toBe('0');
    expect(service.lastOperator()).toBe('+');

  });

  it('should handle max correctly', () => {

    for (let i = 0; i < 11; i++) {
      service.constructNumber('1');
    }

    expect(service.resultText()).toBe('1111111111');
    expect(service.subResultText()).toBe('0');
    expect(service.lastOperator()).toBe('+');

  });



});


