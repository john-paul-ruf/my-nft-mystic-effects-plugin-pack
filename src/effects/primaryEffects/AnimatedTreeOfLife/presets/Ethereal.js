/**
 * Ethereal Preset
 * Atmospheric and dreamy - emphasizes soft fuzz particles and gentle glow
 * Extended timing for meditative flow through phases
 * 
 * Color Palette: Soft lavender branch paths with opal accents and pearl glow
 */

import { ColorPicker } from 'my-nft-gen/src/core/layer/configType/ColorPicker.js';

export const ETHEREAL = {
  // ====== PHASE TIMING & TRANSITIONS ======
  phaseAwakening_start: 0.0,
  phaseAscension_start: 0.25,
  phaseRadiance_start: 0.65,
  phaseDescentstart: 0.88,
  transitionZoneWidth: 0.05,

  // ====== COLORS (3 active) ======
  branchColor: new ColorPicker(ColorPicker.SelectionType.colorBucket, '#DDA0DD'),
  accentColor: new ColorPicker(ColorPicker.SelectionType.colorBucket, '#F0E68C'),
  glowColor: new ColorPicker(ColorPicker.SelectionType.colorBucket, '#E6E6FA'),

  // ====== AWAKENING PHASE (0-25%) ======
  awakeningNodeAlpha: 0.28,
  awakeningNodeAlpha_start: 0.1,
  awakeningNodeAlpha_end: 0.45,
  awakeningPathIntensity: 0.12,
  awakeningPathIntensity_start: 0.0,
  awakeningPathIntensity_end: 0.3,
  awakeningPathAnimSpeed: 0.5,
  awakeningEasing: 'easeInCubic',

  // ====== ASCENSION PHASE (25-65%) ======
  ascensionNodeAlpha: 0.78,
  ascensionNodeAlpha_start: 0.45,
  ascensionNodeAlpha_end: 0.95,
  ascensionPathIntensity: 0.88,
  ascensionPathIntensity_start: 0.3,
  ascensionPathIntensity_end: 1.0,
  ascensionPathAnimSpeed: 1.2,
  ascensionEasing: 'easeOutCubic',

  // ====== RADIANCE PHASE (65-88%) ======
  radianceNodeAlpha: 1.0,
  radianceNodeAlpha_start: 0.95,
  radianceNodeAlpha_end: 1.0,
  radiancePathIntensity: 0.98,
  radiancePathIntensity_start: 1.0,
  radiancePathIntensity_end: 0.95,
  radianceKetherGlow: 2.2,
  radiancePathAnimSpeed: 1.0,
  radianceEasing: 'smoothstep',

  // ====== DESCENT PHASE (88-100%) ======
  descentNodeAlpha: 0.45,
  descentNodeAlpha_start: 1.0,
  descentNodeAlpha_end: 0.1,
  descentPathIntensity: 0.18,
  descentPathIntensity_start: 0.95,
  descentPathIntensity_end: 0.0,
  descentPathAnimSpeed: 0.8,
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
  pulseWaveSpeed: 1.0,
  pulseBreathSpeed: 1.0,
  pulseBreathIntensity: 0.3,
  pulseSpiralSpeed: 2.0,
  pulseSpiralRadius: 40,
  pulseAuraSpeed: 1.5,
  pulseAuraWidth: 0.2,
  pulseTracerSpeed: 2.0,
  pulseTracerCount: 4,
  energyPulseSizeScale: 0.9,

  // ====== MYSTIC SYMBOLS ======
  enableMysticSymbols: true,
  symbolGlowSize: 10,
  symbolShowOnPhases: ['awakening', 'ascension', 'radiance', 'descent'],
  mysticSymbolSizeScale: 1.0,

  // ====== VISUAL ENHANCEMENTS ======
  fuzzDensity: 0.35,
  subdivisionIntensity: 0.25,
  interferenceAmount: 0.15,
  glowLayerIntensity: 0.35,

  // ====== DETAILED GEOMETRY SYSTEM ======
  enableDetailedGeometry: true,
  nodeLayerComplexity: 0.6,
  pathRibbonEffect: 0.4,
  harmonicSubdivisions: 0.4,
  crosshatchIntensity: 0.2,
  nodeCrystallineEffect: true,
  nodeFibonacciSpiral: false,
  nodeHarmonicRings: true,
  nodeOrbitalElements: false,
  nodeMandalaPattern: false,

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
  _description: 'Soft atmospheric dreamscape with ethereal particle effects'
};