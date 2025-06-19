import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { RouteTableService } from '../services/route-table.service';
import { DISPLAYED_COLUMNS } from '../data/displayed-columns';

interface Route {
  uuid: string;
  address: string;
  mask: string;
  gateway: string;
  interface: string;
}

@Component({
  selector: 'app-route-table',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule, MatSortModule],
  templateUrl: './route-table.component.html',
  styleUrls: ['./route-table.component.scss'],
})
export class RouteTableComponent implements OnInit, AfterViewInit {
  displayedColumns = DISPLAYED_COLUMNS;
  dataSource: MatTableDataSource<Route>;

  @ViewChild(MatSort) sort!: MatSort;

  constructor(private routeTableService: RouteTableService) {
    this.dataSource = this.routeTableService.getDataSource();
  }

  ngOnInit() {
    this.dataSource.sortingDataAccessor = (item, property) => {
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

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  private ipToNumber(ip: string): number {
    if (!ip || !this.isValidIp(ip)) return 0;
    const [octet1, octet2, octet3, octet4] = ip.split('.').map(Number);

    // Преобразуем IP-адрес в 32-битное число
    return (octet1 << 24) + (octet2 << 16) + (octet3 << 8) + octet4;
  }

  private isValidIp(ip: string): boolean {
    const ipRegex =
      /^(25[0-5]|2[0-4][0-9]|[0-1]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[0-1]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[0-1]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[0-1]?[0-9][0-9]?)$/;
    return ipRegex.test(ip);
  }

  applyFilter(filterValue: string): void {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getRouteField(route: Route, field: string): string {
    if (field === 'interface') {
      return this.getInterfaceDisplayValue(route[field]);
    }
    return route[field as keyof Route];
  }

  getInterfaceDisplayValue(interfaceKey: string): string {
    const interfaceMapping: { [key: string]: string } = {
      internet: 'Подключение интернет',
      guest: 'Гостевая сеть',
      home: 'Домашняя сеть',
    };
    return interfaceMapping[interfaceKey] || interfaceKey;
  }

  getFieldLabel(field: string): string {
    const labels: { [key: string]: string } = {
      uuid: 'UUID',
      address: 'Адрес назначения',
      mask: 'Маска',
      gateway: 'Шлюз',
      interface: 'Интерфейс',
    };
    return labels[field] || field;
  }
}
