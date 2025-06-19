import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'route-table', pathMatch: 'full' },
  { path: 'route-table', loadComponent: () => import('./route-table/route-table.component').then(m => m.RouteTableComponent) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
