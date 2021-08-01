/**
 * External dependencies
 */
import * as express from 'express';

/**
 * Internal dependencies
 */
import driverController from '../../controllers/driver.controller';

const router: express.Router = express.Router();

router.get('/service/health', (_req: express.Request, res: express.Response) => {
    res.json({ status: 'healthy' });
});

/** we could use middlewares to check if request is authentic or not (user logged in or admin)
 * For demo, it is not used
 **/

router.post('/start-motions', driverController.startMotions); //trigger continuous motion all drivers

router.get('/driver/:driverid', driverController.get); //driver with id
router.get('/drivers', driverController.get); //all drivers records

export default router;
