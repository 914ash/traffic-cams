export interface Camera {
  id: string;
  lat: number;
  lng: number;
  name: string;
  direction: string;
  source: string;
  feedUrl: string;
  feedType: 'image' | 'video';
  lastUpdated: string;
}
