## Project structure :

```
├── build
│   ├── keycloak-common
│   ├── keycloak-master
│   ├── keycloak-slave
│   └── resources
│       └── keycloak-11
│           ├── bin
│           ├── docs
│           ├── domain
│           ├── jboss-modules.jar
│           ├── LICENSE.txt
│           ├── modules
│           ├── standalone
│           ├── themes
│           ├── version.txt
│           └── welcome-content
├── keycloak-standalone-cluster.yml
└── README.md
```

## Run project :

#### In standalone cluster mode :

```
docker-compose -f keycloak-standalone-cluster.yml up --build
```

#### In domain cluster mode

prereqsuisites:
- PostgreSQL db listening on localhost:5432

```
./build/resources/keycloak-11/bin/domain.sh --host-config=host-master.xml
./build/resources/keycloak-11/bin/domain.sh --host-config=host-slave.xml
```
