import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";

import { loginRouting } from "./pt-login-routing.module";
import { LoginComponent } from "./pt-login.component";

@NgModule({
    imports: [
        NativeScriptModule,
        NativeScriptFormsModule,
        loginRouting
    ],
    declarations: [
        LoginComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class LoginModule { }