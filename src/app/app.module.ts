import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { DataPresentationModule } from './modules/data-presentation/data-presentation.module';
import {
    ConnectionOptionsManagerComponent,
    TrackingBlockComponent
} from './components';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    DataPresentationModule,
    ConnectionOptionsManagerComponent,
    ReactiveFormsModule,
    TrackingBlockComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
