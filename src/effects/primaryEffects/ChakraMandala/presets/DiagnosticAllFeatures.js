/**
 * DIAGNOSTIC PRESET: All Features Enabled with Maximum Visibility
 * 
 * Use this preset to debug rendering issues.
 * All three features (explosions, sine waves, energy beads) are explicitly enabled
 * with high opacity and intensity to maximize visibility.
 */

export const DIAGNOSTIC_ALL_FEATURES = {
  phaseAwakening_start: 0.0,
  phaseAscension_start: 0.25,
  phaseRadiance_start: 0.60,
  phaseDescentstart: 0.85,

  transitionZoneWidth: 0.05,

  // === CHAKRA EXPLOSION RAYS & PARTICLES ===
  enableChakraExplosions: true,           // ✓ EXPLICITLY ENABLED
  explosionRayCount: 16,                  // Lots of rays for visibility
  explosionRayLength: 80,                 // Very long rays
  explosionRayLengthMultiplier: 1.5,      // Extra boost
  explosionRingCount: 5,                  // Multiple rings
  explosionParticleCount: 20,             // Many particles
  explosionEvenParticleDistribution: true,
  explosionIntensity: 1.0,                // Maximum intensity
  explosionSynchronizeWithBreathing: true,
  explosionColorScheme: 'white',          // White for max visibility
  explosionEnableFuzzLayer: true,
  explosionFuzzColor: '#ffffff',
  explosionFuzzOpacityMultiplier: 0.6,
  explosionFuzzLayerOpacity: 0.9,         // Very visible
  explosionInvertFuzzLayers: false,

  // === VERTICAL SINE WAVES ===
  enableVerticalSineWaves: true,          // ✓ EXPLICITLY ENABLED
  sineWaveColor: '#00ff00',               // Bright green - very visible
  sineWaveFuzzColor: '#ffff00',           // Bright yellow fuzz
  sineWaveThickness: 4.0,                 // Thick for visibility
  sineWaveAmplitude: 25,                  // Large oscillation
  sineWaveFrequency: 2.0,
  sineWaveOpacityRange: { lower: 0.8, upper: 1.0 },   // Always visible
  sineWaveOpacityTimes: 2,
  sineWaveOpacityFindValueAlgorithm: 'sinusoidal',
  sineWaveBlurRange: { lower: 0, upper: 2 },         // Minimal blur
  sineWaveBlurTimes: 2,
  sineWaveBlurFindValueAlgorithm: 'sinusoidal',
  sineWaveAccentRange: { lower: 1.0, upper: 2.5 },
  sineWaveAccentTimes: 2,
  sineWaveAccentFindValueAlgorithm: 'sinusoidal',
  sineWaveFuzzLayerOpacity: 0.9,         // Very visible fuzz
  sineWaveInvertLayers: false,
  sineWaveChakraGrouping: 3,
  sineWaveProgression: 'sequential',
  sineWaveCount: null,
  sineWaveHarmonicRatios: [1, 2, 1.5],
  enableSineWaveAmplitudeOscillation: true,
  sineWaveAmplitudeOscillationRange: { lower: 1.0, upper: 2.0 },
  sineWaveAmplitudeOscillationTimes: 2,
  sineWaveAmplitudeOscillationAlgorithm: 'sinusoidal',

  // === ENERGY BEADS ===
  enableEnergyBeads: true,                // ✓ EXPLICITLY ENABLED
  energyBeadCount: 16,                    // Many beads
  energyBeadRadius: 10,                   // Large beads for visibility
  energyBeadColor: '#00ccff',             // Bright cyan
  energyBeadOpacity: 1.0,                 // Maximum opacity
  energyBeadGlowIntensity: 1.5,           // Strong glow
  energyBeadSpeed: 1.2,
  energyBeadRingLayer: -1,                // All rings
  energyBeadPulseEnabled: true,
  energyBeadPulseRange: { lower: 0.8, upper: 1.4 },
  energyBeadPulseTimes: 2,

  // Base features (reduced for focus on the three features)
  enableMandalaRings: true,
  mandalaRingSpeed: 1.0,
  mandalaRingOpacity: 0.3,                // Subtle so they don't interfere
  mandalaRingThickness: 1,
  mandalaRingLayers: 1,
  mandalaResonancePatterns: false,
  mandalaInnerRadius: 0.1,
  mandalaOuterRadius: 0.4,
  mandalaRadiusMultiplier: 1.0,

  enableFrequencyVisualization: true,
  frequencyOscillationSpeed: 2.0,
  frequencyDetailLayers: 1,

  enableEnergyFlow: true,
  energyFlowSpeed: 1.0,
  energyFlowDensity: 3,
  energyFlowTrailLength: 4,
  energyFlowSpirals: false,
  energyFlowSpiralDensity: 1,

  enableChakraGlows: true,
  chakraGlowSize: 30,
  chakraGlowIntensity: 0.4,
  chakraBreatheIntensity: 0.2,
  chakraAuraLayers: 1,

  enableCentralChannel: true,
  centralChannelGlow: 1.0,
  centralChannelAuras: false,

  useCustomChakraColors: false,

  nodeSize: 16,
  pathThickness: 1,
  layerBlendMode: 'screen',
  layerOpacity: 1.0,

  enableEnergyPulses: true,
  pulseWaveSpeed: 1.0,
  pulseBreathIntensity: 0.2,

  awakeningChakraFocus: 'muladhara',
  ascentionChakraFocus: 'anahata',
  radianceChakraFocus: 'sahasrara',
  descentChakraFocus: 'muladhara',
};