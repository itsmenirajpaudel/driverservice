# driver-service

A service built to update the location of the driver and fetch the driver information

## Available endpoints

-   POST /v1/start-motion
    -   API to initiate the motion for particular driver
    -   The driver id must be provided in the body
    -   Once the api is triggered, the web-socket will start and it will update location of driver every 5 seconds
    -   As a data source, currently a dummy JSON file is used (which holds 4 Drivers Info)
    -   Input Json

```json
{
    "driver_id": 1
}
```

-   Json response

```json
{
    "success": true,
    "message": "Motion of the driver 1 is started..."
}
```

-   GET /v1/driver/:driverid
    -   API to get driver information (id, name, current location (lat,lngs))
        For e.g. /v1/driver/1
    -   Json response

```json
{
    "success": true,
    "payload": [{ "id": 1, "name": "Driver 1", "latlng": [124.992, 168.19] }]
}
```

-   GET /v1/drivers [should be triggered by admin]
    -   API to get all the driver informations
        For e.g. /v1/drivers
    -   Json response

```json
{
    "success": true,
    "payload": [
        { "id": 1, "name": "Driver 1", "latlng": [124.992, 168.19] },
        { "id": 2, "name": "Driver 2", "latlng": [80.992, 168.19] }
    ]
}
```

## Project Structure

```
  driver-service
    ├── ...
    └── dist                        # output build folder
    └── src                         # src folder for project
        ├── app.ts                  # main app file, express intialization, router, and everything
        ├── server.ts               # server file, it initiates & starts the nodejs server
        ├── settings.ts             # export the config in TS variable from .env file
        ├── api
            ├── controller          # controller file
            ├── data                # contains driver json file (our data source for demo)
            ├── business            # manipulate inputs and results if needed
            ├── helpers             # helper functions which can be used through out the application
            └── routes              # supporting routing
                └── v1              # version 1 of routing
    └── ...
```

## Setting up Project using docker

1. Create .env file (mention port otherwise it will be 8085)
2. Run
   `docker-compose up`

3. Once the project is up and running the

-   service will be accessible at http://localhost:8085

## Setting up Project without using docker

1. npm install
2. npm run dev (for development build)

### Building the project

`npm run build`

### Running the Unit test

`npm run test`

### Running the lints

`npm run lint:fix`

### Running the Unit test with Coverage

`npm run test:coverage`
