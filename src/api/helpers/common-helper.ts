/** Generate random latitude and longitude
 */
export function generateRandomLatLng() {
    const from = -180;
    const to = 180;
    const fixed = 3;
    return [
        parseFloat((Math.random() * (to - from) + from).toFixed(fixed)),
        parseFloat((Math.random() * (to - from) + from).toFixed(fixed)),
    ];
}
