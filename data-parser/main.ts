

// read all files from gpx-files directory
import * as fs from 'fs';
import * as  path from 'path';
// eslint-disable-next-line @typescript-eslint/no-require-imports
const gpxParser = require('gpxparser');
const gpxToGeoJSON = () => {
    fs.readdir(path.join(__dirname, 'gpx-files'), (err, files) => {
        if (err) {
            console.error('Error reading directory:', err);
            return;
        }

        files.forEach((file) => {
            const filePath = path.join(__dirname, 'gpx-files', file); // Construct the full path
            const fileName = path.basename(filePath);
            console.log('File:', fileName);
            const gpx = new gpxParser(); //Create gpxParser Object
            gpx.parse(fs.readFileSync(filePath, 'utf8')); //Parse the GPX file

            const geoJSON = gpx.toGeoJSON();
            // save the geoJSON to a file
            const geoJSONFilePath = path.join(__dirname, 'json-files', fileName.replace(".gpx", ".json"));
            fs.writeFileSync(geoJSONFilePath, JSON.stringify(geoJSON, null, 2));

            console.log('GeoJSON saved to:', geoJSONFilePath);


        });
    });

}


const generateUniqueJson = () => {

    // check if unique.json already exists
    const endFile = path.join(__dirname, 'json-files', 'unique.json');
    if (fs.existsSync(endFile)) {
        console.log('unique.json already exists. Removing.');
        fs.unlinkSync(endFile);
    }


    const basePath = path.join(__dirname, 'json-files');
    const files = fs.readdirSync(basePath);


    const uniqueJson = { totalRoutes: files.length, routes: [] };


    files.forEach((file) => {
        const filePath = path.join(basePath, file);
        const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        const coordinates = data.features[0].geometry.coordinates;

        const fileName = path.basename(filePath);
        console.log('File:', fileName);

        const routeName = file.replace('.json', '').split('-').join(' ');
        console.log('Route Name:', routeName);
        const route = {
            name: routeName,
            coordinates: coordinates.map((coord: number[]) => ({
                lat: coord[1],
                lng: coord[0],
                alt: coord[2] || 0
            })),
            topAltitude: Math.max(...coordinates.map((coord: number[]) => coord[2] || 0)),
            bottomAltitude: Math.min(...coordinates.map((coord: number[]) => coord[2] || 0)),
        };
        uniqueJson.routes.push(route);
    });

    // save the uniqueJson to a file
    const uniqueJsonFilePath = path.join(__dirname, 'json-files', 'unique.json');
    fs.writeFileSync(uniqueJsonFilePath, JSON.stringify(uniqueJson, null, 2));
    console.log('Unique JSON saved to:', uniqueJsonFilePath);

}


const main = () => {

//gpxToGeoJSON();
    generateUniqueJson(); 
}

main();