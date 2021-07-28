import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AddonService } from './addon.service';

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

  async saveToDo(obj) {
   return await this.addonService.papiClient.addons.api.uuid(this.addonService.addonUUID).file('api').func('todos').post(undefined, obj);
  }

  async deleteToDos(objs) {
    let objectsToDelete = objs.map(obj => {
      obj.Hidden = true;
      return obj;
    })
    return this.addonService.papiClient.addons.api.uuid(this.addonService.addonUUID).file('api').func('update_todos').post(undefined, objectsToDelete);
  }

  async markToDosAsDone(objs) {
    let objectsToMarkAsDone = objs.map(obj => {
      obj.Completed = true;
      return obj;
    })
    return this.addonService.papiClient.addons.api.uuid(this.addonService.addonUUID).file('api').func('update_todos').post(undefined, objectsToMarkAsDone);
  }
}
