import driverBusiness from './driver.business';

/**
 * Unit tests for startMotion method
 */
describe('startMotions', () => {
    it('should throw error in case of proper socket instance is null', () => {
        const output = 'Socket is not supplied';
        try {
            driverBusiness.startMotions(null);
        } catch (error) {
            expect(error).toEqual(output);
        }
    });

    it('should call set-timeout method on valid inputs', () => {
        jest.useFakeTimers();
        driverBusiness.startMotions({
            emit: function () {
                console.log('niraj');
            },
        });
        expect(setInterval).toHaveBeenCalled();
    });
});

/**
 * Unit tests for get method
 */
describe('get', () => {
    it('should return valid driver location in array of length 1 with valid driver id', () => {
        const output = driverBusiness.get(1);
        expect(Array.isArray(output)).toBe(true);
        expect(output.length).toBe(1);
        expect(output[0].name).toEqual('Driver 1');
        expect(Array.isArray(output[0].latlng)).toBe(true);
    });

    it('should return empty array on invalid driver id', () => {
        const output = driverBusiness.get(1000);
        expect(Array.isArray(output)).toBe(true);
        expect(output.length).toBe(0);
    });

    it('should return all the driver information if no driver id is passed', () => {
        const output = driverBusiness.get();
        expect(Array.isArray(output)).toBe(true);
        expect(output.length).toBeGreaterThan(1);
        expect(output[1].name).toEqual('Driver 2');
        expect(Array.isArray(output[2].latlng)).toBe(true);
        expect(output[3].id).toEqual(4);
    });

    it('should return all the driver information if null driver id is passed', () => {
        const output = driverBusiness.get(null);
        expect(Array.isArray(output)).toBe(true);
        expect(output.length).toBeGreaterThan(1);
        expect(output[1].name).toEqual('Driver 2');
        expect(Array.isArray(output[2].latlng)).toBe(true);
        expect(output[3].id).toEqual(4);
    });

    it('should throw error in case of invalid data/file path', () => {
        const spy = jest.spyOn(process, 'cwd');
        spy.mockReturnValue('random');
        try {
            driverBusiness.get();
        } catch (error) {
            expect(error).toEqual('file with data does not exist');
        }
    });
});
