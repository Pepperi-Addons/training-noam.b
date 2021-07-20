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

  deleteToDos(objs) {
    if (objs && objs.length >= 1) {
      objs.forEach(obj => {
        obj.hidden = true;
        this.addonService.papiClient.addons.api.uuid(this.addonService.addonUUID).file('api').func('todos').post(undefined,obj);;
      });
    }
  }
}
