
// src/hooks/__tests__/usePWA.test.ts
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { renderHook } from '@testing-library/react';
import { usePWA } from '../usePWA';

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

describe('usePWA', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('initializes with correct default values', () => {
    const { result } = renderHook(() => usePWA());

    expect(result.current.isInstallable).toBe(false);
    expect(result.current.isInstalled).toBe(false);
    expect(typeof result.current.installApp).toBe('function');
  });

  it('detects standalone display mode', () => {
    window.matchMedia = vi.fn().mockImplementation(() => ({
      matches: true,
    }));

    const { result } = renderHook(() => usePWA());

    expect(result.current.isInstalled).toBe(true);
  });
});
