import { PersistenceHandler } from 'src/infrastructure/persistence/persistence';
export declare class UsersService {
    private persistence;
    users: any[];
    constructor(persistence: PersistenceHandler);
    findOne(email: string): any;
    addUser(email: string, password: string): string;
}
