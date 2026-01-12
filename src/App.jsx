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
    const AlienOracle = () => {
      return (
        <div className="flex justify-center mb-8">
          <div className="relative w-56 h-56">
            {/* Ethereal glow */}
            <div 
              className="absolute inset-0 blur-3xl opacity-40"
              style={{
                background: 'radial-gradient(circle, rgba(139, 92, 246, 0.8), rgba(96, 165, 250, 0.5), transparent)',
              }}
            />

            {/* Alien Avatar SVG - Sharp & Angular */}
            <svg className="w-full h-full" viewBox="0 0 300 300" style={{filter: 'drop-shadow(0 0 12px rgba(139, 92, 246, 0.7))'}}>
              <defs>
                <linearGradient id="holographic" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#60a5fa" />
                  <stop offset="25%" stopColor="#8b5cf6" />
                  <stop offset="50%" stopColor="#ec4899" />
                  <stop offset="75%" stopColor="#f59e0b" />
                  <stop offset="100%" stopColor="#10b981" />
                </linearGradient>
                <linearGradient id="alien-skin" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#60a5fa" />
                  <stop offset="50%" stopColor="#3b82f6" />
                  <stop offset="100%" stopColor="#1e40af" />
                </linearGradient>
              </defs>

              {/* ALIEN HEAD - Sharp angular polygon */}
              <path 
                d="M 150 75 L 110 95 L 95 130 L 110 165 L 150 180 L 190 165 L 205 130 L 190 95 Z"
                fill="url(#alien-skin)"
                opacity="0.9"
              />
              <path 
                d="M 150 85 L 120 100 L 110 125 L 120 150 L 150 165 L 180 150 L 190 125 L 180 100 Z"
                fill="#93c5fd"
                opacity="0.2"
              />
              
              <line x1="110" y1="95" x2="95" y2="130" stroke="#60a5fa" strokeWidth="2" opacity="0.5" />
              <line x1="190" y1="95" x2="205" y2="130" stroke="#60a5fa" strokeWidth="2" opacity="0.5" />
              <line x1="130" y1="85" x2="150" y2="75" stroke="#60a5fa" strokeWidth="1.5" opacity="0.6" />
              <line x1="170" y1="85" x2="150" y2="75" stroke="#60a5fa" strokeWidth="1.5" opacity="0.6" />

              {/* EYES - Small sharp diamonds */}
              <path d="M 130 120 L 125 123 L 130 128 L 137 123 Z" fill="#0f172a" />
              <ellipse cx="130" cy="123" rx="3" ry="2" fill="#60a5fa" opacity="0.8" />
              <circle cx="129" cy="122" r="1" fill="#f0f9ff" />
              
              <path d="M 170 120 L 175 123 L 170 128 L 163 123 Z" fill="#0f172a" />
              <ellipse cx="170" cy="123" rx="3" ry="2" fill="#60a5fa" opacity="0.8" />
              <circle cx="171" cy="122" r="1" fill="#f0f9ff" />

              {/* FACE */}
              <line x1="105" y1="140" x2="120" y2="145" stroke="#60a5fa" strokeWidth="1.5" opacity="0.4" />
              <line x1="195" y1="140" x2="180" y2="145" stroke="#60a5fa" strokeWidth="1.5" opacity="0.4" />
              <path d="M 150 135 L 148 143 L 150 145 L 152 143 Z" fill="#1e40af" opacity="0.5" />
              <line x1="145" y1="157" x2="155" y2="157" stroke="#1e40af" strokeWidth="1.5" opacity="0.6" />
              <line x1="120" y1="160" x2="150" y2="175" stroke="#1e40af" strokeWidth="1" opacity="0.3" />
              <line x1="180" y1="160" x2="150" y2="175" stroke="#1e40af" strokeWidth="1" opacity="0.3" />

              {/* CROWN */}
              <path d="M 100 85 Q 150 55 200 85" stroke="url(#holographic)" strokeWidth="3" fill="none" opacity="0.7" />
              <path d="M 105 90 Q 150 63 195 90" stroke="url(#holographic)" strokeWidth="2" fill="none" opacity="0.5" />
              <circle cx="150" cy="55" r="6" fill="url(#holographic)" opacity="0.8" />
              <circle cx="150" cy="55" r="9" fill="none" stroke="#60a5fa" strokeWidth="1" opacity="0.6" />
              <circle cx="125" cy="70" r="4" fill="#f59e0b" opacity="0.7" />
              <circle cx="175" cy="70" r="4" fill="#10b981" opacity="0.7" />
              <circle cx="110" cy="80" r="3" fill="#ec4899" opacity="0.7" />
              <circle cx="190" cy="80" r="3" fill="#8b5cf6" opacity="0.7" />

              {/* TENTACLES */}
              <path d="M 95 105 Q 70 135 65 170 Q 62 195 60 225" stroke="url(#holographic)" strokeWidth="6" fill="none" opacity="0.6" strokeLinecap="round" />
              <path d="M 90 115 Q 60 145 55 185 Q 52 210 48 240" stroke="#3b82f6" strokeWidth="5" fill="none" opacity="0.5" strokeLinecap="round" />
              <path d="M 205 105 Q 230 135 235 170 Q 238 195 240 225" stroke="url(#holographic)" strokeWidth="6" fill="none" opacity="0.6" strokeLinecap="round" />
              <path d="M 210 115 Q 240 145 245 185 Q 248 210 252 240" stroke="#3b82f6" strokeWidth="5" fill="none" opacity="0.5" strokeLinecap="round" />
              
              <circle cx="70" cy="155" r="2" fill="#ec4899" opacity="0.6" />
              <circle cx="65" cy="180" r="2" fill="#f59e0b" opacity="0.6" />
              <circle cx="62" cy="205" r="2" fill="#10b981" opacity="0.6" />
              <circle cx="230" cy="155" r="2" fill="#ec4899" opacity="0.6" />
              <circle cx="235" cy="180" r="2" fill="#f59e0b" opacity="0.6" />
              <circle cx="238" cy="205" r="2" fill="#10b981" opacity="0.6" />

              {/* FLOATING ELEMENTS */}
              <circle cx="85" cy="115" r="6" fill="none" stroke="url(#holographic)" strokeWidth="1.5" opacity="0.5" />
              <circle cx="215" cy="115" r="6" fill="none" stroke="url(#holographic)" strokeWidth="1.5" opacity="0.5" />
              <circle cx="100" cy="95" r="4" fill="none" stroke="#60a5fa" strokeWidth="1" opacity="0.4" />
              <circle cx="200" cy="95" r="4" fill="none" stroke="#60a5fa" strokeWidth="1" opacity="0.4" />
              <circle cx="115" cy="105" r="2.5" fill="#ec4899" opacity="0.7" />
              <circle cx="185" cy="105" r="2.5" fill="#8b5cf6" opacity="0.7" />
              <circle cx="95" cy="140" r="2" fill="#10b981" opacity="0.6" />
              <circle cx="205" cy="140" r="2" fill="#f59e0b" opacity="0.6" />
            </svg>
          </div>
        </div>
      );
    };

    return (
      <div className="min-h-screen relative overflow-hidden text-gray-100">
        <OrganicBackground />
        
        <div className="max-w-md mx-auto p-6 pt-12 relative z-10">
          <AlienOracle />

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
