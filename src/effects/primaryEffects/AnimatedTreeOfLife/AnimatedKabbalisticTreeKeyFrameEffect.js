/**
 * Animated Kabbalistic Tree of Life Effect
 *
 * **REFACTORED v2.0** - Now uses PhaseAnimatedPolygonEffect base class
 * Eliminates 600+ lines of redundant code through inheritance
 *
 * Animates the Tree of Life symbol through 4 phases with smooth transitions:
 * 1. Awakening (0-20%): Energy rises from Malkuth
 * 2. Ascension (20-60%): Paths trace upward
 * 3. Radiance (60-85%): Full network glowing
 * 4. Descent (85-100%): Energy returns to Malkuth (seamless loop)
 *
 * Includes:
 * - 10 Sephiroth nodes + 22 sacred paths (sacred geometry)
 * - 7 energy pulse systems (waves, breathing, spirals, etc.)
 * - 10 mystic symbols with per-phase animation
 * - Smooth cross-phase transitions (from v2.1)
 * - Hardware-accelerated rendering via Canvas2dFactory
 */

import {Settings} from 'my-nft-gen/src/core/Settings.js';
import {PhaseAnimatedPolygonEffect} from '../../base/PhaseAnimatedPolygonEffect.js';
import {AnimatedTreeOfLifeConfig} from './AnimatedTreeOfLifeConfig.js';
import {SEPHIROTH_POSITIONS, PATHS_CONNECTIONS} from './SephirothGeometry.js';
import {EnergyPulseEngine} from './EnergyPulseEngine.js';
import {MysticSymbolsEngine} from './MysticSymbolsEngine.js';
import {DetailedGeometryEngine} from './DetailedGeometryEngine.js';

export class AnimatedKabbalisticTreeKeyFrameEffect extends PhaseAnimatedPolygonEffect {
    static _name_ = 'animated-tree-of-life';
    static _displayName_ = 'Animated Tree of Life';
    static _description_ = 'Animates the Tree of Life symbol through mystical phases with energy flow and sacred geometry';
    static _version_ = '2.0.0'; // v2.0 = Refactored with base class
    static _author_ = 'Operator';
    static _tags_ = ['effect', 'primary', 'tree', 'animation', 'sacred-geometry', 'keyframe', 'animated'];

    constructor({
        name = AnimatedKabbalisticTreeKeyFrameEffect._name_,
        requiresLayer = true,
        config = new AnimatedTreeOfLifeConfig({}),
        additionalEffects = [],
        ignoreAdditionalEffects = false,
        settings = new Settings({}),
        frameNumber = 0,
        totalFrames = 1,
    } = {}) {
        super({
            name,
            requiresLayer,
            config,
            additionalEffects,
            ignoreAdditionalEffects,
            settings,
            frameNumber,
            totalFrames,
        });

        // Initialize Tree of Life-specific engines (can be null for worker thread safety)
        try {
            this.energyPulseEngine = new EnergyPulseEngine(this.config);
        } catch (e) {
            console.warn('EnergyPulseEngine initialization failed, disabling pulses:', e.message);
            this.config.enableEnergyPulses = false;
            this.energyPulseEngine = null;
        }

        try {
            this.mysticSymbolsEngine = new MysticSymbolsEngine(this.config);
        } catch (e) {
            console.warn('MysticSymbolsEngine initialization failed, disabling symbols:', e.message);
            this.config.enableMysticSymbols = false;
            this.mysticSymbolsEngine = null;
        }

        try {
            this.detailedGeometryEngine = new DetailedGeometryEngine(this.config);
        } catch (e) {
            console.warn('DetailedGeometryEngine initialization failed, disabling:', e.message);
            this.config.enableDetailedGeometry = false;
            this.detailedGeometryEngine = null;
        }
    }

    /**
     * Get node positions for the Tree of Life geometry
     * Implements required abstract method from PhaseAnimatedPolygonEffect
     * @protected
     * @returns {Array} Array of node objects with {x, y, id, color, glowColor}
     */
    getNodePositions() {
        return Object.values(SEPHIROTH_POSITIONS);
    }

    /**
     * Get path connections for the Tree of Life geometry
     * Implements required abstract method from PhaseAnimatedPolygonEffect
     * @protected
     * @returns {Array} Array of path objects with {start, end} node IDs
     */
    getPathConnections() {
        return PATHS_CONNECTIONS;
    }

    /**
     * Pre-generate hook: apply random enum selections and size scales
     * Called once in base class constructor
     * @protected
     */
    generate() {
        // Apply random easing selections to config for deterministic variation
        const easingConfig = {
            awakeningEasing: AnimatedTreeOfLifeConfig.pickRandom(this.config.awakeningEasing),
            ascensionEasing: AnimatedTreeOfLifeConfig.pickRandom(this.config.ascensionEasing),
            radianceEasing: AnimatedTreeOfLifeConfig.pickRandom(this.config.radianceEasing),
            descentEasing: AnimatedTreeOfLifeConfig.pickRandom(this.config.descentEasing),
        };

        // Get size scale multipliers
        const energyPulseSizeScale = this.config.energyPulseSizeScale || 1.0;
        const mysticSymbolSizeScale = this.config.mysticSymbolSizeScale || 1.0;

        // Apply to config
        Object.assign(this.config, easingConfig, {
            layerBlendMode: AnimatedTreeOfLifeConfig.pickRandom(this.config.layerBlendMode),
            pulseSpiralRadius: (this.config.pulseSpiralRadius || 50) * energyPulseSizeScale,
            pulseAuraWidth: (this.config.pulseAuraWidth || 0.15) * energyPulseSizeScale,
            symbolGlowSize: (this.config.symbolGlowSize || 8) * mysticSymbolSizeScale,
        });
    }

    /**
     * Override rendering to inject Tree of Life-specific rendering
     * @protected
     * @param {Canvas2d} canvas - Render canvas
     * @param {number} width - Canvas width
     * @param {number} height - Canvas height
     * @param {Object} frameConfig - Frame-specific configuration with smooth transitions
     * @param {number} progress - Overall animation progress (0-1)
     */
    async renderEffect(canvas, width, height, frameConfig, progress) {
        // Reinitialize engines if lost in worker threads
        this.#ensureEnginesInitialized();

        // Extract colors from ColorPicker instances
        const colors = this.#extractColors();

        // Render the full Tree of Life animation
        await this.#renderTreeOfLife(canvas, width, height, colors, frameConfig, progress);

        // Log progress (useful for debugging)
        const phase = this.getCurrentPhase(progress);
        console.log('✅ Animated Tree of Life rendered - Phase:', phase, 'Progress:', progress.toFixed(3));
    }

    /**
     * Ensure engines are initialized (handles worker thread loss)
     * @private
     */
    #ensureEnginesInitialized() {
        if (!this.energyPulseEngine || !this.energyPulseEngine.getWavePulse) {
            try {
                this.energyPulseEngine = new EnergyPulseEngine(this.config);
            } catch (e) {
                console.warn('EnergyPulseEngine reinitialization failed:', e.message);
                this.config.enableEnergyPulses = false;
            }
        }

        if (!this.mysticSymbolsEngine || !this.mysticSymbolsEngine.getSymbol) {
            try {
                this.mysticSymbolsEngine = new MysticSymbolsEngine(this.config);
            } catch (e) {
                console.warn('MysticSymbolsEngine reinitialization failed:', e.message);
                this.config.enableMysticSymbols = false;
            }
        }

        if (!this.detailedGeometryEngine || !this.detailedGeometryEngine.getNodeLayers) {
            try {
                this.detailedGeometryEngine = new DetailedGeometryEngine(this.config);
            } catch (e) {
                console.warn('DetailedGeometryEngine reinitialization failed:', e.message);
                this.config.enableDetailedGeometry = false;
            }
        }
    }

    /**
     * Transform a normalized tree coordinate (0-1) to canvas coordinates with scale and centering
     * Overrides base class method with Tree of Life-specific scaling
     * @private
     */
    #transformCoordinate(normalizedX, normalizedY, width, height) {
        // Get scale and center position from config
        const scale = this.config.scale || 1.0;
        const centerX = this.config.centerX !== undefined ? this.config.centerX : 0.5;
        const centerY = this.config.centerY !== undefined ? this.config.centerY : 0.5;

        // Translate from normalized space (0-1) to canvas space
        // First, scale the coordinates around 0.5
        const scaledX = 0.5 + (normalizedX - 0.5) * scale;
        const scaledY = 0.5 + (normalizedY - 0.5) * scale;

        // Then shift to the desired center position
        const x = (scaledX - 0.5) + centerX;
        const y = (scaledY - 0.5) + centerY;

        // Convert to pixel coordinates
        return {
            x: x * width,
            y: y * height
        };
    }

    /**
     * Extract colors from ColorPicker instances with fallback defaults
     * This is critical - ColorPicker.getColor() can return undefined
     * @private
     */
    #extractColors() {
        const defaultColors = {
            branchColor: '#A0522D',
            accentColor: '#FFD700',
            glowColor: '#FFFF00',
        };

        const settings = this.settings || new Settings({});

        return {
            branchColor: this.config.branchColor?.getColor?.(settings) || defaultColors.branchColor,
            accentColor: this.config.accentColor?.getColor?.(settings) || defaultColors.accentColor,
            glowColor: this.config.glowColor?.getColor?.(settings) || defaultColors.glowColor,
        };
    }

    /**
     * Render the Tree of Life structure with animation parameters
     * @private
     */
    async #renderTreeOfLife(canvas, width, height, colors, frameConfig, progress) {
        try {
            // Use provided frame config (calculated in invoke) instead of pre-generated data
            const animConfig = frameConfig;
            
            // Get animation parameters
            const nodeAlpha = animConfig.nodeAlpha || 0.8;
            const pathIntensity = animConfig.pathIntensity || 0.8;
            const ketherGlow = animConfig.ketherGlow || 1.0;
            const nodeSize = this.config.nodeSize || 20;
            const nodeGlowSize = this.config.nodeGlowSize || 25;
            const pathThickness = (this.config.pathThickness || 2) * (this.config.pathSizeScale || 1.0);
            
            // Get current phase for animations (from base class)
            const phase = this.getCurrentPhase(progress);

            // ===== RENDER ATMOSPHERIC FUZZ LAYER =====
            // Add scattered energy particles for visual complexity
            await this.#renderAtmosphericFuzz(canvas, width, height, colors, progress, pathIntensity);

            // ===== RENDER DETAILED PATH ENHANCEMENTS (before main paths for depth) =====
            if (this.config.enableDetailedGeometry) {
                await this.#renderDetailedPathEnhancements(canvas, width, height, colors, progress, phase);
            }

            // ===== RENDER PATHS (connections) =====
            for (let pathIndex = 0; pathIndex < (animConfig.pathAnimationOrder || PATHS_CONNECTIONS).length; pathIndex++) {
                const path = (animConfig.pathAnimationOrder || PATHS_CONNECTIONS)[pathIndex];
                const fromNodeId = path.start;
                const toNodeId = path.end;

                // Find nodes by ID
                const fromNode = Object.values(SEPHIROTH_POSITIONS).find(n => n.id === fromNodeId);
                const toNode = Object.values(SEPHIROTH_POSITIONS).find(n => n.id === toNodeId);

                if (!fromNode || !toNode) continue;

                // Apply scale and center transformation
                const pos1 = this.#transformCoordinate(fromNode.x, fromNode.y, width, height);
                const x1 = pos1.x;
                const y1 = pos1.y;
                const pos2 = this.#transformCoordinate(toNode.x, toNode.y, width, height);
                const x2 = pos2.x;
                const y2 = pos2.y;

                // Draw path line with animated intensity
                await canvas.drawLine2d(
                    {x: x1, y: y1},
                    {x: x2, y: y2},
                    pathThickness,              // Line thickness
                    colors.branchColor,         // Path color
                    0,                          // No outer stroke
                    null,
                    pathIntensity               // Animated alpha based on phase
                );
                
                // ===== RENDER PATH ENERGY WAVES =====
                if (this.config.enableEnergyPulses) {
                    const wavePulse = this.energyPulseEngine.getWavePulse(
                        progress, 
                        pathIndex, 
                        PATHS_CONNECTIONS.length
                    );
                    
                    if (wavePulse.intensity > 0.01) {
                        // Draw wave pulse along path
                        const waveX = x1 + (x2 - x1) * wavePulse.position;
                        const waveY = y1 + (y2 - y1) * wavePulse.position;
                        
                        await canvas.drawFilledPolygon2d(
                            pathThickness * 3,
                            {x: waveX, y: waveY},
                            12,
                            0,
                            colors.glowColor,
                            wavePulse.intensity * 0.8
                        );
                    }
                    
                    // ===== RENDER PATH TRACERS =====
                    const tracers = this.energyPulseEngine.getPathTracer(
                        progress,
                        pathIndex,
                        PATHS_CONNECTIONS.length
                    );
                    
                    for (const tracer of tracers) {
                        const tracerX = x1 + (x2 - x1) * tracer.position;
                        const tracerY = y1 + (y2 - y1) * tracer.position;
                        
                        await canvas.drawFilledPolygon2d(
                            pathThickness * 2.5,
                            {x: tracerX, y: tracerY},
                            8,
                            0,
                            colors.accentColor,
                            tracer.brightness * 0.7
                        );
                    }
                }
            }

            // ===== RENDER PATH ENHANCEMENTS (subdivisions & interference) =====
            await this.#renderPathSubdivisions(canvas, width, height, colors, progress, pathIntensity);
            await this.#renderHarmonicInterference(canvas, width, height, colors, progress, pathIntensity);

            // ===== RENDER NODES (Sephiroth) =====
            const nodeActivationOrder = animConfig.nodeActivationOrder || Object.values(SEPHIROTH_POSITIONS);
            
            for (const node of nodeActivationOrder) {
                // Apply scale and center transformation
                const pos = this.#transformCoordinate(node.x, node.y, width, height);
                const x = pos.x;
                const y = pos.y;
                
                // Calculate total distance from center for aura waves
                const configCenterX = (this.config.centerX !== undefined ? this.config.centerX : 0.5) * width;
                const configCenterY = (this.config.centerY !== undefined ? this.config.centerY : 0.5) * height;
                const distFromCenter = Math.hypot(x - configCenterX, y - configCenterY) / (Math.hypot(configCenterX, configCenterY) || 1);
                
                // ===== RENDER AURA WAVES & ENERGY PULSES =====
                if (this.config.enableEnergyPulses) {
                    const nodePulse = this.energyPulseEngine.getCombinedNodePulse(
                        progress,
                        node.id,
                        x,
                        y,
                        distFromCenter,
                        nodeActivationOrder.length,
                        this.energyPulseEngine.getPhaseWeights(phase)
                    );
                    
                    // Apply harmonic offsets to node position
                    const pulseX = x + nodePulse.offsetX;
                    const pulseY = y + nodePulse.offsetY;
                    
                    // Extended glow for energy pulses
                    const pulseGlowSize = nodeGlowSize + nodePulse.glow * 15;
                    await canvas.drawRing2d(
                        {x: pulseX, y: pulseY},
                        pulseGlowSize,
                        3,
                        colors.glowColor,
                        0,
                        null,
                        nodePulse.glow * 0.6
                    );
                    
                    // ===== RENDER SPIRAL VORTEX =====
                    const spiralPoints = this.energyPulseEngine.getSpiralVortex(progress, x, y, node.id);
                    for (const point of spiralPoints) {
                        if (point.intensity > 0.01) {
                            await canvas.drawFilledPolygon2d(
                                3,
                                {x: point.x, y: point.y},
                                6,
                                0,
                                colors.accentColor,
                                point.intensity * 0.5
                            );
                        }
                    }
                    
                    // Special glow intensity for Kether with pulse modulation
                    const isKether = node.id === 1;
                    const nodeGlowIntensity = isKether ? 
                        (pathIntensity * ketherGlow + nodePulse.glow * 0.3) : 
                        (pathIntensity * 0.6 + nodePulse.glow * 0.2);

                    // Draw base glow ring effect
                    await canvas.drawRing2d(
                        {x: pulseX, y: pulseY},
                        nodeGlowSize,
                        3,
                        colors.glowColor,
                        0,
                        null,
                        nodeGlowIntensity * 0.5
                    );

                    // Draw node circle with pulse scaling
                    const pulseScale = nodePulse.scale;
                    await canvas.drawFilledPolygon2d(
                        nodeSize * pulseScale,
                        {x: pulseX, y: pulseY},
                        32,
                        0,
                        node.color,
                        nodeAlpha
                    );
                    
                    // Optional: Add inner highlight for energy flow effect
                    if (this.config.energyFlow) {
                        await canvas.drawFilledPolygon2d(
                            nodeSize * pulseScale * 0.5,
                            {x: pulseX, y: pulseY},
                            32,
                            0,
                            colors.glowColor,
                            nodeAlpha * (0.6 + nodePulse.glow * 0.4)
                        );
                    }
                } else {
                    // Standard node rendering without energy pulses
                    const isKether = node.id === 1;
                    const nodeGlowIntensity = isKether ? pathIntensity * ketherGlow : pathIntensity * 0.6;

                    await canvas.drawRing2d(
                        {x, y},
                        nodeGlowSize,
                        3,
                        colors.glowColor,
                        0,
                        null,
                        nodeGlowIntensity * 0.5
                    );

                    await canvas.drawFilledPolygon2d(
                        nodeSize,
                        {x, y},
                        32,
                        0,
                        node.color,
                        nodeAlpha
                    );
                    
                    if (this.config.energyFlow) {
                        await canvas.drawFilledPolygon2d(
                            nodeSize * 0.5,
                            {x, y},
                            32,
                            0,
                            colors.glowColor,
                            nodeAlpha * 0.6
                        );
                    }
                }
                
                // ===== RENDER DETAILED NODE GEOMETRY =====
                if (this.config.enableDetailedGeometry) {
                    await this.#renderDetailedNodeGeometry(
                        canvas,
                        node,
                        x,
                        y,
                        progress,
                        phase,
                        colors
                    );
                }

                // ===== RENDER MYSTIC SYMBOLS =====
                if (this.config.enableMysticSymbols && 
                    this.config.symbolShowOnPhases.includes(phase)) {
                    await this.#renderMysticSymbol(
                        canvas, 
                        node, 
                        x, 
                        y, 
                        progress, 
                        phase,
                        colors
                    );
                }
            }

            // ===== RENDER SECONDARY GLOW LAYER (final enhancement) =====
            await this.#renderSecondaryGlowLayer(canvas, width, height, colors, progress, pathIntensity, nodeAlpha);

            console.log('✅ Tree of Life animated frame rendered with mystical enhancements');
            console.log('   Phase:', phase, '| Progress:', progress.toFixed(3));
            console.log('   Energy Pulses:', this.config.enableEnergyPulses ? '✓' : '✗');
            console.log('   Mystic Symbols:', this.config.enableMysticSymbols ? '✓' : '✗');
            console.log('   Nodes:', nodeActivationOrder.length, '| Paths:', PATHS_CONNECTIONS.length);
            console.log('   Node Alpha:', nodeAlpha.toFixed(2), '| Path Intensity:', pathIntensity.toFixed(2));
            console.log('   Visual Enhancements: Fuzz ✓ | Subdivisions ✓ | Interference ✓ | Glow Layer ✓');
        } catch (error) {
            console.error('Error rendering tree of life:', error);
            throw error;
        }
    }

    /**
     * Render atmospheric fuzz - scattered energy particles throughout the canvas
     * Creates a sense of depth and ethereal energy flow
     * @private
     */
    async #renderAtmosphericFuzz(canvas, width, height, colors, progress, baseIntensity) {
        const fuzzDensity = this.config.fuzzDensity || 0.15; // 0-1, controls particle count
        const fuzzAmount = Math.max(1, Math.floor(fuzzDensity * 50)); // Scale up to reasonable number
        
        // Seeded pseudo-random for consistent animation
        for (let i = 0; i < fuzzAmount; i++) {
            const seed = i + Math.floor(progress * 100) * 7;
            const random1 = Math.sin(seed * 12.9898) * 43758.5453;
            const random2 = Math.sin(seed * 78.233) * 43758.5453;
            const randomX = (random1 - Math.floor(random1)) * width;
            const randomY = (random2 - Math.floor(random2)) * height;
            
            // Particle brightness varies with progress
            const phase2 = (progress * 5 + i * 0.2) % 1;
            const particleBrightness = Math.sin(phase2 * Math.PI) * baseIntensity * 0.3;
            
            if (particleBrightness > 0.01) {
                await canvas.drawFilledPolygon2d(
                    1.5,
                    {x: randomX, y: randomY},
                    4,
                    0,
                    colors.glowColor,
                    particleBrightness
                );
            }
        }
    }

    /**
     * Render path subdivisions - intermediate lines for visual detail
     * Creates harmonic resonance patterns between main paths
     * @private
     */
    async #renderPathSubdivisions(canvas, width, height, colors, progress, pathIntensity) {
        const subdivisionIntensity = this.config.subdivisionIntensity || 0.3;
        const subdivisionsPerPath = 2; // Additional soft lines per path
        
        for (let pathIndex = 0; pathIndex < PATHS_CONNECTIONS.length; pathIndex++) {
            const path = PATHS_CONNECTIONS[pathIndex];
            const fromNode = Object.values(SEPHIROTH_POSITIONS).find(n => n.id === path.start);
            const toNode = Object.values(SEPHIROTH_POSITIONS).find(n => n.id === path.end);
            
            if (!fromNode || !toNode) continue;
            
            const pos1 = this.#transformCoordinate(fromNode.x, fromNode.y, width, height);
            const pos2 = this.#transformCoordinate(toNode.x, toNode.y, width, height);
            
            // Create offset parallel lines for depth effect
            for (let sub = 1; sub <= subdivisionsPerPath; sub++) {
                const offset = (sub / (subdivisionsPerPath + 1)) * 2;
                const perpX = -(pos2.y - pos1.y) * offset / 20;
                const perpY = (pos2.x - pos1.x) * offset / 20;
                
                const phase2 = (progress * 3 + pathIndex * 0.3 + sub * 0.15) % 1;
                const lineIntensity = Math.sin(phase2 * Math.PI) * subdivisionIntensity * pathIntensity;
                
                if (lineIntensity > 0.01) {
                    await canvas.drawLine2d(
                        {x: pos1.x + perpX, y: pos1.y + perpY},
                        {x: pos2.x + perpX, y: pos2.y + perpY},
                        0.5,
                        colors.accentColor,
                        0,
                        null,
                        lineIntensity
                    );
                }
            }
        }
    }

    /**
     * Render harmonic interference patterns - geometric overlays at path intersections
     * Creates complex visual detail and suggests harmonic resonance
     * @private
     */
    async #renderHarmonicInterference(canvas, width, height, colors, progress, pathIntensity) {
        const interferenceAmount = this.config.interferenceAmount || 0.2;
        
        // Sample intersection points across the tree grid
        const sampleCount = Math.max(5, Math.floor(interferenceAmount * 20));
        
        for (let i = 0; i < sampleCount; i++) {
            const nodeArray = Object.values(SEPHIROTH_POSITIONS);
            const node = nodeArray[i % nodeArray.length];
            
            // Position near each node for interference pattern
            const basePos = this.#transformCoordinate(node.x, node.y, width, height);
            
            // Multiple ripples emanating from each point
            for (let ripple = 1; ripple <= 3; ripple++) {
                const ripplePhase = (progress * (2 + ripple) + i * 0.1) % 1;
                const rippleRadius = ripple * 8 + ripplePhase * 15;
                const rippleIntensity = Math.sin(ripplePhase * Math.PI) * pathIntensity * 0.25 * (1 - ripple / 4);
                
                if (rippleIntensity > 0.01) {
                    await canvas.drawRing2d(
                        {x: basePos.x, y: basePos.y},
                        rippleRadius,
                        0.8,
                        colors.glowColor,
                        0,
                        null,
                        rippleIntensity
                    );
                }
            }
        }
    }

    /**
     * Render secondary glow layer - enhanced luminosity for visual impact
     * @private
     */
    async #renderSecondaryGlowLayer(canvas, width, height, colors, progress, pathIntensity, nodeAlpha) {
        const glowLayerIntensity = this.config.glowLayerIntensity || 0.15;
        
        // Create soft bloom effect across entire tree area
        for (const node of Object.values(SEPHIROTH_POSITIONS)) {
            const pos = this.#transformCoordinate(node.x, node.y, width, height);
            
            // Pulsating secondary glow
            const glowPhase = (progress * 2 + node.id * 0.15) % 1;
            const glowIntensity = Math.sin(glowPhase * Math.PI) * glowLayerIntensity * pathIntensity * nodeAlpha;
            
            if (glowIntensity > 0.01) {
                await canvas.drawRing2d(
                    {x: pos.x, y: pos.y},
                    40 + Math.sin(glowPhase * Math.PI * 2) * 10,
                    4,
                    colors.glowColor,
                    0,
                    null,
                    glowIntensity * 0.4
                );
            }
        }
    }

    /**
     * Render detailed geometric enhancements for nodes
     * Adds crystalline structures, Fibonacci spirals, harmonic rings, etc.
     * @private
     */
    async #renderDetailedNodeGeometry(canvas, node, x, y, progress, phase, colors) {
        try {
            const nodeSize = this.config.nodeSize || 20;
            const complexity = this.detailedGeometryEngine.getNodeComplexity(node.id) * (this.config.nodeLayerComplexity || 0.8);
            
            const layers = this.detailedGeometryEngine.getNodeLayers(node.id, progress, phase);
            
            for (const layer of layers) {
                if (layer.intensity < 0.01) continue;

                const layerColor = layer.color === 'glow' ? colors.glowColor : colors.accentColor;
                const scaledRadius = nodeSize * layer.radius * complexity;

                switch (layer.type) {
                    case 'crystalline':
                        // Draw hexagonal crystalline pattern
                        if (this.config.nodeCrystallineEffect) {
                            for (let i = 0; i < 6; i++) {
                                const angle = (i / 6) * Math.PI * 2 + (layer.rotation * Math.PI / 180);
                                const px = x + Math.cos(angle) * scaledRadius;
                                const py = y + Math.sin(angle) * scaledRadius;
                                
                                await canvas.drawFilledPolygon2d(
                                    2,
                                    {x: px, y: py},
                                    6,
                                    angle,
                                    layerColor,
                                    layer.intensity * 0.5
                                );
                            }
                        }
                        break;

                    case 'fibonacci':
                        // Draw Fibonacci spiral
                        if (this.config.nodeFibonacciSpiral) {
                            for (let i = 0; i < layer.spirals; i++) {
                                const spiralOffset = (i / layer.spirals) * Math.PI * 2;
                                const points = this.#generateFibonacciSpiral(x, y, scaledRadius, progress, layer.rotation, spiralOffset);
                                
                                for (let j = 0; j < points.length - 1; j++) {
                                    const p1 = points[j];
                                    const p2 = points[j + 1];
                                    await canvas.drawLine2d(
                                        p1, p2,
                                        layer.thickness,
                                        layerColor,
                                        0,
                                        null,
                                        layer.intensity * 0.4
                                    );
                                }
                            }
                        }
                        break;

                    case 'harmonic_rings':
                        // Draw concentric rings at golden ratio intervals
                        if (this.config.nodeHarmonicRings) {
                            const goldenRatio = 1.618033988749895;
                            for (let i = 1; i <= layer.count; i++) {
                                const ringRadius = scaledRadius * (i / goldenRatio);
                                const ringIntensity = layer.intensity * (1 - i / (layer.count + 1));
                                
                                await canvas.drawRing2d(
                                    {x, y},
                                    ringRadius,
                                    0.5,
                                    layerColor,
                                    0,
                                    null,
                                    ringIntensity
                                );
                            }
                        }
                        break;

                    case 'orbital':
                        // Draw rotating orbital elements
                        if (this.config.nodeOrbitalElements) {
                            for (let i = 0; i < layer.count; i++) {
                                const orbitAngle = (i / layer.count) * Math.PI * 2 + (layer.rotation * Math.PI / 180);
                                const orbitX = x + Math.cos(orbitAngle) * scaledRadius;
                                const orbitY = y + Math.sin(orbitAngle) * scaledRadius;
                                
                                await canvas.drawFilledPolygon2d(
                                    nodeSize * 0.3,
                                    {x: orbitX, y: orbitY},
                                    8,
                                    orbitAngle,
                                    layerColor,
                                    layer.intensity * 0.5
                                );
                            }
                        }
                        break;

                    case 'mandala':
                        // Draw inner mandala pattern
                        if (this.config.nodeMandalaPattern) {
                            const mandalaSize = nodeSize * 0.4;
                            for (let i = 0; i < layer.petals; i++) {
                                const petalAngle = (i / layer.petals) * Math.PI * 2 + (layer.rotation * Math.PI / 180);
                                const petalX = x + Math.cos(petalAngle) * mandalaSize * 0.6;
                                const petalY = y + Math.sin(petalAngle) * mandalaSize * 0.6;
                                
                                await canvas.drawFilledPolygon2d(
                                    mandalaSize * 0.3,
                                    {x: petalX, y: petalY},
                                    5,
                                    petalAngle,
                                    layerColor,
                                    layer.intensity * 0.5
                                );
                            }
                        }
                        break;
                }
            }
        } catch (error) {
            console.warn('Warning rendering detailed node geometry for node', node.id, ':', error.message);
        }
    }

    /**
     * Render detailed enhancements for paths
     * Adds ribbon effects, harmonic subdivisions, crosshatching, etc.
     * @private
     */
    async #renderDetailedPathEnhancements(canvas, width, height, colors, progress, phase) {
        try {
            const pathThickness = this.config.pathThickness || 2;
            
            for (let pathIndex = 0; pathIndex < PATHS_CONNECTIONS.length; pathIndex++) {
                const path = PATHS_CONNECTIONS[pathIndex];
                const fromNode = Object.values(SEPHIROTH_POSITIONS).find(n => n.id === path.start);
                const toNode = Object.values(SEPHIROTH_POSITIONS).find(n => n.id === path.end);
                
                if (!fromNode || !toNode) continue;

                const pos1 = this.#transformCoordinate(fromNode.x, fromNode.y, width, height);
                const pos2 = this.#transformCoordinate(toNode.x, toNode.y, width, height);

                const enhancements = this.detailedGeometryEngine.getPathEnhancements(
                    pathIndex,
                    pos1,
                    pos2,
                    progress,
                    phase,
                    PATHS_CONNECTIONS.length
                );

                // Render ribbon effect (twisted appearance)
                if (this.config.pathRibbonEffect > 0.01) {
                    await this.#renderPathRibbon(canvas, pos1, pos2, pathThickness, enhancements.ribbonEffect, colors);
                }

                // Render harmonic subdivisions
                if (this.config.harmonicSubdivisions > 0.01) {
                    await this.#renderHarmonicPathSubdivisions(canvas, pos1, pos2, enhancements.harmonicSubdivisions, colors);
                }

                // Render thickness variations
                if (this.config.pathRibbonEffect > 0.01) {
                    await this.#renderPathThicknessVariation(canvas, pos1, pos2, pathThickness, enhancements.thicknessVariation, colors);
                }

                // Render crosshatch pattern
                if (this.config.crosshatchIntensity > 0.01) {
                    await this.#renderPathCrosshatch(canvas, pos1, pos2, enhancements.crosshatch, colors);
                }

                // Render flowing pattern
                await this.#renderPathFlowingPattern(canvas, pos1, pos2, enhancements.flowingPattern, colors);
            }
        } catch (error) {
            console.warn('Error rendering detailed path enhancements:', error.message);
        }
    }

    /**
     * Render path as a ribbon with twist effect
     * @private
     */
    async #renderPathRibbon(canvas, pos1, pos2, thickness, ribbonEffect, colors) {
        const ribbonIntensity = this.config.pathRibbonEffect || 0.6;
        const subdivisions = ribbonEffect.subdivisions || 4;

        const dx = pos2.x - pos1.x;
        const dy = pos2.y - pos1.y;
        const length = Math.hypot(dx, dy);
        const angle = Math.atan2(dy, dx);

        for (let i = 0; i < subdivisions; i++) {
            const offset = ((i - subdivisions / 2) / subdivisions) * 3;
            const perpX = Math.cos(angle + Math.PI / 2) * offset;
            const perpY = Math.sin(angle + Math.PI / 2) * offset;

            await canvas.drawLine2d(
                {x: pos1.x + perpX, y: pos1.y + perpY},
                {x: pos2.x + perpX, y: pos2.y + perpY},
                thickness * 0.5,
                colors.accentColor,
                0,
                null,
                ribbonIntensity * (1 - Math.abs(offset) / 3) * 0.3
            );
        }
    }

    /**
     * Render harmonic subdivisions along path (golden ratio based)
     * @private
     */
    async #renderHarmonicPathSubdivisions(canvas, pos1, pos2, subdivisions, colors) {
        const intensity = this.config.harmonicSubdivisions || 0.7;

        for (const sub of subdivisions) {
            const x = pos1.x + (pos2.x - pos1.x) * sub.position;
            const y = pos1.y + (pos2.y - pos1.y) * sub.position;

            await canvas.drawRing2d(
                {x, y},
                sub.thickness * 3,
                0.5,
                colors.glowColor,
                0,
                null,
                sub.intensity * intensity * 0.3
            );
        }
    }

    /**
     * Render thickness variation along path
     * @private
     */
    async #renderPathThicknessVariation(canvas, pos1, pos2, baseThickness, variations, colors) {
        const intensity = this.config.pathRibbonEffect || 0.6;

        for (let i = 0; i < variations.length - 1; i++) {
            const v1 = variations[i];
            const v2 = variations[i + 1];

            const x1 = pos1.x + (pos2.x - pos1.x) * v1.position;
            const y1 = pos1.y + (pos2.y - pos1.y) * v1.position;
            const x2 = pos1.x + (pos2.x - pos1.x) * v2.position;
            const y2 = pos1.y + (pos2.y - pos1.y) * v2.position;

            const thickness = baseThickness + v1.thickness * 2;
            await canvas.drawLine2d(
                {x: x1, y: y1},
                {x: x2, y: y2},
                thickness,
                colors.branchColor,
                0,
                null,
                v1.intensity * intensity * 0.4
            );
        }
    }

    /**
     * Render crosshatch pattern on paths
     * @private
     */
    async #renderPathCrosshatch(canvas, pos1, pos2, hatches, colors) {
        const intensity = this.config.crosshatchIntensity || 0.4;

        for (const hatch of hatches) {
            const baseX = pos1.x + (pos2.x - pos1.x) * hatch.position;
            const baseY = pos1.y + (pos2.y - pos1.y) * hatch.position;

            const hx1 = baseX + Math.cos(hatch.angle) * hatch.length / 2 + hatch.offset;
            const hy1 = baseY + Math.sin(hatch.angle) * hatch.length / 2 + hatch.offset;
            const hx2 = baseX - Math.cos(hatch.angle) * hatch.length / 2 + hatch.offset;
            const hy2 = baseY - Math.sin(hatch.angle) * hatch.length / 2 + hatch.offset;

            await canvas.drawLine2d(
                {x: hx1, y: hy1},
                {x: hx2, y: hy2},
                hatch.thickness,
                colors.accentColor,
                0,
                null,
                hatch.intensity * intensity * 0.3
            );
        }
    }

    /**
     * Render flowing geometric pattern along path
     * @private
     */
    async #renderPathFlowingPattern(canvas, pos1, pos2, flowPoints, colors) {
        for (const point of flowPoints) {
            const x = pos1.x + (pos2.x - pos1.x) * point.position;
            const y = pos1.y + (pos2.y - pos1.y) * point.position;

            let sides = 4; // diamond
            if (point.shape === 'triangle') sides = 3;
            if (point.shape === 'hexagon') sides = 6;

            await canvas.drawFilledPolygon2d(
                point.scale * 5,
                {x, y},
                sides,
                point.rotation,
                colors.glowColor,
                point.intensity * 0.3
            );
        }
    }

    /**
     * Generate Fibonacci spiral points
     * @private
     */
    #generateFibonacciSpiral(centerX, centerY, maxRadius, progress, rotation, spiralOffset) {
        const points = [];
        const fibonacciAngle = 2.39996; // Golden angle in radians (360° / golden ratio)
        const pointCount = 12;

        for (let i = 0; i < pointCount; i++) {
            const angle = i * fibonacciAngle + rotation * Math.PI / 180 + spiralOffset + progress * Math.PI * 2;
            const radius = (i / pointCount) * maxRadius;
            const x = centerX + Math.cos(angle) * radius;
            const y = centerY + Math.sin(angle) * radius;
            points.push({x, y});
        }

        return points;
    }

    /**
     * Render a mystic symbol on a Sephiroth node
     * @private
     */
    async #renderMysticSymbol(canvas, node, x, y, progress, phase, colors) {
        try {
            const symbol = this.mysticSymbolsEngine.getSymbol(node.id);
            if (!symbol) return;
            
            // Get phase-specific animation
            const animation = this.mysticSymbolsEngine.getPhaseAnimation(phase, progress, node.id);
            const colorShift = this.mysticSymbolsEngine.getColorShift(phase, progress, node.id);
            
            // Calculate symbol size and position
            const symbolRadius = (this.config.nodeSize || 20) * animation.scale;
            const symbolX = x;
            const symbolY = y;
            const symbolGlowSize = this.config.symbolGlowSize || 8;
            
            // Invert the node color for symbol contrast
            const invertedColor = this.#invertColor(node.color);
            
            // Draw symbol glow layer
            await canvas.drawRing2d(
                {x: symbolX, y: symbolY},
                symbolRadius + symbolGlowSize,
                2,
                invertedColor,
                0,
                null,
                animation.opacity * animation.glowIntensity * 0.5
            );
            
            // Render each path element in the symbol definition
            if (symbol.paths && Array.isArray(symbol.paths)) {
                for (const pathElement of symbol.paths) {
                    await this.#renderSymbolPath(
                        canvas,
                        pathElement,
                        symbolX,
                        symbolY,
                        symbolRadius,
                        animation,
                        { baseColor: invertedColor, glowColor: invertedColor }
                    );
                }
            }
        } catch (error) {
            console.warn('Warning rendering mystic symbol for node', node.id, ':', error.message);
        }
    }

    /**
     * Render a single path element from a symbol definition
     * Transforms normalized coordinates (0-1) to canvas space and applies animations
     * @private
     */
    async #renderSymbolPath(canvas, pathElement, centerX, centerY, radius, animation, colorShift) {
        try {
            // Helper: Transform normalized coordinates to canvas space
            const transform = (nx, ny) => {
                const rotX = nx * 2 - 1; // Convert 0-1 to -1 to 1
                const rotY = ny * 2 - 1;
                
                // Apply rotation
                const cos = Math.cos(animation.rotation);
                const sin = Math.sin(animation.rotation);
                const rotatedX = rotX * cos - rotY * sin;
                const rotatedY = rotX * sin + rotY * cos;
                
                // Convert to canvas coordinates (scaled and centered)
                return {
                    x: centerX + rotatedX * radius * animation.scale,
                    y: centerY + rotatedY * radius * animation.scale
                };
            };

            const opacity = animation.opacity * 0.8;
            const color = colorShift.baseColor;
            const lineWidth = 1.5;
            const outerStroke = 0.5;

            switch (pathElement.type) {
                case 'circle':
                    // Draw filled circle using high-resolution polygon (64 sides = smooth circle)
                    // For centered circles, use centerX/centerY directly (normalized coordinates 0.5, 0.5)
                    const circleRadius = pathElement.radius * radius * animation.scale;
                    await canvas.drawFilledPolygon2d(
                        circleRadius,
                        {x: centerX, y: centerY},
                        64,  // 64-sided polygon = smooth circle
                        0,   // start angle
                        color,
                        opacity
                    );
                    break;

                case 'polygon':
                    // Draw polygon from array of [x, y] pairs by connecting lines
                    if (pathElement.points && pathElement.points.length > 1) {
                        for (let i = 0; i < pathElement.points.length; i++) {
                            const p1 = transform(pathElement.points[i][0], pathElement.points[i][1]);
                            const p2 = transform(
                                pathElement.points[(i + 1) % pathElement.points.length][0],
                                pathElement.points[(i + 1) % pathElement.points.length][1]
                            );
                            await canvas.drawLine2d(
                                p1,
                                p2,
                                lineWidth,
                                color,
                                outerStroke,
                                color,
                                opacity
                            );
                        }
                    }
                    break;

                case 'path':
                    // Draw connected path from array of [x, y] pairs
                    if (pathElement.points && pathElement.points.length > 1) {
                        for (let i = 0; i < pathElement.points.length - 1; i++) {
                            const p1 = transform(pathElement.points[i][0], pathElement.points[i][1]);
                            const p2 = transform(pathElement.points[i + 1][0], pathElement.points[i + 1][1]);
                            await canvas.drawLine2d(
                                p1,
                                p2,
                                lineWidth,
                                color,
                                outerStroke,
                                color,
                                opacity
                            );
                        }
                    }
                    break;

                case 'line':
                    // Draw straight line
                    const p1 = transform(pathElement.x1, pathElement.y1);
                    const p2 = transform(pathElement.x2, pathElement.y2);
                    await canvas.drawLine2d(
                        p1,
                        p2,
                        lineWidth,
                        color,
                        outerStroke,
                        color,
                        opacity
                    );
                    break;

                case 'arc':
                    // Draw arc/circle outline as a ring (centered)
                    const arcRadius = pathElement.r * radius * animation.scale;
                    await canvas.drawRing2d(
                        {x: centerX, y: centerY},
                        arcRadius,
                        lineWidth,
                        color,
                        outerStroke,
                        color,
                        opacity
                    );
                    break;

                case 'rect':
                    // Draw rectangle using connected lines
                    const x = centerX + (pathElement.x - 0.5) * radius * 2 * animation.scale;
                    const y = centerY + (pathElement.y - 0.5) * radius * 2 * animation.scale;
                    const w = pathElement.width * radius * animation.scale;
                    const h = pathElement.height * radius * animation.scale;
                    
                    const corners = [
                        {x: x - w/2, y: y - h/2},
                        {x: x + w/2, y: y - h/2},
                        {x: x + w/2, y: y + h/2},
                        {x: x - w/2, y: y + h/2}
                    ];
                    
                    for (let i = 0; i < corners.length; i++) {
                        await canvas.drawLine2d(
                            corners[i],
                            corners[(i + 1) % corners.length],
                            lineWidth,
                            color,
                            outerStroke,
                            color,
                            opacity
                        );
                    }
                    break;

                default:
                    // Unsupported path type, skip silently
                    break;
            }
        } catch (error) {
            console.warn('Error rendering symbol path element:', error.message);
        }
    }

    /**
     * Invert a hex color for contrast
     * Converts #RRGGBB to inverted complementary color
     * @private
     */
    #invertColor(hexColor) {
        try {
            // Remove '#' if present
            let hex = hexColor.replace('#', '');
            
            // Pad with zeros if needed
            if (hex.length === 3) {
                hex = hex.split('').map(c => c + c).join('');
            }
            
            // Parse RGB components
            const r = parseInt(hex.substring(0, 2), 16);
            const g = parseInt(hex.substring(2, 4), 16);
            const b = parseInt(hex.substring(4, 6), 16);
            
            // Invert each channel
            const invR = (255 - r).toString(16).padStart(2, '0');
            const invG = (255 - g).toString(16).padStart(2, '0');
            const invB = (255 - b).toString(16).padStart(2, '0');
            
            return `#${invR}${invG}${invB}`.toUpperCase();
        } catch (error) {
            // Fallback to white if inversion fails
            return '#FFFFFF';
        }
    }
}