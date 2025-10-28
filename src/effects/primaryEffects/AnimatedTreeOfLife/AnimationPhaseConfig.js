/**
 * Animation phase configuration schema and validation
 */

export const ANIMATION_PHASE_CONFIG_SCHEMA = {
  // Phase timing
  phaseAwakening_start: {
    type: 'number',
    default: 0.0,
    min: 0,
    max: 0.5,
    description: 'Start of awakening phase (% of cycle)'
  },
  phaseAscension_start: {
    type: 'number',
    default: 0.20,
    min: 0,
    max: 0.5,
    description: 'Start of ascension phase'
  },
  phaseRadiance_start: {
    type: 'number',
    default: 0.60,
    min: 0.3,
    max: 0.9,
    description: 'Start of radiance phase'
  },
  phaseDescentstart: {
    type: 'number',
    default: 0.85,
    min: 0.5,
    max: 1.0,
    description: 'Start of descent phase'
  },
  
  // Awakening phase
  awakeningNodeAlpha: {
    type: 'number',
    default: 0.3,
    min: 0,
    max: 1,
    description: 'Node alpha during awakening'
  },
  awakeningPathIntensity: {
    type: 'number',
    default: 0.1,
    min: 0,
    max: 1,
    description: 'Path intensity during awakening'
  },
  awakeningEasing: {
    type: 'string',
    default: 'easeInCubic',
    description: 'Easing function for awakening phase'
  },
  
  // Ascension phase
  ascensionNodeAlpha: {
    type: 'number',
    default: 0.8,
    min: 0,
    max: 1,
    description: 'Node alpha during ascension'
  },
  ascensionPathIntensity: {
    type: 'number',
    default: 0.9,
    min: 0,
    max: 1,
    description: 'Path intensity during ascension'
  },
  ascensionPathAnimSpeed: {
    type: 'number',
    default: 1.5,
    min: 0.1,
    max: 5,
    description: 'Speed of path tracing animation'
  },
  ascensionEasing: {
    type: 'string',
    default: 'linear',
    description: 'Easing function for ascension phase'
  },
  
  // Radiance phase
  radianceNodeAlpha: {
    type: 'number',
    default: 1.0,
    min: 0,
    max: 1,
    description: 'Node alpha during radiance'
  },
  radiancePathIntensity: {
    type: 'number',
    default: 1.0,
    min: 0,
    max: 1,
    description: 'Path intensity during radiance'
  },
  radianceKetherGlow: {
    type: 'number',
    default: 2.0,
    min: 1,
    max: 4,
    description: 'Crown node glow intensity'
  },
  radianceEasing: {
    type: 'string',
    default: 'smoothstep',
    description: 'Easing function for radiance phase'
  },
  
  // Descent phase
  descentNodeAlpha: {
    type: 'number',
    default: 0.5,
    min: 0,
    max: 1,
    description: 'Node alpha during descent'
  },
  descentPathIntensity: {
    type: 'number',
    default: 0.2,
    min: 0,
    max: 1,
    description: 'Path intensity during descent'
  },
  descentEasing: {
    type: 'string',
    default: 'easeOutQuart',
    description: 'Easing function for descent phase'
  },
  
  // Metadata
  _version: {
    type: 'string',
    default: '1.0.0',
    description: 'Config version for schema migration'
  },
  _animationType: {
    type: 'string',
    default: 'kabbalistic-sephiroth',
    description: 'Animation type identifier'
  }
};

export class AnimationPhaseConfig {
  constructor(options = {}) {
    this._applyDefaults(options);
  }
  
  _applyDefaults(options) {
    for (const [key, schema] of Object.entries(ANIMATION_PHASE_CONFIG_SCHEMA)) {
      this[key] = options[key] !== undefined ? options[key] : schema.default;
    }
  }
  
  static validate(options = {}) {
    const errors = [];
    const schema = ANIMATION_PHASE_CONFIG_SCHEMA;
    
    for (const [key, rules] of Object.entries(schema)) {
      const value = options[key];
      if (value === undefined) continue; // Use defaults
      
      if (typeof value !== rules.type) {
        errors.push(`${key}: expected ${rules.type}, got ${typeof value}`);
      } else if (rules.type === 'number' && rules.min !== undefined && value < rules.min) {
        errors.push(`${key}: must be >= ${rules.min}, got ${value}`);
      } else if (rules.type === 'number' && rules.max !== undefined && value > rules.max) {
        errors.push(`${key}: must be <= ${rules.max}, got ${value}`);
      }
    }
    
    return { valid: errors.length === 0, errors };
  }
}