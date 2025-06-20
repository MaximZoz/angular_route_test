import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RouteTableComponent } from './src/app/components/route-table/route-table.component';

const routes: Routes = [
  { path: '', component: RouteTableComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
