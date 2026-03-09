import { describe, expect, it } from 'vitest';
import { readRuntimeConfig } from './runtimeConfig';

describe('readRuntimeConfig', () => {
  it('uses demo mode and fallback map when demo is requested without tokens', () => {
    const config = readRuntimeConfig('?demo=1', {
      VITE_TRAFFIC_CAMS_DEMO_MODE: '0',
      VITE_FORCE_FALLBACK_MAP: '0',
      VITE_CESIUM_ION_TOKEN: '',
      VITE_WS_URL: '',
    });

    expect(config.demoMode).toBe(true);
    expect(config.mapMode).toBe('fallback');
    expect(config.wsUrl).toBe('ws://localhost:3001');
  });

  it('uses the Cesium map when a token is present and fallback is not forced', () => {
    const config = readRuntimeConfig('', {
      VITE_TRAFFIC_CAMS_DEMO_MODE: '0',
      VITE_FORCE_FALLBACK_MAP: '0',
      VITE_CESIUM_ION_TOKEN: 'token-present',
      VITE_WS_URL: 'ws://example.test:9000',
    });

    expect(config.demoMode).toBe(false);
    expect(config.mapMode).toBe('cesium');
    expect(config.wsUrl).toBe('ws://example.test:9000');
  });

  it('forces the fallback map when requested explicitly', () => {
    const config = readRuntimeConfig('', {
      VITE_TRAFFIC_CAMS_DEMO_MODE: '1',
      VITE_FORCE_FALLBACK_MAP: '1',
      VITE_CESIUM_ION_TOKEN: 'token-present',
      VITE_WS_URL: '',
    });

    expect(config.demoMode).toBe(true);
    expect(config.mapMode).toBe('fallback');
  });
});
