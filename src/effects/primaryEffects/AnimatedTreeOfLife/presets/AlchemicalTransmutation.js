/**
 * Alchemical Transmutation Preset
 * Slow, contemplative animation for extended viewing
 * Extended phase timings for meditative pacing with rich detail
 * 
 * Color Palette: Deep emerald branch paths with copper accents and forest green glow
 */

import { ColorPicker } from 'my-nft-gen/src/core/layer/configType/ColorPicker.js';

export const ALCHEMICAL_TRANSMUTATION = {
  // ====== PHASE TIMING & TRANSITIONS ======
  phaseAwakening_start: 0.0,
  phaseAscension_start: 0.30,
  phaseRadiance_start: 0.70,
  phaseDescentstart: 0.90,
  transitionZoneWidth: 0.05,

  // ====== COLORS (3 active) ======
  branchColor: new ColorPicker(ColorPicker.SelectionType.colorBucket, '#50C878'),
  accentColor: new ColorPicker(ColorPicker.SelectionType.colorBucket, '#B87333'),
  glowColor: new ColorPicker(ColorPicker.SelectionType.colorBucket, '#228B22'),

  // ====== AWAKENING PHASE (0-30%) ======
  awakeningNodeAlpha: 0.25,
  awakeningNodeAlpha_start: 0.08,
  awakeningNodeAlpha_end: 0.42,
  awakeningPathIntensity: 0.08,
  awakeningPathIntensity_start: 0.0,
  awakeningPathIntensity_end: 0.25,
  awakeningPathAnimSpeed: 0.4,
  awakeningEasing: 'smoothstep',

  // ====== ASCENSION PHASE (30-70%) ======
  ascensionNodeAlpha: 0.75,
  ascensionNodeAlpha_start: 0.42,
  ascensionNodeAlpha_end: 0.92,
  ascensionPathIntensity: 0.85,
  ascensionPathIntensity_start: 0.25,
  ascensionPathIntensity_end: 1.0,
  ascensionPathAnimSpeed: 0.8,
  ascensionEasing: 'easeOutCubic',

  // ====== RADIANCE PHASE (70-90%) ======
  radianceNodeAlpha: 1.0,
  radianceNodeAlpha_start: 0.92,
  radianceNodeAlpha_end: 1.0,
  radiancePathIntensity: 0.95,
  radiancePathIntensity_start: 1.0,
  radiancePathIntensity_end: 0.98,
  radianceKetherGlow: 2.5,
  radiancePathAnimSpeed: 0.9,
  radianceEasing: 'smoothstep',

  // ====== DESCENT PHASE (90-100%) ======
  descentNodeAlpha: 0.4,
  descentNodeAlpha_start: 1.0,
  descentNodeAlpha_end: 0.1,
  descentPathIntensity: 0.15,
  descentPathIntensity_start: 0.98,
  descentPathIntensity_end: 0.0,
  descentPathAnimSpeed: 0.6,
  descentEasing: 'easeOutQuart',

  // ====== PATH ANIMATION ======
  pathThickness: 2,
  pathSizeScale: 1.0,

  // ====== VISUAL EFFECTS ======
  nodeSize: 20,
  nodeGlowSize: 25,
  energyFlow: true,

  // ====== ENERGY PULSE SYSTEM ======
  enableEnergyPulses: true,
  pulseWaveSpeed: 1.5,
  pulseBreathSpeed: 1.5,
  pulseBreathIntensity: 0.35,
  pulseSpiralSpeed: 2.0,
  pulseSpiralRadius: 48,
  pulseAuraSpeed: 1.5,
  pulseAuraWidth: 0.18,
  pulseTracerSpeed: 2.0,
  pulseTracerCount: 3,
  energyPulseSizeScale: 0.85,

  // ====== MYSTIC SYMBOLS ======
  enableMysticSymbols: true,
  symbolGlowSize: 9,
  symbolShowOnPhases: ['awakening', 'ascension', 'radiance', 'descent'],
  mysticSymbolSizeScale: 1.0,

  // ====== VISUAL ENHANCEMENTS ======
  fuzzDensity: 0.22,
  subdivisionIntensity: 0.45,
  interferenceAmount: 0.30,
  glowLayerIntensity: 0.25,

  // ====== DETAILED GEOMETRY SYSTEM ======
  enableDetailedGeometry: true,
  nodeLayerComplexity: 0.75,
  pathRibbonEffect: 0.55,
  harmonicSubdivisions: 0.65,
  crosshatchIntensity: 0.4,
  nodeCrystallineEffect: true,
  nodeFibonacciSpiral: true,
  nodeHarmonicRings: true,
  nodeOrbitalElements: true,
  nodeMandalaPattern: true,

  // ====== TRANSFORMATION PARAMETERS ======
  scale: 1.0,
  centerX: 0.5,
  centerY: 0.5,

  // ====== LAYER COMPOSITION ======
  layerOpacity: 1.0,
  layerBlendMode: 'screen',

  // ====== METADATA ======
  _version: '2.1.0',
  _animationType: 'kabbalistic-sephiroth',
  _description: 'Slow meditative pacing with rich visual complexity'
};