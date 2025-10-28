/**
 * Hermetic Ascent Preset
 * Standard animation following classical Kabbalistic timing
 * Balanced visual details for sacred geometry appreciation
 * 
 * Color Palette: Purple-blue branch paths with silver accents and indigo glow
 */

import { ColorPicker } from 'my-nft-gen/src/core/layer/configType/ColorPicker.js';

export const HERMETIC_ASCENT = {
  // ====== PHASE TIMING & TRANSITIONS ======
  phaseAwakening_start: 0.0,
  phaseAscension_start: 0.20,
  phaseRadiance_start: 0.60,
  phaseDescentstart: 0.85,
  transitionZoneWidth: 0.05,

  // ====== COLORS (3 active) ======
  branchColor: new ColorPicker(ColorPicker.SelectionType.colorBucket, '#6A5ACD'),
  accentColor: new ColorPicker(ColorPicker.SelectionType.colorBucket, '#C0C0C0'),
  glowColor: new ColorPicker(ColorPicker.SelectionType.colorBucket, '#4B0082'),

  // ====== AWAKENING PHASE (0-20%) ======
  awakeningNodeAlpha: 0.3,
  awakeningNodeAlpha_start: 0.1,
  awakeningNodeAlpha_end: 0.5,
  awakeningPathIntensity: 0.1,
  awakeningPathIntensity_start: 0.0,
  awakeningPathIntensity_end: 0.3,
  awakeningPathAnimSpeed: 0.5,
  awakeningEasing: 'easeInCubic',

  // ====== ASCENSION PHASE (20-60%) ======
  ascensionNodeAlpha: 0.8,
  ascensionNodeAlpha_start: 0.5,
  ascensionNodeAlpha_end: 0.95,
  ascensionPathIntensity: 0.9,
  ascensionPathIntensity_start: 0.3,
  ascensionPathIntensity_end: 1.0,
  ascensionPathAnimSpeed: 1.5,
  ascensionEasing: 'linear',

  // ====== RADIANCE PHASE (60-85%) ======
  radianceNodeAlpha: 1.0,
  radianceNodeAlpha_start: 0.95,
  radianceNodeAlpha_end: 1.0,
  radiancePathIntensity: 1.0,
  radiancePathIntensity_start: 1.0,
  radiancePathIntensity_end: 1.0,
  radianceKetherGlow: 2.0,
  radiancePathAnimSpeed: 1.3,
  radianceEasing: 'smoothstep',

  // ====== DESCENT PHASE (85-100%) ======
  descentNodeAlpha: 0.5,
  descentNodeAlpha_start: 1.0,
  descentNodeAlpha_end: 0.15,
  descentPathIntensity: 0.2,
  descentPathIntensity_start: 1.0,
  descentPathIntensity_end: 0.0,
  descentPathAnimSpeed: 0.9,
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
  pulseWaveSpeed: 2.0,
  pulseBreathSpeed: 2.0,
  pulseBreathIntensity: 0.4,
  pulseSpiralSpeed: 2.5,
  pulseSpiralRadius: 45,
  pulseAuraSpeed: 2.0,
  pulseAuraWidth: 0.15,
  pulseTracerSpeed: 2.5,
  pulseTracerCount: 4,
  energyPulseSizeScale: 0.95,

  // ====== MYSTIC SYMBOLS ======
  enableMysticSymbols: true,
  symbolGlowSize: 8,
  symbolShowOnPhases: ['awakening', 'ascension', 'radiance', 'descent'],
  mysticSymbolSizeScale: 1.0,

  // ====== VISUAL ENHANCEMENTS ======
  fuzzDensity: 0.15,
  subdivisionIntensity: 0.30,
  interferenceAmount: 0.20,
  glowLayerIntensity: 0.15,

  // ====== DETAILED GEOMETRY SYSTEM ======
  enableDetailedGeometry: true,
  nodeLayerComplexity: 0.7,
  pathRibbonEffect: 0.5,
  harmonicSubdivisions: 0.6,
  crosshatchIntensity: 0.35,
  nodeCrystallineEffect: true,
  nodeFibonacciSpiral: true,
  nodeHarmonicRings: true,
  nodeOrbitalElements: true,
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
  _description: 'Classical Kabbalistic timing with balanced visual depth'
};