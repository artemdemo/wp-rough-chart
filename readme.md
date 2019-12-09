# wp-rough-chart

## Docker

I'm using docker for development environment.

### Start

Run following commands in project directory:

```
docker-compose up -d
```

Import database

```
docker exec -i $(docker ps | grep mysql | egrep -o '^[a-z0-9]+') mysql -uroot -pp4ssw0rd! wordpress < backup/localhost.sql
```

Now website is available at http://localhost:8080/

### Stop

Stop everything

```
docker-compose down
```