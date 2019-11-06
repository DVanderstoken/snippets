# POC Editique
## Génération de documents PDF à partir des moteurs de template FreeMarker et Thymeleaf

Le projet peut être construit indifféremment avec :
- maven (cf. `pom.xml`, ou
- gradle (cf. `build.gradle`)
Les wrappers étant installés dans les versions requises.

Les noms de fichiers résultats sont figés :
- freemarkerPDFResult.pdf pour FreeMarker 2, et
- thymeleafPDFResult.pdf pour Thymeleaf
notamment pour l'exécution des benchmarks (environ 45000 fichiers générés).


#### Prérequis
- Java JRE 9+ (cf. Benchmarks)
- Maven 3.6.x 
- Gradle 5+ 

#### Pipeline de rendu

![Pipeleine de rendu](./documentation/Pipeline-complete.png)

Arborescence du projet :
```
├── README.md
├── build.gradle
├── documentation
│   ├── CSS-Print-en-2019-02-15.pdf
│   ├── Documentation\ FreeMarker.url
│   ├── Pipeline-complete.png
│   └── usingthymeleaf.pdf
├── freemarkerPDFResult.pdf
├── gradle
│   └── wrapper
│       ├── gradle-wrapper.jar
│       └── gradle-wrapper.properties
├── gradlew
├── gradlew.bat
├── mvnw
├── mvnw.cmd
├── pom.xml
├── settings.gradle
├── src
│   ├── jmh
│   │   └── java
│   │       └── nc
│   │           └── redstone
│   │               └── opt
│   │                   ├── BaseBenchmark.java
│   │                   ├── FreeMarkerBenchmark.java
│   │                   └── ThymeleafBenchmark.java
│   ├── main
│   │   ├── java
│   │   │   └── nc
│   │   │       └── redstone
│   │   │           └── opt
│   │   │               ├── BarCodeService.java
│   │   │               ├── BarGraphService.java
│   │   │               ├── Mock.java
│   │   │               └── XHTMLConverter.java
│   │   └── resources
│   │       ├── static
│   │       │   ├── fonts
│   │       │   ├── images
│   │       │   └── styles
│   │       │       ├── graph.css
│   │       │       └── style.css
│   │       └── templates
│   │           ├── freemarker
│   │           │   ├── address.ftl
│   │           │   ├── footer.ftl
│   │           │   └── template.ftl
│   │           └── thymeleaf
│   │               ├── address.html
│   │               ├── footer.html
│   │               └── template.html
│   └── test
│       └── java
│           └── nc
│               └── redstone
│                   └── opt
│                       └── test
│                           ├── JUnit5Benchmark.java
│                           ├── JUnit5BenchmarkExtension.java
│                           └── TemplateEnginesTests.java
└── thymeleafPDFResult.pdf
```

Les templates sont spécialisés par moteur de rendu. Ils utilisent les mêmes feuilles de styles.

Les templates utilisent dans les deux cas les fragments.


#### Benchmarks

Le projet utilise :
- Java Microbenchmark Harness - JMH, et / ou
- Junit 5

##### JMH

L'utilisation du plugin jmh pour gradle impose de placer les benchmarks dans le dossier source `src/jmh/java`.

- construire le projet :
    - Maven : `./mvnw clean install`
    - Gradle : `./gradlew build`

- Lancer l'exécution des benchmarks : 
    - Maven : `java -jar target/benchmarks.jar`
    - Gradle : `./gradlew jmh` 
  
  **ATTENTION** : l'exécution des benchmarks dure environ 25 minutes. Ne pas interrompre le process au risque de ne pas avoir de résultats !

##### JUnit 5
Il suffit de lancer l'exécution des tests :
- Maven : `./mvnw test`
- Gradle : `./gradlew test`

Pour lancer des tests en masse, décommenter dans la classe de tests `TemplateEnginesTests` l'annotation `@RepeatedTest` en remplacement de l'annotation `@Test` (la supprimer dans ce cas).