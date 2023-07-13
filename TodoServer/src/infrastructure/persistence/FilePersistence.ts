import * as fs from 'fs';

export class FilePersistence {


    filepath: any;

    constructor(filepath) {
        this.filepath = filepath;
    }


    loadTodoData() : any[] {

        try {
            const fileData = fs.readFileSync(this.filepath, 'utf8');
            if (fileData.trim() === '') {
                return [];
            }
            return JSON.parse(fileData);
        } catch (error) {
            console.error('Error loading data from ' + this.filepath);
        }
    }

    saveTodoData(Data:any) {
        try {
            const fileData = JSON.stringify(Data);
            fs.writeFileSync(this.filepath, fileData, 'utf8');
        } catch (error) {
            console.error('Error saving data to' + this.filepath);
        }
    }
}