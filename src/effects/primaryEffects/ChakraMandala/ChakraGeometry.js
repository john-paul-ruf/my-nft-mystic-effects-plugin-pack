/**
 * Chakra Mandala Geometry
 * 
 * Defines the 7-chakra energy system geometry:
 * - Root (Muladhara)
 * - Sacral (Svadhisthana)
 * - Solar Plexus (Manipura)
 * - Heart (Anahata)
 * - Throat (Vishuddha)
 * - Third Eye (Ajna)
 * - Crown (Sahasrara)
 * 
 * Each chakra is positioned vertically along the central axis (sushumna nadi)
 * with mandala rings for visualization of energy flow.
 */

/**
 * Root (Muladhara) - Foundation, stability, survival
 * Located at base of spine
 * Color: Red
 * Element: Earth
 */
const MULADHARA = {
  id: 'muladhara',
  name: 'Root (Muladhara)',
  index: 0,
  x: 0.5,          // Center horizontally
  y: 0.85,         // Bottom of canvas
  radius: 25,
  color: '#e74c3c', // Deep red
  glowColor: '#c0392b',
  frequency: 228,  // Hz (approximate)
};

/**
 * Sacral (Svadhisthana) - Creativity, sexuality, pleasure
 * Located below navel
 * Color: Orange
 * Element: Water
 */
const SVADHISTHANA = {
  id: 'svadhisthana',
  name: 'Sacral (Svadhisthana)',
  index: 1,
  x: 0.5,
  y: 0.72,
  radius: 24,
  color: '#f39c12', // Orange
  glowColor: '#d68910',
  frequency: 303,
};

/**
 * Solar Plexus (Manipura) - Personal power, will, transformation
 * Located at solar plexus
 * Color: Yellow
 * Element: Fire
 */
const MANIPURA = {
  id: 'manipura',
  name: 'Solar Plexus (Manipura)',
  index: 2,
  x: 0.5,
  y: 0.59,
  radius: 24,
  color: '#f1c40f', // Golden yellow
  glowColor: '#d4af37',
  frequency: 384,
};

/**
 * Heart (Anahata) - Love, compassion, connection
 * Located at heart center
 * Color: Green/Pink
 * Element: Air
 */
const ANAHATA = {
  id: 'anahata',
  name: 'Heart (Anahata)',
  index: 3,
  x: 0.5,
  y: 0.5,   // Center vertically (heart of the mandala)
  radius: 26,
  color: '#2ecc71', // Emerald green
  glowColor: '#27ae60',
  frequency: 341, // Hz
};

/**
 * Throat (Vishuddha) - Communication, truth, expression
 * Located at throat
 * Color: Blue
 * Element: Sound/Ether
 */
const VISHUDDHA = {
  id: 'vishuddha',
  name: 'Throat (Vishuddha)',
  index: 4,
  x: 0.5,
  y: 0.41,
  radius: 23,
  color: '#3498db', // Bright blue
  glowColor: '#2980b9',
  frequency: 384,
};

/**
 * Third Eye (Ajna) - Intuition, wisdom, inner vision
 * Located between eyebrows
 * Color: Indigo
 * Element: Light
 */
const AJNA = {
  id: 'ajna',
  name: 'Third Eye (Ajna)',
  index: 5,
  x: 0.5,
  y: 0.28,
  radius: 22,
  color: '#9b59b6', // Deep purple/indigo
  glowColor: '#8e44ad',
  frequency: 426,
};

/**
 * Crown (Sahasrara) - Enlightenment, spiritual connection, unity
 * Located at crown of head
 * Color: Violet/White
 * Element: Thought
 */
const SAHASRARA = {
  id: 'sahasrara',
  name: 'Crown (Sahasrara)',
  index: 6,
  x: 0.5,
  y: 0.15,
  radius: 24,
  color: '#e91e63', // Violet-pink
  glowColor: '#c2185b',
  frequency: 432, // Hz (Schumann resonance)
};

/**
 * All chakras ordered from root to crown (ascending kundalini)
 */
export const CHAKRA_POSITIONS = {
  muladhara: MULADHARA,
  svadhisthana: SVADHISTHANA,
  manipura: MANIPURA,
  anahata: ANAHATA,
  vishuddha: VISHUDDHA,
  ajna: AJNA,
  sahasrara: SAHASRARA,
};

/**
 * Mandala ring connections (energy flow patterns)
 * Each chakra is connected to adjacent chakras via the sushumna nadi (central channel)
 */
export const CHAKRA_CONNECTIONS = [
  // Ascending path (kundalini rising)
  { start: 'muladhara', end: 'svadhisthana' },
  { start: 'svadhisthana', end: 'manipura' },
  { start: 'manipura', end: 'anahata' },
  { start: 'anahata', end: 'vishuddha' },
  { start: 'vishuddha', end: 'ajna' },
  { start: 'ajna', end: 'sahasrara' },
];

/**
 * Inner mandala rings for visualization
 * Creates resonance patterns around each chakra
 */
export const MANDALA_RING_RADII = [
  0.15,  // Inner ring
  0.30,  // Middle ring
  0.45,  // Outer ring
];

/**
 * Get chakra by name
 * @param {string} name - Chakra name (e.g., 'muladhara')
 * @returns {Object} Chakra configuration
 */
export function getChakraByName(name) {
  return CHAKRA_POSITIONS[name];
}

/**
 * Get chakra by index (0-6)
 * @param {number} index - Chakra index
 * @returns {Object} Chakra configuration
 */
export function getChakraByIndex(index) {
  return Object.values(CHAKRA_POSITIONS)[index];
}

/**
 * Get kundalini activation order (root to crown)
 * @returns {Array} Array of chakra objects in activation order
 */
export function getKundaliniActivationOrder() {
  return Object.values(CHAKRA_POSITIONS);
}

/**
 * Get all chakra positions as array
 * @returns {Array} Array of chakra configuration objects
 */
export function getAllChakraPositions() {
  return Object.values(CHAKRA_POSITIONS);
}