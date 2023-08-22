import {Component, OnDestroy, OnInit} from '@angular/core';
import {DataStorageService} from "../shared/data-storage.service";
import {AuthService} from "../auth/auth.service";
import {map, Subscription} from "rxjs";
import {Store} from "@ngrx/store";

import * as fromApp from "../store/app.reducer";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy{

  subscription: Subscription;
  isAuthenticated = false;
  constructor(private storageService: DataStorageService,
              private authService: AuthService,
              private store:Store<fromApp.AppState>) {
  }
  ngOnInit() {
    this.subscription= this.store.select('auth').pipe(map(authData => authData.user)).subscribe(user =>{
      this.isAuthenticated = !!user;
    });
  }

  onSaveData(){
    this.storageService.storeRecipes();
  }
  onFetchData(){
    this.storageService.fetchRecipes().subscribe();
  }
  onLogout(){
    this.authService.logout();
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
