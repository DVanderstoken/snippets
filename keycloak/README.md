## Project structure :

```
├── Docker
│   ├── keycloak-master
│   └── keycloak-slave
├── docker-compose.yml
├── README.md
└── resources
```

## Build :

```
docker build -f ./Docker/keycloak-master . -t keycloak-master:latest --force-rm
```
