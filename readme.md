# wp-rough-chart

## Docker

I'm using docker for development environment.

### Start

Run images:

```
docker-compose up
```

You can import DB if you need to:

```
docker exec -i $(docker ps | grep mysql | egrep -o '^[a-z0-9]+') mysql -uroot -pp4ssw0rd! wordpress < backup/localhost.sql
```

Now website is available at http://localhost:80/

### Stop

Stop everything

```
docker-compose down
```
