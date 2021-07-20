import MyService from './todos.service'
import { Client, Request } from '@pepperi-addons/debug-server'

export async function todos(client: Client, request: Request) {
    const service = new MyService(client);

    if (request.method === 'GET') {
        return service.getTodos(request.query);
    }
    else if (request.method === 'POST') {
        return service.upsertTodo(request.body);
    }
    else {
        throw new Error(`Method ${request.method} not supported`);
        
    }
}