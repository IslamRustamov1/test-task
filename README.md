# Backend

To run backend part of the project go to *backend* folder and create **docker-compose.yml** with this content:
```
redis:
  image: redis
  ports:
    - "6379:6379"
stream:
  image: segment/fake-event-stream
  environment:
    - REDIS_HOST=redis
    - REDIS_PORT=6379
    - REDIS_CHANNEL=events
    - EVENTS_PER_SECOND=10
  links:
    - redis

```
After that run:
```
npm
npm start
```
To run tests:
```
npm test
```

# Frontend

To run react app go to *frontend* folder and create **.env** file with this content:
```
REACT_APP_BASE_URL=ws://localhost:3000/
```
After that  run:
```
yarn
yarn start
```
To run tests:
```
yarn test
```
