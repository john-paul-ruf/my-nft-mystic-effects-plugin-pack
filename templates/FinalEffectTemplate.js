/**
 * Final Image Effect Template
 * 
 * Copy this file and the accompanying [EffectName]Config.js to create new final image effects.
 * Final effects are applied to the completely composed image as final touches.
 * 
 * This template demonstrates:
 * - Extending LayerEffect for integration with my-nft-gen framework
 * - Post-composition image processing
 * - Final color grading, filters, and adjustments
 * - Proper static metadata (_name_, _displayName_, etc.)
 * - Single-frame rendering via the invoke() method
 * 
 * File naming convention: 
 *   - [EffectName]Effect.js (this file)
 *   - [EffectName]Config.js (companion file)
 *   - Located in: src/effects/finalImageEffects/[EffectName]/
 */

import { LayerEffect } from 'my-nft-gen/src/core/layer/LayerEffect.js';
import { Settings } from 'my-nft-gen/src/core/Settings.js';

/**
 * YourEffectNameEffect - A description of what your effect does
 * 
 * @class YourEffectNameEffect
 * @extends LayerEffect
 * @description This is a template for creating final image effects. These effects
 *              are applied after all primary and secondary effects are composed.
 *              Final effects are typically color grading, filters, or watermarks.
 *              
 * @example
 * // Basic usage
 * const effect = new YourEffectNameEffect({
 *   config: new YourEffectNameConfig({ saturation: 1.2 }),
 *   settings: new Settings()
 * });
 * await effect.invoke(layer, 0, 1);
 */
export class YourEffectNameEffect extends LayerEffect {
  // Static metadata - required for registration
  static _name_ = 'your-final-effect-name';
  static _displayName_ = 'Your Final Effect Name';
  static _description_ = 'A description of what your final image effect does';
  static _version_ = '1.0.0';
  static _author_ = 'Your Name';
  static _tags_ = ['effect', 'final', 'post-process', 'image', 'custom'];
  
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
   * Apply the final effect to the complete composed image
   * 
   * This is called by the framework as the final step in image generation.
   * Override this to implement your image processing logic.
   * 
   * @async
   * @param {Object} layer - The fully composed layer (primary + secondary effects)
   * @param {number} currentFrame - Current frame number (usually 0 for final effects)
   * @param {number} numberOfFrames - Total number of frames (usually 1 for final effects)
   * @returns {Promise<void>}
   * @throws {Error} If configuration is invalid
   * 
   * @example
   * async invoke(layer, currentFrame, numberOfFrames) {
   *   // Apply color grading, filters, or adjustments
   *   // Typically this is the last step before image export
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

      // Implement your final effect logic here
      // Applied to the complete composed image
      console.log(this.getInfo());

      // Always call super.invoke() at the end to support chained effects
      await super.invoke(layer, currentFrame, numberOfFrames);

    } catch (error) {
      console.error(`Error in ${this._name_}:`, error);
      throw error;
    }
  }

  /**
   * Adjust image saturation
   * 
   * @param {number} saturation - Saturation multiplier (0.5 = desaturate, 1.0 = normal, 1.5 = saturate)
   * @protected
   */
  adjustSaturation(saturation) {
    // Implementation depends on your image processing library
    // Example: canvas filter, Jimp operations, etc.
  }

  /**
   * Adjust image brightness
   * 
   * @param {number} brightness - Brightness adjustment (-50 = darken, 0 = normal, 50 = brighten)
   * @protected
   */
  adjustBrightness(brightness) {
    // Implementation depends on your image processing library
  }

  /**
   * Adjust image contrast
   * 
   * @param {number} contrast - Contrast multiplier (0.5 = reduce, 1.0 = normal, 1.5 = increase)
   * @protected
   */
  adjustContrast(contrast) {
    // Implementation depends on your image processing library
  }

  /**
   * Get a human-readable description of the effect's current state
   * Useful for debugging and logging
   * 
   * @returns {string} Description including effect name and key config values
   */
  getInfo() {
    return `${this._displayName_} (${this._name_}): saturation=${this.config.saturation || 'N/A'}`;
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
    // if (config.saturation !== undefined && (config.saturation < 0 || config.saturation > 2)) {
    //   errors.push('saturation must be between 0 and 2');
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
   * @param {number} options.saturation - Saturation level (0.5-2.0), default: 1.0
   * @param {number} options.brightness - Brightness adjustment (-50 to 50), default: 0
   * @param {number} options.contrast - Contrast level (0.5-2.0), default: 1.0
   */
  constructor({
    saturation = 1.0,
    brightness = 0,
    contrast = 1.0
  } = {}) {
    this.saturation = saturation;
    this.brightness = brightness;
    this.contrast = contrast;
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

    if (config.saturation !== undefined) {
      if (typeof config.saturation !== 'number' || config.saturation < 0.5 || config.saturation > 2.0) {
        errors.push('saturation must be a number between 0.5 and 2.0');
      }
    }

    if (config.brightness !== undefined) {
      if (typeof config.brightness !== 'number' || config.brightness < -50 || config.brightness > 50) {
        errors.push('brightness must be a number between -50 and 50');
      }
    }

    if (config.contrast !== undefined) {
      if (typeof config.contrast !== 'number' || config.contrast < 0.5 || config.contrast > 2.0) {
        errors.push('contrast must be a number between 0.5 and 2.0');
      }
    }

    return {
      valid: errors.length === 0,
      errors
    };
  }
}