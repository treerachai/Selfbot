class Command {
    constructor(self, {name, aliases}) {
        this.self = self;

        this.name = name || "NULL";

        this.aliases = aliases || new Array();
    }
}

module.exports = Command;
