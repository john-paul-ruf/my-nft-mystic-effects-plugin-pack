/**
 * Operator Overload Preset
 * Maximum visual complexity with all detail systems engaged at full capacity
 * Every available effect system running simultaneously at peak intensity
 * 
 * This preset enables:
 * - All 5 node geometry layers (crystalline, fibonacci, harmonic, orbital, mandala)
 * - All path enhancements (ribbon, subdivisions, crosshatch, thickness variation)
 * - Maximum energy pulses (waves, breathing, spirals, auras, tracers, resonance)
 * - Mystic symbols with full opacity and glow
 * - Maximum atmospheric and interference effects
 * 
 * Visual Result: Hyper-detailed mystical apparatus - overwhelming in the best way
 * 
 * Color Palette: Brilliant white branch paths with rainbow accents and cosmic purple glow
 */

import { ColorPicker } from 'my-nft-gen/src/core/layer/configType/ColorPicker.js';

export const OPERATOR_OVERLOAD = {
  // ====== PHASE TIMING & TRANSITIONS ======
  phaseAwakening_start: 0.0,
  phaseAscension_start: 0.12,
  phaseRadiance_start: 0.42,
  phaseDescentstart: 0.88,
  transitionZoneWidth: 0.05,

  // ====== COLORS (3 active) ======
  branchColor: new ColorPicker(ColorPicker.SelectionType.colorBucket, '#FFFFFF'),
  accentColor: new ColorPicker(ColorPicker.SelectionType.colorBucket, '#FF00FF'),
  glowColor: new ColorPicker(ColorPicker.SelectionType.colorBucket, '#8B00FF'),

  // ====== AWAKENING PHASE (0-12%) ======
  awakeningNodeAlpha: 0.45,
  awakeningNodeAlpha_start: 0.15,
  awakeningNodeAlpha_end: 0.65,
  awakeningPathIntensity: 0.35,
  awakeningPathIntensity_start: 0.1,
  awakeningPathIntensity_end: 0.5,
  awakeningPathAnimSpeed: 1.2,
  awakeningEasing: 'easeInCubic',

  // ====== ASCENSION PHASE (12-42%) ======
  ascensionNodeAlpha: 0.95,
  ascensionNodeAlpha_start: 0.65,
  ascensionNodeAlpha_end: 1.0,
  ascensionPathIntensity: 1.0,
  ascensionPathIntensity_start: 0.5,
  ascensionPathIntensity_end: 1.0,
  ascensionPathAnimSpeed: 3.0,
  ascensionEasing: 'easeInOutCubic',

  // ====== RADIANCE PHASE (42-88%) ======
  radianceNodeAlpha: 1.0,
  radianceNodeAlpha_start: 1.0,
  radianceNodeAlpha_end: 1.0,
  radiancePathIntensity: 1.0,
  radiancePathIntensity_start: 1.0,
  radiancePathIntensity_end: 1.0,
  radianceKetherGlow: 3.0,
  radiancePathAnimSpeed: 2.5,
  radianceEasing: 'smoothstep',

  // ====== DESCENT PHASE (88-100%) ======
  descentNodeAlpha: 0.4,
  descentNodeAlpha_start: 1.0,
  descentNodeAlpha_end: 0.0,
  descentPathIntensity: 0.15,
  descentPathIntensity_start: 1.0,
  descentPathIntensity_end: 0.0,
  descentPathAnimSpeed: 1.0,
  descentEasing: 'easeOutQuart',

  // ====== PATH ANIMATION ======
  pathThickness: 3,
  pathSizeScale: 1.2,

  // ====== VISUAL EFFECTS ======
  nodeSize: 28,
  nodeGlowSize: 35,
  energyFlow: true,

  // ====== ENERGY PULSE SYSTEM ======
  enableEnergyPulses: true,
  pulseWaveSpeed: 4.0,
  pulseBreathSpeed: 3.0,
  pulseBreathIntensity: 0.7,
  pulseSpiralSpeed: 5.0,
  pulseSpiralRadius: 80,
  pulseAuraSpeed: 4.0,
  pulseAuraWidth: 0.25,
  pulseTracerSpeed: 5.0,
  pulseTracerCount: 12,
  energyPulseSizeScale: 1.3,

  // ====== MYSTIC SYMBOLS ======
  enableMysticSymbols: true,
  symbolGlowSize: 15,
  symbolShowOnPhases: ['awakening', 'ascension', 'radiance', 'descent'],
  mysticSymbolSizeScale: 1.4,

  // ====== VISUAL ENHANCEMENTS ======
  fuzzDensity: 0.35,
  subdivisionIntensity: 0.85,
  interferenceAmount: 0.75,
  glowLayerIntensity: 0.45,

  // ====== DETAILED GEOMETRY SYSTEM ======
  enableDetailedGeometry: true,
  nodeLayerComplexity: 1.0,
  pathRibbonEffect: 1.0,
  harmonicSubdivisions: 1.0,
  crosshatchIntensity: 0.9,
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
  _description: 'OPERATOR OVERLOAD: Maximum complexity with all systems engaged - overwhelming visual spectacle with sacred geometry, energy pulses, mystic symbols, and detailed geometry layers working in perfect synchronization'
};