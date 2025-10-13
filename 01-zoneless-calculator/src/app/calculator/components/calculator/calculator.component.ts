import { Component, computed, HostListener, inject, viewChildren } from '@angular/core';
import { CalculatorButtonComponent } from "../calculator-button/calculator-button.component";
import { CalculatorService } from '@/calculator/services/calculator.service';

@Component({
  selector: 'app-calculator',
  imports: [CalculatorButtonComponent],
  templateUrl: './calculator.component.html',
  styleUrl: './calculator.component.scss',
  host: {
    '(document:keyup)': 'handleKeyboardEvent($event)'
  }
})
export class CalculatorComponent {

  private calculatorService = inject(CalculatorService);

  public calculatorButtons = viewChildren(CalculatorButtonComponent);

  public resultText = computed(() => this.calculatorService.resultText());
  public subResultText = computed(() => this.calculatorService.subResultText());
  public lastOperator = computed(() => this.calculatorService.lastOperator());

  handleClick(key: string) {

    this.calculatorService.constructNumber(key);

  }

  handleKeyboardEvent(event: KeyboardEvent) {

    const keyEquivalents: Record<string, string> = {
      Escape: 'C',
      Clear: 'C',
      '*': 'x',
      '/': '÷',
      Enter: '='
    };

    const { key } = event;

    const keyPressed = keyEquivalents[key] ?? key;

    this.handleClick(keyPressed);

    this.calculatorButtons().forEach((button) => {

      button.keyboardPressedStyle(keyPressed);

    });




  }

}
