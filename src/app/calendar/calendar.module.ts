import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalendarComponent } from './calendar.component';
import { BasketComponent } from '../basket/basket.component';

const routes: Routes = [{ path: '', component: CalendarComponent }];

@NgModule({
  declarations: [
    BasketComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CalendarComponent
  ],
})
export class CalendarModule {}
