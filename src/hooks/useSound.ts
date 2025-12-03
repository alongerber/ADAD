/**
 * Sound Effects System using Web Audio API
 *
 * Uses synthesized sounds instead of audio files for:
 * - Instant playback (no loading)
 * - Smaller bundle size
 * - Works offline
 * - Customizable
 */

type SoundType = 'success' | 'error' | 'click' | 'tick' | 'whoosh' | 'celebrate' | 'borrow';

// Audio context singleton (created on first user interaction)
let audioContext: AudioContext | null = null;
let isInitialized = false;

const getAudioContext = (): AudioContext | null => {
  if (!audioContext) {
    try {
      audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    } catch (e) {
      console.warn('Web Audio API not supported');
      return null;
    }
  }
  return audioContext;
};

// Initialize audio on first user interaction (required for mobile)
export const initAudio = (): void => {
  if (isInitialized) return;

  const ctx = getAudioContext();
  if (!ctx) return;

  // Create and immediately stop a silent oscillator to unlock audio
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  gain.gain.value = 0; // Silent
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start();
  osc.stop(ctx.currentTime + 0.001);

  // Resume if suspended
  if (ctx.state === 'suspended') {
    ctx.resume();
  }

  isInitialized = true;
};

// Sound definitions using Web Audio API synthesis
const sounds: Record<SoundType, (ctx: AudioContext) => void> = {
  // Success: Rising arpeggio (happy sound)
  success: (ctx) => {
    const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
    notes.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.value = freq;

      gain.gain.setValueAtTime(0, ctx.currentTime + i * 0.1);
      gain.gain.linearRampToValueAtTime(0.3, ctx.currentTime + i * 0.1 + 0.05);
      gain.gain.linearRampToValueAtTime(0, ctx.currentTime + i * 0.1 + 0.3);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime + i * 0.1);
      osc.stop(ctx.currentTime + i * 0.1 + 0.3);
    });
  },

  // Error: Low buzz (gentle, not scary)
  error: (ctx) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(200, ctx.currentTime);
    osc.frequency.linearRampToValueAtTime(150, ctx.currentTime + 0.2);

    gain.gain.setValueAtTime(0.2, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.3);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.3);
  },

  // Click: Short pop
  click: (ctx) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.value = 800;

    gain.gain.setValueAtTime(0.15, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.08);
  },

  // Tick: Soft tick for wheel/slider movement
  tick: (ctx) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.value = 1200;

    gain.gain.setValueAtTime(0.08, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.03);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.03);
  },

  // Whoosh: For transitions and animations
  whoosh: (ctx) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const filter = ctx.createBiquadFilter();

    // White noise approximation using oscillator
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(100, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(2000, ctx.currentTime + 0.15);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(500, ctx.currentTime);
    filter.frequency.exponentialRampToValueAtTime(3000, ctx.currentTime + 0.1);

    gain.gain.setValueAtTime(0.1, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.2);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.2);
  },

  // Celebrate: Fanfare for level completion
  celebrate: (ctx) => {
    // Play a triumphant chord
    const freqs = [261.63, 329.63, 392.00, 523.25]; // C major chord

    freqs.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = i === 0 ? 'triangle' : 'sine';
      osc.frequency.value = freq;

      gain.gain.setValueAtTime(0, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.2, ctx.currentTime + 0.1);
      gain.gain.setValueAtTime(0.2, ctx.currentTime + 0.4);
      gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.8);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.8);
    });

    // Add a rising arpeggio after the chord
    setTimeout(() => {
      sounds.success(ctx);
    }, 400);
  },

  // Borrow: Coin drop sound for borrowing in subtraction
  borrow: (ctx) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(1500, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(800, ctx.currentTime + 0.15);

    gain.gain.setValueAtTime(0.2, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.2);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.2);
  }
};

// Throttle tick sounds to prevent audio overload
let lastTickTime = 0;
const TICK_THROTTLE = 50; // ms

export const playSound = (type: SoundType): void => {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    // Initialize on first sound (unlocks audio on mobile)
    if (!isInitialized) {
      initAudio();
    }

    // Resume context if suspended (browser autoplay policy)
    if (ctx.state === 'suspended') {
      ctx.resume();
    }

    // Throttle tick sounds
    if (type === 'tick') {
      const now = Date.now();
      if (now - lastTickTime < TICK_THROTTLE) return;
      lastTickTime = now;
    }

    sounds[type](ctx);
  } catch (e) {
    // Silently fail - sound is not critical
    console.warn('Sound playback failed:', e);
  }
};

// Hook for React components
export const useSound = () => {
  return {
    playSuccess: () => playSound('success'),
    playError: () => playSound('error'),
    playClick: () => playSound('click'),
    playTick: () => playSound('tick'),
    playWhoosh: () => playSound('whoosh'),
    playCelebrate: () => playSound('celebrate'),
    playBorrow: () => playSound('borrow'),
  };
};
