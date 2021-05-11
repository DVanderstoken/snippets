import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';

import {NgxMatFileInputModule} from '@angular-material-components/file-input';
import {PdfViewerModule} from 'ng2-pdf-viewer';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    NgxMatFileInputModule,
    PdfViewerModule,
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatIconModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
