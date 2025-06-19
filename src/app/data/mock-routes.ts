import { Route } from '../models/route.model';

export const MOCK_ROUTES: Route[] = [
  {
    uuid: '1',
    address: '192.168.0.1',
    mask: '255.255.255.0',
    gateway: '192.168.0.254',
    interface: 'internet',
  },
  {
    uuid: '2',
    address: '172.16.0.1',
    mask: '255.255.0.0',
    gateway: '172.16.0.254',
    interface: 'guest',
  },
  {
    uuid: '3',
    address: '10.0.0.1',
    mask: '255.0.0.0',
    gateway: '10.0.0.254',
    interface: 'home',
  },
  {
    uuid: '4',
    address: '192.168.1.1',
    mask: '255.255.255.0',
    gateway: '192.168.1.254',
    interface: 'internet',
  },
  {
    uuid: '5',
    address: '172.16.1.1',
    mask: '255.255.0.0',
    gateway: '172.16.1.254',
    interface: 'guest',
  },
  {
    uuid: '6',
    address: '10.1.0.1',
    mask: '255.0.0.0',
    gateway: '10.1.0.254',
    interface: 'home',
  },
  {
    uuid: '7',
    address: '192.168.2.1',
    mask: '255.255.255.0',
    gateway: '192.168.2.254',
    interface: 'internet',
  },
  {
    uuid: '8',
    address: '172.16.2.1',
    mask: '255.255.0.0',
    gateway: '172.16.2.254',
    interface: 'guest',
  },
  {
    uuid: '9',
    address: '10.2.0.1',
    mask: '255.0.0.0',
    gateway: '10.2.0.254',
    interface: 'home',
  },
];
