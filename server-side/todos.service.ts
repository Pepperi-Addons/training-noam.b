import { PapiClient, InstalledAddon } from '@pepperi-addons/papi-sdk'
import { Client } from '@pepperi-addons/debug-server';
import { v4 as uuid } from 'uuid';

const TABLE_NAME = 'Todos';

export class MyService {

    papiClient: PapiClient;
    addonUUID: string;

    private client: Client;

    constructor(client: Client) {
        this.client = client;
        this.papiClient = new PapiClient({
            baseURL: client.BaseURL, 
            token: client.OAuthAccessToken,
            addonUUID: client.AddonUUID,
            addonSecretKey: client.AddonSecretKey,
            actionUUID: client["ActionUUID"]
        });

        this.addonUUID = client.AddonUUID;
    }

    upsertTodo(body) {
        if(body.Key) {
            this.editTodo(body);
        }
        else {
            this.createTodo(body);
        }
    }

    getTodos(options) {
        return this.papiClient.addons.data.uuid(this.addonUUID).table(TABLE_NAME).find(options);
    }

    createTodo(body) {
        //Verifies that the body contains only the expected field
        const expectedFields = ['Name','Description','DueDate','Completed'];
         if (!this.isArrayContainsElements(expectedFields, Object.keys(body))) {
            throw new Error(`Unexpcted field`);
         }

        //validate that all the required fields exist
        if(body.Name && body.Description) {
            body.Key = uuid();
            return this.papiClient.addons.data.uuid(this.addonUUID).table(TABLE_NAME).upsert(body);
        }        
        else {
            throw new Error(`Name and Description are required`);
        }
    }

    isArrayContainsElements(array: String[], elements: String[]) {
        return elements.every(v => array.includes(v));
    }

    deleteTodo(body) {
        return this.editTodo(body);
    }

    editTodo(body) {
        if (body.Key) {
            return this.papiClient.addons.data.uuid(this.addonUUID).table(TABLE_NAME).upsert(body)
        }
    }

    getAddons(): Promise<InstalledAddon[]> {
        return this.papiClient.addons.installedAddons.find({});
    }
}

export default MyService;