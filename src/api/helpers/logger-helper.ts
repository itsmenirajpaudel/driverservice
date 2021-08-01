/**
 * Logger object which contains actions which output logs into stdout
 */
export default {
    /**
     * Output error message into stdout
     * @param message: string
     */
    error(message: string): void {
        if (!message) throw 'null/empty message on the logger function';
        if (typeof message !== 'string') message = message + '';
        process.stderr.write(message);
    },
    /**
     * Output info message into stdout
     * @param message: string
     */
    info(message: string): void {
        if (!message) throw 'null/empty message on the logger function';
        if (typeof message !== 'string') message = message + '';
        process.stdout.write(message);
    },
};
