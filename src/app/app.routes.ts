import { Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { SecretPageComponent } from './pages/secret-page/secret-page.component';

export const routes: Routes = [
    {
        path:"",
        component:HomePageComponent
    },
    {
        path: ':uuid',
        component:SecretPageComponent
    }
];
