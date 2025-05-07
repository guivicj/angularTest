import {Routes} from '@angular/router';

export const appRoutes: Routes = [
  {
    path: 'calculator',
    loadComponent: () =>
      import('./features/calculator/calculator.component').then(m => m.CalculatorComponent),
  },
];
