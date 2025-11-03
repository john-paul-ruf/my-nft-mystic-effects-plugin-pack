# Sine Wave Harmonies - Quick Reference Card

## Three New Controls

### 1️⃣ Wave Count
```javascript
sineWaveCount: 3  // 1-10 or null (all)
```

### 2️⃣ Harmonic Ratios
```javascript
sineWaveHarmonicRatios: [1, 2, 1.5]  // Array of frequency multipliers
```

### 3️⃣ Amplitude Oscillation
```javascript
enableSineWaveAmplitudeOscillation: true
sineWaveAmplitudeOscillationRange: { lower: 0.5, upper: 2.0 }
sineWaveAmplitudeOscillationTimes: 2
sineWaveAmplitudeOscillationAlgorithm: 'sinusoidal' // or 'square', 'sawtooth'
```

---

## Common Preset Configurations

### 🌊 Simple Cascade
```javascript
new ChakraMandalaConfig({
  enableVerticalSineWaves: true,
  sineWaveCount: 3,
  sineWaveHarmonicRatios: [1, 2, 3],
  enableSineWaveAmplitudeOscillation: true,
})
```

### 🎵 Musical Harmony
```javascript
new ChakraMandalaConfig({
  enableVerticalSineWaves: true,
  sineWaveCount: 4,
  sineWaveHarmonicRatios: [1, 1.5, 2, 2.5],
  enableSineWaveAmplitudeOscillation: false,
})
```

### ✨ All Waves Synchronized
```javascript
new ChakraMandalaConfig({
  enableVerticalSineWaves: true,
  sineWaveCount: null,  // All
  sineWaveHarmonicRatios: [1, 1, 1, 1, 1],  // Same speed
})
```

### ⚡ Extreme Pulse
```javascript
new ChakraMandalaConfig({
  enableVerticalSineWaves: true,
  sineWaveCount: null,
  sineWaveHarmonicRatios: [1, 2, 4, 8],
  enableSineWaveAmplitudeOscillation: true,
  sineWaveAmplitudeOscillationRange: { lower: 0.3, upper: 2.5 },
  sineWaveAmplitudeOscillationTimes: 4,
  sineWaveAmplitudeOscillationAlgorithm: 'square',
})
```

### 🧘 Meditative
```javascript
new ChakraMandalaConfig({
  enableVerticalSineWaves: true,
  sineWaveCount: 3,
  sineWaveHarmonicRatios: [1, 1.618, 2.618],  // Golden ratio
  sineWaveFrequency: 0.8,
  enableSineWaveAmplitudeOscillation: true,
  sineWaveAmplitudeOscillationRange: { lower: 0.9, upper: 1.1 },
  sineWaveAmplitudeOscillationTimes: 0.5,
})
```

---

## Harmonic Ratio Presets

| Name | Ratios | Effect |
|------|--------|--------|
| Harmonic Series | `[1, 2, 3, 4, 5]` | Each wave 2x faster |
| Octaves | `[1, 2, 4, 8]` | Exponential speed increase |
| Musical Intervals | `[1, 1.5, 2, 2.5]` | Perfect musical chords |
| Golden Ratio | `[1, 1.618, 2.618]` | Natural proportions |
| Fibonacci | `[1, 1, 2, 3, 5]` | Nature-inspired |
| All Unison | `[1, 1, 1, 1]` | Synchronized |
| Pairs | `[1, 1, 2, 2, 3, 3]` | Entangled pairs |
| Inverse | `[1, -2, 1, -2]` | Opposite directions |

---

## Amplitude Oscillation Algorithms

| Algorithm | Effect | Use Case |
|-----------|--------|----------|
| `'sinusoidal'` | Smooth breathing | Default, natural |
| `'square'` | Sharp on/off | Heartbeat, pulses |
| `'sawtooth'` | Rise then drop | Wave building |

---

## Parameter Ranges

| Parameter | Min | Default | Max |
|-----------|-----|---------|-----|
| `sineWaveCount` | 1 | null | 10 |
| `sineWaveFrequency` | 0.5 | 2.5 | 10 |
| `sineWaveAmplitude` | 5 | 15 | 50 |
| `sineWaveAmplitudeOscillationTimes` | 0.5 | 2 | 10 |
| lower (oscillation range) | 0.1 | 0.5 | 1.0 |
| upper (oscillation range) | 1.0 | 2.0 | 5.0 |

---

## Troubleshooting

| Problem | Solution |
|---------|----------|
| Waves look identical | Different values in `sineWaveHarmonicRatios` |
| Amplitude not changing | Set `enableSineWaveAmplitudeOscillation: true` |
| Only first wave | Check `sineWaveCount` not set to 1 |
| Waves too fast | Decrease `sineWaveFrequency` |
| Waves too slow | Increase `sineWaveFrequency` |
| Amplitude too extreme | Adjust `sineWaveAmplitudeOscillationRange` |

---

## Performance Tips

- **Max 5-7 waves** for smooth 60fps
- Each wave = ~5-10ms overhead
- Ratios/oscillation = minimal overhead
- Use `'sinusoidal'` for smoothest results

---

## Test Command

```bash
npm run render:chakra  # 400 frames with new features
```

---

Quick links:
- **Full Guide**: `docs/SINE_WAVE_HARMONIES_GUIDE.md`
- **Summary**: `ENHANCEMENT_15_SUMMARY.md`
- **Config Details**: `ChakraMandalaConfig.js`
- **Engine Code**: `VerticalSineWaveEngine.js`