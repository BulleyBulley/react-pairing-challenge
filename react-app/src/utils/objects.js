export class Feature {
    constructor(name, description, userId) {
        this.name = name;
        this.description = description;
        this.id = "";
        this.userId = userId;
        this.votes = [];
    }
}