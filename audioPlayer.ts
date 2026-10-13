/**
 * Procedural relaxing villa soundtrack synthesizer using Web Audio API.
 * Creates a soothing acoustic warm chord & gentle arpeggio progression
 * mimicking an acoustic guitar & piano holiday villa vibe.
 */

class VillaAudioEngine {
  private ctx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private masterGain: GainNode | null = null;
  private timerId: number | null = null;
  private currentChordIndex: number = 0;
  private volume: number = 0.45;

  // Gentle jazz/indie acoustic chord progression in C/F major
  // Fmaj7 -> Em7 -> Dm7 -> Cmaj7 -> Fmaj7 -> G7sus4 -> Cmaj7
  private chords = [
    [174.61, 220.00, 261.63, 329.63, 392.00], // Fmaj7 (F3, A3, C4, E4, G4)
    [164.81, 196.00, 246.94, 293.66, 392.00], // Em7 (E3, G3, B3, D4, G4)
    [146.83, 220.00, 261.63, 349.23, 440.00], // Dm7 (D3, A3, C4, F4, A4)
    [130.81, 196.00, 261.63, 329.63, 392.00], // Cmaj7 (C3, G3, C4, E4, G4)
    [174.61, 220.00, 261.63, 329.63, 440.00], // Fmaj7/A
    [196.00, 246.94, 293.66, 349.23, 440.00], // G7sus4
    [130.81, 164.81, 196.00, 246.94, 329.63], // Cmaj9
    [146.83, 174.61, 220.00, 261.63, 329.63], // Dm9
  ];

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  private playTone(freq: number, startTime: number, duration: number, type: OscillatorType = 'triangle', vel = 0.12) {
    if (!this.ctx || !this.masterGain) return;

    const osc = this.ctx.createOscillator();
    const noteGain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, startTime);

    // Warm acoustic low-pass filter
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1400, startTime);
    filter.frequency.exponentialRampToValueAtTime(600, startTime + duration);

    // Pluck envelope: sharp soft attack, natural exponential decay
    noteGain.gain.setValueAtTime(0.0001, startTime);
    noteGain.gain.linearRampToValueAtTime(vel, startTime + 0.04);
    noteGain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

    osc.connect(filter);
    filter.connect(noteGain);
    noteGain.connect(this.masterGain);

    osc.start(startTime);
    osc.stop(startTime + duration + 0.1);
  }

  private scheduleBar() {
    if (!this.isPlaying || !this.ctx) return;

    const chord = this.chords[this.currentChordIndex];
    this.currentChordIndex = (this.currentChordIndex + 1) % this.chords.length;

    const now = this.ctx.currentTime;
    const barDuration = 3.6; // ~60 BPM gentle acoustic pace

    // Bass root note
    this.playTone(chord[0], now + 0.02, 2.8, 'sine', 0.16);

    // Fingerpicked arpeggios
    chord.slice(1).forEach((note, index) => {
      const delay = 0.35 + index * 0.45;
      this.playTone(note, now + delay, 2.2, 'triangle', 0.09);
    });

    // Gentle second arpeggio cycle in the second half of the bar
    chord.slice(2).forEach((note, index) => {
      const delay = 2.0 + index * 0.38;
      this.playTone(note, now + delay, 1.8, 'triangle', 0.07);
    });

    // Very quiet high harmonic shimmer
    if (Math.random() > 0.4) {
      this.playTone(chord[chord.length - 1] * 1.5, now + 1.2, 2.5, 'sine', 0.03);
    }

    this.timerId = window.setTimeout(() => {
      this.scheduleBar();
    }, barDuration * 1000 - 100);
  }

  public start() {
    try {
      this.initContext();
      if (this.isPlaying) return;
      this.isPlaying = true;
      this.scheduleBar();
    } catch {
      // Audio context autoplay blocked or unsupported
    }
  }

  public stop() {
    this.isPlaying = false;
    if (this.timerId) {
      window.clearTimeout(this.timerId);
      this.timerId = null;
    }
  }

  public toggle(): boolean {
    if (this.isPlaying) {
      this.stop();
      return false;
    } else {
      this.start();
      return true;
    }
  }

  public setVolume(val: number) {
    this.volume = Math.max(0, Math.min(1, val));
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);
    }
  }

  public getVolume(): number {
    return this.volume;
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }
}

export const audioEngine = new VillaAudioEngine();
