L'objectif est de téléverser un fichier PDF et d'obtenir une miniature de sa première page.

# 1. Installation des composants requis

Si le projet utilise _@angular-material_, installer le composant _[@angular-material-components/file-input](https://www.npmjs.com/package/@angular-material-components/file-input)_ :
```
yarn add @angular-material-components/file-input[@{version}]
```
__ATTENTION :__ Faire attention à la version à installer fonction de la version Angular.



Installation du composant _[ng2-pdf-viewer](https://www.npmjs.com/package/ng2-pdf-viewer)_ qui s'appuie sur [PDF JS](https://mozilla.github.io/pdf.js/getting_started/)
```
yarn add ng2-pdf-viewer
```

# 2. Mise en oeuvre des composants

## 2.1 Import de modules

Il faut importer les deux modules installés dans votre module applicatif :
```typescript
(...)
import {NgxMatFileInputModule} from '@angular-material-components/file-input';
import {PdfViewerModule} from 'ng2-pdf-viewer';

@NgModule({
    imports: [
        (...),
        NgxMatFileInputModule, 
        PdfViewerModule],
    (...))
})
export class MyModule {
}

```

## 2.2 Composant d'utilisation

Dans le fichier html du composant :
```html
        (...)

        <mat-tab>
            (...)

            <div *ngIf="!fileContent">
                <mat-form-field>
                    <ngx-mat-file-input [formControl]="form.controls['templateFile']" [multiple]="false"
                                        accept="application/pdf" placeholder="Choisir un fichier..."
                                        (change)="onFileSelected()">
                        <mat-icon ngxMatAttachFileIcon>folder</mat-icon>
                    </ngx-mat-file-input>
                </mat-form-field>
            </div>

            <div fxLayout="column" fsFlex="100%" class="preview-container">
                <div *ngIf="fileContent" fxLayout="row" fxLayoutAlign="start center" class="preview">
                    <pdf-viewer [src]="fileContent" [original-size]="false" [show-all]="false" [page]="0" [zoom]="0.95"
                                [zoom-scale]="'page-height'"></pdf-viewer>
                </div>
                (...)

            </div>
        </mat-tab>
        (...)

```

Dans le fichier TypeScript du composant :
```typescript
(...)
    
    fileContent: string;

(...)

     onFileSelected() {
        const fileReader = new FileReader();
        fileReader.onload = (e) => {
            this.fileContent = fileReader.result;
        }
        fileReader.readAsDataURL(this.form.controls['templateFile'].value);
    }

(...)    
```

__ATTENTION :__ Ne pas oublier le _reset_ du _FormControl_ si besoin et en fonction des différentes actions dans le composant.