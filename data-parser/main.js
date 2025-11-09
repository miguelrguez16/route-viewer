"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// read all files from gpx-files directory
var fs = require("fs");
var path = require("path");
// eslint-disable-next-line @typescript-eslint/no-require-imports
var gpxParser = require('gpxparser');
var gpxToGeoJSON = function () {
    fs.readdir(path.join(__dirname, 'gpx-files'), function (err, files) {
        if (err) {
            console.error('Error reading directory:', err);
            return;
        }
        files.forEach(function (file) {
            var filePath = path.join(__dirname, 'gpx-files', file); // Construct the full path
            var fileName = path.basename(filePath);
            console.log('File:', fileName);
            var gpx = new gpxParser(); //Create gpxParser Object
            gpx.parse(fs.readFileSync(filePath, 'utf8')); //Parse the GPX file
            var geoJSON = gpx.toGeoJSON();
            // save the geoJSON to a file
            var geoJSONFilePath = path.join(__dirname, 'json-files', fileName.replace(".gpx", ".json"));
            fs.writeFileSync(geoJSONFilePath, JSON.stringify(geoJSON, null, 2));
            console.log('GeoJSON saved to:', geoJSONFilePath);
        });
    });
};
var generateUniqueJson = function () {
    // check if unique.json already exists
    var endFile = path.join(__dirname, 'json-files', 'unique.json');
    if (fs.existsSync(endFile)) {
        console.log('unique.json already exists. Removing.');
        fs.unlinkSync(endFile);
    }
    var basePath = path.join(__dirname, 'json-files');
    var files = fs.readdirSync(basePath);
    var uniqueJson = { totalRoutes: files.length, routes: [] };
    files.forEach(function (file) {
        var filePath = path.join(basePath, file);
        var data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        var coordinates = data.features[0].geometry.coordinates;
        var fileName = path.basename(filePath);
        console.log('File:', fileName);
        var routeName = file.replace('.json', '').split('-').join(' ');
        console.log('Route Name:', routeName);
        var route = {
            name: routeName,
            coordinates: coordinates.map(function (coord) { return ({
                lat: coord[1],
                lng: coord[0],
                alt: coord[2] || 0
            }); }),
            topAltitude: Math.max.apply(Math, coordinates.map(function (coord) { return coord[2] || 0; })),
            bottomAltitude: Math.min.apply(Math, coordinates.map(function (coord) { return coord[2] || 0; })),
        };
        uniqueJson.routes.push(route);
    });
    // save the uniqueJson to a file
    var uniqueJsonFilePath = path.join(__dirname, 'json-files', 'unique.json');
    fs.writeFileSync(uniqueJsonFilePath, JSON.stringify(uniqueJson, null, 2));
    console.log('Unique JSON saved to:', uniqueJsonFilePath);
};
var main = function () {
    gpxToGeoJSON();
    Promise.resolve(function () { return setTimeout(function () {
        console.log('Generating unique.json...');
    }, 2000); }).then(generateUniqueJson);
};
main();
