# Sine Wave Harmonies: Advanced Controls Guide

**Feature Added**: Enhancement 15 - Harmonic Wave Control System  
**Date**: November 2025  
**Purpose**: Fine-grained control over wave amplitude, wave count, and harmonic frequency relationships

---

## Overview

The vertical sine wave system now supports three advanced controls for creating complex, musically-inspired animations:

1. **Wave Count** - Limit how many sine waves render (1-10 or all)
2. **Harmonic Ratios** - Make each wave oscillate at different frequencies using musical ratios
3. **Amplitude Oscillation** - Amplitude changes over time in harmonic patterns

---

## Feature 1: Wave Count Control

### What It Does
Controls how many sine waves are rendered from the available chakra groupings.

### Configuration

```javascript
new ChakraMandalaConfig({
  enableVerticalSineWaves: true,
  sineWaveCount: 3,  // Render only first 3 waves (null = all waves)
  // ... other sine wave settings
})
```

### Parameters

| Parameter | Type | Default | Range | Description |
|-----------|------|---------|-------|-------------|
| `sineWaveCount` | number\|null | null | null or 1-10 | null = render all waves, number = limit to N waves |

### Examples

**Example 1: Show all waves (default)**
```javascript
{
  sineWaveCount: null,  // All chakra groups become waves
}
```
**Result**: If you have 7 chakras with grouping=3:
- Sequential: 2 groups (0-1-2, 3-4-5) = 2 waves
- Overlapping: 5 groups (0-1-2, 1-2-3, 2-3-4, 3-4-5, 4-5-6) = 5 waves

**Example 2: Single wave focus**
```javascript
{
  sineWaveCount: 1,  // Only first wave visible
}
```
**Result**: Only the first sine wave connecting root→sacral→solar plexus renders

**Example 3: Limited waves for clarity**
```javascript
{
  sineWaveCount: 2,  // First two waves
}
```
**Result**: Two sine waves visible, higher chakra groups hidden

---

## Feature 2: Harmonic Ratios

### What It Does
Makes each sine wave oscillate at a different frequency using mathematical ratios, inspired by musical harmony.

### Musical Ratios Explained

Music uses simple number ratios for harmonious frequencies:
- **1:1** - Unison (same frequency)
- **1:2** - Octave (double frequency, higher pitch)
- **2:3** - Perfect fifth (1.5x frequency)
- **3:4** - Perfect fourth (0.75x frequency)
- **3:5** - Major sixth (1.67x frequency)

When sine waves use these ratios, they create interference patterns that create visual and mathematical harmony.

### Configuration

```javascript
new ChakraMandalaConfig({
  enableVerticalSineWaves: true,
  sineWaveFrequency: 2.5,  // Base frequency
  sineWaveHarmonicRatios: [1, 2, 1.5, 3, 2.5],  // Frequency multipliers per wave
  // ... other sine wave settings
})
```

### Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `sineWaveHarmonicRatios` | Array<number> | [1, 2, 1.5, 3, 2.5] | Frequency multiplier for each wave. Cycles if more waves than ratios. |

### How It Works

**With `sineWaveFrequency: 2.5` and ratios `[1, 2, 1.5]`:**

| Wave | Ratio | Actual Frequency | Pattern |
|------|-------|------------------|---------|
| Wave 1 | 1 | 2.5 × 1 = 2.5 Hz | Baseline oscillation |
| Wave 2 | 2 | 2.5 × 2 = 5.0 Hz | Oscillates twice as fast |
| Wave 3 | 1.5 | 2.5 × 1.5 = 3.75 Hz | Between wave 1 and 2 |

### Examples

**Example 1: Simple harmonic series**
```javascript
{
  sineWaveFrequency: 2.5,
  sineWaveHarmonicRatios: [1, 2, 3, 4, 5],  // Harmonic series
}
```
**Result**: Each wave oscillates faster (fundamental, octave, twelfth, two-octave, etc.)
- Visually creates mathematically perfect interference patterns
- Aesthetically pleasing and musically inspired

**Example 2: Musical intervals**
```javascript
{
  sineWaveFrequency: 2.0,
  sineWaveHarmonicRatios: [1, 1.5, 2, 2.5, 3],  // Perfect intervals
}
```
**Result**: Creates recognizable musical chord patterns
- 1.5 = perfect fifth
- 2.0 = octave
- 2.5 = major third above octave
- 3.0 = twelfth

**Example 3: Fibonacci ratios (golden ratio inspired)**
```javascript
{
  sineWaveFrequency: 1.5,
  sineWaveHarmonicRatios: [1, 1.618, 2.618, 4.236],  // Fibonacci/golden ratio
}
```
**Result**: Waves follow natural proportions found in nature

**Example 4: All unison (all waves same speed)**
```javascript
{
  sineWaveFrequency: 2.5,
  sineWaveHarmonicRatios: [1, 1, 1, 1, 1],
}
```
**Result**: All waves oscillate in sync (like multiple voices in unison)

**Example 5: Octave doubling**
```javascript
{
  sineWaveFrequency: 1.0,
  sineWaveHarmonicRatios: [1, 2, 4, 8, 16],  // Each wave twice as fast
}
```
**Result**: Creates a cascade effect from slow to fast oscillations

---

## Feature 3: Amplitude Oscillation

### What It Does
Makes the wave amplitude (width) change over time, creating a "breathing" or "pulsing" effect. The amplitude can oscillate independently from the wave's frequency.

### Configuration

```javascript
new ChakraMandalaConfig({
  enableVerticalSineWaves: true,
  sineWaveAmplitude: 15,  // Base amplitude (pixels)
  enableSineWaveAmplitudeOscillation: true,  // Enable breathing effect
  sineWaveAmplitudeOscillationRange: { lower: 0.5, upper: 2.0 },  // 0.5x to 2.0x base
  sineWaveAmplitudeOscillationTimes: 2,  // 2 full cycles per animation
  sineWaveAmplitudeOscillationAlgorithm: 'sinusoidal',  // smooth breathing
})
```

### Parameters

| Parameter | Type | Default | Range | Description |
|-----------|------|---------|-------|-------------|
| `enableSineWaveAmplitudeOscillation` | boolean | true | - | Enable/disable amplitude changes |
| `sineWaveAmplitudeOscillationRange` | {lower, upper} | {lower: 0.5, upper: 2.0} | 0.1-5.0 | Min/max amplitude multiplier |
| `sineWaveAmplitudeOscillationTimes` | number | 2 | 0.5-10 | How many complete cycles per animation |
| `sineWaveAmplitudeOscillationAlgorithm` | string | 'sinusoidal' | 'sinusoidal', 'square', 'sawtooth' | Oscillation pattern |

### Examples

**Example 1: Gentle breathing (default)**
```javascript
{
  sineWaveAmplitude: 15,
  enableSineWaveAmplitudeOscillation: true,
  sineWaveAmplitudeOscillationRange: { lower: 0.5, upper: 2.0 },
  sineWaveAmplitudeOscillationTimes: 2,
  sineWaveAmplitudeOscillationAlgorithm: 'sinusoidal',
}
```
**Result**: Waves breathe gently, expanding to 2x width, then shrinking to 0.5x, twice per cycle

**Example 2: Extreme pulsing**
```javascript
{
  sineWaveAmplitude: 20,
  enableSineWaveAmplitudeOscillation: true,
  sineWaveAmplitudeOscillationRange: { lower: 0.2, upper: 3.0 },  // More extreme
  sineWaveAmplitudeOscillationTimes: 3,  // Faster pulses
  sineWaveAmplitudeOscillationAlgorithm: 'sinusoidal',
}
```
**Result**: Dramatic expansion and contraction, 3 times per cycle

**Example 3: Square wave (on/off pulses)**
```javascript
{
  sineWaveAmplitude: 15,
  enableSineWaveAmplitudeOscillation: true,
  sineWaveAmplitudeOscillationRange: { lower: 1.0, upper: 2.0 },
  sineWaveAmplitudeOscillationTimes: 2,
  sineWaveAmplitudeOscillationAlgorithm: 'square',
}
```
**Result**: Waves suddenly snap between normal and 2x width (like a heartbeat)

**Example 4: Sawtooth (smooth rise, sharp drop)**
```javascript
{
  sineWaveAmplitude: 15,
  enableSineWaveAmplitudeOscillation: true,
  sineWaveAmplitudeOscillationRange: { lower: 0.5, upper: 2.0 },
  sineWaveAmplitudeOscillationTimes: 1,  // One cycle
  sineWaveAmplitudeOscillationAlgorithm: 'sawtooth',
}
```
**Result**: Waves gradually expand over time, then snap back to small (like a wave building then breaking)

**Example 5: No amplitude oscillation**
```javascript
{
  sineWaveAmplitude: 15,
  enableSineWaveAmplitudeOscillation: false,  // Disable
}
```
**Result**: Amplitude stays constant at 15px (original behavior)

---

## Combined Examples: The Real Magic

### Example 1: Chakra Energy Cascade
```javascript
new ChakraMandalaConfig({
  enableVerticalSineWaves: true,
  
  // Show multiple waves
  sineWaveCount: 5,
  
  // Each wave oscillates at harmonic frequencies
  sineWaveFrequency: 1.5,
  sineWaveHarmonicRatios: [1, 2, 3, 4, 5],  // Harmonic series
  
  // Amplitude pulses gently
  sineWaveAmplitude: 15,
  enableSineWaveAmplitudeOscillation: true,
  sineWaveAmplitudeOscillationRange: { lower: 0.7, upper: 1.5 },
  sineWaveAmplitudeOscillationTimes: 1,
  sineWaveAmplitudeOscillationAlgorithm: 'sinusoidal',
  
  // Colors and effects
  sineWaveColor: '#9b59b6',
  sineWaveFuzzColor: '#c8a2e0',
  sineWaveThickness: 2.5,
})
```
**Result**: A beautiful cascade of 5 waves, each at different harmonic frequencies, all breathing gently. Creates a visually stunning "energy rising through chakras" effect.

### Example 2: Golden Ratio Meditation
```javascript
new ChakraMandalaConfig({
  enableVerticalSineWaves: true,
  
  // Fibonacci ratios inspired by nature
  sineWaveCount: 4,
  sineWaveFrequency: 1.0,
  sineWaveHarmonicRatios: [1, 1.618, 2.618, 4.236],  // Golden ratio progression
  
  // Very subtle amplitude breathing
  sineWaveAmplitude: 12,
  enableSineWaveAmplitudeOscillation: true,
  sineWaveAmplitudeOscillationRange: { lower: 0.9, upper: 1.1 },  // Subtle
  sineWaveAmplitudeOscillationTimes: 0.5,  // Slow breathing
  sineWaveAmplitudeOscillationAlgorithm: 'sinusoidal',
  
  // Warm colors
  sineWaveColor: '#e74c3c',  // Red
  sineWaveFuzzColor: '#ecf0f1',  // Light
})
```
**Result**: Meditative animation following natural proportions with subtle, calming amplitude changes.

### Example 3: Quantum Entanglement
```javascript
new ChakraMandalaConfig({
  enableVerticalSineWaves: true,
  
  // All waves visible
  sineWaveCount: null,  // All waves
  
  // Alternating frequencies (entangled pairs)
  sineWaveFrequency: 3.0,
  sineWaveHarmonicRatios: [1, 1, 2, 2, 1.5, 1.5],  // Paired ratios
  
  // Aggressive amplitude oscillation
  sineWaveAmplitude: 20,
  enableSineWaveAmplitudeOscillation: true,
  sineWaveAmplitudeOscillationRange: { lower: 0.4, upper: 2.5 },
  sineWaveAmplitudeOscillationTimes: 4,  // Fast pulsing
  sineWaveAmplitudeOscillationAlgorithm: 'square',  // Sharp pulses
  
  // Sci-fi colors
  sineWaveColor: '#00ff00',  // Green
  sineWaveFuzzColor: '#00aa00',
})
```
**Result**: High-energy, quantum-inspired animation with paired oscillations and sharp pulsing.

---

## Advanced Techniques

### Technique 1: Inverse Harmonics
Create waves that move against each other:
```javascript
{
  sineWaveFrequency: 2.0,
  sineWaveHarmonicRatios: [1, -2, 1, -2, 1],  // Alternating positive/negative
}
```
**Result**: Every other wave oscillates in the opposite direction, creating a weaving pattern

### Technique 2: Additive Synthesis
Layer multiple sets of waves with different ratios by rendering multiple times:
```javascript
// Render twice with different harmonic sets
const wave1 = new ChakraMandalaConfig({
  sineWaveHarmonicRatios: [1, 2, 3],
});
const wave2 = new ChakraMandalaConfig({
  sineWaveHarmonicRatios: [1.5, 3.5, 5],
});
```

### Technique 3: Progressive Acceleration
Make harmonics speed up throughout the animation by modifying ratios dynamically in code

---

## Performance Notes

- **Wave Count Impact**: Each wave adds ~5-10ms rendering time
- **Harmonic Ratios**: Minimal impact (computation done once per frame)
- **Amplitude Oscillation**: Minimal impact (single oscillation calculation per wave)
- **Recommended Max**: 5-7 waves for smooth 60fps animation

---

## Testing Your Configuration

Use the test script with verbose output:

```bash
npm run render:chakra -- --verbose 2>&1 | grep -i "sine\|wave\|harmonic"
```

---

## Troubleshooting

**Q: Waves look identical?**
- Check `sineWaveHarmonicRatios` has different values
- Ensure `sineWaveFrequency` is not too small

**Q: Amplitude not changing?**
- Verify `enableSineWaveAmplitudeOscillation: true`
- Check `sineWaveAmplitudeOscillationRange` has different lower/upper values
- Ensure `sineWaveAmplitudeOscillationTimes` is > 0

**Q: Only first wave showing?**
- Check `sineWaveCount` isn't set to 1
- Verify `enableVerticalSineWaves: true`

**Q: Waves appear jerky?**
- Increase `sineWaveFrequency` for smoother oscillation
- Use `'sinusoidal'` algorithm instead of `'square'`

---

## Summary

| Feature | Control | Effect |
|---------|---------|--------|
| **Wave Count** | `sineWaveCount` | Limit how many waves render (1-10 or all) |
| **Harmonics** | `sineWaveHarmonicRatios` | Make each wave oscillate at different frequencies |
| **Amplitude** | `enableSineWaveAmplitudeOscillation` + range | Wave width changes over time |
| **Amplitude Algorithm** | `sineWaveAmplitudeOscillationAlgorithm` | Control how amplitude changes (smooth, sharp, etc.) |

**Result**: Complete control over complex, musically-inspired sine wave animations! 🎵✨