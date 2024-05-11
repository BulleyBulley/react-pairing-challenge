export class Feature {
    constructor(name, description, userId) {
        this.name = name;
        this.description = description;
        this.id = "";
        this.userId = userId;
        this.votes = [];
    }
}

export class User {
    constructor(name) {
        this.name = name;
        this.userId = "";
    }
}