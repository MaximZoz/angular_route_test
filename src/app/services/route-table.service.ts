import { Injectable } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Route } from '../models/route.model';
import { MOCK_ROUTES } from '../data/mock-routes';

@Injectable({
  providedIn: 'root',
})
export class RouteTableService {
  private routes = MOCK_ROUTES;

  getDataSource(): MatTableDataSource<Route> {
    return new MatTableDataSource(this.routes);
  }
}
