import { EffectConfig } from 'my-nft-gen/src/core/layer/EffectConfig.js';
import { ColorPicker } from 'my-nft-gen/src/core/layer/configType/ColorPicker.js';

export class AnimatedTreeOfLifeConfig extends EffectConfig {
  /**
   * Pick a random element from an array, or return the value if it's not an array
   * Used for randomly selecting enum options (easing functions, blend modes, etc.)
   * @param {Array|string|*} value - Array of options or a single value
   * @return {string|*} - Random element from array or the value itself
   * @static
   */
  static pickRandom(value) {
    if (Array.isArray(value)) {
      return value[Math.floor(Math.random() * value.length)];
    }
    return value;
  }

  constructor({
    // ====== PHASE TIMING & TRANSITIONS ======
    phaseAwakening_start = 0.0,        // 0-20%: Energy rises from physical
    phaseAscension_start = 0.20,       // 20-60%: Consciousness ascending
    phaseRadiance_start = 0.60,        // 60-85%: Divine manifestation
    phaseDescentstart = 0.85,          // 85-100%: Return to Malkuth
    transitionZoneWidth = 0.05,        // Width of smooth transition zones between phases (5% of animation)

    // ====== AWAKENING PHASE (0-20%) ======
    awakeningNodeAlpha = 0.3,
    awakeningNodeAlpha_start = 0.1,
    awakeningNodeAlpha_end = 0.5,
    awakeningPathIntensity = 0.2,
    awakeningPathIntensity_start = 0.0,
    awakeningPathIntensity_end = 0.4,
    awakeningPathAnimSpeed = 0.5,
    awakeningEasing = ['easeInCubic', 'easeInQuart', 'easeInQuint', 'easeInExpo'],

    // ====== ASCENSION PHASE (20-60%) ======
    ascensionNodeAlpha = 0.8,
    ascensionNodeAlpha_start = 0.5,
    ascensionNodeAlpha_end = 1.0,
    ascensionPathIntensity = 0.8,
    ascensionPathIntensity_start = 0.4,
    ascensionPathIntensity_end = 1.0,
    ascensionPathAnimSpeed = 2.0,
    ascensionEasing = ['easeInOutCubic', 'easeInOutQuart', 'easeInOutQuint', 'easeInOutElastic'],

    // ====== RADIANCE PHASE (60-85%) ======
    radianceNodeAlpha = 1.0,
    radianceNodeAlpha_start = 1.0,
    radianceNodeAlpha_end = 1.0,
    radiancePathIntensity = 1.0,
    radiancePathIntensity_start = 1.0,
    radiancePathIntensity_end = 1.0,
    radianceKetherGlow = 2.0,
    radiancePathAnimSpeed = 1.5,
    radianceEasing = ['smoothstep', 'easeOutCubic', 'easeOutQuart', 'linear'],

    // ====== DESCENT PHASE (85-100%) ======
    descentNodeAlpha = 0.3,
    descentNodeAlpha_start = 1.0,
    descentNodeAlpha_end = 0.1,
    descentPathIntensity = 0.1,
    descentPathIntensity_start = 1.0,
    descentPathIntensity_end = 0.0,
    descentPathAnimSpeed = 1.0,
    descentEasing = ['easeOutQuart', 'easeOutQuint', 'easeOutExpo', 'easeInOutBack'],

    // ====== PATH ANIMATION ======
    pathThickness = 2,                 // Line thickness for paths
    pathSizeScale = 1.0,               // Scale multiplier for path size (1.0 = default, 0.5 = half, 2.0 = double)

    // ====== COLOR CONFIGURATION ======
    branchColor = new ColorPicker(ColorPicker.SelectionType.colorBucket),
    accentColor = new ColorPicker(ColorPicker.SelectionType.colorBucket),
    glowColor = new ColorPicker(ColorPicker.SelectionType.colorBucket),

    // ====== VISUAL EFFECTS ======
    nodeSize = 20,                     // Radius of Sephiroth nodes
    nodeGlowSize = 25,                 // Glow ring radius
    energyFlow = true,

    // ====== ENERGY PULSE SYSTEM ======
    enableEnergyPulses = true,
    pulseWaveSpeed = 2.0,              // Wave traveling speed (paths/cycle) - MUST be integer for perfect loop
    pulseBreathSpeed = 2.0,            // Breathing pulse frequency - MUST be integer for perfect loop (was 1.5)
    pulseBreathIntensity = 0.4,        // Breathing expansion amount
    pulseSpiralSpeed = 3.0,            // Spiral vortex rotation speed - MUST be integer for perfect loop
    pulseSpiralRadius = 50,            // Spiral radius in pixels
    pulseAuraSpeed = 2.0,              // Expanding aura wave speed - MUST be integer for perfect loop (was 2.5)
    pulseAuraWidth = 0.15,             // Width of aura wave front
    pulseTracerSpeed = 3.0,            // Speed of energy particles - MUST be integer for perfect loop
    pulseTracerCount = 5,              // Number of particles per path
    energyPulseSizeScale = 1.0,        // Scale multiplier for all energy pulses on paths (1.0 = default, 0.5 = half, 2.0 = double)

    // ====== MYSTIC SYMBOLS ======
    enableMysticSymbols = true,
    symbolGlowSize = 8,                // Symbol glow ring size
    symbolShowOnPhases = ['awakening', 'ascension', 'radiance', 'descent'], // Which phases show symbols
    mysticSymbolSizeScale = 1.0,       // Scale multiplier for mystical symbols (1.0 = default, 0.5 = half, 2.0 = double)

    // ====== VISUAL ENHANCEMENTS (Detail & Fuzz) ======
    fuzzDensity = 0.15,            // Atmospheric particle density (0-1)
    subdivisionIntensity = 0.3,    // Secondary path line intensity (0-1)
    interferenceAmount = 0.2,      // Harmonic interference ripple amount (0-1)
    glowLayerIntensity = 0.15,     // Secondary glow bloom intensity (0-1)

    // ====== DETAILED GEOMETRY SYSTEM ======
    enableDetailedGeometry = true,         // Enable enhanced node & path rendering
    nodeLayerComplexity = 0.8,             // How detailed nodes are (0-1)
    pathRibbonEffect = 0.6,                // Twisted ribbon effect intensity (0-1)
    harmonicSubdivisions = 0.7,            // Golden ratio subdivision intensity (0-1)
    crosshatchIntensity = 0.4,             // Path cross-hatching detail (0-1)
    nodeCrystallineEffect = true,          // Render crystalline structures on nodes
    nodeFibonacciSpiral = true,            // Render Fibonacci spirals on nodes
    nodeHarmonicRings = true,              // Render concentric harmonic rings
    nodeOrbitalElements = true,            // Render rotating orbital decorations
    nodeMandalaPattern = true,             // Render inner mandala patterns

    // ====== TRANSFORMATION PARAMETERS ======
    scale = 1.0,                   // Tree scale (1.0 = default, 2.0 = double size)
    centerX = 0.5,                 // X position as fraction of canvas (0.0 = left, 0.5 = center, 1.0 = right)
    centerY = 0.5,                 // Y position as fraction of canvas (0.0 = top, 0.5 = center, 1.0 = bottom)

    // ====== LAYER COMPOSITION ======
    layerOpacity = 1.0,
    layerBlendMode = ['screen', 'overlay', 'lighten', 'color-dodge', 'color-burn'],
  } = {}) {
    super();

    // ====== PHASE TIMING & TRANSITIONS ======
    this.phaseAwakening_start = phaseAwakening_start;
    this.phaseAscension_start = phaseAscension_start;
    this.phaseRadiance_start = phaseRadiance_start;
    this.phaseDescentstart = phaseDescentstart;
    this.transitionZoneWidth = transitionZoneWidth;

    // ====== AWAKENING PHASE ======
    this.awakeningNodeAlpha = awakeningNodeAlpha;
    this.awakeningNodeAlpha_start = awakeningNodeAlpha_start;
    this.awakeningNodeAlpha_end = awakeningNodeAlpha_end;
    this.awakeningPathIntensity = awakeningPathIntensity;
    this.awakeningPathIntensity_start = awakeningPathIntensity_start;
    this.awakeningPathIntensity_end = awakeningPathIntensity_end;
    this.awakeningPathAnimSpeed = awakeningPathAnimSpeed;
    this.awakeningEasing = awakeningEasing;

    // ====== ASCENSION PHASE ======
    this.ascensionNodeAlpha = ascensionNodeAlpha;
    this.ascensionNodeAlpha_start = ascensionNodeAlpha_start;
    this.ascensionNodeAlpha_end = ascensionNodeAlpha_end;
    this.ascensionPathIntensity = ascensionPathIntensity;
    this.ascensionPathIntensity_start = ascensionPathIntensity_start;
    this.ascensionPathIntensity_end = ascensionPathIntensity_end;
    this.ascensionPathAnimSpeed = ascensionPathAnimSpeed;
    this.ascensionEasing = ascensionEasing;

    // ====== RADIANCE PHASE ======
    this.radianceNodeAlpha = radianceNodeAlpha;
    this.radianceNodeAlpha_start = radianceNodeAlpha_start;
    this.radianceNodeAlpha_end = radianceNodeAlpha_end;
    this.radiancePathIntensity = radiancePathIntensity;
    this.radiancePathIntensity_start = radiancePathIntensity_start;
    this.radiancePathIntensity_end = radiancePathIntensity_end;
    this.radianceKetherGlow = radianceKetherGlow;
    this.radiancePathAnimSpeed = radiancePathAnimSpeed;
    this.radianceEasing = radianceEasing;

    // ====== DESCENT PHASE ======
    this.descentNodeAlpha = descentNodeAlpha;
    this.descentNodeAlpha_start = descentNodeAlpha_start;
    this.descentNodeAlpha_end = descentNodeAlpha_end;
    this.descentPathIntensity = descentPathIntensity;
    this.descentPathIntensity_start = descentPathIntensity_start;
    this.descentPathIntensity_end = descentPathIntensity_end;
    this.descentPathAnimSpeed = descentPathAnimSpeed;
    this.descentEasing = descentEasing;

    // ====== PATH ANIMATION ======
    this.pathThickness = pathThickness;
    this.pathSizeScale = pathSizeScale;

    // ====== COLOR CONFIGURATION ======
    this.branchColor = branchColor;
    this.accentColor = accentColor;
    this.glowColor = glowColor;

    // ====== VISUAL EFFECTS ======
    this.nodeSize = nodeSize;
    this.nodeGlowSize = nodeGlowSize;
    this.energyFlow = energyFlow;

    // ====== ENERGY PULSE SYSTEM ======
    this.enableEnergyPulses = enableEnergyPulses;
    this.pulseWaveSpeed = pulseWaveSpeed;
    this.pulseBreathSpeed = pulseBreathSpeed;
    this.pulseBreathIntensity = pulseBreathIntensity;
    this.pulseSpiralSpeed = pulseSpiralSpeed;
    this.pulseSpiralRadius = pulseSpiralRadius;
    this.pulseAuraSpeed = pulseAuraSpeed;
    this.pulseAuraWidth = pulseAuraWidth;
    this.pulseTracerSpeed = pulseTracerSpeed;
    this.pulseTracerCount = pulseTracerCount;
    this.energyPulseSizeScale = energyPulseSizeScale;

    // ====== MYSTIC SYMBOLS ======
    this.enableMysticSymbols = enableMysticSymbols;
    this.symbolGlowSize = symbolGlowSize;
    this.symbolShowOnPhases = symbolShowOnPhases;
    this.mysticSymbolSizeScale = mysticSymbolSizeScale;

    // ====== VISUAL ENHANCEMENTS (Detail & Fuzz) ======
    this.fuzzDensity = fuzzDensity;
    this.subdivisionIntensity = subdivisionIntensity;
    this.interferenceAmount = interferenceAmount;
    this.glowLayerIntensity = glowLayerIntensity;

    // ====== DETAILED GEOMETRY SYSTEM ======
    this.enableDetailedGeometry = enableDetailedGeometry;
    this.nodeLayerComplexity = nodeLayerComplexity;
    this.pathRibbonEffect = pathRibbonEffect;
    this.harmonicSubdivisions = harmonicSubdivisions;
    this.crosshatchIntensity = crosshatchIntensity;
    this.nodeCrystallineEffect = nodeCrystallineEffect;
    this.nodeFibonacciSpiral = nodeFibonacciSpiral;
    this.nodeHarmonicRings = nodeHarmonicRings;
    this.nodeOrbitalElements = nodeOrbitalElements;
    this.nodeMandalaPattern = nodeMandalaPattern;

    // ====== TRANSFORMATION PARAMETERS ======
    this.scale = scale;
    this.centerX = centerX;
    this.centerY = centerY;

    // ====== LAYER COMPOSITION ======
    this.layerOpacity = layerOpacity;
    this.layerBlendMode = layerBlendMode;
  }
}