import { Injectable, signal } from '@angular/core';

const numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

const operators = ['+', '-', 'x', '÷'];

const commands = ['+/-', '%', '.', 'C', '=', 'Backspace'];

@Injectable({
  providedIn: 'root'
})
export class CalculatorService {

  public resultText = signal('0');
  public subResultText = signal('0');
  public lastOperator = signal('+');

  public constructNumber(value: string) {

    // Validar input

    if (![...numbers, ...operators, ...commands].includes(value)) {
      console.log("Invalid input", value);
      return;
    }

    // =

    if (value === '=') {
      this.calculateResult();
      return;
    }

    // C

    if (value === 'C') {
      this.resultText.set('0');
      this.subResultText.set('0');
      this.lastOperator.set('+');
      return;
    }

    // backspace

    if (value === 'Backspace') {
      this.removeLastCharacter();
      return;
    }

    // operators

    if (operators.includes(value)) {
      this.calculateResult();
      this.lastOperator.set(value);
      this.subResultText.set(this.resultText());
      this.resultText.set('0');
      return;
    }

    // limitar caracteres

    if (this.resultText().length >= 10) {
      console.log("max length reached");
      return;
    }

    // decimal

    if (value === '.' && !this.resultText().includes('.')) {
      this.validateWithoutDecimal();
      return;
    }

    // manejo del cero

    if (value === '0' && (this.resultText() === '0' || this.resultText() === '-0')) {
      return;
    }

    // cambiar signo
    if (value === '+/-') {
      this.resultText.update(text => text.includes('-') ? text.slice(1) : '-' + text);
      return;
    }

    if( numbers.includes(value) ) {

      if (this.resultText() === '0') {
        this.resultText.set(value);
        return;
      }

      if( this.resultText().includes('-0') ) {
        this.resultText.set('-' + value);
        return;
      }

      this.resultText.update(text => text + value);
      return;
    }

  }

  public removeLastCharacter() {

    if (this.resultText() === '0') {
      return;
    }

    if (this.resultText() === '-0') {
      this.resultText.set('0');
      return;
    }

    if (this.resultText().length === 2 && this.resultText().includes('-')) {
      this.resultText.set('0');
      return;
    }

    if (this.resultText().length === 1) {
      this.resultText.set('0');
      return;
    }

    this.resultText.update(value => value.slice(0, -1));

  }

  public validateWithoutDecimal() {

    if (this.resultText() === '0' || this.resultText() === '') {
      this.resultText.set('0.');
      return;
    }

    this.resultText.update(value => value + '.');

  }

  public calculateResult(){

    const number1 = parseFloat( this.subResultText() );
    const number2 = parseFloat( this.resultText() );

    let result = 0;

    switch( this.lastOperator() ) {
      case '+':
        result = number1 + number2;
        break;
      case '-':
        result = number1 - number2;
        break;
      case 'x':
        result = number1 * number2;
        break;
      case '÷':
        result = number1 / number2;
        break;
    }

    this.resultText.set(result.toString());
    this.subResultText.set('0');
    this.lastOperator.set('+');

  }

}
