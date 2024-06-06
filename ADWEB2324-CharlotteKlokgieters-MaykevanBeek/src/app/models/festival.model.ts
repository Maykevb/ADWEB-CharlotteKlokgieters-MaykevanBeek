export class Festival {
    id: string;
    name: string;
    date: string;
    location: string;

    constructor(id: string, name: string, date: string, location: string) {
        this.id = id;
        this.name = name;
        this.date = date;
        this.location = location;
    }
}
