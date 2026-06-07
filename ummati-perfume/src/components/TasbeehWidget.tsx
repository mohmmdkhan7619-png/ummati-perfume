import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { RotateCcw, Volume2, VolumeX, Settings, Award, Circle } from 'lucide-react';
import { playChime } from './SoundHelper';

interface TasbeehState {
  count: number;
  goal: number;
  phrase: string;
  totalSessions: number;
  totalBeadsCounted: number;
}

const DHIKR_PHRASES = [
  { Arabic: 'سُبْحَانَ ٱللَّٰهِ', transliteration: "Subhan'Allah", translation: 'Glory be to Allah' },
  { Arabic: 'ٱلْحَمْدُ لِلَّٰهِ', transliteration: 'Alhamdulillah', translation: 'Praise be to Allah' },
  { Arabic: 'ٱللَّٰهُ أَكْبَرُ', transliteration: 'Allahu Akbar', translation: 'Allah is the Greatest' },
  { Arabic: 'لَا إِلَٰهَ إِلَّا ٱللَّٰهُ', transliteration: 'La ilaha illa Allah', translation: 'There is no god but Allah' },
  { Arabic: 'أَسْتَغْفِرُ ٱللَّٰهَ', transliteration: 'Astaghfirullah', translation: 'I seek forgiveness from Allah' }
];

export default function TasbeehWidget({ onClose }: { onClose?: () => void }) {
  const [soundEnabled, setSoundEnabled] = useState<boolean>(() => {
    const saved = localStorage.getItem('tasbeeh_sound');
    return saved !== 'false';
  });

  const [state, setState] = useState<TasbeehState>(() => {
    try {
      const saved = localStorage.getItem('tasbeeh_state');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {}
    return {
      count: 0,
      goal: 33,
      phrase: "Subhan'Allah",
      totalSessions: 0,
      totalBeadsCounted: 0
    };
  });

  useEffect(() => {
    localStorage.setItem('tasbeeh_state', JSON.stringify(state));
  }, [state]);

  useEffect(() => {
    localStorage.setItem('tasbeeh_sound', String(soundEnabled));
  }, [soundEnabled]);

  const currentPhraseObj = DHIKR_PHRASES.find(p => p.transliteration === state.phrase) || DHIKR_PHRASES[0];

  const handleIncrement = () => {
    if (soundEnabled) {
      playChime();
    }
    
    setState(prev => {
      const isGoalMet = prev.count + 1 === prev.goal;
      return {
        ...prev,
        count: prev.count + 1,
        totalBeadsCounted: prev.totalBeadsCounted + 1,
        totalSessions: isGoalMet ? prev.totalSessions + 1 : prev.totalSessions
      };
    });
  };

  const handleReset = () => {
    setState(prev => ({
      ...prev,
      count: 0
    }));
  };

  const handleGoalChange = (newGoal: number) => {
    setState(prev => ({
      ...prev,
      goal: newGoal,
      count: 0
    }));
  };

  const handlePhraseSelect = (phraseName: string) => {
    setState(prev => ({
      ...prev,
      phrase: phraseName,
      count: 0
    }));
  };

  // Completion percentage
  const percentage = Math.min((state.count / state.goal) * 100, 100);

  return (
    <div id="tasbeeh_container" className="p-6 rounded-2xl bg-gradient-to-br from-emerald-950 to-neutral-900 border border-gold-600/30 text-white max-w-md w-full mx-auto gold-card-shadow">
      {/* Widget Header */}
      <div className="flex items-center justify-between pb-4 border-b border-gold-600/15">
        <div className="flex items-center gap-2">
          <Circle className="w-5 h-5 text-gold-500 fill-gold-500/10 animate-pulse" />
          <h3 className="font-serif font-semibold text-lg text-gold-300">Tasbeeh Al-Barakah</h3>
        </div>
        <div className="flex items-center gap-3">
          <button
            id="toggle_sound"
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="p-1.5 rounded-lg border border-gold-600/20 bg-neutral-900/50 hover:bg-gold-600/15 text-gold-400 transition-colors"
            title={soundEnabled ? 'Mute Chime' : 'Unmute Chime'}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>
          <button
            id="reset_tasbeeh"
            onClick={handleReset}
            className="p-1.5 rounded-lg border border-gold-600/20 bg-neutral-900/50 hover:bg-gold-600/15 text-gold-400 transition-colors"
            title="Reset Counter"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
          {onClose && (
            <button
              onClick={onClose}
              className="text-white hover:text-gold-400 transition-colors bg-neutral-800 rounded-full w-6 h-6 flex items-center justify-center text-xs"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Phrases Carousel */}
      <div className="my-4">
        <label className="text-xs text-stone-400 block mb-2 font-mono uppercase tracking-wider">Select Dhikr</label>
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
          {DHIKR_PHRASES.map(p => {
            const isSelected = p.transliteration === state.phrase;
            return (
              <button
                id={`phrase_btn_${p.transliteration.replace("'", "")}`}
                key={p.transliteration}
                onClick={() => handlePhraseSelect(p.transliteration)}
                className={`py-1.5 px-3 rounded-full text-xs font-medium whitespace-nowrap transition-all border ${
                  isSelected
                    ? 'bg-gold-600 text-neutral-950 border-gold-400 shadow-md scale-102 font-semibold'
                    : 'bg-neutral-900/70 text-stone-300 border-gold-600/15 hover:border-gold-500/40'
                }`}
              >
                {p.transliteration}
              </button>
            );
          })}
        </div>
      </div>

      {/* Transliteration and Arabic Banner */}
      <div className="bg-neutral-950/80 rounded-xl p-5 text-center border border-gold-600/10 shadow-inner relative overflow-hidden my-4">
        {/* Subtle decorative background arch */}
        <div className="absolute inset-0 opacity-10 flex items-center justify-center">
          <svg className="w-40 h-40 text-gold-500" viewBox="0 0 100 100" fill="currentColor">
            <path d="M50 0 C40 20, 20 40, 0 50 C20 60, 40 80, 50 100 C60 80, 80 60, 100 50 C80 40, 60 20, 50 0 Z" />
          </svg>
        </div>
        
        <div className="relative z-10 space-y-2">
          <div className="text-3xl font-serif text-gold-400 font-bold tracking-wide">
            {currentPhraseObj.Arabic}
          </div>
          <div className="text-base font-semibold text-stone-100">{currentPhraseObj.transliteration}</div>
          <p className="text-xs text-stone-400 italic">"{currentPhraseObj.translation}"</p>
        </div>
      </div>

      {/* Main Touch Counter Target */}
      <div className="flex flex-col items-center justify-center py-6">
        <button
          id="increment_tasbeeh_btn"
          onClick={handleIncrement}
          className="relative w-44 h-44 rounded-full flex flex-col items-center justify-center cursor-pointer select-none active:scale-95 transition-all outline-none"
        >
          {/* Radial Progress Border */}
          <svg className="absolute inset-0 w-full h-full -rotate-90">
            <circle
              cx="88"
              cy="88"
              r="82"
              stroke="#0f342d"
              strokeWidth="6"
              fill="none"
            />
            <circle
              cx="88"
              cy="88"
              r="82"
              stroke="#d4af37"
              strokeWidth="6"
              fill="none"
              strokeDasharray={2 * Math.PI * 82}
              strokeDashoffset={2 * Math.PI * 82 * (1 - percentage / 100)}
              strokeLinecap="round"
              className="transition-all duration-300"
            />
          </svg>

          {/* Interactive core emerald pulsing orb */}
          <div className="w-[152px] h-[152px] rounded-full bg-gradient-to-br from-emerald-900 to-emerald-950 hover:to-emerald-900 border border-gold-600/35 flex flex-col items-center justify-center p-4 shadow-lg text-center group">
            <span className="text-stone-400 text-xs uppercase tracking-widest font-mono">Count</span>
            <div className="text-5xl font-serif text-white font-bold my-1 tracking-tight group-hover:scale-105 transition-transform duration-200">
              {state.count}
            </div>
            <div className="text-[11px] font-mono text-gold-300">
              Goal: {state.goal === 99999 ? '∞' : state.goal}
            </div>
          </div>
        </button>
      </div>

      {/* Goal Switchers & Stats */}
      <div className="space-y-4">
        {/* Goal Selector */}
        <div className="flex items-center justify-between">
          <span className="text-xs text-stone-400 font-mono">SET COUNT TARGET</span>
          <div className="flex items-center gap-1.5 bg-neutral-950/70 p-1 rounded-lg border border-gold-600/10">
            {[33, 99, 100, 99999].map(targetGoal => (
              <button
                id={`target_goal_btn_${targetGoal}`}
                key={targetGoal}
                onClick={() => handleGoalChange(targetGoal)}
                className={`py-1 px-2.5 rounded text-[11px] font-mono transition-colors ${
                  state.goal === targetGoal
                    ? 'bg-gold-500 text-neutral-950 font-bold'
                    : 'text-stone-300 hover:text-white hover:bg-neutral-800'
                }`}
              >
                {targetGoal === 99999 ? 'Free' : targetGoal}
              </button>
            ))}
          </div>
        </div>

        {/* Bottom Achievement Banner */}
        <div className="grid grid-cols-2 gap-3 pt-3 border-t border-gold-600/10 text-center">
          <div className="bg-neutral-900/60 p-2.5 rounded-lg border border-gold-600/5">
            <div className="text-[10px] font-mono text-stone-400 uppercase">Beads Counted</div>
            <div className="text-lg font-serif text-gold-300 font-bold">{state.totalBeadsCounted}</div>
          </div>
          <div className="bg-neutral-900/60 p-2.5 rounded-lg border border-gold-600/5">
            <div className="text-[10px] font-mono text-stone-400 uppercase flex items-center justify-center gap-1">
              <Award className="w-3 h-3 text-gold-500" /> Goals Completed
            </div>
            <div className="text-lg font-serif text-gold-300 font-bold">{state.totalSessions}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
