export const planetaryActivities = {
  Sun: {
    qualities: 'The hour of kings and ambition. Solar light reveals all things hidden. Authority flows freely.',
    favorable: [
      'Post on social media', 
      'Send that important email', 
      'Request a raise or promotion',
      'Wear gold or yellow',
      'Stand in sunlight and make a wish',
      'Sign contracts that elevate your status'
    ],
    avoid: [
      'Hiding from responsibility', 
      'Self-doubt and diminishment',
      'Working in darkness',
      'Submissive behavior'
    ],
    examples: 'Claim your power, seek visibility, lead boldly'
  },
  Moon: {
    qualities: 'The hour of dreams and secret knowledge. The veil between worlds grows thin. Mysteries reveal themselves.',
    favorable: [
      'Take a nap or meditate', 
      'Journal your dreams', 
      'Scry in water or mirrors',
      'Speak to your ancestors',
      'Plant seeds (literal or metaphorical)',
      'Visit places near water'
    ],
    avoid: [
      'Harsh confrontations', 
      'Forcing logical solutions',
      'Ignoring your intuition',
      'Staying in artificial light'
    ],
    examples: 'Trust the unseen, honor your feelings, receive visions'
  },
  Mars: {
    qualities: 'The hour of warriors and victory. Courage surges through the blood. Obstacles yield to force.',
    favorable: [
      'Work out intensely', 
      'Tackle your hardest task', 
      'Have the difficult conversation',
      'Cut cords with what drains you',
      'Sharpen blades (literal or metaphorical)',
      'Defend your boundaries fiercely'
    ],
    avoid: [
      'Passive acceptance', 
      'Diplomatic compromise',
      'Soft negotiations',
      'Avoiding conflict'
    ],
    examples: 'Strike while iron is hot, conquer fear, take bold action'
  },
  Mercury: {
    qualities: 'The hour of messengers and crossroads. Words travel fast and far. The mind dances with possibility.',
    favorable: [
      'Write emails rapidly', 
      'Learn something new quickly', 
      'Make important calls',
      'Study sacred texts or codes',
      'Leave offerings at crossroads',
      'Reorganize your files and thoughts'
    ],
    avoid: [
      'Slow methodical tasks', 
      'Emotional processing',
      'Committing too soon',
      'Staying still'
    ],
    examples: 'Move information, connect dots, speak your truth swiftly'
  },
  Jupiter: {
    qualities: 'The hour of kings and expansion. Fortune favors the bold. What you seek seeks you.',
    favorable: [
      'Apply for opportunities', 
      'Make investment decisions', 
      'Network with influential people',
      'Tithe or donate generously',
      'Wear purple or royal blue',
      'Ask for what seems impossible'
    ],
    avoid: [
      'Small thinking', 
      'Penny-pinching',
      'Humble settling',
      'Cynical doubt'
    ],
    examples: 'Think abundantly, claim your throne, expect miracles'
  },
  Venus: {
    qualities: 'The hour of beauty and reconciliation. Love softens all hardness. Pleasure is sacred.',
    favorable: [
      'Text someone you love', 
      'Create art or music', 
      'Wear something beautiful',
      'Offer roses or copper',
      'Dance or move sensuously',
      'Forgive and seek forgiveness'
    ],
    avoid: [
      'Harsh words', 
      'Austere denial',
      'Financial aggression',
      'Ugliness of any kind'
    ],
    examples: 'Choose beauty, mend bridges, indulge wisely, create harmony'
  },
  Saturn: {
    qualities: 'The hour of elders and endings. Time reveals all debts. Discipline bears fruit slowly.',
    favorable: [
      'Organize ruthlessly', 
      'Review your finances', 
      'Study difficult subjects',
      'Honor your ancestors',
      'Release what no longer serves',
      'Build structures meant to last'
    ],
    avoid: [
      'Impulsive pleasure', 
      'Shortcuts and hacks',
      'Avoiding responsibility',
      'Wishful thinking'
    ],
    examples: 'Face reality, pay your dues, build for eternity, prune dead wood'
  }
};

export const planetToNumberMap = {
  'Sun': 1,
  'Moon': 2,
  'Jupiter': 3,
  'Mercury': 5,
  'Venus': 6,
  'Saturn': 8,
  'Mars': 9
};

export const getPlanetaryActivities = (planet) => {
  return planetaryActivities[planet] || { qualities: '', favorable: [], avoid: [], examples: '' };
};

export const planetToNumber = (planet) => {
  return planetToNumberMap[planet] || 1;
};
