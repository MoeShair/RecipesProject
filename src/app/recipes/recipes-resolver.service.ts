import { Injectable } from '@angular/core';
import {DataStorageService} from "../shared/data-storage.service";
@Injectable({
  providedIn: 'root'
})
export class RecipesResolverService{

  constructor(private dataStorageService: DataStorageService) {


  }


}
