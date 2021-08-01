/**
 * Internal Dependency
 */
import driverController from './driver.controller';
import driverBusiness from '../business/driver.business';
import logger from '../helpers/logger-helper';

//mock request
const mockRequest = () => {
    const req: any = {};
    req.body = jest.fn().mockReturnValue(req);
    req.params = jest.fn().mockReturnValue(req);
    req.app = jest.fn().mockReturnValue(req);
    return req;
};

//mock response
const mockResponse = () => {
    const res: any = {};
    res.send = jest.fn().mockReturnValue(res);
    res.status = jest.fn().mockReturnValue(res);
    return res;
};

/**
 * Unit test for driver controller - start motion method
 */
describe('startMotions', () => {
    const req = mockRequest();
    const res = mockResponse();

    it('should throw error if business function throws error', () => {
        req.body = { driver_id: 1 };
        (driverBusiness.startMotions as any) = jest.fn(() => {
            throw 'Oops!!';
        });
        (logger.error as any) = jest.fn();
        driverController.startMotions(req, res);

        expect(res.status).toHaveBeenCalled();
        expect(logger.error).toHaveBeenCalled();
    });

    it('should send success message on valid inputs', () => {
        req.body = { driver_id: 1 };
        req.app.get = function () {
            return 'test';
        };
        (driverBusiness.startMotions as any) = jest.fn(() => {
            return;
        });
        driverController.startMotions(req, res);
        expect(res.send).toHaveBeenCalled();
    });
});

/**
 * Unit test for driver controller - get  method
 */
describe('get', () => {
    const req = mockRequest();
    const res = mockResponse();
    it('should throw error in case of error', () => {
        req.params = {};
        (driverBusiness.get as any) = jest.fn(() => {
            throw 'Oops!!';
        });
        (logger.error as any) = jest.fn();
        driverController.get(req, res);
        expect(res.status).toHaveBeenCalled();
        expect(logger.error).toHaveBeenCalled();
    });

    it('should return all drivers info in case no params', async () => {
        req.params = {};
        const expectedOutput = [
            {
                id: 1,
                name: 'Driver1',
                latlngs: [20.001, 85.002],
            },
            {
                id: 2,
                name: 'Driver2',
                latlngs: [9.003, 70.002],
            },
        ];

        (driverBusiness.get as any) = jest.fn(() => {
            return expectedOutput;
        });
        await driverController.get(req, res);
        expect(res.send).toHaveBeenCalledWith({ success: true, payload: expectedOutput });
    });

    it('should return driver info if particular id is provided', async () => {
        req.params = { driver_id: 1 };
        const expectedOutput = [
            {
                id: 1,
                name: 'Driver1',
                latlngs: [20.001, 85.002],
            },
        ];

        (driverBusiness.get as any) = jest.fn(() => {
            return expectedOutput;
        });
        await driverController.get(req, res);
        expect(res.send).toHaveBeenCalledWith({ success: true, payload: expectedOutput });
    });
});
