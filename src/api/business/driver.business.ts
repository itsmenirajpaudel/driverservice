/** External Dependency */
import fs from 'fs';

/**Internal Depedency */
import { generateRandomLatLng } from '../helpers/common-helper';

interface IDriver {
    id: number;
    name: string;
    latlng: Array<number>;
}

/**
 * Business Class for Location service
 * [We are using a JSON file for data storage]
 */
class DriverBusiness {
    /**
     * Start the motions
     * @params {any} socket
     */
    startMotions(socket: any): void {
        const filePath = process.cwd() + '/src/api/data/drivers.json';
        if (!fs.existsSync(filePath)) throw 'file with data does not exist';
        const drivers = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        if (!socket || !socket.emit) throw 'Socket is not supplied';

        global['socketInterval'] = setInterval(function () {
            for (const index in drivers) {
                drivers[index].latlng = generateRandomLatLng();
                fs.writeFileSync(process.cwd() + '/src/api/data/drivers.json', JSON.stringify(drivers));
                socket.emit('driver_' + drivers[index].id, JSON.stringify(drivers[index]));
            }
        }, 5000);
    }

    /**
     * Get Driver/s Information (latlngs)
     * [Note, it could have been an async operation as well]
     * @param driver_id {number | null}
     */
    get(driver_id: number = null): Array<IDriver> {
        let results = [];
        const filePath = process.cwd() + '/src/api/data/drivers.json';
        if (!fs.existsSync(filePath)) throw 'file with data does not exist';
        const drivers = JSON.parse(fs.readFileSync(filePath, 'utf8'));

        if (driver_id) {
            results = drivers.filter((d: { id: number }) => d.id === driver_id);
        } else {
            results = drivers;
        }
        return results;
    }
}

export default new DriverBusiness();
