/**
 * Minimalist Preset
 * Clean and refined - subtle enhancements let sacred geometry speak
 * All visual layers kept to minimal levels for elegant simplicity
 * 
 * Color Palette: Cool gray branch paths with subtle teal accents and pale glow
 */

import { ColorPicker } from 'my-nft-gen/src/core/layer/configType/ColorPicker.js';

export const MINIMALIST = {
  // ====== PHASE TIMING & TRANSITIONS ======
  phaseAwakening_start: 0.0,
  phaseAscension_start: 0.22,
  phaseRadiance_start: 0.62,
  phaseDescentstart: 0.86,
  transitionZoneWidth: 0.05,

  // ====== COLORS (3 active) ======
  branchColor: new ColorPicker(ColorPicker.SelectionType.colorBucket, '#A9A9A9'),
  accentColor: new ColorPicker(ColorPicker.SelectionType.colorBucket, '#20B2AA'),
  glowColor: new ColorPicker(ColorPicker.SelectionType.colorBucket, '#D3D3D3'),

  // ====== AWAKENING PHASE (0-22%) ======
  awakeningNodeAlpha: 0.32,
  awakeningNodeAlpha_start: 0.1,
  awakeningNodeAlpha_end: 0.48,
  awakeningPathIntensity: 0.12,
  awakeningPathIntensity_start: 0.0,
  awakeningPathIntensity_end: 0.3,
  awakeningPathAnimSpeed: 0.5,
  awakeningEasing: 'easeInCubic',

  // ====== ASCENSION PHASE (22-62%) ======
  ascensionNodeAlpha: 0.82,
  ascensionNodeAlpha_start: 0.48,
  ascensionNodeAlpha_end: 0.95,
  ascensionPathIntensity: 0.92,
  ascensionPathIntensity_start: 0.3,
  ascensionPathIntensity_end: 1.0,
  ascensionPathAnimSpeed: 1.6,
  ascensionEasing: 'easeInOutCubic',

  // ====== RADIANCE PHASE (62-86%) ======
  radianceNodeAlpha: 1.0,
  radianceNodeAlpha_start: 0.95,
  radianceNodeAlpha_end: 1.0,
  radiancePathIntensity: 1.0,
  radiancePathIntensity_start: 1.0,
  radiancePathIntensity_end: 1.0,
  radianceKetherGlow: 1.8,
  radiancePathAnimSpeed: 1.2,
  radianceEasing: 'smoothstep',

  // ====== DESCENT PHASE (86-100%) ======
  descentNodeAlpha: 0.48,
  descentNodeAlpha_start: 1.0,
  descentNodeAlpha_end: 0.1,
  descentPathIntensity: 0.18,
  descentPathIntensity_start: 1.0,
  descentPathIntensity_end: 0.0,
  descentPathAnimSpeed: 0.8,
  descentEasing: 'easeOutQuart',

  // ====== PATH ANIMATION ======
  pathThickness: 1.5,
  pathSizeScale: 0.9,

  // ====== VISUAL EFFECTS ======
  nodeSize: 18,
  nodeGlowSize: 20,
  energyFlow: true,

  // ====== ENERGY PULSE SYSTEM ======
  enableEnergyPulses: true,
  pulseWaveSpeed: 1.0,
  pulseBreathSpeed: 1.0,
  pulseBreathIntensity: 0.2,
  pulseSpiralSpeed: 1.5,
  pulseSpiralRadius: 30,
  pulseAuraSpeed: 1.0,
  pulseAuraWidth: 0.1,
  pulseTracerSpeed: 1.5,
  pulseTracerCount: 2,
  energyPulseSizeScale: 0.7,

  // ====== MYSTIC SYMBOLS ======
  enableMysticSymbols: true,
  symbolGlowSize: 4,
  symbolShowOnPhases: ['radiance'],
  mysticSymbolSizeScale: 0.7,

  // ====== VISUAL ENHANCEMENTS ======
  fuzzDensity: 0.05,
  subdivisionIntensity: 0.12,
  interferenceAmount: 0.08,
  glowLayerIntensity: 0.08,

  // ====== DETAILED GEOMETRY SYSTEM ======
  enableDetailedGeometry: true,
  nodeLayerComplexity: 0.5,
  pathRibbonEffect: 0.2,
  harmonicSubdivisions: 0.3,
  crosshatchIntensity: 0.15,
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
  layerOpacity: 0.95,
  layerBlendMode: 'screen',

  // ====== METADATA ======
  _version: '2.1.0',
  _animationType: 'kabbalistic-sephiroth',
  _description: 'Clean, refined aesthetic letting pure geometry dominate'
};