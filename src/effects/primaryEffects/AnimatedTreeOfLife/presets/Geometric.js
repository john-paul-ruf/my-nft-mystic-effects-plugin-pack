/**
 * Geometric Preset
 * Emphasizes mathematical patterns and interference - focus on ripples and subdivisions
 * Compressed timing for rapid geometric unfolding
 * 
 * Color Palette: Bright white branch paths with electric blue accents and silver glow
 */

import { ColorPicker } from 'my-nft-gen/src/core/layer/configType/ColorPicker.js';

export const GEOMETRIC = {
  // ====== PHASE TIMING & TRANSITIONS ======
  phaseAwakening_start: 0.0,
  phaseAscension_start: 0.18,
  phaseRadiance_start: 0.55,
  phaseDescentstart: 0.82,
  transitionZoneWidth: 0.05,

  // ====== COLORS (3 active) ======
  branchColor: new ColorPicker(ColorPicker.SelectionType.colorBucket, '#F0F8FF'),
  accentColor: new ColorPicker(ColorPicker.SelectionType.colorBucket, '#0047AB'),
  glowColor: new ColorPicker(ColorPicker.SelectionType.colorBucket, '#C0C0C0'),

  // ====== AWAKENING PHASE (0-18%) ======
  awakeningNodeAlpha: 0.4,
  awakeningNodeAlpha_start: 0.15,
  awakeningNodeAlpha_end: 0.55,
  awakeningPathIntensity: 0.2,
  awakeningPathIntensity_start: 0.0,
  awakeningPathIntensity_end: 0.4,
  awakeningPathAnimSpeed: 0.8,
  awakeningEasing: 'easeInQuart',

  // ====== ASCENSION PHASE (18-55%) ======
  ascensionNodeAlpha: 0.9,
  ascensionNodeAlpha_start: 0.55,
  ascensionNodeAlpha_end: 0.98,
  ascensionPathIntensity: 1.0,
  ascensionPathIntensity_start: 0.4,
  ascensionPathIntensity_end: 1.0,
  ascensionPathAnimSpeed: 2.5,
  ascensionEasing: 'easeInOutCubic',

  // ====== RADIANCE PHASE (55-82%) ======
  radianceNodeAlpha: 1.0,
  radianceNodeAlpha_start: 0.98,
  radianceNodeAlpha_end: 1.0,
  radiancePathIntensity: 1.0,
  radiancePathIntensity_start: 1.0,
  radiancePathIntensity_end: 1.0,
  radianceKetherGlow: 2.0,
  radiancePathAnimSpeed: 2.2,
  radianceEasing: 'smoothstep',

  // ====== DESCENT PHASE (82-100%) ======
  descentNodeAlpha: 0.6,
  descentNodeAlpha_start: 1.0,
  descentNodeAlpha_end: 0.2,
  descentPathIntensity: 0.25,
  descentPathIntensity_start: 1.0,
  descentPathIntensity_end: 0.0,
  descentPathAnimSpeed: 1.2,
  descentEasing: 'easeOutCubic',

  // ====== PATH ANIMATION ======
  pathThickness: 1.5,
  pathSizeScale: 0.95,

  // ====== VISUAL EFFECTS ======
  nodeSize: 18,
  nodeGlowSize: 22,
  energyFlow: true,

  // ====== ENERGY PULSE SYSTEM ======
  enableEnergyPulses: true,
  pulseWaveSpeed: 3.0,
  pulseBreathSpeed: 2.0,
  pulseBreathIntensity: 0.35,
  pulseSpiralSpeed: 4.0,
  pulseSpiralRadius: 60,
  pulseAuraSpeed: 3.0,
  pulseAuraWidth: 0.12,
  pulseTracerSpeed: 4.0,
  pulseTracerCount: 7,
  energyPulseSizeScale: 1.0,

  // ====== MYSTIC SYMBOLS ======
  enableMysticSymbols: true,
  symbolGlowSize: 6,
  symbolShowOnPhases: ['ascension', 'radiance'],
  mysticSymbolSizeScale: 0.8,

  // ====== VISUAL ENHANCEMENTS ======
  fuzzDensity: 0.08,
  subdivisionIntensity: 0.60,
  interferenceAmount: 0.55,
  glowLayerIntensity: 0.12,

  // ====== DETAILED GEOMETRY SYSTEM ======
  enableDetailedGeometry: true,
  nodeLayerComplexity: 0.9,
  pathRibbonEffect: 0.3,
  harmonicSubdivisions: 0.9,
  crosshatchIntensity: 0.7,
  nodeCrystallineEffect: true,
  nodeFibonacciSpiral: true,
  nodeHarmonicRings: true,
  nodeOrbitalElements: false,
  nodeMandalaPattern: false,

  // ====== TRANSFORMATION PARAMETERS ======
  scale: 1.0,
  centerX: 0.5,
  centerY: 0.5,

  // ====== LAYER COMPOSITION ======
  layerOpacity: 1.0,
  layerBlendMode: 'overlay',

  // ====== METADATA ======
  _version: '2.1.0',
  _animationType: 'kabbalistic-sephiroth',
  _description: 'Mathematical precision with maximum geometric pattern complexity'
};