import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {buttonGrid, CalculatorButtonConfig} from "./button-grid";

@Component({
    selector: 'app-calculator',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './calculator.component.html',
    styleUrls: ['./calculator.component.scss']
})
export class CalculatorComponent {
    display = '0';
    accumulator: number | null = null;
    operator: string | null = null;
    overwrite = true;

    buttons: CalculatorButtonConfig[][] = buttonGrid;

    onClick(label: string) {
        const isDigit = /^\d$/.test(label);

        const actions: Record<string, () => void> = {
            '.': () => {
                if (!this.display.includes('.')) {
                    this.display += '.';
                    this.overwrite = false;
                }
            },
            '+': () => this.handleOperator(label),
            '-': () => this.handleOperator(label),
            '×': () => this.handleOperator(label),
            '÷': () => this.handleOperator(label),
            '=': () => {
                if (this.operator && this.accumulator !== null) {
                    const result = this.calculate(this.accumulator, parseFloat(this.display), this.operator);
                    this.display = String(result);
                    this.operator = null;
                    this.accumulator = null;
                    this.overwrite = true;
                }
            },
            'AC': () => {
                this.display = '0';
                this.accumulator = null;
                this.operator = null;
                this.overwrite = true;
            },
            '±': () => {
                this.display = this.display.startsWith('-') ? this.display.slice(1) : '-' + this.display;
            },
            '%': () => {
                this.display = String(parseFloat(this.display) / 100);
            }
        };

        if (isDigit) {
            this.display = this.overwrite ? label : this.display + label;
            this.overwrite = false;
        } else if (actions[label]) {
            actions[label]();
        }
    }

    handleOperator(op: string) {
        const current = parseFloat(this.display);
        if (this.accumulator !== null && this.operator) {
            const result = this.calculate(this.accumulator, current, this.operator);
            this.accumulator = result;
            this.display = String(result);
        } else {
            this.accumulator = current;
        }
        this.operator = op;
        this.overwrite = true;
    }

    calculate(a: number, b: number, op: string): number {
        switch (op) {
            case '+':
                return a + b;
            case '-':
                return a - b;
            case '×':
                return a * b;
            case '÷':
                return b !== 0 ? a / b : NaN;
            default:
                return b;
        }
    }
}
