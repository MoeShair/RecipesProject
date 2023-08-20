import {NgModule} from "@angular/core";
import {AuthComponent} from "./auth.component";
import {SharedModule} from "../shared/shared.module";
import {HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";

@NgModule({
    declarations:[AuthComponent],
    imports:[
        SharedModule,
        FormsModule,
        RouterModule.forChild([
            {path: 'auth', component:AuthComponent}
        ])
    ]
})
export class AuthModule{

}
