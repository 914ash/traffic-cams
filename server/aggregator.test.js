/**
 * ABOUTME: Tests for the backend aggregator normalization logic.
 * ABOUTME: Uses Jest to validate that various DOT/International schemas map correctly to our unified schema.
 */

const { normalizeStationData } = require('./aggregator');

describe('Aggregator Normalization', () => {
  test('should normalize London TfL (JamCams) data correctly', () => {
    const rawTflData = {
      id: 'JamCam_00001',
      lat: 51.5,
      lon: -0.1,
      commonName: 'Piccadilly Circus',
      view: 'Northbound',
      imageUrl: 'https://s3-eu-west-1.amazonaws.com/jamcams.tfl.gov.uk/00001.jpg',
      videoUrl: 'https://video.tfl.gov.uk/00001.m3u8'
    };

    const normalized = normalizeStationData(rawTflData, 'London TfL');

    expect(normalized).toEqual({
      id: 'JamCam_00001',
      lat: 51.5,
      lng: -0.1,
      name: 'Piccadilly Circus',
      direction: 'Northbound',
      feedUrl: 'https://video.tfl.gov.uk/00001.m3u8',
      feedType: 'video',
      source: 'London TfL',
      lastUpdated: expect.any(String)
    });
  });

  test('should normalize Sydney (TfNSW) data correctly', () => {
    const rawSydneyData = {
      id: 'CAM001',
      latitude: -33.8,
      longitude: 151.2,
      description: 'Harbour Bridge North',
      direction: 'Southbound',
      href: 'https://vms.transport.nsw.gov.au/traffic/camera/CAM001.jpg'
    };

    const normalized = normalizeStationData(rawSydneyData, 'Sydney TfNSW');

    expect(normalized).toEqual({
      id: 'CAM001',
      lat: -33.8,
      lng: 151.2,
      name: 'Harbour Bridge North',
      direction: 'Southbound',
      feedUrl: 'https://vms.transport.nsw.gov.au/traffic/camera/CAM001.jpg',
      feedType: 'image',
      source: 'Sydney TfNSW',
      lastUpdated: expect.any(String)
    });
  });

  test('should normalize Austin (Open Data) data correctly', () => {
    const rawAustinData = {
      camera_id: 'AUS_99',
      location_name: 'Congress @ 6th St',
      screenshot_address: 'https://data.austintexas.gov/camera/99.jpg',
      location: {
        latitude: '30.2672',
        longitude: '-97.7431'
      }
    };

    const normalized = normalizeStationData(rawAustinData, 'Austin DOT');

    expect(normalized).toEqual({
      id: 'AUS_99',
      lat: 30.2672,
      lng: -97.7431,
      name: 'Congress @ 6th St',
      direction: 'Unknown',
      feedUrl: 'https://data.austintexas.gov/camera/99.jpg',
      feedType: 'image',
      source: 'Austin DOT',
      lastUpdated: expect.any(String)
    });
  });
});
