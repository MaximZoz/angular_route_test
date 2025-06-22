import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouteTableComponent } from './route-table.component';
import { RouteTableService } from '../../services/route-table.service';
import { of } from 'rxjs';
import { MatSort } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MOCK_ROUTES } from '../../data/mock-routes';

describe('RouteTableComponent', () => {
  let component: RouteTableComponent;
  let fixture: ComponentFixture<RouteTableComponent>;
  let routeTableServiceSpy: jasmine.SpyObj<RouteTableService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj<RouteTableService>('RouteTableService', [
      'getRoutes',
    ]);

    await TestBed.configureTestingModule({
      imports: [RouteTableComponent, MatTableModule],
      providers: [{ provide: RouteTableService, useValue: spy }],
    }).compileComponents();

    fixture = TestBed.createComponent(RouteTableComponent);
    component = fixture.componentInstance;
    routeTableServiceSpy = TestBed.inject(
      RouteTableService
    ) as jasmine.SpyObj<RouteTableService>;

    routeTableServiceSpy.getRoutes.and.returnValue(of(MOCK_ROUTES));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with routes from RouteTableService', () => {
    expect(routeTableServiceSpy.getRoutes).toHaveBeenCalled();
    expect(component.routes()).toEqual(MOCK_ROUTES);
  });

  it('should sort routes correctly', () => {
    component.currentSortField.set('address');
    component.sortDirection.set('asc');
    component.sortCards(); // Теперь метод доступен
    const sortedRoutes = [...MOCK_ROUTES].sort((a, b) =>
      a.address.localeCompare(b.address)
    );
    expect(component.sortedRoutes()).toEqual(sortedRoutes);
  });

  it('should toggle sort direction', () => {
    component.sortDirection.set('asc');
    component.toggleSortDirection();
    expect(component.sortDirection()).toBe('desc');
    component.toggleSortDirection();
    expect(component.sortDirection()).toBe('asc');
  });

  it('should filter routes correctly', () => {
    component.applyFilter('192');
    expect(component.dataSource().filter).toBe('192');
  });

  it('should handle MatSort correctly', () => {
    const matSort = TestBed.inject(MatSort);
    component.sort = matSort;
    component.ngAfterViewChecked();
    expect(component.dataSource().sort).toBe(matSort);
  });
});
