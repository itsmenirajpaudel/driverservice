/**
 * External dependencies
 */
import morgan from 'morgan';
import express from 'express';
import * as bodyParser from 'body-parser';
import process from 'process';
/**
 * Internal dependencies: routes
 */
import v1Routes from './api/routes/v1';

/**
 * Create the application
 */
const app: express.Application = express();

/**
 * Add middlewares
 */
app.use(morgan('dev'));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }));

/**
 * Setup CORS
 */
app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'POST');
        return res.status(200).json({});
    }
    next();
});

/**
 * Setup routes with version control
 */
app.use('/v1', v1Routes);

/**
 * If no version is specified in the request url, latest version will be used
 */
app.use('/', v1Routes);

process.on('SIGINT', function onSigint() {
    process.exit();
});

process.on('SIGTERM', function onSigterm() {
    process.exit();
});

export default app;
