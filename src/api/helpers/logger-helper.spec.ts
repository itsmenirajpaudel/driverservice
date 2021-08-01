import { mockProcessStdout, mockProcessStderr } from 'jest-mock-process';
import logger from './logger-helper';

/**
 * Unit test for logger.error method
 */
describe('logger.error', () => {
    let mockStderr;

    beforeEach(() => {
        mockStderr = mockProcessStderr();
    });

    it('should output correct string error into stdout', async () => {
        const input = 'Error Message';
        logger.error(input);
        expect(mockStderr).toHaveBeenCalledWith('Error Message');
    });

    it('should output correct stringify json into stdout', async () => {
        const input: string = JSON.stringify({ name: 'TestUser' });
        logger.error(input);
        expect(mockStderr).toHaveBeenCalledWith('{"name":"TestUser"}');
    });

    it('should not break the code in case of null input', async () => {
        try {
            logger.error(null);
        } catch (error) {
            expect(error).toBeDefined();
        }
    });

    it('should not break the code in case of empty input', async () => {
        try {
            const input: any = '';
            logger.error(input);
        } catch (error) {
            expect(error).toBeDefined();
        }
    });

    it('should not break the code in case of number as input', async () => {
        const input: any = 10;
        logger.error(input);
        expect(mockStderr).toHaveBeenCalledWith('10');
    });
});

/**
 * Unit test for logger.info method
 */
describe('logger.info', () => {
    let mockStdInfo;

    beforeEach(() => {
        mockStdInfo = mockProcessStdout();
    });

    it('should output correct string error into stdout', async () => {
        const input = 'Info Message';
        logger.info(input);
        expect(mockStdInfo).toHaveBeenCalledWith('Info Message');
    });

    it('should output correct stringify json into stdout', async () => {
        const input: string = JSON.stringify({ info: 'TestInfo' });
        logger.info(input);
        expect(mockStdInfo).toHaveBeenCalledWith('{"info":"TestInfo"}');
    });

    it('should not break the code in case of null input', async () => {
        try {
            logger.info(null);
        } catch (error) {
            expect(error).toBeDefined();
        }
    });

    it('should not break the code in case of empty input', async () => {
        try {
            const input: any = '';
            logger.info(input);
        } catch (error) {
            expect(error).toBeDefined();
        }
    });

    it('should not break the code in case of number as input', async () => {
        const input: any = 10;
        logger.info(input);
        expect(mockStdInfo).toHaveBeenCalledWith('10');
    });
});
