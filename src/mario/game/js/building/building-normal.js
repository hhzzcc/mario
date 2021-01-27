import { Building } from './building.js';

export class BuildingNormal extends Building {
    constructor(options) {
        super(options);
        this.type = 'building-Normal';
    }
}