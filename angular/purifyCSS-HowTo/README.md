## Comment enlever les règles CSS inutilisées dans un projet Angular
### A utiliser avec précautions...

#### Utilise
- gulp,
- gulp-purifycss

```
npm i -D gulp gulp-purifycss
```

#### A la racine du projet, créer un fichier `gulpfile.js` :

```
const gulp = require('gulp');
const purify = require('gulp-purifycss');

gulp.task('purifyCSS', () => {
  return gulp.src('./dist/styles.*.css')
    .pipe(
      purify(
        ['./src/app/**/*.ts', './src/app/**/*.html'],
        {
          info: true, // exécution verbeuse
          minify: true, 
          rejected: false, // traçage des règles supprimées
          whitelist: ['*transition*', '*dimmer*'] // règles CSS ignorées
        }
      ),
    )
    .pipe(gulp.dest('./dist/'));
});
```

#### Utilisation (après le build du projet) :

```
gulp purifyCSS
```

