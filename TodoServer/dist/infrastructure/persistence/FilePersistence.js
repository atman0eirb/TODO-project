"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilePersistence = void 0;
const fs = require("fs");
class FilePersistence {
    constructor(filepath) {
        this.filepath = filepath;
    }
    loadTodoData() {
        try {
            const fileData = fs.readFileSync(this.filepath, 'utf8');
            if (fileData.trim() === '') {
                return [];
            }
            return JSON.parse(fileData);
        }
        catch (error) {
            console.error('Error loading data from ' + this.filepath);
        }
    }
    saveTodoData(Data) {
        try {
            const fileData = JSON.stringify(Data);
            fs.writeFileSync(this.filepath, fileData, 'utf8');
        }
        catch (error) {
            console.error('Error saving data to' + this.filepath);
        }
    }
}
exports.FilePersistence = FilePersistence;
//# sourceMappingURL=FilePersistence.js.map