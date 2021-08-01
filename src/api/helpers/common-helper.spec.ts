import { generateRandomLatLng } from './common-helper';

/**
 * Unit tests for generateRandomLatLng method
 */
describe('generateRandomLatLng', () => {
    it('should generate array of latitude and longitude', () => {
        const output = generateRandomLatLng();
        expect(Array.isArray(output)).toBe(true);
        expect(output.length).toBe(2);
    });

    it('should contain latitude and longitude numbers', () => {
        const output = generateRandomLatLng();
        expect(typeof output[0]).toBe('number');
        expect(typeof output[1]).toBe('number');
    });

    it('should containt latitude and longitude in between -180 and 180 degrees', () => {
        const output = generateRandomLatLng();
        expect(output[0] >= -180 && output[0] <= -180).toBeTruthy;
        expect(output[1] >= -180 && output[1] <= -180).toBeTruthy;
    });

    it('should contain latitude and longitude to have up to 3 decimals', () => {
        const output = generateRandomLatLng();
        const latitudeString = output[0].toString();
        const longitudeString = output[1].toString();
        expect(
            latitudeString.toString().split('.')[1] ? latitudeString.toString().split('.')[1].length : 0,
        ).toBeLessThanOrEqual(3);
        expect(
            longitudeString.toString().split('.')[1] ? longitudeString.toString().split('.')[1].length : 0,
        ).toBeLessThanOrEqual(3);
    });
});
