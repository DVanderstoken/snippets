## Exemple de personnalisation du theme d'un site en fonction de l'environnement d'exécution

Exemple incluant Bootstrap 4.x.

Dans l'exemple ci-dessous, le lancement de l'application utilise le color scheme standard de Bootstrap sauf si l'option `--configuration=devportal` est utilisée, auquel cas [la palette de couleur est surchargée](https://getbootstrap.com/docs/4.0/getting-started/theming/).

Les commandes :
- `yarn start`, ou                         
- `yarn start --configuration=production`
lancent le projet avec la palette Bootstrap par défaut.

La commande `yarn start --configuration=devportal` lance le projet avec la palette personnalisée.


A la racine du projet, ajouter une feuille de style adaptée à votre environnement cible (ex: portail de développement pour NC Connect) :

`src/styles.devportal.scss`

Et y inclure les particularités de l'environnement (surcharge de la palette par défaut de Bootstrap) :

```
@import "../node_modules/bootstrap/scss/functions";
@import "../node_modules/bootstrap/scss/variables";
@import "../node_modules/bootstrap/scss/mixins";


$theme-colors: (
    "primary":    #1c1c1c,
    "secondary":  #757b6e,
    "success":    #0d77ae,
    "info":       #bbbbbb,
    "warning":    #e4c70e,
    "danger":     #951026,
    "light":      #757b6e,
    "dark":       #1c1c1c
  );

 /*
 Don't forget to import boostrap to apply new color theme with Boostrap Sass functions.
 */
 @import '../node_modules/bootstrap/scss/bootstrap.scss';
```

Ajouter le fichier environnement correspondant dans `src/environments`

Dans le fichier `angular.json`, ajouter la configuration nécessaire, exemple :

```
"configurations": {
            "production": {
              "outputPath": "dist/production",
              ...
            },
            "devportal": {
              "outputPath": "dist/dev-portal",
              "fileReplacements": [
                {
                  "replace": "src/environments/environment.ts",
                  "with": "src/environments/environment.devportal.ts"
                }
              ],
              "optimization": true,
              "outputHashing": "all",
              "sourceMap": false,
              "extractCss": true,
              "namedChunks": false,
              "aot": true,
              "extractLicenses": true,
              "vendorChunk": false,
              "buildOptimizer": true,
              "budgets": [
                {
                  "type": "initial",
                  "maximumWarning": "2mb",
                  "maximumError": "5mb"
                }
              ],
              "styles": [
                "node_modules/bootstrap/dist/css/bootstrap.min.css",
                "src/styles.devportal.scss"
              ]
            }
          }
```

Ajouter dans la section `serve {}` la configuration d'exécution pour votre nouvel environnement :

```
"serve": {
          "builder": "@angular-devkit/build-angular:dev-server",
          "options": {
            "browserTarget": "test-env:build"
          },
          "configurations": {
            "production": {
              "browserTarget": "test-env:build:production"
            },
            "devportal": {
              "browserTarget": "test-env:build:devportal"
            }
          }
        }
```        
Le projet est complété de modifications de configuration dans le fichier `package.json` pour disposer des deux versions (cf. `dist/production` et `dist/dev-portal`) après exécution de la commande `yarn build` :
```
"scripts": {
    (...)
    "build": "ng build --configuration=production && ng build --configuration=devportal",
    (...)
  }
```
