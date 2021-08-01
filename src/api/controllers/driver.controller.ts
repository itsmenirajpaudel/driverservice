/**
 * External dependencies
 */
import { Request, Response } from 'express';

/**
 * Internal dependencies
 */
import driverBusiness from '../business/driver.business';
import logger from '../helpers/logger-helper';

/**
 * Controller for Drivers
 */
class DriverController {
  
    /**
     * Start motions for all drivers
     * @param req:Request
     * @param res:Response
     */
    async startMotions(req: Request, res: Response): Promise<any> {
        try {
            const socket = req.app.get('io');
            if (!socket) throw 'socket is not set';
            driverBusiness.startMotions(socket);
            res.send({ success: true, message: `Motion of the drivers has started...` });
        } catch (error) {
            const status = 500;
            const returnVal = { success: false, error: error, status };
            logger.error(JSON.stringify(returnVal) + '\n');
            return res.status(status).json(returnVal);
        }
    }

    /**
     * Get Driver Information(location)
     * @param req: Request
     * @param res: Response
     */
    async get(req: Request, res: Response): Promise<any> {
        try {
            const { params } = req;
            let driverId = null;
            if (params.driverid) {
                driverId = parseInt(params.driverid + '', 10);
            }
            const driverInfo = driverBusiness.get(driverId);
            res.send({ success: true, payload: driverInfo });
        } catch (error) {
            const status = 500;
            const returnVal = { success: false, error: error, status };
            logger.error(JSON.stringify(returnVal) + '\n');
            return res.status(status).json(returnVal);
        }
    }
}

export default new DriverController();
