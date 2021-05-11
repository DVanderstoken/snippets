import { Component } from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'PDFPreview';
  fileContent: string | ArrayBuffer;
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      templateFile: new FormControl(),
    });
  }

  onFileSelected(): void {
    const fileReader = new FileReader();
    fileReader.onload = (e) => {
      this.fileContent = fileReader.result;
    };
    fileReader.readAsDataURL(this.form.controls.templateFile.value);
  }

  cancel(): void {
    this.fileContent = undefined;
  }
}
