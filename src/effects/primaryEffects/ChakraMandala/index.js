/**
 * Chakra Mandala - Complete Module
 * 
 * Core Effect:
 * - ChakraMandalaEffect: Main animation orchestrator for 7-chakra system
 * 
 * Configuration:
 * - ChakraMandalaConfig: Extends base config with chakra-specific parameters
 * 
 * Geometry:
 * - ChakraGeometry: 7 chakra nodes positioned along energy axis
 * 
 * Presets (10 unique configurations):
 * - KUNDALINI_AWAKENING: Classic kundalini rising
 * - HEART_CENTERED_HEALING: Gentle heart-focused meditation
 * - THIRD_EYE_ACTIVATION: Intense intuition focus
 * - GROUNDING_STABILITY: Root chakra grounding
 * - FULL_SPECTRUM_RESONANCE: All chakras in balance
 * - CROWN_ENLIGHTENMENT: Ascending toward divine consciousness
 * - CREATIVE_FLOW: Sacral energy activation
 * - THROAT_TRUTH_EXPRESSION: Communication and truth
 * - SOLAR_POWER_WILL: Personal power at Manipura
 * - CELESTIAL_VOID: Cosmic meditation with minimal elements
 */

// Core Effect
export { ChakraMandalaEffect } from './ChakraMandalaEffect.js';

// Configuration
export { ChakraMandalaConfig } from './ChakraMandalaConfig.js';

// Geometry
export {
  CHAKRA_POSITIONS,
  CHAKRA_CONNECTIONS,
  MANDALA_RING_RADII,
  getChakraByName,
  getChakraByIndex,
  getKundaliniActivationOrder,
  getAllChakraPositions,
} from './ChakraGeometry.js';

// Presets - 10 unique configurations
export {
  KUNDALINI_AWAKENING,
  HEART_CENTERED_HEALING,
  THIRD_EYE_ACTIVATION,
  GROUNDING_STABILITY,
  FULL_SPECTRUM_RESONANCE,
  CROWN_ENLIGHTENMENT,
  CREATIVE_FLOW,
  THROAT_TRUTH_EXPRESSION,
  SOLAR_POWER_WILL,
  CELESTIAL_VOID,
} from './presets/index.js';