# Backend

To run backend part of the project go to *backend* folder run:
```
docker-compose up
npm i
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

### Note
You can use **yarn** or **npm** whatever suits you better
