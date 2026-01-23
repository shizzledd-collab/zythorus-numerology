import React, { useState, useEffect } from 'react';
import { User, Users, Heart, Calendar, Hash, Sparkles, Home, ShoppingBag, BookOpen, Clock, MapPin, TrendingUp, Settings } from 'lucide-react';
import Card from './Card';
import NumberProfileCard from './NumberProfileCard';
import { STYLES } from './styles';
import { useLocalStorageSync } from './useLocalStorage';
import { numberProfiles } from './data/numberProfiles';
import { compatibilityMatrix } from './data/compatibilityMatrix';
import { getPlanetaryActivities, planetToNumber } from './data/planetaryData';
import { getDayEnergyGuidance } from './data/dayGuidance';

const NumerologyApp = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [expandedNumber, setExpandedNumber] = useState(null);
  const [profiles, setProfiles] = useState(() => {
    const saved = localStorage.getItem('numerology_profiles');
    return saved ? JSON.parse(saved) : [];
  });
  const [currentProfileIndex, setCurrentProfileIndex] = useState(() => {
    const saved = localStorage.getItem('numerology_currentProfileIndex');
    return saved ? parseInt(saved) : 0;
  });
  const [isPremium, setIsPremium] = useState(() => {
    const saved = localStorage.getItem('numerology_isPremium');
    return saved === 'true';
  });
  const [showNotificationPrompt, setShowNotificationPrompt] = useState(true);
  const [showAddProfile, setShowAddProfile] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [editName, setEditName] = useState('');
  const [editBirthDate, setEditBirthDate] = useState('');
  const [dailyMessage, setDailyMessage] = useState('');
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [learnSection, setLearnSection] = useState('meanings');
  const [friends, setFriends] = useState(() => {
    const saved = localStorage.getItem('numerology_friends');
    return saved ? JSON.parse(saved) : [];
  });
  const [compatibilityPartner, setCompatibilityPartner] = useState(null);
  const [analysis, setAnalysis] = useState(null);
  const [selectedFriend, setSelectedFriend] = useState(null);
  const [showAddFriend, setShowAddFriend] = useState(false);
  const [shareMessage, setShareMessage] = useState(''); // For share feedback
  const [formData, setFormData] = useState({
    name: '',
    birthDay: '',
    birthMonth: '',
    birthYear: '',
    relationship: ''
  });
  const [editingFriend, setEditingFriend] = useState(null); // For edit mode
  const [showLocationPrompt, setShowLocationPrompt] = useState(false);
  const [showLocationForm, setShowLocationForm] = useState(false);
  const [locationInput, setLocationInput] = useState('');
  const [isGeolocating, setIsGeolocating] = useState(false);
  const [friendsViewMode, setFriendsViewMode] = useState('orbit'); // 'orbit' or 'network'

  const [collapsedSections, setCollapsedSections] = useState({
    meanings: false,
    types: false,
    master: false,
    systems: false
  });

  // Calculator state
  const [calcMethod, setCalcMethod] = useState('chaldean');
  const [calcMonth, setCalcMonth] = useState('');
  const [calcDay, setCalcDay] = useState('');
  const [calcYear, setCalcYear] = useState('');
  const [calcName, setCalcName] = useState('');
  const [activeField, setActiveField] = useState('month');
  const [calcResult, setCalcResult] = useState(null);

  const currentUser = profiles[currentProfileIndex] || null;

  // Save to localStorage whenever data changes
  useLocalStorageSync('numerology_profiles', profiles);
  useLocalStorageSync('numerology_friends', friends);
  useLocalStorageSync('numerology_currentProfileIndex', currentProfileIndex.toString());
  useLocalStorageSync('numerology_isPremium', isPremium.toString());

  // Organic Blob Background Component
  const OrganicBackground = () => {
    const [particles] = React.useState(() => 
      Array.from({ length: 50 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 3 + 1,
        duration: Math.random() * 20 + 15,
        delay: Math.random() * 5,
        opacity: Math.random() * 0.4 + 0.1
      }))
    );

    return (
      <div className="absolute inset-0" style={{
        background: 'linear-gradient(180deg, #1e1b3c 0%, #14112b 50%, #0a0816 100%)',
      }}>
        {/* Floating organic blobs - Deep space colors */}
        <div className="absolute top-20 left-10 w-64 h-64 rounded-full opacity-30 blur-3xl animate-float"
          style={{
            background: 'radial-gradient(circle, rgba(124, 58, 237, 0.4) 0%, rgba(139, 92, 246, 0.3) 50%, transparent 100%)',
            animation: 'float 20s ease-in-out infinite'
          }}
        />
        <div className="absolute top-40 right-20 w-80 h-80 rounded-full opacity-25 blur-3xl"
          style={{
            background: 'radial-gradient(circle, rgba(91, 110, 255, 0.3) 0%, rgba(124, 58, 237, 0.2) 50%, transparent 100%)',
            animation: 'float 25s ease-in-out infinite 5s'
          }}
        />
        <div className="absolute bottom-32 left-1/4 w-72 h-72 rounded-full opacity-30 blur-3xl"
          style={{
            background: 'radial-gradient(circle, rgba(139, 92, 246, 0.3) 0%, rgba(91, 110, 255, 0.2) 50%, transparent 100%)',
            animation: 'float 22s ease-in-out infinite 10s'
          }}
        />
        <div className="absolute bottom-20 right-1/3 w-96 h-96 rounded-full opacity-20 blur-3xl"
          style={{
            background: 'radial-gradient(circle, rgba(124, 58, 237, 0.25) 0%, rgba(91, 110, 255, 0.15) 50%, transparent 100%)',
            animation: 'float 18s ease-in-out infinite 3s'
          }}
        />

        {/* Futuristic Particle Field - Purple/blue particles */}
        {particles.map(particle => (
          <div
            key={particle.id}
            className="absolute rounded-full pointer-events-none"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              background: `radial-gradient(circle, rgba(255, 255, 255, ${particle.opacity}) 0%, rgba(124, 58, 237, ${particle.opacity * 0.5}) 100%)`,
              boxShadow: `0 0 ${particle.size * 2}px rgba(124, 58, 237, ${particle.opacity})`,
              animation: `particleFloat ${particle.duration}s ease-in-out infinite ${particle.delay}s`,
            }}
          />
        ))}
        
        <style>{`
          @keyframes float {
            0%, 100% { transform: translate(0, 0) scale(1); }
            25% { transform: translate(20px, -20px) scale(1.05); }
            50% { transform: translate(-10px, 15px) scale(0.95); }
            75% { transform: translate(15px, 10px) scale(1.02); }
          }
          @keyframes particleFloat {
            0%, 100% { transform: translate(0, 0); opacity: 0.1; }
            25% { transform: translate(30px, -40px); opacity: 0.3; }
            50% { transform: translate(-20px, 60px); opacity: 0.6; }
            75% { transform: translate(40px, 20px); opacity: 0.2; }
          }
        `}</style>
      </div>
    );
  };

  // Radial Network Graph - Static with Color Coding
  const NetworkGraph = ({ friends, currentUser }) => {
    const canvasRef = React.useRef(null);
    const [hoveredNode, setHoveredNode] = React.useState(null);

    // Color palette for each Life Path number (1-9, 11, 22, 33)
    const getNumberColor = (number) => {
      const colors = {
        1: { light: '#ef4444', dark: '#dc2626' }, // Red
        2: { light: '#f97316', dark: '#ea580c' }, // Orange
        3: { light: '#eab308', dark: '#ca8a04' }, // Yellow
        4: { light: '#22c55e', dark: '#16a34a' }, // Green
        5: { light: '#06b6d4', dark: '#0891b2' }, // Cyan
        6: { light: '#3b82f6', dark: '#2563eb' }, // Blue
        7: { light: '#8b5cf6', dark: '#7c3aed' }, // Purple
        8: { light: '#ec4899', dark: '#db2777' }, // Pink
        9: { light: '#a855f7', dark: '#9333ea' }, // Violet
        11: { light: '#fbbf24', dark: '#f59e0b' }, // Gold
        22: { light: '#10b981', dark: '#059669' }, // Emerald
        33: { light: '#06b6d4', dark: '#0e7490' }  // Teal
      };
      return colors[number] || colors[1];
    };

    // Draw once when friends change
    React.useEffect(() => {
      if (!canvasRef.current || !friends.length) return;

      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      
      // Clear
      ctx.clearRect(0, 0, 400, 400);

      const centerX = 200;
      const centerY = 200;

      // Draw grid circles
      [60, 120, 180].forEach((radius, i) => {
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(91, 110, 255, ${0.12 - i * 0.02})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      });

      // Draw radial lines
      for (let i = 0; i < 12; i++) {
        const angle = (i * 30 * Math.PI) / 180;
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(
          centerX + Math.cos(angle) * 180,
          centerY + Math.sin(angle) * 180
        );
        ctx.strokeStyle = 'rgba(91, 110, 255, 0.08)';
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }

      // Draw friends
      friends.forEach((friend) => {
        const compat = getCompatibilityAnalysis(currentUser.lifePathNumber, friend.lifePathNumber);
        const distance = 180 - (compat.score / 100) * 120;
        const angle = (friend.lifePathNumber / 9) * 360 * Math.PI / 180;
        
        const x = centerX + Math.cos(angle) * distance;
        const y = centerY + Math.sin(angle) * distance;

        const colors = getNumberColor(friend.lifePathNumber);
        const isMasterNumber = [11, 22, 33].includes(friend.lifePathNumber);

        // Connection line - bolder and whiter with glow
        const gradient = ctx.createLinearGradient(centerX, centerY, x, y);
        gradient.addColorStop(0, 'rgba(255, 255, 255, 0.6)'); // Brighter white center
        gradient.addColorStop(0.5, `${colors.light}66`); // Color in middle
        gradient.addColorStop(1, 'transparent');

        // Draw glow layer first
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(x, y);
        ctx.strokeStyle = gradient;
        ctx.lineWidth = hoveredNode === friend.id ? 5 : 3.5;
        ctx.filter = 'blur(2px)';
        ctx.stroke();
        ctx.filter = 'none';

        // Draw solid line on top
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(x, y);
        ctx.strokeStyle = gradient;
        ctx.lineWidth = hoveredNode === friend.id ? 2.5 : 2;
        ctx.stroke();

        // Node
        const isHovered = hoveredNode === friend.id;
        const radius = isHovered ? 14 : 12;

        // Master number halo (before everything else)
        if (isMasterNumber) {
          // Outer spinning halo
          const haloGradient = ctx.createRadialGradient(x, y, radius + 3, x, y, radius + 12);
          haloGradient.addColorStop(0, `${colors.light}99`);
          haloGradient.addColorStop(0.5, `${colors.light}44`);
          haloGradient.addColorStop(1, 'transparent');
          ctx.strokeStyle = haloGradient;
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.arc(x, y, radius + 7, 0, Math.PI * 2);
          ctx.stroke();

          // Inner glow ring
          ctx.strokeStyle = `${colors.light}66`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.arc(x, y, radius + 4, 0, Math.PI * 2);
          ctx.stroke();
        }

        // Glow on hover
        if (isHovered) {
          const glow = ctx.createRadialGradient(x, y, 0, x, y, radius + 10);
          glow.addColorStop(0, `${colors.light}66`);
          glow.addColorStop(1, 'transparent');
          ctx.fillStyle = glow;
          ctx.beginPath();
          ctx.arc(x, y, radius + 10, 0, Math.PI * 2);
          ctx.fill();
        }

        // Node gradient with number color
        const nodeGrad = ctx.createRadialGradient(x - 4, y - 4, 0, x, y, radius);
        nodeGrad.addColorStop(0, colors.light);
        nodeGrad.addColorStop(1, colors.dark);

        ctx.fillStyle = nodeGrad;
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fill();

        ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
        ctx.lineWidth = 2;
        ctx.stroke();

        // Number
        ctx.fillStyle = '#ffffff';
        ctx.font = `bold ${isHovered ? 12 : 11}px Space Grotesk`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(friend.lifePathNumber, x, y);

        // Name on hover
        if (isHovered) {
          ctx.font = 'bold 11px Space Grotesk';
          ctx.strokeStyle = 'rgba(0, 0, 0, 0.9)';
          ctx.lineWidth = 4;
          const name = friend.name.split(' ')[0];
          ctx.strokeText(name, x, y - radius - 12);
          ctx.fillStyle = '#ffffff';
          ctx.fillText(name, x, y - radius - 12);
        }
      });

      // Draw YOU in center
      const userColors = getNumberColor(currentUser.lifePathNumber);
      
      const centerGlow = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, 40);
      centerGlow.addColorStop(0, `${userColors.light}40`);
      centerGlow.addColorStop(1, 'transparent');
      ctx.fillStyle = centerGlow;
      ctx.beginPath();
      ctx.arc(centerX, centerY, 40, 0, Math.PI * 2);
      ctx.fill();

      const centerGrad = ctx.createRadialGradient(centerX - 10, centerY - 10, 0, centerX, centerY, 32);
      centerGrad.addColorStop(0, userColors.light);
      centerGrad.addColorStop(1, userColors.dark);
      ctx.fillStyle = centerGrad;
      ctx.beginPath();
      ctx.arc(centerX, centerY, 32, 0, Math.PI * 2);
      ctx.fill();

      ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
      ctx.lineWidth = 2.5;
      ctx.stroke();

      // "YOU" text
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 14px Space Grotesk';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('YOU', centerX, centerY - 8);
      
      // Number below
      ctx.font = 'bold 20px Space Grotesk';
      ctx.fillText(currentUser.lifePathNumber, centerX, centerY + 10);

    }, [friends, currentUser, hoveredNode]);

    const handleMouseMove = (e) => {
      const rect = canvasRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = 200;
      const centerY = 200;

      let found = null;
      friends.forEach(friend => {
        const compat = getCompatibilityAnalysis(currentUser.lifePathNumber, friend.lifePathNumber);
        const distance = 180 - (compat.score / 100) * 120;
        const angle = (friend.lifePathNumber / 9) * 360 * Math.PI / 180;
        
        const nodeX = centerX + Math.cos(angle) * distance;
        const nodeY = centerY + Math.sin(angle) * distance;

        const dist = Math.sqrt((x - nodeX) ** 2 + (y - nodeY) ** 2);
        if (dist < 14) found = friend.id;
      });

      setHoveredNode(found);
    };

    const handleClick = () => {
      if (hoveredNode) {
        const friend = friends.find(f => f.id === hoveredNode);
        if (friend) setSelectedFriend(friend);
      }
    };

    return (
      <div className="relative mx-auto" style={{ width: '400px', height: '400px' }}>
        <canvas
          ref={canvasRef}
          width={400}
          height={400}
          onMouseMove={handleMouseMove}
          onClick={handleClick}
          style={{ cursor: hoveredNode ? 'pointer' : 'default' }}
        />
      </div>
    );
  };

  useEffect(() => {
    generateDailyMessage();
    const style = document.createElement('style');
    style.textContent = `
      @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600;700&display=swap');
      
      /* Base font - Inter for body text */
      * { 
        font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
      }
      
      /* Space Grotesk for headers, numbers, buttons - FUTURISTIC */
      h1, h2, h3, h4, h5, h6,
      .number-display,
      button,
      .tab-label {
        font-family: 'Space Grotesk', 'Inter', sans-serif;
        letter-spacing: -0.02em;
      }
      
      /* Numbers get extra sharp styling */
      .number-badge,
      input[type="number"],
      .numeric {
        font-family: 'Space Grotesk', monospace;
        font-weight: 600;
        letter-spacing: -0.03em;
      }
      
      .brand-logo {
        font-family: 'Space Grotesk', sans-serif;
        font-weight: 300;
        letter-spacing: 0.1em;
        text-transform: lowercase;
      }

      /* Smooth tab transition animations */
      @keyframes fadeInUp {
        from {
          opacity: 0;
          transform: translateY(20px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      .tab-content {
        animation: fadeInUp 0.4s ease-out;
      }
    `;
    document.head.appendChild(style);
  }, []);

  const generateDailyMessage = () => {
    const messages = [
      "Numbers are the divine architecture of existence.",
      "Your numbers bridge the physical and eternal.",
      "The universe speaks in the language of numbers.",
      "Numbers are pure thought made manifest.",
      "What is unchanging reveals what is true.",
      "The cosmos is structured through numerical principles.",
      "Numbers carry the energy of creation itself.",
      "Your path is encoded in eternal patterns.",
      "Abstract truths guide material existence.",
      "Numbers are the mind of the universe expressed."
    ];
    setDailyMessage(messages[Math.floor(Math.random() * messages.length)]);
  };

  const getNameNumber = (name) => {
    const chaldeanValues = {
      A: 1, I: 1, J: 1, Q: 1, Y: 1,
      B: 2, K: 2, R: 2,
      C: 3, G: 3, L: 3, S: 3,
      D: 4, M: 4, T: 4,
      E: 5, H: 5, N: 5, X: 5,
      U: 6, V: 6, W: 6,
      O: 7, Z: 7,
      F: 8, P: 8
    };

    const cleanName = name.toUpperCase().replace(/[^A-Z]/g, '');
    let sum = 0;
    
    for (let char of cleanName) {
      sum += chaldeanValues[char] || 0;
    }
    
    while (sum > 9 && sum !== 11 && sum !== 22 && sum !== 33) {
      sum = sum.toString().split('').reduce((a, b) => parseInt(a) + parseInt(b), 0);
    }
    
    return sum;
  };

  const getBirthNumber = (day) => {
    let num = parseInt(day);
    while (num > 9 && num !== 11 && num !== 22) {
      num = num.toString().split('').reduce((a, b) => parseInt(a) + parseInt(b), 0);
    }
    return num;
  };

  const getLifePathNumber = (day, month, year) => {
    let sum = parseInt(day) + parseInt(month) + parseInt(year);
    while (sum > 9 && sum !== 11 && sum !== 22 && sum !== 33) {
      sum = sum.toString().split('').reduce((a, b) => parseInt(a) + parseInt(b), 0);
    }
    return sum;
  };

  const getTodayNumber = () => {
    const today = new Date();
    const day = today.getDate();
    const month = today.getMonth() + 1;
      9: "**9 is the number of COMPLETION** — the final step in the cycle.\n\n**WHAT TO DO:** Wrap up unfinished business. **Finish projects**, not start them. Help others. Reflect and let go of what no longer serves you. Your warrior courage is best used for **COMPLETING battles**, not beginning new ones.\n\n**STRENGTHS TODAY:** Courage, determination, humanitarian spirit, spiritual insights, **finishing power**.\n\n**WATCH OUT:** Impulsiveness, accidents (especially fire), starting new ventures (bad timing), unnecessary fights, scattered focus.\n\n**REMEMBER:** This is an **ending day**, not a beginning day. Complete, reflect, serve."
    };
    return guidance[todayNumber] || "A day of unique energies. Pay attention to patterns and synchronicities.";
  };

  const getNumberColor = (num) => {
    const colors = {
      1: 'text-amber-400',       // Sun - Golden/Amber
      2: 'text-emerald-400',     // Moon - Green  
      3: 'text-purple-400',      // Jupiter - Purple
      4: 'text-sky-400',         // Uranus - Sky Blue
      5: 'text-slate-300',       // Mercury - Silver/Gray
      6: 'text-cyan-400',        // Venus - Cyan
      7: 'text-teal-400',        // Neptune - Teal
      8: 'text-pink-400',        // Saturn - PINK (consistent with UI)
      9: 'text-red-400'          // Mars - Red
    };
    return colors[num] || 'text-white';
  };

  const formatNumberText = (text, userNumbers, todayNumber) => {
    // Replace all number references with colored, bolded versions
    let formatted = text;
    const allNumbers = [...new Set([...userNumbers, todayNumber])];
    
    allNumbers.forEach(num => {
      const regex = new RegExp(`\\b${num}\\b`, 'g');
      formatted = formatted.replace(regex, `<span class="font-bold ${getNumberColor(num)}">${num}</span>`);
    });
    
    return formatted;
  };

  const getPersonalDayGuidance = (userNumber, todayNumber, numberType = 'Birth') => {
    // Number traits table
    const numberTraits = {
      1: { desc: "Independence, leadership, initiative, originality", challenge: "Impatience, ego, risk of isolation" },
      2: { desc: "Cooperation, harmony, sensitivity, diplomacy", challenge: "Indecision, oversensitivity" },
      3: { desc: "Creativity, communication, joy, self-expression", challenge: "Scattered focus, superficiality" },
      4: { desc: "Stability, structure, discipline, reliability", challenge: "Rigidity, stubbornness" },
      5: { desc: "Freedom, adaptability, curiosity, adventure", challenge: "Impulsiveness, restlessness" },
      6: { desc: "Responsibility, nurturing, care, community", challenge: "Over-sacrifice, worry for others" },
      7: { desc: "Introspection, wisdom, spirituality, truth-seeking", challenge: "Detachment, overthinking, isolation" },
      8: { desc: "Power, achievement, material success, authority", challenge: "Materialism, control issues" },
      9: { desc: "Completion, compassion, humanitarianism, universal understanding", challenge: "Letting go, emotional overwhelm" },
      11: { desc: "Intuition, visionary insight, spiritual awareness", challenge: "Nervous tension, inner conflict" },
      22: { desc: "Master builder, manifestation of visions, practical leadership", challenge: "Staying grounded amid pressure" },
      33: { desc: "Master teacher, compassion, service, guidance", challenge: "Emotional burden, self-sacrifice" }
    };
    
    const userTraits = numberTraits[userNumber];
    const todayTraits = numberTraits[todayNumber];
    
    // Same number = amplified
    if (userNumber === todayNumber) {
      if (numberType === 'Birth') {
        if (userNumber === 1) return "Your leadership drive is doubled. Confidence peaks. Don't let ego override judgment.";
        if (userNumber === 2) return "Your sensitivity heightens. Emotional intuition is sharp. Trust your feelings.";
        if (userNumber === 3) return "Creative energy overflows. Express yourself freely. Channel scattered ideas into action.";
        if (userNumber === 4) return "Your discipline is reinforced. Structure comes naturally. Avoid being too rigid.";
        if (userNumber === 5) return "Restless energy peaks. Adventure calls. Balance freedom with responsibility.";
        if (userNumber === 6) return "Nurturing instincts strengthen. Care for others feels natural. Don't over-sacrifice yourself.";
        if (userNumber === 7) return "Introspective energy doubles. Deep insights emerge. Don't isolate completely.";
        if (userNumber === 8) return "Ambition and power drive intensify. Material goals feel urgent. Stay ethical.";
        if (userNumber === 9) return "Compassion overflows. Endings and completions accelerate. Let go gracefully.";
        if (userNumber === 11) return "Intuitive insights flood in. Spiritual awareness peaks. Nervous system may feel overloaded.";
        if (userNumber === 22) return "Master builder energy multiplies. Big visions demand manifestation. Pressure is immense.";
        if (userNumber === 33) return "Teaching and service impulses surge. Compassion feels overwhelming. Set boundaries.";
      } else if (numberType === 'Life Path') {
        return "Your life purpose is emphasized today. Karmic patterns repeat. Decisions have lasting impact.";
      } else {
        return "Your natural expression is magnified. Others see your true self clearly. Social ease flows.";
      }
    }
    
    // Specific interactions based on number combinations
    
    // 1 (Leadership) interactions
    if (userNumber === 1) {
      if (todayNumber === 2) {
        if (numberType === 'Birth') return "Your assertiveness meets cooperative energy. Soften your approach. Listen before leading.";
        if (numberType === 'Life Path') return "Your independent path requires partnerships today. Balance self-reliance with collaboration.";
        return "Your direct expression needs diplomacy. Tone down ego in social settings.";
      }
      if (todayNumber === 3) {
        if (numberType === 'Birth') return "Your initiative gains creative spark. Lead with vision. Express ideas boldly.";
        if (numberType === 'Life Path') return "Your life direction benefits from creative communication. Share your mission.";
        return "Your leadership shines through joyful expression. People respond to your confidence.";
      }
      if (todayNumber === 4) {
        if (numberType === 'Birth') return "Your drive meets structure. Channel ambition into practical steps. Build systematically.";
        if (numberType === 'Life Path') return "Your path requires discipline today. Long-term goals need patient effort.";
        return "Your bold expression needs grounding. Others want concrete plans, not just ideas.";
      }
      if (todayNumber === 8) {
        if (numberType === 'Birth') return "Your ego meets material reality. Power struggles likely. Lead with integrity, not force.";
        if (numberType === 'Life Path') return "Your independent path faces authority tests. Prove yourself through results.";
        return "Your confident expression meets resistance. Don't push too hard socially.";
      }
    }
    
    // 2 (Cooperation) interactions
    if (userNumber === 2) {
      if (todayNumber === 1) {
        if (numberType === 'Birth') return "Your gentle nature meets forceful energy. Stand your ground. Don't get overshadowed.";
        if (numberType === 'Life Path') return "Your cooperative path needs assertiveness today. Speak up for yourself.";
        return "Your diplomatic expression gains confidence. Others notice your quiet strength.";
      }
      if (todayNumber === 5) {
        if (numberType === 'Birth') return "Your need for harmony meets chaos. Rapid changes unsettle you. Stay centered.";
        if (numberType === 'Life Path') return "Your steady path encounters disruption. Adapt without losing your core values.";
        return "Your gentle expression feels scattered. Social unpredictability stresses you.";
      }
      if (todayNumber === 7) {
        if (numberType === 'Birth') return "Your emotional sensitivity meets introspection. Feelings deepen. Trust your intuition.";
        if (numberType === 'Life Path') return "Your collaborative path turns inward. Solitude aids understanding.";
        return "Your social warmth meets reserved energy. Give others space.";
      }
    }
    
    // 3 (Creativity) interactions
    if (userNumber === 3) {
      if (todayNumber === 4) {
        if (numberType === 'Birth') return "Your creative chaos meets structure. Channel scattered ideas into organized plans.";
        if (numberType === 'Life Path') return "Your expressive path needs practical discipline. Create with method.";
        return "Your spontaneous expression needs filtering. Think before speaking today.";
      }
      if (todayNumber === 7) {
        if (numberType === 'Birth') return "Your outward joy meets inward reflection. Surface enthusiasm feels shallow. Go deeper.";
        if (numberType === 'Life Path') return "Your social path turns philosophical. Seek meaning beyond entertainment.";
        return "Your cheerful expression meets serious energy. Others aren't in the mood for lightness.";
      }
      if (todayNumber === 9) {
        if (numberType === 'Birth') return "Your creative expression serves higher purpose. Art becomes healing. Share generously.";
        if (numberType === 'Life Path') return "Your communicative path aids humanitarian goals. Your voice matters.";
        return "Your joyful expression attracts community. People gather around your energy.";
      }
    }
    
    // 4 (Structure) interactions
    if (userNumber === 4) {
      if (todayNumber === 5) {
        if (numberType === 'Birth') return "Your need for order meets disruption. Routines break. Flexibility required.";
        if (numberType === 'Life Path') return "Your stable path encounters change. Adapt your plans without abandoning goals.";
        return "Your reliable expression seems boring today. Loosen up socially.";
      }
      if (todayNumber === 9) {
        if (numberType === 'Birth') return "Your practicality meets idealism. Endings require acceptance, not control.";
        if (numberType === 'Life Path') return "Your structured path faces completion. Let go of outdated systems.";
        return "Your steady expression meets collective emotion. Others want empathy, not logic.";
      }
    }
    
    // 5 (Freedom) interactions
    if (userNumber === 5) {
      if (todayNumber === 2) {
        if (numberType === 'Birth') return "Your restless nature meets stabilizing energy. Slow down. Consider others' feelings.";
        if (numberType === 'Life Path') return "Your adventurous path needs partnership. Freedom works better with allies.";
        return "Your unpredictable expression needs diplomacy. Be sensitive to others today.";
      }
      if (todayNumber === 4) {
        if (numberType === 'Birth') return "Your need for movement meets restriction. Discipline feels suffocating. Find structured freedom.";
        if (numberType === 'Life Path') return "Your free-spirited path requires grounding. Build foundations for adventure.";
        return "Your spontaneous expression meets expectation. Follow through on commitments.";
      }
      if (todayNumber === 8) {
        if (numberType === 'Birth') return "Your impulsiveness meets serious consequences. Quick decisions backfire. Think long-term.";
        if (numberType === 'Life Path') return "Your freedom-seeking path faces material reality. Success requires commitment.";
        return "Your casual expression meets power dynamics. Show up professionally.";
      }
    }
    
    // 6 (Responsibility) interactions
    if (userNumber === 6) {
      if (todayNumber === 1) {
        if (numberType === 'Birth') return "Your nurturing nature meets self-focus. Put yourself first today. Others can wait.";
        if (numberType === 'Life Path') return "Your service path needs self-leadership. Care for yourself before others.";
        return "Your caring expression gains authority. Lead with compassion.";
      }
      if (todayNumber === 5) {
        if (numberType === 'Birth') return "Your responsible nature meets freedom energy. Loosen obligations. Take personal time.";
        if (numberType === 'Life Path') return "Your duty-bound path needs adventure. Responsible play is possible.";
        return "Your dependable expression seems restrictive. Let others see your playful side.";
      }
      if (todayNumber === 9) {
        if (numberType === 'Birth') return "Your family focus expands to humanity. Small circle feels limiting. Serve broadly.";
        if (numberType === 'Life Path') return "Your caretaking path serves collective healing. Your nurturing impacts many.";
        return "Your caring expression reaches wider community. Share your heart beyond close circle.";
      }
    }
    
    // 7 (Wisdom) interactions
    if (userNumber === 7) {
      if (todayNumber === 3) {
        if (numberType === 'Birth') return "Your serious introspection meets lighthearted energy. Smile. Share insights playfully.";
        if (numberType === 'Life Path') return "Your solitary path needs creative expression. Wisdom wants to be shared.";
        return "Your reserved expression loosens. People want your deep thoughts delivered joyfully.";
      }
      if (todayNumber === 8) {
        if (numberType === 'Birth') return "Your spiritual seeking meets material demands. Inner work must pause for outer success.";
        if (numberType === 'Life Path') return "Your mystical path requires practical results. Manifest your insights tangibly.";
        return "Your philosophical expression needs business acumen. Talk value, not just truth.";
      }
    }
    
    // 8 (Power) interactions
    if (userNumber === 8) {
      if (todayNumber === 1) {
        if (numberType === 'Birth') return "Your authority meets ego challenges. Power struggles intensify. Lead through service, not dominance.";
        if (numberType === 'Life Path') return "Your material path faces leadership tests. Prove worth through integrity.";
        return "Your commanding expression creates friction. Soften your approach.";
      }
      if (todayNumber === 6) {
        if (numberType === 'Birth') return "Your ambition softens with care. Business meets heart. Success includes service.";
        if (numberType === 'Life Path') return "Your achievement path requires community responsibility. Wealth serves others.";
        return "Your authoritative expression gains warmth. People trust your power when it's caring.";
      }
      if (todayNumber === 9) {
        if (numberType === 'Birth') return "Your control meets surrender. Endings can't be forced. Accept what completes.";
        if (numberType === 'Life Path') return "Your material path faces karmic completion. Let go of what no longer serves ambition.";
        return "Your powerful expression serves humanitarian ends. Use influence for good.";
      }
    }
    
    // 9 (Completion) interactions
    if (userNumber === 9) {
      if (todayNumber === 1) {
        if (numberType === 'Birth') return "Your compassion meets initiative. Start humanitarian projects. Lead with heart.";
        if (numberType === 'Life Path') return "Your service path needs bold leadership. Take charge of healing work.";
        return "Your empathetic expression gains confidence. Speak up for causes.";
      }
      if (todayNumber === 4) {
        if (numberType === 'Birth') return "Your idealism needs practical structure. Ground compassion in real action.";
        if (numberType === 'Life Path') return "Your humanitarian path requires discipline. Build systems for service.";
        return "Your emotional expression needs concrete plans. Show people how to help.";
      }
      if (todayNumber === 8) {
        if (numberType === 'Birth') return "Your selfless nature meets material reality. Compassion needs funding. Seek resources.";
        if (numberType === 'Life Path') return "Your service path requires business acumen. Charity needs sustainability.";
        return "Your giving expression meets power structures. Work within systems to create change.";
      }
    }
    
    // Master number interactions
    if (userNumber === 11 || userNumber === 22 || userNumber === 33) {
      if (numberType === 'Birth') return `Your heightened sensitivity to today's energy. Master number nature feels amplified. ${userTraits.challenge} is pronounced.`;
      if (numberType === 'Life Path') return `Your elevated path intersects with today's frequency. Spiritual mission feels urgent. Stay grounded.`;
      return `Your powerful expression channels today's energy. Others sense your intensity. Don't overwhelm people.`;
    }
    
    // Default fallback
    if (numberType === 'Birth') return `Your inner nature adapts to today's energy. No strong pull or resistance. Navigate normally.`;
    if (numberType === 'Life Path') return `Your life path has neutral interaction with today. Continue your course steadily.`;
    return `Your expression finds average footing today. Social interactions flow without special advantage.`;
  };

  const requestNotificationPermission = async () => {
    if ('Notification' in window) {
      const permission = await Notification.requestPermission();
      if (permission === 'granted') {
        setShowNotificationPrompt(false);
        new Notification('Zythorus', {
          body: 'Daily insights activated! We\'ll notify you each morning.',
        });
      }
    }
  };

  const handleCreateProfile = () => {
    if (!formData.name || !formData.birthDay || !formData.birthMonth || !formData.birthYear) {
      return;
    }

    const birthNumber = getBirthNumber(formData.birthDay);
    const lifePathNumber = getLifePathNumber(
      parseInt(formData.birthDay),
      parseInt(formData.birthMonth),
      parseInt(formData.birthYear)
    );
    const nameNumber = getNameNumber(formData.name);

    const user = {
      id: Date.now(),
      name: formData.name,
      birthDate: `${formData.birthYear}-${formData.birthMonth}-${formData.birthDay}`,
      birthNumber,
      lifePathNumber,
      nameNumber
    };

    setProfiles([...profiles, user]);
    setCurrentProfileIndex(profiles.length);
    setFormData({ name: '', birthDay: '', birthMonth: '', birthYear: '' });
    setActiveTab('home');
    
    // Prompt for location after profile creation
    setTimeout(() => setShowLocationPrompt(true), 500);
  };

  const handleAddFriend = () => {
    if (!formData.name || !formData.birthDay || !formData.birthMonth || !formData.birthYear) {
      return;
    }

    const birthNumber = getBirthNumber(formData.birthDay);
    const lifePathNumber = getLifePathNumber(
      parseInt(formData.birthDay),
      parseInt(formData.birthMonth),
      parseInt(formData.birthYear)
    );
    const nameNumber = getNameNumber(formData.name);

    const friend = {
      id: Date.now(),
      name: formData.name,
      birthDate: `${formData.birthYear}-${formData.birthMonth}-${formData.birthDay}`,
      birthNumber,
      lifePathNumber,
      nameNumber,
      relationship: formData.relationship || 'Friend'
    };

    setFriends([...friends, friend]);
    setFormData({ name: '', birthDay: '', birthMonth: '', birthYear: '', relationship: '' });
  };

  const handleEditFriend = (friend) => {
    // Parse birthdate
    const [year, month, day] = friend.birthDate.split('-');
    
    setEditingFriend(friend);
    setFormData({
      name: friend.name,
      birthDay: day,
      birthMonth: month,
      birthYear: year,
      relationship: friend.relationship || 'Friend'
    });
  };

  const handleUpdateFriend = () => {
    if (!formData.name || !formData.birthDay || !formData.birthMonth || !formData.birthYear) {
      return;
    }

    const birthNumber = getBirthNumber(formData.birthDay);
    const lifePathNumber = getLifePathNumber(
      parseInt(formData.birthDay),
      parseInt(formData.birthMonth),
      parseInt(formData.birthYear)
    );
    const nameNumber = getNameNumber(formData.name);

    const updatedFriend = {
      ...editingFriend,
      name: formData.name,
      birthDate: `${formData.birthYear}-${formData.birthMonth}-${formData.birthDay}`,
      birthNumber,
      lifePathNumber,
      nameNumber,
      relationship: formData.relationship || 'Friend'
    };

    setFriends(friends.map(f => f.id === editingFriend.id ? updatedFriend : f));
    setFormData({ name: '', birthDay: '', birthMonth: '', birthYear: '', relationship: '' });
    setEditingFriend(null);
  };

  const handleCancelEdit = () => {
    setEditingFriend(null);
    setFormData({ name: '', birthDay: '', birthMonth: '', birthYear: '', relationship: '' });
  };

  const sendChatMessage = async () => {
    if (!chatInput.trim()) return;
    
    const userMessage = { role: 'user', content: chatInput };
    setChatMessages([...chatMessages, userMessage]);
    setChatInput('');
    setIsTyping(true);

    try {
      // BUILD CONVERSATION HISTORY FOR CONTEXT
      const conversationHistory = chatMessages.map(msg => ({
        role: msg.role,
        content: msg.content
      }));

      // Parse user's birthdate
      const [year, month, day] = currentUser.birthDate.split('-');
      const birthDateFormatted = new Date(parseInt(year), parseInt(month) - 1, parseInt(day)).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

      // AGGRESSIVE ANTI-KETU PROMPT
      const systemPrompt = `Answer this question according to Cheiro's Book of Numbers and classical Chaldean numerology.

USER INFO:
- Full Birthday: ${birthDateFormatted} (Month: ${month}, Day: ${day}, Year: ${year})
- Birth Number: ${currentUser.birthNumber}
- Life Path Number: ${currentUser.lifePathNumber}
- Name Number: ${currentUser.nameNumber}
- Today's Date: ${new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
- Today's Number: ${getTodayNumber()}

CRITICAL: DO NOT USE THESE WORDS/CONCEPTS UNDER ANY CIRCUMSTANCES:
- "Ketu" (this is Vedic astrology, NOT Cheiro)
- "Rahu" (Vedic astrology)
- Any other Vedic astrology terms
- "Ruled by" or "governed by"
- "Vibration" or "vibrate"
- "Configuration"
- "Energy field"

If you catch yourself about to use any of these terms, STOP and rewrite without them.

RULES:
- Keep it short (3-5 sentences max)
- Be direct and practical
- Use ONLY Cheiro's actual teachings from his books
- For timing questions: give specific dates this month
- Plain text only (no bullets, asterisks, or formatting)

CHEIRO'S NUMBER ASSOCIATIONS (use these, not Vedic terms):
- 1 = Sun
- 2 = Moon  
- 3 = Jupiter
- 4 = Uranus
- 5 = Mercury
- 6 = Venus
- 7 = Neptune (associated with Moon)
- 8 = Saturn
- 9 = Mars

You already know the USER'S birthday, so don't ask for it. If you need OTHER people's birthdays (partner, friend, etc.), ask for those.

Question: "${chatInput}"`;

      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 300,
          messages: [
            ...conversationHistory,
            { role: 'user', content: systemPrompt }
          ],
          tools: [
            {
              "type": "web_search_20250305",
              "name": "web_search"
            }
          ]
        })
      });

      const data = await response.json();
      
      // Handle response
      let finalResponse = '';
      const contentBlocks = data.content || [];
      
      for (const block of contentBlocks) {
        if (block.type === 'text') {
          finalResponse += block.text;
        }
      }
      
      if (!finalResponse) {
        finalResponse = 'Unable to generate response. Please try again.';
      }
      
      setChatMessages([...chatMessages, userMessage, { role: 'assistant', content: finalResponse }]);
    } catch (error) {
      console.error('Oracle error:', error);
      setChatMessages([...chatMessages, userMessage, { 
        role: 'assistant', 
        content: 'Unable to connect to the oracle. Please check your connection and try again.' 
      }]);
    }
    
    setIsTyping(false);
  };

  // Compatibility Matrix (from Cheiro's Book of Numbers)

  const getCompatibilityAnalysis = (userNum, friendNum) => {
    const user = numberProfiles[userNum];
    const friend = numberProfiles[friendNum];
    
    // Create key for lookup (always smaller number first)
    const key1 = `${Math.min(userNum, friendNum)}-${Math.max(userNum, friendNum)}`;
    const key2 = `${Math.max(userNum, friendNum)}-${Math.min(userNum, friendNum)}`;
    const compat = compatibilityMatrix[key1] || compatibilityMatrix[key2];
    
    if (!compat) {
      return {
        score: 50,
        verdict: "Neutral Connection",
        energy: "Your energies are learning to understand each other.",
        strengths: "Different perspectives bring opportunities for growth.",
        challenges: "May need extra effort to find common ground.",
        advice: "Patience and open communication will strengthen this bond."
      };
    }

    // Convert level to score (deterministic based on number pair)
    // Use a simple hash to get consistent score for same pair
    const hash = (userNum * 13 + friendNum * 7) % 16;
    let score;
    if (compat.level === 'High') {
      score = 75 + hash; // 75-90
    } else if (compat.level === 'Medium') {
      score = 55 + hash; // 55-70
    } else { // Low
      score = 35 + hash; // 35-50
    }

    // Generate verdict based on score
    let verdict;
    if (score >= 80) verdict = "Harmonious Union";
    else if (score >= 70) verdict = "Natural Connection";
    else if (score >= 60) verdict = "Compatible Pairing";
    else if (score >= 50) verdict = "Balanced Dynamic";
    else verdict = "Growth Through Contrast";

    // Generate strengths based on Cheiro's principles
    let strengths = compat.desc;
    
    // Add Cheiro-based expansion (15%)
    if (compat.level === 'High') {
      if ([userNum, friendNum].includes(1)) {
        strengths += " Natural leadership and initiative create forward momentum.";
      }
      if ([userNum, friendNum].includes(2)) {
        strengths += " Emotional sensitivity enhances understanding.";
      }
      if ([userNum, friendNum].includes(3)) {
        strengths += " Creative expression flows freely between you.";
      }
      if ([userNum, friendNum].includes(7)) {
        strengths += " Deep thinking and spiritual connection unite you.";
      }
      if ([11, 22, 33].some(n => [userNum, friendNum].includes(n))) {
        strengths += " Master number energy elevates this bond to higher purpose.";
      }
    }

    // Generate challenges
    let challenges;
    if (compat.level === 'High') {
      challenges = "May become too comfortable; maintain individual growth. Minor differences in approach need acknowledgment.";
    } else if (compat.level === 'Medium') {
      challenges = "Different life rhythms require patience and adaptation. Communication styles may need adjustment.";
    } else {
      challenges = "Core values and approaches differ significantly. Requires conscious effort to bridge perspectives.";
    }

    // Generate advice based on Cheiro's wisdom
    let advice;
    if (compat.level === 'High') {
      advice = `Honor your natural harmony while encouraging each other's individual paths. Your ${user.title} nature and their ${friend.title} energy create effortless understanding—nurture this gift.`;
    } else if (compat.level === 'Medium') {
      advice = `Find middle ground between your ${user.title} approach and their ${friend.title} style. Balance is key—appreciate differences rather than trying to change them.`;
    } else {
      advice = `Respect that you operate differently. Your ${user.title} nature and their ${friend.title} path may clash, but contrast teaches. Approach with curiosity, not judgment.`;
    }

    return {
      score,
      verdict,
      energy: compat.desc,
      strengths,
      challenges,
      advice
    };
  };

  const getEnergyColor = (score) => {
    if (score >= 80) return 'from-green-500 to-emerald-500';
    if (score >= 60) return 'from-blue-500 to-cyan-500';
    if (score >= 40) return 'from-yellow-500 to-orange-500';
    return 'from-orange-500 to-red-500';
  };

  // PATTERN DETECTION SYSTEM
  const detectNetworkPatterns = (user, friendsList) => {
    if (!friendsList || friendsList.length < 1) return null;

    const patterns = {
      triangles: [],
      clusters: [],
      networkType: null,
      harmonyScore: 0,
      insights: []
    };

    // Detect 3-6-9 Triangles (Jupiter harmony)
    const threes = friendsList.filter(f => [3, 6, 9].includes(f.lifePathNumber));
    if (threes.length >= 3) {
      const has3 = threes.find(f => f.lifePathNumber === 3);
      const has6 = threes.find(f => f.lifePathNumber === 6);
      const has9 = threes.find(f => f.lifePathNumber === 9);
      
      if (has3 && has6 && has9) {
        patterns.triangles.push({
          type: '3-6-9 Jupiter Triangle',
          members: [has3, has6, has9],
          description: 'Complete Jupiter harmony - creative, ambitious, humanitarian energy',
          rarity: 'Rare (found in 8% of networks)',
          icon: '🔺'
        });
      }
    }

    // Detect Same-Number Clusters
    const numberCounts = {};
    friendsList.forEach(f => {
      numberCounts[f.lifePathNumber] = (numberCounts[f.lifePathNumber] || 0) + 1;
    });

    Object.entries(numberCounts).forEach(([num, count]) => {
      if (count >= 3) {
        const profile = numberProfiles[num];
        patterns.clusters.push({
          number: num,
          count: count,
          ruling: profile?.ruling,
          description: `${count} friends are ${profile?.title}s - ${profile?.ruling} energy dominates this cluster`,
          icon: '⭐'
        });
      }
    });

    // Calculate Network Harmony Score
    let compatiblePairs = 0;
    let totalPairs = 0;
    
    friendsList.forEach((friend, i) => {
      const userCompat = getCompatibilityAnalysis(user.lifePathNumber, friend.lifePathNumber);
      if (userCompat.score >= 60) compatiblePairs++;
      totalPairs++;
      
      // Check friend-to-friend compatibility
      for (let j = i + 1; j < friendsList.length; j++) {
        const friendCompat = getCompatibilityAnalysis(friend.lifePathNumber, friendsList[j].lifePathNumber);
        if (friendCompat.score >= 60) compatiblePairs++;
        totalPairs++;
      }
    });

    patterns.harmonyScore = totalPairs > 0 ? Math.round((compatiblePairs / totalPairs) * 100) : 0;

    // Classify Network Type
    if (patterns.harmonyScore >= 70) {
      patterns.networkType = {
        name: 'The Harmonizer',
        description: 'Your network is highly compatible. You naturally attract harmonious energies.',
        emoji: '✨'
      };
    } else if (patterns.harmonyScore >= 50) {
      patterns.networkType = {
        name: 'The Balanced',
        description: 'Your network has healthy tension. You balance compatible and challenging energies.',
        emoji: '⚖️'
      };
    } else {
      patterns.networkType = {
        name: 'The Catalyst',
        description: 'Your network thrives on friction. You bridge incompatible energies and create transformation.',
        emoji: '🔥'
      };
    }

    // Generate Insights
    if (patterns.triangles.length > 0) {
      patterns.insights.push({
        title: '🔮 Rare Pattern Detected!',
        description: `You have a complete ${patterns.triangles[0].type}. ${patterns.triangles[0].description}`,
        shareable: true
      });
    }

    if (patterns.clusters.length > 0) {
      const biggestCluster = patterns.clusters.sort((a, b) => b.count - a.count)[0];
      patterns.insights.push({
        title: `${biggestCluster.icon} ${biggestCluster.ruling} Cluster Found`,
        description: biggestCluster.description,
        shareable: true
      });
    }

    // Unexpected connections
    const incompatibleHighScore = friendsList.some(f => {
      const compat = getCompatibilityAnalysis(user.lifePathNumber, f.lifePathNumber);
      return compat.score < 40;
    });

    if (incompatibleHighScore && patterns.harmonyScore > 50) {
      patterns.insights.push({
        title: '⚡ Interesting Discovery',
        description: 'Some of your "incompatible" connections are actually thriving. Numerology suggests tension, but your relationship proves otherwise.',
        shareable: true
      });
    }

    return patterns;
  };

  // PLANETARY HOURS SYSTEM (Key of Solomon)
  
  // Helper: Calculate sunrise time (simplified - in production use SunCalc library)
  const getSunrise = (date, lat, lng) => {
    // This is a simplified calculation
    // In production, use a library like suncalc or sun-position
    const day = date.getDate();
    const month = date.getMonth();
    
    // Approximate sunrise (6am baseline, varies by season and latitude)
    const baseHour = 6;
    const seasonOffset = Math.sin((month - 3) * Math.PI / 6) * 2; // ±2 hours for seasons
    const latitudeOffset = (lat - 34) * 0.02; // Adjust for latitude (34°N baseline)
    
    const sunriseHour = baseHour - seasonOffset + latitudeOffset;
    const sunrise = new Date(date);
    sunrise.setHours(Math.floor(sunriseHour));
    sunrise.setMinutes((sunriseHour % 1) * 60);
    sunrise.setSeconds(0);
    return sunrise;
  };

  const getSunset = (date, lat, lng) => {
    // Simplified calculation
    const month = date.getMonth();
    const baseHour = 18; // 6pm baseline
    const seasonOffset = Math.sin((month - 3) * Math.PI / 6) * 2;
    const latitudeOffset = (lat - 34) * 0.02;
    
    const sunsetHour = baseHour + seasonOffset - latitudeOffset;
    const sunset = new Date(date);
    sunset.setHours(Math.floor(sunsetHour));
    sunset.setMinutes((sunsetHour % 1) * 60);
    sunset.setSeconds(0);
    return sunset;
  };

  const calculatePlanetaryHours = (date, lat, lng) => {
    // First, check if we're before today's sunrise
    const todaySunrise = getSunrise(date, lat, lng);
    const now = new Date();
    const isBeforeSunrise = now < todaySunrise;
    
    // If before sunrise, we're still in yesterday's nighttime hours
    const calculationDate = isBeforeSunrise ? new Date(date.getTime() - 24 * 60 * 60 * 1000) : date;
    
    const sunrise = getSunrise(calculationDate, lat, lng);
    const sunset = getSunset(calculationDate, lat, lng);
    const nextDay = new Date(calculationDate);
    nextDay.setDate(nextDay.getDate() + 1);
    const nextSunrise = getSunrise(nextDay, lat, lng);

    console.log('Calculating planetary hours:', { 
      now: now.toString(),
      todaySunrise: todaySunrise.toString(),
      isBeforeSunrise,
      calculationDate: calculationDate.toString(),
      sunrise: sunrise.toString(), 
      sunset: sunset.toString(), 
      nextSunrise: nextSunrise.toString()
    });

    // Calculate hour lengths
    const dayLength = sunset - sunrise;
    const nightLength = nextSunrise - sunset;
    const dayHourLength = dayLength / 12;
    const nightHourLength = nightLength / 12;

    // Day rulers (Key of Solomon)
    const dayRulers = ['Sun', 'Moon', 'Mars', 'Mercury', 'Jupiter', 'Venus', 'Saturn'];
    const dayOfWeek = calculationDate.getDay();
    const firstPlanet = dayRulers[dayOfWeek];

    // Chaldean order
    const chaldeanOrder = ['Saturn', 'Jupiter', 'Mars', 'Sun', 'Venus', 'Mercury', 'Moon'];
    const startIndex = chaldeanOrder.indexOf(firstPlanet);

    const hours = [];

    // Daytime hours (1-12)
    for (let i = 0; i < 12; i++) {
      const startTime = new Date(sunrise.getTime() + (i * dayHourLength));
      const endTime = new Date(sunrise.getTime() + ((i + 1) * dayHourLength));
      
      hours.push({
        number: i + 1,
        period: 'day',
        startTime,
        endTime,
        ruler: chaldeanOrder[(startIndex + i) % 7],
        activities: getPlanetaryActivities(chaldeanOrder[(startIndex + i) % 7])
      });
    }

    // Nighttime hours (13-24)
    for (let i = 0; i < 12; i++) {
      const startTime = new Date(sunset.getTime() + (i * nightHourLength));
      const endTime = new Date(sunset.getTime() + ((i + 1) * nightHourLength));
      
      hours.push({
        number: i + 13,
        period: 'night',
        startTime,
        endTime,
        ruler: chaldeanOrder[(startIndex + 12 + i) % 7],
        activities: getPlanetaryActivities(chaldeanOrder[(startIndex + 12 + i) % 7])
      });
    }

    console.log('Generated hours:', hours.length);
    console.log('First hour:', hours[0].startTime.toString(), '-', hours[0].endTime.toString());
    console.log('Last hour:', hours[23].startTime.toString(), '-', hours[23].endTime.toString());
    return hours;
  };


  const getPersonalizedPlanetaryHours = (hours, userLifePath) => {
    // Map Life Path to classical planets
    const classicalPlanets = {
      1: 'Sun', 2: 'Moon', 3: 'Jupiter', 5: 'Mercury', 
      6: 'Venus', 8: 'Saturn', 9: 'Mars'
    };
    
    const userPlanet = classicalPlanets[userLifePath];
    const hasClassicalPlanet = userPlanet !== undefined;
    
    return hours.map(hour => {
      const hourNumber = planetToNumber(hour.ruler);
      const userProfile = numberProfiles[userLifePath];
      const isCompatible = userProfile?.compatibleNumbers.includes(hourNumber);
      
      let alignment;
      if (hasClassicalPlanet && hour.ruler === userPlanet) {
        alignment = 'AMPLIFIED';
      } else if (isCompatible) {
        alignment = 'FAVORABLE';
      } else {
        alignment = 'NEUTRAL';
      }
      
      return {
        ...hour,
        alignment,
        activities: getPlanetaryActivities(hour.ruler)
      };
    });
  };

  const getCurrentPlanetaryHour = (hours) => {
    const now = new Date();
    console.log('Finding current hour. Now:', now);
    console.log('Available hours:', hours.length);
    const found = hours.find(h => now >= h.startTime && now < h.endTime);
    console.log('Current hour found:', found ? found.ruler : 'NONE');
    return found;
  };

  const getTopHoursForUser = (hours, userLifePath, limit = 3) => {
    return hours
      .filter(h => h.alignment === 'AMPLIFIED' || h.alignment === 'FAVORABLE')
      .sort((a, b) => {
        if (a.alignment === 'AMPLIFIED' && b.alignment !== 'AMPLIFIED') return -1;
        if (b.alignment === 'AMPLIFIED' && a.alignment !== 'AMPLIFIED') return 1;
        return 0;
      })
      .slice(0, limit);
  };

  // LOCATION HANDLING
  const requestGeolocation = () => {
    console.log('Requesting geolocation...');
    setIsGeolocating(true);
    
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          console.log('Geolocation success!', position);
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          
          // Get timezone
          const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
          
          // Get approximate city name from timezone
          const city = timezone.split('/')[1]?.replace('_', ' ') || 'Your Location';
          
          console.log('Setting location:', { city, lat, lng, timezone });
          
          // Save to profile
          const updatedProfiles = [...profiles];
          updatedProfiles[currentProfileIndex] = {
            ...currentUser,
            location: { city, lat, lng, timezone }
          };
          setProfiles(updatedProfiles);
          setShowLocationPrompt(false);
          setShowLocationForm(false);
          setIsGeolocating(false);
          console.log('Location saved via geolocation!');
        },
        (error) => {
          console.error('Geolocation error:', error);
          setIsGeolocating(false);
          
          if (error.code === 1) {
            // User denied permission
            alert('Location access denied. You can either:\n1. Enable location in Safari settings, OR\n2. Enter your city manually below');
          } else if (error.code === 2) {
            // Position unavailable
            alert('Location unavailable. Please enter your city manually.');
          } else {
            // Timeout or other error
            alert('Could not get location. Please enter your city manually.');
          }
          
          setShowLocationForm(true);
        },
        {
          enableHighAccuracy: false,
          timeout: 10000,
          maximumAge: 0
        }
      );
    } else {
      console.error('Geolocation not supported');
      setIsGeolocating(false);
      alert('Your browser does not support geolocation. Please enter your city manually.');
      setShowLocationForm(true);
    }
  };

  // Built-in city database (no API needed)
  const cityDatabase = {
    'los angeles': { city: 'Los Angeles, CA', lat: 34.0522, lng: -118.2437, timezone: 'America/Los_Angeles' },
    'la': { city: 'Los Angeles, CA', lat: 34.0522, lng: -118.2437, timezone: 'America/Los_Angeles' },
    'new york': { city: 'New York, NY', lat: 40.7128, lng: -74.0060, timezone: 'America/New_York' },
    'nyc': { city: 'New York, NY', lat: 40.7128, lng: -74.0060, timezone: 'America/New_York' },
    'chicago': { city: 'Chicago, IL', lat: 41.8781, lng: -87.6298, timezone: 'America/Chicago' },
    'miami': { city: 'Miami, FL', lat: 25.7617, lng: -80.1918, timezone: 'America/New_York' },
    'houston': { city: 'Houston, TX', lat: 29.7604, lng: -95.3698, timezone: 'America/Chicago' },
    'phoenix': { city: 'Phoenix, AZ', lat: 33.4484, lng: -112.0740, timezone: 'America/Phoenix' },
    'philadelphia': { city: 'Philadelphia, PA', lat: 39.9526, lng: -75.1652, timezone: 'America/New_York' },
    'san antonio': { city: 'San Antonio, TX', lat: 29.4241, lng: -98.4936, timezone: 'America/Chicago' },
    'san diego': { city: 'San Diego, CA', lat: 32.7157, lng: -117.1611, timezone: 'America/Los_Angeles' },
    'dallas': { city: 'Dallas, TX', lat: 32.7767, lng: -96.7970, timezone: 'America/Chicago' },
    'san jose': { city: 'San Jose, CA', lat: 37.3382, lng: -121.8863, timezone: 'America/Los_Angeles' },
    'austin': { city: 'Austin, TX', lat: 30.2672, lng: -97.7431, timezone: 'America/Chicago' },
    'seattle': { city: 'Seattle, WA', lat: 47.6062, lng: -122.3321, timezone: 'America/Los_Angeles' },
    'denver': { city: 'Denver, CO', lat: 39.7392, lng: -104.9903, timezone: 'America/Denver' },
    'boston': { city: 'Boston, MA', lat: 42.3601, lng: -71.0589, timezone: 'America/New_York' },
    'atlanta': { city: 'Atlanta, GA', lat: 33.7490, lng: -84.3880, timezone: 'America/New_York' },
    'las vegas': { city: 'Las Vegas, NV', lat: 36.1699, lng: -115.1398, timezone: 'America/Los_Angeles' },
    'portland': { city: 'Portland, OR', lat: 45.5152, lng: -122.6784, timezone: 'America/Los_Angeles' },
    'london': { city: 'London, UK', lat: 51.5074, lng: -0.1278, timezone: 'Europe/London' },
    'paris': { city: 'Paris, France', lat: 48.8566, lng: 2.3522, timezone: 'Europe/Paris' },
    'tokyo': { city: 'Tokyo, Japan', lat: 35.6762, lng: 139.6503, timezone: 'Asia/Tokyo' },
    'sydney': { city: 'Sydney, Australia', lat: -33.8688, lng: 151.2093, timezone: 'Australia/Sydney' },
    'toronto': { city: 'Toronto, Canada', lat: 43.6532, lng: -79.3832, timezone: 'America/Toronto' },
    'dubai': { city: 'Dubai, UAE', lat: 25.2048, lng: 55.2708, timezone: 'Asia/Dubai' },
    'singapore': { city: 'Singapore', lat: 1.3521, lng: 103.8198, timezone: 'Asia/Singapore' },
    'hong kong': { city: 'Hong Kong', lat: 22.3193, lng: 114.1694, timezone: 'Asia/Hong_Kong' },
    'mumbai': { city: 'Mumbai, India', lat: 19.0760, lng: 72.8777, timezone: 'Asia/Kolkata' },
    'mexico city': { city: 'Mexico City, Mexico', lat: 19.4326, lng: -99.1332, timezone: 'America/Mexico_City' }
  };

  const findCityInDatabase = (cityName) => {
    const normalized = cityName.toLowerCase().trim();
    return cityDatabase[normalized] || null;
  };

  const geocodeCity = async (cityName) => {
    console.log('geocodeCity called with:', cityName);
    
    // Try built-in database first
    const builtIn = findCityInDatabase(cityName);
    if (builtIn) {
      console.log('Found in built-in database:', builtIn);
      const updatedProfiles = [...profiles];
      updatedProfiles[currentProfileIndex] = {
        ...currentUser,
        location: builtIn
      };
      setProfiles(updatedProfiles);
      setShowLocationPrompt(false);
      setShowLocationForm(false);
      setLocationInput('');
      return;
    }
    
    // Fallback to API if not in database
    try {
      console.log('Not in database, trying Nominatim API...');
      const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(cityName)}&format=json&limit=1`;
      console.log('URL:', url);
      
      const response = await fetch(url);
      console.log('Response status:', response.status);
      
      const data = await response.json();
      console.log('Response data:', data);
      
      if (data && data[0]) {
        const lat = parseFloat(data[0].lat);
        const lng = parseFloat(data[0].lon);
        const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        
        console.log('Found location:', { city: cityName, lat, lng, timezone });
        
        // Save to profile
        const updatedProfiles = [...profiles];
        updatedProfiles[currentProfileIndex] = {
          ...currentUser,
          location: { city: cityName, lat, lng, timezone }
        };
        console.log('Updating profile with location...');
        setProfiles(updatedProfiles);
        setShowLocationPrompt(false);
        setShowLocationForm(false);
        setLocationInput('');
        console.log('Location saved successfully!');
      } else {
        console.log('No results found for city');
        alert('City not found. Try: Los Angeles, New York, Chicago, London, Paris, Tokyo, Sydney, etc.');
      }
    } catch (error) {
      console.error('Geocoding error:', error);
      alert('City not found. Try: Los Angeles, New York, Chicago, London, Paris, Tokyo, Sydney, etc.');
    }
  };

  const TabBar = () => (
    <div className="fixed bottom-0 left-0 right-0 backdrop-blur-2xl border-t border-white/10 z-50" style={{
      background: 'linear-gradient(to top, rgba(0, 0, 0, 0.6), rgba(20, 10, 40, 0.5))',
      boxShadow: '0 -10px 30px rgba(0, 0, 0, 0.3)'
    }}>
      <div className="max-w-2xl mx-auto flex justify-around py-2">
        <button
          onClick={() => setActiveTab('home')}
          className={`flex flex-col items-center gap-0.5 px-4 py-2 transition-all duration-300 relative rounded-2xl ${activeTab === 'home' ? 'text-white scale-110 bg-gradient-to-br from-violet-600/30 to-purple-500/20' : 'text-gray-400 scale-100'}`}
        >
          <Home className={`w-5 h-5 ${activeTab === 'home' ? 'drop-shadow-[0_0_8px_rgba(168,85,247,0.8)]' : ''}`} />
          <span className="text-[10px] font-medium tracking-wide tab-label">Home</span>
        </button>
        <button
          onClick={() => setActiveTab('friends')}
          className={`flex flex-col items-center gap-0.5 px-4 py-2 transition-all duration-300 relative rounded-2xl ${activeTab === 'friends' ? 'text-white scale-110 bg-gradient-to-br from-violet-600/30 to-purple-500/20' : 'text-gray-400 scale-100'}`}
        >
          <Users className={`w-5 h-5 ${activeTab === 'friends' ? 'drop-shadow-[0_0_8px_rgba(168,85,247,0.8)]' : ''}`} />
          <span className="text-[10px] font-medium tracking-wide tab-label">Friends</span>
        </button>
        <button
          onClick={() => setActiveTab('oracle')}
          className={`flex flex-col items-center gap-0.5 px-4 py-2 transition-all duration-300 relative rounded-2xl ${activeTab === 'oracle' ? 'text-white scale-110 bg-gradient-to-br from-violet-600/30 to-purple-500/20' : 'text-gray-400 scale-100'}`}
        >
          <Sparkles className={`w-5 h-5 ${activeTab === 'oracle' ? 'drop-shadow-[0_0_8px_rgba(168,85,247,0.8)]' : ''}`} />
          <span className="text-[10px] font-medium tracking-wide tab-label">Oracle</span>
        </button>
        <button
          onClick={() => setActiveTab('learn')}
          className={`flex flex-col items-center gap-0.5 px-4 py-2 transition-all duration-300 relative rounded-2xl ${activeTab === 'learn' ? 'text-white scale-110 bg-gradient-to-br from-violet-600/30 to-purple-500/20' : 'text-gray-400 scale-100'}`}
        >
          <BookOpen className={`w-5 h-5 ${activeTab === 'learn' ? 'drop-shadow-[0_0_8px_rgba(168,85,247,0.8)]' : ''}`} />
          <span className="text-[10px] font-medium tracking-wide tab-label">Learn</span>
        </button>
      </div>
    </div>
  );

  if (!currentUser) {
    // Interactive Animated Orb Component
    const SerpentOracle = () => {
      return (
        <div className="flex justify-center mb-8">
          <div className="relative w-64 h-64">
            {/* Mystical glow */}
            <div 
              className="absolute inset-0 blur-3xl opacity-40 animate-pulse"
              style={{
                background: 'radial-gradient(circle, rgba(34, 197, 94, 0.6), rgba(59, 130, 246, 0.4), transparent)',
                animationDuration: '4s'
              }}
            />
            
            {/* Serpent & Lamb Avatar */}
            <img 
              src="data:image/png;base64,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"
              alt="Oracle"
              className="relative z-10 w-full h-full object-contain rounded-2xl"
              style={{
                filter: 'drop-shadow(0 0 20px rgba(34, 197, 94, 0.5))',
              }}
            />

            {/* Rotating mystical ring */}
            <div 
              className="absolute inset-0 rounded-full border-2 border-emerald-400/30 animate-spin"
              style={{ 
                animationDuration: '20s',
                boxShadow: '0 0 20px rgba(34, 197, 94, 0.3)'
              }}
            />
          </div>
        </div>
      );
    };


    return (
      <div className="min-h-screen relative overflow-hidden text-gray-100">
        <OrganicBackground />
        
        <div className="max-w-md mx-auto p-6 pt-12 relative z-10">
          <SerpentOracle />

          <div className="text-center mb-12">
            <h1 className="brand-logo text-2xl mb-3 text-gray-300">
              zythorus
            </h1>
            <p className="text-gray-400 text-xs font-light tracking-wide max-w-sm mx-auto leading-relaxed">
              Your birth date isn't random—it's a cosmic code that reveals your deepest nature, hidden strengths, and life's true path. More precise than astrology—your exact birth date reveals what star signs can't.
            </p>
          </div>

          {/* Modern Profile Creation Card */}
          <Card padding="p-8" className="shadow-2xl">
            <h2 className="text-xl font-medium text-white mb-8 tracking-tight">Create Your Profile</h2>
            <div className="space-y-6">
              <div>
                <label className="block text-xs font-medium mb-3 text-gray-400 tracking-wide">Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className={`w-full ${STYLES.input}`}
                  placeholder="Enter your name"
                />
              </div>

              <div>
                <label className="block text-xs font-medium mb-3 text-gray-400 tracking-wide">Birth Date</label>
                <div className="grid grid-cols-3 gap-3">
                  <input
                    type="number"
                    placeholder="MM"
                    min="1"
                    max="12"
                    value={formData.birthMonth}
                    onChange={(e) => {
                      const value = parseInt(e.target.value);
                      if (e.target.value === '' || (value >= 1 && value <= 12)) {
                        setFormData({...formData, birthMonth: e.target.value});
                      }
                    }}
                    onBlur={(e) => {
                      const value = parseInt(e.target.value);
                      if (value < 1) setFormData({...formData, birthMonth: '1'});
                      if (value > 12) setFormData({...formData, birthMonth: '12'});
                    }}
                    className={STYLES.inputCentered}
                  />
                  <input
                    type="number"
                    placeholder="DD"
                    min="1"
                    max="31"
                    value={formData.birthDay}
                    onChange={(e) => {
                      const value = parseInt(e.target.value);
                      if (e.target.value === '' || (value >= 1 && value <= 31)) {
                        setFormData({...formData, birthDay: e.target.value});
                      }
                    }}
                    onBlur={(e) => {
                      const value = parseInt(e.target.value);
                      if (value < 1) setFormData({...formData, birthDay: '1'});
                      if (value > 31) setFormData({...formData, birthDay: '31'});
                    }}
                    className={STYLES.inputCentered}
                  />
                  <input
                    type="number"
                    placeholder="YYYY"
                    min="1900"
                    max="2025"
                    value={formData.birthYear}
                    onChange={(e) => {
                      const value = e.target.value;
                      // Allow empty or any 4-digit year between 1900-2025
                      if (value === '' || (value.length <= 4 && parseInt(value) >= 1900 && parseInt(value) <= 2025) || value.length < 4) {
                        setFormData({...formData, birthYear: value});
                      }
                    }}
                    onBlur={(e) => {
                      const value = parseInt(e.target.value);
                      if (value < 1900) setFormData({...formData, birthYear: '1900'});
                      if (value > 2025) setFormData({...formData, birthYear: '2025'});
                    }}
                    className={STYLES.inputCentered}
                  />
                </div>
              </div>

              <button
                onClick={handleCreateProfile}
                className={`${STYLES.buttonPrimary} mt-8`}
              >
                See My Numbers
              </button>
            </div>
          </Card>
        </div>
        
        <style>{`
          @keyframes pulse {
            0%, 100% { transform: scale(1); opacity: 0.6; }
            50% { transform: scale(1.05); opacity: 0.8; }
          }
        `}</style>
      </div>
    );
  }

  if (activeTab === 'home') {
    const todayNumber = getTodayNumber();
    const todayProfile = numberProfiles[todayNumber] || numberProfiles[1];
    const dayGuidance = getDayEnergyGuidance(todayNumber);
    const today = new Date();
    const dateStr = `${today.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`;
    const month = today.getMonth() + 1;
    const day = today.getDate();
    
    const birthInfo = numberProfiles[currentUser.birthNumber] || numberProfiles[1];
    const lifePathInfo = numberProfiles[currentUser.lifePathNumber] || numberProfiles[1];
    const nameInfo = numberProfiles[currentUser.nameNumber] || numberProfiles[1];

    // Numerology quotes by famous figures and Cheiro
    const numerologyQuotes = [
      '"Numbers rule the universe." — Pythagoras',
      '"If you only knew the magnificence of the 3, 6 and 9, then you would have a key to the universe." — Nikola Tesla',
      '"The science of numbers is the key to the universe." — Pythagoras',
      '"All is number." — Pythagoras',
      '"Numbers are the Universal language offered by the deity to humans as confirmation of the truth." — St. Augustine',
      '"In every culture and in every medical tradition, numbers have been assigned to measure and predict." — Cheiro',
      '"The study of numbers is one of the oldest sciences known to man." — Cheiro',
      '"Everything in nature is formed after the model of numbers." — Plato',
      '"Numbers have a power which the ancients understood and we have forgotten." — Cheiro',
      '"The date of one\'s birth is the greatest secret nature has ever given." — Cheiro'
    ];
    const dailyQuote = numerologyQuotes[Math.floor(Math.random() * numerologyQuotes.length)];

    return (
      <div className="min-h-screen relative overflow-hidden pb-20 tab-content">
        <OrganicBackground />
        <div className="max-w-2xl mx-auto px-3 relative z-10">
          <div className="mb-8 pt-6">
            {/* Top bar with date and buttons */}
            <div className="flex justify-between items-start mb-6">
              <div>
                <p className="text-gray-400 text-xs uppercase tracking-widest font-medium">
                  {dateStr} <span className="text-gray-500">({month} + {day} + 2 + 0 + 2 + 6)</span>
                </p>
              </div>
              <div className="text-right">
                <button 
                  onClick={() => setShowProfile(true)}
                  className="flex items-center justify-between gap-2 px-4 py-2 bg-white/10 hover:bg-white/15 border border-white/20 text-white rounded-full text-xs font-medium backdrop-blur-sm transition group"
                >
                  <span>{currentUser.name}</span>
                  <Settings className="w-3.5 h-3.5 text-gray-400 group-hover:text-white group-hover:rotate-90 transition-all duration-300" />
                </button>
              </div>
            </div>

            {/* Today's Energy - Large and Clear */}
            <div className="text-center mb-6">
              {/* Check if today is a master number */}
              {[11, 22, 33].includes(todayNumber) ? (
                <>
                  {/* MASTER NUMBER - One line display */}
                  <h2 className="text-5xl font-bold text-white mb-2">
                    Today is <span className="text-cyan-300 drop-shadow-[0_0_20px_rgba(103,232,249,0.8)]">{todayNumber}</span> Energy
                  </h2>
                  <p className="text-gray-300 text-sm font-light">
                    {todayProfile.ruling} • {todayNumber === 11 && "Rare day of heightened intuition and spiritual insight"}
                    {todayNumber === 22 && "Powerful day for manifestation and building"}
                    {todayNumber === 33 && "Rarest energy - day for service and unconditional love"}
                  </p>
                </>
              ) : (
                <>
                  {/* Regular number display */}
                  <h2 className="text-4xl font-bold text-white mb-1">
                    Today is <span className="text-pink-400">{todayNumber}</span> Energy
                  </h2>
                  <p className="text-gray-300 text-sm font-light">{todayProfile.ruling}</p>
                </>
              )}
            </div>

            {/* Quote */}
            <div className="text-center mb-6">
              <p className="text-gray-400 text-sm font-light italic tracking-wide" style={{letterSpacing: '0.01em'}}>{dailyQuote}</p>
            </div>
          </div>

          <div className="space-y-5">
            {/* YOUR CORE NUMBERS - REDESIGNED */}
            <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-6 border border-white/10 shadow-sm">
              <h3 className="text-base font-semibold text-white mb-5">Your Core Numbers</h3>
              
              <div className="grid grid-cols-3 gap-3">
                {/* Birth Number */}
                <button
                  onClick={() => setExpandedNumber(expandedNumber === 'birth' ? null : 'birth')}
                  className="text-center transition-transform hover:scale-105"
                >
                  <div className="w-16 h-16 mx-auto bg-gradient-to-br from-rose-400/20 to-pink-500/20 rounded-2xl flex items-center justify-center mb-2 border border-rose-400/30">
                    <span className="text-3xl font-bold text-rose-300">{currentUser.birthNumber}</span>
                  </div>
                  <p className="text-xs font-semibold text-white mb-1">Birth</p>
                  <p className="text-[10px] text-gray-400 leading-tight">
                    {currentUser.birthNumber === 1 && "Natural leader"}
                    {currentUser.birthNumber === 2 && "Intuitive soul"}
                    {currentUser.birthNumber === 3 && "Creative spirit"}
                    {currentUser.birthNumber === 4 && "Stable builder"}
                    {currentUser.birthNumber === 5 && "Free wanderer"}
                    {currentUser.birthNumber === 6 && "Born nurturer"}
                    {currentUser.birthNumber === 7 && "Deep thinker"}
                    {currentUser.birthNumber === 8 && "Power seeker"}
                    {currentUser.birthNumber === 9 && "Old soul"}
                    {currentUser.birthNumber === 11 && "Intuitive channel"}
                    {currentUser.birthNumber === 22 && "Master builder"}
                    {currentUser.birthNumber === 33 && "Master healer"}
                  </p>
                </button>

                {/* Life Path */}
                <button
                  onClick={() => setExpandedNumber(expandedNumber === 'lifepath' ? null : 'lifepath')}
                  className="text-center transition-transform hover:scale-105"
                >
                  <div className="w-16 h-16 mx-auto bg-gradient-to-br from-purple-400/20 to-violet-500/20 rounded-2xl flex items-center justify-center mb-2 border border-purple-400/30">
                    <span className="text-3xl font-bold text-purple-300">{currentUser.lifePathNumber}</span>
                  </div>
                  <p className="text-xs font-semibold text-white mb-1">Life Path</p>
                  <p className="text-[10px] text-gray-400 leading-tight">
                    {currentUser.lifePathNumber === 1 && "Forge your path"}
                    {currentUser.lifePathNumber === 2 && "Unite & balance"}
                    {currentUser.lifePathNumber === 3 && "Express & create"}
                    {currentUser.lifePathNumber === 4 && "Build foundations"}
                    {currentUser.lifePathNumber === 5 && "Seek freedom"}
                    {currentUser.lifePathNumber === 6 && "Serve & care"}
                    {currentUser.lifePathNumber === 7 && "Seek truth"}
                    {currentUser.lifePathNumber === 8 && "Master material"}
                    {currentUser.lifePathNumber === 9 && "Complete & release"}
                    {currentUser.lifePathNumber === 11 && "Inspire humanity"}
                    {currentUser.lifePathNumber === 22 && "Build empires"}
                    {currentUser.lifePathNumber === 33 && "Teach & heal all"}
                  </p>
                </button>

                {/* Name Number */}
                <button
                  onClick={() => setExpandedNumber(expandedNumber === 'name' ? null : 'name')}
                  className="text-center transition-transform hover:scale-105"
                >
                  <div className="w-16 h-16 mx-auto bg-gradient-to-br from-cyan-400/20 to-blue-500/20 rounded-2xl flex items-center justify-center mb-2 border border-cyan-400/30">
                    <span className="text-3xl font-bold text-cyan-300">{currentUser.nameNumber}</span>
                  </div>
                  <p className="text-xs font-semibold text-white mb-1">Name</p>
                  <p className="text-[10px] text-gray-400 leading-tight">
                    {currentUser.nameNumber === 1 && "Commands respect"}
                    {currentUser.nameNumber === 2 && "Attracts allies"}
                    {currentUser.nameNumber === 3 && "Charms crowds"}
                    {currentUser.nameNumber === 4 && "Seems reliable"}
                    {currentUser.nameNumber === 5 && "Appears dynamic"}
                    {currentUser.nameNumber === 6 && "Radiates warmth"}
                    {currentUser.nameNumber === 7 && "Seems mysterious"}
                    {currentUser.nameNumber === 8 && "Projects power"}
                    {currentUser.nameNumber === 9 && "Inspires others"}
                    {currentUser.nameNumber === 11 && "Fascinates people"}
                    {currentUser.nameNumber === 22 && "Impresses all"}
                    {currentUser.nameNumber === 33 && "Draws followers"}
                  </p>
                </button>
              </div>

              {/* Explanation row */}
              <div className="mt-4 pt-4 border-t border-white/10">
                <div className="grid grid-cols-3 gap-3 text-[10px] text-gray-400">
                  <div className="text-center">
                    <p>Who you are inside</p>
                  </div>
                  <div className="text-center">
                    <p>Your life's mission</p>
                  </div>
                  <div className="text-center">
                    <p>How others see you</p>
                  </div>
                </div>
              </div>

              {/* Expanded Explanation */}
              {expandedNumber && currentUser.birthDate && (() => {
                const [year, month, day] = currentUser.birthDate.split('-');
                const birthDay = parseInt(day);
                const birthMonth = parseInt(month);
                const birthYear = parseInt(year);
                
                // Calculate birth number with steps
                const birthCalc = birthDay > 9 && ![11, 22, 33].includes(birthDay) 
                  ? `${Math.floor(birthDay / 10)} + ${birthDay % 10} = ${currentUser.birthNumber}`
                  : `${birthDay}`;
                
                // Calculate life path with steps
                const monthSum = birthMonth > 9 ? Math.floor(birthMonth / 10) + (birthMonth % 10) : birthMonth;
                const daySum = birthDay > 9 && ![11, 22, 33].includes(birthDay) 
                  ? Math.floor(birthDay / 10) + (birthDay % 10) 
                  : birthDay;
                const yearDigits = birthYear.toString().split('').map(Number);
                const yearSum = yearDigits.reduce((a, b) => a + b, 0);
                const yearReduced = yearSum > 9 && ![11, 22, 33].includes(yearSum)
                  ? Math.floor(yearSum / 10) + (yearSum % 10)
                  : yearSum;
                
                const totalSum = monthSum + daySum + yearReduced;
                const lifePathCalc = `${birthMonth}/${birthDay}/${birthYear} → ${birthMonth} + ${daySum} + ${yearReduced} = ${totalSum}${totalSum > 9 && ![11, 22, 33].includes(totalSum) ? ` → ${Math.floor(totalSum / 10)} + ${totalSum % 10} = ${currentUser.lifePathNumber}` : ''}`;
                
                // Calculate name number with Chaldean values - SEPARATED BY NAME PARTS
                const chaldeanMap = {
                  'A': 1, 'I': 1, 'J': 1, 'Q': 1, 'Y': 1,
                  'B': 2, 'K': 2, 'R': 2,
                  'C': 3, 'G': 3, 'L': 3, 'S': 3,
                  'D': 4, 'M': 4, 'T': 4,
                  'E': 5, 'H': 5, 'N': 5, 'X': 5,
                  'U': 6, 'V': 6, 'W': 6,
                  'O': 7, 'Z': 7,
                  'F': 8, 'P': 8
                };
                
                // Split name into parts (first, middle, last)
                const nameParts = currentUser.name.trim().split(/\s+/);
                const nameBreakdown = nameParts.map(part => {
                  const letters = part.toUpperCase().replace(/[^A-Z]/g, '').split('');
                  const values = letters.map(l => chaldeanMap[l] || 0);
                  const sum = values.reduce((a, b) => a + b, 0);
                  return {
                    name: part,
                    letters,
                    values,
                    sum
                  };
                });
                
                const totalNameSum = nameBreakdown.reduce((acc, part) => acc + part.sum, 0);
                const finalNameNumber = totalNameSum > 9 && ![11, 22, 33].includes(totalNameSum)
                  ? Math.floor(totalNameSum / 10) + (totalNameSum % 10)
                  : totalNameSum;
                
                return (
                  <div className="mt-4 pt-4 border-t border-white/10 animate-fadeIn">
                    {expandedNumber === 'birth' && (
                      <div className="bg-rose-500/10 rounded-2xl p-4 border border-rose-400/20">
                        <h4 className="text-sm font-semibold text-rose-300 mb-3">Birth Number {currentUser.birthNumber}</h4>
                        
                        <div className="mb-3 pb-3 border-b border-rose-400/20">
                          <p className="text-xs text-gray-400 italic">
                            Represents your fundamental nature, innate tendencies, personality at birth, and natural inclinations. Most important in Cheiro's system.
                          </p>
                        </div>
                        
                        <div className="mb-3 bg-black/20 rounded-xl p-3 border border-rose-400/10">
                          <p className="text-[10px] text-gray-400 mb-1 uppercase tracking-wider">Calculation</p>
                          <p className="text-xs text-white font-mono">Day of birth: {birthCalc}</p>
                        </div>
                        
                        <p className="text-xs text-gray-300 leading-relaxed mb-3">
                          {currentUser.birthNumber === 1 && "You were born with natural leadership and independence. Your core personality is assertive, original, and driven. You instinctively take charge and prefer to lead rather than follow."}
                          {currentUser.birthNumber === 2 && "You were born with sensitivity and diplomatic instincts. Your core nature is cooperative, intuitive, and peace-seeking. You naturally sense others' feelings and work best in partnership."}
                          {currentUser.birthNumber === 3 && "You were born with creative expression and joy. Your core personality is communicative, artistic, and optimistic. You instinctively seek self-expression through words, art, or performance."}
                          {currentUser.birthNumber === 4 && "You were born with practical discipline and stability. Your core nature is methodical, reliable, and structure-loving. You instinctively build systems and value hard work."}
                          {currentUser.birthNumber === 5 && "You were born with restless curiosity and adaptability. Your core personality is freedom-seeking, versatile, and adventurous. You instinctively resist routine and crave variety."}
                          {currentUser.birthNumber === 6 && "You were born with nurturing responsibility and care. Your core nature is protective, family-oriented, and service-minded. You instinctively take care of others and create harmony."}
                          {currentUser.birthNumber === 7 && "You were born with introspective wisdom and spiritual depth. Your core personality is analytical, truth-seeking, and reserved. You instinctively question everything and prefer solitude."}
                          {currentUser.birthNumber === 8 && "You were born with material ambition and authority. Your core nature is power-driven, achievement-focused, and commanding. You instinctively pursue success and control."}
                          {currentUser.birthNumber === 9 && "You were born with compassionate completion and universal understanding. Your core personality is humanitarian, selfless, and emotionally deep. You instinctively serve collective good."}
                          {currentUser.birthNumber === 11 && "You were born with heightened intuition and spiritual awareness. Your core nature is visionary, inspired, and nervous. You instinctively channel insights beyond ordinary perception."}
                          {currentUser.birthNumber === 22 && "You were born with master building capacity and practical vision. Your core personality is ambitious on a grand scale, grounded yet inspired. You instinctively manifest large dreams into reality."}
                          {currentUser.birthNumber === 33 && "You were born with master teaching and healing compassion. Your core nature is sacrificial, spiritually advanced, and emotionally burdened. You instinctively uplift and guide others."}
                        </p>
                        
                        <div className="bg-amber-500/10 rounded-xl p-3 border border-amber-400/20">
                          <p className="text-[10px] text-amber-400 mb-1 uppercase tracking-wider flex items-center gap-1">
                            <span>✡</span> Kabbalah
                          </p>
                          <p className="text-xs text-gray-300 italic">{numberProfiles[currentUser.birthNumber]?.kabbalah}</p>
                        </div>
                      </div>
                    )}
                    
                    {expandedNumber === 'lifepath' && (
                      <div className="bg-purple-500/10 rounded-2xl p-4 border border-purple-400/20">
                        <h4 className="text-sm font-semibold text-purple-300 mb-3">Life Path {currentUser.lifePathNumber}</h4>
                        
                        <div className="mb-3 pb-3 border-b border-purple-400/20">
                          <p className="text-xs text-gray-400 italic">
                            Represents the soul's journey, destiny, major life patterns, and lessons to be learned over the course of life.
                          </p>
                        </div>
                        
                        <div className="mb-3 bg-black/20 rounded-xl p-3 border border-purple-400/10">
                          <p className="text-[10px] text-gray-400 mb-1 uppercase tracking-wider">Calculation</p>
                          <p className="text-xs text-white font-mono">{lifePathCalc}</p>
                        </div>
                        
                        <p className="text-xs text-gray-300 leading-relaxed mb-3">
                          {currentUser.lifePathNumber === 1 && "Your soul's journey is to develop independence and pioneer new paths. Life will push you toward leadership roles and original thinking. Your destiny is forging your own way."}
                          {currentUser.lifePathNumber === 2 && "Your soul's journey is to learn cooperation and create balance. Life will teach you diplomacy and partnership. Your destiny is bringing opposing forces into harmony."}
                          {currentUser.lifePathNumber === 3 && "Your soul's journey is to express creativity and spread joy. Life will push you toward artistic communication. Your destiny is inspiring others through self-expression."}
                          {currentUser.lifePathNumber === 4 && "Your soul's journey is to build lasting foundations and establish order. Life will teach you discipline through hard work. Your destiny is creating stable structures."}
                          {currentUser.lifePathNumber === 5 && "Your soul's journey is to embrace change and experience freedom. Life will teach you through variety and adventure. Your destiny is adapting and exploring life's possibilities."}
                          {currentUser.lifePathNumber === 6 && "Your soul's journey is to serve others and take responsibility. Life will push you toward caretaking roles. Your destiny is nurturing and creating community harmony."}
                          {currentUser.lifePathNumber === 7 && "Your soul's journey is to seek truth and develop wisdom. Life will teach you through introspection and spiritual inquiry. Your destiny is uncovering hidden knowledge."}
                          {currentUser.lifePathNumber === 8 && "Your soul's journey is to master material world and wield power ethically. Life will teach you through success and failure cycles. Your destiny is achieving and managing resources."}
                          {currentUser.lifePathNumber === 9 && "Your soul's journey is to complete karmic cycles and serve humanity. Life will teach you through endings and letting go. Your destiny is humanitarian service and wisdom sharing."}
                          {currentUser.lifePathNumber === 11 && "Your soul's journey is to inspire and illuminate others spiritually. Life will teach you through heightened sensitivity. Your destiny is channeling divine insight to awaken humanity."}
                          {currentUser.lifePathNumber === 22 && "Your soul's journey is to manifest grand visions into practical reality. Life will teach you through enormous responsibility. Your destiny is building systems that transform society."}
                          {currentUser.lifePathNumber === 33 && "Your soul's journey is to teach universal love and heal collective wounds. Life will teach you through self-sacrifice. Your destiny is uplifting humanity through compassionate service."}
                        </p>
                        
                        <div className="bg-amber-500/10 rounded-xl p-3 border border-amber-400/20">
                          <p className="text-[10px] text-amber-400 mb-1 uppercase tracking-wider flex items-center gap-1">
                            <span>✡</span> Kabbalah
                          </p>
                          <p className="text-xs text-gray-300 italic">{numberProfiles[currentUser.lifePathNumber]?.kabbalah}</p>
                        </div>
                      </div>
                    )}
                    
                    {expandedNumber === 'name' && (
                      <div className="bg-cyan-500/10 rounded-2xl p-4 border border-cyan-400/20">
                        <h4 className="text-sm font-semibold text-cyan-300 mb-3">Name Number {currentUser.nameNumber}</h4>
                        
                        <div className="mb-3 pb-3 border-b border-cyan-400/20">
                          <p className="text-xs text-gray-400 italic">
                            Represents the way you express yourself in the world, social behavior, spiritual tendencies, and how others perceive you.
                          </p>
                        </div>
                        
                        <div className="mb-3 bg-black/20 rounded-xl p-3 border border-cyan-400/10">
                          <p className="text-[10px] text-gray-400 mb-2 uppercase tracking-wider">Chaldean Calculation</p>
                          
                          {/* Individual name parts */}
                          <div className="space-y-2 mb-3">
                            {nameBreakdown.map((part, idx) => (
                              <div key={idx} className="text-xs">
                                <p className="text-cyan-300 font-semibold mb-1">
                                  {idx === 0 && 'First: '}
                                  {idx === 1 && nameParts.length === 2 && 'Last: '}
                                  {idx === 1 && nameParts.length === 3 && 'Middle: '}
                                  {idx === 2 && 'Last: '}
                                  <span className="text-white">{part.name.toUpperCase()}</span>
                                </p>
                                <p className="text-white font-mono text-[11px] leading-relaxed">
                                  {part.letters.map((l, i) => `${l}(${part.values[i]})`).join(' + ')} = {part.sum}
                                </p>
                              </div>
                            ))}
                          </div>
                          
                          {/* Total calculation */}
                          <div className="pt-2 border-t border-cyan-400/20">
                            <p className="text-[10px] text-gray-400 mb-1 uppercase tracking-wider">Total</p>
                            <p className="text-white font-mono text-xs">
                              {nameBreakdown.map(p => p.sum).join(' + ')} = {totalNameSum}
                              {totalNameSum > 9 && ![11, 22, 33].includes(totalNameSum) && (
                                <> → {Math.floor(totalNameSum / 10)} + {totalNameSum % 10} = {finalNameNumber}</>
                              )}
                            </p>
                          </div>
                        </div>
                        
                        <p className="text-xs text-gray-300 leading-relaxed">
                          {currentUser.nameNumber === 1 && "You express yourself with authority and confidence. Others perceive you as a leader and respect your opinions. Your name vibrates with commanding, independent energy."}
                          {currentUser.nameNumber === 2 && "You express yourself with gentleness and diplomacy. Others perceive you as approachable and trustworthy. Your name vibrates with peaceful, harmonizing energy."}
                          {currentUser.nameNumber === 3 && "You express yourself with charm and creativity. Others perceive you as entertaining and inspiring. Your name vibrates with joyful, expressive energy."}
                          {currentUser.nameNumber === 4 && "You express yourself with practicality and dependability. Others perceive you as stable and trustworthy. Your name vibrates with grounded, reliable energy."}
                          {currentUser.nameNumber === 5 && "You express yourself with versatility and excitement. Others perceive you as dynamic and interesting. Your name vibrates with freedom-seeking, changeable energy."}
                          {currentUser.nameNumber === 6 && "You express yourself with warmth and responsibility. Others perceive you as caring and protective. Your name vibrates with nurturing, harmonious energy."}
                          {currentUser.nameNumber === 7 && "You express yourself with depth and mystery. Others perceive you as wise and enigmatic. Your name vibrates with spiritual, analytical energy."}
                          {currentUser.nameNumber === 8 && "You express yourself with power and authority. Others perceive you as successful and commanding. Your name vibrates with ambitious, material energy."}
                          {currentUser.nameNumber === 9 && "You express yourself with compassion and wisdom. Others perceive you as humanitarian and understanding. Your name vibrates with selfless, universal energy."}
                          {currentUser.nameNumber === 11 && "You express yourself with inspiration and intensity. Others perceive you as spiritually aware and magnetic. Your name vibrates with visionary, illuminating energy."}
                          {currentUser.nameNumber === 22 && "You express yourself with impressive capability and vision. Others perceive you as uniquely powerful and accomplished. Your name vibrates with master-building, transformative energy."}
                          {currentUser.nameNumber === 33 && "You express yourself with healing presence and guidance. Others perceive you as wise teacher and nurturer. Your name vibrates with master-teaching, uplifting energy."}
                        </p>
                        
                        <div className="bg-amber-500/10 rounded-xl p-3 mt-3 border border-amber-400/20">
                          <p className="text-[10px] text-amber-400 mb-1 uppercase tracking-wider flex items-center gap-1">
                            <span>✡</span> Kabbalah
                          </p>
                          <p className="text-xs text-gray-300 italic">{numberProfiles[currentUser.nameNumber]?.kabbalah}</p>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })()}
            </div>

            {/* Combined Box - Today's Energy + Your Numbers */}
            <Card className="shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-pink-500/20 rounded-full flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-pink-400" />
                </div>
                <div>
                  <h2 className="text-base font-medium text-white">Today's <span className={`font-bold ${getNumberColor(todayNumber)}`}>{todayNumber}</span> Energy</h2>
                </div>
              </div>
              
              {/* General day guidance */}
              {todayNumber === 9 ? (
                // Special formatted layout for number 9
                <div className="text-sm text-gray-300 leading-relaxed space-y-3 mb-5">
                  <p className="text-base font-bold text-white">
                    <span className={getNumberColor(9)}>9</span> is the number of <span className="text-pink-400">COMPLETION</span> — the final step in the cycle.
                  </p>
                  
                  <div>
                    <p className="text-xs font-bold text-emerald-400 mb-1">WHAT TO DO:</p>
                    <p className="font-light">
                      Wrap up unfinished business. <span className="font-medium text-white">Finish projects</span>, not start them. Help others. Reflect and let go of what no longer serves you. Your warrior courage is best used for <span className="font-medium text-white">COMPLETING battles</span>, not beginning new ones.
                    </p>
                  </div>

                  <div>
                    <p className="text-xs font-bold text-blue-400 mb-1">STRENGTHS TODAY:</p>
                    <p className="font-light">
                      Courage, determination, humanitarian spirit, spiritual insights, <span className="font-medium text-white">finishing power</span>.
                    </p>
                  </div>

                  <div>
                    <p className="text-xs font-bold text-red-400 mb-1">WATCH OUT:</p>
                    <p className="font-light">
                      Impulsiveness, accidents (especially fire), <span className="font-medium text-white">starting new ventures</span> (bad timing), unnecessary fights, scattered focus.
                    </p>
                  </div>

                  <div className="bg-white/5 rounded-lg p-3 border-l-2 border-pink-400">
                    <p className="text-xs font-bold text-pink-400 mb-1">REMEMBER:</p>
                    <p className="font-medium text-white">
                      This is an <span className="text-pink-400">ending day</span>, not a beginning day. Complete, reflect, serve.
                    </p>
                  </div>
                </div>
              ) : (
                <p className="text-sm text-gray-300 leading-relaxed font-light mb-5">{dayGuidance}</p>
              )}
              
              {/* Divider */}
              <div className="border-t border-white/10 my-4"></div>
              
              {/* Your personal numbers */}
              <h3 className="text-sm font-medium text-white mb-3">How Your Numbers Align Today:</h3>
              <div className="space-y-2 text-xs">
                <div className="bg-white/5 rounded-xl p-3 border border-white/10">
                  <span className="font-semibold text-white">Birth <span className={`${getNumberColor(currentUser.birthNumber)}`}>{currentUser.birthNumber}</span>:</span>{' '}
                  <span className="text-gray-300 font-light" dangerouslySetInnerHTML={{__html: formatNumberText(getPersonalDayGuidance(currentUser.birthNumber, todayNumber, 'Birth'), [currentUser.birthNumber], todayNumber)}} />
                </div>
                <div className="bg-white/5 rounded-xl p-3 border border-white/10">
                  <span className="font-semibold text-white">Life Path <span className={`${getNumberColor(currentUser.lifePathNumber)}`}>{currentUser.lifePathNumber}</span>:</span>{' '}
                  <span className="text-gray-300 font-light" dangerouslySetInnerHTML={{__html: formatNumberText(getPersonalDayGuidance(currentUser.lifePathNumber, todayNumber, 'Life Path'), [currentUser.lifePathNumber], todayNumber)}} />
                </div>
                <div className="bg-white/5 rounded-xl p-3 border border-white/10">
                  <span className="font-semibold text-white">Name <span className={`${getNumberColor(currentUser.nameNumber)}`}>{currentUser.nameNumber}</span>:</span>{' '}
                  <span className="text-gray-300 font-light" dangerouslySetInnerHTML={{__html: formatNumberText(getPersonalDayGuidance(currentUser.nameNumber, todayNumber, 'Name'), [currentUser.nameNumber], todayNumber)}} />
                </div>
              </div>
            </Card>

            {/* PLANETARY HOURS - ALWAYS VISIBLE */}
            <Card padding="p-5" className="shadow-sm mt-6">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-purple-400" />
                  <h3 className="text-sm font-semibold text-white">Planetary Hour</h3>
                </div>
                {currentUser.location ? (
                  <button
                    onClick={() => setShowLocationPrompt(true)}
                    className="text-xs text-purple-400 hover:text-purple-300 flex items-center gap-1"
                  >
                    <MapPin className="w-3 h-3" />
                    {currentUser.location.city}
                  </button>
                ) : (
                  <button
                    onClick={() => setShowLocationPrompt(true)}
                    className="text-xs text-red-400 hover:text-red-300 flex items-center gap-1 animate-pulse"
                  >
                    <MapPin className="w-3 h-3" />
                    Set Location
                  </button>
                )}
              </div>
              
              <p className="text-[10px] text-gray-400 mb-4 italic">
                From Solomon's Key: Each hour ruled by a different celestial force
              </p>

              {currentUser.location ? (() => {
                const hours = calculatePlanetaryHours(today, currentUser.location.lat, currentUser.location.lng);
                const currentHour = getCurrentPlanetaryHour(hours);
                
                return currentHour ? (
                  <div className="bg-gradient-to-br from-violet-600/10 to-purple-500/10 rounded-2xl p-4 border border-purple-300/20">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="text-lg font-bold text-white mb-1">{currentHour.ruler} Hour</h4>
                        <p className="text-xs text-gray-400">
                          {currentHour.startTime.toLocaleTimeString('en-US', {hour: 'numeric', minute: '2-digit'})} - {currentHour.endTime.toLocaleTimeString('en-US', {hour: 'numeric', minute: '2-digit'})}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-gray-400">Ends in</p>
                        <p className="text-base font-bold text-white">
                          {Math.floor((currentHour.endTime - new Date()) / 60000)} min
                        </p>
                      </div>
                    </div>
                    
                    <p className="text-xs text-gray-300 mb-3 italic leading-relaxed">
                      {currentHour.activities.qualities}
                    </p>
                    
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-emerald-500/10 rounded-xl p-3 border border-emerald-500/20">
                        <p className="text-xs font-bold text-emerald-400 mb-2">FAVORABLE:</p>
                        <ul className="space-y-1.5">
                          {currentHour.activities.favorable.slice(0, 3).map((activity, idx) => (
                            <li key={idx} className="text-[11px] text-gray-200 flex items-start gap-1.5 leading-snug">
                              <span className="text-emerald-400 mt-0.5">•</span>
                              <span>{activity}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="bg-red-500/10 rounded-xl p-3 border border-red-500/20">
                        <p className="text-xs font-bold text-red-400 mb-2">AVOID:</p>
                        <ul className="space-y-1.5">
                          {currentHour.activities.avoid.slice(0, 3).map((activity, idx) => (
                            <li key={idx} className="text-[11px] text-gray-200 flex items-start gap-1.5 leading-snug">
                              <span className="text-red-400 mt-0.5">•</span>
                              <span>{activity}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                ) : (
                  <p className="text-sm text-gray-400">Unable to calculate current hour</p>
                );
              })() : (
                <div className="bg-gradient-to-br from-purple-900/20 to-violet-900/20 rounded-2xl p-6 border border-purple-400/30 text-center">
                  <MapPin className="w-12 h-12 mx-auto mb-3 text-purple-400 opacity-50" />
                  <h4 className="text-base font-semibold text-white mb-2">Location Required</h4>
                  <p className="text-xs text-gray-400 mb-4 leading-relaxed">
                    Planetary hours are calculated based on sunrise and sunset times for your location. Set your location to unlock this ancient timing system.
                  </p>
                  <button
                    onClick={() => setShowLocationPrompt(true)}
                    className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-full text-sm font-medium transition"
                  >
                    Set Location Now
                  </button>
                </div>
              )}
            </div>

            {!isPremium && (
              <button
                onClick={() => setActiveTab('shop')}
                className="w-full py-4 bg-gradient-to-r from-violet-600 via-pink-400 to-pink-200 text-white rounded-full font-medium hover:shadow-xl transition text-sm tracking-wide shadow-sm"
              >
                Unlock Premium Features
              </button>
            )}
          </div>

          {showAddProfile && (
            <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-6 z-50">
              <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 max-w-md w-full shadow-2xl border border-white/10">
                <h2 className="text-2xl font-light mb-6 text-white">Add New Profile</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-medium mb-2 text-gray-400 tracking-wide">Name</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full px-4 py-3 rounded-2xl bg-white/5 border border-white/10 focus:border-pink-400 focus:outline-none text-white text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium mb-2 text-gray-400 tracking-wide">Birth Date</label>
                    <div className="grid grid-cols-3 gap-3">
                      <input
                        type="number"
                        placeholder="MM"
                        min="1"
                        max="12"
                        value={formData.birthMonth}
                        onChange={(e) => {
                          const value = parseInt(e.target.value);
                          if (e.target.value === '' || (value >= 1 && value <= 12)) {
                            setFormData({...formData, birthMonth: e.target.value});
                          }
                        }}
                        onBlur={(e) => {
                          const value = parseInt(e.target.value);
                          if (value < 1) setFormData({...formData, birthMonth: '1'});
                          if (value > 12) setFormData({...formData, birthMonth: '12'});
                        }}
                        className="px-4 py-3 rounded-2xl bg-white/5 border border-white/10 focus:border-pink-400 focus:outline-none text-white text-sm text-center"
                      />
                      <input
                        type="number"
                        placeholder="DD"
                        min="1"
                        max="31"
                        value={formData.birthDay}
                        onChange={(e) => {
                          const value = parseInt(e.target.value);
                          if (e.target.value === '' || (value >= 1 && value <= 31)) {
                            setFormData({...formData, birthDay: e.target.value});
                          }
                        }}
                        onBlur={(e) => {
                          const value = parseInt(e.target.value);
                          if (value < 1) setFormData({...formData, birthDay: '1'});
                          if (value > 31) setFormData({...formData, birthDay: '31'});
                        }}
                        className="px-4 py-3 rounded-2xl bg-white/5 border border-white/10 focus:border-pink-400 focus:outline-none text-white text-sm text-center"
                      />
                      <input
                        type="number"
                        placeholder="YYYY"
                        min="1900"
                        max="2025"
                        value={formData.birthYear}
                        onChange={(e) => {
                          const value = e.target.value;
                          if (value === '' || (value.length <= 4 && parseInt(value) >= 1900 && parseInt(value) <= 2025) || value.length < 4) {
                            setFormData({...formData, birthYear: value});
                          }
                        }}
                        onBlur={(e) => {
                          const value = parseInt(e.target.value);
                          if (value < 1900) setFormData({...formData, birthYear: '1900'});
                          if (value > 2025) setFormData({...formData, birthYear: '2025'});
                        }}
                        className="px-4 py-3 rounded-2xl bg-white/5 border border-white/10 focus:border-pink-400 focus:outline-none text-white text-sm text-center"
                      />
                    </div>
                  </div>
                  <div className="flex gap-3 pt-4">
                    <button
                      onClick={() => {
                        setShowAddProfile(false);
                        setFormData({ name: '', birthDay: '', birthMonth: '', birthYear: '' });
                      }}
                      className="flex-1 py-3 bg-white/10 hover:bg-white/15 border border-white/20 text-white rounded-full font-medium transition text-sm"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => {
                        handleCreateProfile();
                        setShowAddProfile(false);
                      }}
                      className="flex-1 py-3 bg-gradient-to-r from-violet-600 via-pink-400 to-pink-200 text-white rounded-full font-medium hover:shadow-xl transition text-sm shadow-sm"
                    >
                      Add Profile
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* PROFILE/SETTINGS MODAL */}
        {showProfile && (
          <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 overflow-y-auto">
            <div className="min-h-screen px-6 py-12">
              <div className="max-w-md mx-auto">
                {/* Header with Back Button */}
                <div className="flex items-center justify-between mb-8">
                  <button
                    onClick={() => {
                      setShowProfile(false);
                      setIsEditingProfile(false);
                    }}
                    className="flex items-center gap-2 text-gray-400 hover:text-white transition"
                  >
                    <span className="text-2xl">←</span>
                    <span className="text-sm">Back</span>
                  </button>
                  <h2 className="text-2xl font-light text-white">Profile</h2>
                  <button
                    onClick={() => {
                      localStorage.clear();
                      window.location.reload();
                    }}
                    className="text-xs text-red-400 hover:text-red-300 transition"
                  >
                    Reset
                  </button>
                </div>

                {/* Profile Info Card */}
                <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-6 border border-white/10 mb-6">
                  <div className="text-center mb-6">
                    {/* Avatar with change button */}
                    <div className="relative w-24 h-24 mx-auto mb-3">
                      <div className="w-full h-full rounded-full overflow-hidden border-2 border-white/20">
                        {(() => {
                          // Generate unique avatar based on user ID/name
                          const seed = currentUser.name + (currentUser.id || '') + (currentUser.avatarSeed || '');
                          const hash = seed.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
                          const colors = [
                            ['#8b5cf6', '#ec4899'], ['#3b82f6', '#06b6d4'], ['#10b981', '#059669'],
                            ['#f59e0b', '#f97316'], ['#ef4444', '#ec4899'], ['#6366f1', '#8b5cf6'],
                          ];
                          const colorPair = colors[hash % colors.length];
                          const eyeStyles = ['circle', 'oval', 'star'];
                          const eyeStyle = eyeStyles[hash % eyeStyles.length];
                          const mouthStyles = ['smile', 'neutral', 'happy'];
                          const mouthStyle = mouthStyles[(hash * 2) % mouthStyles.length];
                          
                          return (
                            <svg viewBox="0 0 100 100" className="w-full h-full">
                              <defs>
                                <linearGradient id={`avatar-grad-${hash}`} x1="0%" y1="0%" x2="100%" y2="100%">
                                  <stop offset="0%" stopColor={colorPair[0]} />
                                  <stop offset="100%" stopColor={colorPair[1]} />
                                </linearGradient>
                              </defs>
                              <circle cx="50" cy="50" r="40" fill={`url(#avatar-grad-${hash})`} opacity="0.9" />
                              {eyeStyle === 'circle' && (
                                <>
                                  <circle cx="38" cy="45" r="4" fill="white" />
                                  <circle cx="62" cy="45" r="4" fill="white" />
                                  <circle cx="38" cy="45" r="2" fill="#1e293b" />
                                  <circle cx="62" cy="45" r="2" fill="#1e293b" />
                                </>
                              )}
                              {eyeStyle === 'oval' && (
                                <>
                                  <ellipse cx="38" cy="45" rx="5" ry="3" fill="white" />
                                  <ellipse cx="62" cy="45" rx="5" ry="3" fill="white" />
                                  <circle cx="38" cy="45" r="2" fill="#1e293b" />
                                  <circle cx="62" cy="45" r="2" fill="#1e293b" />
                                </>
                              )}
                              {eyeStyle === 'star' && (
                                <>
                                  <path d="M 38 40 L 40 45 L 45 45 L 41 48 L 43 53 L 38 50 L 33 53 L 35 48 L 31 45 L 36 45 Z" fill="white" />
                                  <path d="M 62 40 L 64 45 L 69 45 L 65 48 L 67 53 L 62 50 L 57 53 L 59 48 L 55 45 L 60 45 Z" fill="white" />
                                </>
                              )}
                              {mouthStyle === 'smile' && (
                                <path d="M 35 60 Q 50 70 65 60" stroke="white" strokeWidth="3" fill="none" strokeLinecap="round" />
                              )}
                              {mouthStyle === 'neutral' && (
                                <line x1="38" y1="62" x2="62" y2="62" stroke="white" strokeWidth="3" strokeLinecap="round" />
                              )}
                              {mouthStyle === 'happy' && (
                                <path d="M 35 58 Q 50 68 65 58" stroke="white" strokeWidth="3" fill="none" strokeLinecap="round" />
                              )}
                              <circle cx="30" cy="55" r="5" fill="white" opacity="0.2" />
                              <circle cx="70" cy="55" r="5" fill="white" opacity="0.2" />
                              {(currentUser.birthNumber % 3 === 0) && (
                                <circle cx="50" cy="20" r="3" fill="white" opacity="0.8" />
                              )}
                              {(currentUser.birthNumber % 3 === 1) && (
                                <path d="M 50 15 L 52 22 L 48 22 Z" fill="white" opacity="0.8" />
                              )}
                              {(currentUser.birthNumber % 3 === 2) && (
                                <rect x="47" y="18" width="6" height="6" fill="white" opacity="0.8" rx="1" />
                              )}
                            </svg>
                          );
                        })()}
                      </div>
                      <button
                        onClick={() => {
                          const updatedProfiles = profiles.map((p, i) => 
                            i === currentProfileIndex ? {...p, avatarSeed: Date.now()} : p
                          );
                          setProfiles(updatedProfiles);
                        }}
                        className="absolute bottom-0 right-0 w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white text-xs hover:bg-purple-500 transition border-2 border-black/50"
                        title="Change avatar"
                      >
                        🎨
                      </button>
                    </div>
                    
                    {isEditingProfile ? (
                      <>
                        <input
                          type="text"
                          value={editName}
                          onChange={(e) => setEditName(e.target.value)}
                          className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-xl text-white text-center text-lg font-medium mb-2 focus:border-purple-400 focus:outline-none"
                          placeholder="Name"
                        />
                        <input
                          type="date"
                          value={editBirthDate}
                          onChange={(e) => setEditBirthDate(e.target.value)}
                          className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-xl text-white text-center text-sm mb-3 focus:border-purple-400 focus:outline-none"
                        />
                        <div className="flex gap-2 justify-center">
                          <button
                            onClick={() => {
                              if (!editName || !editBirthDate) return;
                              const [year, month, day] = editBirthDate.split('-');
                              const birthNumber = getBirthNumber(parseInt(day));
                              const lifePathNumber = getLifePathNumber(parseInt(day), parseInt(month), parseInt(year));
                              const nameNumber = getNameNumber(editName);
                              
                              const updatedProfiles = profiles.map((p, i) => 
                                i === currentProfileIndex ? {
                                  ...p,
                                  name: editName,
                                  birthDate: editBirthDate,
                                  birthNumber,
                                  lifePathNumber,
                                  nameNumber
                                } : p
                              );
                              setProfiles(updatedProfiles);
                              setIsEditingProfile(false);
                            }}
                            className="px-4 py-2 bg-purple-600 text-white rounded-full text-xs font-medium hover:bg-purple-500 transition"
                          >
                            Save
                          </button>
                          <button
                            onClick={() => {
                              setIsEditingProfile(false);
                              setEditName(currentUser.name);
                              setEditBirthDate(currentUser.birthDate);
                            }}
                            className="px-4 py-2 bg-white/10 text-gray-300 rounded-full text-xs font-medium hover:bg-white/15 transition"
                          >
                            Cancel
                          </button>
                        </div>
                      </>
                    ) : (
                      <>
                        <h3 className="text-xl font-medium text-white mb-1">{currentUser.name}</h3>
                        <p className="text-sm text-gray-400 mb-3">
                          {currentUser.birthDate ? (() => {
                            const [year, month, day] = currentUser.birthDate.split('-');
                            return new Date(parseInt(year), parseInt(month) - 1, parseInt(day)).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
                          })() : 'No birthday set'}
                        </p>
                        <button
                          onClick={() => {
                            setIsEditingProfile(true);
                            setEditName(currentUser.name);
                            setEditBirthDate(currentUser.birthDate);
                          }}
                          className="text-xs text-purple-400 hover:text-purple-300 transition"
                        >
                          Edit
                        </button>
                      </>
                    )}
                  </div>

                  {/* Core Numbers Summary */}
                  <div className="grid grid-cols-3 gap-3 mb-4">
                    <div className="bg-black/20 rounded-xl p-3 text-center">
                      <p className="text-xs text-gray-400 mb-1">Birth</p>
                      <p className="text-2xl font-bold text-rose-300">{currentUser.birthNumber}</p>
                    </div>
                    <div className="bg-black/20 rounded-xl p-3 text-center">
                      <p className="text-xs text-gray-400 mb-1">Life Path</p>
                      <p className="text-2xl font-bold text-purple-300">{currentUser.lifePathNumber}</p>
                    </div>
                    <div className="bg-black/20 rounded-xl p-3 text-center">
                      <p className="text-xs text-gray-400 mb-1">Name</p>
                      <p className="text-2xl font-bold text-cyan-300">{currentUser.nameNumber}</p>
                    </div>
                  </div>
                </div>

                {/* Contact Information */}
                <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-6 border border-white/10 mb-6">
                  <h4 className="text-sm font-semibold text-white mb-4">Contact Information</h4>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs text-gray-400 mb-2">Email</label>
                      <input
                        type="email"
                        value={currentUser.email || ''}
                        onChange={(e) => {
                          const updatedProfiles = profiles.map((p, i) => 
                            i === currentProfileIndex ? {...p, email: e.target.value} : p
                          );
                          setProfiles(updatedProfiles);
                        }}
                        placeholder="your@email.com"
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm placeholder-gray-500 focus:border-purple-400 focus:outline-none transition"
                      />
                    </div>

                    <div>
                      <label className="block text-xs text-gray-400 mb-2">Phone Number</label>
                      <input
                        type="tel"
                        value={currentUser.phone || ''}
                        onChange={(e) => {
                          const updatedProfiles = profiles.map((p, i) => 
                            i === currentProfileIndex ? {...p, phone: e.target.value} : p
                          );
                          setProfiles(updatedProfiles);
                        }}
                        placeholder="+1 (555) 123-4567"
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm placeholder-gray-500 focus:border-purple-400 focus:outline-none transition"
                      />
                    </div>
                  </div>
                </div>

                {/* Location */}
                <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-6 border border-white/10 mb-6">
                  <h4 className="text-sm font-semibold text-white mb-4">Location</h4>
                  
                  {currentUser.location ? (
                    <div className="bg-black/20 rounded-xl p-4 mb-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="text-white font-medium mb-1">{currentUser.location.city}</p>
                          <p className="text-xs text-gray-400">
                            {currentUser.location.lat.toFixed(4)}°, {currentUser.location.lng.toFixed(4)}°
                          </p>
                        </div>
                        <button
                          onClick={() => setShowLocationPrompt(true)}
                          className="text-xs text-purple-400 hover:text-purple-300"
                        >
                          Change
                        </button>
                      </div>
                    </div>
                  ) : (
                    <button
                      onClick={() => setShowLocationPrompt(true)}
                      className="w-full py-3 bg-purple-600/20 border border-purple-400/30 text-purple-300 rounded-xl text-sm font-medium hover:bg-purple-600/30 transition"
                    >
                      Set Location
                    </button>
                  )}
                  
                  <p className="text-xs text-gray-400 mt-2">
                    Required for accurate planetary hours and timing
                  </p>
                </div>

                {/* Account Actions */}
                <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-6 border border-white/10">
                  <h4 className="text-sm font-semibold text-white mb-4">Account</h4>
                  
                  <button
                    onClick={() => {
                      localStorage.clear();
                      window.location.reload();
                    }}
                    className="w-full py-3 bg-red-600/10 border border-red-400/30 text-red-300 rounded-xl text-sm font-medium hover:bg-red-600/20 transition"
                  >
                    Reset App & Return to Landing
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        <TabBar />

        {/* Location Prompt Modal Overlay */}
        {showLocationPrompt && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-6">
            <div className="bg-gradient-to-br from-purple-900/90 to-indigo-900/90 backdrop-blur-xl rounded-3xl p-8 max-w-md border border-purple-300/30 shadow-2xl">
              <h3 className="text-2xl font-bold text-white mb-3">📍 Set Your Location</h3>
              <p className="text-sm text-gray-300 mb-6 leading-relaxed">
                For accurate planetary hours, we calculate sunrise and sunset times for your location. 
                This is required for the Key of Solomon system.
              </p>
              
              {!showLocationForm ? (
                <div className="space-y-4">
                  <div>
                    <p className="text-xs text-gray-400 mb-3 text-center">Quick Select:</p>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        { name: 'Los Angeles', short: 'LA' },
                        { name: 'New York', short: 'NYC' },
                        { name: 'Chicago', short: 'CHI' },
                        { name: 'London', short: 'LON' },
                        { name: 'Tokyo', short: 'TYO' },
                        { name: 'Sydney', short: 'SYD' }
                      ].map(city => (
                        <button
                          key={city.short}
                          onClick={() => {
                            const location = findCityInDatabase(city.name);
                            if (location) {
                              const updatedProfiles = [...profiles];
                              updatedProfiles[currentProfileIndex] = {
                                ...currentUser,
                                location
                              };
                              setProfiles(updatedProfiles);
                              setShowLocationPrompt(false);
                            }
                          }}
                          className="px-4 py-2 bg-white/10 rounded-full text-white text-sm font-medium border border-white/20 hover:bg-white/20 transition hover:border-purple-400"
                        >
                          {city.short}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-white/10"></div>
                    </div>
                    <div className="relative flex justify-center text-xs">
                      <span className="bg-purple-900 px-2 text-gray-400">or</span>
                    </div>
                  </div>
                  
                  <button 
                    onClick={() => setShowLocationForm(true)}
                    className="w-full px-6 py-3 bg-gradient-to-r from-violet-600 to-purple-500 rounded-full text-white font-medium hover:shadow-lg transition"
                  >
                    🌍 Search Other City
                  </button>
                  
                  <button 
                    onClick={() => setShowLocationPrompt(false)}
                    className="w-full px-6 py-3 text-gray-400 text-sm hover:text-gray-300"
                  >
                    Skip for now
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="relative">
                    <input 
                      type="text"
                      placeholder="Type city name... (e.g., Miami, Boston, Paris)"
                      value={locationInput}
                      onChange={(e) => {
                        setLocationInput(e.target.value);
                      }}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && locationInput.trim()) {
                          e.preventDefault();
                          geocodeCity(locationInput.trim());
                        }
                      }}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-400"
                      autoFocus
                    />
                    
                    {/* Autocomplete suggestions */}
                    {locationInput.length >= 2 && (() => {
                      const matches = Object.keys(cityDatabase)
                        .filter(key => key.includes(locationInput.toLowerCase()))
                        .slice(0, 5);
                      
                      if (matches.length > 0) {
                        return (
                          <div className="absolute top-full mt-2 w-full bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 overflow-hidden z-10">
                            {matches.map(key => {
                              const city = cityDatabase[key];
                              return (
                                <button
                                  key={key}
                                  onClick={() => {
                                    const updatedProfiles = [...profiles];
                                    updatedProfiles[currentProfileIndex] = {
                                      ...currentUser,
                                      location: city
                                    };
                                    setProfiles(updatedProfiles);
                                    setShowLocationPrompt(false);
                                    setShowLocationForm(false);
                                    setLocationInput('');
                                  }}
                                  className="w-full px-4 py-3 text-left text-white hover:bg-white/10 transition border-b border-white/10 last:border-b-0"
                                >
                                  <span className="font-medium">{city.city}</span>
                                  <span className="text-xs text-gray-400 ml-2">({key})</span>
                                </button>
                              );
                            })}
                          </div>
                        );
                      }
                    })()}
                  </div>
                  
                  <button 
                    onClick={() => {
                      console.log('Button clicked, input:', locationInput);
                      if (locationInput.trim()) {
                        geocodeCity(locationInput.trim());
                      }
                    }}
                    className="w-full px-6 py-3 bg-gradient-to-r from-violet-600 to-purple-500 rounded-full text-white font-medium hover:shadow-lg transition disabled:opacity-50"
                    disabled={!locationInput.trim()}
                  >
                    Set Location
                  </button>
                  
                  <button 
                    onClick={() => {
                      setShowLocationForm(false);
                      setLocationInput('');
                    }}
                    className="w-full px-6 py-3 text-gray-400 text-sm hover:text-gray-300"
                  >
                    ← Back
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    );
  }

  if (currentUser && activeTab === 'friends') {
    const compatibility = selectedFriend 
      ? getCompatibilityAnalysis(currentUser.lifePathNumber, selectedFriend.lifePathNumber)
      : null;

    return (
      <div className="min-h-screen relative overflow-hidden pb-20 tab-content">
        <OrganicBackground />
        <div className="max-w-2xl mx-auto px-3 relative z-10">
          
          {/* Share Success Message - Floating */}
          {shareMessage && (
            <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 px-6 py-3 bg-green-500/90 backdrop-blur-xl border border-green-400/50 rounded-full shadow-2xl">
              <p className="text-sm text-white font-medium">{shareMessage}</p>
            </div>
          )}
          
          <div className="mb-8 pt-6">
            {friends.length === 0 ? (
              <>
                <h1 className="text-3xl font-bold mb-2 text-white tracking-tight" style={{letterSpacing: '-0.02em'}}>
                  Build Your Energy Field
                </h1>
                <p className="text-gray-400 text-sm font-light tracking-wide" style={{letterSpacing: '0.01em'}}>
                  Add friends' birthdays to see them orbit around you in this cosmic map. Each connection expands your energetic field.
                </p>
              </>
            ) : (
              <>
                <div className="flex justify-between items-start mb-2">
                  <h1 className="text-3xl font-light text-white tracking-tight" style={{letterSpacing: '-0.02em'}}>
                    Friends & Connections
                  </h1>
                  <div className="flex gap-2">
                    <button 
                      className="px-4 py-2 bg-gradient-to-r from-violet-600 to-purple-500 rounded-full text-white text-xs font-medium hover:shadow-lg transition flex items-center gap-1"
                      onClick={async () => {
                        const shareText = `${currentUser.name} — ${numberProfiles[currentUser.lifePathNumber].title}\nLife Path ${currentUser.lifePathNumber}\n\n${friends.length} ${friends.length === 1 ? 'connection' : 'connections'} in my numerology network.\n\nExplore the ancient wisdom of Cheiro's numerology.\nzythorus.app`;
                        
                        try {
                          if (navigator.share) {
                            await navigator.share({
                              title: 'My Numerology Network',
                              text: shareText
                            });
                            setShareMessage('✨ Network map shared!');
                            setTimeout(() => setShareMessage(''), 3000);
                            return;
                          }
                        } catch (err) {}
                        
                        try {
                          await navigator.clipboard.writeText(shareText);
                          setShareMessage('✨ Network link copied! Share it anywhere.');
                          setTimeout(() => setShareMessage(''), 4000);
                        } catch (err) {
                          const textArea = document.createElement('textarea');
                          textArea.value = shareText;
                          textArea.style.position = 'fixed';
                          textArea.style.left = '-999999px';
                          document.body.appendChild(textArea);
                          textArea.select();
                          try {
                            document.execCommand('copy');
                            setShareMessage('✨ Copied! Share with friends.');
                            setTimeout(() => setShareMessage(''), 4000);
                          } catch (e) {
                            setShareMessage('❌ Could not copy.');
                            setTimeout(() => setShareMessage(''), 3000);
                          }
                          document.body.removeChild(textArea);
                        }
                      }}
                    >
                      <Users className="w-3 h-3" />
                      Share Map
                    </button>
                  </div>
                </div>
                <p className="text-gray-400 text-sm font-light tracking-wide" style={{letterSpacing: '0.01em'}}>
                  Interactive 3D network visualization
                </p>
              </>
            )}
          </div>



          {/* Energy Network Visualization */}
          {friends.length > 0 && (
            <div className="mb-6 relative">
              {/* Spacey background */}
              <div className="rounded-3xl overflow-hidden relative" style={{
                background: 'radial-gradient(ellipse at center, rgba(88, 28, 135, 0.25) 0%, rgba(17, 24, 39, 0.5) 60%, rgba(0, 0, 0, 0.7) 100%)',
                minHeight: '500px',
                padding: '60px 24px'
              }}>
                {/* Enhanced star field */}
                <div className="absolute inset-0 pointer-events-none opacity-40">
                  {[...Array(60)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute rounded-full bg-white"
                      style={{
                        width: `${Math.random() * 2 + 1}px`,
                        height: `${Math.random() * 2 + 1}px`,
                        top: `${Math.random() * 100}%`,
                        left: `${Math.random() * 100}%`,
                        opacity: Math.random() * 0.7 + 0.3,
                        animation: `twinkle ${Math.random() * 3 + 2}s infinite`,
                        animationDelay: `${Math.random() * 2}s`
                      }}
                    />
                  ))}
                </div>
                
                <style>{`
                  @keyframes twinkle {
                    0%, 100% { opacity: 0.3; }
                    50% { opacity: 1; }
                  }
                `}</style>
                
                {/* Network Graph Visualization */}
                <NetworkGraph friends={friends} currentUser={currentUser} />
              </div>
              
              <p className="text-center text-xs text-gray-400 mt-4 font-light">
                Hover over nodes to explore connections • Click to view full compatibility
              </p>
            </div>
          )}

          {/* Preview of energy field when no friends added yet */}
          {friends.length === 0 && (
            <div className="mb-6 relative">
              {/* Spacey background - same style as with friends */}
              <div className="rounded-3xl overflow-hidden relative" style={{
                background: 'radial-gradient(ellipse at center, rgba(88, 28, 135, 0.25) 0%, rgba(17, 24, 39, 0.5) 60%, rgba(0, 0, 0, 0.7) 100%)',
                minHeight: '500px',
                padding: '60px 24px'
              }}>
                {/* Enhanced star field */}
                <div className="absolute inset-0 pointer-events-none opacity-40">
                  {[...Array(60)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute rounded-full bg-white"
                      style={{
                        width: `${Math.random() * 2 + 1}px`,
                        height: `${Math.random() * 2 + 1}px`,
                        top: `${Math.random() * 100}%`,
                        left: `${Math.random() * 100}%`,
                        opacity: Math.random() * 0.7 + 0.3,
                        animation: `twinkle ${Math.random() * 3 + 2}s infinite`,
                        animationDelay: `${Math.random() * 2}s`
                      }}
                    />
                  ))}
                </div>
                
                {/* Circular orbit container */}
                <div className="relative mx-auto" style={{ width: '400px', height: '400px' }}>
                  {/* Faint orbit ring */}
                  <div className="absolute inset-0 rounded-full" style={{
                    border: '1px dashed rgba(139, 92, 246, 0.2)',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '280px',
                    height: '280px'
                  }} />
                  
                  {/* Large ethereal bubble */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none" style={{
                    width: '350px',
                    height: '350px',
                    background: 'radial-gradient(ellipse at center, rgba(139, 92, 246, 0.08) 0%, rgba(167, 139, 250, 0.05) 40%, transparent 70%)',
                    border: '1px solid rgba(167, 139, 250, 0.15)',
                    borderRadius: '45% 55% 52% 48% / 48% 45% 55% 52%',
                    filter: 'blur(1px)',
                    opacity: 0.6
                  }} />
                  
                  {/* Nebula cloud effect behind center */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none" style={{
                    width: '200px',
                    height: '200px',
                    background: 'radial-gradient(circle, rgba(139, 92, 246, 0.3) 0%, rgba(139, 92, 246, 0.1) 40%, transparent 70%)',
                    filter: 'blur(30px)'
                  }} />
                  
                  {/* User in center - SUN */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
                    <div className="relative group cursor-default">
                      {/* Outer glow */}
                      <div className="absolute inset-0 rounded-full animate-pulse" style={{
                        width: '100px',
                        height: '100px',
                        left: '50%',
                        top: '50%',
                        transform: 'translate(-50%, -50%)',
                        background: 'radial-gradient(circle, rgba(167, 139, 250, 0.4) 0%, transparent 70%)',
                        filter: 'blur(20px)'
                      }} />
                      
                      {/* Main sphere */}
                      <div className="relative w-24 h-24 bg-gradient-to-br from-violet-300 via-purple-400 to-violet-500 rounded-full flex items-center justify-center" style={{
                        boxShadow: '0 0 40px rgba(167, 139, 250, 0.6), 0 0 80px rgba(139, 92, 246, 0.4), inset 0 0 20px rgba(255, 255, 255, 0.3)'
                      }}>
                        <span className="text-white text-3xl font-bold drop-shadow-lg">{currentUser.lifePathNumber}</span>
                      </div>
                      
                      <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                        <span className="text-sm font-bold text-white tracking-widest drop-shadow-lg">YOU</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Selected Friend Compatibility */}
          {selectedFriend && compatibility && (
            <div className="mb-6 bg-white/5 backdrop-blur-xl rounded-3xl p-6 border border-white/10 shadow-sm">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-medium text-white">Compatibility Analysis</h3>
                <button
                  onClick={() => setSelectedFriend(null)}
                  className="text-xs text-gray-400 hover:text-gray-300"
                >
                  Close
                </button>
              </div>

              {/* Friend's Core Numbers with Calculations */}
              <div className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 backdrop-blur-xl rounded-2xl p-4 border border-cyan-400/20 mb-5">
                <h4 className="text-sm font-semibold text-cyan-300 mb-3">{selectedFriend.name}'s Core Numbers</h4>
                
                <div className="grid grid-cols-3 gap-3 mb-3">
                  <div className="text-center">
                    <div className="w-12 h-12 mx-auto bg-gradient-to-br from-rose-400/20 to-pink-500/20 rounded-xl flex items-center justify-center mb-1 border border-rose-400/30">
                      <span className="text-xl font-bold text-rose-300">{selectedFriend.birthNumber}</span>
                    </div>
                    <p className="text-[10px] text-gray-400">Birth</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 mx-auto bg-gradient-to-br from-purple-400/20 to-violet-500/20 rounded-xl flex items-center justify-center mb-1 border border-purple-400/30">
                      <span className="text-xl font-bold text-purple-300">{selectedFriend.lifePathNumber}</span>
                    </div>
                    <p className="text-[10px] text-gray-400">Life Path</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 mx-auto bg-gradient-to-br from-cyan-400/20 to-blue-500/20 rounded-xl flex items-center justify-center mb-1 border border-cyan-400/30">
                      <span className="text-xl font-bold text-cyan-300">{selectedFriend.nameNumber}</span>
                    </div>
                    <p className="text-[10px] text-gray-400">Name</p>
                  </div>
                </div>

                {/* Calculations */}
                <div className="space-y-2">
                  {/* Birth Calculation */}
                  <div className="bg-black/20 rounded-xl p-2 border border-white/10">
                    <p className="text-[9px] text-gray-400 uppercase tracking-wider mb-0.5">Birth</p>
                    <p className="text-[10px] text-white font-mono">
                      Day {(() => {
                        const [year, month, day] = selectedFriend.birthDate.split('-');
                        const birthDay = parseInt(day);
                        if (birthDay > 9 && ![11, 22, 33].includes(birthDay)) {
                          return `${birthDay} → ${Math.floor(birthDay / 10)} + ${birthDay % 10} = ${selectedFriend.birthNumber}`;
                        }
                        return `${birthDay}`;
                      })()}
                    </p>
                  </div>

                  {/* Life Path Calculation */}
                  <div className="bg-black/20 rounded-xl p-2 border border-white/10">
                    <p className="text-[9px] text-gray-400 uppercase tracking-wider mb-0.5">Life Path</p>
                    <p className="text-[10px] text-white font-mono">
                      {(() => {
                        const [year, month, day] = selectedFriend.birthDate.split('-');
                        const birthDay = parseInt(day);
                        const birthMonth = parseInt(month);
                        const birthYear = parseInt(year);
                        
                        const daySum = birthDay > 9 && ![11, 22, 33].includes(birthDay) 
                          ? Math.floor(birthDay / 10) + (birthDay % 10) 
                          : birthDay;
                        
                        const yearDigits = birthYear.toString().split('').map(Number);
                        const yearSum = yearDigits.reduce((a, b) => a + b, 0);
                        const yearReduced = yearSum > 9 && ![11, 22, 33].includes(yearSum)
                          ? Math.floor(yearSum / 10) + (yearSum % 10)
                          : yearSum;
                        
                        const totalSum = birthMonth + daySum + yearReduced;
                        
                        return `${birthMonth} + ${daySum} + ${yearReduced} = ${totalSum}${totalSum > 9 && ![11, 22, 33].includes(totalSum) ? ` → ${selectedFriend.lifePathNumber}` : ''}`;
                      })()}
                    </p>
                  </div>

                  {/* Name Calculation */}
                  <div className="bg-black/20 rounded-xl p-2 border border-white/10">
                    <p className="text-[9px] text-gray-400 uppercase tracking-wider mb-0.5">Name</p>
                    <p className="text-[10px] text-white font-mono break-all">
                      {(() => {
                        const chaldeanMap = {
                          'A': 1, 'I': 1, 'J': 1, 'Q': 1, 'Y': 1,
                          'B': 2, 'K': 2, 'R': 2,
                          'C': 3, 'G': 3, 'L': 3, 'S': 3,
                          'D': 4, 'M': 4, 'T': 4,
                          'E': 5, 'H': 5, 'N': 5, 'X': 5,
                          'U': 6, 'V': 6, 'W': 6,
                          'O': 7, 'Z': 7,
                          'F': 8, 'P': 8
                        };
                        
                        const nameParts = selectedFriend.name.trim().split(/\s+/);
                        const nameBreakdown = nameParts.map(part => {
                          const letters = part.toUpperCase().replace(/[^A-Z]/g, '').split('');
                          const values = letters.map(l => chaldeanMap[l] || 0);
                          return values.reduce((a, b) => a + b, 0);
                        });
                        
                        const totalSum = nameBreakdown.reduce((a, b) => a + b, 0);
                        
                        if (nameParts.length === 1) {
                          return `${nameParts[0].toUpperCase()} = ${totalSum}${totalSum > 9 && ![11, 22, 33].includes(totalSum) ? ` → ${selectedFriend.nameNumber}` : ''}`;
                        } else {
                          return `${nameBreakdown.join(' + ')} = ${totalSum}${totalSum > 9 && ![11, 22, 33].includes(totalSum) ? ` → ${selectedFriend.nameNumber}` : ''}`;
                        }
                      })()}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-center gap-4 mb-5">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-violet-500 to-purple-500 rounded-full flex items-center justify-center mb-2 shadow-lg">
                    <span className="text-white text-xl font-light">{currentUser.lifePathNumber}</span>
                  </div>
                  <p className="text-xs text-gray-300 font-light">{currentUser.name}</p>
                  <p className="text-[10px] text-gray-400">{numberProfiles[currentUser.lifePathNumber].title}</p>
                </div>
                
                <div className="flex flex-col items-center">
                  <Heart className={`w-8 h-8 bg-gradient-to-r ${getEnergyColor(compatibility.score)} bg-clip-text text-transparent`} fill="currentColor" />
                  <div className={`mt-2 px-3 py-1 bg-gradient-to-r ${getEnergyColor(compatibility.score)} rounded-full shadow-sm`}>
                    <span className="text-white text-xs font-medium">{compatibility.score}%</span>
                  </div>
                </div>

                <div className="text-center">
                  <div className={`w-16 h-16 bg-gradient-to-br ${getEnergyColor(compatibility.score)} rounded-full flex items-center justify-center mb-2 shadow-lg`}>
                    <span className="text-white text-xl font-light">{selectedFriend.lifePathNumber}</span>
                  </div>
                  <p className="text-xs text-gray-300 font-light">{selectedFriend.name}</p>
                  <p className="text-[10px] text-gray-400">{numberProfiles[selectedFriend.lifePathNumber].title}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-4 border border-white/10">
                  <h4 className="font-medium text-white mb-2 text-sm">{compatibility.verdict}</h4>
                  <p className="text-xs text-gray-300 font-light leading-relaxed">{compatibility.energy}</p>
                </div>
                
                <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-4 border border-white/10">
                  <h4 className="font-medium text-white mb-2 text-sm">Strengths</h4>
                  <p className="text-xs text-gray-300 font-light leading-relaxed">{compatibility.strengths}</p>
                </div>
                
                <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-4 border border-white/10">
                  <h4 className="font-medium text-white mb-2 text-sm">Challenges</h4>
                  <p className="text-xs text-gray-300 font-light leading-relaxed">{compatibility.challenges}</p>
                </div>
                
                <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-4 border border-white/10">
                  <h4 className="font-medium text-white mb-2 text-sm">Guidance</h4>
                  <p className="text-xs text-gray-300 font-light leading-relaxed">{compatibility.advice}</p>
                </div>
              </div>

              {!isPremium && (
                <div className="mt-4 p-4 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-lg">✨</span>
                    <h4 className="font-medium text-white text-sm">Unlock Deep Compatibility</h4>
                  </div>
                  <p className="text-xs text-gray-300 font-light mb-3">
                    Get detailed analysis including best communication times, shared challenges, and monthly compatibility forecasts.
                  </p>
                  <button
                    onClick={() => setActiveTab('shop')}
                    className="w-full py-2 bg-violet-600 text-white rounded-full text-xs font-medium hover:bg-violet-700 transition shadow-sm"
                  >
                    Unlock Premium
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Pattern Insights Section */}
          {friends.length >= 1 && (() => {
            const patterns = detectNetworkPatterns(currentUser, friends);
            if (!patterns) return null;

            return (
              <div className="mb-6 space-y-4">
                {/* Discovered Patterns */}
                {patterns.insights.length > 0 && (
                  <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-6 border border-white/10">
                    <h3 className="text-base font-medium text-white mb-4 flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-pink-400" />
                      Pattern Discoveries
                    </h3>
                    <div className="space-y-3">
                      {patterns.insights.map((insight, idx) => (
                        <div key={idx} className="bg-white/5 rounded-2xl p-4 border border-white/10">
                          <h4 className="text-sm font-medium text-white mb-2">{insight.title}</h4>
                          <p className="text-xs text-gray-300 font-light leading-relaxed mb-3">
                            {insight.description}
                          </p>
                          {insight.shareable && (
                            <button className="text-xs text-purple-400 hover:text-purple-300 font-light flex items-center gap-1">
                              <Sparkles className="w-3 h-3" />
                              Share this discovery
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Triangles & Clusters */}
                {(patterns.triangles.length > 0 || patterns.clusters.length > 0) && (
                  <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-6 border border-white/10">
                    <h3 className="text-base font-medium text-white mb-4">Network Structures</h3>
                    <div className="space-y-3">
                      {patterns.triangles.map((triangle, idx) => (
                        <div key={idx} className="bg-gradient-to-r from-violet-600/10 to-purple-500/10 rounded-2xl p-4 border border-purple-300/20">
                          <div className="flex items-start gap-3">
                            <span className="text-2xl">{triangle.icon}</span>
                            <div className="flex-1">
                              <h4 className="text-sm font-medium text-white mb-1">{triangle.type}</h4>
                              <p className="text-xs text-gray-300 font-light mb-2">{triangle.description}</p>
                              <div className="flex gap-2 mb-2">
                                {triangle.members.map((member, i) => (
                                  <div key={i} className="flex items-center gap-1 bg-white/10 rounded-full px-2 py-1">
                                    <span className="text-xs font-medium text-white">{member.name.split(' ')[0]}</span>
                                    <span className="text-xs text-gray-300">({member.lifePathNumber})</span>
                                  </div>
                                ))}
                              </div>
                              <p className="text-xs text-purple-300 font-light italic">{triangle.rarity}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                      
                      {patterns.clusters.map((cluster, idx) => (
                        <div key={idx} className="bg-white/5 rounded-2xl p-4 border border-white/10">
                          <div className="flex items-start gap-3">
                            <span className="text-2xl">{cluster.icon}</span>
                            <div>
                              <h4 className="text-sm font-medium text-white mb-1">
                                {cluster.ruling} Cluster
                              </h4>
                              <p className="text-xs text-gray-300 font-light">{cluster.description}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })()}

          {/* Friends List */}
          {friends.length > 0 && (
            <div className="space-y-3 mb-6">
              <h3 className="text-sm font-medium text-white">Your Friends</h3>
              {friends.map(friend => {
                const compat = getCompatibilityAnalysis(currentUser.lifePathNumber, friend.lifePathNumber);
                const friendProfile = numberProfiles[friend.lifePathNumber];
                
                return (
                  <div key={friend.id} className="bg-white/5 backdrop-blur-xl rounded-3xl p-5 border border-white/10 shadow-sm">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex gap-3">
                        <div className={`w-12 h-12 bg-gradient-to-br ${getEnergyColor(compat.score)} rounded-full flex items-center justify-center flex-shrink-0 shadow-md`}>
                          <span className="text-white text-lg font-light">{friend.lifePathNumber}</span>
                        </div>
                        <div>
                          <h4 className="text-base font-medium text-white">{friend.name}</h4>
                          {friend.relationship && (
                            <p className="text-xs text-pink-400 font-light mb-0.5">{friend.relationship}</p>
                          )}
                          <p className="text-xs text-gray-400 font-light">
                            Life Path {friend.lifePathNumber}: {friendProfile.title}
                          </p>
                          <div className="flex items-center gap-2 mt-1">
                            <div className={`h-1.5 w-16 bg-gradient-to-r ${getEnergyColor(compat.score)} rounded-full`}></div>
                            <span className="text-xs text-gray-300 font-light">{compat.score}% compatible</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEditFriend(friend)}
                          className="text-xs text-blue-400 hover:text-blue-300 px-2 py-1"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => setFriends(friends.filter(f => f.id !== friend.id))}
                          className="text-xs text-gray-400 hover:text-gray-300 px-2 py-1"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                    
                    <button
                      onClick={() => setSelectedFriend(friend)}
                      className="w-full py-2.5 bg-violet-600 text-white rounded-full text-xs font-medium hover:bg-violet-700 transition shadow-sm"
                    >
                      See Detailed Compatibility
                    </button>
                  </div>
                );
              })}
            </div>
          )}

          {/* Add Friend Section */}
          <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-6 border border-white/10 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <Users className="w-5 h-5 text-pink-400" />
              <h3 className="text-base font-medium text-white">
                {editingFriend ? 'Edit Friend' : 'Add Friend'}
              </h3>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium mb-2 text-gray-400 tracking-wide">Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-4 py-3 rounded-2xl bg-white/5 border border-white/10 focus:border-pink-400 focus:outline-none text-white text-sm"
                  placeholder="Friend's name"
                />
              </div>
              
              <div>
                <label className="block text-xs font-medium mb-2 text-gray-400 tracking-wide">Relationship</label>
                <select
                  value={formData.relationship}
                  onChange={(e) => setFormData({...formData, relationship: e.target.value})}
                  className="w-full px-4 py-3 rounded-2xl bg-white/5 border border-white/10 focus:border-pink-400 focus:outline-none text-white text-sm"
                >
                  <option value="" className="bg-gray-900">Select relationship...</option>
                  <option value="Friend" className="bg-gray-900">Friend</option>
                  <option value="Best Friend" className="bg-gray-900">Best Friend</option>
                  <option value="Partner" className="bg-gray-900">Partner</option>
                  <option value="Spouse" className="bg-gray-900">Spouse</option>
                  <option value="Mother" className="bg-gray-900">Mother</option>
                  <option value="Father" className="bg-gray-900">Father</option>
                  <option value="Sister" className="bg-gray-900">Sister</option>
                  <option value="Brother" className="bg-gray-900">Brother</option>
                  <option value="Child" className="bg-gray-900">Child</option>
                  <option value="Boss" className="bg-gray-900">Boss</option>
                  <option value="Co-worker" className="bg-gray-900">Co-worker</option>
                  <option value="Acquaintance" className="bg-gray-900">Acquaintance</option>
                  <option value="Other" className="bg-gray-900">Other</option>
                </select>
              </div>
              
              <div>
                <label className="block text-xs font-medium mb-2 text-gray-300 uppercase tracking-wider">Birth Date</label>
                <div className="grid grid-cols-3 gap-3">
                  <input
                    type="number"
                    placeholder="MM"
                    min="1"
                    max="12"
                    value={formData.birthMonth}
                    onChange={(e) => {
                      const value = parseInt(e.target.value);
                      if (e.target.value === '' || (value >= 1 && value <= 12)) {
                        setFormData({...formData, birthMonth: e.target.value});
                      }
                    }}
                    onBlur={(e) => {
                      const value = parseInt(e.target.value);
                      if (value < 1) setFormData({...formData, birthMonth: '1'});
                      if (value > 12) setFormData({...formData, birthMonth: '12'});
                    }}
                    className="px-4 py-3 rounded-2xl bg-white/5 border border-white/10 focus:border-pink-400 focus:outline-none text-white text-sm text-center"
                  />
                  <input
                    type="number"
                    placeholder="DD"
                    min="1"
                    max="31"
                    value={formData.birthDay}
                    onChange={(e) => {
                      const value = parseInt(e.target.value);
                      if (e.target.value === '' || (value >= 1 && value <= 31)) {
                        setFormData({...formData, birthDay: e.target.value});
                      }
                    }}
                    onBlur={(e) => {
                      const value = parseInt(e.target.value);
                      if (value < 1) setFormData({...formData, birthDay: '1'});
                      if (value > 31) setFormData({...formData, birthDay: '31'});
                    }}
                    className="px-4 py-3 rounded-2xl bg-white/5 border border-white/10 focus:border-pink-400 focus:outline-none text-white text-sm text-center"
                  />
                  <input
                    type="number"
                    placeholder="YYYY"
                    min="1900"
                    max="2025"
                    value={formData.birthYear}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (value === '' || (value.length <= 4 && parseInt(value) >= 1900 && parseInt(value) <= 2025) || value.length < 4) {
                        setFormData({...formData, birthYear: value});
                      }
                    }}
                    onBlur={(e) => {
                      const value = parseInt(e.target.value);
                      if (value < 1900) setFormData({...formData, birthYear: '1900'});
                      if (value > 2025) setFormData({...formData, birthYear: '2025'});
                    }}
                    className="px-4 py-3 rounded-2xl bg-white/5 border border-white/10 focus:border-pink-400 focus:outline-none text-white text-sm text-center"
                  />
                </div>
              </div>
              
              {editingFriend ? (
                <div className="flex gap-3">
                  <button
                    onClick={handleUpdateFriend}
                    className="flex-1 py-3 bg-gradient-to-r from-violet-500 to-purple-500 text-white rounded-full font-medium hover:from-violet-600 hover:to-purple-600 transition text-sm shadow-sm"
                  >
                    Update Friend
                  </button>
                  <button
                    onClick={handleCancelEdit}
                    className="flex-1 py-3 bg-white/10 text-white rounded-full font-medium hover:bg-white/20 transition text-sm"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <button
                  onClick={handleAddFriend}
                  className="w-full py-3 bg-gradient-to-r from-violet-500 to-purple-500 text-white rounded-full font-medium hover:from-violet-600 hover:to-purple-600 transition text-sm shadow-sm"
                >
                  Add Friend
                </button>
              )}
            </div>
          </div>

          {/* The Numerology Experiment Banner - Moved to bottom */}
          {friends.length >= 1 && (
            <div className="mt-6 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 backdrop-blur-xl rounded-3xl p-5 border border-indigo-300/30">
              <div className="flex items-start gap-3">
                <div className="text-3xl">🔬</div>
                <div className="flex-1">
                  <h3 className="text-sm font-bold text-white mb-1">The Great Numerology Experiment</h3>
                  <p className="text-xs text-gray-300 font-light leading-relaxed mb-3">
                    Help validate Cheiro's 1926 predictions with modern data. Your network contributes to the largest numerology study ever conducted.
                  </p>
                  <div className="flex gap-4 text-xs">
                    <div>
                      <span className="text-purple-300 font-medium">12,847</span>
                      <span className="text-gray-400 ml-1">connections analyzed</span>
                    </div>
                    <div>
                      <span className="text-purple-300 font-medium">68%</span>
                      <span className="text-gray-400 ml-1">match predictions</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Top Compatible Friends - Moved to Bottom */}
          {friends.length >= 2 && (() => {
            const rankedFriends = friends
              .map(friend => ({
                ...friend,
                compatibility: getCompatibilityAnalysis(currentUser.lifePathNumber, friend.lifePathNumber)
              }))
              .sort((a, b) => b.compatibility.score - a.compatibility.score)
              .slice(0, 5);

            // Helper function to get compatibility icon based on score
            const getCompatIcon = (score) => {
              if (score >= 75) {
                return { icon: '✓', color: `rgba(16, 185, 129, ${0.5 + (score - 75) / 50})`, bg: `rgba(16, 185, 129, ${0.1 + (score - 75) / 150})` }; // Bright green
              } else if (score >= 60) {
                return { icon: '✓', color: `rgba(132, 204, 22, ${0.5 + (score - 60) / 50})`, bg: `rgba(132, 204, 22, ${0.1 + (score - 60) / 150})` }; // Lime
              } else if (score >= 50) {
                return { icon: '~', color: 'rgba(251, 191, 36, 0.8)', bg: 'rgba(251, 191, 36, 0.15)' }; // Yellow
              } else {
                return { icon: '✕', color: 'rgba(239, 68, 68, 0.8)', bg: 'rgba(239, 68, 68, 0.15)' }; // Red
              }
            };

            return (
              <div className="mb-6 bg-white/5 backdrop-blur-xl rounded-3xl p-6 border border-white/10">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-base font-medium text-white flex items-center gap-2">
                    <Heart className="w-5 h-5 text-pink-400" />
                    Your Top {Math.min(friends.length, 5)} Most Compatible
                  </h3>
                </div>
                <div className="space-y-2">
                  {rankedFriends.map((friend, idx) => {
                    const compatIcon = getCompatIcon(friend.compatibility.score);
                    return (
                      <div key={friend.id} className="bg-white/5 rounded-2xl p-3 border border-white/10 flex items-center gap-3">
                        <div 
                          className="flex items-center justify-center w-8 h-8 rounded-full flex-shrink-0"
                          style={{ backgroundColor: compatIcon.bg }}
                        >
                          <span 
                            className="font-bold text-lg"
                            style={{ color: compatIcon.color }}
                          >
                            {compatIcon.icon}
                          </span>
                        </div>
                        <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${getEnergyColor(friend.compatibility.score)} flex items-center justify-center flex-shrink-0`}>
                          <span className="text-white font-bold text-sm">{friend.lifePathNumber}</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-white truncate">{friend.name}</p>
                          <p className="text-xs text-gray-400 font-light">{friend.compatibility.verdict}</p>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <p className="text-lg font-bold text-white">{friend.compatibility.score}%</p>
                          <p className="text-xs text-gray-400">match</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })()}

          {/* Share Section */}
          <div className="mt-6 bg-white/5 backdrop-blur-xl rounded-3xl p-6 border border-white/10 shadow-sm">
            <h3 className="text-sm font-medium mb-3 text-white">Invite Friends to Your Network</h3>
            <p className="text-xs text-gray-300 font-light mb-4">
              Share your numerology profile and invite friends to add their numbers
            </p>
            <button
              onClick={async () => {
                const shareText = `${currentUser.name}\n\nLife Path ${currentUser.lifePathNumber} — ${numberProfiles[currentUser.lifePathNumber].title}\nBirth Number ${currentUser.birthNumber}\nName Number ${currentUser.nameNumber}\n\nDiscover your own numerology profile and explore our compatibility.\n\nBased on Cheiro's Book of Numbers (1926)\nzythorus.app`;
                
                try {
                  if (navigator.share) {
                    await navigator.share({
                      title: 'Discover Your Numerology',
                      text: shareText
                    });
                    setShareMessage('✨ Shared successfully!');
                    setTimeout(() => setShareMessage(''), 3000);
                    return;
                  }
                } catch (err) {}
                
                try {
                  await navigator.clipboard.writeText(shareText);
                  setShareMessage('✨ Copied to clipboard! Paste to share with friends.');
                  setTimeout(() => setShareMessage(''), 4000);
                } catch (err) {
                  const textArea = document.createElement('textarea');
                  textArea.value = shareText;
                  textArea.style.position = 'fixed';
                  textArea.style.left = '-999999px';
                  document.body.appendChild(textArea);
                  textArea.select();
                  try {
                    document.execCommand('copy');
                    setShareMessage('✨ Copied! Paste to share with friends.');
                    setTimeout(() => setShareMessage(''), 4000);
                  } catch (e) {
                    setShareMessage('❌ Could not copy. Please try again.');
                    setTimeout(() => setShareMessage(''), 3000);
                  }
                  document.body.removeChild(textArea);
                }
              }}
              className="w-full py-3 bg-gradient-to-r from-violet-600 via-purple-500 to-pink-500 text-white rounded-full font-medium hover:shadow-xl transition text-sm flex items-center justify-center gap-2"
            >
              <Users className="w-4 h-4" />
              Invite Friends
            </button>
            
            <div className="mt-4 p-3 bg-white/5 rounded-2xl border border-white/10">
              <p className="text-[10px] text-gray-400 font-light text-center">
                💡 Your friends can add their numbers and you'll both see your compatibility!
              </p>
            </div>
          </div>
        </div>
        <TabBar />
      </div>
    );
  }

  if (currentUser && activeTab === 'oracle') {
    const examplePrompts = [
      "I've been seeing the number 3 everywhere today",
      "What does it mean when I keep seeing 11:11?",
      "Should I start my business on the 8th or 22nd?",
      "Why do I keep seeing 7s?",
      "What's the significance of my Life Path number?"
    ];

    // Audio-Visualizer Style Bars
    const AudioVisualizer = ({ isActive = false }) => {
      return (
        <div className="flex items-end gap-1 h-8">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className={`w-1 bg-gradient-to-t from-purple-500 to-cyan-400 rounded-full transition-all ${
                isActive ? 'animate-pulse' : ''
              }`}
              style={{
                height: isActive ? `${20 + Math.random() * 80}%` : '20%',
                animationDuration: `${0.5 + i * 0.2}s`,
                animationDelay: `${i * 0.1}s`
              }}
            />
          ))}
        </div>
      );
    };

    // Floating Mystical Symbols
    const FloatingSymbols = () => {
      const symbols = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '∞', '◊', '△', '○'];
      return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {symbols.map((symbol, i) => (
            <div
              key={i}
              className="absolute text-purple-400/20 font-bold"
              style={{
                left: `${(i * 7.7) % 100}%`,
                top: `${(i * 13) % 100}%`,
                fontSize: `${16 + (i % 3) * 8}px`,
                animation: `floatSymbol ${10 + i * 2}s ease-in-out infinite`,
                animationDelay: `${i * 0.5}s`
              }}
            >
              {symbol}
            </div>
          ))}
        </div>
      );
    };

    // Holographic Scan Lines
    const HolographicOverlay = () => {
      return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div 
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(139, 92, 246, 0.1) 2px, rgba(139, 92, 246, 0.1) 4px)',
              animation: 'scanlines 8s linear infinite'
            }}
          />
        </div>
      );
    };

    // Animated Oracle Avatar Component
    const OracleAvatar = ({ isThinking = false, isLarge = false }) => {
      const [pulse, setPulse] = React.useState(0);
      
      React.useEffect(() => {
        const interval = setInterval(() => {
          setPulse(p => (p + 1) % 100);
        }, 50);
        return () => clearInterval(interval);
      }, []);

      const size = isLarge ? 'w-32 h-32' : 'w-20 h-20';

      return (
        <div className={`relative ${size} flex-shrink-0`}>
          {/* Pulsing energy rings when thinking */}
          {isThinking && (
            <>
              <div 
                className="absolute inset-0 rounded-full border-2 border-purple-400 animate-ping"
                style={{ animationDuration: '2s' }}
              />
              <div 
                className="absolute inset-0 rounded-full border border-cyan-400 animate-ping"
                style={{ animationDuration: '3s', animationDelay: '0.5s' }}
              />
              <div 
                className="absolute inset-0 rounded-full border border-pink-400 animate-ping"
                style={{ animationDuration: '2.5s', animationDelay: '1s' }}
              />
            </>
          )}
          
          {/* Ethereal glow */}
          <div 
            className="absolute inset-0 blur-2xl opacity-60 animate-pulse"
            style={{
              background: 'radial-gradient(circle, rgba(139, 92, 246, 0.8), rgba(96, 165, 250, 0.5), transparent)',
              animationDuration: '3s'
            }}
          />

          {/* Orbital Ring */}
          {isThinking && (
            <div className="absolute inset-0 rounded-full border-2 border-purple-400/30" style={{
              animation: 'spin 4s linear infinite'
            }}>
              <div className="absolute top-0 left-1/2 w-2 h-2 bg-cyan-400 rounded-full -translate-x-1/2 -translate-y-1/2" />
              <div className="absolute bottom-0 left-1/2 w-2 h-2 bg-pink-400 rounded-full -translate-x-1/2 translate-y-1/2" />
            </div>
          )}

          {/* Alien Avatar SVG - Compact */}
          <svg className="w-full h-full relative z-10" viewBox="0 0 300 300" style={{filter: 'drop-shadow(0 0 8px rgba(139, 92, 246, 0.8))'}}>
            <defs>
              <linearGradient id={`holographic-oracle-${isLarge ? 'large' : 'small'}`} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#60a5fa" />
                <stop offset="25%" stopColor="#8b5cf6" />
                <stop offset="50%" stopColor="#ec4899" />
                <stop offset="75%" stopColor="#f59e0b" />
                <stop offset="100%" stopColor="#10b981" />
              </linearGradient>
              <linearGradient id={`alien-skin-oracle-${isLarge ? 'large' : 'small'}`} x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#60a5fa" />
                <stop offset="50%" stopColor="#3b82f6" />
                <stop offset="100%" stopColor="#1e40af" />
              </linearGradient>
            </defs>

            {/* ALIEN HEAD */}
            <path 
              d="M 150 75 L 110 95 L 95 130 L 110 165 L 150 180 L 190 165 L 205 130 L 190 95 Z"
              fill={`url(#alien-skin-oracle-${isLarge ? 'large' : 'small'})`}
              opacity="0.9"
            />
            <path 
              d="M 150 85 L 120 100 L 110 125 L 120 150 L 150 165 L 180 150 L 190 125 L 180 100 Z"
              fill="#93c5fd"
              opacity="0.2"
            />

            {/* EYES - Animated */}
            <path d="M 130 120 L 125 123 L 130 128 L 137 123 Z" fill="#0f172a" />
            <ellipse cx="130" cy="123" rx="3" ry="2" fill="#60a5fa" opacity={isThinking ? "1" : "0.8"}>
              {isThinking && <animate attributeName="opacity" values="0.8;1;0.8" dur="1s" repeatCount="indefinite" />}
            </ellipse>
            <circle cx="129" cy="122" r="1" fill="#f0f9ff" />
            
            <path d="M 170 120 L 175 123 L 170 128 L 163 123 Z" fill="#0f172a" />
            <ellipse cx="170" cy="123" rx="3" ry="2" fill="#60a5fa" opacity={isThinking ? "1" : "0.8"}>
              {isThinking && <animate attributeName="opacity" values="0.8;1;0.8" dur="1s" repeatCount="indefinite" />}
            </ellipse>
            <circle cx="171" cy="122" r="1" fill="#f0f9ff" />

            {/* CROWN */}
            <path d="M 100 85 Q 150 55 200 85" stroke={`url(#holographic-oracle-${isLarge ? 'large' : 'small'})`} strokeWidth="3" fill="none" opacity="0.7" />
            <circle cx="150" cy="55" r="6" fill={`url(#holographic-oracle-${isLarge ? 'large' : 'small'})`} opacity="0.8">
              {isThinking && <animate attributeName="r" values="6;8;6" dur="2s" repeatCount="indefinite" />}
            </circle>
            <circle cx="150" cy="55" r="9" fill="none" stroke="#60a5fa" strokeWidth="1" opacity="0.6" />
            <circle cx="125" cy="70" r="4" fill="#f59e0b" opacity="0.7" />
            <circle cx="175" cy="70" r="4" fill="#10b981" opacity="0.7" />

            {/* FLOATING ELEMENTS - Animated */}
            <circle cx="85" cy="115" r="6" fill="none" stroke={`url(#holographic-oracle-${isLarge ? 'large' : 'small'})`} strokeWidth="1.5" opacity="0.5">
              <animateTransform attributeName="transform" type="rotate" from="0 85 115" to="360 85 115" dur="8s" repeatCount="indefinite" />
            </circle>
            <circle cx="215" cy="115" r="6" fill="none" stroke={`url(#holographic-oracle-${isLarge ? 'large' : 'small'})`} strokeWidth="1.5" opacity="0.5">
              <animateTransform attributeName="transform" type="rotate" from="360 215 115" to="0 215 115" dur="8s" repeatCount="indefinite" />
            </circle>
          </svg>
        </div>
      );
    };

    return (
      <div className="min-h-screen relative overflow-hidden pb-20 tab-content">
        <OrganicBackground />
        
        {/* Floating symbols */}
        <FloatingSymbols />

        {/* Holographic scan lines */}
        <HolographicOverlay />
        
        {/* Floating particles */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${2 + Math.random() * 4}px`,
                height: `${2 + Math.random() * 4}px`,
                background: `radial-gradient(circle, ${
                  i % 3 === 0 ? 'rgba(139, 92, 246, 0.6)' :
                  i % 3 === 1 ? 'rgba(96, 165, 250, 0.6)' :
                  'rgba(236, 72, 153, 0.6)'
                }, transparent)`,
                animation: `oracleFloat ${5 + Math.random() * 10}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 5}s`,
                boxShadow: `0 0 ${4 + Math.random() * 8}px ${
                  i % 3 === 0 ? 'rgba(139, 92, 246, 0.8)' :
                  i % 3 === 1 ? 'rgba(96, 165, 250, 0.8)' :
                  'rgba(236, 72, 153, 0.8)'
                }`
              }}
            />
          ))}
        </div>

        <div className="max-w-2xl mx-auto px-3 relative z-10">
          <div className="mb-6 pt-6 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-light mb-2 text-white tracking-tight" style={{letterSpacing: '-0.02em'}}>Cheiro Oracle</h1>
              <p className="text-gray-400 text-sm font-light tracking-wide" style={{letterSpacing: '0.01em'}}>Ancient wisdom for modern decisions</p>
            </div>
            <AudioVisualizer isActive={isTyping} />
          </div>

          <div className="bg-black/40 backdrop-blur-2xl rounded-3xl border border-purple-500/30 shadow-2xl overflow-hidden relative" style={{height: 'calc(100vh - 280px)'}}>
            {/* Inner holographic effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-cyan-500/5 pointer-events-none" />
            
            <div className="flex-1 overflow-y-auto p-6 space-y-6 relative z-10" style={{height: 'calc(100% - 100px)'}}>
              {chatMessages.length === 0 && (
                <div className="text-center py-8">
                  {/* Large Oracle Avatar with extra effects */}
                  <div className="flex justify-center mb-6 relative">
                    {/* Rotating outer ring */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-40 h-40 rounded-full border-2 border-purple-400/20 animate-spin" style={{animationDuration: '20s'}}>
                        <div className="absolute top-0 left-1/2 w-3 h-3 bg-cyan-400 rounded-full -translate-x-1/2 -translate-y-1/2 shadow-lg shadow-cyan-400" />
                        <div className="absolute right-0 top-1/2 w-3 h-3 bg-pink-400 rounded-full translate-x-1/2 -translate-y-1/2 shadow-lg shadow-pink-400" />
                        <div className="absolute bottom-0 left-1/2 w-3 h-3 bg-purple-400 rounded-full -translate-x-1/2 translate-y-1/2 shadow-lg shadow-purple-400" />
                        <div className="absolute left-0 top-1/2 w-3 h-3 bg-yellow-400 rounded-full -translate-x-1/2 -translate-y-1/2 shadow-lg shadow-yellow-400" />
                      </div>
                    </div>
                    <OracleAvatar isLarge={true} />
                  </div>

                  <p className="text-white text-lg mb-2 font-medium">I am the Oracle</p>
                  <p className="text-gray-400 text-sm mb-8 font-light max-w-md mx-auto">Ask me about the numbers appearing in your life, decisions you're facing, or guidance for your path.</p>
                  
                  <div className="space-y-2 max-w-sm mx-auto">
                    <p className="text-xs text-purple-400 uppercase tracking-widest font-medium mb-4">Try asking...</p>
                    {examplePrompts.slice(0, 3).map((prompt, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          setChatInput(prompt);
                          setTimeout(() => sendChatMessage(), 100);
                        }}
                        className="w-full text-left px-4 py-3 bg-white/5 backdrop-blur-sm rounded-2xl border border-purple-500/20 hover:border-purple-400 hover:bg-white/10 transition-all text-sm text-gray-300 group hover:scale-105 duration-300"
                      >
                        <span className="group-hover:text-white transition-colors">"{prompt}"</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
              
              {chatMessages.map((msg, idx) => (
                <div key={idx} className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'} ${idx === chatMessages.length - 1 ? 'animate-fadeInUp' : ''}`}>
                  {msg.role === 'assistant' && (
                    <OracleAvatar isThinking={false} />
                  )}
                  <div className={`max-w-[75%] ${
                    msg.role === 'user' 
                      ? 'bg-gradient-to-br from-violet-600/80 to-purple-600/80 backdrop-blur-xl border border-purple-400/30' 
                      : 'bg-black/40 backdrop-blur-xl border border-purple-500/30'
                  } p-4 rounded-3xl shadow-lg hover:shadow-purple-500/20 transition-shadow duration-300`}>
                    <p className="text-sm text-white font-light leading-relaxed whitespace-pre-line">{msg.content}</p>
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex gap-3 justify-start animate-fadeInUp">
                  <OracleAvatar isThinking={true} />
                  <div className="bg-black/40 backdrop-blur-xl border border-purple-500/30 p-4 rounded-3xl">
                    <div className="flex items-center gap-3">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{animationDelay: '0ms'}}></div>
                        <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{animationDelay: '150ms'}}></div>
                        <div className="w-2 h-2 bg-pink-400 rounded-full animate-bounce" style={{animationDelay: '300ms'}}></div>
                      </div>
                      <p className="text-sm text-gray-400 font-light">Consulting the ancient patterns...</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="p-4 border-t border-purple-500/20 bg-black/30 backdrop-blur-xl relative z-10">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && sendChatMessage()}
                  placeholder="Ask the Oracle..."
                  className="flex-1 px-5 py-3 rounded-full bg-white/5 border border-purple-500/30 focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-500/20 text-white placeholder-gray-500 transition-all backdrop-blur-sm text-sm"
                />
                <button
                  onClick={sendChatMessage}
                  disabled={!chatInput.trim() || isTyping}
                  className="px-6 py-3 bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-full hover:from-violet-500 hover:to-purple-500 transition-all font-medium text-sm disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-purple-500/50 hover:scale-105 duration-300"
                >
                  <Sparkles className="w-4 h-4" />
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-2 text-center font-light">
                Your essence: Birth {currentUser.birthNumber} • Life Path {currentUser.lifePathNumber} • Name {currentUser.nameNumber}
              </p>
            </div>
          </div>

          {/* Premium Upgrade Section */}
          {!isPremium && (
            <div className="mt-6 bg-gradient-to-br from-violet-600/10 to-purple-500/10 backdrop-blur-xl rounded-3xl p-6 border-2 border-pink-500/30">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-violet-600/30 to-purple-500/30 rounded-full flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-6 h-6 text-pink-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-1">Unlock Unlimited Oracle Access</h3>
                  <p className="text-sm text-gray-300 font-light">Get instant AI-powered guidance whenever you need it</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-3 mb-5">
                <div className="bg-white/5 rounded-2xl p-3 border border-white/10">
                  <p className="text-xs text-pink-400 font-semibold mb-1">✨ Unlimited Questions</p>
                  <p className="text-xs text-gray-400 font-light">Ask Cheiro anything, anytime</p>
                </div>
                <div className="bg-white/5 rounded-2xl p-3 border border-white/10">
                  <p className="text-xs text-purple-400 font-semibold mb-1">📅 Daily Guidance</p>
                  <p className="text-xs text-gray-400 font-light">Personalized daily readings</p>
                </div>
                <div className="bg-white/5 rounded-2xl p-3 border border-white/10">
                  <p className="text-xs text-blue-400 font-semibold mb-1">💎 Deep Analysis</p>
                  <p className="text-xs text-gray-400 font-light">Compound number meanings</p>
                </div>
                <div className="bg-white/5 rounded-2xl p-3 border border-white/10">
                  <p className="text-xs text-amber-400 font-semibold mb-1">🔮 Future Insights</p>
                  <p className="text-xs text-gray-400 font-light">Monthly forecasts</p>
                </div>
              </div>

              <div className="flex items-baseline gap-2 mb-4">
                <span className="text-3xl font-bold text-white">$9.99</span>
                <span className="text-gray-300 text-sm font-light">/month</span>
                <span className="ml-auto bg-pink-500/20 text-pink-300 px-3 py-1 rounded-full text-xs font-semibold">7-day free trial</span>
              </div>

              <button
                onClick={() => {
                  setIsPremium(true);
                  alert('✨ Premium Activated! (Demo Mode)\n\nOracle is now unlocked with unlimited access.');
                }}
                className="w-full py-4 bg-gradient-to-r from-violet-600 via-pink-400 to-pink-200 text-white rounded-full font-semibold text-sm hover:shadow-xl transition-all"
              >
                Start Free Trial
              </button>
              <p className="text-xs text-center text-gray-400 mt-3 font-light">
                Demo mode • No payment required
              </p>
            </div>
          )}
        </div>
        <TabBar />

        <style>{`
          @keyframes oracleFloat {
            0%, 100% { transform: translateY(0px) translateX(0px); opacity: 0.3; }
            25% { transform: translateY(-30px) translateX(20px); opacity: 0.8; }
            50% { transform: translateY(-60px) translateX(-10px); opacity: 0.5; }
            75% { transform: translateY(-30px) translateX(15px); opacity: 0.7; }
          }
          @keyframes floatSymbol {
            0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.2; }
            50% { transform: translateY(-50px) rotate(180deg); opacity: 0.4; }
          }
          @keyframes scanlines {
            0% { transform: translateY(0); }
            100% { transform: translateY(4px); }
          }
          @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fadeInUp {
            animation: fadeInUp 0.5s ease-out;
          }
        `}</style>
      </div>
    );
  }

  // LEARN TAB
  if (currentUser && activeTab === 'learn') {
    return (
      <div className="min-h-screen relative overflow-hidden pb-20 tab-content">
        <OrganicBackground />
        <div className="max-w-2xl mx-auto px-3 relative z-10">
          <div className="mb-8 pt-6">
            <h1 className="text-3xl font-light mb-2 text-white tracking-tight" style={{letterSpacing: '-0.02em'}}>Numerology Guide</h1>
            <p className="text-gray-400 text-sm font-light tracking-wide" style={{letterSpacing: '0.01em'}}>Understanding the language of numbers</p>
          </div>

          {/* ALL SECTIONS - COLLAPSIBLE */}
          <div className="space-y-4">
          
          {/* 1-9 MEANINGS SECTION */}
          <div className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 overflow-hidden">
            <button
              onClick={() => setCollapsedSections({...collapsedSections, meanings: !collapsedSections.meanings})}
              className="w-full flex items-center justify-between p-5 hover:bg-white/10 transition"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-violet-600 to-purple-500 rounded-xl flex items-center justify-center shadow-lg">
                  <Hash className="w-5 h-5 text-white" />
                </div>
                <div className="text-left">
                  <h3 className="text-lg font-semibold text-white">1-9 Meanings</h3>
                  <p className="text-xs text-gray-400">Core number personalities & traits</p>
                </div>
              </div>
              <div className={`transition-transform duration-300 ${collapsedSections.meanings ? '' : 'rotate-180'}`}>
                <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </button>
            
            {!collapsedSections.meanings && (
              <div className="p-5 pt-0">
                <div className="space-y-5">
                  {[1,2,3,4,5,6,7,8,9].map(num => {
                const profile = numberProfiles[num];
                const colorSchemes = {
                  1: { from: 'from-red-500', to: 'to-orange-500', glow: 'shadow-red-500/50', text: 'text-red-400', border: 'border-red-400/30' },
                  2: { from: 'from-blue-500', to: 'to-cyan-500', glow: 'shadow-blue-500/50', text: 'text-blue-400', border: 'border-blue-400/30' },
                  3: { from: 'from-purple-500', to: 'to-pink-500', glow: 'shadow-purple-500/50', text: 'text-purple-400', border: 'border-purple-400/30' },
                  4: { from: 'from-green-500', to: 'to-emerald-500', glow: 'shadow-green-500/50', text: 'text-green-400', border: 'border-green-400/30' },
                  5: { from: 'from-yellow-500', to: 'to-amber-500', glow: 'shadow-yellow-500/50', text: 'text-yellow-400', border: 'border-yellow-400/30' },
                  6: { from: 'from-pink-500', to: 'to-rose-500', glow: 'shadow-pink-500/50', text: 'text-pink-400', border: 'border-pink-400/30' },
                  7: { from: 'from-indigo-500', to: 'to-purple-500', glow: 'shadow-indigo-500/50', text: 'text-indigo-400', border: 'border-indigo-400/30' },
                  8: { from: 'from-slate-500', to: 'to-gray-600', glow: 'shadow-slate-500/50', text: 'text-slate-400', border: 'border-slate-400/30' },
                  9: { from: 'from-amber-600', to: 'to-red-600', glow: 'shadow-amber-500/50', text: 'text-amber-400', border: 'border-amber-400/30' }
                };
                const colors = colorSchemes[num];
                
                // Clean personality text - remove asterisks
                const cleanPersonality = profile.personality.replace(/\*\*/g, '');
                const cleanStrengths = profile.strengths.replace(/\*\*/g, '');
                const cleanChallenges = profile.challenges.replace(/\*\*/g, '');
                
                return (
                  <div 
                    key={num} 
                    className={`relative bg-gradient-to-br ${colors.from}/10 ${colors.to}/10 backdrop-blur-xl rounded-3xl p-6 border ${colors.border} shadow-2xl ${colors.glow} hover:scale-[1.02] transition-all duration-300 overflow-hidden`}
                  >
                    {/* Glow effect */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${colors.from}/5 ${colors.to}/5 blur-2xl`}></div>
                    
                    <div className="relative">
                      {/* Header */}
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-4">
                          <div className={`w-20 h-20 rounded-2xl flex items-center justify-center bg-gradient-to-br ${colors.from} ${colors.to} shadow-xl`}>
                            <span className="text-5xl font-black text-white drop-shadow-lg">{num}</span>
                          </div>
                          <div className="flex-1">
                            <h3 className="text-2xl font-black text-white mb-1">{profile.title}</h3>
                            <div className="flex items-center gap-2">
                              <p className={`text-sm ${colors.text} font-semibold`}>☉ {profile.ruling}</p>
                              {profile.gender && (
                                <span className={`px-2 py-0.5 bg-gradient-to-r ${colors.from}/20 ${colors.to}/20 rounded-full border ${colors.border} text-[10px] font-bold ${colors.text} uppercase tracking-wider`}>
                                  {profile.gender === 'Masculine' ? '⚹ Masculine' : profile.gender === 'Feminine' ? '⚸ Feminine' : '⚬ Neutral'}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Personality */}
                      <p className="text-sm text-gray-200 mb-4 leading-relaxed">
                        {cleanPersonality}
                      </p>
                      
                      {/* Kabbalah Insight */}
                      <div className="bg-gradient-to-r from-amber-500/10 to-yellow-500/10 rounded-2xl p-3 mb-4 border border-amber-400/20">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-amber-400 text-sm">✡</span>
                          <p className="text-amber-300 font-semibold text-xs uppercase tracking-wider">Kabbalah</p>
                        </div>
                        <p className="text-gray-200 text-xs italic">{profile.kabbalah}</p>
                      </div>
                      
                      {/* Strengths & Challenges */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div className="bg-emerald-500/10 rounded-2xl p-4 border border-emerald-400/30 backdrop-blur-sm">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-lg">✓</span>
                            <p className="text-emerald-300 font-bold text-sm">Strengths</p>
                          </div>
                          <p className="text-gray-300 text-xs leading-relaxed">{cleanStrengths}</p>
                        </div>
                        
                        <div className="bg-red-500/10 rounded-2xl p-4 border border-red-400/30 backdrop-blur-sm">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-lg">⚠</span>
                            <p className="text-red-300 font-bold text-sm">Challenges</p>
                          </div>
                          <p className="text-gray-300 text-xs leading-relaxed">{cleanChallenges}</p>
                        </div>
                      </div>
                      
                      {/* Colors & Days */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
                        <div className="bg-black/20 rounded-xl p-3 border border-white/10">
                          <p className={`text-[10px] ${colors.text} font-bold mb-1 uppercase tracking-wider`}>Lucky Colors</p>
                          <p className="text-gray-300 text-xs">{profile.colors}</p>
                        </div>
                        <div className="bg-black/20 rounded-xl p-3 border border-white/10">
                          <p className={`text-[10px] ${colors.text} font-bold mb-1 uppercase tracking-wider`}>Best Days</p>
                          <p className="text-gray-300 text-xs">{profile.bestDays}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* NUMBER TYPES SECTION */}
          <div className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 overflow-hidden">
            <button
              onClick={() => setCollapsedSections({...collapsedSections, types: !collapsedSections.types})}
              className="w-full flex items-center justify-between p-5 hover:bg-white/10 transition"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-pink-600 to-rose-500 rounded-xl flex items-center justify-center shadow-lg">
                  <Calendar className="w-5 h-5 text-white" />
                </div>
                <div className="text-left">
                  <h3 className="text-lg font-semibold text-white">Number Types</h3>
                  <p className="text-xs text-gray-400">Birth, Life Path & Name explained</p>
                </div>
              </div>
              <div className={`transition-transform duration-300 ${collapsedSections.types ? '' : 'rotate-180'}`}>
                <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </button>
            
            {!collapsedSections.types && (
              <div className="p-5 pt-0">
                <div className="space-y-4">
              {/* Birth Number */}
              <div className="bg-gradient-to-br from-rose-500/10 via-pink-500/10 to-rose-500/10 backdrop-blur-xl rounded-3xl p-6 border border-rose-400/20 shadow-2xl relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-rose-500/5 to-transparent"></div>
                <div className="relative">
                  <div className="flex items-center gap-3 mb-4">
                    <Calendar className="w-8 h-8 text-rose-400" />
                    <h3 className="text-xl font-bold text-white">Birth Number</h3>
                  </div>
                  <p className="text-sm text-gray-300 mb-4 leading-relaxed">
                    Your Birth Number is the day you were born, reduced to a single digit (unless it's 11, 22, or 33). This represents your natural essence, innate personality traits, and core characteristics. It's who you are at your most fundamental level.
                  </p>
                  <div className="bg-black/20 rounded-xl p-3 border border-rose-400/20">
                    <p className="text-xs text-rose-300 mb-1 font-semibold">Example Calculation</p>
                    <p className="text-xs text-white font-mono">Born on 16th → 1 + 6 = 7</p>
                  </div>
                </div>
              </div>

              {/* Life Path */}
              <div className="bg-gradient-to-br from-purple-500/10 via-violet-500/10 to-purple-500/10 backdrop-blur-xl rounded-3xl p-6 border border-purple-400/20 shadow-2xl relative overflow-hidden">
                <div className="absolute top-2 right-2 px-3 py-1 bg-purple-600/30 rounded-full border border-purple-400/40 backdrop-blur-sm">
                  <span className="text-[10px] font-bold text-purple-200 uppercase tracking-wider">Most Important</span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent"></div>
                <div className="relative">
                  <div className="flex items-center gap-3 mb-4">
                    <TrendingUp className="w-8 h-8 text-purple-400" />
                    <h3 className="text-xl font-bold text-white">Life Path Number</h3>
                  </div>
                  <p className="text-sm text-gray-300 mb-4 leading-relaxed">
                    The Life Path Number is calculated from your complete birth date and represents your soul's journey, destiny, and life purpose. This is considered the most important number in Cheiro's system - it shows the path you're meant to walk.
                  </p>
                  <div className="bg-black/20 rounded-xl p-3 border border-purple-400/20">
                    <p className="text-xs text-purple-300 mb-1 font-semibold">Example Calculation</p>
                    <p className="text-xs text-white font-mono">11/16/1990 → 11 + 7 + 19 = 37 → 3 + 7 = 10 → 1 + 0 = 1</p>
                  </div>
                </div>
              </div>

              {/* Name Number */}
              <div className="bg-gradient-to-br from-cyan-500/10 via-blue-500/10 to-cyan-500/10 backdrop-blur-xl rounded-3xl p-6 border border-cyan-400/20 shadow-2xl relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent"></div>
                <div className="relative">
                  <div className="flex items-center gap-3 mb-4">
                    <User className="w-8 h-8 text-cyan-400" />
                    <h3 className="text-xl font-bold text-white">Name Number</h3>
                  </div>
                  <p className="text-sm text-gray-300 mb-4 leading-relaxed">
                    Your Name Number (also called Expression Number) is calculated using the Chaldean system from your full name. It represents how you express yourself in the world, your social behavior, and how others perceive you.
                  </p>
                  <div className="bg-black/20 rounded-xl p-3 border border-cyan-400/20 mb-3">
                    <p className="text-xs text-cyan-300 mb-1 font-semibold">Example Calculation</p>
                    <p className="text-xs text-white font-mono">JOHN = J(1) + O(7) + H(5) + N(5) = 18 → 1 + 8 = 9</p>
                  </div>
                  <div className="bg-cyan-500/10 rounded-xl p-3 border border-cyan-400/20">
                    <p className="text-xs text-cyan-300 mb-1 font-semibold">💡 Name Changes</p>
                    <p className="text-xs text-gray-300">If you change your name (marriage, adoption, chosen name), your Name Number changes too. Many people calculate for both their birth name and current name.</p>
                  </div>
                </div>
              </div>

              {/* Summary */}
              <div className="bg-gradient-to-br from-slate-700/10 to-slate-600/10 backdrop-blur-xl rounded-3xl p-6 border border-slate-400/20">
                <h3 className="text-lg font-bold text-white mb-3">The Trinity</h3>
                <div className="space-y-2 text-sm text-gray-300">
                  <p><span className="text-rose-400 font-semibold">Birth:</span> Who you are inside (core nature)</p>
                  <p><span className="text-purple-400 font-semibold">Life Path:</span> Where you're going (destiny & purpose)</p>
                  <p><span className="text-cyan-400 font-semibold">Name:</span> How you show up (expression & persona)</p>
                </div>
              </div>
                </div>
              </div>
            )}
          </div>

          {/* MASTER NUMBERS SECTION */}
          <div className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 overflow-hidden">
            <button
              onClick={() => setCollapsedSections({...collapsedSections, master: !collapsedSections.master})}
              className="w-full flex items-center justify-between p-5 hover:bg-white/10 transition"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-amber-600 to-yellow-500 rounded-xl flex items-center justify-center shadow-lg">
                  <span className="text-white text-xl">👑</span>
                </div>
                <div className="text-left">
                  <h3 className="text-lg font-semibold text-white">Master Numbers</h3>
                  <p className="text-xs text-gray-400">11, 22, 33 - Rare spiritual paths</p>
                </div>
              </div>
              <div className={`transition-transform duration-300 ${collapsedSections.master ? '' : 'rotate-180'}`}>
                <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </button>
            
            {!collapsedSections.master && (
              <div className="p-5 pt-0">
                <div className="space-y-6">
              {/* Hero */}
              <div className="bg-gradient-to-br from-amber-500/20 via-yellow-500/20 to-amber-500/20 backdrop-blur-xl rounded-3xl p-8 border border-amber-400/30 shadow-2xl text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(251,191,36,0.1),transparent_70%)]"></div>
                <div className="relative">
                  <div className="text-5xl mb-3 animate-pulse" style={{animationDuration: '3s'}}>👑</div>
                  <h2 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-200 to-amber-200 mb-2 uppercase tracking-wider">
                    The Divine Trinity
                  </h2>
                  <p className="text-gray-300 text-sm">These are not ordinary numbers. They carry the weight of cosmic assignment.</p>
                </div>
              </div>

              {/* 11 */}
              <div className="relative">
                <div className="absolute inset-0 blur-3xl opacity-30 bg-gradient-to-br from-slate-400 to-zinc-500" style={{width: '100%', height: '100%'}}></div>
                <div className="absolute inset-0 blur-2xl opacity-20 animate-ping" style={{animationDuration: '4s', width: '100%', height: '100%', background: 'radial-gradient(circle, rgba(148,163,184,0.4), transparent)'}}></div>
                <div className="relative bg-gradient-to-br from-slate-500/20 via-zinc-500/20 to-slate-600/20 backdrop-blur-xl rounded-3xl p-6 border border-slate-400/30 shadow-2xl">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-slate-300 to-zinc-400">11</div>
                    <div>
                      <h3 className="text-xl font-bold text-white">The Illuminator</h3>
                      <p className="text-xs text-gray-400">Master Number</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-300 mb-4 leading-relaxed">
                    Those with 11 can pierce the veil between worlds. You channel divine revelation and inspire through spiritual insight. Your nervous system is hypersensitive - you feel what others cannot.
                  </p>
                  <div className="bg-black/30 rounded-xl p-3 mb-3">
                    <p className="text-xs text-slate-300 font-semibold mb-2">Famous 11s</p>
                    <p className="text-xs text-gray-400">Barack Obama, Prince, Edgar Allan Poe, Oprah Winfrey</p>
                  </div>
                </div>
              </div>

              {/* 22 */}
              <div className="relative">
                <div className="absolute inset-0 blur-3xl opacity-40 bg-gradient-to-br from-amber-500 to-yellow-600" style={{width: '100%', height: '100%'}}></div>
                <div className="absolute inset-0 blur-2xl opacity-25 animate-ping" style={{animationDuration: '4s', width: '100%', height: '100%', background: 'radial-gradient(circle, rgba(245,158,11,0.5), transparent)'}}></div>
                <div className="relative bg-gradient-to-br from-amber-500/20 via-yellow-500/20 to-amber-600/20 backdrop-blur-xl rounded-3xl p-6 border border-amber-400/40 shadow-2xl">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-yellow-400">22</div>
                    <div>
                      <h3 className="text-xl font-bold text-white">The Master Builder</h3>
                      <p className="text-xs text-gray-400">Master Number</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-300 mb-4 leading-relaxed">
                    22 is the materialization of the impossible. You take visions and manifest them into physical reality on a grand scale. You don't just dream - you architect heaven on earth.
                  </p>
                  <div className="bg-black/30 rounded-xl p-3 mb-3">
                    <p className="text-xs text-amber-300 font-semibold mb-2">Famous 22s</p>
                    <p className="text-xs text-gray-400">Steven Spielberg, Jay-Z, Donald Trump, Will Smith</p>
                  </div>
                </div>
              </div>

              {/* 33 */}
              <div className="relative">
                <div className="absolute inset-0 blur-3xl opacity-40 bg-gradient-to-br from-emerald-500 to-teal-600" style={{width: '100%', height: '100%'}}></div>
                <div className="absolute inset-0 blur-2xl opacity-25 animate-ping" style={{animationDuration: '4s', width: '100%', height: '100%', background: 'radial-gradient(circle, rgba(16,185,129,0.5), transparent)'}}></div>
                <div className="relative bg-gradient-to-br from-emerald-500/20 via-teal-500/20 to-emerald-600/20 backdrop-blur-xl rounded-3xl p-6 border border-emerald-400/40 shadow-2xl">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-teal-400">33</div>
                      <div>
                        <h3 className="text-xl font-bold text-white">The Ascended Master</h3>
                        <p className="text-xs text-gray-400">Master Number</p>
                      </div>
                    </div>
                    <div className="px-3 py-1 bg-emerald-600/30 rounded-full border border-emerald-400/40 backdrop-blur-sm">
                      <span className="text-[10px] font-bold text-emerald-200 uppercase tracking-wider">Only 1-2% of Humanity</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-300 mb-4 leading-relaxed">
                    The rarest frequency. 33 is Christos consciousness - you carry the burden of unconditional love and selfless service. These are ascended souls who chose to return to uplift humanity.
                  </p>
                  <div className="bg-black/30 rounded-xl p-4 mb-3">
                    <p className="text-xs text-emerald-300 font-semibold mb-2">Famous 33s</p>
                    <div className="grid grid-cols-3 gap-2 text-[10px] text-gray-400">
                      <p>Mother Teresa</p>
                      <p>Dalai Lama</p>
                      <p>Gandhi</p>
                      <p>John Lennon</p>
                      <p>Paul McCartney</p>
                      <p>FDR</p>
                      <p>Louis Pasteur</p>
                      <p>Samuel Morse</p>
                      <p>Elizabeth I</p>
                    </div>
                  </div>
                  <div className="bg-emerald-500/10 rounded-xl p-3 border border-emerald-400/20">
                    <p className="text-xs text-emerald-300 font-semibold mb-1">The Rarity</p>
                    <p className="text-xs text-gray-300">Only 1-2% of all people have 33 as a core number. If you carry this vibration, you were chosen for something profound.</p>
                  </div>
                </div>
              </div>

              {/* Closing */}
              <div className="bg-gradient-to-br from-purple-900/30 to-indigo-900/30 backdrop-blur-xl rounded-3xl p-6 border border-purple-400/30 text-center">
                <p className="text-sm text-purple-200 italic">
                  If you carry 11, 22, or 33 - you didn't choose a random incarnation. You chose significance.
                </p>
              </div>
                </div>
              </div>
            )}
          </div>

          {/* SYSTEMS SECTION */}
          <div className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 overflow-hidden">
            <button
              onClick={() => setCollapsedSections({...collapsedSections, systems: !collapsedSections.systems})}
              className="w-full flex items-center justify-between p-5 hover:bg-white/10 transition"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-purple-500 rounded-xl flex items-center justify-center shadow-lg">
                  <BookOpen className="w-5 h-5 text-white" />
                </div>
                <div className="text-left">
                  <h3 className="text-lg font-semibold text-white">Systems</h3>
                  <p className="text-xs text-gray-400">Cheiro's history & methodologies</p>
                </div>
              </div>
              <div className={`transition-transform duration-300 ${collapsedSections.systems ? '' : 'rotate-180'}`}>
                <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </button>
            
            {!collapsedSections.systems && (
              <div className="p-5 pt-0">
                <div className="space-y-6">
              {/* Cheiro Hero */}
              <div className="bg-gradient-to-br from-purple-500/20 via-pink-500/20 to-purple-500/20 backdrop-blur-xl rounded-3xl p-8 border border-purple-400/30 shadow-2xl relative overflow-hidden">
                <div className="absolute inset-0 opacity-30">
                  {[...Array(20)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-1 h-1 bg-purple-400 rounded-full animate-float"
                      style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        animationDelay: `${Math.random() * 3}s`,
                        animationDuration: `${3 + Math.random() * 2}s`
                      }}
                    />
                  ))}
                </div>
                <div className="relative">
                  <h2 className="text-2xl font-black text-white mb-4 uppercase tracking-wide">Why We Use Cheiro</h2>
                  <p className="text-gray-300 text-sm mb-4 leading-relaxed">
                    Cheiro (Count Louis Hamon, 1866-1936) was the most famous numerologist in history. He predicted the dates of Queen Victoria's death, King Edward VII's illness, and foresaw World War I and the Russian Revolution. <span className="text-white font-semibold">Kings and presidents consulted him.</span>
                  </p>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    Cheiro used the <span className="text-purple-300 font-semibold">Chaldean system</span> - a 5,000-year-old method based on sound vibrations of letters, not alphabetical order like modern Pythagorean numerology. The Chaldean system preserves master numbers (11, 22, 33) and assigns letters based on their vibrational frequency.
                  </p>
                  <div className="mt-6 p-4 bg-black/40 rounded-xl border border-purple-400/30">
                    <p className="text-purple-200 font-semibold text-center">Cheiro advised kings and shaped history. We follow his wisdom.</p>
                  </div>
                </div>
              </div>

              {/* Chaldean System */}
              <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-6 border border-white/10">
                <h3 className="text-xl font-bold text-white mb-4">The Chaldean System</h3>
                <p className="text-sm text-gray-300 mb-4">
                  The Chaldean system assigns numbers 1-8 to letters based on their vibrational energy (9 is considered sacred and not assigned). This is the system Cheiro used.
                </p>
                <div className="grid grid-cols-4 gap-2 text-xs font-mono">
                  {[
                    {num: 1, letters: 'A, I, J, Q, Y'},
                    {num: 2, letters: 'B, K, R'},
                    {num: 3, letters: 'C, G, L, S'},
                    {num: 4, letters: 'D, M, T'},
                    {num: 5, letters: 'E, H, N, X'},
                    {num: 6, letters: 'U, V, W'},
                    {num: 7, letters: 'O, Z'},
                    {num: 8, letters: 'F, P'}
                  ].map(({num, letters}) => (
                    <div key={num} className="bg-black/20 rounded-xl p-3 border border-white/10">
                      <p className="text-purple-400 font-bold mb-1">{num}</p>
                      <p className="text-gray-400">{letters}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Chaldean vs Pythagorean */}
              <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-6 border border-white/10">
                <h3 className="text-xl font-bold text-white mb-4">Chaldean vs Pythagorean</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div className="bg-purple-500/10 rounded-xl p-4 border border-purple-400/20">
                    <p className="text-purple-300 font-semibold mb-2">✓ Chaldean (What We Use)</p>
                    <ul className="space-y-1 text-gray-300 text-xs">
                      <li>• 5,000+ years old</li>
                      <li>• Based on sound vibrations</li>
                      <li>• Uses numbers 1-8</li>
                      <li>• Preserves 11, 22, 33</li>
                      <li>• Used by Cheiro</li>
                    </ul>
                  </div>
                  <div className="bg-gray-500/10 rounded-xl p-4 border border-gray-400/20">
                    <p className="text-gray-300 font-semibold mb-2">✗ Pythagorean (Modern)</p>
                    <ul className="space-y-1 text-gray-400 text-xs">
                      <li>• ~2,500 years old</li>
                      <li>• Based on alphabet order</li>
                      <li>• Uses numbers 1-9</li>
                      <li>• Often reduces masters</li>
                      <li>• Western adaptation</li>
                    </ul>
                  </div>
                </div>
              </div>
                </div>
              </div>
            )}
          </div>

          </div>
          {/* END COLLAPSIBLE SECTIONS */}

        </div>
        <TabBar />
      </div>
    );
  }


  if (currentUser && activeTab === 'numbers') {
    const birthInfo = numberProfiles[currentUser.birthNumber] || numberProfiles[1];
    const lifePathInfo = numberProfiles[currentUser.lifePathNumber] || numberProfiles[1];
    const nameInfo = numberProfiles[currentUser.nameNumber] || numberProfiles[1];

    return (
      <div className="min-h-screen relative overflow-hidden pb-20 tab-content">
        <OrganicBackground />
        <div className="max-w-2xl mx-auto px-3 relative z-10">
          <h1 className="text-3xl font-light mb-6 pt-4 text-white tracking-tight">Your Numbers</h1>

          <Card className="mb-6">
            <h3 className="font-semibold mb-3 text-white">Understanding Your Numbers</h3>
            <div className="space-y-2 text-sm text-gray-300">
              <p><span className="font-semibold text-white">Birth Number:</span> Your core essence from the day you were born. This is your fundamental nature.</p>
              <p><span className="font-semibold text-white">Life Path Number:</span> The eternal pattern guiding your journey. This reveals your purpose and lessons.</p>
              <p><span className="font-semibold text-white">Name Number:</span> How you express divine energy and how others perceive you. This can shift if you change your name.</p>
            </div>
          </Card>

          <div className="space-y-4">
            <NumberProfileCard 
              number={currentUser.birthNumber} 
              info={birthInfo} 
              label="Birth Number" 
            />

            <NumberProfileCard 
              number={currentUser.lifePathNumber} 
              info={lifePathInfo} 
              label="Life Path" 
            />

            <NumberProfileCard 
              number={currentUser.nameNumber} 
              info={nameInfo} 
              label="Name Number" 
            />
          </div>
        </div>
        <TabBar />
      </div>
    );
  }

  if (currentUser && activeTab === 'shop') {
    return (
      <div className="min-h-screen relative overflow-hidden pb-20 tab-content">
        <OrganicBackground />
        <div className="max-w-2xl mx-auto px-3 relative z-10">
          <h1 className="text-3xl font-light mb-2 pt-4 text-white tracking-tight">Premium</h1>
          <p className="text-gray-300 mb-6 text-sm font-light">Unlock Cheiro's complete wisdom</p>

          {isPremium ? (
            <div className="space-y-5">
              <Card>
                <div className="flex items-center gap-3">
                  <span className="text-2xl">⭐</span>
                  <div>
                    <h2 className="text-lg font-medium text-white">Premium Active</h2>
                    <p className="text-xs text-gray-300 font-light">Full access unlocked</p>
                  </div>
                </div>
              </Card>

              <Card padding="p-5">
                <h3 className="font-medium mb-3 text-white text-sm">Ask Cheiro AI</h3>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && sendChatMessage()}
                    placeholder="Ask about your numbers..."
                    className={STYLES.inputSmall}
                  />
                  <button
                    onClick={sendChatMessage}
                    className={STYLES.buttonSecondary}
                  >
                    Ask
                  </button>
                </div>
              </Card>
            </div>
          ) : (
            <div className="space-y-5">
              <Card>
                <h2 className="text-xl font-medium mb-5 text-white">Premium Features</h2>
                
                <div className="space-y-4 mb-6">
                  <div className="flex items-start gap-3">
                    <span className="text-xl">🤖</span>
                    <div>
                      <h3 className="font-medium text-white text-sm">Cheiro AI Oracle</h3>
                      <p className="text-xs text-gray-300 font-light">Unlimited questions about your numbers and destiny.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <span className="text-xl">📅</span>
                    <div>
                      <h3 className="font-medium text-white text-sm">Monthly Forecasts</h3>
                      <p className="text-xs text-gray-300 font-light">See what each month holds for you.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <span className="text-xl">🎯</span>
                    <div>
                      <h3 className="font-medium text-white text-sm">Best Dates Finder</h3>
                      <p className="text-xs text-gray-300 font-light">Find auspicious dates for major decisions.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="text-xl">📊</span>
                    <div>
                      <h3 className="font-medium text-white text-sm">Compound Numbers</h3>
                      <p className="text-xs text-gray-300 font-light">Unlock hidden meanings of power numbers.</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 mb-5 border border-white/10">
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="text-2xl font-medium text-white">$9.99</span>
                    <span className="text-gray-300 text-sm font-light">/month</span>
                  </div>
                  <p className="text-xs text-gray-300 font-light">7-day free trial · Cancel anytime</p>
                </div>

                <button
                  onClick={() => {
                    setIsPremium(true);
                    alert('Premium activated! (Demo mode)');
                  }}
                  className="w-full py-4 bg-violet-600 text-white rounded-full font-medium text-sm hover:bg-violet-700 transition tracking-wide"
                >
                  Start Free Trial
                </button>
                
                <p className="text-xs text-center text-gray-400 mt-3 font-light">
                  Demo mode - no payment processed
                </p>
              </Card>
            </div>
          )}
        </div>
        <TabBar />
      </div>
    );
  }

  return null;
};

export default NumerologyApp;
