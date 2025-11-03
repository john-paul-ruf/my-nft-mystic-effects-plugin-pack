# PhaseAnimatedPolygonEffect: Architecture Reference

**Purpose**: Technical blueprint for implementing the base class  
**Audience**: You (implementing) + future developers extending it  
**Status**: Ready for implementation

---

## 🏗️ Class Hierarchy

```javascript
// my-nft-gen framework
LayerEffect (abstract base from framework)
    ↓
    ├─ YourEffect (typical effect)
    │
    └─ PhaseAnimatedPolygonEffect (NEW - our base class)
        │
        ├─ AnimatedKabbalisticTreeKeyFrameEffect ✅ (refactored)
        ├─ ChakraMandalaEffect (NEW)
        ├─ HermeticAlchemyEffect (NEW)
        ├─ CelestialSphereEffect (NEW)
        ├─ FibonacciSpiralEffect (NEW)
        └─ RunicCircleEffect (NEW)
```

---

## 📋 Core Methods & Contracts

### **Lifecycle Methods** (Inherited from LayerEffect)

```javascript
constructor({ name, config, settings } = {}) {
  super({ name, config, settings });
  
  // Initialize phase engine
  this.animationEngine = new AnimationPhaseEngine(this.config);
  
  // Initialize energy engines (optional)
  this.energyPulseEngine = null;    // Lazy-init in invoke()
  this.mysticSymbolsEngine = null;
  
  // Pre-generate base data if needed
  this.#generate();
}

/**
 * Pre-generation hook (called once in constructor)
 * Subclasses can override to pre-compute geometry
 */
#generate() {
  // Default: nothing. Subclasses can override if needed.
}

/**
 * Main render entry point
 * Called ONCE per frame by my-nft-gen
 */
async invoke(layer, currentFrame, numberOfFrames) {
  try {
    // Update frame tracking
    this.frameNumber = currentFrame;
    this.totalFrames = numberOfFrames;
    
    // Get progress (0-1, perfect loop)
    const progress = this.getProgress();
    
    // Calculate phase-specific config
    const frameConfig = this.#synthesizeAnimationFrame(progress);
    
    // Render effect
    await this.#renderEffect(layer, frameConfig, progress);
    
    // Call parent for effect chaining
    await super.invoke(layer, currentFrame, numberOfFrames);
    
  } catch (error) {
    console.error(`${this.constructor._displayName_} error:`, error);
    throw error;
  }
}
```

---

### **Pure Function Pattern**

```javascript
/**
 * Calculate animation progress (0→1 for perfect looping)
 * CRITICAL: Uses frame/(totalFrames-1) NOT frame/totalFrames
 */
getProgress() {
  if (this.totalFrames <= 1) return 0;
  return this.frameNumber / (this.totalFrames - 1);
}

/**
 * Detect which animation phase we're in
 */
getCurrentPhase(progress) {
  const awakeStart = this.config.phaseAwakening_start ?? 0.0;
  const ascStart = this.config.phaseAscension_start ?? 0.20;
  const radStart = this.config.phaseRadiance_start ?? 0.60;
  const descStart = this.config.phaseDescentstart ?? 0.85;
  
  if (progress < ascStart) return 'awakening';
  if (progress < radStart) return 'ascension';
  if (progress < descStart) return 'radiance';
  return 'descent';
}

/**
 * Normalize progress to phase boundaries (0→1 within phase)
 */
getPhaseProgress(progress, phase) {
  const boundaries = {
    awakening: [0.0, this.config.phaseAscension_start ?? 0.20],
    ascension: [this.config.phaseAscension_start ?? 0.20, this.config.phaseRadiance_start ?? 0.60],
    radiance: [this.config.phaseRadiance_start ?? 0.60, this.config.phaseDescentstart ?? 0.85],
    descent: [this.config.phaseDescentstart ?? 0.85, 1.0]
  };
  
  const [start, end] = boundaries[phase];
  if (start === end) return 0;
  return (progress - start) / (end - start);
}
```

---

### **Abstract Methods** (Subclasses MUST implement)

```javascript
/**
 * Define node positions for this geometry
 * 
 * @returns {Array<{id, name, x, y, metadata...}>}
 *   - id: unique node identifier
 *   - name: human-readable name
 *   - x, y: normalized coordinates (0-1)
 *   - metadata: any additional properties (color, activation_order, etc.)
 * 
 * EXAMPLE (Tree of Life):
 *   [
 *     { id: 1, name: 'KETHER', x: 0.5, y: 0.08, color: '#FFFFFF', ... },
 *     { id: 2, name: 'CHOKMAH', x: 0.75, y: 0.22, color: '#0099FF', ... },
 *     ...
 *   ]
 */
getNodePositions() {
  throw new Error(`${this.constructor.name}.getNodePositions() must be implemented`);
}

/**
 * Define path/connection relationships
 * 
 * @returns {Array<[nodeIndexA, nodeIndexB]>}
 *   - Each pair connects two nodes
 *   - Order defines animation sequence
 * 
 * EXAMPLE (Chakra vertical):
 *   [
 *     [0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6],  // Vertical connections
 *     [0, 1], [1, 2], ...                               // Optional: ring paths
 *   ]
 */
getPathConnections() {
  throw new Error(`${this.constructor.name}.getPathConnections() must be implemented`);
}

/**
 * Optional: Define geometry metadata
 * 
 * @returns {Object}
 *   - name: geometry name
 *   - description: what this represents
 *   - nodeCount: how many nodes
 *   - pathCount: how many paths
 * 
 * EXAMPLE:
 *   {
 *     name: 'Sephiroth',
 *     description: 'Tree of Life with 10 nodes and 22 paths',
 *     nodeCount: 10,
 *     pathCount: 22
 *   }
 */
getGeometryMetadata() {
  const nodes = this.getNodePositions();
  const paths = this.getPathConnections();
  return {
    name: this.constructor._displayName_,
    description: this.constructor._description_,
    nodeCount: nodes.length,
    pathCount: paths.length
  };
}
```

---

### **Rendering Methods** (Implemented by Base Class)

```javascript
/**
 * Render all nodes with phase-based animation
 * 
 * Handles:
 * - Alpha blending based on phase
 * - Node color mapping
 * - Glow effects
 * - Per-node size scaling
 */
async #renderNodes(canvas, width, height, frameConfig, progress) {
  const nodes = this.getNodePositions();
  const phase = this.getCurrentPhase(progress);
  const phaseProgress = this.getPhaseProgress(progress, phase);
  
  // Per-node animation
  for (const node of nodes) {
    const pixelPos = this.#transformCoordinate(node.x, node.y, width, height);
    
    // Get phase-specific alpha
    const nodeAlpha = frameConfig.nodeAlpha ?? 1.0;
    
    // Draw node with glow
    await canvas.drawFilledPolygon2d(
      frameConfig.nodeSize ?? 20,
      pixelPos,
      6,  // hexagon (customizable per geometry)
      0,
      node.color,
      nodeAlpha
    );
  }
}

/**
 * Render all paths with phase-based animation
 * 
 * Handles:
 * - Path intensity based on phase
 * - Animation sequencing
 * - Glow effects
 */
async #renderPaths(canvas, width, height, frameConfig, progress) {
  const nodes = this.getNodePositions();
  const paths = this.getPathConnections();
  const phase = this.getCurrentPhase(progress);
  
  // Animate each path based on its index
  for (let i = 0; i < paths.length; i++) {
    const [nodeA, nodeB] = paths[i];
    const posA = this.#transformCoordinate(
      nodes[nodeA].x, nodes[nodeA].y, width, height
    );
    const posB = this.#transformCoordinate(
      nodes[nodeB].x, nodes[nodeB].y, width, height
    );
    
    // Path intensity scales with phase
    const pathIntensity = frameConfig.pathIntensity ?? 1.0;
    
    // Optional: stagger animation based on path index
    const pathProgress = (progress + i * 0.02) % 1.0;
    
    await canvas.drawLine2d(
      posA, posB,
      2,  // inner stroke
      frameConfig.pathColor ?? '#FFFFFF',
      1,  // outer stroke
      frameConfig.pathGlowColor ?? '#FFFF00',
      pathIntensity
    );
  }
}

/**
 * Render energy effects (pulses, auras, etc.)
 * These are OPTIONAL but can be applied to any effect
 */
async #renderEnergyEffects(canvas, width, height, frameConfig, progress) {
  if (!this.config.enableEnergyPulses) return;
  
  try {
    if (!this.energyPulseEngine) {
      this.energyPulseEngine = new EnergyPulseEngine(this.config);
    }
    
    // Let energy engine render its effects
    await this.energyPulseEngine.render(
      canvas, 
      width, 
      height, 
      progress,
      this.getNodePositions()
    );
  } catch (error) {
    console.warn('Energy pulse rendering failed:', error.message);
    this.config.enableEnergyPulses = false;  // Disable for this effect
  }
}

/**
 * Render mystic symbols (chakra symbols, runes, etc.)
 * These are OPTIONAL but can be applied to any effect
 */
async #renderSymbols(canvas, width, height, frameConfig, progress) {
  if (!this.config.enableMysticSymbols) return;
  
  try {
    if (!this.mysticSymbolsEngine) {
      this.mysticSymbolsEngine = new MysticSymbolsEngine(this.config);
    }
    
    // Let symbol engine render symbols at node positions
    await this.mysticSymbolsEngine.render(
      canvas,
      width,
      height,
      progress,
      this.getNodePositions()
    );
  } catch (error) {
    console.warn('Symbol rendering failed:', error.message);
    this.config.enableMysticSymbols = false;
  }
}
```

---

### **Helper Methods** (Utility)

```javascript
/**
 * Transform normalized coordinates (0-1) to canvas pixels
 */
#transformCoordinate(normalizedX, normalizedY, width, height) {
  const scale = this.config.scale ?? 1.0;
  const centerX = this.config.centerX ?? 0.5;
  const centerY = this.config.centerY ?? 0.5;
  
  // Scale around 0.5
  const scaledX = 0.5 + (normalizedX - 0.5) * scale;
  const scaledY = 0.5 + (normalizedY - 0.5) * scale;
  
  // Shift to center
  const x = (scaledX - 0.5) + centerX;
  const y = (scaledY - 0.5) + centerY;
  
  return {
    x: x * width,
    y: y * height
  };
}

/**
 * Linear interpolation with easing
 */
#lerp(from, to, progress, easingName = 'linear') {
  const easing = this.#getEasing(easingName);
  const easedProgress = easing(progress);
  return from + (to - from) * easedProgress;
}

/**
 * Get easing function by name
 */
#getEasing(easingName) {
  const easingFunctions = {
    linear: (t) => t,
    easeInCubic: (t) => t * t * t,
    easeOutCubic: (t) => 1 - Math.pow(1 - t, 3),
    easeInOutCubic: (t) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2,
    smoothstep: (t) => t * t * (3 - 2 * t),
    // ... more easing functions
  };
  
  return easingFunctions[easingName] || easingFunctions.linear;
}

/**
 * Extract colors from ColorPicker instances
 */
#extractColors() {
  const settings = this.settings || new Settings({});
  
  return {
    nodeColor: this.config.nodeColor?.getColor?.(settings) || '#FFFFFF',
    pathColor: this.config.pathColor?.getColor?.(settings) || '#FFFF00',
    glowColor: this.config.glowColor?.getColor?.(settings) || '#FF00FF',
    // ... more colors
  };
}
```

---

## ⚙️ Configuration Schema

### **PhaseAnimatedPolygonConfig** (Base Configuration)

```javascript
export class PhaseAnimatedPolygonConfig extends EffectConfig {
  constructor({
    // === PHASE TIMING ===
    phaseAwakening_start = 0.0,
    phaseAscension_start = 0.20,
    phaseRadiance_start = 0.60,
    phaseDescentstart = 0.85,
    transitionZoneWidth = 0.05,  // Smooth transitions
    
    // === RENDERING ===
    nodeAlpha = 1.0,
    nodeSize = 20,
    pathIntensity = 1.0,
    pathWidth = 2,
    
    // === POSITIONING ===
    scale = 1.0,
    centerX = 0.5,
    centerY = 0.5,
    
    // === COLORS ===
    nodeColor = new ColorPicker(ColorPicker.SelectionType.colorBucket),
    pathColor = new ColorPicker(ColorPicker.SelectionType.colorBucket),
    glowColor = new ColorPicker(ColorPicker.SelectionType.colorBucket),
    
    // === EASING (per phase) ===
    awakeningEasing = 'easeInCubic',
    ascensionEasing = 'easeInOutCubic',
    radianceEasing = 'smoothstep',
    descentEasing = 'easeOutQuart',
    
    // === OPTIONAL SYSTEMS ===
    enableEnergyPulses = false,
    enableMysticSymbols = false,
    enableDetailedGeometry = false,
    
    // === LAYER PROPERTIES ===
    layerOpacity = 1.0,
    layerBlendMode = 'normal',
    
  } = {}) {
    super();
    
    this.phaseAwakening_start = phaseAwakening_start;
    this.phaseAscension_start = phaseAscension_start;
    this.phaseRadiance_start = phaseRadiance_start;
    this.phaseDescentstart = phaseDescentstart;
    this.transitionZoneWidth = transitionZoneWidth;
    
    this.nodeAlpha = nodeAlpha;
    this.nodeSize = nodeSize;
    this.pathIntensity = pathIntensity;
    this.pathWidth = pathWidth;
    
    this.scale = scale;
    this.centerX = centerX;
    this.centerY = centerY;
    
    this.nodeColor = nodeColor;
    this.pathColor = pathColor;
    this.glowColor = glowColor;
    
    this.awakeningEasing = awakeningEasing;
    this.ascensionEasing = ascensionEasing;
    this.radianceEasing = radianceEasing;
    this.descentEasing = descentEasing;
    
    this.enableEnergyPulses = enableEnergyPulses;
    this.enableMysticSymbols = enableMysticSymbols;
    this.enableDetailedGeometry = enableDetailedGeometry;
    
    this.layerOpacity = layerOpacity;
    this.layerBlendMode = layerBlendMode;
  }
  
  /**
   * Subclasses can override to add per-effect validation
   */
  static validate(config) {
    const errors = [];
    
    if (config.nodeAlpha < 0 || config.nodeAlpha > 1) {
      errors.push('nodeAlpha must be between 0 and 1');
    }
    
    if (config.phaseAscension_start <= config.phaseAwakening_start) {
      errors.push('Phase boundaries must be in order');
    }
    
    // ... more validation
    
    return { valid: errors.length === 0, errors };
  }
}
```

### **Subclass Configuration Pattern**

```javascript
// EXAMPLE: ChakraMandalaConfig
export class ChakraMandalaConfig extends PhaseAnimatedPolygonConfig {
  constructor({
    // Inherit all base parameters
    ...baseParams,
    
    // Add chakra-specific parameters
    chakraNodeRadius = 40,
    mandalaRingCount = 8,
    mandalaMaxRadius = 80,
    kundaliniWaveAmplitude = 15,
    kundaliniSpeed = 2,
    frequencyBands = 7,
    frequencyIntensity = 0.8,
    
    // Chakra-specific colors
    rootChakraColor = new ColorPicker(...),
    sacralChakraColor = new ColorPicker(...),
    // ... etc
    
  } = {}) {
    // Call parent constructor with base params
    super(baseParams);
    
    // Add chakra-specific properties
    this.chakraNodeRadius = chakraNodeRadius;
    this.mandalaRingCount = mandalaRingCount;
    this.mandalaMaxRadius = mandalaMaxRadius;
    this.kundaliniWaveAmplitude = kundaliniWaveAmplitude;
    this.kundaliniSpeed = kundaliniSpeed;
    this.frequencyBands = frequencyBands;
    this.frequencyIntensity = frequencyIntensity;
    
    this.rootChakraColor = rootChakraColor;
    this.sacralChakraColor = sacralChakraColor;
    // ... etc
  }
  
  static validate(config) {
    // Call parent validation first
    const baseValidation = super.validate(config);
    if (!baseValidation.valid) return baseValidation;
    
    // Add chakra-specific validation
    const errors = [];
    if (config.mandalaRingCount < 1 || config.mandalaRingCount > 20) {
      errors.push('mandalaRingCount must be between 1 and 20');
    }
    
    return { valid: errors.length === 0, errors };
  }
}
```

---

## 🔌 Integration Checklist for New Effect

When creating a new effect (e.g., Chakra Mandala), follow this checklist:

```javascript
// 1. Create the effect class
export class ChakraMandalaEffect extends PhaseAnimatedPolygonEffect {
  static _name_ = 'chakra-mandala';
  static _displayName_ = 'Chakra Mandala Ascension';
  static _description_ = 'Seven-chakra vertical animation with mandala rotation';
  static _version_ = '1.0.0';
  static _author_ = 'Operator';
  static _tags_ = ['effect', 'primary', 'chakra', 'animation', 'energy'];
  
  constructor({ config = new ChakraMandalaConfig({}), ... } = {}) {
    super({ config, ... });
  }
  
  // ✅ REQUIRED: Implement abstract methods
  getNodePositions() {
    return [ /* 7 chakra nodes */ ];
  }
  
  getPathConnections() {
    return [ /* connections */ ];
  }
  
  getGeometryMetadata() {
    return { name: 'Chakra System', nodeCount: 7, pathCount: 6 };
  }
  
  // ✅ OPTIONAL: Override rendering if needed for unique behavior
  async #renderChakras(canvas, width, height, frameConfig, progress) {
    // Custom chakra-specific rendering
  }
}

// 2. Create config class
export class ChakraMandalaConfig extends PhaseAnimatedPolygonConfig {
  constructor({ ...chakraParams } = {}) {
    super({ ...chakraParams });
    // Add chakra-specific properties
  }
}

// 3. Export geometry definitions
export const CHAKRA_POSITIONS = [ /* definitions */ ];
export const CHAKRA_PATHS = [ /* definitions */ ];

// 4. Register in plugin index.js
await EffectRegistry.register(ChakraMandalaEffect);

// 5. Create test
const chakra = new ChakraMandalaEffect({ ... });
const canvas = await Canvas2dFactory.getNewCanvas(1024, 1024);
await chakra.invoke(layer, 0, 120);  // Should work!
```

---

## 🧪 Testing Strategy

### **Unit Tests**

```javascript
describe('PhaseAnimatedPolygonEffect', () => {
  // Test that abstract class can't be instantiated
  test('cannot instantiate abstract base class', () => {
    expect(() => new PhaseAnimatedPolygonEffect({}))
      .toThrow('Cannot instantiate abstract class');
  });
  
  // Test concrete subclass
  test('concrete subclass instantiates and renders', () => {
    const effect = new AnimatedKabbalisticTreeKeyFrameEffect({});
    expect(effect.getNodePositions()).toHaveLength(10);
    expect(effect.getPathConnections()).toHaveLength(22);
  });
  
  // Test phase calculations
  test('phase detection works correctly', () => {
    const effect = new TestEffect({});
    
    expect(effect.getCurrentPhase(0.0)).toBe('awakening');
    expect(effect.getCurrentPhase(0.15)).toBe('awakening');
    expect(effect.getCurrentPhase(0.25)).toBe('ascension');
    expect(effect.getCurrentPhase(0.70)).toBe('radiance');
    expect(effect.getCurrentPhase(0.90)).toBe('descent');
  });
  
  // Test progress calculation
  test('progress calculation ensures perfect loop', () => {
    const effect = new TestEffect({});
    
    effect.frameNumber = 0;
    effect.totalFrames = 120;
    expect(effect.getProgress()).toBeCloseTo(0.0);
    
    effect.frameNumber = 119;
    expect(effect.getProgress()).toBeCloseTo(1.0);
  });
});

describe('ChakraMandalaEffect', () => {
  test('seven chakras positioned vertically', () => {
    const effect = new ChakraMandalaEffect({});
    const nodes = effect.getNodePositions();
    
    expect(nodes).toHaveLength(7);
    expect(nodes[0].name).toBe('ROOT');
    expect(nodes[6].name).toBe('CROWN');
  });
  
  test('chakra nodes render without errors', async () => {
    const effect = new ChakraMandalaEffect({});
    const canvas = await Canvas2dFactory.getNewCanvas(1024, 1024);
    const layer = await canvas.convertToLayer();
    
    await expect(effect.invoke(layer, 0, 120))
      .resolves.not.toThrow();
  });
});
```

---

## 📚 Documentation Requirements

Each new effect should include:

1. **Architecture Doc** (like this one, customized)
   - Geometry specifications
   - Configuration parameters
   - Rendering pipeline
   - Animation phases

2. **User Guide**
   - Quick start example
   - Configuration presets
   - Visual description
   - Use cases

3. **API Reference**
   - Constructor parameters
   - Configuration properties
   - Methods & return types
   - JSDoc examples

4. **Troubleshooting**
   - Common issues & solutions
   - Performance tuning
   - Debug logging options

---

## ✨ Pro Tips

1. **Use PhaseProgress for timing**: Don't hardcode frame numbers, use `getPhaseProgress()` for reliable phase-relative animation
2. **Coordinate transformation**: Always use `#transformCoordinate()` for normalized → pixel conversion
3. **Color extraction**: Extract all colors at the start of `invoke()`, not during rendering
4. **Energy effects are free**: Use EnergyPulseEngine if your effect has flowing energy (it's optional)
5. **Test at 0%, 50%, 100%**: Verify your effect looks good at phase boundaries
6. **Use integer animation speeds**: For cyclical patterns, use 1.0, 2.0, 3.0 speeds (not 1.5) for perfect loops
7. **Graceful degradation**: Wrap optional features in try-catch and disable if initialization fails

---

**Ready to implement? Start with the base class scaffold, then refactor the Tree of Life to inherit from it. Once that works, all 5 new effects will flow smoothly.** ✨
