# [Testcontainers](https://www.testcontainers.org/)
## Exemple d'utilisation pour valider les migrations Flyway

#### Prérequis
- [Docker](https://www.testcontainers.org/supported_docker_environment/)
- Un Framework de test ([JUnit5](https://junit.org/junit5/))

#### Code
Dans les dépendances de tests du projet, ajouter :
```
<dependency>
	<groupId>org.testcontainers</groupId>
	<artifactId>testcontainers</artifactId>
	<version>1.12.3</version>
	<scope>test</scope>
</dependency>
<dependency>
	<groupId>org.testcontainers</groupId>
	<artifactId>junit-jupiter</artifactId>
	<version>1.12.3</version>
	<scope>test</scope>
</dependency>
<dependency>
	<groupId>org.testcontainers</groupId>
	<artifactId>postgresql</artifactId>
	<version>1.12.3</version>
	<scope>test</scope>
</dependency>
```

Exemple de test :
```
@Testcontainers
public class FlywayDbMigrationsTest {

	@Container
	private PostgreSQLContainer<?> postgreSQLContainer = new PostgreSQLContainer<>("postgres:12-alpine")
			.withDatabaseName("myproject");

	@Test
	@Order(1)
	public void databaseShouldRun() {
		assertTrue(postgreSQLContainer.isRunning());
	}

	@Test
	@Order(2)
	public void migrationsShouldBeDone() {
		Flyway flyway = Flyway.configure().dataSource(
                        postgreSQLContainer.getJdbcUrl(),
                        postgreSQLContainer.getUsername(), 
			postgreSQLContainer.getPassword()).load();
		int result = 0;
		try {
			result = flyway.migrate();
			assertTrue(result > 0);
		} catch (FlywayException fee) {
			fail("Error(s) in Flyway Migrations !");
		}

	}

}
```
