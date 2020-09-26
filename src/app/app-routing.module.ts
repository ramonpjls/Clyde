import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MapaComponent } from './components/mapa/mapa.component';
import { MenuComponent } from './components/menu/menu.component';


const routes: Routes = [
  { 
    path: 'Map', 
    component : MapaComponent,
  },
  { 
    path: 'menu', 
    component : MenuComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule,
            
  ]
})
export class AppRoutingModule { }
