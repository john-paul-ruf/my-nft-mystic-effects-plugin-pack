/**
 * Chakra Mandala Presets
 * 
 * 10 unique configurations representing different chakra meditation practices,
 * energy patterns, and visual aesthetic journeys.
 * 
 * Each preset is designed to convey a specific spiritual intention or visual theme.
 */

/**
 * PRESET 1: KUNDALINI_AWAKENING
 * Theme: Classic kundalini rising - serpent ascends from root to crown
 * Perfect for: Meditation visualization, spiritual awakening journeys
 * Vibe: Mystical, energetic, transformative
 */
export const KUNDALINI_AWAKENING = {
  // Phase timing - extended ascension
  phaseAwakening_start: 0.0,
  phaseAscension_start: 0.15,
  phaseRadiance_start: 0.70,
  phaseDescentstart: 0.85,

  // Smooth transitions
  transitionZoneWidth: 0.05,

  // === PHASE TRANSPARENCY (CRITICAL - Makes effects visible!) ===
  // Awakening phase - emergence
  awakeningNodeAlpha: 0.3,
  awakeningNodeAlpha_start: 0.1,
  awakeningNodeAlpha_end: 0.5,
  // Ascension phase - rising
  ascensionNodeAlpha: 0.9,
  ascensionNodeAlpha_start: 0.5,
  ascensionNodeAlpha_end: 1.0,
  // Radiance phase - peak
  radianceNodeAlpha: 1.0,
  radianceNodeAlpha_start: 1.0,
  radianceNodeAlpha_end: 1.0,
  // Descent phase - descent
  descentNodeAlpha: 0.4,
  descentNodeAlpha_start: 1.0,
  descentNodeAlpha_end: 0.1,

  // Chakra-specific activation
  enableKundaliniSerpent: true,
  kundaliniSpeed: 1.2,
  kundaliniWaveAmplitude: 0.12,
  kundaliniGlowIntensity: 0.95,
  kundaliniFractalLayers: 2,
  kundaliniOvertones: 3,

  // Mandala rings - subtle
  enableMandalaRings: true,
  mandalaRingSpeed: 1.0,
  mandalaRingOpacity: 0.4,
  mandalaRingThickness: 1.5,
  mandalaSymmetry: 6,
  mandalaRingLayers: 2,
  mandalaResonancePatterns: true,
  mandalaInnerRadius: 0.1,
  mandalaOuterRadius: 0.4,
  mandalaRadiusMultiplier: 1.0,

  // Frequency visualization
  enableFrequencyVisualization: true,
  frequencyOscillationSpeed: 3.0,
  frequencyDetailLayers: 1,

  // Energy flow - prominent
  enableEnergyFlow: true,
  energyFlowSpeed: 1.8,
  energyFlowDensity: 8,
  energyFlowTrailLength: 6,
  energyFlowSpirals: true,
  energyFlowSpiralDensity: 2,

  // Chakra glows - moderate
  enableChakraGlows: true,
  chakraGlowSize: 40,
  chakraGlowIntensity: 0.7,
  chakraBreatheIntensity: 0.3,
  chakraAuraLayers: 1,

  // Central channel
  enableCentralChannel: true,
  centralChannelGlow: 1.5,
  centralChannelAuras: true,

  // Color overrides
  useCustomChakraColors: false,
  chakraColorOverride: '#ff0000',
  chakraGlowColorOverride: '#ff6666',

  // Rendering
  nodeSize: 22,
  pathThickness: 1.5,
  layerBlendMode: 'screen',
  layerOpacity: 1.0,

  // Energy pulses
  enableEnergyPulses: true,
  pulseWaveSpeed: 1.5,
  pulseBreathIntensity: 0.3,

  // Focus progression
  awakeningChakraFocus: 'muladhara',
  ascentionChakraFocus: 'anahata',
  radianceChakraFocus: 'sahasrara',
  descentChakraFocus: 'muladhara',

  // Chakra explosion effects - energetic fire bursts
  enableChakraExplosions: true,
  explosionRayCount: 12,
  explosionRayLength: 55,
  explosionRayLengthMultiplier: 1.0,
  explosionRingCount: 4,
  explosionParticleCount: 18,
  explosionEvenParticleDistribution: true,
  explosionIntensity: 0.85,
  explosionSynchronizeWithBreathing: true,
  explosionColorScheme: ['chakraColor', 'rainbow', 'white'],
  explosionEnableFuzzLayer: true,
  explosionFuzzColor: '#ff9999',
  explosionFuzzOpacityMultiplier: 0.4,
  explosionFuzzLayerOpacity: 0.6,
  explosionInvertFuzzLayers: false,

  // Vertical sine waves - dynamic serpent visualization
  enableVerticalSineWaves: true,
  sineWaveColor: '#c41e3a',                        // Deep red - kundalini fire
  sineWaveFuzzColor: '#ff6b6b',                    // Bright red glow
  sineWaveThickness: 2.5,
  sineWaveAmplitude: 18,                           // Strong horizontal movement
  sineWaveFrequency: 2.5,
  sineWaveOpacityRange: { lower: 0.4, upper: 1.0 },
  sineWaveOpacityTimes: 2,
  sineWaveOpacityFindValueAlgorithm: ['sinusoidal', 'square'],
  sineWaveBlurRange: { lower: 2, upper: 8 },
  sineWaveBlurTimes: 3,
  sineWaveBlurFindValueAlgorithm: ['sinusoidal'],
  sineWaveAccentRange: { lower: 0.8, upper: 2.5 },
  sineWaveAccentTimes: 3,
  sineWaveAccentFindValueAlgorithm: ['square', 'sawtooth'],
  sineWaveInvertLayers: false,
  sineWaveFuzzLayerOpacity: 0.6,
  sineWaveChakraGrouping: 3,
  sineWaveProgression: 'sequential',
  sineWaveCount: null,
  sineWaveHarmonicRatios: [1, 2, 1.5, 3, 2.5],
  enableSineWaveAmplitudeOscillation: true,
  sineWaveAmplitudeOscillationRange: { lower: 0.7, upper: 2.0 },
  sineWaveAmplitudeOscillationTimes: 2,
  sineWaveAmplitudeOscillationAlgorithm: ['sinusoidal', 'square'],

  // Energy beads
  enableEnergyBeads: true,
  energyBeadCount: 8,
  energyBeadRadius: 6,
  energyBeadColor: '#ff6b6b',
  energyBeadOpacity: 0.8,
  energyBeadGlowIntensity: 1.2,
  energyBeadSpeed: 1.0,
  energyBeadRingLayer: 1,
  energyBeadPulseEnabled: true,
  energyBeadPulseRange: { lower: 0.7, upper: 1.3 },
  energyBeadPulseTimes: 2,
};

/**
 * PRESET 2: HEART_CENTERED_HEALING
 * Theme: Heart chakra meditation with gentle energy flows
 * Perfect for: Compassion practice, emotional healing, love meditation
 * Vibe: Gentle, nurturing, centered
 */
export const HEART_CENTERED_HEALING = {
  phaseAwakening_start: 0.0,
  phaseAscension_start: 0.25,
  phaseRadiance_start: 0.50,
  phaseDescentstart: 0.80,

  transitionZoneWidth: 0.06,

  // === PHASE TRANSPARENCY (CRITICAL - Makes effects visible!) ===
  awakeningNodeAlpha: 0.3,
  awakeningNodeAlpha_start: 0.1,
  awakeningNodeAlpha_end: 0.5,
  ascensionNodeAlpha: 0.85,
  ascensionNodeAlpha_start: 0.5,
  ascensionNodeAlpha_end: 1.0,
  radianceNodeAlpha: 1.0,
  radianceNodeAlpha_start: 1.0,
  radianceNodeAlpha_end: 1.0,
  descentNodeAlpha: 0.3,
  descentNodeAlpha_start: 1.0,
  descentNodeAlpha_end: 0.1,

  enableKundaliniSerpent: true,
  kundaliniSpeed: 0.6,
  kundaliniWaveAmplitude: 0.08,
  kundaliniGlowIntensity: 0.6,
  kundaliniFractalLayers: 1,
  kundaliniOvertones: 2,

  enableMandalaRings: true,
  mandalaRingSpeed: 0.8,
  mandalaRingOpacity: 0.5,
  mandalaRingThickness: 2,
  mandalaSymmetry: 8,
  mandalaRingLayers: 2,
  mandalaResonancePatterns: true,
  mandalaInnerRadius: 0.1,
  mandalaOuterRadius: 0.4,
  mandalaRadiusMultiplier: 1.1,

  enableFrequencyVisualization: true,
  frequencyOscillationSpeed: 2.5,
  frequencyDetailLayers: 1,

  enableEnergyFlow: true,
  energyFlowSpeed: 1.2,
  energyFlowDensity: 6,
  energyFlowTrailLength: 10,
  energyFlowSpirals: true,
  energyFlowSpiralDensity: 2,

  enableChakraGlows: true,
  chakraGlowSize: 50,
  chakraGlowIntensity: 0.85,
  chakraBreatheIntensity: 0.5,
  chakraAuraLayers: 2,

  enableCentralChannel: true,
  centralChannelGlow: 1.2,
  centralChannelAuras: true,

  useCustomChakraColors: false,
  chakraColorOverride: '#27ae60',
  chakraGlowColorOverride: '#a9dfbf',

  nodeSize: 24,
  pathThickness: 2,
  layerBlendMode: 'lighten',
  layerOpacity: 0.95,

  enableEnergyPulses: true,
  pulseWaveSpeed: 1.0,
  pulseBreathIntensity: 0.5,

  awakeningChakraFocus: 'svadhisthana',
  ascentionChakraFocus: 'anahata',
  radianceChakraFocus: 'anahata',
  descentChakraFocus: 'anahata',

  // Chakra explosion effects - gentle compassionate pulses
  enableChakraExplosions: true,
  explosionRayCount: 8,
  explosionRayLength: 40,
  explosionRayLengthMultiplier: 1.0,
  explosionRingCount: 3,
  explosionParticleCount: 12,
  explosionEvenParticleDistribution: true,
  explosionIntensity: 0.5,
  explosionSynchronizeWithBreathing: true,
  explosionColorScheme: ['chakraColor', 'rainbow', 'white'],
  explosionEnableFuzzLayer: true,
  explosionFuzzColor: '#a9dfbf',
  explosionFuzzOpacityMultiplier: 0.3,
  explosionFuzzLayerOpacity: 0.5,
  explosionInvertFuzzLayers: false,

  // Vertical sine waves - gentle heart-centered flow
  enableVerticalSineWaves: true,
  sineWaveColor: '#27ae60',                        // Emerald green - heart
  sineWaveFuzzColor: '#a9dfbf',                    // Light green glow
  sineWaveThickness: 2.8,
  sineWaveAmplitude: 12,                           // Gentle oscillation
  sineWaveFrequency: 1.8,
  sineWaveOpacityRange: { lower: 0.5, upper: 0.95 },
  sineWaveOpacityTimes: 2,
  sineWaveOpacityFindValueAlgorithm: ['sinusoidal'],
  sineWaveBlurRange: { lower: 3, upper: 7 },
  sineWaveBlurTimes: 2,
  sineWaveBlurFindValueAlgorithm: ['sinusoidal'],
  sineWaveAccentRange: { lower: 0.6, upper: 2.0 },
  sineWaveAccentTimes: 2,
  sineWaveAccentFindValueAlgorithm: ['sinusoidal'],
  sineWaveInvertLayers: false,
  sineWaveFuzzLayerOpacity: 0.5,
  sineWaveChakraGrouping: 4,
  sineWaveProgression: 'overlapping',
  sineWaveCount: 5,
  sineWaveHarmonicRatios: [1, 1.5, 2, 1.2, 1.8],
  enableSineWaveAmplitudeOscillation: true,
  sineWaveAmplitudeOscillationRange: { lower: 0.8, upper: 1.8 },
  sineWaveAmplitudeOscillationTimes: 1.5,
  sineWaveAmplitudeOscillationAlgorithm: ['sinusoidal'],

  // Energy beads
  enableEnergyBeads: true,
  energyBeadCount: 8,
  energyBeadRadius: 6,
  energyBeadColor: '#27ae60',
  energyBeadOpacity: 0.75,
  energyBeadGlowIntensity: 1.0,
  energyBeadSpeed: 0.8,
  energyBeadRingLayer: 1,
  energyBeadPulseEnabled: true,
  energyBeadPulseRange: { lower: 0.8, upper: 1.2 },
  energyBeadPulseTimes: 1.5,
};

/**
 * PRESET 3: THIRD_EYE_ACTIVATION
 * Theme: Intense intuition and inner vision focus on Ajna
 * Perfect for: Intuitive development, psychic training, vision quests
 * Vibe: Hypnotic, visionary, introspective
 */
export const THIRD_EYE_ACTIVATION = {
  phaseAwakening_start: 0.0,
  phaseAscension_start: 0.20,
  phaseRadiance_start: 0.55,
  phaseDescentstart: 0.90,

  transitionZoneWidth: 0.04,

  // === PHASE TRANSPARENCY (CRITICAL - Makes effects visible!) ===
  awakeningNodeAlpha: 0.35,
  awakeningNodeAlpha_start: 0.1,
  awakeningNodeAlpha_end: 0.6,
  ascensionNodeAlpha: 0.95,
  ascensionNodeAlpha_start: 0.6,
  ascensionNodeAlpha_end: 1.0,
  radianceNodeAlpha: 1.0,
  radianceNodeAlpha_start: 1.0,
  radianceNodeAlpha_end: 1.0,
  descentNodeAlpha: 0.35,
  descentNodeAlpha_start: 1.0,
  descentNodeAlpha_end: 0.1,

  enableKundaliniSerpent: true,
  kundaliniSpeed: 2.0,
  kundaliniWaveAmplitude: 0.15,
  kundaliniGlowIntensity: 0.9,
  kundaliniFractalLayers: 3,
  kundaliniOvertones: 5,

  enableMandalaRings: true,
  mandalaRingSpeed: 2.5,
  mandalaRingOpacity: 0.7,
  mandalaRingThickness: 1,
  mandalaSymmetry: 12,
  mandalaRingLayers: 4,
  mandalaResonancePatterns: true,
  mandalaInnerRadius: 0.08,
  mandalaOuterRadius: 0.45,
  mandalaRadiusMultiplier: 1.2,

  enableFrequencyVisualization: true,
  frequencyOscillationSpeed: 4.5,
  frequencyDetailLayers: 3,

  enableEnergyFlow: true,
  energyFlowSpeed: 2.2,
  energyFlowDensity: 10,
  energyFlowTrailLength: 12,
  energyFlowSpirals: true,
  energyFlowSpiralDensity: 4,

  enableChakraGlows: true,
  chakraGlowSize: 60,
  chakraGlowIntensity: 1.0,
  chakraBreatheIntensity: 0.6,
  chakraAuraLayers: 3,

  enableCentralChannel: true,
  centralChannelGlow: 2.0,
  centralChannelAuras: true,

  useCustomChakraColors: false,
  chakraColorOverride: '#3b2c6d',
  chakraGlowColorOverride: '#9d84b7',

  nodeSize: 20,
  pathThickness: 1,
  layerBlendMode: 'screen',
  layerOpacity: 1.0,

  enableEnergyPulses: true,
  pulseWaveSpeed: 2.5,
  pulseBreathIntensity: 0.6,

  awakeningChakraFocus: 'manipura',
  ascentionChakraFocus: 'ajna',
  radianceChakraFocus: 'ajna',
  descentChakraFocus: 'anahata',

  // Chakra explosion effects - intense hypnotic visions
  enableChakraExplosions: true,
  explosionRayCount: 16,
  explosionRayLength: 65,
  explosionRayLengthMultiplier: 1.1,
  explosionRingCount: 5,
  explosionParticleCount: 24,
  explosionEvenParticleDistribution: false,
  explosionIntensity: 1.0,
  explosionSynchronizeWithBreathing: true,
  explosionColorScheme: ['chakraColor', 'rainbow', 'white'],
  explosionEnableFuzzLayer: true,
  explosionFuzzColor: '#9d84b7',
  explosionFuzzOpacityMultiplier: 0.5,
  explosionFuzzLayerOpacity: 0.7,
  explosionInvertFuzzLayers: true,

  // Vertical sine waves - hypnotic third eye patterns
  enableVerticalSineWaves: true,
  sineWaveColor: '#3b2c6d',                        // Deep indigo - intuition
  sineWaveFuzzColor: '#9d84b7',                    // Light purple glow
  sineWaveThickness: 2.0,
  sineWaveAmplitude: 22,                           // Intense oscillation
  sineWaveFrequency: 3.5,                          // Fast waves
  sineWaveOpacityRange: { lower: 0.3, upper: 1.0 },
  sineWaveOpacityTimes: 3,
  sineWaveOpacityFindValueAlgorithm: ['sinusoidal', 'square', 'sawtooth'],
  sineWaveBlurRange: { lower: 1, upper: 10 },
  sineWaveBlurTimes: 4,
  sineWaveBlurFindValueAlgorithm: ['square', 'sawtooth'],
  sineWaveAccentRange: { lower: 1.0, upper: 3.0 },
  sineWaveAccentTimes: 4,
  sineWaveAccentFindValueAlgorithm: ['sawtooth'],
  sineWaveInvertLayers: true,
  sineWaveFuzzLayerOpacity: 0.7,
  sineWaveChakraGrouping: 3,
  sineWaveProgression: 'sequential',
  sineWaveCount: null,
  sineWaveHarmonicRatios: [1.5, 2.5, 1, 3, 2],
  enableSineWaveAmplitudeOscillation: true,
  sineWaveAmplitudeOscillationRange: { lower: 0.6, upper: 2.5 },
  sineWaveAmplitudeOscillationTimes: 3,
  sineWaveAmplitudeOscillationAlgorithm: ['square', 'sawtooth'],

  // Energy beads
  enableEnergyBeads: true,
  energyBeadCount: 12,
  energyBeadRadius: 7,
  energyBeadColor: '#9d84b7',
  energyBeadOpacity: 0.9,
  energyBeadGlowIntensity: 1.5,
  energyBeadSpeed: 1.2,
  energyBeadRingLayer: -1,
  energyBeadPulseEnabled: true,
  energyBeadPulseRange: { lower: 0.6, upper: 1.4 },
  energyBeadPulseTimes: 3,
};

/**
 * PRESET 4: GROUNDING_STABILITY
 * Theme: Root chakra grounding with heavy presence
 * Perfect for: Stability practice, earthing meditation, presence training
 * Vibe: Solid, grounded, protective
 */
export const GROUNDING_STABILITY = {
  phaseAwakening_start: 0.0,
  phaseAscension_start: 0.30,
  phaseRadiance_start: 0.65,
  phaseDescentstart: 0.85,

  transitionZoneWidth: 0.08,

  // === PHASE TRANSPARENCY (CRITICAL - Makes effects visible!) ===
  awakeningNodeAlpha: 0.4,
  awakeningNodeAlpha_start: 0.15,
  awakeningNodeAlpha_end: 0.5,
  ascensionNodeAlpha: 0.8,
  ascensionNodeAlpha_start: 0.5,
  ascensionNodeAlpha_end: 0.95,
  radianceNodeAlpha: 1.0,
  radianceNodeAlpha_start: 1.0,
  radianceNodeAlpha_end: 1.0,
  descentNodeAlpha: 0.4,
  descentNodeAlpha_start: 1.0,
  descentNodeAlpha_end: 0.15,

  enableKundaliniSerpent: false,  // No serpent - roots staying deep
  kundaliniSpeed: 0.3,
  kundaliniWaveAmplitude: 0.02,
  kundaliniGlowIntensity: 0.3,
  kundaliniFractalLayers: 0,
  kundaliniOvertones: 0,

  enableMandalaRings: true,
  mandalaRingSpeed: 0.5,
  mandalaRingOpacity: 0.8,
  mandalaRingThickness: 3,
  mandalaSymmetry: 4,
  mandalaRingLayers: 2,
  mandalaResonancePatterns: false,
  mandalaInnerRadius: 0.15,
  mandalaOuterRadius: 0.35,
  mandalaRadiusMultiplier: 0.9,

  enableFrequencyVisualization: false,
  frequencyOscillationSpeed: 1.0,
  frequencyDetailLayers: 0,

  enableEnergyFlow: true,
  energyFlowSpeed: 0.8,
  energyFlowDensity: 4,
  energyFlowTrailLength: 4,
  energyFlowSpirals: false,
  energyFlowSpiralDensity: 0,

  enableChakraGlows: true,
  chakraGlowSize: 35,
  chakraGlowIntensity: 0.65,
  chakraBreatheIntensity: 0.1,
  chakraAuraLayers: 1,

  enableCentralChannel: true,
  centralChannelGlow: 0.8,
  centralChannelAuras: false,

  useCustomChakraColors: false,
  chakraColorOverride: '#704214',
  chakraGlowColorOverride: '#d2b48c',

  nodeSize: 26,
  pathThickness: 3,
  layerBlendMode: 'multiply',
  layerOpacity: 0.8,

  enableEnergyPulses: false,  // No pulse effects - stable and solid

  awakeningChakraFocus: 'muladhara',
  ascentionChakraFocus: 'muladhara',
  radianceChakraFocus: 'manipura',
  descentChakraFocus: 'muladhara',

  // Chakra explosion effects - subtle grounding tremors
  enableChakraExplosions: true,
  explosionRayCount: 6,
  explosionRayLength: 30,
  explosionRayLengthMultiplier: 0.9,
  explosionRingCount: 2,
  explosionParticleCount: 8,
  explosionEvenParticleDistribution: true,
  explosionIntensity: 0.3,
  explosionSynchronizeWithBreathing: true,
  explosionColorScheme: ['chakraColor', 'rainbow', 'white'],
  explosionEnableFuzzLayer: true,
  explosionFuzzColor: '#d2b48c',
  explosionFuzzOpacityMultiplier: 0.2,
  explosionFuzzLayerOpacity: 0.4,
  explosionInvertFuzzLayers: false,

  // Vertical sine waves - grounded, stable flow
  enableVerticalSineWaves: true,
  sineWaveColor: '#704214',                        // Dark brown - earth
  sineWaveFuzzColor: '#d2b48c',                    // Tan glow
  sineWaveThickness: 3.2,
  sineWaveAmplitude: 8,                            // Minimal movement - stable
  sineWaveFrequency: 1.2,
  sineWaveOpacityRange: { lower: 0.6, upper: 0.9 },
  sineWaveOpacityTimes: 1,
  sineWaveOpacityFindValueAlgorithm: ['sinusoidal'],
  sineWaveBlurRange: { lower: 4, upper: 6 },
  sineWaveBlurTimes: 1,
  sineWaveBlurFindValueAlgorithm: ['sinusoidal'],
  sineWaveAccentRange: { lower: 0.4, upper: 1.5 },
  sineWaveAccentTimes: 1,
  sineWaveAccentFindValueAlgorithm: ['sinusoidal'],
  sineWaveInvertLayers: false,
  sineWaveFuzzLayerOpacity: 0.4,
  sineWaveChakraGrouping: 5,
  sineWaveProgression: 'sequential',
  sineWaveCount: 3,
  sineWaveHarmonicRatios: [1, 1, 1],
  enableSineWaveAmplitudeOscillation: false,
  sineWaveAmplitudeOscillationRange: { lower: 0.9, upper: 1.1 },
  sineWaveAmplitudeOscillationTimes: 1,
  sineWaveAmplitudeOscillationAlgorithm: ['sinusoidal'],

  // Energy beads
  enableEnergyBeads: true,
  energyBeadCount: 6,
  energyBeadRadius: 5,
  energyBeadColor: '#704214',
  energyBeadOpacity: 0.7,
  energyBeadGlowIntensity: 0.8,
  energyBeadSpeed: 0.5,
  energyBeadRingLayer: 0,
  energyBeadPulseEnabled: false,
  energyBeadPulseRange: { lower: 0.95, upper: 1.05 },
  energyBeadPulseTimes: 1,
};

/**
 * PRESET 5: FULL_SPECTRUM_RESONANCE
 * Theme: All chakras equally activated in harmonic resonance
 * Perfect for: Full-body healing, complete system balance, wholeness meditation
 * Vibe: Balanced, harmonic, complete
 */
export const FULL_SPECTRUM_RESONANCE = {
  phaseAwakening_start: 0.0,
  phaseAscension_start: 0.20,
  phaseRadiance_start: 0.50,
  phaseDescentstart: 0.80,

  transitionZoneWidth: 0.05,

  // === PHASE TRANSPARENCY (CRITICAL - Makes effects visible!) ===
  awakeningNodeAlpha: 0.3,
  awakeningNodeAlpha_start: 0.1,
  awakeningNodeAlpha_end: 0.5,
  ascensionNodeAlpha: 0.9,
  ascensionNodeAlpha_start: 0.5,
  ascensionNodeAlpha_end: 1.0,
  radianceNodeAlpha: 1.0,
  radianceNodeAlpha_start: 1.0,
  radianceNodeAlpha_end: 1.0,
  descentNodeAlpha: 0.3,
  descentNodeAlpha_start: 1.0,
  descentNodeAlpha_end: 0.1,

  enableKundaliniSerpent: true,
  kundaliniSpeed: 1.0,
  kundaliniWaveAmplitude: 0.10,
  kundaliniGlowIntensity: 0.75,
  kundaliniFractalLayers: 2,
  kundaliniOvertones: 3,

  enableMandalaRings: true,
  mandalaRingSpeed: 1.5,
  mandalaRingOpacity: 0.6,
  mandalaRingThickness: 1.5,
  mandalaSymmetry: 7,  // Sacred number
  mandalaRingLayers: 3,
  mandalaResonancePatterns: true,
  mandalaInnerRadius: 0.1,
  mandalaOuterRadius: 0.4,
  mandalaRadiusMultiplier: 1.05,

  enableFrequencyVisualization: true,
  frequencyOscillationSpeed: 3.0,
  frequencyDetailLayers: 2,

  enableEnergyFlow: true,
  energyFlowSpeed: 1.5,
  energyFlowDensity: 7,
  energyFlowTrailLength: 8,
  energyFlowSpirals: true,
  energyFlowSpiralDensity: 3,

  enableChakraGlows: true,
  chakraGlowSize: 45,
  chakraGlowIntensity: 0.8,
  chakraBreatheIntensity: 0.4,
  chakraAuraLayers: 2,

  enableCentralChannel: true,
  centralChannelGlow: 1.3,
  centralChannelAuras: true,

  useCustomChakraColors: false,
  chakraColorOverride: '#f39c12',
  chakraGlowColorOverride: '#f8c471',

  nodeSize: 23,
  pathThickness: 2,
  layerBlendMode: 'screen',
  layerOpacity: 1.0,

  enableEnergyPulses: true,
  pulseWaveSpeed: 1.5,
  pulseBreathIntensity: 0.4,

  awakeningChakraFocus: 'muladhara',
  ascentionChakraFocus: 'anahata',
  radianceChakraFocus: 'anahata',
  descentChakraFocus: 'muladhara',

  // Chakra explosion effects - balanced harmonic bursts
  enableChakraExplosions: true,
  explosionRayCount: 12,
  explosionRayLength: 48,
  explosionRayLengthMultiplier: 1.0,
  explosionRingCount: 4,
  explosionParticleCount: 16,
  explosionEvenParticleDistribution: true,
  explosionIntensity: 0.7,
  explosionSynchronizeWithBreathing: true,
  explosionColorScheme: ['chakraColor', 'rainbow', 'white'],
  explosionEnableFuzzLayer: true,
  explosionFuzzColor: '#f8c471',
  explosionFuzzOpacityMultiplier: 0.35,
  explosionFuzzLayerOpacity: 0.6,
  explosionInvertFuzzLayers: false,

  // Vertical sine waves - balanced harmonic resonance
  enableVerticalSineWaves: true,
  sineWaveColor: '#f39c12',                        // Golden - harmony
  sineWaveFuzzColor: '#f8c471',                    // Light gold glow
  sineWaveThickness: 2.6,
  sineWaveAmplitude: 15,
  sineWaveFrequency: 2.2,
  sineWaveOpacityRange: { lower: 0.4, upper: 0.95 },
  sineWaveOpacityTimes: 2,
  sineWaveOpacityFindValueAlgorithm: ['sinusoidal', 'square'],
  sineWaveBlurRange: { lower: 2.5, upper: 7.5 },
  sineWaveBlurTimes: 2.5,
  sineWaveBlurFindValueAlgorithm: ['sinusoidal'],
  sineWaveAccentRange: { lower: 0.7, upper: 2.2 },
  sineWaveAccentTimes: 2.5,
  sineWaveAccentFindValueAlgorithm: ['sinusoidal', 'square'],
  sineWaveInvertLayers: false,
  sineWaveFuzzLayerOpacity: 0.6,
  sineWaveChakraGrouping: 3,
  sineWaveProgression: 'overlapping',
  sineWaveCount: null,
  sineWaveHarmonicRatios: [1, 1.5, 2, 1, 1.5],
  enableSineWaveAmplitudeOscillation: true,
  sineWaveAmplitudeOscillationRange: { lower: 0.8, upper: 1.9 },
  sineWaveAmplitudeOscillationTimes: 2,
  sineWaveAmplitudeOscillationAlgorithm: ['sinusoidal'],

  // Energy beads
  enableEnergyBeads: true,
  energyBeadCount: 10,
  energyBeadRadius: 6,
  energyBeadColor: '#f39c12',
  energyBeadOpacity: 0.8,
  energyBeadGlowIntensity: 1.2,
  energyBeadSpeed: 1.0,
  energyBeadRingLayer: 1,
  energyBeadPulseEnabled: true,
  energyBeadPulseRange: { lower: 0.75, upper: 1.25 },
  energyBeadPulseTimes: 2,
};

/**
 * PRESET 6: CROWN_ENLIGHTENMENT
 * Theme: Ascending toward divine consciousness and crown activation
 * Perfect for: Spiritual elevation, transcendence meditation, cosmic consciousness
 * Vibe: Ethereal, transcendent, luminous
 */
export const CROWN_ENLIGHTENMENT = {
  phaseAwakening_start: 0.0,
  phaseAscension_start: 0.15,
  phaseRadiance_start: 0.60,
  phaseDescentstart: 0.88,

  transitionZoneWidth: 0.04,

  // === PHASE TRANSPARENCY (CRITICAL - Makes effects visible!) ===
  awakeningNodeAlpha: 0.3,
  awakeningNodeAlpha_start: 0.1,
  awakeningNodeAlpha_end: 0.5,
  ascensionNodeAlpha: 0.95,
  ascensionNodeAlpha_start: 0.5,
  ascensionNodeAlpha_end: 1.0,
  radianceNodeAlpha: 1.0,
  radianceNodeAlpha_start: 1.0,
  radianceNodeAlpha_end: 1.0,
  descentNodeAlpha: 0.35,
  descentNodeAlpha_start: 1.0,
  descentNodeAlpha_end: 0.1,

  enableKundaliniSerpent: true,
  kundaliniSpeed: 1.8,
  kundaliniWaveAmplitude: 0.14,
  kundaliniGlowIntensity: 1.0,
  kundaliniFractalLayers: 3,
  kundaliniOvertones: 4,

  enableMandalaRings: true,
  mandalaRingSpeed: 2.0,
  mandalaRingOpacity: 0.5,
  mandalaRingThickness: 1,
  mandalaSymmetry: 12,
  mandalaRingLayers: 4,
  mandalaResonancePatterns: true,
  mandalaInnerRadius: 0.08,
  mandalaOuterRadius: 0.42,
  mandalaRadiusMultiplier: 1.15,

  enableFrequencyVisualization: true,
  frequencyOscillationSpeed: 4.0,
  frequencyDetailLayers: 3,

  enableEnergyFlow: true,
  energyFlowSpeed: 2.0,
  energyFlowDensity: 9,
  energyFlowTrailLength: 10,
  energyFlowSpirals: true,
  energyFlowSpiralDensity: 4,

  enableChakraGlows: true,
  chakraGlowSize: 55,
  chakraGlowIntensity: 0.95,
  chakraBreatheIntensity: 0.5,
  chakraAuraLayers: 3,

  enableCentralChannel: true,
  centralChannelGlow: 1.8,
  centralChannelAuras: true,

  useCustomChakraColors: false,
  chakraColorOverride: '#e8daef',
  chakraGlowColorOverride: '#f5b7b1',

  nodeSize: 21,
  pathThickness: 1.5,
  layerBlendMode: 'screen',
  layerOpacity: 1.0,

  enableEnergyPulses: true,
  pulseWaveSpeed: 2.0,
  pulseBreathIntensity: 0.5,

  awakeningChakraFocus: 'manipura',
  ascentionChakraFocus: 'vishuddha',
  radianceChakraFocus: 'sahasrara',
  descentChakraFocus: 'anahata',

  // Chakra explosion effects - transcendent divine light
  enableChakraExplosions: true,
  explosionRayCount: 14,
  explosionRayLength: 60,
  explosionRayLengthMultiplier: 1.05,
  explosionRingCount: 5,
  explosionParticleCount: 20,
  explosionEvenParticleDistribution: true,
  explosionIntensity: 0.9,
  explosionSynchronizeWithBreathing: true,
  explosionColorScheme: ['chakraColor', 'rainbow', 'white'],
  explosionEnableFuzzLayer: true,
  explosionFuzzColor: '#f5b7b1',
  explosionFuzzOpacityMultiplier: 0.45,
  explosionFuzzLayerOpacity: 0.65,
  explosionInvertFuzzLayers: true,

  // Vertical sine waves - transcendent crown activation
  enableVerticalSineWaves: true,
  sineWaveColor: '#e8daef',                        // Lavender - divine light
  sineWaveFuzzColor: '#f5b7b1',                    // Soft pink glow
  sineWaveThickness: 2.2,
  sineWaveAmplitude: 20,
  sineWaveFrequency: 3.0,
  sineWaveOpacityRange: { lower: 0.35, upper: 1.0 },
  sineWaveOpacityTimes: 3,
  sineWaveOpacityFindValueAlgorithm: ['sinusoidal', 'sawtooth'],
  sineWaveBlurRange: { lower: 1.5, upper: 9 },
  sineWaveBlurTimes: 3.5,
  sineWaveBlurFindValueAlgorithm: ['sinusoidal', 'sawtooth'],
  sineWaveAccentRange: { lower: 1.0, upper: 2.8 },
  sineWaveAccentTimes: 3.5,
  sineWaveAccentFindValueAlgorithm: ['sawtooth'],
  sineWaveInvertLayers: true,
  sineWaveFuzzLayerOpacity: 0.65,
  sineWaveChakraGrouping: 3,
  sineWaveProgression: 'sequential',
  sineWaveCount: null,
  sineWaveHarmonicRatios: [2, 3, 1.5, 2.5, 1],
  enableSineWaveAmplitudeOscillation: true,
  sineWaveAmplitudeOscillationRange: { lower: 0.5, upper: 2.2 },
  sineWaveAmplitudeOscillationTimes: 3,
  sineWaveAmplitudeOscillationAlgorithm: ['sinusoidal', 'sawtooth'],

  // Energy beads
  enableEnergyBeads: true,
  energyBeadCount: 12,
  energyBeadRadius: 7,
  energyBeadColor: '#e8daef',
  energyBeadOpacity: 0.85,
  energyBeadGlowIntensity: 1.4,
  energyBeadSpeed: 1.1,
  energyBeadRingLayer: 2,
  energyBeadPulseEnabled: true,
  energyBeadPulseRange: { lower: 0.7, upper: 1.3 },
  energyBeadPulseTimes: 2.5,
};

/**
 * PRESET 7: CREATIVE_FLOW
 * Theme: Sacral energy activation with creative power
 * Perfect for: Creative inspiration, artistic flow states, sensual awareness
 * Vibe: Fluid, creative, passionate
 */
export const CREATIVE_FLOW = {
  phaseAwakening_start: 0.0,
  phaseAscension_start: 0.25,
  phaseRadiance_start: 0.58,
  phaseDescentstart: 0.82,

  transitionZoneWidth: 0.06,

  // === PHASE TRANSPARENCY (CRITICAL - Makes effects visible!) ===
  awakeningNodeAlpha: 0.3,
  awakeningNodeAlpha_start: 0.1,
  awakeningNodeAlpha_end: 0.5,
  ascensionNodeAlpha: 0.88,
  ascensionNodeAlpha_start: 0.5,
  ascensionNodeAlpha_end: 1.0,
  radianceNodeAlpha: 1.0,
  radianceNodeAlpha_start: 1.0,
  radianceNodeAlpha_end: 1.0,
  descentNodeAlpha: 0.35,
  descentNodeAlpha_start: 1.0,
  descentNodeAlpha_end: 0.1,

  enableKundaliniSerpent: true,
  kundaliniSpeed: 1.6,
  kundaliniWaveAmplitude: 0.18,  // Extra wavy!
  kundaliniGlowIntensity: 0.85,
  kundaliniFractalLayers: 2,
  kundaliniOvertones: 3,

  enableMandalaRings: true,
  mandalaRingSpeed: 1.8,
  mandalaRingOpacity: 0.55,
  mandalaRingThickness: 2,
  mandalaSymmetry: 5,  // Pentagonal flow
  mandalaRingLayers: 3,
  mandalaResonancePatterns: true,
  mandalaInnerRadius: 0.1,
  mandalaOuterRadius: 0.4,
  mandalaRadiusMultiplier: 1.08,

  enableFrequencyVisualization: true,
  frequencyOscillationSpeed: 3.2,
  frequencyDetailLayers: 2,

  enableEnergyFlow: true,
  energyFlowSpeed: 1.7,
  energyFlowDensity: 7,
  energyFlowTrailLength: 12,
  energyFlowSpirals: true,
  energyFlowSpiralDensity: 5,

  enableChakraGlows: true,
  chakraGlowSize: 48,
  chakraGlowIntensity: 0.8,
  chakraBreatheIntensity: 0.6,
  chakraAuraLayers: 2,

  enableCentralChannel: true,
  centralChannelGlow: 1.4,
  centralChannelAuras: true,

  useCustomChakraColors: false,
  chakraColorOverride: '#e74c3c',
  chakraGlowColorOverride: '#f5b7b1',

  nodeSize: 22,
  pathThickness: 2,
  layerBlendMode: 'lighten',
  layerOpacity: 0.95,

  enableEnergyPulses: true,
  pulseWaveSpeed: 1.8,
  pulseBreathIntensity: 0.6,

  awakeningChakraFocus: 'svadhisthana',
  ascentionChakraFocus: 'manipura',
  radianceChakraFocus: 'anahata',
  descentChakraFocus: 'svadhisthana',

  // Chakra explosion effects - creative passionate eruptions
  enableChakraExplosions: true,
  explosionRayCount: 13,
  explosionRayLength: 52,
  explosionRayLengthMultiplier: 1.02,
  explosionRingCount: 4,
  explosionParticleCount: 20,
  explosionEvenParticleDistribution: false,
  explosionIntensity: 0.8,
  explosionSynchronizeWithBreathing: true,
  explosionColorScheme: ['chakraColor', 'rainbow', 'white'],
  explosionEnableFuzzLayer: true,
  explosionFuzzColor: '#f5b7b1',
  explosionFuzzOpacityMultiplier: 0.38,
  explosionFuzzLayerOpacity: 0.6,
  explosionInvertFuzzLayers: false,

  // Vertical sine waves - creative fluid motion
  enableVerticalSineWaves: true,
  sineWaveColor: '#e74c3c',                        // Orange-red - creativity
  sineWaveFuzzColor: '#f5b7b1',                    // Coral glow
  sineWaveThickness: 2.4,
  sineWaveAmplitude: 19,                           // Fluid movement
  sineWaveFrequency: 2.8,
  sineWaveOpacityRange: { lower: 0.35, upper: 0.98 },
  sineWaveOpacityTimes: 2.5,
  sineWaveOpacityFindValueAlgorithm: ['sinusoidal', 'square'],
  sineWaveBlurRange: { lower: 2, upper: 8.5 },
  sineWaveBlurTimes: 3,
  sineWaveBlurFindValueAlgorithm: ['square'],
  sineWaveAccentRange: { lower: 0.9, upper: 2.6 },
  sineWaveAccentTimes: 3,
  sineWaveAccentFindValueAlgorithm: ['square'],
  sineWaveInvertLayers: false,
  sineWaveFuzzLayerOpacity: 0.6,
  sineWaveChakraGrouping: 3,
  sineWaveProgression: 'overlapping',
  sineWaveCount: null,
  sineWaveHarmonicRatios: [1.2, 2.5, 1.8, 2, 1.5],
  enableSineWaveAmplitudeOscillation: true,
  sineWaveAmplitudeOscillationRange: { lower: 0.65, upper: 2.1 },
  sineWaveAmplitudeOscillationTimes: 2.5,
  sineWaveAmplitudeOscillationAlgorithm: ['square', 'sawtooth'],

  // Energy beads
  enableEnergyBeads: true,
  energyBeadCount: 10,
  energyBeadRadius: 6,
  energyBeadColor: '#e74c3c',
  energyBeadOpacity: 0.8,
  energyBeadGlowIntensity: 1.3,
  energyBeadSpeed: 1.1,
  energyBeadRingLayer: 1,
  energyBeadPulseEnabled: true,
  energyBeadPulseRange: { lower: 0.7, upper: 1.3 },
  energyBeadPulseTimes: 2.5,
};

/**
 * PRESET 8: THROAT_TRUTH_EXPRESSION
 * Theme: Communication and truth activation with resonant frequencies
 * Perfect for: Speaking truth, communication clarity, vocal healing
 * Vibe: Clear, resonant, empowering
 */
export const THROAT_TRUTH_EXPRESSION = {
  phaseAwakening_start: 0.0,
  phaseAscension_start: 0.22,
  phaseRadiance_start: 0.55,
  phaseDescentstart: 0.85,

  transitionZoneWidth: 0.05,

  // === PHASE TRANSPARENCY (CRITICAL - Makes effects visible!) ===
  awakeningNodeAlpha: 0.3,
  awakeningNodeAlpha_start: 0.1,
  awakeningNodeAlpha_end: 0.5,
  ascensionNodeAlpha: 0.87,
  ascensionNodeAlpha_start: 0.5,
  ascensionNodeAlpha_end: 1.0,
  radianceNodeAlpha: 1.0,
  radianceNodeAlpha_start: 1.0,
  radianceNodeAlpha_end: 1.0,
  descentNodeAlpha: 0.3,
  descentNodeAlpha_start: 1.0,
  descentNodeAlpha_end: 0.1,

  enableKundaliniSerpent: true,
  kundaliniSpeed: 1.4,
  kundaliniWaveAmplitude: 0.09,
  kundaliniGlowIntensity: 0.8,
  kundaliniFractalLayers: 2,
  kundaliniOvertones: 3,

  enableMandalaRings: true,
  mandalaRingSpeed: 1.6,
  mandalaRingOpacity: 0.65,
  mandalaRingThickness: 1.5,
  mandalaSymmetry: 8,
  mandalaRingLayers: 3,
  mandalaResonancePatterns: true,
  mandalaInnerRadius: 0.1,
  mandalaOuterRadius: 0.4,
  mandalaRadiusMultiplier: 1.03,

  enableFrequencyVisualization: true,
  frequencyOscillationSpeed: 3.5,
  frequencyDetailLayers: 2,

  enableEnergyFlow: true,
  energyFlowSpeed: 1.9,
  energyFlowDensity: 8,
  energyFlowTrailLength: 9,
  energyFlowSpirals: true,
  energyFlowSpiralDensity: 3,

  enableChakraGlows: true,
  chakraGlowSize: 42,
  chakraGlowIntensity: 0.75,
  chakraBreatheIntensity: 0.45,
  chakraAuraLayers: 2,

  enableCentralChannel: true,
  centralChannelGlow: 1.5,
  centralChannelAuras: true,

  useCustomChakraColors: false,
  chakraColorOverride: '#3498db',
  chakraGlowColorOverride: '#85c1e9',

  nodeSize: 22,
  pathThickness: 1.5,
  layerBlendMode: 'screen',
  layerOpacity: 1.0,

  enableEnergyPulses: true,
  pulseWaveSpeed: 2.0,
  pulseBreathIntensity: 0.45,

  awakeningChakraFocus: 'anahata',
  ascentionChakraFocus: 'vishuddha',
  radianceChakraFocus: 'vishuddha',
  descentChakraFocus: 'anahata',

  // Chakra explosion effects - resonant truth expressions
  enableChakraExplosions: true,
  explosionRayCount: 10,
  explosionRayLength: 45,
  explosionRayLengthMultiplier: 1.0,
  explosionRingCount: 3,
  explosionParticleCount: 14,
  explosionEvenParticleDistribution: true,
  explosionIntensity: 0.65,
  explosionSynchronizeWithBreathing: true,
  explosionColorScheme: ['chakraColor', 'rainbow', 'white'],
  explosionEnableFuzzLayer: true,
  explosionFuzzColor: '#85c1e9',
  explosionFuzzOpacityMultiplier: 0.32,
  explosionFuzzLayerOpacity: 0.55,
  explosionInvertFuzzLayers: false,

  // Vertical sine waves - resonant truth vibrations
  enableVerticalSineWaves: true,
  sineWaveColor: '#3498db',                        // Cyan blue - communication
  sineWaveFuzzColor: '#85c1e9',                    // Light blue glow
  sineWaveThickness: 2.5,
  sineWaveAmplitude: 14,
  sineWaveFrequency: 2.6,
  sineWaveOpacityRange: { lower: 0.4, upper: 0.95 },
  sineWaveOpacityTimes: 2,
  sineWaveOpacityFindValueAlgorithm: ['sinusoidal', 'square'],
  sineWaveBlurRange: { lower: 2.5, upper: 7.5 },
  sineWaveBlurTimes: 2.5,
  sineWaveBlurFindValueAlgorithm: ['sinusoidal'],
  sineWaveAccentRange: { lower: 0.8, upper: 2.4 },
  sineWaveAccentTimes: 2.5,
  sineWaveAccentFindValueAlgorithm: ['sinusoidal', 'square'],
  sineWaveInvertLayers: false,
  sineWaveFuzzLayerOpacity: 0.55,
  sineWaveChakraGrouping: 4,
  sineWaveProgression: 'sequential',
  sineWaveCount: null,
  sineWaveHarmonicRatios: [1, 2, 1.5, 2.5, 1],
  enableSineWaveAmplitudeOscillation: true,
  sineWaveAmplitudeOscillationRange: { lower: 0.75, upper: 1.85 },
  sineWaveAmplitudeOscillationTimes: 2,
  sineWaveAmplitudeOscillationAlgorithm: ['sinusoidal'],

  // Energy beads
  enableEnergyBeads: true,
  energyBeadCount: 8,
  energyBeadRadius: 6,
  energyBeadColor: '#3498db',
  energyBeadOpacity: 0.78,
  energyBeadGlowIntensity: 1.15,
  energyBeadSpeed: 0.95,
  energyBeadRingLayer: 1,
  energyBeadPulseEnabled: true,
  energyBeadPulseRange: { lower: 0.75, upper: 1.25 },
  energyBeadPulseTimes: 2,
};

/**
 * PRESET 9: SOLAR_POWER_WILL
 * Theme: Personal power and willpower activation at Manipura
 * Perfect for: Empowerment, manifestation, personal authority training
 * Vibe: Powerful, transformative, radiant
 */
export const SOLAR_POWER_WILL = {
  phaseAwakening_start: 0.0,
  phaseAscension_start: 0.18,
  phaseRadiance_start: 0.52,
  phaseDescentstart: 0.83,

  transitionZoneWidth: 0.05,

  // === PHASE TRANSPARENCY (CRITICAL - Makes effects visible!) ===
  awakeningNodeAlpha: 0.3,
  awakeningNodeAlpha_start: 0.1,
  awakeningNodeAlpha_end: 0.5,
  ascensionNodeAlpha: 0.92,
  ascensionNodeAlpha_start: 0.5,
  ascensionNodeAlpha_end: 1.0,
  radianceNodeAlpha: 1.0,
  radianceNodeAlpha_start: 1.0,
  radianceNodeAlpha_end: 1.0,
  descentNodeAlpha: 0.35,
  descentNodeAlpha_start: 1.0,
  descentNodeAlpha_end: 0.1,

  enableKundaliniSerpent: true,
  kundaliniSpeed: 1.9,
  kundaliniWaveAmplitude: 0.11,
  kundaliniGlowIntensity: 0.92,
  kundaliniFractalLayers: 2,
  kundaliniOvertones: 4,

  enableMandalaRings: true,
  mandalaRingSpeed: 2.2,
  mandalaRingOpacity: 0.62,
  mandalaRingThickness: 2,
  mandalaSymmetry: 10,
  mandalaRingLayers: 3,
  mandalaResonancePatterns: true,
  mandalaInnerRadius: 0.1,
  mandalaOuterRadius: 0.4,
  mandalaRadiusMultiplier: 1.07,

  enableFrequencyVisualization: true,
  frequencyOscillationSpeed: 3.3,
  frequencyDetailLayers: 2,

  enableEnergyFlow: true,
  energyFlowSpeed: 2.1,
  energyFlowDensity: 9,
  energyFlowTrailLength: 10,
  energyFlowSpirals: true,
  energyFlowSpiralDensity: 4,

  enableChakraGlows: true,
  chakraGlowSize: 50,
  chakraGlowIntensity: 0.88,
  chakraBreatheIntensity: 0.55,
  chakraAuraLayers: 2,

  enableCentralChannel: true,
  centralChannelGlow: 1.7,
  centralChannelAuras: true,

  useCustomChakraColors: false,
  chakraColorOverride: '#f1c40f',
  chakraGlowColorOverride: '#fdebd0',

  nodeSize: 23,
  pathThickness: 1.5,
  layerBlendMode: 'screen',
  layerOpacity: 1.0,

  enableEnergyPulses: true,
  pulseWaveSpeed: 2.2,
  pulseBreathIntensity: 0.55,

  awakeningChakraFocus: 'muladhara',
  ascentionChakraFocus: 'manipura',
  radianceChakraFocus: 'manipura',
  descentChakraFocus: 'anahata',

  // Chakra explosion effects - solar power manifestations
  enableChakraExplosions: true,
  explosionRayCount: 15,
  explosionRayLength: 58,
  explosionRayLengthMultiplier: 1.04,
  explosionRingCount: 4,
  explosionParticleCount: 22,
  explosionEvenParticleDistribution: true,
  explosionIntensity: 0.95,
  explosionSynchronizeWithBreathing: true,
  explosionColorScheme: ['chakraColor', 'rainbow', 'white'],
  explosionEnableFuzzLayer: true,
  explosionFuzzColor: '#fdebd0',
  explosionFuzzOpacityMultiplier: 0.42,
  explosionFuzzLayerOpacity: 0.65,
  explosionInvertFuzzLayers: false,

  // Vertical sine waves - powerful will manifestation
  enableVerticalSineWaves: true,
  sineWaveColor: '#f1c40f',                        // Golden yellow - solar power
  sineWaveFuzzColor: '#fdebd0',                    // Light yellow glow
  sineWaveThickness: 2.7,
  sineWaveAmplitude: 17,
  sineWaveFrequency: 2.9,
  sineWaveOpacityRange: { lower: 0.38, upper: 0.98 },
  sineWaveOpacityTimes: 2.5,
  sineWaveOpacityFindValueAlgorithm: ['sinusoidal', 'square'],
  sineWaveBlurRange: { lower: 2, upper: 8 },
  sineWaveBlurTimes: 3,
  sineWaveBlurFindValueAlgorithm: ['square'],
  sineWaveAccentRange: { lower: 0.9, upper: 2.5 },
  sineWaveAccentTimes: 3,
  sineWaveAccentFindValueAlgorithm: ['square', 'sawtooth'],
  sineWaveInvertLayers: false,
  sineWaveFuzzLayerOpacity: 0.65,
  sineWaveChakraGrouping: 3,
  sineWaveProgression: 'sequential',
  sineWaveCount: null,
  sineWaveHarmonicRatios: [1.5, 2, 1, 2.5, 3],
  enableSineWaveAmplitudeOscillation: true,
  sineWaveAmplitudeOscillationRange: { lower: 0.7, upper: 2.0 },
  sineWaveAmplitudeOscillationTimes: 2.5,
  sineWaveAmplitudeOscillationAlgorithm: ['square', 'sawtooth'],

  // Energy beads
  enableEnergyBeads: true,
  energyBeadCount: 11,
  energyBeadRadius: 6,
  energyBeadColor: '#f1c40f',
  energyBeadOpacity: 0.85,
  energyBeadGlowIntensity: 1.4,
  energyBeadSpeed: 1.15,
  energyBeadRingLayer: 1,
  energyBeadPulseEnabled: true,
  energyBeadPulseRange: { lower: 0.65, upper: 1.35 },
  energyBeadPulseTimes: 2.5,
};

/**
 * PRESET 10: CELESTIAL_VOID
 * Theme: Cosmic meditation with minimal mandala, focus on chakra nodes
 * Perfect for: Void meditation, cosmic consciousness, formless awareness
 * Vibe: Cosmic, minimal, transcendent
 */
export const CELESTIAL_VOID = {
  phaseAwakening_start: 0.0,
  phaseAscension_start: 0.20,
  phaseRadiance_start: 0.60,
  phaseDescentstart: 0.85,

  transitionZoneWidth: 0.07,

  // === PHASE TRANSPARENCY (CRITICAL - Makes effects visible!) ===
  awakeningNodeAlpha: 0.25,
  awakeningNodeAlpha_start: 0.05,
  awakeningNodeAlpha_end: 0.4,
  ascensionNodeAlpha: 0.7,
  ascensionNodeAlpha_start: 0.4,
  ascensionNodeAlpha_end: 0.85,
  radianceNodeAlpha: 0.9,
  radianceNodeAlpha_start: 0.9,
  radianceNodeAlpha_end: 0.9,
  descentNodeAlpha: 0.25,
  descentNodeAlpha_start: 0.85,
  descentNodeAlpha_end: 0.05,

  enableKundaliniSerpent: true,
  kundaliniSpeed: 0.8,
  kundaliniWaveAmplitude: 0.06,
  kundaliniGlowIntensity: 0.7,
  kundaliniFractalLayers: 1,
  kundaliniOvertones: 1,

  enableMandalaRings: false,  // Minimal mandala
  mandalaRingSpeed: 1.0,
  mandalaRingOpacity: 0.2,
  mandalaRingThickness: 1,
  mandalaSymmetry: 6,
  mandalaRingLayers: 1,
  mandalaResonancePatterns: false,
  mandalaInnerRadius: 0.12,
  mandalaOuterRadius: 0.38,
  mandalaRadiusMultiplier: 0.95,

  enableFrequencyVisualization: false,
  frequencyOscillationSpeed: 2.0,
  frequencyDetailLayers: 0,

  enableEnergyFlow: false,  // Minimal energy particles
  energyFlowSpeed: 1.0,
  energyFlowDensity: 2,
  energyFlowTrailLength: 2,
  energyFlowSpirals: false,
  energyFlowSpiralDensity: 0,

  enableChakraGlows: true,
  chakraGlowSize: 65,  // Large cosmic glows
  chakraGlowIntensity: 0.6,
  chakraBreatheIntensity: 0.2,
  chakraAuraLayers: 1,

  enableCentralChannel: false,  // No visible channel
  centralChannelGlow: 0.3,
  centralChannelAuras: false,

  useCustomChakraColors: false,
  chakraColorOverride: '#bdc3c7',
  chakraGlowColorOverride: '#ecf0f1',

  nodeSize: 20,
  pathThickness: 0.5,
  layerBlendMode: 'screen',
  layerOpacity: 0.8,

  enableEnergyPulses: false,  // No pulse effects

  awakeningChakraFocus: 'sahasrara',
  ascentionChakraFocus: 'sahasrara',
  radianceChakraFocus: 'sahasrara',
  descentChakraFocus: 'sahasrara',

  // Chakra explosion effects - cosmic void whispers
  enableChakraExplosions: true,
  explosionRayCount: 9,
  explosionRayLength: 35,
  explosionRayLengthMultiplier: 0.95,
  explosionRingCount: 2,
  explosionParticleCount: 10,
  explosionEvenParticleDistribution: true,
  explosionIntensity: 0.4,
  explosionSynchronizeWithBreathing: true,
  explosionColorScheme: ['chakraColor', 'rainbow', 'white'],
  explosionEnableFuzzLayer: true,
  explosionFuzzColor: '#ecf0f1',
  explosionFuzzOpacityMultiplier: 0.25,
  explosionFuzzLayerOpacity: 0.5,
  explosionInvertFuzzLayers: true,

  // Vertical sine waves - minimal cosmic void meditation
  enableVerticalSineWaves: true,
  sineWaveColor: '#bdc3c7',                        // Silver - void
  sineWaveFuzzColor: '#ecf0f1',                    // Pale glow
  sineWaveThickness: 2.0,
  sineWaveAmplitude: 10,                           // Subtle movement
  sineWaveFrequency: 1.5,
  sineWaveOpacityRange: { lower: 0.3, upper: 0.7 },
  sineWaveOpacityTimes: 1.5,
  sineWaveOpacityFindValueAlgorithm: ['sinusoidal'],
  sineWaveBlurRange: { lower: 3, upper: 9 },
  sineWaveBlurTimes: 2,
  sineWaveBlurFindValueAlgorithm: ['sinusoidal'],
  sineWaveAccentRange: { lower: 0.5, upper: 1.8 },
  sineWaveAccentTimes: 1.5,
  sineWaveAccentFindValueAlgorithm: ['sinusoidal'],
  sineWaveInvertLayers: true,
  sineWaveFuzzLayerOpacity: 0.5,
  sineWaveChakraGrouping: 5,
  sineWaveProgression: 'overlapping',
  sineWaveCount: 3,
  sineWaveHarmonicRatios: [1, 1.2, 1.5],
  enableSineWaveAmplitudeOscillation: false,
  sineWaveAmplitudeOscillationRange: { lower: 0.95, upper: 1.05 },
  sineWaveAmplitudeOscillationTimes: 1,
  sineWaveAmplitudeOscillationAlgorithm: ['sinusoidal'],

  // Energy beads
  enableEnergyBeads: true,
  energyBeadCount: 6,
  energyBeadRadius: 5,
  energyBeadColor: '#bdc3c7',
  energyBeadOpacity: 0.65,
  energyBeadGlowIntensity: 0.9,
  energyBeadSpeed: 0.7,
  energyBeadRingLayer: 0,
  energyBeadPulseEnabled: false,
  energyBeadPulseRange: { lower: 0.95, upper: 1.05 },
  energyBeadPulseTimes: 1,
};