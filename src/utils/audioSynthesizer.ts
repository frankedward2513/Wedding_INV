/**
 * Web Audio Synthesizer for Romantic Wedding Ambient Music
 * Plays a gentle, lush arpeggiated acoustic harp / warm string chord progression (Canon in D)
 * Completely standalone, works in all modern browsers without external network dependencies.
 */

class RomanticAudioEngine {
  private ctx: AudioContext | null = null;
  private isPlaying = false;
  private intervalId: number | null = null;
  private gainNode: GainNode | null = null;
  private volume = 0.45;
  private currentStep = 0;

  // Chord progression (Pachelbel's Canon: D, A, Bm, F#m, G, D, G, A)
  // Frequencies in Hz for romantic harp arpeggios
  private chords: number[][] = [
    // D Major (D3, A3, D4, F#4, A4)
    [146.83, 220.00, 293.66, 369.99, 440.00, 587.33],
    // A Major (A2, E3, A3, C#4, E4)
    [110.00, 164.81, 220.00, 277.18, 329.63, 440.00],
    // B minor (B2, F#3, B3, D4, F#4)
    [123.47, 185.00, 246.94, 293.66, 369.99, 493.88],
    // F# minor (F#2, C#3, F#3, A3, C#4)
    [92.50, 138.59, 185.00, 220.00, 277.18, 369.99],
    // G Major (G2, D3, G3, B3, D4)
    [98.00, 146.83, 196.00, 246.94, 293.66, 392.00],
    // D Major (D3, A3, D4, F#4, A4)
    [146.83, 220.00, 293.66, 369.99, 440.00, 587.33],
    // G Major (G2, D3, G3, B3, D4)
    [98.00, 146.83, 196.00, 246.94, 293.66, 392.00],
    // A Major (A2, E3, A3, C#4, E4)
    [110.00, 164.81, 220.00, 277.18, 329.63, 440.00],
  ];

  public init() {
    if (!this.ctx) {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioContextClass();
      this.gainNode = this.ctx.createGain();
      this.gainNode.gain.setValueAtTime(this.volume, this.ctx.currentTime);
      this.gainNode.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public play() {
    this.init();
    if (this.isPlaying) return;
    this.isPlaying = true;

    if (this.ctx && this.gainNode) {
      this.gainNode.gain.setValueAtTime(this.volume, this.ctx.currentTime);
    }

    let noteIndex = 0;
    let chordIndex = 0;

    const playNextNote = () => {
      if (!this.isPlaying || !this.ctx || !this.gainNode) return;

      const currentChord = this.chords[chordIndex];
      const freq = currentChord[noteIndex % currentChord.length];

      this.pluckString(freq);

      noteIndex++;
      if (noteIndex >= currentChord.length * 2) {
        noteIndex = 0;
        chordIndex = (chordIndex + 1) % this.chords.length;
      }
    };

    // Arpeggio tempo: ~420ms per note (gentle and romantic)
    this.intervalId = window.setInterval(playNextNote, 460);
    playNextNote();
  }

  private pluckString(freq: number) {
    if (!this.ctx || !this.gainNode) return;
    const now = this.ctx.currentTime;

    // Dual oscillator for rich, warm acoustic resonance (sine + gentle triangle with subtle detune)
    const osc1 = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    const noteGain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    osc1.type = 'triangle';
    osc1.frequency.setValueAtTime(freq, now);

    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(freq * 1.002, now); // subtle shimmer chorus

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1400, now);
    filter.frequency.exponentialRampToValueAtTime(350, now + 2.2);

    // Warm pluck envelope
    noteGain.gain.setValueAtTime(0.0001, now);
    noteGain.gain.linearRampToValueAtTime(0.24, now + 0.04);
    noteGain.gain.exponentialRampToValueAtTime(0.0001, now + 2.8);

    osc1.connect(filter);
    osc2.connect(filter);
    filter.connect(noteGain);
    noteGain.connect(this.gainNode);

    osc1.start(now);
    osc2.start(now);
    osc1.stop(now + 3.0);
    osc2.stop(now + 3.0);
  }

  public pause() {
    this.isPlaying = false;
    if (this.intervalId !== null) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
    if (this.ctx && this.gainNode) {
      this.gainNode.gain.linearRampToValueAtTime(0.0001, this.ctx.currentTime + 0.5);
    }
  }

  public setVolume(vol: number) {
    this.volume = Math.max(0, Math.min(1, vol));
    if (this.ctx && this.gainNode && this.isPlaying) {
      this.gainNode.gain.setValueAtTime(this.volume, this.ctx.currentTime);
    }
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }
}

export const romanticAudio = new RomanticAudioEngine();
