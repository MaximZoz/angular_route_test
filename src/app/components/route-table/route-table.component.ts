import {
  Component,
  OnInit,
  ViewChild,
  AfterViewChecked,
  OnDestroy,
  signal,
  WritableSignal,
  inject,
  Input,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { RouteTableService } from '../../services/route-table.service';
import { DISPLAYED_COLUMNS } from '../../data/displayed-columns';
import { Route } from '../../models/route.model';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MatIconModule } from '@angular/material/icon'; // Импортируем MatIconModule
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout'; // Импортируем BreakpointObserver
import { LocaleService } from '../../services/locale.service';

@Component({
  selector: 'app-route-table',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatSortModule,
    MatIconModule,
  ],
  templateUrl: './route-table.component.html',
  styleUrls: ['./route-table.component.scss'],
})
export class RouteTableComponent
  implements OnInit, AfterViewChecked, OnDestroy
{
  @Input() isPhone!: WritableSignal<boolean>; // Убедимся, что isPhone принимает WritableSignal<boolean>

  displayedColumns = DISPLAYED_COLUMNS;
  dataSource = signal(new MatTableDataSource<Route>([]));
  routes = signal<Route[]>([]);
  sortedRoutes = signal<Route[]>([]);
  currentSortField = signal<string>('address');
  sortDirection = signal<'asc' | 'desc'>('asc'); // Делаем sortDirection сигналом

  private destroy$ = new Subject<void>();

  @ViewChild(MatSort) sort!: MatSort;

  private routeTableService = inject(RouteTableService);
  private breakpointObserver = inject(BreakpointObserver); // Инжектируем BreakpointObserver

  constructor(public localeService: LocaleService) {}

  ngOnInit() {
    // Используем isPhone для управления отображением
    console.log('isPhone:', this.isPhone());

    // Определяем isPhone в зависимости от ширины экрана
    this.breakpointObserver
      .observe([Breakpoints.Handset])
      .pipe(takeUntil(this.destroy$))
      .subscribe((result) => {
        this.isPhone.set(result.matches); // Устанавливаем значение isPhone
      });

    this.routeTableService
      .getRoutes()
      .pipe(takeUntil(this.destroy$))
      .subscribe((routes) => {
        this.routes.set(routes);
        this.dataSource().data = routes;
        this.sortCards(); // Сортируем карточки при загрузке данных
      });

    this.dataSource().sortingDataAccessor = (item, property) => {
      switch (property) {
        case 'address':
        case 'gateway':
          return this.ipToNumber(item[property]);
        case 'interface':
          return item[property]?.toLowerCase();
        default:
          return item[property as keyof Route];
      }
    };
  }

  ngAfterViewChecked() {
    // Повторно привязываем MatSort к таблице
    if (this.sort && this.dataSource().sort !== this.sort) {
      this.dataSource().sort = this.sort;
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onSortChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    this.currentSortField.set(selectElement.value); // Обновляем сигнал
    this.sortCards();
  }

  toggleSortDirection(): void {
    this.sortDirection.set(this.sortDirection() === 'asc' ? 'desc' : 'asc'); // Переключаем направление
    this.sortCards();
  }

  sortCards(): void {
    const field = this.currentSortField();
    const direction = this.sortDirection();
    const sorted = [...this.routes()].sort((a, b) => {
      const valueA =
        field === 'address' || field === 'gateway'
          ? this.ipToNumber(a[field])
          : a[field as keyof Route];
      const valueB =
        field === 'address' || field === 'gateway'
          ? this.ipToNumber(b[field])
          : b[field as keyof Route];
      if (valueA < valueB) return direction === 'asc' ? -1 : 1;
      if (valueA > valueB) return direction === 'asc' ? 1 : -1;
      return 0;
    });
    this.sortedRoutes.set(sorted); // Обновляем сигнал
  }

  private ipToNumber(ip: string): number {
    if (!ip || !this.isValidIp(ip)) return -1;
    const [octet1, octet2, octet3, octet4] = ip.split('.').map(Number);
    return octet1 * 256 ** 3 + octet2 * 256 ** 2 + octet3 * 256 + octet4; // Преобразуем IP в число
  }

  private isValidIp(ip: string): boolean {
    const ipRegex =
      /^(25[0-5]|2[0-4][0-9]|[0-1]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[0-1]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[0-1]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[0-1]?[0-9][0-9]?)$/;
    return ipRegex.test(ip); // Проверяем корректность IP-адреса
  }

  applyFilter(filterValue: string): void {
    this.dataSource().filter = filterValue.trim().toLowerCase();
  }

  getRouteField(route: Route, field: string): string {
    if (field === 'interface') {
      return this.getInterfaceDisplayValue(route[field]);
    }
    return route[field as keyof Route];
  }

  getInterfaceDisplayValue(interfaceKey: string): string {
    const interfaceMapping: { [key: string]: string } = {
      internet: this.localeService.translate('internet'),
      guest: this.localeService.translate('guest'),
      home: this.localeService.translate('home'),
    };
    return interfaceMapping[interfaceKey] || interfaceKey;
  }

  getFieldLabel(field: string): string {
    return this.localeService.translate(field);
  }
}
