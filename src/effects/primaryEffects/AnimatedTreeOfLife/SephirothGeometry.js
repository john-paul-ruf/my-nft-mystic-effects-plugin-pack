/**
 * 10 Sephiroth nodes and 22 connecting paths for the Tree of Life
 */

export const SEPHIROTH_POSITIONS = {
  // Pillar arrangement: Pillar of Severity (left), Middle Pillar (center), Pillar of Mercy (right)
  
  kether: {
    id: 1,
    name: 'KETHER',
    meaning: 'Crown',
    x: 0.5,           // Normalized 0-1
    y: 0.08,
    color: '#FFFFFF',
    activation_order: { awakening: 10, ascension: 1 }  // Last to awaken, first to ascend
  },
  
  chokmah: {
    id: 2,
    name: 'CHOKMAH',
    meaning: 'Wisdom',
    x: 0.75,
    y: 0.22,
    color: '#0099FF',
    activation_order: { awakening: 9, ascension: 2 }
  },
  
  binah: {
    id: 3,
    name: 'BINAH',
    meaning: 'Understanding',
    x: 0.25,
    y: 0.22,
    color: '#FF00FF',
    activation_order: { awakening: 8, ascension: 3 }
  },
  
  chesed: {
    id: 4,
    name: 'CHESED',
    meaning: 'Mercy',
    x: 0.75,
    y: 0.42,
    color: '#0000FF',
    activation_order: { awakening: 6, ascension: 5 }
  },
  
  gevurah: {
    id: 5,
    name: 'GEVURAH',
    meaning: 'Severity',
    x: 0.25,
    y: 0.42,
    color: '#FF0000',
    activation_order: { awakening: 7, ascension: 4 }
  },
  
  tifereth: {
    id: 6,
    name: 'TIFERETH',
    meaning: 'Beauty',
    x: 0.5,
    y: 0.50,
    color: '#FFFF00',
    activation_order: { awakening: 3, ascension: 6 }  // Central balance point
  },
  
  netzach: {
    id: 7,
    name: 'NETZACH',
    meaning: 'Victory',
    x: 0.75,
    y: 0.65,
    color: '#00FF00',
    activation_order: { awakening: 4, ascension: 7 }
  },
  
  hod: {
    id: 8,
    name: 'HOD',
    meaning: 'Splendor',
    x: 0.25,
    y: 0.65,
    color: '#FFFF00',
    activation_order: { awakening: 5, ascension: 8 }
  },
  
  yesod: {
    id: 9,
    name: 'YESOD',
    meaning: 'Foundation',
    x: 0.5,
    y: 0.80,
    color: '#9999FF',
    activation_order: { awakening: 2, ascension: 9 }
  },
  
  malkuth: {
    id: 10,
    name: 'MALKUTH',
    meaning: 'Kingdom',
    x: 0.5,
    y: 0.95,
    color: '#FFAA00',
    activation_order: { awakening: 1, ascension: 10 }  // First to awaken (rising from earth)
  }
};

export const PATHS_CONNECTIONS = [
  // 22 sacred paths connecting nodes (Hermetic order)
  // Upper Triangle (Kether - Chokmah - Binah)
  { id: 1,  start: 1,  end: 2,  letter: 'Aleph',     order: 1 },   // Kether → Chokmah
  { id: 2,  start: 1,  end: 3,  letter: 'Beth',      order: 2 },   // Kether → Binah
  { id: 3,  start: 2,  end: 3,  letter: 'Gimel',     order: 3 },   // Chokmah ↔ Binah
  
  // Upper Middle (Chokmah/Binah → Chesed/Gevurah)
  { id: 4,  start: 2,  end: 4,  letter: 'Daleth',    order: 4 },   // Chokmah → Chesed
  { id: 5,  start: 3,  end: 5,  letter: 'He',        order: 5 },   // Binah → Gevurah
  { id: 6,  start: 4,  end: 5,  letter: 'Vav',       order: 6 },   // Chesed ↔ Gevurah
  
  // Middle Triangle (Chesed - Gevurah - Tifereth)
  { id: 7,  start: 4,  end: 6,  letter: 'Zayin',     order: 7 },   // Chesed → Tifereth
  { id: 8,  start: 5,  end: 6,  letter: 'Cheth',     order: 8 },   // Gevurah → Tifereth
  
  // Lower Middle (Tifereth → Netzach/Hod)
  { id: 9,  start: 6,  end: 7,  letter: 'Teth',      order: 9 },   // Tifereth → Netzach
  { id: 10, start: 6,  end: 8,  letter: 'Yodh',      order: 10 },  // Tifereth → Hod
  
  // Lower Triangle (Chesed/Gevurah → Netzach/Hod)
  { id: 11, start: 4,  end: 7,  letter: 'Kaph',      order: 11 },  // Chesed → Netzach
  { id: 12, start: 5,  end: 8,  letter: 'Lamed',     order: 12 },  // Gevurah → Hod
  { id: 13, start: 7,  end: 8,  letter: 'Mem',       order: 13 },  // Netzach ↔ Hod
  
  // Lower Middle (Netzach/Hod ↔ Yesod)
  { id: 14, start: 7,  end: 9,  letter: 'Nun',       order: 14 },  // Netzach → Yesod
  { id: 15, start: 8,  end: 9,  letter: 'Samekh',    order: 15 },  // Hod → Yesod
  
  // Middle Pillar (Tifereth → Yesod)
  { id: 16, start: 6,  end: 9,  letter: 'Ayin',      order: 16 },  // Tifereth → Yesod
  
  // Foundation connections (Yesod ↔ Malkuth)
  { id: 17, start: 9,  end: 10, letter: 'Pe',        order: 17 },  // Yesod → Malkuth
  
  // Triple links (crossing paths)
  { id: 18, start: 2,  end: 5,  letter: 'Tsade',     order: 18 },  // Chokmah → Gevurah (cross)
  { id: 19, start: 3,  end: 4,  letter: 'Qoph',      order: 19 },  // Binah → Chesed (cross)
  { id: 20, start: 4,  end: 8,  letter: 'Resh',      order: 20 },  // Chesed → Hod (lower cross)
  { id: 21, start: 5,  end: 7,  letter: 'Shin',      order: 21 },  // Gevurah → Netzach (lower cross)
  { id: 22, start: 1,  end: 6,  letter: 'Tav',       order: 22 },  // Kether → Tifereth (middle pillar direct)
];

export function getNodeByName(name) {
  return SEPHIROTH_POSITIONS[name.toLowerCase()];
}

export function getNodeById(id) {
  return Object.values(SEPHIROTH_POSITIONS).find(n => n.id === id);
}

export function getNodeActivationOrder(phaseName) {
  const nodes = Object.values(SEPHIROTH_POSITIONS);
  return nodes.sort((a, b) => 
    (a.activation_order[phaseName] || 999) - (b.activation_order[phaseName] || 999)
  );
}