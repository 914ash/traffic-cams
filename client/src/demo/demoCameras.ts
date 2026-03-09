import type { Camera } from '../types';

export const demoCameras: Camera[] = [
  {
    id: 'austin-01',
    lat: 30.2672,
    lng: -97.7431,
    name: 'Congress Ave & 6th St',
    direction: 'Northbound',
    source: 'Austin DOT',
    feedUrl: '',
    feedType: 'image',
    lastUpdated: '2026-03-08T19:00:00.000Z',
  },
  {
    id: 'atlanta-01',
    lat: 33.7488,
    lng: -84.3877,
    name: 'Downtown Connector',
    direction: 'Southbound',
    source: 'Georgia DOT',
    feedUrl: '',
    feedType: 'image',
    lastUpdated: '2026-03-08T19:01:00.000Z',
  },
  {
    id: 'london-01',
    lat: 51.5072,
    lng: -0.1276,
    name: 'Piccadilly Circus',
    direction: 'Eastbound',
    source: 'London TfL',
    feedUrl: '',
    feedType: 'video',
    lastUpdated: '2026-03-08T19:02:00.000Z',
  },
];
