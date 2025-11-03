# Phase Zero Implementation Guide

**Phase Zero**: Building and validating the base class foundation  
**Status**: Architecture complete, implementation ready  
**Goal**: Reduce code duplication by 60% and establish pattern for 5 new effects

---

## 📁 Project Structure

```
src/effects/
├── base/                              ← **NEW: Base classes**
│   ├── PhaseAnimatedPolygonEffect.js  (450 lines - core animation engine)
│   ├── PhaseAnimatedPolygonConfig.js  (180 lines - base configuration)
│   └── index.js                       (exports)
│
└── primaryEffects/
    ├── AnimatedTreeOfLife/            ← **TO REFACTOR: Use base class**
    │   ├── AnimatedKabbalisticTreeKeyFrameEffect.js
    │   ├── AnimatedTreeOfLifeConfig.js (extends base)
    │   ├── SephirothGeometry.js
    │   ├── [energy + symbol engines...]
    │   └── [other helpers...]
    │
    └── [Future effects will also extend base]
```

---

## 🎯 What the Base Class Provides

### ✅ Universal Functionality (No Code Duplication)

Every subclass **automatically gets**:

| Feature | Base Class Provides | Subclass Must Do |
|---------|-------------------|------------------|
| **4-Phase Animation** | Phase detection, progress normalization | (uses automatically) |
| **Smooth Transitions** | Cross-phase blending logic | Configure transition zones |
| **Progress Calculation** | getProgress() method | (uses automatically) |
| **Coordinate Transform** | Scale + center calculations | (uses automatically) |
| **Easing Functions** | 12+ easing functions | Specify easing per phase |
| **Canvas Rendering** | Lifecycle + rendering pipeline | (uses automatically) |
| **Color Extraction** | ColorPicker integration | Define color properties |
| **Energy Effects** | Optional integration points | Enable/configure |
| **Mystic Symbols** | Optional integration points | Enable/configure |

### ⚠️ What Subclasses Must Implement

```javascript
class YourEffect extends PhaseAnimatedPolygonEffect {
  getNodePositions() {
    // Return: [{ id, name, x, y, color?, metadata... }, ...]
    // Defines where nodes appear on canvas
  }

  getPathConnections() {
    // Return: [[0, 1], [1, 2], ...]
    // Defines which nodes connect to which
  }
}
```

---

## 🔄 Refactoring Tree of Life: Step-by-Step

### Step 1: Update Config to Extend Base Config

**File**: `src/effects/primaryEffects/AnimatedTreeOfLife/AnimatedTreeOfLifeConfig.js`

**Before** (current):
```javascript
import { EffectConfig } from 'my-nft-gen/src/core/layer/EffectConfig.js';

export class AnimatedTreeOfLifeConfig extends EffectConfig {
  constructor({
    phaseAwakening_start = 0.0,
    phaseAscension_start = 0.20,
    // ... 100+ lines of phase parameters
    branchColor = ...,
    accentColor = ...,
    // ... all base class params repeated
  }) { ... }
}
```

**After** (refactored):
```javascript
import { PhaseAnimatedPolygonConfig } from '../../base/PhaseAnimatedPolygonConfig.js';
import { ColorPicker } from 'my-nft-gen/src/core/layer/configType/ColorPicker.js';

export class AnimatedTreeOfLifeConfig extends PhaseAnimatedPolygonConfig {
  constructor({
    // Tree-specific parameters ONLY
    branchColor = new ColorPicker(ColorPicker.SelectionType.colorBucket),
    accentColor = new ColorPicker(ColorPicker.SelectionType.colorBucket),
    glowColor = new ColorPicker(ColorPicker.SelectionType.colorBucket),
    
    // All phase parameters inherited from base
    // All energy + symbol parameters inherited from base
    
    // Spread remaining to parent
    ...rest
  } = {}) {
    // Pass through all base parameters to parent
    super({ ...rest });
    
    // Store ONLY tree-specific parameters
    this.branchColor = branchColor;
    this.accentColor = accentColor;
    this.glowColor = glowColor;
  }
}
```

**Lines Removed**: ~80 (all phase + energy + symbol parameters)  
**Lines Added**: ~10  
**Net Reduction**: -70 lines

---

### Step 2: Update Effect to Extend Base Effect

**File**: `src/effects/primaryEffects/AnimatedTreeOfLife/AnimatedKabbalisticTreeKeyFrameEffect.js`

**Before** (current - 1378 lines):
```javascript
export class AnimatedKabbalisticTreeKeyFrameEffect extends LayerEffect {
  constructor({ ... }) {
    super({ ... });
    
    this.frameNumber = frameNumber;
    this.totalFrames = totalFrames;
    
    // Manually initialize engines
    this.animationEngine = new AnimationPhaseEngine(this.config);
    this.energyPulseEngine = new EnergyPulseEngine(this.config);
    this.mysticSymbolsEngine = new MysticSymbolsEngine(this.config);
  }
  
  // 200+ lines: getProgress(), getCurrentPhase(), getPhaseProgress()
  // 150+ lines: #transformCoordinate(), #lerp(), #applyEasing()
  // 400+ lines: rendering methods
}
```

**After** (refactored - ~600 lines):
```javascript
import { PhaseAnimatedPolygonEffect } from '../../base/PhaseAnimatedPolygonEffect.js';

export class AnimatedKabbalisticTreeKeyFrameEffect extends PhaseAnimatedPolygonEffect {
  // All lifecycle methods inherited from base
  // getProgress(), getCurrentPhase(), getPhaseProgress() - inherited
  // transformCoordinate(), lerp(), applyEasing() - inherited
  
  // ONLY implement the 2 abstract methods + tree-specific rendering
  
  getNodePositions() {
    // Return Sephiroth positions
    return Object.values(SEPHIROTH_POSITIONS);
  }

  getPathConnections() {
    // Return the 22 sacred paths
    return PATHS_CONNECTIONS.map(p => [p.start, p.end]);
  }

  // Override rendering for tree-specific features
  async #renderEffect(canvas, width, height, frameConfig, progress) {
    // Call parent for base rendering
    await super.#renderEffect(canvas, width, height, frameConfig, progress);
    
    // Add tree-specific rendering:
    // - Atmospheric fuzz
    // - Detailed geometry
    // - Energy pulse integration
    // - Symbol integration
  }
}
```

**Lines Removed**: ~780 (all base functionality)  
**Lines Added**: ~20 (geometry + overrides)  
**Net Reduction**: -760 lines (55% reduction!)

---

### Step 3: Move Shared Engines to Base (Optional)

Currently, EnergyPulseEngine and MysticSymbolsEngine are tree-specific. For maximum reuse:

**Option A: Keep Tree-Specific** (Recommended for now)
- Engines remain in AnimatedTreeOfLife/
- Config can tune behavior
- Faster refactor

**Option B: Move to Base** (Future enhancement)
- Create `src/effects/base/engines/`
- Move EnergyPulseEngine and MysticSymbolsEngine
- All effects get energy + symbols automatically
- ~2 more days of refactoring

**Recommendation**: Start with Option A, refactor engines in Phase 2.

---

## ✅ Validation Checklist

After refactoring, verify:

```
[ ] Tree of Life config extends PhaseAnimatedPolygonConfig
[ ] Tree of Life effect extends PhaseAnimatedPolygonEffect
[ ] getNodePositions() returns Sephiroth array
[ ] getPathConnections() returns path pairs
[ ] Test: Single frame render (frame 0)
[ ] Test: Multiple frames (10, 50, 100)
[ ] Test: Animation phases (check progress at key points)
[ ] Test: Smooth transitions (no jarring snaps)
[ ] Test: Worker threads (NODE_OPTIONS preload)
[ ] Compare output: Refactored = Original ✅
```

---

## 🧪 Testing Strategy

### Unit Tests (Create `__tests__/base/`)

```javascript
// Test 1: Phase detection
test('getCurrentPhase returns correct phase', () => {
  const effect = new TestEffect();
  expect(effect.getCurrentPhase(0.1)).toBe('awakening');
  expect(effect.getCurrentPhase(0.4)).toBe('ascension');
  expect(effect.getCurrentPhase(0.7)).toBe('radiance');
  expect(effect.getCurrentPhase(0.9)).toBe('descent');
});

// Test 2: Progress calculation
test('getProgress calculates correctly', () => {
  const effect = new TestEffect({ frameNumber: 25, totalFrames: 101 });
  expect(effect.getProgress()).toBeCloseTo(0.25, 2);
});

// Test 3: Phase progress normalization
test('getPhaseProgress normalizes within phase', () => {
  const effect = new TestEffect();
  const phaseProgress = effect.getPhaseProgress(0.4, 'ascension');
  expect(phaseProgress).toBeGreaterThanOrEqual(0);
  expect(phaseProgress).toBeLessThanOrEqual(1);
});

// Test 4: Coordinate transformation
test('transformCoordinate scales and centers', () => {
  const effect = new TestEffect({ 
    scale: 1.0, 
    centerX: 0.5, 
    centerY: 0.5 
  });
  const result = effect.transformCoordinate(0.5, 0.5, 1024, 1024);
  expect(result.x).toBe(512);
  expect(result.y).toBe(512);
});

// Test 5: Easing functions
test('easing functions return values 0-1', () => {
  const effect = new TestEffect();
  const eased = effect.applyEasing(0.5, 'easeInCubic');
  expect(eased).toBeGreaterThanOrEqual(0);
  expect(eased).toBeLessThanOrEqual(1);
});
```

### Integration Tests

```bash
# Test 1: Render single frame
node scripts/testAnimatedTreeOfLife.js

# Test 2: Render animation sequence
NODE_OPTIONS="--require ./scripts/nftPluginPreload.cjs" \
node scripts/renderTestLoopDirect.js --effect animated-tree-of-life --frames 10

# Test 3: Compare before/after
# Render with old code, then with new code
# Verify pixel output is identical
```

---

## 🎯 Next Steps (Immediate Action Items)

### This Week (Days 1-2):
- ✅ Base class implementation (DONE)
- [ ] Refactor AnimatedTreeOfLifeConfig to extend PhaseAnimatedPolygonConfig
- [ ] Refactor AnimatedKabbalisticTreeKeyFrameEffect to extend PhaseAnimatedPolygonEffect
- [ ] Run validation tests
- [ ] Verify Tree of Life renders identically

### This Week (Days 3-4):
- [ ] Create unit tests for base class
- [ ] Create integration tests with Tree of Life
- [ ] Document patterns in code comments
- [ ] Update plugin.js exports if needed

### Next Week (Days 5+):
- [ ] Create first new effect (Chakra Mandala)
- [ ] Use base class for Chakra
- [ ] Verify Chakra works with base class
- [ ] If successful: Proceed to remaining effects

---

## 💡 Key Insights

### Why This Pattern Works

1. **Abstract Methods**: Force geometry contract while allowing flexibility
2. **Inheritance**: 60% code reuse without duplication
3. **Lazy Initialization**: Engines only loaded when needed (worker thread safe)
4. **Configuration Inheritance**: Each effect extends base config naturally
5. **Rendering Hooks**: Subclasses can override rendering for specific needs

### Common Pitfalls to Avoid

❌ **Don't**: Copy-paste methods into subclass  
✅ **Do**: Call parent methods or override intentionally

❌ **Don't**: Repeat phase parameters in each config  
✅ **Do**: Inherit from PhaseAnimatedPolygonConfig

❌ **Don't**: Initialize engines in constructor  
✅ **Do**: Lazy-init in invoke() for worker thread safety

❌ **Don't**: Hardcode geometry in effect  
✅ **Do**: Return from getNodePositions() / getPathConnections()

---

## 📚 Architecture Docs to Reference

- **BASE_CLASS_ARCHITECTURE.md** - Technical deep-dive (you're reading it!)
- **PROJECT_PLANS.md** - Individual effect specifications
- **EXPANSION_ROADMAP.md** - 4-week sprint breakdown

---

## ✨ Success Criteria

**Phase Zero is complete when**:

✅ Base class exists and is well-documented  
✅ Tree of Life successfully refactored to use base  
✅ Output before/after is identical  
✅ All validation tests pass  
✅ First new effect (Chakra Mandala) built with base  
✅ Can create new effects 60% faster than before  

**Estimated Effort**: 5-7 days (including Tree refactor + testing + 1 new effect)
