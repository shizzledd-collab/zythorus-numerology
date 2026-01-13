import React, { useState, useEffect } from 'react';
import { User, Users, Heart, Calendar, Hash, Sparkles, Home, ShoppingBag, BookOpen, Clock, MapPin, TrendingUp, Settings } from 'lucide-react';

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
  useEffect(() => {
    localStorage.setItem('numerology_profiles', JSON.stringify(profiles));
  }, [profiles]);

  useEffect(() => {
    localStorage.setItem('numerology_friends', JSON.stringify(friends));
  }, [friends]);

  useEffect(() => {
    localStorage.setItem('numerology_currentProfileIndex', currentProfileIndex.toString());
  }, [currentProfileIndex]);

  useEffect(() => {
    localStorage.setItem('numerology_isPremium', isPremium.toString());
  }, [isPremium]);

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
    const year = today.getFullYear();
    return getLifePathNumber(day, month, year);
  };

  const numberProfiles = {
    1: {
      title: "Number 1",
      ruling: "Sun",
      gender: "Masculine",
      kabbalah: "Unity, God, source, leadership, singularity",
      personality: "**Leadership** and **independence** define you. **Creative**, **inventive**, and **strongly individual** with definite views. **Ambitious** - you dislike restraint and naturally rise to positions of authority. **Initiative** and **confidence** drive you forward. Make yourself **respected** in all spheres.",
      strengths: "Natural **leader**, **innovative**, **ambitious**, strong **willpower**, **self-reliant**, rise to **authority**",
      challenges: "Can be **domineering**, **stubborn**, **obstinate**, prideful, must be the head",
      colors: "Yellow to deep orange, golden hues, pale yellow",
      bestDays: "Sunday, Monday, 1st, 10th, 19th, 28th",
      compatibleNumbers: [1, 2, 4, 7]
    },
    2: {
      title: "Number 2", 
      ruling: "Moon",
      gender: "Feminine",
      kabbalah: "Duality, polarity, partnership, balance, reflection",
      personality: "**Diplomacy** and **sensitivity** are your gifts. **Gentle**, **imaginative**, **artistic**, and **romantic**. More **mental** than physical. Natural **mediator** with strong **intuition**. Excel in **partnership** and **cooperation**. Qualities more refined than forceful.",
      strengths: "**Empathy**, **intuitive**, **artistic**, **diplomatic**, harmonious, excellent **teamwork**, gentle nature",
      challenges: "**Indecisive**, **oversensitive**, lack **self-confidence**, **restless**, easily despondent, lack continuity in plans",
      colors: "Green (darkest to lightest), cream, white - avoid black, purple, dark red",
      bestDays: "Sunday, Monday, Friday, 2nd, 11th, 20th, 29th",
      compatibleNumbers: [1, 2, 4, 7]
    },
    3: {
      title: "Number 3",
      ruling: "Jupiter", 
      gender: "Masculine",
      kabbalah: "Creativity, harmony, synthesis, growth, manifestation",
      personality: "**Creativity** and **expression** flow through you. **Ambitious**, never satisfied in subordinate roles. Excel in **communication**, **artistic** pursuits, and social situations. **Optimistic** and **charming** with natural **expansion** energy. Love **order** and **discipline**. Often excel in **authority** positions.",
      strengths: "**Creative**, **expressive**, **social**, excellent communicator, **artistic talent**, **ambitious**, conscientious",
      challenges: "**Scattered**, lack **focus**, can be **superficial**, **dictatorial**, may exaggerate, make enemies easily",
      colors: "Mauve, violet, purple (main), blue, crimson, rose (secondary)",
      bestDays: "Thursday (most important), Friday, Tuesday, 3rd, 12th, 21st, 30th",
      compatibleNumbers: [3, 6, 9]
    },
    4: {
      title: "Number 4",
      ruling: "Uranus (related to Sun, written 4-1)",
      gender: "Neutral",
      kabbalah: "Stability, structure, foundation, grounding, order",
      personality: "**Structure** and **stability** ground you. **Disciplined**, **practical**, and **detail-oriented**. Natural **organizer** who sees things from a **different angle**. **Unconventional** thinker, natural **rebel** against rules while creating your own **order**. Attracted to **reforms**.",
      strengths: "**Reliable**, **organized**, **practical**, excellent **planning**, strong **work ethic**, **reformer**, distinct viewpoint",
      challenges: "**Rigid**, **stubborn**, feel **isolated**, make secret enemies, **highly strung**, seldom successful in material matters",
      colors: "Half-shades, half-tones, electric colors - electric blues and grays best",
      bestDays: "Saturday, Sunday, Monday, 4th, 13th, 22nd, 31st",
      compatibleNumbers: [1, 2, 4, 7, 8]
    },
    5: {
      title: "Number 5",
      ruling: "Mercury",
      gender: "Neutral",
      kabbalah: "Change, freedom, movement, adaptability, exploration",
      personality: "**Freedom** and **change** energize you. **Versatile**, **adaptable**, and mentally **quick**. Crave **variety** and **excitement**. **Impulsive** with rapid thought and **communication** skills. Excel in **dynamic** situations and rebound quickly from setbacks. Live on your **nerves**, mentally highly strung.",
      strengths: "**Adaptable**, **resourceful**, quick thinking, **communicative**, **innovative**, make friends easily, **speculative** ability",
      challenges: "**Restless**, **scattered**, impulsive, lack **discipline**, exhaust nervous strength, nervous breakdowns possible",
      colors: "Light gray, white, glistening materials - can wear all shades but light is best, avoid dark",
      bestDays: "Wednesday, Friday, 5th, 14th, 23rd",
      compatibleNumbers: [1, 3, 5, 7, 9]
    },
    6: {
      title: "Number 6",
      ruling: "Venus",
      gender: "Feminine",
      kabbalah: "Harmony, beauty, integration, responsibility, cooperation",
      personality: "**Harmony** and **responsibility** guide you. Extremely **magnetic** - you attract and **nurture** others. **Artistic**, love **beauty**, music, and refined surroundings. **Devoted** when attached, more mother-love than sensual. Excel in **service**, **family**, and creating **balance**. Most generous to art.",
      strengths: "**Caring**, **protective**, **artistic**, **magnetic** personality, **cooperative**, socially balanced, devoted, generous",
      challenges: "**Controlling**, overly **responsible**, **obstinate**, **stubborn** in relationships, can't stand discord, fight to death for cause",
      colors: "Blue (lightest to darkest), green, rose, pink - avoid black and dark purple",
      bestDays: "Tuesday, Thursday, Friday, 6th, 15th, 24th",
      compatibleNumbers: [3, 6, 9]
    },
    7: {
      title: "Number 7",
      ruling: "Neptune (associated with Moon)",
      gender: "Masculine",
      kabbalah: "Spirituality, mystery, introspection, contemplation, intuition",
      personality: "**Analysis** and **introspection** define you. **Independent** with strongly **original** views. **Spiritual** seeker with remarkable **intuition** and **clairvoyance**. Natural **researcher**, writer, or philosopher. Love **travel** and **mystical** pursuits. Create your own unique worldview. Peculiar quieting **magnetism**.",
      strengths: "**Analytical**, **philosophical**, **intuitive**, excellent writer/thinker, strong **individuality**, **clairvoyant** gifts, love travel",
      challenges: "**Isolated**, **restless**, may not follow through, **misunderstood**, care little for **material** success, seen as strange",
      colors: "Green (all pale shades), white, yellow - avoid heavy dark colors",
      bestDays: "Sunday, Monday, 7th, 16th, 25th",
      compatibleNumbers: [1, 2, 4, 7]
    },
    8: {
      title: "Number 8",
      ruling: "Saturn (Planet of Fate)",
      gender: "Feminine",
      kabbalah: "Power, mastery, abundance, authority, transcendence",
      personality: "**Power** and **ambition** drive you. Deep, **intense** nature with strong **executive** ability. Face **karmic** lessons - either great **success** or great challenges. **Strategic** thinker with **authority**. **Misunderstood** but play important roles. **Material achievement** through discipline. Often feel lonely at heart.",
      strengths: "**Strategic**, **disciplined**, strong **leadership**, business acumen, concentrated **willpower**, deep intensity, philosophical",
      challenges: "Feel **lonely**, **misunderstood**, face sorrows/losses, can be **rigid**, **controlling**, make bitter enemies, seldom reap reward while living",
      colors: "Dark gray, black, dark blue, purple - would look awkward in light colors",
      bestDays: "Saturday (most important), Sunday, Monday, 8th, 17th, 26th",
      compatibleNumbers: [2, 4, 6, 8]
    },
    9: {
      title: "Number 9",
      ruling: "Mars",
      gender: "Masculine",
      kabbalah: "Completion, wholeness, compassion, wisdom from experience",
      personality: "**Completion** and **compassion** mark your path. **Fighter** with great **courage** and **determination**. **Humanitarian** with **idealistic** vision. Natural **leader** who succeeds through grit. **Service-oriented** with strong will. Difficult times early but successful in end. May face challenges but triumph eventually.",
      strengths: "**Courageous**, **determined**, **compassionate**, excellent **organizer**, **humanitarian**, visionary, fighters, grit and strong will",
      challenges: "**Hasty temper**, **impulsive**, make enemies, overly **idealistic**, cause **strife**, prone to accidents, quarrels in home",
      colors: "Crimson, red (all shades), rose tones, pink",
      bestDays: "Tuesday (Mars Day - most important), Thursday, Friday, 9th, 18th, 27th",
      compatibleNumbers: [3, 6, 9]
    },
    11: {
      title: "The Illuminator (Master)",
      ruling: "Moon + Sun (1+1)",
      kabbalah: "Heightened intuition, spiritual insight, amplified duality",
      personality: "Spiritual messengers with heightened intuition. Visionaries here to inspire others.",
      strengths: "Intuition, inspiration, spiritual insight, visionary thinking",
      challenges: "Overwhelmed by sensitivity. May struggle with practical matters.",
      colors: "Silver, white, pale shimmering tones",
      bestDays: "Mondays, 11th, 29th",
      compatibleNumbers: [2, 4, 6, 8, 11]
    },
    22: {
      title: "The Master Builder",
      ruling: "Saturn + Moon (2+2)",
      kabbalah: "Building, manifestation on grand scale, integrating ideals into reality",
      personality: "Most powerful number combining intuition with practical building ability.",
      strengths: "Practical visionary, manifesting dreams, large-scale achievement",
      challenges: "Enormous pressure and responsibility. May become overwhelmed.",
      colors: "Earth tones, deep greens",
      bestDays: "Saturdays, 22nd",
      compatibleNumbers: [2, 4, 6, 8, 11, 22]
    },
    33: {
      title: "The Master Teacher",
      ruling: "Jupiter + Venus (3+3)",
      kabbalah: "Compassion, universal teaching, spiritual leadership",
      personality: "Rarest and most spiritually advanced. Master teachers devoted to selfless service.",
      strengths: "Unconditional love, healing abilities, teaching, spiritual leadership",
      challenges: "Can sacrifice self too much. May take on others' burdens.",
      colors: "Gold and sea green",
      bestDays: "Thursdays, Fridays",
      compatibleNumbers: [6, 9, 11, 22, 33]
    }
  };

  const getDayEnergyGuidance = (todayNumber) => {
    const guidance = {
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
  const compatibilityMatrix = {
    '1-1': { level: 'Medium', desc: 'Two independent leaders; strong-willed, need compromise.' },
    '1-2': { level: 'High', desc: '1 leads, 2 supports; balance of ambition and sensitivity.' },
    '1-3': { level: 'High', desc: 'Creative and energetic pairing; mutual inspiration.' },
    '1-4': { level: 'Medium', desc: 'Practical 4 stabilizes 1, but may feel restricted.' },
    '1-5': { level: 'High', desc: 'Adventurous and freedom-loving; dynamic and lively together.' },
    '1-6': { level: 'Medium', desc: '6 nurtures, 1 may feel confined; balance needed.' },
    '1-7': { level: 'High', desc: 'Independent thinkers; mutual respect for mental freedom.' },
    '1-8': { level: 'Medium', desc: '8 ambitious; power dynamics may challenge 1\'s autonomy.' },
    '1-9': { level: 'Low', desc: 'Action-oriented 1 and idealistic 9 may struggle to align.' },
    '1-11': { level: 'High', desc: '1\'s initiative complements 11\'s visionary intuition.' },
    '1-22': { level: 'Medium', desc: '1\'s drive may clash with 22\'s masterful planning.' },
    '1-33': { level: 'Low', desc: 'Independent 1 may struggle with 33\'s humanitarian ideals.' },
    '2-2': { level: 'Medium', desc: 'Cooperative pairing; can be indecisive together.' },
    '2-3': { level: 'Medium', desc: '2 seeks stability, 3 seeks fun; requires compromise.' },
    '2-4': { level: 'High', desc: 'Structured and supportive; strong practical harmony.' },
    '2-5': { level: 'Medium', desc: '2 wants stability, 5 craves freedom; balance needed.' },
    '2-6': { level: 'High', desc: 'Nurturing and cooperative; emotionally harmonious.' },
    '2-7': { level: 'Medium', desc: '2 emotional, 7 detached; patience needed.' },
    '2-8': { level: 'High', desc: 'Supportive 2 balances ambitious 8 well.' },
    '2-9': { level: 'Medium', desc: '2 emotional, 9 idealistic; moderate harmony.' },
    '2-11': { level: 'High', desc: 'Intuitive 11 and sensitive 2 complement each other.' },
    '2-22': { level: 'High', desc: '2 supports 22\'s grand plans effectively.' },
    '2-33': { level: 'Medium', desc: '2\'s nurturing helps 33\'s humanitarian goals.' },
    '3-3': { level: 'High', desc: 'Shared creativity and optimism; playful pairing.' },
    '3-4': { level: 'Medium', desc: '3 free-spirited, 4 structured; balance fun and stability.' },
    '3-5': { level: 'High', desc: 'Adventurous and energetic; highly compatible.' },
    '3-6': { level: 'Medium', desc: '3 playful, 6 responsible; balance required.' },
    '3-7': { level: 'High', desc: 'Mental stimulation and curiosity align well.' },
    '3-8': { level: 'Medium', desc: 'Energetic 3 may feel constrained by ambitious 8.' },
    '3-9': { level: 'Medium', desc: '3 action-oriented, 9 idealistic; requires understanding.' },
    '3-11': { level: 'High', desc: 'Creative 3 pairs well with visionary 11.' },
    '3-22': { level: 'Medium', desc: '3 energetic, 22 disciplined; needs balance.' },
    '3-33': { level: 'Medium', desc: '3 playful, 33 idealistic; fun but requires patience.' },
    '4-4': { level: 'High', desc: 'Practical and disciplined; strong mutual understanding.' },
    '4-5': { level: 'Medium', desc: '4 structured, 5 restless; needs flexibility.' },
    '4-6': { level: 'High', desc: 'Harmonious; structure meets nurturing.' },
    '4-7': { level: 'Medium', desc: '4 grounded, 7 introspective; mutual respect needed.' },
    '4-8': { level: 'High', desc: 'Strong ambition and stability; very compatible.' },
    '4-9': { level: 'Medium', desc: '4 practical, 9 idealistic; balance required.' },
    '4-11': { level: 'Medium', desc: '4 practical, 11 visionary; compromise needed.' },
    '4-22': { level: 'High', desc: '4 structured, 22 disciplined; strong partnership.' },
    '4-33': { level: 'Medium', desc: '4 practical, 33 altruistic; requires understanding.' },
    '5-5': { level: 'High', desc: 'Both crave freedom and adventure; lively together.' },
    '5-6': { level: 'Medium', desc: '5 energetic, 6 responsible; balance required.' },
    '5-7': { level: 'High', desc: 'Independent and mentally stimulating pairing.' },
    '5-8': { level: 'Medium', desc: '5 free, 8 structured; energetic but some tension.' },
    '5-9': { level: 'Medium', desc: '5 action-oriented, 9 idealistic; requires understanding.' },
    '5-11': { level: 'High', desc: '5 adventurous, 11 visionary; mentally stimulating.' },
    '5-22': { level: 'Medium', desc: '5 energetic, 22 disciplined; balance required.' },
    '5-33': { level: 'Medium', desc: '5 lively, 33 idealistic; needs patience.' },
    '6-6': { level: 'High', desc: 'Shared nurturing and responsibility; harmonious.' },
    '6-7': { level: 'Medium', desc: '6 grounded, 7 introspective; needs patience.' },
    '6-8': { level: 'High', desc: '6 supportive, 8 ambitious; balance of care and power.' },
    '6-9': { level: 'High', desc: 'Shared compassion and ideals; very compatible.' },
    '6-11': { level: 'High', desc: '6 nurturing, 11 intuitive; strong emotional bond.' },
    '6-22': { level: 'High', desc: '6 supportive, 22 disciplined; harmonious teamwork.' },
    '6-33': { level: 'High', desc: '6 nurturing, 33 altruistic; very compatible.' },
    '7-7': { level: 'High', desc: 'Independent and intellectual; mutual respect.' },
    '7-8': { level: 'Medium', desc: '7 introspective, 8 ambitious; requires understanding.' },
    '7-9': { level: 'Medium', desc: '7 mental, 9 emotional; patience required.' },
    '7-11': { level: 'High', desc: '7 intellectual, 11 visionary; stimulating connection.' },
    '7-22': { level: 'Medium', desc: '7 introspective, 22 disciplined; balance required.' },
    '7-33': { level: 'Medium', desc: '7 mental, 33 compassionate; understanding needed.' },
    '8-8': { level: 'High', desc: 'Strong ambition and structure; powerful pairing.' },
    '8-9': { level: 'Medium', desc: '8 practical, 9 idealistic; balance required.' },
    '8-11': { level: 'Medium', desc: '8 ambitious, 11 visionary; compromise needed.' },
    '8-22': { level: 'High', desc: '8 disciplined, 22 ambitious; powerful team.' },
    '8-33': { level: 'Medium', desc: '8 structured, 33 altruistic; balance needed.' },
    '9-9': { level: 'High', desc: 'Compassionate and idealistic; harmonious connection.' },
    '9-11': { level: 'High', desc: '9 idealistic, 11 visionary; emotional alignment.' },
    '9-22': { level: 'Medium', desc: '9 idealistic, 22 disciplined; compromise needed.' },
    '9-33': { level: 'High', desc: '9 and 33 share altruistic goals; harmonious.' },
    '11-11': { level: 'High', desc: 'Two intuitive visionaries; mental and spiritual synergy.' },
    '11-22': { level: 'High', desc: '11 visionary, 22 ambitious; powerful and complementary.' },
    '11-33': { level: 'High', desc: '11 intuitive, 33 humanitarian; aligned ideals.' },
    '22-22': { level: 'High', desc: 'Two disciplined leaders; strong achievement focus.' },
    '22-33': { level: 'High', desc: '22 ambitious, 33 humanitarian; aligned purpose.' },
    '33-33': { level: 'High', desc: 'Shared compassion and altruistic ideals; harmonious connection.' }
  };

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

  const planetToNumber = (planet) => {
    const map = { 'Sun': 1, 'Moon': 2, 'Jupiter': 3, 'Mercury': 5, 'Venus': 6, 'Saturn': 8, 'Mars': 9 };
    return map[planet] || 1;
  };

  const getPlanetaryActivities = (planet) => {
    const activities = {
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
    return activities[planet] || { qualities: '', favorable: [], avoid: [], examples: '' };
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
              src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4QnFaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJYTVAgQ29yZSA0LjQuMC1FeGl2MiI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOmlwdGNFeHQ9Imh0dHA6Ly9pcHRjLm9yZy9zdGQvSXB0YzR4bXBFeHQvMjAwOC0wMi0yOS8iIGlwdGNFeHQ6RGlnaXRhbFNvdXJjZVR5cGU9Imh0dHA6Ly9jdi5pcHRjLm9yZy9uZXdzY29kZXMvZGlnaXRhbHNvdXJjZXR5cGUvdHJhaW5lZEFsZ29yaXRobWljTWVkaWEiLz4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8P3hwYWNrZXQgZW5kPSJ3Ij8+/9sAQwACAQEBAQECAQEBAgICAgIEAwICAgIFBAQDBAYFBgYGBQYGBgcJCAYHCQcGBggLCAkKCgoKCgYICwwLCgwJCgoK/9sAQwECAgICAgIFAwMFCgcGBwoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoK/8AAEQgEAAQAAwERAAIRAQMRAf/EAB8AAAEFAQEBAQEBAAAAAAAA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"
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
          <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10 shadow-2xl">
            <h2 className="text-xl font-medium text-white mb-8 tracking-tight">Create Your Profile</h2>
            <div className="space-y-6">
              <div>
                <label className="block text-xs font-medium mb-3 text-gray-400 tracking-wide">Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-5 py-4 rounded-2xl bg-white/5 border border-white/10 focus:border-pink-500/50 focus:outline-none focus:ring-2 focus:ring-pink-500/20 text-white text-base placeholder-gray-500 transition-all"
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
                    className="px-4 py-4 rounded-2xl bg-white/5 border border-white/10 focus:border-pink-500/50 focus:outline-none focus:ring-2 focus:ring-pink-500/20 text-white text-base text-center placeholder-gray-500 transition-all"
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
                    className="px-4 py-4 rounded-2xl bg-white/5 border border-white/10 focus:border-pink-500/50 focus:outline-none focus:ring-2 focus:ring-pink-500/20 text-white text-base text-center placeholder-gray-500 transition-all"
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
                    className="px-4 py-4 rounded-2xl bg-white/5 border border-white/10 focus:border-pink-500/50 focus:outline-none focus:ring-2 focus:ring-pink-500/20 text-white text-base text-center placeholder-gray-500 transition-all"
                  />
                </div>
              </div>

              <button
                onClick={handleCreateProfile}
                className="w-full py-4 bg-gradient-to-r from-violet-600 via-pink-400 to-pink-200 text-white rounded-2xl font-medium transition-all text-base mt-8 shadow-lg hover:shadow-xl hover:scale-[1.02]"
              >
                See My Numbers
              </button>
            </div>
          </div>
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
            <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-6 border border-white/10 shadow-sm">
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
            </div>

            {/* PLANETARY HOURS - ALWAYS VISIBLE */}
            <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-5 border border-white/10 shadow-sm mt-6">
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

          <div className="mb-6 bg-white/5 backdrop-blur-xl rounded-3xl p-6 border border-white/10">
            <h3 className="font-semibold mb-3 text-white">Understanding Your Numbers</h3>
            <div className="space-y-2 text-sm text-gray-300">
              <p><span className="font-semibold text-white">Birth Number:</span> Your core essence from the day you were born. This is your fundamental nature.</p>
              <p><span className="font-semibold text-white">Life Path Number:</span> The eternal pattern guiding your journey. This reveals your purpose and lessons.</p>
              <p><span className="font-semibold text-white">Name Number:</span> How you express divine energy and how others perceive you. This can shift if you change your name.</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-6 border border-white/10">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 bg-pink-500/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                  <span className="text-2xl font-light text-gray-300">{currentUser.birthNumber}</span>
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-white">Birth Number {currentUser.birthNumber}</h2>
                  <p className="text-sm text-gray-300">{birthInfo.title}</p>
                </div>
              </div>
              <p className="text-sm text-gray-300 mb-3 leading-relaxed font-light">{birthInfo.personality}</p>
              <div className="space-y-2 text-sm text-gray-300 font-light">
                <p><span className="font-semibold text-white">Strengths:</span> {birthInfo.strengths}</p>
                <p><span className="font-semibold text-white">Challenges:</span> {birthInfo.challenges}</p>
                <p><span className="font-semibold text-white">Lucky Colors:</span> {birthInfo.colors}</p>
                <p><span className="font-semibold text-white">Best Days:</span> {birthInfo.bestDays}</p>
                <p className="text-xs text-gray-400 mt-2">Ruled by {birthInfo.ruling}</p>
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-6 border border-white/10">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 bg-pink-500/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                  <span className="text-2xl font-light text-gray-300">{currentUser.lifePathNumber}</span>
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-white">Life Path {currentUser.lifePathNumber}</h2>
                  <p className="text-sm text-gray-300">{lifePathInfo.title}</p>
                </div>
              </div>
              <p className="text-sm text-gray-300 mb-3 leading-relaxed font-light">{lifePathInfo.personality}</p>
              <div className="space-y-2 text-sm text-gray-300 font-light">
                <p><span className="font-semibold text-white">Strengths:</span> {lifePathInfo.strengths}</p>
                <p><span className="font-semibold text-white">Challenges:</span> {lifePathInfo.challenges}</p>
                <p><span className="font-semibold text-white">Lucky Colors:</span> {lifePathInfo.colors}</p>
                <p><span className="font-semibold text-white">Best Days:</span> {lifePathInfo.bestDays}</p>
                <p className="text-xs text-gray-400 mt-2">Ruled by {lifePathInfo.ruling}</p>
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-6 border border-white/10">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 bg-pink-500/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                  <span className="text-2xl font-light text-gray-300">{currentUser.nameNumber}</span>
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-white">Name Number {currentUser.nameNumber}</h2>
                  <p className="text-sm text-gray-300">{nameInfo.title}</p>
                </div>
              </div>
              <p className="text-sm text-gray-300 mb-3 leading-relaxed font-light">{nameInfo.personality}</p>
              <div className="space-y-2 text-sm text-gray-300 font-light">
                <p><span className="font-semibold text-white">Strengths:</span> {nameInfo.strengths}</p>
                <p><span className="font-semibold text-white">Challenges:</span> {nameInfo.challenges}</p>
                <p><span className="font-semibold text-white">Lucky Colors:</span> {nameInfo.colors}</p>
                <p><span className="font-semibold text-white">Best Days:</span> {nameInfo.bestDays}</p>
                <p className="text-xs text-gray-400 mt-2">Ruled by {nameInfo.ruling}</p>
              </div>
            </div>
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
              <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-6 border border-white/10">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">⭐</span>
                  <div>
                    <h2 className="text-lg font-medium text-white">Premium Active</h2>
                    <p className="text-xs text-gray-300 font-light">Full access unlocked</p>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-5 border border-white/10">
                <h3 className="font-medium mb-3 text-white text-sm">Ask Cheiro AI</h3>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && sendChatMessage()}
                    placeholder="Ask about your numbers..."
                    className="flex-1 px-4 py-2 rounded-full bg-stone-200 border-none focus:outline-none focus:ring-2 focus:ring-gray-300 text-sm text-white"
                  />
                  <button
                    onClick={sendChatMessage}
                    className="px-5 py-2 bg-violet-600 text-white rounded-full hover:bg-violet-700 transition font-medium text-sm"
                  >
                    Ask
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-5">
              <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-6 border border-white/10">
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
              </div>
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
