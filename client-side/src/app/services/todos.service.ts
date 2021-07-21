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
    let objsToDelete = {
      'objs': objs
    };
   return this.addonService.papiClient.addons.api.uuid(this.addonService.addonUUID).file('api').func('deleteTodos').post(undefined,objsToDelete);
  }

  async markToDosAsDone(objs) {
    let objsToMark = {
      'objs': objs
    };
   return this.addonService.papiClient.addons.api.uuid(this.addonService.addonUUID).file('api').func('markTodosAsDone').post(undefined,objsToMark);
  }
}
