import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimations } from '@angular/platform-browser/animations';
import { CurrencyConvert } from './currency-convert/currency-convert.component';
import { TableComponent } from './shared/table/table.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    AppRoutingModule,
    CurrencyConvert,
    TableComponent
     ],
  providers: [    provideAnimations()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
