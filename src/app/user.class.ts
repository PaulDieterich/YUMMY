import {Entity} from '../entity.class';

export class User implements Entity {

    public id: number;
    public name: string;
    public role: string;
    public password: string;
    constructor() {
        this.id = -1;
        this.name = '';
        this.role = '';
        this.password = '';
    }
    getId(): number {
        return this.id;
        throw new Error('Method not implemented.');
    }

}