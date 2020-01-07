import * as proj from 'proj4';

const projections = {
    "PUWG_2000_5": "+proj=tmerc +lon_0=15 +k_0=0.999923 +x_0=5500000 +ellps=GRS80 +nadgrids=null +units=m +axis=neu +bounds=13.5,49,16.5,54.84",
    "PUWG_2000_6": "+proj=tmerc +lon_0=18 +k_0=0.999923 +x_0=6500000 +ellps=GRS80 +nadgrids=null +units=m +axis=neu +bounds=16.5,49,19.5,54.84",
    "PUWG_2000_7": "+proj=tmerc +lon_0=21 +k_0=0.999923 +x_0=7500000 +ellps=GRS80 +nadgrids=null +units=m +axis=neu +bounds=19.5,49,22.5,54.84",
    "PUWG_2000_8": "+proj=tmerc +lon_0=24 +k_0=0.999923 +x_0=8500000 +ellps=GRS80 +nadgrids=null +units=m +axis=neu +bounds=22.5,49,25.5,54.84",
    "WGS_84": "+title=WGS 84 (long/lat) +proj=longlat +ellps=WGS84 +datum=WGS84 +units=degrees"
};

export default class ProjService {
    constructor() {}

    convert(from: string, to: string, coord: []) {
        return proj(projections[from], projections[to]).forward(coord);
    }
}