/**
 * Animated Kabbalistic Tree of Life - Complete Module
 * 
 * Core Effect:
 * - AnimatedKabbalisticTreeKeyFrameEffect: Main animation orchestrator
 * 
 * Architecture:
 * - AnimationPhaseEngine: Detects phase + synthesizes configs
 * - AnimationInterpolator: Easing math & lerp
 * - EasingFunctions: Library of easing curves
 * - AnimationPhaseConfig: Schema + validation
 * - AnimationHelpers: Utility functions
 * - SephirothGeometry: 10 nodes + 22 paths data model
 * 
 * Presets:
 * - HERMETIC_ASCENT: Standard classical timing
 * - CHAKRA_SPIN: Rapid with intense glow
 * - ALCHEMICAL_TRANSMUTATION: Slow contemplative
 */

// Core Effect
export { AnimatedKabbalisticTreeKeyFrameEffect } from './AnimatedKabbalisticTreeKeyFrameEffect.js';

// Animation Engine Components
export { AnimationPhaseEngine } from './AnimationPhaseEngine.js';
export { AnimationInterpolator } from './AnimationInterpolator.js';
export { EasingFunctions } from './EasingFunctions.js';
export { AnimationPhaseConfig, ANIMATION_PHASE_CONFIG_SCHEMA } from './AnimationPhaseConfig.js';

// Utilities
export { 
  normalizePhaseProgress, 
  clamp, 
  getPhaseAtProgress 
} from './AnimationHelpers.js';

// Geometry
export { 
  SEPHIROTH_POSITIONS, 
  PATHS_CONNECTIONS, 
  getNodeByName, 
  getNodeById, 
  getNodeActivationOrder 
} from './SephirothGeometry.js';

// Presets
export { 
  HERMETIC_ASCENT, 
  CHAKRA_SPIN, 
  ALCHEMICAL_TRANSMUTATION 
} from './presets/index.js';