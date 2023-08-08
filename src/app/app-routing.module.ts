import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReservaFormComponent } from './components/reserva-form/reserva-form.component';
import { CardListReservasComponent } from './components/card-list-reservas/card-list-reservas.component';
import { EditReservaComponent } from './components/edit-reserva/edit-reserva.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  {path: "", component: HomeComponent},
  {path: "reserva/new", component: ReservaFormComponent},
  {path: "reserva/list", component: CardListReservasComponent},
  {path: "reserva/edit/:id", component: EditReservaComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
