// Pure Web Audio API chime synthesizer to generate asset-free feedback
export const playChime = () => {
  try {
    const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContext) return;
    
    const ctx = new AudioContext();
    
    // Create oscillator nodes
    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const gainNode = ctx.createGain();
    
    osc1.connect(gainNode);
    osc2.connect(gainNode);
    gainNode.connect(ctx.destination);
    
    // Set frequencies (harmonic chime notes, e.g. E5 and A5)
    osc1.frequency.setValueAtTime(659.25, ctx.currentTime); // E5
    osc2.frequency.setValueAtTime(880.00, ctx.currentTime); // A5
    
    // Choose chime wave types
    osc1.type = 'sine';
    osc2.type = 'sine';
    
    // Volume envelope (fast attack, sweet exponential decay)
    gainNode.gain.setValueAtTime(0, ctx.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.3, ctx.currentTime + 0.02);
    gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.2);
    
    osc1.start(ctx.currentTime);
    osc2.start(ctx.currentTime);
    
    osc1.stop(ctx.currentTime + 1.2);
    osc2.stop(ctx.currentTime + 1.2);
  } catch (error) {
    // Graceful fallback if policy prevents audio
    console.log('Audio chime prevented by browser auto-play restrictions.');
  }
};
