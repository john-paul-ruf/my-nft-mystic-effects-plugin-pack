/**
 * KeyFrame Effect Template
 * 
 * Copy this file and the accompanying [EffectName]Config.js to create new keyframe effects.
 * KeyFrame effects handle animations and frame-by-frame manipulations.
 * 
 * This template demonstrates:
 * - Extending LayerEffect for integration with my-nft-gen framework
 * - Frame-aware animation across sequences
 * - Progress calculation for smooth transitions
 * - Time-based parameter interpolation
 * - Proper static metadata (_name_, _displayName_, etc.)
 * 
 * File naming convention: 
 *   - [EffectName]Effect.js (this file)
 *   - [EffectName]Config.js (companion file)
 *   - Located in: src/effects/keyFrameEffects/[EffectName]/
 */

import { LayerEffect } from 'my-nft-gen/src/core/layer/LayerEffect.js';
import { Settings } from 'my-nft-gen/src/core/Settings.js';

/**
 * YourEffectNameEffect - A description of what your effect does
 * 
 * @class YourEffectNameEffect
 * @extends LayerEffect
 * @description This is a template for creating keyframe effects. These effects
 *              are designed for animations and temporal transformations across frames.
 *              
 * @example
 * // Basic usage with 120 frames at 30fps = 4 seconds
 * const effect = new YourEffectNameEffect({
 *   config: new YourEffectNameConfig({ speed: 1.0 }),
 *   settings: new Settings()
 * });
 * for (let frame = 0; frame < 120; frame++) {
 *   await effect.invoke(layer, frame, 120);
 * }
 */
export class YourEffectNameEffect extends LayerEffect {
  // Static metadata - required for registration
  static _name_ = 'your-keyframe-effect-name';
  static _displayName_ = 'Your KeyFrame Effect Name';
  static _description_ = 'A description of what your keyframe animation does';
  static _version_ = '1.0.0';
  static _author_ = 'Your Name';
  static _tags_ = ['effect', 'keyframe', 'animation', 'temporal', 'custom'];
  
  // Presets - predefined configurations for common use cases
  static presets = [];
  
  /**
   * Get all available presets for this effect
   * 
   * @static
   * @returns {Array<Object>} Array of preset definitions
   */
  static getPresets() {
    return this.presets || [];
  }
  
  /**
   * Get a specific preset by name
   * 
   * @static
   * @param {string} presetName - Name of the preset
   * @returns {Object|null} Preset definition or null if not found
   */
  static getPreset(presetName) {
    return this.presets?.find(p => p.name === presetName) || null;
  }
  
  /**
   * Get a random preset based on percentChance weights
   * Useful for procedural generation with weighted randomness
   * 
   * @static
   * @returns {Object|null} Randomly selected preset or null if no presets
   */
  static getRandomPreset() {
    if (!this.presets || this.presets.length === 0) return null;
    
    const totalChance = this.presets.reduce((sum, p) => sum + (p.percentChance || 0), 0);
    let random = Math.random() * totalChance;
    
    for (const preset of this.presets) {
      random -= (preset.percentChance || 0);
      if (random <= 0) return preset;
    }
    
    return this.presets[this.presets.length - 1];
  }

  /**
   * Creates an instance of YourEffectNameEffect
   * 
   * @param {Object} options - Configuration options
   * @param {string} options.name - Effect name (defaults to _name_)
   * @param {YourEffectNameConfig} options.config - Effect configuration
   * @param {Settings} options.settings - Framework settings
   * @param {Array<LayerEffect>} options.additionalEffects - Chained effects (optional)
   * @param {boolean} options.ignoreAdditionalEffects - Skip additional effects (default: false)
   */
  constructor({
    name = YourEffectNameEffect._name_,
    config,
    settings = new Settings({}),
    additionalEffects = [],
    ignoreAdditionalEffects = false,
    ...rest
  } = {}) {
    super({
      name,
      config,
      settings,
      additionalEffects,
      ignoreAdditionalEffects,
      ...rest
    });
  }

  /**
   * Calculate the current animation progress (0 to 1)
   * 
   * Used for interpolating parameter values across the animation sequence.
   * At frame 0, progress = 0. At final frame, progress = 1.
   * 
   * @returns {number} Progress from 0 to 1
   * @protected
   */
  getProgress() {
    if (this.totalFrames <= 1) return 0;
    return this.frameNumber / (this.totalFrames - 1);
  }

  /**
   * Apply the keyframe effect to the layer
   * 
   * This is called by the framework for each frame in the sequence.
   * Override this to implement your animation logic.
   * 
   * @async
   * @param {Object} layer - The layer being rendered
   * @param {number} currentFrame - Current frame number (0-based)
   * @param {number} numberOfFrames - Total number of frames in sequence
   * @returns {Promise<void>}
   * @throws {Error} If configuration is invalid
   * 
   * @example
   * async invoke(layer, currentFrame, numberOfFrames) {
   *   const progress = this.getProgress();
   *   const interpolatedValue = this.interpolate(0, 360, progress);
   *   // Use interpolatedValue for animation: rotations, translations, etc.
   *   console.log(this.getInfo());
   *   await super.invoke(layer, currentFrame, numberOfFrames);
   * }
   */
  async invoke(layer, currentFrame, numberOfFrames) {
    try {
      // Validate configuration before applying
      const validation = YourEffectNameConfig.validate(this.config);
      if (!validation.valid) {
        throw new Error(`Invalid configuration: ${validation.errors.join(', ')}`);
      }

      // Update frame information for progress calculation
      this.frameNumber = currentFrame;
      this.totalFrames = numberOfFrames;

      const progress = this.getProgress();

      // Implement your keyframe animation logic here
      // Use progress (0-1) to animate between states
      console.log(this.getInfo());

      // Always call super.invoke() at the end to support chained effects
      await super.invoke(layer, currentFrame, numberOfFrames);

    } catch (error) {
      console.error(`Error in ${this._name_}:`, error);
      throw error;
    }
  }

  /**
   * Linear interpolation between two values
   * 
   * @param {number} start - Starting value
   * @param {number} end - Ending value
   * @param {number} progress - Animation progress (0-1)
   * @returns {number} Interpolated value
   * @protected
   */
  interpolate(start, end, progress) {
    return start + (end - start) * Math.max(0, Math.min(1, progress));
  }

  /**
   * Easing function - ease in cubic
   * Apply easing to progress for smoother animation transitions
   * 
   * @param {number} progress - Linear progress (0-1)
   * @returns {number} Eased progress (0-1)
   * @protected
   */
  easeInCubic(progress) {
    return progress * progress * progress;
  }

  /**
   * Easing function - ease out cubic
   * 
   * @param {number} progress - Linear progress (0-1)
   * @returns {number} Eased progress (0-1)
   * @protected
   */
  easeOutCubic(progress) {
    const p = progress - 1;
    return p * p * p + 1;
  }

  /**
   * Easing function - ease in out cubic
   * 
   * @param {number} progress - Linear progress (0-1)
   * @returns {number} Eased progress (0-1)
   * @protected
   */
  easeInOutCubic(progress) {
    return progress < 0.5 ? 4 * progress * progress * progress : 1 - Math.pow(-2 * progress + 2, 3) / 2;
  }

  /**
   * Get a human-readable description of the effect's current state
   * Useful for debugging and logging
   * 
   * @returns {string} Description including effect name, frame, and progress
   */
  getInfo() {
    const progress = this.getProgress();
    return `${this._displayName_} (${this._name_}): Frame ${this.frameNumber}/${this.totalFrames}, Progress: ${(progress * 100).toFixed(1)}%`;
  }

  /**
   * Validate the effect configuration
   * 
   * @static
   * @param {YourEffectNameConfig} config - Configuration to validate
   * @returns {Object} Validation result { valid: boolean, errors: string[] }
   */
  static validate(config) {
    const errors = [];

    if (!config) {
      errors.push('Configuration is required');
      return { valid: false, errors };
    }

    // Add your validation logic here
    // Example:
    // if (config.speed !== undefined && (config.speed <= 0 || config.speed > 2)) {
    //   errors.push('speed must be between 0 and 2');
    // }

    return {
      valid: errors.length === 0,
      errors
    };
  }
}

/**
 * Configuration class for YourEffectNameEffect
 * Manages all effect parameters and their validation
 */
export class YourEffectNameConfig {
  /**
   * Creates a configuration instance
   * 
   * @param {Object} options - Configuration options
   * @param {number} options.speed - Animation speed multiplier, default: 1.0
   * @param {string} options.easing - Easing function type, default: 'linear'
   * @param {boolean} options.loop - Whether animation loops, default: true
   */
  constructor({
    speed = 1.0,
    easing = 'linear',
    loop = true
  } = {}) {
    this.speed = speed;
    this.easing = easing;
    this.loop = loop;
  }

  /**
   * Validate this configuration instance
   * 
   * @returns {Object} Validation result { valid: boolean, errors: string[] }
   */
  validate() {
    return YourEffectNameConfig.validate(this);
  }

  /**
   * Static validation method
   * 
   * @static
   * @param {YourEffectNameConfig} config - Configuration to validate
   * @returns {Object} Validation result { valid: boolean, errors: string[] }
   */
  static validate(config) {
    const errors = [];
    const validEasings = ['linear', 'easeInCubic', 'easeOutCubic', 'easeInOutCubic'];

    if (config.speed !== undefined) {
      if (typeof config.speed !== 'number' || config.speed <= 0 || config.speed > 2) {
        errors.push('speed must be a number between 0 and 2');
      }
    }

    if (config.easing !== undefined) {
      if (!validEasings.includes(config.easing)) {
        errors.push(`easing must be one of: ${validEasings.join(', ')}`);
      }
    }

    if (config.loop !== undefined) {
      if (typeof config.loop !== 'boolean') {
        errors.push('loop must be a boolean');
      }
    }

    return {
      valid: errors.length === 0,
      errors
    };
  }
}