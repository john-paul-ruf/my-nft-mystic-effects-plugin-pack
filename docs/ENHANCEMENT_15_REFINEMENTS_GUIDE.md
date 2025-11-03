# Enhancement 15 Refinements - User Guide

**Quick Navigation**:
- [What Changed](#what-changed)
- [Why It Matters](#why-it-matters)
- [Usage Examples](#usage-examples)
- [Backward Compatibility](#backward-compatibility)
- [Best Practices](#best-practices)

---

## What Changed

### Change #1: Sine Wave Colors Now Use Color Pickers

**Why**: Consistency with `chakraColorOverride` - allows UI integration and more flexible color control

**Now Supports Both**:

```javascript
// Option A: Simple string (NEW - now works!)
{
  sineWaveColor: '#9b59b6',
  sineWaveFuzzColor: '#c8a2e0',
}

// Option B: ColorPicker object (also works!)
{
  sineWaveColor: new ColorPicker(ColorPicker.SelectionType.colorBucket),
  sineWaveFuzzColor: new ColorPicker(ColorPicker.SelectionType.colorBucket),
}

// Option C: Mix both (also works!)
{
  sineWaveColor: '#9b59b6',  // String works
  sineWaveFuzzColor: new ColorPicker(...),  // ColorPicker also works
}
```

---

### Change #2: Algorithms Now Support Arrays

**Why**: Each render can use different algorithms for more dynamic, varied visuals

**Now Supports Both**:

```javascript
// Option A: Single algorithm (consistent)
{
  sineWaveOpacityFindValueAlgorithm: 'sinusoidal',
  sineWaveBlurFindValueAlgorithm: 'sinusoidal',
  sineWaveAccentFindValueAlgorithm: 'sinusoidal',
  sineWaveAmplitudeOscillationAlgorithm: 'sinusoidal',
}

// Option B: Array of algorithms (random per render - NEW!)
{
  sineWaveOpacityFindValueAlgorithm: ['sinusoidal', 'square', 'sawtooth'],
  sineWaveBlurFindValueAlgorithm: ['sinusoidal', 'square', 'sawtooth'],
  sineWaveAccentFindValueAlgorithm: ['sinusoidal', 'square', 'sawtooth'],
  sineWaveAmplitudeOscillationAlgorithm: ['sinusoidal', 'square', 'sawtooth'],
}

// Option C: Mix both (each parameter can be string or array)
{
  sineWaveOpacityFindValueAlgorithm: 'sinusoidal',  // Always smooth
  sineWaveBlurFindValueAlgorithm: ['sinusoidal', 'square'],  // Random
  sineWaveAccentFindValueAlgorithm: 'square',  // Always sharp
  sineWaveAmplitudeOscillationAlgorithm: ['sinusoidal', 'sawtooth'],  // Random
}
```

---

## Why It Matters

### 1. Simpler Documentation Examples
**Before**: Documentation had to show `new ColorPicker()` in every example  
**After**: Examples can use simple strings `'#9b59b6'`

### 2. More Visual Variety
**Before**: All waves used same oscillation algorithm  
**After**: Mix different algorithms for dynamic effects

### 3. UI Integration
**Before**: Colors were hardcoded, couldn't be changed in UI  
**After**: Colors can be controlled through UI color picker

### 4. Flexibility
**Before**: Pick one way to configure something  
**After**: Multiple ways work - pick what fits your use case

### 5. Consistency
**Before**: Color controls different from other configs  
**After**: Same pattern as `chakraColorOverride`, `layerBlendMode`, etc.

---

## Usage Examples

### Example 1: Simple Beginner Setup
```javascript
new ChakraMandalaConfig({
  enableVerticalSineWaves: true,
  
  // Simple colors (now works!)
  sineWaveColor: '#9b59b6',
  sineWaveFuzzColor: '#c8a2e0',
  
  // Simple algorithms (consistent)
  sineWaveOpacityFindValueAlgorithm: 'sinusoidal',
  sineWaveBlurFindValueAlgorithm: 'sinusoidal',
  sineWaveAccentFindValueAlgorithm: 'sinusoidal',
  sineWaveAmplitudeOscillationAlgorithm: 'sinusoidal',
  
  sineWaveCount: 3,
  sineWaveHarmonicRatios: [1, 2, 3],
})
```

### Example 2: Dynamic Visual Variety
```javascript
new ChakraMandalaConfig({
  enableVerticalSineWaves: true,
  
  // UI-controlled colors
  sineWaveColor: new ColorPicker(ColorPicker.SelectionType.colorBucket),
  sineWaveFuzzColor: new ColorPicker(ColorPicker.SelectionType.colorBucket),
  
  // Mix algorithms for visual interest
  sineWaveOpacityFindValueAlgorithm: ['sinusoidal', 'square'],  // Random smooth or sharp
  sineWaveBlurFindValueAlgorithm: ['sinusoidal', 'sawtooth'],   // Random smooth or rising
  sineWaveAccentFindValueAlgorithm: ['square', 'sawtooth'],     // Random sharp or rising
  sineWaveAmplitudeOscillationAlgorithm: ['sinusoidal'],        // Always smooth breath
  
  sineWaveCount: 5,
  sineWaveHarmonicRatios: [1, 1.5, 2, 2.5, 3],
})
```

### Example 3: Extreme Energy Randomization
```javascript
new ChakraMandalaConfig({
  enableVerticalSineWaves: true,
  
  // Random colors from user selection
  sineWaveColor: new ColorPicker(ColorPicker.SelectionType.randomColor),
  sineWaveFuzzColor: new ColorPicker(ColorPicker.SelectionType.randomColor),
  
  // Every oscillation type is random
  sineWaveOpacityFindValueAlgorithm: ['sinusoidal', 'square', 'sawtooth'],
  sineWaveBlurFindValueAlgorithm: ['sinusoidal', 'square', 'sawtooth'],
  sineWaveAccentFindValueAlgorithm: ['sinusoidal', 'square', 'sawtooth'],
  sineWaveAmplitudeOscillationAlgorithm: ['sinusoidal', 'square', 'sawtooth'],
  
  sineWaveCount: null,  // Show all waves
  sineWaveHarmonicRatios: [1, 2, 4, 8, 16],  // Exponential growth
})
```

### Example 4: Musical Consistency
```javascript
new ChakraMandalaConfig({
  enableVerticalSineWaves: true,
  
  // Fixed colors for predictable output
  sineWaveColor: '#e74c3c',      // Red
  sineWaveFuzzColor: '#ecf0f1',  // White
  
  // Fixed algorithms for musical consistency
  sineWaveOpacityFindValueAlgorithm: 'sinusoidal',
  sineWaveBlurFindValueAlgorithm: 'sinusoidal',
  sineWaveAccentFindValueAlgorithm: 'sinusoidal',
  sineWaveAmplitudeOscillationAlgorithm: 'sinusoidal',
  
  // Perfect musical intervals
  sineWaveCount: 4,
  sineWaveHarmonicRatios: [1, 1.5, 2, 2.5],
})
```

---

## Backward Compatibility

✅ **100% Backward Compatible**

All existing code continues to work without modification:

```javascript
// This still works exactly as before
new ChakraMandalaConfig({
  sineWaveColor: '#9b59b6',
  sineWaveOpacityFindValueAlgorithm: 'sinusoidal',
  // ... rest of config
})

// AND now you can also do these new things:
new ChakraMandalaConfig({
  sineWaveColor: new ColorPicker(...),  // NEW
  sineWaveOpacityFindValueAlgorithm: ['sinusoidal', 'square'],  // NEW
  // ... rest of config
})
```

---

## Best Practices

### ✅ DO: Mix Strings and ColorPickers
```javascript
// This is perfectly fine and readable
{
  sineWaveColor: '#9b59b6',  // Use what makes sense
  sineWaveFuzzColor: new ColorPicker(...),  // UI control
}
```

### ✅ DO: Use Arrays for UI Randomization
```javascript
// Let users see different variations each render
{
  sineWaveOpacityFindValueAlgorithm: ['sinusoidal', 'square', 'sawtooth'],
}
```

### ✅ DO: Use Single Values for Consistency
```javascript
// When you need predictable output
{
  sineWaveOpacityFindValueAlgorithm: 'sinusoidal',
}
```

### ❌ DON'T: Mix Invalid Types
```javascript
// Don't do this - use proper types
{
  sineWaveColor: 123,  // ❌ Not a valid color
  sineWaveOpacityFindValueAlgorithm: { custom: 'value' },  // ❌ Invalid
}
```

### ❌ DON'T: Use Unsupported Algorithms
```javascript
// Valid algorithms are: 'sinusoidal', 'square', 'sawtooth'
{
  sineWaveOpacityFindValueAlgorithm: ['sinusoidal', 'invalid'],  // ❌ Error
}
```

---

## Algorithm Guide

### Sinusoidal (Smooth Breathing)
```javascript
sineWaveOpacityFindValueAlgorithm: 'sinusoidal'
```
**Visual**: Smooth wave, like breathing - great for meditative feels  
**Use When**: You want smooth, organic motion

### Square (Sharp Pulse)
```javascript
sineWaveOpacityFindValueAlgorithm: 'square'
```
**Visual**: On/off heartbeat pulse - sharp and energetic  
**Use When**: You want strong, defined beats

### Sawtooth (Rising & Dropping)
```javascript
sineWaveOpacityFindValueAlgorithm: 'sawtooth'
```
**Visual**: Rises smoothly, drops suddenly - building energy  
**Use When**: You want dramatic buildup and release

---

## Troubleshooting

### Colors Not Showing?
**Check**: Do you have `enableVerticalSineWaves: true`?
```javascript
{
  enableVerticalSineWaves: true,  // ← Must be true
  sineWaveColor: '#9b59b6',
}
```

### Colors All Wrong?
**Check**: Are your color values valid hex?
```javascript
{
  sineWaveColor: '#9b59b6',  // ✅ Valid
  sineWaveColor: '9b59b6',   // ❌ Missing #
  sineWaveColor: '#9b59b',   // ❌ Too short
}
```

### Algorithms Not Changing?
**Check**: Did you use an array?
```javascript
{
  sineWaveOpacityFindValueAlgorithm: ['sinusoidal', 'square'],  // ✅ Random
  sineWaveOpacityFindValueAlgorithm: 'sinusoidal',  // ❌ Always same
}
```

---

## API Reference

### Color Parameters
| Parameter | Type | Default | Options |
|-----------|------|---------|---------|
| `sineWaveColor` | ColorPicker\|string | ColorPicker | Any hex color or ColorPicker |
| `sineWaveFuzzColor` | ColorPicker\|string | ColorPicker | Any hex color or ColorPicker |

### Algorithm Parameters
| Parameter | Type | Default | Options |
|-----------|------|---------|---------|
| `sineWaveOpacityFindValueAlgorithm` | string\|Array<string> | `['sinusoidal', 'square', 'sawtooth']` | `'sinusoidal'` \| `'square'` \| `'sawtooth'` |
| `sineWaveBlurFindValueAlgorithm` | string\|Array<string> | `['sinusoidal', 'square', 'sawtooth']` | `'sinusoidal'` \| `'square'` \| `'sawtooth'` |
| `sineWaveAccentFindValueAlgorithm` | string\|Array<string> | `['sinusoidal', 'square', 'sawtooth']` | `'sinusoidal'` \| `'square'` \| `'sawtooth'` |
| `sineWaveAmplitudeOscillationAlgorithm` | string\|Array<string> | `['sinusoidal', 'square', 'sawtooth']` | `'sinusoidal'` \| `'square'` \| `'sawtooth'` |

---

## Summary

| Feature | Before | After | Benefit |
|---------|--------|-------|---------|
| **Color Control** | Hardcoded strings only | String or ColorPicker | UI integration + flexibility |
| **Algorithms** | Single value per parameter | String or array | Per-render variation + consistency |
| **Documentation** | Complex ColorPicker examples | Simple string examples | Easier to learn |
| **Backward Compat** | N/A | ✅ 100% compatible | No migration needed |

---

**Ready to use!** Pick the style that works for your effect. 🎵✨