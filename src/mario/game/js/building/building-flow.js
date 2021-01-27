import { Building } from './building.js';

export class BuildingFlow extends Building {
    constructor(options) {
        super(options);
        this.frameDelay = 0.05;
        this.type = 'building-Flow';
    }
}