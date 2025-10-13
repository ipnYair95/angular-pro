import { Component, ElementRef, HostBinding, input, output, signal, viewChild, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-calculator-button',
  imports: [],
  templateUrl: './calculator-button.component.html',
  styleUrl: './calculator-button.component.scss',
  host: {
    class: 'w-1/4 border-r border-b border-indigo-400',
    '[class.w-2/4]': 'isDoubleSize()',
    '[class.w-1/4]': '!isDoubleSize()',
  },
  encapsulation: ViewEncapsulation.None
})
export class CalculatorButtonComponent {

  public isPressed = signal(false);

  contentValue = viewChild<ElementRef<HTMLButtonElement>>('button');

  isCommand = input(false, {
    transform: (value: boolean | string) => typeof value === 'string' ? value === '' : value
  });

  isDoubleSize = input(false, {
    transform: (value: boolean | string) => typeof value === 'string' ? value === '' : value
  });

  onClick = output<string>();

 /*  @HostBinding('class.is-double-size')
  get isCommandClass() {
    return this.isDoubleSize()
  } */


  handleClick() {

    const value = this.contentValue()?.nativeElement?.innerText;

    this.onClick.emit(value || '');

  }

  public keyboardPressedStyle(key: string){

    if( !this.contentValue() ){
      return;
    }

    const value = this.contentValue()?.nativeElement?.innerText!;

    if( value !== key ){
      return;
    }

    this.isPressed.set(true);

    setTimeout(() => {
      this.isPressed.set(false);
    }, 100);

  }


}
