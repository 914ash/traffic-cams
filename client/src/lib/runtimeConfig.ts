export interface RuntimeEnv {
  VITE_CESIUM_ION_TOKEN?: string;
  VITE_FORCE_FALLBACK_MAP?: string;
  VITE_TRAFFIC_CAMS_DEMO_MODE?: string;
  VITE_WS_URL?: string;
}

export interface RuntimeConfig {
  demoMode: boolean;
  mapMode: 'cesium' | 'fallback';
  wsUrl: string;
}

export function readRuntimeConfig(search: string, env: RuntimeEnv): RuntimeConfig {
  const params = new URLSearchParams(search);
  const demoMode = params.get('demo') === '1' || env.VITE_TRAFFIC_CAMS_DEMO_MODE === '1';
  const forceFallback =
    params.get('fallbackMap') === '1' || env.VITE_FORCE_FALLBACK_MAP === '1';
  const hasCesiumToken = Boolean(env.VITE_CESIUM_ION_TOKEN);

  return {
    demoMode,
    mapMode: forceFallback || !hasCesiumToken ? 'fallback' : 'cesium',
    wsUrl: env.VITE_WS_URL || 'ws://localhost:3001',
  };
}
