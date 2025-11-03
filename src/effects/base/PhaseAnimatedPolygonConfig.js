/**
 * PhaseAnimatedPolygonConfig - Base configuration for phase-animated effects
 * 
 * Provides universal configuration for all phase-animated polygon effects:
 * - 4-phase animation cycle (Awakening → Ascension → Radiance → Descent)
 * - Smooth phase transitions
 * - Energy pulse systems
 * - Mystic symbol systems
 * - Shared rendering parameters
 * 
 * Subclasses extend this to add geometry-specific parameters
 */

import { EffectConfig } from 'my-nft-gen/src/core/layer/EffectConfig.js';

export class PhaseAnimatedPolygonConfig extends EffectConfig {
  /**
   * Pick a random element from an array, or return the value if it's not an array
   * Used for randomly selecting enum options (easing functions, blend modes, etc.)
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
    // ====== PHASE TIMING & TRANSITIONS ======
    phaseAwakening_start = 0.0,        // 0%: Animation start
    phaseAscension_start = 0.20,       // 20%: Emergence → Rising
    phaseRadiance_start = 0.60,        // 60%: Rising → Peak
    phaseDescentstart = 0.85,          // 85%: Peak → Descent
    transitionZoneWidth = 0.05,        // Width of smooth transition zones (5% of animation)

    // ====== AWAKENING PHASE (0-20%): Emergence ======
    awakeningNodeAlpha = 0.3,
    awakeningNodeAlpha_start = 0.1,
    awakeningNodeAlpha_end = 0.5,
    awakeningPathIntensity = 0.2,
    awakeningPathIntensity_start = 0.0,
    awakeningPathIntensity_end = 0.4,
    awakeningPathAnimSpeed = 0.5,
    awakeningEasing = ['easeInCubic', 'easeInQuart', 'easeInQuint', 'easeInExpo'],

    // ====== ASCENSION PHASE (20-60%): Rising ======
    ascensionNodeAlpha = 0.8,
    ascensionNodeAlpha_start = 0.5,
    ascensionNodeAlpha_end = 1.0,
    ascensionPathIntensity = 0.8,
    ascensionPathIntensity_start = 0.4,
    ascensionPathIntensity_end = 1.0,
    ascensionPathAnimSpeed = 2.0,
    ascensionEasing = ['easeInOutCubic', 'easeInOutQuart', 'easeInOutQuint', 'easeInOutElastic'],

    // ====== RADIANCE PHASE (60-85%): Peak ======
    radianceNodeAlpha = 1.0,
    radianceNodeAlpha_start = 1.0,
    radianceNodeAlpha_end = 1.0,
    radiancePathIntensity = 1.0,
    radiancePathIntensity_start = 1.0,
    radiancePathIntensity_end = 1.0,
    radiancePathAnimSpeed = 1.5,
    radianceEasing = ['smoothstep', 'easeOutCubic', 'easeOutQuart', 'linear'],

    // ====== DESCENT PHASE (85-100%): Descent ======
    descentNodeAlpha = 0.3,
    descentNodeAlpha_start = 1.0,
    descentNodeAlpha_end = 0.1,
    descentPathIntensity = 0.1,
    descentPathIntensity_start = 1.0,
    descentPathIntensity_end = 0.0,
    descentPathAnimSpeed = 1.0,
    descentEasing = ['easeOutQuart', 'easeOutQuint', 'easeOutExpo', 'easeInOutBack'],

    // ====== RENDERING ======
    scale = 1.0,                       // Scale multiplier (1.0 = full size)
    centerX = 0.5,                     // Center X position (0-1, 0.5 = center)
    centerY = 0.5,                     // Center Y position (0-1, 0.5 = center)
    nodeSize = 20,                     // Node radius in pixels
    nodeGlowSize = 25,                 // Node glow radius in pixels
    pathThickness = 2,                 // Path line thickness
    pathSizeScale = 1.0,               // Path size multiplier
    layerOpacity = 1.0,                // Overall layer opacity (0-1)
    layerBlendMode = 'normal',         // Canvas blend mode

    // ====== ENERGY PULSE SYSTEM (OPTIONAL) ======
    enableEnergyPulses = true,
    pulseWaveSpeed = 2.0,              // Wave speed (must be integer for perfect loop)
    pulseBreathSpeed = 2.0,            // Breathing frequency (must be integer)
    pulseBreathIntensity = 0.4,        // Breathing expansion amount
    pulseSpiralSpeed = 3.0,            // Spiral rotation speed (must be integer)
    pulseSpiralRadius = 50,            // Spiral radius in pixels
    pulseAuraSpeed = 2.0,              // Aura expansion speed (must be integer)
    pulseAuraWidth = 0.15,             // Aura wave width
    pulseTracerSpeed = 3.0,            // Particle speed (must be integer)
    pulseTracerCount = 5,              // Particles per path
    energyPulseSizeScale = 1.0,        // Energy pulse size multiplier

    // ====== MYSTIC SYMBOLS (OPTIONAL) ======
    enableMysticSymbols = true,
    symbolGlowSize = 8,                // Symbol glow radius
    symbolShowOnPhases = ['awakening', 'ascension', 'radiance', 'descent'],
    mysticSymbolSizeScale = 1.0,       // Symbol size multiplier

    // Spread remaining config to parent class
    ...rest
  } = {}) {
    // Pass through to parent EffectConfig
    super({ ...rest });

    // ====== PHASE TIMING ======
    this.phaseAwakening_start = phaseAwakening_start;
    this.phaseAscension_start = phaseAscension_start;
    this.phaseRadiance_start = phaseRadiance_start;
    this.phaseDescentstart = phaseDescentstart;
    this.transitionZoneWidth = transitionZoneWidth;

    // ====== AWAKENING PHASE ======
    this.awakeningNodeAlpha = awakeningNodeAlpha;
    this.awakeningNodeAlpha_start = awakeningNodeAlpha_start;
    this.awakeningNodeAlpha_end = awakeningNodeAlpha_end;
    this.awakeningPathIntensity = awakeningPathIntensity;
    this.awakeningPathIntensity_start = awakeningPathIntensity_start;
    this.awakeningPathIntensity_end = awakeningPathIntensity_end;
    this.awakeningPathAnimSpeed = awakeningPathAnimSpeed;
    this.awakeningEasing = awakeningEasing;

    // ====== ASCENSION PHASE ======
    this.ascensionNodeAlpha = ascensionNodeAlpha;
    this.ascensionNodeAlpha_start = ascensionNodeAlpha_start;
    this.ascensionNodeAlpha_end = ascensionNodeAlpha_end;
    this.ascensionPathIntensity = ascensionPathIntensity;
    this.ascensionPathIntensity_start = ascensionPathIntensity_start;
    this.ascensionPathIntensity_end = ascensionPathIntensity_end;
    this.ascensionPathAnimSpeed = ascensionPathAnimSpeed;
    this.ascensionEasing = ascensionEasing;

    // ====== RADIANCE PHASE ======
    this.radianceNodeAlpha = radianceNodeAlpha;
    this.radianceNodeAlpha_start = radianceNodeAlpha_start;
    this.radianceNodeAlpha_end = radianceNodeAlpha_end;
    this.radiancePathIntensity = radiancePathIntensity;
    this.radiancePathIntensity_start = radiancePathIntensity_start;
    this.radiancePathIntensity_end = radiancePathIntensity_end;
    this.radiancePathAnimSpeed = radiancePathAnimSpeed;
    this.radianceEasing = radianceEasing;

    // ====== DESCENT PHASE ======
    this.descentNodeAlpha = descentNodeAlpha;
    this.descentNodeAlpha_start = descentNodeAlpha_start;
    this.descentNodeAlpha_end = descentNodeAlpha_end;
    this.descentPathIntensity = descentPathIntensity;
    this.descentPathIntensity_start = descentPathIntensity_start;
    this.descentPathIntensity_end = descentPathIntensity_end;
    this.descentPathAnimSpeed = descentPathAnimSpeed;
    this.descentEasing = descentEasing;

    // ====== RENDERING ======
    this.scale = scale;
    this.centerX = centerX;
    this.centerY = centerY;
    this.nodeSize = nodeSize;
    this.nodeGlowSize = nodeGlowSize;
    this.pathThickness = pathThickness;
    this.pathSizeScale = pathSizeScale;
    this.layerOpacity = layerOpacity;
    this.layerBlendMode = layerBlendMode;

    // ====== ENERGY PULSES ======
    this.enableEnergyPulses = enableEnergyPulses;
    this.pulseWaveSpeed = pulseWaveSpeed;
    this.pulseBreathSpeed = pulseBreathSpeed;
    this.pulseBreathIntensity = pulseBreathIntensity;
    this.pulseSpiralSpeed = pulseSpiralSpeed;
    this.pulseSpiralRadius = pulseSpiralRadius;
    this.pulseAuraSpeed = pulseAuraSpeed;
    this.pulseAuraWidth = pulseAuraWidth;
    this.pulseTracerSpeed = pulseTracerSpeed;
    this.pulseTracerCount = pulseTracerCount;
    this.energyPulseSizeScale = energyPulseSizeScale;

    // ====== MYSTIC SYMBOLS ======
    this.enableMysticSymbols = enableMysticSymbols;
    this.symbolGlowSize = symbolGlowSize;
    this.symbolShowOnPhases = symbolShowOnPhases;
    this.mysticSymbolSizeScale = mysticSymbolSizeScale;
  }
}