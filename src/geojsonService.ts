import ProjService from './projService';

export default class GeojsonService {
    private projService: ProjService;
    private from: string;
    private to: string;

    constructor() {
        this.projService = new ProjService();
    }

    handle(geojson, query) {
        this.from = query.from;
        this.to = query.to;

        if (geojson.features) {
            for (let f of geojson.features) {
                this.convertGeometry(f.geometry);;
            }
        } else if (geojson.geometry.geometries) {
            for (let f of geojson.geometry.geometries) {
                this.convertGeometry(f);
            }
        } else {
            this.convertGeometry(geojson.geometry);
        }

        return geojson;
    }

    convertGeometry(geometry) {
        switch(geometry.type) {
            case 'Point':
                geometry.coordinates = this.handlePoint(geometry.coordinates);
                break;
            case 'LineString':
                geometry.coordinates = this.handleLine(geometry.coordinates);
                break;
            case 'Polygon':
                geometry.coordinates = this.handlePolygon(geometry.coordinates);
                break;
            case 'MultiPolygon':
                geometry.coordinates = this.handleMultiPolygon(geometry.coordinates);
                break;
            case 'MultiLineString':
                geometry.coordinates = this.handleMultiLine(geometry.coordinates);
                break;
        }
    }

    handlePoint(coordinates: []) {
        return this.projService.convert(this.from, this.to, coordinates)
    }

    handleLine(line: []) {
        return line.map(e => this.handlePoint(e));
    }

    handleMultiLine(line: []) {
        return line.map(e => this.handleLine(e));
    }

    handlePolygon(polygon: []) {
        return polygon.map(e => this.handleLine(e));
    }

    handleMultiPolygon(polygon: []) {
        return polygon.map(e => this.handlePolygon(e));
    }
}