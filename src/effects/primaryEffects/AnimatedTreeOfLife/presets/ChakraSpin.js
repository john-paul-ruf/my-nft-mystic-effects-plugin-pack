/**
 * Chakra Spin Preset
 * Rapid animation with compressed timing and intense glow
 * 3x faster path traces for energetic effect
 * Visual Details: Medium fuzz + subdivisions for energetic feel
 * 
 * Color Palette: Vibrant magenta branch paths with golden highlights and intense magenta glow
 */

import { ColorPicker } from 'my-nft-gen/src/core/layer/configType/ColorPicker.js';

export const CHAKRA_SPIN = {
  // ====== PHASE TIMING & TRANSITIONS ======
  phaseAwakening_start: 0.0,
  phaseAscension_start: 0.15,
  phaseRadiance_start: 0.50,
  phaseDescentstart: 0.80,
  transitionZoneWidth: 0.05,

  // ====== COLORS (3 active) ======
  branchColor: new ColorPicker(ColorPicker.SelectionType.colorBucket, '#FF00FF'),
  accentColor: new ColorPicker(ColorPicker.SelectionType.colorBucket, '#FFD700'),
  glowColor: new ColorPicker(ColorPicker.SelectionType.colorBucket, '#FF1493'),

  // ====== AWAKENING PHASE (0-15%) ======
  awakeningNodeAlpha: 0.4,
  awakeningNodeAlpha_start: 0.2,
  awakeningNodeAlpha_end: 0.6,
  awakeningPathIntensity: 0.15,
  awakeningPathIntensity_start: 0.0,
  awakeningPathIntensity_end: 0.35,
  awakeningPathAnimSpeed: 1.2,
  awakeningEasing: 'easeInQuart',

  // ====== ASCENSION PHASE (15-50%) ======
  ascensionNodeAlpha: 0.9,
  ascensionNodeAlpha_start: 0.6,
  ascensionNodeAlpha_end: 0.98,
  ascensionPathIntensity: 1.0,
  ascensionPathIntensity_start: 0.35,
  ascensionPathIntensity_end: 1.0,
  ascensionPathAnimSpeed: 3.0,
  ascensionEasing: 'easeInOutCubic',

  // ====== RADIANCE PHASE (50-80%) ======
  radianceNodeAlpha: 1.0,
  radianceNodeAlpha_start: 0.98,
  radianceNodeAlpha_end: 1.0,
  radiancePathIntensity: 1.0,
  radiancePathIntensity_start: 1.0,
  radiancePathIntensity_end: 1.0,
  radianceKetherGlow: 3.0,
  radiancePathAnimSpeed: 2.8,
  radianceEasing: 'smootherstep',

  // ====== DESCENT PHASE (80-100%) ======
  descentNodeAlpha: 0.6,
  descentNodeAlpha_start: 1.0,
  descentNodeAlpha_end: 0.2,
  descentPathIntensity: 0.25,
  descentPathIntensity_start: 1.0,
  descentPathIntensity_end: 0.0,
  descentPathAnimSpeed: 1.5,
  descentEasing: 'easeOutCubic',

  // ====== PATH ANIMATION ======
  pathThickness: 2.2,
  pathSizeScale: 1.05,

  // ====== VISUAL EFFECTS ======
  nodeSize: 24,
  nodeGlowSize: 32,
  energyFlow: true,

  // ====== ENERGY PULSE SYSTEM ======
  enableEnergyPulses: true,
  pulseWaveSpeed: 3.5,
  pulseBreathSpeed: 3.0,
  pulseBreathIntensity: 0.6,
  pulseSpiralSpeed: 4.0,
  pulseSpiralRadius: 70,
  pulseAuraSpeed: 3.5,
  pulseAuraWidth: 0.2,
  pulseTracerSpeed: 4.5,
  pulseTracerCount: 8,
  energyPulseSizeScale: 1.15,

  // ====== MYSTIC SYMBOLS ======
  enableMysticSymbols: true,
  symbolGlowSize: 12,
  symbolShowOnPhases: ['awakening', 'ascension', 'radiance', 'descent'],
  mysticSymbolSizeScale: 1.2,

  // ====== VISUAL ENHANCEMENTS ======
  fuzzDensity: 0.12,
  subdivisionIntensity: 0.35,
  interferenceAmount: 0.15,
  glowLayerIntensity: 0.20,

  // ====== DETAILED GEOMETRY SYSTEM ======
  enableDetailedGeometry: true,
  nodeLayerComplexity: 0.75,
  pathRibbonEffect: 0.5,
  harmonicSubdivisions: 0.5,
  crosshatchIntensity: 0.3,
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
  _description: 'Energetic and rapid with intense visual detail'
};