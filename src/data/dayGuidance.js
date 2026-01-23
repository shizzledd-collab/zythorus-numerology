export const dayEnergyGuidance = {
  1: "A day for new beginnings, leadership, and independent action. Take initiative on important matters. Your willpower is strong. Avoid being too domineering. Best for: starting projects, making decisions, asserting yourself.",
  2: "A day for diplomacy, partnerships, and intuition. Work with others rather than alone. Your sensitivity is heightened. Avoid being oversensitive or indecisive. Best for: collaborations, negotiations, relationships, artistic work.",
  3: "A day for ambition, discipline, and authority. Organize, plan, and take control of situations. Your conscientiousness shines. Avoid being dictatorial. Best for: business matters, seeking promotions, establishing order, government affairs.",
  4: "A day of unexpected changes and unconventional thinking. Expect the unusual. Your originality emerges. People may oppose your views. Best for: reforms, innovative ideas, breaking from tradition. Avoid: forcing your views on others.",
  5: "A day for quick thinking, speculation, and versatility. Take calculated risks. Your mental agility is sharp. Nervous energy is high. Best for: business deals, communication, travel, new ventures. Avoid: overextending yourself nervously.",
  6: "A day for love, beauty, art, and harmony. Your magnetism is strong. Create beauty around you. Avoid discord and jealousy. Best for: relationships, artistic pursuits, entertaining, making your home beautiful, social gatherings.",
  7: "A day for spirituality, intuition, and philosophical thought. Trust your dreams and inner voice. Your psychic abilities are heightened. Best for: occult studies, creative writing, travel planning, charitable work. Avoid: material concerns.",
  8: "A day of FATE and KARMA. Cheiro warns: this is serious. Deal with practical matters, financial decisions, contracts, legal issues. Actions today have LASTING consequences. Discipline and integrity are tested. Shortcuts backfire. Authority figures appear. Best for: long-term planning, business negotiations, facing responsibilities. Avoid: greed, manipulation, avoiding duties. Remember: 'Eight governs power, and power reveals character.'",
  9: "**9 is the number of COMPLETION** — the final step in the cycle.\n\n**WHAT TO DO:** Wrap up unfinished business. **Finish projects**, not start them. Help others. Reflect and let go of what no longer serves you. Your warrior courage is best used for **COMPLETING battles**, not beginning new ones.\n\n**STRENGTHS TODAY:** Courage, determination, humanitarian spirit, spiritual insights, **finishing power**.\n\n**WATCH OUT:** Impulsiveness, accidents (especially fire), starting new ventures (bad timing), unnecessary fights, scattered focus.\n\n**REMEMBER:** This is an **ending day**, not a beginning day. Complete, reflect, serve."
};

export const getDayEnergyGuidance = (todayNumber) => {
  return dayEnergyGuidance[todayNumber] || "A day of unique energies. Pay attention to patterns and synchronicities.";
};
