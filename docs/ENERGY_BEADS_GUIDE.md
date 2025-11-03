# Energy Beads Configuration Guide

## Overview
Energy beads orbit the mandala rings with perfect loop synchronization (frame 0 = frame N-1). Each bead moves smoothly around the selected ring layers with optional pulsing effects.

## Configuration Parameters

### Enable/Disable
```javascript
enableEnergyBeads: true  // Enable/disable energy beads (default: true)
```

### Bead Count & Size
```javascript
energyBeadCount: 8           // Number of beads per ring (1-24, default: 8)
energyBeadRadius: 6          // Bead size in pixels (default: 6)
```

### Visual Properties
```javascript
energyBeadColor: new ColorPicker(ColorPicker.SelectionType.colorBucket)  // Bead color picker
energyBeadOpacity: 0.8                    // Opacity 0-1 (default: 0.8)
energyBeadGlowIntensity: 1.2              // Glow multiplier (default: 1.2)
```

### Motion & Speed
```javascript
energyBeadSpeed: 1.0        // Orbital speed multiplier (default: 1.0)
                            // 0.5 = half speed, 2.0 = double speed
```

### Ring Selection
```javascript
energyBeadRingLayer: 1      // Which ring layer to use:
                            // 0 = inner ring (closest to chakra)
                            // 1 = middle ring (default)
                            // 2 = outer ring (farthest)
                            // -1 = all rings (beads on every layer)
```

### Pulsing Effects
```javascript
energyBeadPulseEnabled: true                               // Enable size pulsing
energyBeadPulseRange: { lower: 0.7, upper: 1.3 }         // Size multiplier range (0.7x to 1.3x default)
```

## Usage Examples

### Example 1: Classic Single-Ring Orbit
```javascript
new ChakraMandalaConfig({
  enableEnergyBeads: true,
  energyBeadCount: 12,              // 12 beads per chakra
  energyBeadRadius: 5,
  energyBeadColor: '#64C8FF',       // Cyan blue
  energyBeadOpacity: 0.9,
  energyBeadRingLayer: 1,           // Middle ring
  energyBeadSpeed: 1.0,
})
```

### Example 2: Fast-Moving Outer Ring
```javascript
new ChakraMandalaConfig({
  enableEnergyBeads: true,
  energyBeadCount: 16,
  energyBeadRadius: 4,
  energyBeadColor: '#FF00FF',       // Magenta
  energyBeadRingLayer: 2,           // Outer ring only
  energyBeadSpeed: 2.5,             // 2.5x speed
  energyBeadPulseEnabled: true,
  energyBeadPulseRange: { lower: 0.5, upper: 1.5 }
})
```

### Example 3: Multi-Ring Constellation
```javascript
new ChakraMandalaConfig({
  enableEnergyBeads: true,
  energyBeadCount: 8,
  energyBeadRadius: 6,
  energyBeadColor: '#FFD700',       // Gold
  energyBeadRingLayer: -1,          // All rings!
  energyBeadSpeed: 1.0,
  energyBeadGlowIntensity: 1.5,     // Brighter glow
})
```

### Example 4: Pulsing Slow Orbit
```javascript
new ChakraMandalaConfig({
  enableEnergyBeads: true,
  energyBeadCount: 6,
  energyBeadRadius: 8,
  energyBeadColor: new ColorPicker(ColorPicker.SelectionType.colorBucket),  // UI color picker
  energyBeadOpacity: 0.7,
  energyBeadRingLayer: 1,
  energyBeadSpeed: 0.3,             // Slow orbit
  energyBeadPulseEnabled: true,
  energyBeadPulseRange: { lower: 0.6, upper: 1.4 }
})
```

## Perfect Loop Guarantee

The energy beads use mathematical sine/cosine phase calculations to ensure:
- **Frame 0 position** = **Frame N-1 position** (seamless loop)
- Smooth orbital motion with no jerky transitions
- Consistent pulsing synchronized across the animation cycle

## Performance

- **Overhead**: ~1-2% per frame (minimal)
- **Scaling**: Efficient even with maximum beads per ring
- **Hardware Accelerated**: Full Canvas2dFactory support

## Tips & Tricks

1. **Color Coordination**: Match `energyBeadColor` to chakra or other effect colors for visual harmony
2. **Speed Variation**: Use speeds like 0.5, 1.0, 1.5, 2.0, 3.0 for musical/harmonic ratios
3. **Bead Count**: Even numbers (6, 8, 12, 16) look more symmetrical
4. **Multi-Ring Effect**: Set `energyBeadRingLayer: -1` with lower `energyBeadCount` (6-8) for dense constellation effect
5. **Glow Intensity**: Higher values (1.5-2.0) create more mystical appearance; lower values (0.5-0.8) for subtle effect

## Troubleshooting

- **Beads not visible?** Check `enableEnergyBeads: true` and `energyBeadOpacity > 0`
- **Too many beads?** Reduce `energyBeadCount` or increase `energyBeadRadius` spacing
- **Performance issues?** Use single ring (`energyBeadRingLayer: 1`) instead of all rings
- **Looking too subtle?** Increase `energyBeadOpacity` or `energyBeadGlowIntensity`