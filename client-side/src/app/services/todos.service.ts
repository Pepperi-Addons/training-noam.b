import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import{ AddonService } from './addon.service';

@Injectable({
  providedIn: 'root'
})
export class TodosService {

  constructor(private addonService: AddonService) { 
    
  }

  get(options) {
    return this.addonService.papiClient.addons.api.uuid(this.addonService.addonUUID).file('api').func('todos').get(options);
  }

  getTodos() {
    return this.get({});
  }

  getTodo(key) {
    return this.get({
      where: `Key = '${key}'`
    }).then(objs => objs[0]);
  }

  saveToDo(obj) {
    this.addonService.papiClient.addons.api.uuid(this.addonService.addonUUID).file('api').func('todos').post(undefined,obj);
  }

  async deleteToDos(objs) {
    let uuids = objs.map(obj => obj.Key)
    return this.addonService.papiClient.addons.api.uuid(this.addonService.addonUUID).file('api').func('delete_todos').post(undefined,uuids);
  }

async markToDosAsDone(objs) {
  let uuids = objs.map(obj => obj.Key)
  return this.addonService.papiClient.addons.api.uuid(this.addonService.addonUUID).file('api').func('mark_todos_as_done').post(undefined,uuids);
}
}
