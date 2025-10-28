/**
 * Secondary Effect Template
 * 
 * Copy this file and the accompanying [EffectName]Config.js to create new secondary effects.
 * Secondary effects are post-processing applied after primary effects.
 * 
 * This template demonstrates:
 * - Extending LayerEffect for integration with my-nft-gen framework
 * - Post-processing of primary effect results
 * - Proper static metadata (_name_, _displayName_, etc.)
 * - Frame-by-frame rendering via the invoke() method
 * 
 * File naming convention: 
 *   - [EffectName]Effect.js (this file)
 *   - [EffectName]Config.js (companion file)
 *   - Located in: src/effects/secondaryEffects/[EffectName]/
 */

import { LayerEffect } from 'my-nft-gen/src/core/layer/LayerEffect.js';
import { Settings } from 'my-nft-gen/src/core/Settings.js';

/**
 * YourEffectNameEffect - A description of what your effect does
 * 
 * @class YourEffectNameEffect
 * @extends LayerEffect
 * @description This is a template for creating secondary effects. Secondary effects
 *              enhance or modify the result of primary effects through post-processing.
 *              
 * @example
 * // Basic usage
 * const effect = new YourEffectNameEffect({
 *   config: new YourEffectNameConfig({ opacity: 0.5 }),
 *   settings: new Settings()
 * });
 * await effect.invoke(layer, 0, 1);
 */
export class YourEffectNameEffect extends LayerEffect {
  // Static metadata - required for registration
  static _name_ = 'your-secondary-effect-name';
  static _displayName_ = 'Your Secondary Effect Name';
  static _description_ = 'A description of what your secondary effect does';
  static _version_ = '1.0.0';
  static _author_ = 'Your Name';
  static _tags_ = ['effect', 'secondary', 'post-processing', 'custom'];
  
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
   * Apply the secondary effect to the layer
   * 
   * This is called by the framework after primary effects have been applied.
   * Override this to implement your post-processing logic.
   * 
   * @async
   * @param {Object} layer - The layer with primary effects already applied
   * @param {number} currentFrame - Current frame number (0-based)
   * @param {number} numberOfFrames - Total number of frames
   * @returns {Promise<void>}
   * @throws {Error} If configuration is invalid
   * 
   * @example
   * async invoke(layer, currentFrame, numberOfFrames) {
   *   // Apply post-processing to the layer
   *   // Enhance, blur, color-adjust, etc.
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

      // Implement your secondary effect logic here
      // This will be applied on top of primary effects
      console.log(this.getInfo());

      // Always call super.invoke() at the end to support chained effects
      await super.invoke(layer, currentFrame, numberOfFrames);

    } catch (error) {
      console.error(`Error in ${this._name_}:`, error);
      throw error;
    }
  }

  /**
   * Get a human-readable description of the effect's current state
   * Useful for debugging and logging
   * 
   * @returns {string} Description including effect name and key config values
   */
  getInfo() {
    return `${this._displayName_} (${this._name_}): opacity=${this.config.opacity || 'N/A'}`;
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
    // if (config.opacity !== undefined && (config.opacity < 0 || config.opacity > 1)) {
    //   errors.push('opacity must be between 0 and 1');
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
   * @param {number} options.opacity - Effect opacity (0-1), default: 0.5
   * @param {string} options.blendMode - CSS blend mode, default: 'normal'
   */
  constructor({
    opacity = 0.5,
    blendMode = 'normal'
  } = {}) {
    this.opacity = opacity;
    this.blendMode = blendMode;
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
    const validBlendModes = [
      'normal', 'multiply', 'screen', 'overlay', 'darken', 'lighten',
      'color-dodge', 'color-burn', 'hard-light', 'soft-light', 'difference',
      'exclusion', 'hue', 'saturation', 'color', 'luminosity'
    ];

    if (config.opacity !== undefined) {
      if (typeof config.opacity !== 'number' || config.opacity < 0 || config.opacity > 1) {
        errors.push('opacity must be a number between 0 and 1');
      }
    }

    if (config.blendMode !== undefined) {
      if (!validBlendModes.includes(config.blendMode)) {
        errors.push(`blendMode must be one of: ${validBlendModes.join(', ')}`);
      }
    }

    return {
      valid: errors.length === 0,
      errors
    };
  }
}