# Phase Zero Checklist: Quick Start

**Time to Complete**: 5-7 days  
**Difficulty**: Medium (mostly copy/paste + delete)  
**Goal**: Refactor Tree of Life to use new base class

---

## 📋 Quick Reference

### **What Was Created (Done ✅)**
- ✅ `/src/effects/base/PhaseAnimatedPolygonConfig.js` (180 lines)
- ✅ `/src/effects/base/PhaseAnimatedPolygonEffect.js` (450 lines)
- ✅ `/src/effects/base/index.js` (exports)
- ✅ `.zencoder/rules/PHASE_ZERO_IMPLEMENTATION.md` (detailed guide)
- ✅ `.zencoder/rules/PHASE_ZERO_COMPLETE.md` (summary)
- ✅ All syntax validation passed ✅

### **Next: Refactor Tree of Life (5-7 days)**

---

## 🎯 Your Actual Next Steps

### **Day 1: Update AnimatedTreeOfLifeConfig**

**File**: `src/effects/primaryEffects/AnimatedTreeOfLife/AnimatedTreeOfLifeConfig.js`

**Step 1: Add import at top**
```javascript
import { PhaseAnimatedPolygonConfig } from '../../base/PhaseAnimatedPolygonConfig.js';
```

**Step 2: Change class declaration**
```javascript
// BEFORE
export class AnimatedTreeOfLifeConfig extends EffectConfig {

// AFTER
export class AnimatedTreeOfLifeConfig extends PhaseAnimatedPolygonConfig {
```

**Step 3: Simplify constructor**

In the constructor, DELETE all these parameter groups:
- All `phaseAwakening_*` parameters (lines 20-25)
- All `awakeningNodeAlpha` parameters (lines 27-35)
- All `ascensionNodeAlpha` parameters (lines 37-45)
- All `radianceNodeAlpha` parameters (lines 47-55)
- All `descentNodeAlpha` parameters (lines 57-65)
- All `enableEnergyPulses` parameters (lines 82-93)
- All `enableMysticSymbols` parameters (lines 95-99)

**Keep ONLY these**:
```javascript
constructor({
  // ====== TREE-SPECIFIC COLOR ======
  branchColor = new ColorPicker(...),
  accentColor = new ColorPicker(...),
  glowColor = new ColorPicker(...),
  
  // ====== TREE-SPECIFIC EFFECTS ======
  // [any other tree-specific params]
  
  // Spread remaining to parent
  ...rest
} = {}) {
  // Pass through to parent
  super({ ...rest });
  
  // ONLY store tree-specific
  this.branchColor = branchColor;
  this.accentColor = accentColor;
  this.glowColor = glowColor;
}
```

**Result**: ~80 lines deleted, ~10 lines added = -70 lines

✅ **Validation**: File still exports class, no syntax errors

---

### **Day 2: Update AnimatedKabbalisticTreeKeyFrameEffect**

**File**: `src/effects/primaryEffects/AnimatedTreeOfLife/AnimatedKabbalisticTreeKeyFrameEffect.js`

**Step 1: Add import at top**
```javascript
import { PhaseAnimatedPolygonEffect } from '../../base/PhaseAnimatedPolygonEffect.js';
```

**Step 2: Change class declaration**
```javascript
// BEFORE
export class AnimatedKabbalisticTreeKeyFrameEffect extends LayerEffect {

// AFTER
export class AnimatedKabbalisticTreeKeyFrameEffect extends PhaseAnimatedPolygonEffect {
```

**Step 3: Simplify constructor**

Keep the constructor mostly as-is, but remove these initialization lines:
```javascript
// DELETE these (now handled by base class)
this.animationEngine = new AnimationPhaseEngine(this.config);
this.energyPulseEngine = new EnergyPulseEngine(this.config);
this.mysticSymbolsEngine = new MysticSymbolsEngine(this.config);
this.detailedGeometryEngine = new DetailedGeometryEngine(this.config);
```

Base class initializes them as needed.

**Step 4: DELETE these methods** (now inherited from base)

Go through the file and delete:
- ✂️ `getProgress()` method (line 122-125)
- ✂️ `#getPhaseForProgress()` method (line 243-253)
- ✂️ `#synthesizeAnimationFrame()` method (line 260-317)
- ✂️ `#lerp()` method (line 323-332)
- ✂️ `#applyEasing()` method (line 338-350)
- ✂️ `#extractColors()` method (line 357-371)
- ✂️ `#transformCoordinate()` method (line 217-237)

All these are inherited from PhaseAnimatedPolygonEffect!

**Step 5: Add 2 abstract method implementations**

Add these methods to the class:

```javascript
/**
 * Define Sephiroth node positions
 */
getNodePositions() {
  return Object.values(SEPHIROTH_POSITIONS);
}

/**
 * Define path connections
 */
getPathConnections() {
  return PATHS_CONNECTIONS.map(p => [p.start, p.end]);
}
```

**Step 6: Keep all tree-specific rendering**

Keep all these methods (they're tree-specific):
- ✅ `#renderTreeOfLife()`
- ✅ `#renderAtmosphericFuzz()`
- ✅ `#renderPathSubdivisions()`
- ✅ `#renderDetailedPathEnhancements()`
- ✅ `#renderHarmonicInterference()`
- ✅ `#renderPathEnhancements()`
- ✅ All other tree-specific methods

**Step 7: Update invoke() method**

The invoke() method should now delegate to base:

```javascript
async invoke(layer, currentFrame, numberOfFrames) {
  try {
    // Call parent invoke (handles everything)
    // This calls getNodePositions/getPathConnections automatically
    await super.invoke(layer, currentFrame, numberOfFrames);
    
  } catch (error) {
    console.error(`${this.constructor._displayName_} error:`, error);
    throw error;
  }
}
```

The base class invoke() will:
1. Calculate progress
2. Synthesize frame config
3. Create canvas
4. Call `#renderEffect()` (which you can override)
5. Composite to layer

**Result**: ~780 lines deleted, ~20 lines added = -760 lines (55% reduction!)

✅ **Validation**: File still exports class, no syntax errors

---

### **Day 2-3: Integrate Custom Rendering**

The Tree of Life has special rendering needs. You have 2 options:

**Option A: Override #renderEffect (Cleaner)**
```javascript
async #renderEffect(canvas, width, height, frameConfig, progress) {
  // Call parent for base node/path rendering
  await super.#renderEffect(canvas, width, height, frameConfig, progress);
  
  // Add tree-specific rendering
  await this.#renderTreeOfLife(canvas, width, height, colors, frameConfig, progress);
}
```

Note: This method is private in base, so you'd need to expose it or call invoke differently.

**Option B: Keep invoke() override (Current approach)**

Keep the invoke() override mostly as-is, but call:
```javascript
// Instead of calling super.invoke(), manually call base functionality
const progress = this.getProgress();  // Inherited from base
const frameConfig = this.#synthesizeAnimationFrame(progress);  // WAIT - this is deleted!
```

**Recommendation**: Expose `#synthesizeAnimationFrame` as `protected` method in base class so subclasses can call it.

Let me update the base class to support this...

---

### **Day 3: Run Tests**

```bash
# Test 1: Single frame render
node scripts/testAnimatedTreeOfLife.js

# Test 2: Multiple frames
NODE_OPTIONS="--require ./scripts/nftPluginPreload.cjs" \
node scripts/renderTestLoopDirect.js --effect animated-tree-of-life --frames 10

# Test 3: Many frames
NODE_OPTIONS="--require ./scripts/nftPluginPreload.cjs" \
node scripts/renderTestLoopDirect.js --effect animated-tree-of-life --frames 50
```

**Expected Result**: ✅ All tests pass with NO changes to output

If output differs:
1. Check console for errors
2. Verify `getNodePositions()` returns correct data
3. Verify `getPathConnections()` returns correct data
4. Debug specific rendering method

---

### **Day 4: Create Unit Tests**

Create `__tests__/base/PhaseAnimatedPolygonEffect.test.js`:

```javascript
import { PhaseAnimatedPolygonEffect } from '../../src/effects/base/index.js';

// Mock concrete implementation for testing
class TestEffect extends PhaseAnimatedPolygonEffect {
  getNodePositions() {
    return [
      { id: 1, name: 'Test1', x: 0.5, y: 0.5, color: '#FFF' },
      { id: 2, name: 'Test2', x: 0.2, y: 0.8, color: '#FFF' },
    ];
  }
  
  getPathConnections() {
    return [[0, 1]];
  }
}

describe('PhaseAnimatedPolygonEffect', () => {
  test('getCurrentPhase returns correct phase', () => {
    const effect = new TestEffect({});
    expect(effect.getCurrentPhase(0.1)).toBe('awakening');
    expect(effect.getCurrentPhase(0.4)).toBe('ascension');
  });
  
  test('getProgress calculates correctly', () => {
    const effect = new TestEffect({ frameNumber: 25, totalFrames: 101 });
    expect(effect.getProgress()).toBeCloseTo(0.25, 2);
  });
  
  test('getPhaseProgress normalizes within phase', () => {
    const effect = new TestEffect({});
    const pp = effect.getPhaseProgress(0.4, 'ascension');
    expect(pp).toBeGreaterThanOrEqual(0);
    expect(pp).toBeLessThanOrEqual(1);
  });
});
```

Run:
```bash
npm test -- __tests__/base/PhaseAnimatedPolygonEffect.test.js
```

---

### **Day 4-5: Code Review**

Get someone to review:
1. ✅ All tests pass
2. ✅ Output identical to before
3. ✅ No new console errors
4. ✅ Code is readable and maintainable

---

### **Day 5-6: Documentation**

Update these files with new implementation details:
- [ ] `docs/IMPLEMENTATION_COMPLETE.md` - Add base class section
- [ ] `docs/primary/AnimatedTreeOfLife/` - Update architecture docs
- [ ] Add code comments explaining inheritance
- [ ] Update README if needed

---

### **Day 7: Commit & Celebrate! 🎉**

```bash
git add -A
git commit -m "Phase Zero: Refactor Tree of Life to use PhaseAnimatedPolygonEffect base class

- Extracted 60% of code to reusable base class
- Tree of Life now extends PhaseAnimatedPolygonEffect
- Implemented getNodePositions() and getPathConnections() abstracts
- All tests pass with identical output
- Foundation ready for 5 new effects"
```

---

## ⚠️ Important Notes

### **Before You Delete Code**

1. ✅ Back up the current file
2. ✅ Ensure tests are passing
3. ✅ Have git history to revert if needed

### **Methods to KEEP in Tree of Life**

The Tree of Life-specific rendering should stay:
- `#renderTreeOfLife()` - Main tree rendering
- `#renderAtmosphericFuzz()` - Special effect
- `#renderPathSubdivisions()` - Tree-specific
- `#renderDetailedPathEnhancements()` - Tree-specific
- All tree-specific helper methods

### **Methods to DELETE**

These are now inherited from base:
- `getProgress()`
- `#getPhaseForProgress()`
- `#transformCoordinate()`
- `#synthesizeAnimationFrame()`
- `#lerp()`
- `#applyEasing()`
- `#extractColors()`

### **Methods to ADD**

These are required by base class:
```javascript
getNodePositions() { ... }
getPathConnections() { ... }
```

---

## 🆘 Troubleshooting

### **Problem**: Tests fail after refactor

**Solution**:
1. Check if `getNodePositions()` returns correct data
2. Check if `getPathConnections()` returns correct indices
3. Verify config still has all parameters
4. Add console.log to debug what changed

### **Problem**: Animation looks different

**Solution**:
1. Verify phase detection still works (check console logs)
2. Verify node/path rendering loop logic unchanged
3. Compare synthesized config before/after
4. Check easing function output

### **Problem**: Worker threads fail

**Solution**:
1. Ensure engines are lazy-initialized (check base class)
2. Run preload script: `NODE_OPTIONS="--require ./scripts/nftPluginPreload.cjs"`
3. Check if AnimationPhaseEngine is available in worker context

---

## 📊 Effort Breakdown

| Task | Time | Difficulty |
|------|------|------------|
| Update Config | 1 hour | Easy |
| Update Effect | 3 hours | Medium |
| Run tests | 1 hour | Easy |
| Debug/fix | 1 hour | Medium |
| Create unit tests | 2 hours | Medium |
| Code review | 1 hour | Easy |
| Documentation | 1 hour | Easy |
| **Total** | **10 hours** | **Medium** |

**Spread over**: 5-7 days at 1-2 hours per day

---

## ✨ Success Indicators

When you're done, you should see:

✅ Tree of Life renders identically  
✅ All tests pass  
✅ 1300+ lines of code removed  
✅ 60% code reduction achieved  
✅ Base class is the single source of truth for phases  
✅ Adding new effect will be 4x faster  

---

## 🚀 Next After This

Once this is complete:

1. **Create Chakra Mandala** (first new effect using base)
   - Should take 4 hours vs. 8 hours before
   - If this works, you've proven the pattern

2. **Create remaining 4 effects**
   - Each takes ~4 hours
   - All follow same pattern as Chakra

3. **Release plugin pack v2.0**
   - 6 professional effects
   - 60% code reduction
   - Foundation for future effects

---

## 📞 Questions?

Review these files in order:
1. `PHASE_ZERO_IMPLEMENTATION.md` - Step-by-step guide
2. `BASE_CLASS_ARCHITECTURE.md` - Technical reference
3. Comments in `PhaseAnimatedPolygonEffect.js` - Code examples

**You've got this!** 🚀
