/**
 * Quantum Preset
 * Complex interference patterns visualizing superposition states
 * High interference + subdivisions balanced with ethereal fuzz for quantum ambiguity
 * 
 * Color Palette: Bright cyan/electric branch paths with golden accents and cyan glow
 */

import { ColorPicker } from 'my-nft-gen/src/core/layer/configType/ColorPicker.js';

export const QUANTUM = {
  // ====== PHASE TIMING & TRANSITIONS ======
  phaseAwakening_start: 0.0,
  phaseAscension_start: 0.16,
  phaseRadiance_start: 0.52,
  phaseDescentstart: 0.84,
  transitionZoneWidth: 0.05,

  // ====== COLORS (3 active) ======
  branchColor: new ColorPicker(ColorPicker.SelectionType.colorBucket, '#00E5FF'),
  accentColor: new ColorPicker(ColorPicker.SelectionType.colorBucket, '#FFD700'),
  glowColor: new ColorPicker(ColorPicker.SelectionType.colorBucket, '#00E5FF'),

  // ====== AWAKENING PHASE (0-16%) ======
  awakeningNodeAlpha: 0.38,
  awakeningNodeAlpha_start: 0.15,
  awakeningNodeAlpha_end: 0.55,
  awakeningPathIntensity: 0.18,
  awakeningPathIntensity_start: 0.0,
  awakeningPathIntensity_end: 0.35,
  awakeningPathAnimSpeed: 0.8,
  awakeningEasing: 'easeInQuart',

  // ====== ASCENSION PHASE (16-52%) ======
  ascensionNodeAlpha: 0.88,
  ascensionNodeAlpha_start: 0.55,
  ascensionNodeAlpha_end: 0.95,
  ascensionPathIntensity: 0.98,
  ascensionPathIntensity_start: 0.35,
  ascensionPathIntensity_end: 1.0,
  ascensionPathAnimSpeed: 2.8,
  ascensionEasing: 'easeInOutCubic',

  // ====== RADIANCE PHASE (52-84%) ======
  radianceNodeAlpha: 1.0,
  radianceNodeAlpha_start: 0.95,
  radianceNodeAlpha_end: 1.0,
  radiancePathIntensity: 1.0,
  radiancePathIntensity_start: 1.0,
  radiancePathIntensity_end: 1.0,
  radianceKetherGlow: 2.3,
  radiancePathAnimSpeed: 2.5,
  radianceEasing: 'smoothstep',

  // ====== DESCENT PHASE (84-100%) ======
  descentNodeAlpha: 0.55,
  descentNodeAlpha_start: 1.0,
  descentNodeAlpha_end: 0.2,
  descentPathIntensity: 0.22,
  descentPathIntensity_start: 1.0,
  descentPathIntensity_end: 0.0,
  descentPathAnimSpeed: 1.0,
  descentEasing: 'easeOutCubic',

  // ====== PATH ANIMATION ======
  pathThickness: 2,
  pathSizeScale: 1.0,

  // ====== VISUAL EFFECTS ======
  nodeSize: 20,
  nodeGlowSize: 25,
  energyFlow: true,

  // ====== ENERGY PULSE SYSTEM ======
  enableEnergyPulses: true,
  pulseWaveSpeed: 2.0,
  pulseBreathSpeed: 2.0,
  pulseBreathIntensity: 0.4,
  pulseSpiralSpeed: 3.0,
  pulseSpiralRadius: 50,
  pulseAuraSpeed: 2.0,
  pulseAuraWidth: 0.15,
  pulseTracerSpeed: 3.0,
  pulseTracerCount: 5,
  energyPulseSizeScale: 1.0,

  // ====== MYSTIC SYMBOLS ======
  enableMysticSymbols: true,
  symbolGlowSize: 8,
  symbolShowOnPhases: ['awakening', 'ascension', 'radiance', 'descent'],
  mysticSymbolSizeScale: 1.0,

  // ====== VISUAL ENHANCEMENTS ======
  fuzzDensity: 0.18,
  subdivisionIntensity: 0.55,
  interferenceAmount: 0.52,
  glowLayerIntensity: 0.18,

  // ====== DETAILED GEOMETRY SYSTEM ======
  enableDetailedGeometry: true,
  nodeLayerComplexity: 0.8,
  pathRibbonEffect: 0.6,
  harmonicSubdivisions: 0.7,
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
  _description: 'Superposition visualization with complex interference patterns'
};