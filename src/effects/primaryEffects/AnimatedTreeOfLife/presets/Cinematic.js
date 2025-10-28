/**
 * Cinematic Preset
 * Drama and visual spectacle - high detail layers create compelling visual narrative
 * Standard timing with maximum visual enrichment
 * 
 * Color Palette: Deep crimson branch paths with golden highlights and warm amber glow
 */

import { ColorPicker } from 'my-nft-gen/src/core/layer/configType/ColorPicker.js';

export const CINEMATIC = {
  // ====== PHASE TIMING & TRANSITIONS ======
  phaseAwakening_start: 0.0,
  phaseAscension_start: 0.20,
  phaseRadiance_start: 0.60,
  phaseDescentstart: 0.85,
  transitionZoneWidth: 0.05,

  // ====== COLORS (3 active) ======
  branchColor: new ColorPicker(ColorPicker.SelectionType.colorBucket, '#DC143C'),
  accentColor: new ColorPicker(ColorPicker.SelectionType.colorBucket, '#FFD700'),
  glowColor: new ColorPicker(ColorPicker.SelectionType.colorBucket, '#FFA500'),

  // ====== AWAKENING PHASE (0-20%) ======
  awakeningNodeAlpha: 0.35,
  awakeningNodeAlpha_start: 0.1,
  awakeningNodeAlpha_end: 0.5,
  awakeningPathIntensity: 0.15,
  awakeningPathIntensity_start: 0.0,
  awakeningPathIntensity_end: 0.4,
  awakeningPathAnimSpeed: 0.6,
  awakeningEasing: 'easeInCubic',

  // ====== ASCENSION PHASE (20-60%) ======
  ascensionNodeAlpha: 0.85,
  ascensionNodeAlpha_start: 0.5,
  ascensionNodeAlpha_end: 0.95,
  ascensionPathIntensity: 0.95,
  ascensionPathIntensity_start: 0.4,
  ascensionPathIntensity_end: 1.0,
  ascensionPathAnimSpeed: 2.0,
  ascensionEasing: 'easeInOutCubic',

  // ====== RADIANCE PHASE (60-85%) ======
  radianceNodeAlpha: 1.0,
  radianceNodeAlpha_start: 0.95,
  radianceNodeAlpha_end: 1.0,
  radiancePathIntensity: 1.0,
  radiancePathIntensity_start: 1.0,
  radiancePathIntensity_end: 1.0,
  radianceKetherGlow: 2.5,
  radiancePathAnimSpeed: 1.8,
  radianceEasing: 'smoothstep',

  // ====== DESCENT PHASE (85-100%) ======
  descentNodeAlpha: 0.5,
  descentNodeAlpha_start: 1.0,
  descentNodeAlpha_end: 0.15,
  descentPathIntensity: 0.2,
  descentPathIntensity_start: 1.0,
  descentPathIntensity_end: 0.0,
  descentPathAnimSpeed: 1.0,
  descentEasing: 'easeOutQuart',

  // ====== PATH ANIMATION ======
  pathThickness: 2.5,
  pathSizeScale: 1.1,

  // ====== VISUAL EFFECTS ======
  nodeSize: 22,
  nodeGlowSize: 28,
  energyFlow: true,

  // ====== ENERGY PULSE SYSTEM ======
  enableEnergyPulses: true,
  pulseWaveSpeed: 2.5,
  pulseBreathSpeed: 2.0,
  pulseBreathIntensity: 0.5,
  pulseSpiralSpeed: 3.0,
  pulseSpiralRadius: 55,
  pulseAuraSpeed: 2.5,
  pulseAuraWidth: 0.18,
  pulseTracerSpeed: 3.5,
  pulseTracerCount: 6,
  energyPulseSizeScale: 1.1,

  // ====== MYSTIC SYMBOLS ======
  enableMysticSymbols: true,
  symbolGlowSize: 10,
  symbolShowOnPhases: ['awakening', 'ascension', 'radiance', 'descent'],
  mysticSymbolSizeScale: 1.0,

  // ====== VISUAL ENHANCEMENTS ======
  fuzzDensity: 0.25,
  subdivisionIntensity: 0.50,
  interferenceAmount: 0.40,
  glowLayerIntensity: 0.30,

  // ====== DETAILED GEOMETRY SYSTEM ======
  enableDetailedGeometry: true,
  nodeLayerComplexity: 0.85,
  pathRibbonEffect: 0.7,
  harmonicSubdivisions: 0.8,
  crosshatchIntensity: 0.5,
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
  _description: 'Dramatic cinematography with maximum visual detail and impact'
};