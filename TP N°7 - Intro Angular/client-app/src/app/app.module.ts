import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ClientAddComponent } from './components/client-add/client-add.component';
import { ClientListComponent } from './components/client-list/client-list.component';

@NgModule({
  declarations: [
    AppComponent,
    ClientAddComponent,
    ClientListComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
