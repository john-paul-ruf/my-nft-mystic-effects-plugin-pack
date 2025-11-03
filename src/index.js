/**
 * My NFT Mystic Effects Plugin Pack
 * 
 * Central registry and entry point for all custom effects plugins.
 * This module exports all effects and provides a register function
 * to integrate them with the main my-nft-gen effect system.
 */

// Plugin metadata
export const name = 'my-nft-mystic-effects-plugin-pack';
export const version = '1.0.0';

/**
 * Register all effects with the effect registry
 * 
 * @param {Object} EffectRegistry - The effect registry instance from my-nft-gen
 * @param {Object} PositionRegistry - The position registry instance from my-nft-gen
 * @returns {Promise<void>}
 * 
 * @example
 * import { register } from 'my-nft-mystic-effects-plugin-pack';
 * import { effectRegistry, positionRegistry } from 'my-nft-gen';
 * 
 * await register(effectRegistry, positionRegistry);
 */
export async function register(EffectRegistry, PositionRegistry) {
  try {
    console.log('🔄 [Plugin] Starting registration...');
    console.log('🔄 [Plugin] Current file:', import.meta.url);
    console.log('🔄 [Plugin] EffectRegistry:', EffectRegistry ? 'Available' : 'Missing');
    console.log('🔄 [Plugin] PositionRegistry:', PositionRegistry ? 'Available' : 'Missing');
    
    // Import EffectCategories
    console.log('📦 [Plugin] Importing EffectCategories...');
    const { EffectCategories } = await import('my-nft-gen/src/core/registry/EffectCategories.js');
    
    // Import Animated Tree of Life effect
    console.log('📦 [Plugin] Importing Animated Tree of Life effect...');
    const { AnimatedKabbalisticTreeKeyFrameEffect } = await import('./effects/primaryEffects/AnimatedTreeOfLife/AnimatedKabbalisticTreeKeyFrameEffect.js');
    const { AnimatedTreeOfLifeConfig } = await import('./effects/primaryEffects/AnimatedTreeOfLife/AnimatedTreeOfLifeConfig.js');
    
    // Import Chakra Mandala effect
    console.log('📦 [Plugin] Importing Chakra Mandala effect...');
    const { ChakraMandalaEffect } = await import('./effects/primaryEffects/ChakraMandala/ChakraMandalaEffect.js');
    const { ChakraMandalaConfig } = await import('./effects/primaryEffects/ChakraMandala/ChakraMandalaConfig.js');
    
    // Import presets
    console.log('📦 [Plugin] Importing animation presets...');
    const { 
      HERMETIC_ASCENT, 
      CHAKRA_SPIN, 
      ALCHEMICAL_TRANSMUTATION,
      CINEMATIC,
      GEOMETRIC,
      ETHEREAL,
      MINIMALIST,
      QUANTUM,
      OPERATOR_OVERLOAD
    } = await import('./effects/primaryEffects/AnimatedTreeOfLife/presets/index.js');
    
    // Import Chakra Mandala presets
    console.log('📦 [Plugin] Importing Chakra Mandala presets...');
    const {
      KUNDALINI_AWAKENING,
      HEART_CENTERED_HEALING,
      THIRD_EYE_ACTIVATION,
      GROUNDING_STABILITY,
      FULL_SPECTRUM_RESONANCE,
      CROWN_ENLIGHTENMENT,
      CREATIVE_FLOW,
      THROAT_TRUTH_EXPRESSION,
      SOLAR_POWER_WILL,
      CELESTIAL_VOID
    } = await import('./effects/primaryEffects/ChakraMandala/presets/index.js');
    
    // Set config class references
    console.log('⚙️ [Plugin] Setting config class references...');
    AnimatedKabbalisticTreeKeyFrameEffect._configClass_ = AnimatedTreeOfLifeConfig;
    ChakraMandalaEffect._configClass_ = ChakraMandalaConfig;
    
    // Set presets for the effect (PresetRegistry format - matching my-nft-zencoder pattern)
    console.log('🎨 [Plugin] Setting presets for effects...');
    AnimatedKabbalisticTreeKeyFrameEffect.presets = [
      {
        name: 'hermetic-ascent',
        effect: 'animated-tree-of-life',
        percentChance: 100,
        currentEffectConfig: HERMETIC_ASCENT
      },
      {
        name: 'chakra-spin',
        effect: 'animated-tree-of-life',
        percentChance: 100,
        currentEffectConfig: CHAKRA_SPIN
      },
      {
        name: 'alchemical-transmutation',
        effect: 'animated-tree-of-life',
        percentChance: 100,
        currentEffectConfig: ALCHEMICAL_TRANSMUTATION
      },
      {
        name: 'cinematic',
        effect: 'animated-tree-of-life',
        percentChance: 100,
        currentEffectConfig: CINEMATIC
      },
      {
        name: 'geometric',
        effect: 'animated-tree-of-life',
        percentChance: 100,
        currentEffectConfig: GEOMETRIC
      },
      {
        name: 'ethereal',
        effect: 'animated-tree-of-life',
        percentChance: 100,
        currentEffectConfig: ETHEREAL
      },
      {
        name: 'minimalist',
        effect: 'animated-tree-of-life',
        percentChance: 100,
        currentEffectConfig: MINIMALIST
      },
      {
        name: 'quantum',
        effect: 'animated-tree-of-life',
        percentChance: 100,
        currentEffectConfig: QUANTUM
      },
      {
        name: 'operator-overload',
        effect: 'animated-tree-of-life',
        percentChance: 100,
        currentEffectConfig: OPERATOR_OVERLOAD
      }
    ];
    
    console.log(`✅ [Plugin] Presets set for Tree of Life effects (count: ${AnimatedKabbalisticTreeKeyFrameEffect.presets.length})`);
    
    // Set presets for Chakra Mandala
    console.log('🎨 [Plugin] Setting presets for Chakra Mandala...');
    ChakraMandalaEffect.presets = [
      {
        name: 'kundalini-awakening',
        effect: 'chakra-mandala',
        percentChance: 100,
        currentEffectConfig: KUNDALINI_AWAKENING
      },
      {
        name: 'heart-centered-healing',
        effect: 'chakra-mandala',
        percentChance: 100,
        currentEffectConfig: HEART_CENTERED_HEALING
      },
      {
        name: 'third-eye-activation',
        effect: 'chakra-mandala',
        percentChance: 100,
        currentEffectConfig: THIRD_EYE_ACTIVATION
      },
      {
        name: 'grounding-stability',
        effect: 'chakra-mandala',
        percentChance: 100,
        currentEffectConfig: GROUNDING_STABILITY
      },
      {
        name: 'full-spectrum-resonance',
        effect: 'chakra-mandala',
        percentChance: 100,
        currentEffectConfig: FULL_SPECTRUM_RESONANCE
      },
      {
        name: 'crown-enlightenment',
        effect: 'chakra-mandala',
        percentChance: 100,
        currentEffectConfig: CROWN_ENLIGHTENMENT
      },
      {
        name: 'creative-flow',
        effect: 'chakra-mandala',
        percentChance: 100,
        currentEffectConfig: CREATIVE_FLOW
      },
      {
        name: 'throat-truth-expression',
        effect: 'chakra-mandala',
        percentChance: 100,
        currentEffectConfig: THROAT_TRUTH_EXPRESSION
      },
      {
        name: 'solar-power-will',
        effect: 'chakra-mandala',
        percentChance: 100,
        currentEffectConfig: SOLAR_POWER_WILL
      },
      {
        name: 'celestial-void',
        effect: 'chakra-mandala',
        percentChance: 100,
        currentEffectConfig: CELESTIAL_VOID
      }
    ];
    
    console.log(`✅ [Plugin] Presets set for Chakra Mandala effects (count: ${ChakraMandalaEffect.presets.length})`);
    console.log('🔄 [Plugin] All imports successful, registering effects...');
    
    // Register Animated Tree of Life as PRIMARY effect
    console.log(`📦 Effect name: ${AnimatedKabbalisticTreeKeyFrameEffect._name_}`);
    if (EffectRegistry.hasGlobal && EffectRegistry.hasGlobal(AnimatedKabbalisticTreeKeyFrameEffect._name_)) {
      console.log(`ℹ️ Effect '${AnimatedKabbalisticTreeKeyFrameEffect._name_}' is already registered, skipping...`);
    } else {
      EffectRegistry.registerGlobal(AnimatedKabbalisticTreeKeyFrameEffect, EffectCategories.PRIMARY, {
        displayName: AnimatedKabbalisticTreeKeyFrameEffect._displayName_ || 'Animated Tree of Life',
        description: AnimatedKabbalisticTreeKeyFrameEffect._description_ || 'An animated kabbalistic tree with dynamic phase transitions, sacred geometry, and mystical energy visualization.',
        version: AnimatedKabbalisticTreeKeyFrameEffect._version_ || '1.0.0',
        author: AnimatedKabbalisticTreeKeyFrameEffect._author_ || 'Mystic Effects Pack',
        tags: AnimatedKabbalisticTreeKeyFrameEffect._tags_ || ['effect', 'primary', 'tree', 'animated', 'kabbalah', 'sacred-geometry', 'mystical']
      });
      console.log(`✅ Registered: ${AnimatedKabbalisticTreeKeyFrameEffect._name_} as PRIMARY effect`);
    }
    
    // Register Chakra Mandala as PRIMARY effect
    console.log(`📦 Effect name: ${ChakraMandalaEffect._name_}`);
    if (EffectRegistry.hasGlobal && EffectRegistry.hasGlobal(ChakraMandalaEffect._name_)) {
      console.log(`ℹ️ Effect '${ChakraMandalaEffect._name_}' is already registered, skipping...`);
    } else {
      EffectRegistry.registerGlobal(ChakraMandalaEffect, EffectCategories.PRIMARY, {
        displayName: ChakraMandalaEffect._displayName_ || 'Chakra Mandala',
        description: ChakraMandalaEffect._description_ || 'Animates the 7-chakra system with kundalini rising, mandala rings, and harmonic energy flow.',
        version: ChakraMandalaEffect._version_ || '1.0.0',
        author: ChakraMandalaEffect._author_ || 'Mystic Effects Pack',
        tags: ChakraMandalaEffect._tags_ || ['effect', 'primary', 'chakra', 'mandala', 'kundalini', 'energy', 'mystical']
      });
      console.log(`✅ Registered: ${ChakraMandalaEffect._name_} as PRIMARY effect`);
    }
    
    console.log('✅ [Plugin] All effects registered successfully');
    
  } catch (error) {
    console.error('❌ [Plugin] Error during registration:', error);
    throw error;
  }
}

/**
 * Export individual effect categories for selective imports
 */
export {
  AnimatedKabbalisticTreeKeyFrameEffect,
  AnimatedTreeOfLifeConfig,
  ChakraMandalaEffect,
  ChakraMandalaConfig,
} from './effects/primaryEffects/index.js';