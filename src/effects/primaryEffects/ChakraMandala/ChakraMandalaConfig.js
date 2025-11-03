/**
 * Chakra Mandala Configuration
 * 
 * Extends PhaseAnimatedPolygonConfig with chakra-specific parameters:
 * - Mandala ring visualization
 * - Chakra-specific color controls
 * - Frequency visualization
 * - Energy flow patterns
 */

import { PhaseAnimatedPolygonConfig } from '../../base/PhaseAnimatedPolygonConfig.js';
import { ColorPicker } from 'my-nft-gen/src/core/layer/configType/ColorPicker.js';

export class ChakraMandalaConfig extends PhaseAnimatedPolygonConfig {
  /**
   * Pick a random element from an array, or return the value if it's not an array
   * Used for randomly selecting enum options (blend modes, chakra focus, etc.)
   * @param {Array|string|*} value - Array of options or a single value
   * @return {string|*} - Random element from array or the value itself
   * @static
   */
  static pickRandom(value) {
    if (Array.isArray(value)) {
      return value[Math.floor(Math.random() * value.length)];
    }
    return value;
  }

  constructor({
    // ====== INHERITED FROM BASE ======
    // Phase timing, node/path animation, energy pulses, mystic symbols
    // (all inherited from PhaseAnimatedPolygonConfig)

    // ====== SMOOTH PHASE TRANSITIONS ======
    transitionZoneWidth = 0.05,            // Width of transition zones between phases (5% = smooth blending)

    // ====== CHAKRA-SPECIFIC SETTINGS ======
    enableMandalaRings = true,             // Render mandala ring resonances
    mandalaRingSpeed = 2.0,                // Ring rotation/expansion speed
    mandalaRingOpacity = 0.6,              // Ring transparency
    mandalaRingThickness = 2,              // Ring line thickness
    mandalaRingLayers = 3,                 // Additional ring layers for complexity
    mandalaResonancePatterns = true,       // Enable harmonic resonance rings

    enableFrequencyVisualization = true,   // Show frequency-based animations
    frequencyOscillationSpeed = 3.0,       // Hz oscillation rate
    frequencyDetailLayers = 2,             // Additional harmonic detail layers

    enableChakraGlows = true,              // Individual chakra aura glows
    chakraGlowSize = 35,                   // Glow radius per chakra
    chakraGlowIntensity = 0.7,             // Glow brightness
    chakraBreatheIntensity = 0.3,          // Breathing/pulsing effect amplitude
    chakraAuraLayers = 2,                  // Multi-layer aura complexity

    // ====== CHAKRA EXPLOSION EFFECTS (NEW) ======
    enableChakraExplosions = true,         // Enable structured energy explosions at each chakra
    explosionRayCount = 12,                // Number of radiating energy spikes
    explosionRayLength = 50,               // Max distance rays extend outward
    explosionRayLengthMultiplier = 1.0,    // Multiplier for easy ray length control (0.5-2.0)
    explosionRingCount = 4,                // Number of concentric explosion rings
    explosionParticleCount = 16,           // Chaotic energy shards per chakra
    explosionEvenParticleDistribution = true,  // If true: evenly distributed; if false: random
    explosionIntensity = 0.8,              // Overall explosion effect amplitude (0-1)
    explosionSynchronizeWithBreathing = true,  // Sync explosion pulses with breathing
    explosionColorScheme = ['chakraColor', 'rainbow', 'white'], // Color source (random select per render)
    explosionEnableFuzzLayer = true,       // Enable dual-layer fuzz effect for explosions
    explosionFuzzColor = new ColorPicker(ColorPicker.SelectionType.colorBucket),  // Fuzz layer color picker
    explosionFuzzOpacityMultiplier = 0.4,  // Fuzz layer opacity multiplier (0-1)
    explosionFuzzLayerOpacity = 0.6,       // Independent control for fuzz layer opacity (0-1)
    explosionInvertFuzzLayers = false,     // If true: render fuzz layer on top instead of base layer

    enableEnergyFlow = true,               // Animation of energy between chakras
    energyFlowSpeed = 2.0,                 // Energy particle speed
    energyFlowDensity = 5,                 // Particles per connection
    energyFlowTrailLength = 8,             // Trail persistence for particles
    energyFlowSpirals = true,              // Enable spiral energy patterns
    energyFlowSpiralDensity = 3,           // Spirals per energy connection

    enableCentralChannel = true,           // Render the sushumna nadi (central line)
    centralChannelGlow = 1.2,              // Central channel brightness multiplier
    centralChannelAuras = true,            // Enable multi-layer auras on central channel

    // ====== COLOR OVERRIDES ======
    // Chakra colors typically use their authentic colors, but allow override
    useCustomChakraColors = false,         // If true, use colorPicker instead of authentic
    chakraColorOverride = new ColorPicker(ColorPicker.SelectionType.colorBucket),
    chakraGlowColorOverride = new ColorPicker(ColorPicker.SelectionType.colorBucket),

    // ====== MANDALA AESTHETICS ======
    mandalaSymmetry = 6,                   // Fold symmetry (6, 8, or 12)
    mandalaInnerRadius = 0.1,              // Inner circle radius ratio
    mandalaOuterRadius = 0.4,              // Outer circle radius ratio
    mandalaRadiusMultiplier = 1.0,         // Scale multiplier for mandala size (0.5-2.0)

    // ====== BLEND MODES & OPACITY ======
    layerBlendMode = ['screen', 'overlay', 'lighten', 'color-dodge', 'color-burn'],  // Random blend mode for each render
    layerOpacity = 1.0,                    // Overall opacity

    // ====== RENDERING SCALE ======
    // IMPORTANT: renderingScaleValue (without suffix) survives JSON serialization
    // If deserialized config has renderingScaleValue, use it as the scale
    renderingScale = null,                 // Global scale factor for all sizes (0.1-3.0)

    // ====== PHASE-SPECIFIC CUSTOMIZATION ======
    // Allow per-phase chakra behavior (array = random selection, string = fixed)
    awakeningChakraFocus = ['muladhara', 'svadhisthana', 'manipura'],      // Root, Sacral, Solar Plexus
    ascentionChakraFocus = ['anahata', 'vishuddha', 'ajna'],               // Heart, Throat, Third Eye
    radianceChakraFocus = ['sahasrara', 'ajna', 'anahata'],                // Crown, Third Eye, Heart
    descentChakraFocus = ['muladhara', 'svadhisthana', 'manipura'],        // Root, Sacral, Solar Plexus

    // ====== VERTICAL OSCILLATING SINE WAVES ======
    enableVerticalSineWaves = true,            // Enable/disable sine wave visualization
    sineWaveColor = new ColorPicker(ColorPicker.SelectionType.colorBucket),  // Base layer color picker
    sineWaveFuzzColor = new ColorPicker(ColorPicker.SelectionType.colorBucket),  // Fuzz layer color picker
    sineWaveThickness = 2.5,                   // Base line thickness
    sineWaveAmplitude = 15,                    // Horizontal oscillation distance (pixels)
    sineWaveFrequency = 2.5,                   // Full oscillations per wave cycle
    sineWaveOpacityRange = { lower: 0.3, upper: 1.0 },        // Min/max opacity
    sineWaveOpacityTimes = 2,                  // Opacity cycles per animation
    sineWaveOpacityFindValueAlgorithm = ['sinusoidal', 'square', 'sawtooth'],  // Easing algorithms (random select)
    sineWaveBlurRange = { lower: 2, upper: 8 },       // Min/max blur amount
    sineWaveBlurTimes = 3,                     // Blur oscillation cycles per animation
    sineWaveBlurFindValueAlgorithm = ['sinusoidal', 'square', 'sawtooth'],     // Blur easing (random select)
    sineWaveAccentRange = { lower: 0.5, upper: 2.5 }, // Min/max accent stroke
    sineWaveAccentTimes = 3,                   // Accent oscillation cycles per animation
    sineWaveAccentFindValueAlgorithm = ['sinusoidal', 'square', 'sawtooth'],   // Accent easing (random select)
    sineWaveFuzzLayerOpacity = 0.6,            // Independent control for fuzz layer opacity (0-1)
    sineWaveInvertLayers = false,              // If true: render fuzz on top
    sineWaveChakraGrouping = 3,                // Points per wave (3, 4, or 5)
    sineWaveProgression = 'sequential',        // 'sequential' = 0-1-2, 3-4-5 | 'overlapping' = rolling windows

    // ====== SINE WAVE ADVANCED CONTROLS ======
    sineWaveCount = 10,                    // Number of waves to render (null = all, or 1-10)
    sineWaveHarmonicRatios = [1, 2, 1.5, 3, 2.5],  // Frequency multiplier per wave (musical ratios)
    enableSineWaveAmplitudeOscillation = true, // Enable amplitude changes over time
    sineWaveAmplitudeOscillationRange = { lower: 0.5, upper: 2.0 }, // Min/max amplitude multiplier
    sineWaveAmplitudeOscillationTimes = 2,     // Cycles per animation
    sineWaveAmplitudeOscillationAlgorithm = ['sinusoidal', 'square', 'sawtooth'], // Easing algorithms (random select)

    // ====== ENERGY BEADS (ORBITING MANDALA) ======
    enableEnergyBeads = true,                // Enable/disable energy beads orbiting mandala rings
    energyBeadCount = 8,                     // Number of beads orbiting each ring (1-24)
    energyBeadRadius = 6,                    // Bead size in pixels
    energyBeadColor = new ColorPicker(ColorPicker.SelectionType.colorBucket),  // Bead color picker
    energyBeadOpacity = 0.8,                 // Bead opacity (0-1)
    energyBeadGlowIntensity = 1.2,           // Glow effect multiplier around beads
    energyBeadSpeed = 1.0,                   // Orbital speed multiplier (1.0 = normal)
    energyBeadRingLayer = 1,                 // Which ring to use (0 = inner, 1 = middle, 2 = outer, or -1 = all)
    energyBeadPulseEnabled = true,           // Enable size pulsing
    energyBeadPulseRange = { lower: 0.7, upper: 1.3 }, // Size pulse multiplier range (min, max)
    energyBeadPulseTimes = 2,                // Pulse oscillation cycles per animation (1-5)

    // ====== INHERITED BASE PARAMETERS ======
    // These are passed to parent constructor
    ...baseConfig
  } = {}) {
    // Initialize parent with base parameters
    super(baseConfig);

    // Store raw size values from parent before overriding with getters
    // NOTE: No underscore prefix so they survive JSON serialization in the pipeline
    this.nodeSizeRaw = this.nodeSize;
    this.pathThicknessRaw = this.pathThickness;

    // === CRITICAL: Handle renderingScale for deserialized configs ===
    // When deserializing, renderingScaleValue survives JSON but renderingScale doesn't
    // If renderingScale is null, use the deserialized renderingScaleValue
    // Otherwise, use the provided renderingScale parameter
    if (renderingScale === null && baseConfig?.renderingScaleValue !== undefined) {
      this.renderingScaleValue = baseConfig.renderingScaleValue;
    } else {
      this.renderingScaleValue = Math.max(0.1, Math.min(3.0, renderingScale !== null ? renderingScale : 1.0));
    }

    // Smooth transitions
    this.transitionZoneWidth = transitionZoneWidth;

    // Chakra-specific settings
    this.enableMandalaRings = enableMandalaRings;
    this.mandalaRingSpeed = mandalaRingSpeed;
    this.mandalaRingOpacity = mandalaRingOpacity;
    this.mandalaRingThicknessRaw = baseConfig?.mandalaRingThicknessRaw ?? mandalaRingThickness;
    this.mandalaRingLayers = mandalaRingLayers;
    this.mandalaResonancePatterns = mandalaResonancePatterns;

    this.enableFrequencyVisualization = enableFrequencyVisualization;
    this.frequencyOscillationSpeed = frequencyOscillationSpeed;
    this.frequencyDetailLayers = frequencyDetailLayers;

    this.enableChakraGlows = enableChakraGlows;
    this.chakraGlowSizeRaw = baseConfig?.chakraGlowSizeRaw ?? chakraGlowSize;
    this.chakraGlowIntensity = chakraGlowIntensity;
    this.chakraBreatheIntensity = chakraBreatheIntensity;
    this.chakraAuraLayers = chakraAuraLayers;

    this.enableChakraExplosions = enableChakraExplosions;
    this.explosionRayCount = explosionRayCount;
    this.explosionRayLengthRaw = baseConfig?.explosionRayLengthRaw ?? explosionRayLength;
    this.explosionRayLengthMultiplier = explosionRayLengthMultiplier;
    this.explosionRingCount = explosionRingCount;
    this.explosionParticleCount = explosionParticleCount;
    this.explosionEvenParticleDistribution = explosionEvenParticleDistribution;
    this.explosionIntensity = explosionIntensity;
    this.explosionSynchronizeWithBreathing = explosionSynchronizeWithBreathing;
    this.explosionColorScheme = explosionColorScheme;
    this.explosionEnableFuzzLayer = explosionEnableFuzzLayer;
    this.explosionFuzzColor = explosionFuzzColor;
    this.explosionFuzzOpacityMultiplier = explosionFuzzOpacityMultiplier;
    this.explosionFuzzLayerOpacity = explosionFuzzLayerOpacity;
    this.explosionInvertFuzzLayers = explosionInvertFuzzLayers;

    this.enableEnergyFlow = enableEnergyFlow;
    this.energyFlowSpeed = energyFlowSpeed;
    this.energyFlowDensity = energyFlowDensity;
    this.energyFlowTrailLength = energyFlowTrailLength;
    this.energyFlowSpirals = energyFlowSpirals;
    this.energyFlowSpiralDensity = energyFlowSpiralDensity;

    this.enableCentralChannel = enableCentralChannel;
    this.centralChannelGlow = centralChannelGlow;
    this.centralChannelAuras = centralChannelAuras;

    this.useCustomChakraColors = useCustomChakraColors;
    this.chakraColorOverride = chakraColorOverride;
    this.chakraGlowColorOverride = chakraGlowColorOverride;

    this.mandalaSymmetry = mandalaSymmetry;
    this.mandalaInnerRadius = mandalaInnerRadius;
    this.mandalaOuterRadius = mandalaOuterRadius;
    this.mandalaRadiusMultiplier = mandalaRadiusMultiplier;

    this.layerBlendMode = layerBlendMode;
    this.layerOpacity = layerOpacity;

    // renderingScaleValue is set earlier in constructor to handle deserialization properly

    this.awakeningChakraFocus = awakeningChakraFocus;
    this.ascentionChakraFocus = ascentionChakraFocus;
    this.radianceChakraFocus = radianceChakraFocus;
    this.descentChakraFocus = descentChakraFocus;

    // Vertical oscillating sine waves
    this.enableVerticalSineWaves = enableVerticalSineWaves;
    // Handle both ColorPicker objects and color strings
    this.sineWaveColor = this.#ensureColorPicker(sineWaveColor);
    this.sineWaveFuzzColor = this.#ensureColorPicker(sineWaveFuzzColor);
    // CRITICAL: Use baseConfig's raw values if they exist (from deserialization)
    // Otherwise use the parameter (which might be computed value from spread - that's OK)
    this.sineWaveThicknessRaw = baseConfig?.sineWaveThicknessRaw ?? sineWaveThickness;
    this.sineWaveAmplitudeRaw = baseConfig?.sineWaveAmplitudeRaw ?? sineWaveAmplitude;
    this.sineWaveFrequency = sineWaveFrequency;
    this.sineWaveOpacityRange = sineWaveOpacityRange;
    this.sineWaveOpacityTimes = sineWaveOpacityTimes;
    this.sineWaveOpacityFindValueAlgorithm = sineWaveOpacityFindValueAlgorithm;
    this.sineWaveBlurRange = sineWaveBlurRange;
    this.sineWaveBlurTimes = sineWaveBlurTimes;
    this.sineWaveBlurFindValueAlgorithm = sineWaveBlurFindValueAlgorithm;
    this.sineWaveAccentRange = sineWaveAccentRange;
    this.sineWaveAccentTimes = sineWaveAccentTimes;
    this.sineWaveAccentFindValueAlgorithm = sineWaveAccentFindValueAlgorithm;
    this.sineWaveFuzzLayerOpacity = sineWaveFuzzLayerOpacity;
    this.sineWaveInvertLayers = sineWaveInvertLayers;
    this.sineWaveChakraGrouping = sineWaveChakraGrouping;
    this.sineWaveProgression = sineWaveProgression;

    // Advanced sine wave controls
    this.sineWaveCount = sineWaveCount;
    this.sineWaveHarmonicRatios = sineWaveHarmonicRatios;
    this.enableSineWaveAmplitudeOscillation = enableSineWaveAmplitudeOscillation;
    this.sineWaveAmplitudeOscillationRange = sineWaveAmplitudeOscillationRange;
    this.sineWaveAmplitudeOscillationTimes = sineWaveAmplitudeOscillationTimes;
    this.sineWaveAmplitudeOscillationAlgorithm = sineWaveAmplitudeOscillationAlgorithm;

    // Energy beads
    this.enableEnergyBeads = enableEnergyBeads;
    this.energyBeadCount = energyBeadCount;
    this.energyBeadRadiusRaw = baseConfig?.energyBeadRadiusRaw ?? energyBeadRadius;
    this.energyBeadColor = this.#ensureColorPicker(energyBeadColor);
    this.energyBeadOpacity = energyBeadOpacity;
    this.energyBeadGlowIntensity = energyBeadGlowIntensity;
    this.energyBeadSpeed = energyBeadSpeed;
    this.energyBeadRingLayer = energyBeadRingLayer;
    this.energyBeadPulseEnabled = energyBeadPulseEnabled;
    this.energyBeadPulseRange = energyBeadPulseRange;
    this.energyBeadPulseTimes = energyBeadPulseTimes;
  }

  /**
   * Ensure a color value is a ColorPicker object
   * If a string is provided, creates a ColorPicker that returns that static color
   * @param {ColorPicker|string} value - ColorPicker object or color string
   * @returns {ColorPicker} ColorPicker object (either passed or created)
   * @private
   */
  #ensureColorPicker(value) {
    if (value instanceof ColorPicker) {
      return value;
    }
    // If it's a string or other value, create a ColorPicker that returns it statically
    if (typeof value === 'string') {
      const picker = new ColorPicker(ColorPicker.SelectionType.colorBucket);
      // Override getColor to return the static color
      picker.getColor = () => value;
      return picker;
    }
    return value;
  }

  /**
   * Get focused chakra for a given phase
   * IMPORTANT: Randomization happens once in ChakraMandalaEffect.generate()
   * This method simply returns the pre-selected value for deterministic animation
   * @param {string} phase - Phase name ('awakening' | 'ascension' | 'radiance' | 'descent')
   * @returns {string} Chakra name to focus on during this phase
   */
  getChakraFocusForPhase(phase) {
    const phaseMap = {
      awakening: this.awakeningChakraFocus,
      ascension: this.ascentionChakraFocus,
      radiance: this.radianceChakraFocus,
      descent: this.descentChakraFocus,
    };
    const phaseValue = phaseMap[phase] || 'anahata'; // Default to heart
    // Return pre-selected value (randomization already happened in generate())
    return phaseValue;
  }

  /**
   * Get pre-computed scaled value or fall back to computing on-the-fly
   * These values are computed in generate() and survive JSON serialization
   * @private
   */
  _getSineWaveThickness() {
    return this.sineWaveThicknessComputed ?? (this.sineWaveThicknessRaw * (this.renderingScaleValue || 1.0));
  }
  _getSineWaveAmplitude() {
    return this.sineWaveAmplitudeComputed ?? (this.sineWaveAmplitudeRaw * (this.renderingScaleValue || 1.0));
  }
  _getEnergyBeadRadius() {
    return this.energyBeadRadiusComputed ?? (this.energyBeadRadiusRaw * (this.renderingScaleValue || 1.0));
  }
  _getExplosionRayLength() {
    return this.explosionRayLengthComputed ?? (this.explosionRayLengthRaw * (this.renderingScaleValue || 1.0));
  }
  _getChakraGlowSize() {
    return this.chakraGlowSizeComputed ?? (this.chakraGlowSizeRaw * (this.renderingScaleValue || 1.0));
  }
  _getMandalaRingThickness() {
    return this.mandalaRingThicknessComputed ?? (this.mandalaRingThicknessRaw * (this.renderingScaleValue || 1.0));
  }

  /**
   * ====== RENDERING SCALE ======
   * Scaling factor for all size-related parameters
   */

  /** Get scaling factor (read-only, always applied) */
  get renderingScale() {
    return this.renderingScaleValue;
  }

  /** Set scaling factor (with clamping) */
  set renderingScale(value) {
    this.renderingScaleValue = Math.max(0.1, Math.min(3.0, value));
  }
}