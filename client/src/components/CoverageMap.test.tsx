import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { CoverageMap } from './CoverageMap';
import type { Camera } from '../types';

const cameras: Camera[] = [
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
    id: 'london-01',
    lat: 51.5072,
    lng: -0.1276,
    name: 'Piccadilly Circus',
    direction: 'Eastbound',
    source: 'London TfL',
    feedUrl: '',
    feedType: 'video',
    lastUpdated: '2026-03-08T19:00:00.000Z',
  },
];

describe('CoverageMap', () => {
  it('renders cameras as selectable map points', async () => {
    const onSelectCamera = vi.fn();

    render(
      <CoverageMap
        cameras={cameras}
        selectedCameraId="austin-01"
        onSelectCamera={onSelectCamera}
      />,
    );

    expect(screen.getByRole('button', { name: /Congress Ave & 6th St/i })).toHaveAttribute(
      'aria-pressed',
      'true',
    );

    fireEvent.click(screen.getByRole('button', { name: /Piccadilly Circus/i }));

    expect(onSelectCamera).toHaveBeenCalledWith(cameras[1]);
  });
});
