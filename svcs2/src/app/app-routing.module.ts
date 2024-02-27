import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { UserComponent } from "./user/user.component";
import { NgModule } from "@angular/core";

const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'user/:id', component: UserComponent}
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule {
    
}
