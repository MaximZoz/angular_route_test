import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Route } from '../models/route.model';
import { MOCK_ROUTES } from '../data/mock-routes';

@Injectable({
  providedIn: 'root',
})
export class RouteTableService {
  private routesSubject = new BehaviorSubject<Route[]>(MOCK_ROUTES);

  getRoutes(): Observable<Route[]> {
    return this.routesSubject.asObservable();
  }

  updateRoutes(newRoutes: Route[]): void {
    this.routesSubject.next(newRoutes);
  }
}
