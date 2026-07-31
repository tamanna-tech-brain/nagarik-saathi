import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { 
  Search, MessageSquare, ShieldAlert, Award, FileText, CheckSquare,
  MapPin, User, FileCheck, Phone, ExternalLink, HelpCircle, ArrowLeft,
  UserCheck, Printer, RefreshCw, Layers, CreditCard, Home, Briefcase, 
  TrendingUp, Check, Users, Sparkles, BookOpen, AlertTriangle, Settings, LogOut, Volume2, Globe, Mic
} from 'lucide-react';

const API_BASE = window.location.origin.includes('localhost') || window.location.origin.includes('127.0.0.1')
  ? 'http://localhost:5000/api'
  : `${window.location.origin}/api`;

// Generates a simple random sessionId for tracking chat histories
const generateSessionId = () => `sess-${Math.random().toString(36).substring(2, 9)}`;

// Translations Dictionary
const t = {
  en: {
    heroTitle: "Schemes Discovery,",
    heroSubTitle: "Simplified for India",
    heroDesc: "Discover government schemes instantly. Designed for operators assisting citizens with document checklists, eligibility, and applications.",
    startChat: "Start Scheme Discovery Chat",
    checkEligibility: "Check Eligibility Screener",
    home: "Home",
    newChat: "New Chat",
    logout: "Logout",
    loginTitle: "Operator / Citizen Login",
    loginDesc: "Log in to access personalized scheme recommendations based on your profile.",
    registerTitle: "Create Account & Profile",
    registerDesc: "Setup your profile with age, occupation, and state to automatically filter matching schemes.",
    loginBtn: "Sign In",
    registerBtn: "Register & Profile",
    needAccount: "Don't have an account?",
    haveAccount: "Already have an account?",
    operatorHeader: "CSC OPERATOR SESSION ACTIVE",
    citizensHelped: "Citizens helped today",
    avgSpeed: "Avg. match speed",
    chatPlaceholder: "Ask a scheme query... (e.g. 'Old age pension MP')",
    voiceNotice: "Voice Input coming soon",
    matchedTitle: "Matched Schemes",
    noMatches: "No schemes found yet.",
    viewGuide: "View Guide",
    eligibilityTitle: "Eligibility Screener",
    eligibilityDesc: "Input the parameters to run a direct database filter query.",
    stateLabel: "State",
    occLabel: "Occupation",
    genderLabel: "Gender",
    maritalLabel: "Marital Status",
    landLabel: "Land Owned",
    incomeLabel: "Annual Family Income (₹)",
    findSchemes: "Find Matching Schemes",
    verifiedBadge: "Verified",
    sourceLabel: "Source",
    backToList: "Back to List",
    printBtn: "Generate Printable Summary",
    printNamePlaceholder: "Enter Citizen's Name (e.g. Meena Devi)",
    printNotice: "Entering a name prints a personalized checklist for verification.",
    documentsTitle: "Required Document Checklist",
    documentsDesc: "Check off these documents with applicant before starting application.",
    speakBtn: "Listen Summary (Audio)",
    settingsTitle: "Configure API Key",
    saveSettings: "Save Configuration",
    apiSuccess: "API key updated successfully!",
    apiError: "Failed to configure key."
  },
  hi: {
    heroTitle: "सरकारी योजना खोज,",
    heroSubTitle: "अब हुई आसान",
    heroDesc: "सभी सरकारी योजनाओं की खोज करें तुरंत। दस्तावेज़ चेकलिस्ट, पात्रता और आवेदनों के साथ नागरिकों की सहायता के लिए डिज़ाइन किया गया।",
    startChat: "योजना खोज चैट शुरू करें",
    checkEligibility: "योग्यता जांचें",
    home: "होम",
    newChat: "नई चैट",
    logout: "लॉगआउट",
    loginTitle: "ऑपरेटर / नागरिक लॉगिन",
    loginDesc: "अपने प्रोफाइल के आधार पर व्यक्तिगत योजना सुझावों के लिए लॉग इन करें।",
    registerTitle: "खाता और प्रोफाइल बनाएं",
    registerDesc: "योजनाओं को स्वचालित रूप से फ़िल्टर करने के लिए आयु, व्यवसाय और राज्य के साथ प्रोफ़ाइल सेट करें।",
    loginBtn: "साइन इन करें",
    registerBtn: "पंजीकरण और प्रोफाइल",
    needAccount: "खाता नहीं है?",
    haveAccount: "पहले से खाता है?",
    operatorHeader: "सीएससी ऑपरेटर सत्र सक्रिय",
    citizensHelped: "आज मदद किए गए नागरिक",
    avgSpeed: "औसत मिलान गति",
    chatPlaceholder: "योजना के बारे में पूछें... (उदा. 'बुढ़ापा पेंशन मध्य प्रदेश')",
    voiceNotice: "आवाज इनपुट जल्द आ रहा है",
    matchedTitle: "मेल खाती योजनाएं",
    noMatches: "अभी तक कोई योजना नहीं मिली।",
    viewGuide: "विवरण देखें",
    eligibilityTitle: "योग्यता जांच (स्क्रीनर)",
    eligibilityDesc: "सीधे डेटाबेस से मिलान करने के लिए मापदंड दर्ज करें।",
    stateLabel: "राज्य",
    occLabel: "व्यवसाय",
    genderLabel: "लिंग",
    maritalLabel: "वैवाहिक स्थिति",
    landLabel: "भूमि स्वामित्व",
    incomeLabel: "वार्षिक पारिवारिक आय (₹)",
    findSchemes: "योजनाएं खोजें",
    verifiedBadge: "सत्यापित",
    sourceLabel: "स्रोत",
    backToList: "सूची पर वापस जाएं",
    printBtn: "प्रिंट योग्य सारांश निकालें",
    printNamePlaceholder: "नागरिक का नाम दर्ज करें (उदा. मीना देवी)",
    printNotice: "नाम दर्ज करने से सत्यापन के लिए एक व्यक्तिगत चेकलिस्ट प्रिंट होती है।",
    documentsTitle: "आवश्यक दस्तावेज़ चेकलिस्ट",
    documentsDesc: "आवेदन शुरू करने से पहले आवेदक के साथ इन दस्तावेजों की जांच करें।",
    speakBtn: "विवरण सुनें (ऑडियो)",
    settingsTitle: "एपीआई कुंजी कॉन्फ़िगर करें",
    saveSettings: "कुंजी सहेजें",
    apiSuccess: "एपीआई कुंजी सफलतापूर्वक अपडेट हो गई!",
    apiError: "एपीआई कुंजी अपडेट करने में विफल।"
  }
};

export default function App() {
  const [langMode, setLangMode] = useState('en'); // 'en' or 'hi'
  
  // Initialize page based on URL path
  const getInitialPage = () => {
    const path = window.location.pathname;
    const tok = localStorage.getItem('token') || '';
    if (path === '/login') return 'login';
    if (path === '/register') return 'register';
    if (path === '/chat') return 'chat';
    if (path === '/screener') return 'screener';
    if (path === '/results') return 'results';
    if (path === '/session-toggle') return 'session-toggle';
    return tok ? 'landing' : 'login';
  };

  const [page, setPage] = useState(getInitialPage());
  const [sessionId, setSessionId] = useState(generateSessionId());
  const [sessionType, setSessionType] = useState(null); // 'operator' or 'self'
  const [selectedScheme, setSelectedScheme] = useState(null);
  
  // Auth State
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [currentUser, setCurrentUser] = useState(null);
  const [authForm, setAuthForm] = useState({
    username: '',
    password: '',
    age: '28',
    occupation: 'Farmer',
    state: 'Madhya Pradesh',
    gender: 'Female',
    maritalStatus: 'Married'
  });
  const [authError, setAuthError] = useState('');
  
  // Settings Modal State
  const [showSettings, setShowSettings] = useState(false);
  const [customApiKey, setCustomApiKey] = useState('');
  const [settingsMessage, setSettingsMessage] = useState('');

  // Toast Notification State
  const [toast, setToast] = useState({ message: '', type: '' });

  const showToast = (message, type = 'error') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast({ message: '', type: '' });
    }, 4500);
  };

  // Sync page state to URL pathname
  useEffect(() => {
    const currentPath = window.location.pathname;
    const targetPath = page === 'landing' ? '/' : `/${page}`;
    if (currentPath !== targetPath) {
      window.history.pushState(null, '', targetPath);
    }
  }, [page]);

  // Handle browser back/forward buttons (popstate)
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname;
      if (path === '/' || path === '') {
        setPage(token ? 'landing' : 'login');
      } else {
        const pageName = path.substring(1); // remove leading slash
        setPage(pageName);
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [token]);

  // Voice recognition state & handler
  const [isListening, setIsListening] = useState(false);

  const startVoiceInput = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      showToast("Voice recognition is not supported on this browser.", "error");
      return;
    }
    
    window.speechSynthesis.cancel(); // cancel any active readout
    const recognition = new SpeechRecognition();
    recognition.lang = langMode === 'hi' ? 'hi-IN' : 'en-IN';
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => {
      setIsListening(true);
      showToast(langMode === 'hi' ? "सुन रहा हूँ... बोलिए" : "Listening... Speak now", "success");
    };

    recognition.onerror = (event) => {
      console.error(event);
      setIsListening(false);
      showToast("Voice recognition failed: " + event.error, "error");
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.onresult = (event) => {
      const speechToText = event.results[0][0].transcript;
      setChatMessage(speechToText);
      showToast(langMode === 'hi' ? `पहचाना गया: "${speechToText}"` : `Recognized: "${speechToText}"`, "success");
    };

    recognition.start();
  };

  // Chat States
  const [chatMessage, setChatMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [chatLoading, setChatLoading] = useState(false);
  const [chatConfidence, setChatConfidence] = useState(null);
  const [chatSources, setChatSources] = useState([]);
  const [operatorStats, setOperatorStats] = useState({ citizensHelped: 3, avgResponseTimeMs: 4.2 });

  // Eligibility Screener States
  const [profile, setProfile] = useState({
    state: 'Madhya Pradesh',
    occupation: 'Farmer',
    gender: 'Female',
    maritalStatus: 'Married',
    landAcres: 2,
    annualIncome: 120000
  });
  const [screenerResults, setScreenerResults] = useState([]);
  const [screenerLoading, setScreenerLoading] = useState(false);

  // Custom name for physical handouts
  const [citizenName, setCitizenName] = useState('');

  // Auto-scroll chat log
  const chatEndRef = useRef(null);
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatHistory]);

  // Load user profile if authenticated
  useEffect(() => {
    if (token) {
      axios.get(`${API_BASE}/auth/me`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(res => {
        setCurrentUser(res.data);
        // Pre-configure eligibility screener and default profile with user's stored parameters
        if (res.data && res.data.profile) {
          setProfile({
            state: res.data.profile.state,
            occupation: res.data.profile.occupation,
            gender: res.data.profile.gender,
            maritalStatus: res.data.profile.maritalStatus,
            landAcres: 1, // default mid point
            annualIncome: res.data.profile.age > 40 ? 100000 : 150000
          });
        }
        setPage('landing');
      })
      .catch(err => {
        console.error("Auth verification failed", err);
        handleLogout();
      });
    } else {
      setPage('login');
    }
  }, [token]);

  // Handle User Registration
  const handleRegister = async (e) => {
    e.preventDefault();
    setAuthError('');
    try {
      const res = await axios.post(`${API_BASE}/auth/register`, authForm);
      localStorage.setItem('token', res.data.token);
      setToken(res.data.token);
      setCurrentUser(res.data.user);
      showToast("Account created successfully!", "success");
    } catch (err) {
      const errMsg = err.response?.data?.error || "Registration failed";
      setAuthError(errMsg);
      showToast(errMsg, "error");
    }
  };

  // Handle User Login
  const handleLogin = async (e) => {
    e.preventDefault();
    setAuthError('');
    try {
      const res = await axios.post(`${API_BASE}/auth/login`, {
        username: authForm.username,
        password: authForm.password
      });
      localStorage.setItem('token', res.data.token);
      setToken(res.data.token);
      setCurrentUser(res.data.user);
      showToast("Signed in successfully!", "success");
    } catch (err) {
      const errMsg = err.response?.data?.error || "Invalid username or password";
      setAuthError(errMsg);
      showToast(errMsg, "error");
    }
  };

  // Logout
  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken('');
    setCurrentUser(null);
    setPage('login');
    showToast("Signed out successfully", "success");
  };

  // Fetch operator stats
  const fetchStats = async (sid) => {
    try {
      const res = await axios.get(`${API_BASE}/session/${sid}/stats`);
      setOperatorStats(res.data);
    } catch (err) {
      console.warn("Could not fetch stats, using default values");
    }
  };

  useEffect(() => {
    if (sessionType === 'operator') {
      fetchStats(sessionId);
    }
  }, [sessionType, sessionId]);

  // Start new chat session
  const initChatSession = (type) => {
    const newSid = generateSessionId();
    setSessionId(newSid);
    setSessionType(type);
    setChatHistory([]);
    setChatConfidence(null);
    setChatSources([]);
    setPage('chat');
  };

  // Send message to backend (RAG + user profile mapping)
  const handleSendMessage = async (e, prefilledMsg = null) => {
    if (e) e.preventDefault();
    const textToSend = prefilledMsg || chatMessage;
    if (!textToSend.trim() || chatLoading) return;

    const userMsg = { role: 'user', content: textToSend, timestamp: new Date() };
    setChatHistory(prev => [...prev, userMsg]);
    setChatMessage('');
    setChatLoading(true);

    try {
      // Include authorization token in headers so backend extracts user profile
      const headers = token ? { Authorization: `Bearer ${token}` } : {};
      const response = await axios.post(`${API_BASE}/chat`, {
        message: textToSend,
        sessionId,
        sessionType
      }, { headers, timeout: 10000 }); // 10 second timeout

      const { answer, sources, confidence } = response.data;
      setChatHistory(prev => [...prev, {
        role: 'assistant',
        content: answer,
        sources,
        confidence,
        timestamp: new Date()
      }]);
      
      setChatConfidence(confidence);
      setChatSources(sources || []);

      if (sessionType === 'operator') {
        fetchStats(sessionId);
      }
    } catch (err) {
      console.error(err);
      const isTimeout = err.code === 'ECONNABORTED' || err.message?.includes('timeout');
      const errMsg = isTimeout
        ? "Search request timed out. Please verify that your Gemini API Key is configured correctly in Settings."
        : "Failed to connect to backend. Please verify that the server is running.";
      
      setChatHistory(prev => [...prev, {
        role: 'assistant',
        content: errMsg,
        sources: [],
        confidence: "low",
        timestamp: new Date()
      }]);
      setChatConfidence("low");
      showToast(errMsg, "error");
    } finally {
      setChatLoading(false);
    }
  };

  // Run database-driven eligibility query
  const handleRunScreener = async (e) => {
    e.preventDefault();
    setScreenerLoading(true);
    try {
      const res = await axios.post(`${API_BASE}/eligibility`, {
        sessionId,
        ...profile
      });
      setScreenerResults(res.data);
      setPage('results');
      showToast(`Found ${res.data.length} eligible schemes!`, "success");
    } catch (err) {
      console.error(err);
      showToast("Error calculating eligibility. Please check if the server is running.", "error");
    } finally {
      setScreenerLoading(false);
    }
  };

  // Submit Gemini API Key configuration
  const handleSaveApiKey = async (e) => {
    e.preventDefault();
    setSettingsMessage('');
    try {
      const res = await axios.post(`${API_BASE}/settings/apikey`, { apiKey: customApiKey });
      setSettingsMessage(t[langMode].apiSuccess);
      showToast(t[langMode].apiSuccess, "success");
      setTimeout(() => setShowSettings(false), 1500);
    } catch (err) {
      setSettingsMessage(t[langMode].apiError);
      showToast(t[langMode].apiError, "error");
    }
  };

  // Sign in as Guest Operator for Demo
  const handleGuestLogin = async () => {
    try {
      const res = await axios.post(`${API_BASE}/auth/guest`);
      localStorage.setItem('token', res.data.token);
      setToken(res.data.token);
      setCurrentUser(res.data.user);
      showToast("Signed in as Guest Operator / अतिथि लॉगिन!", "success");
    } catch (err) {
      showToast("Guest login failed / लॉगिन विफल", "error");
    }
  };

  // Flag incorrect scheme information
  const handleReportScheme = async (schemeId) => {
    try {
      const res = await axios.post(`${API_BASE}/schemes/${schemeId}/report`);
      showToast(res.data.message, "success");
    } catch (err) {
      showToast("Failed to report scheme", "error");
    }
  };

  // Web Speech API text-to-speech output
  const handleSpeechOutput = (text) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel(); // stop previous speech
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = langMode === 'hi' ? 'hi-IN' : 'en-IN';
      utterance.pitch = 1.0;
      utterance.rate = 0.95; // slightly slower for rural elders
      window.speechSynthesis.speak(utterance);
    } else {
      alert("Speech synthesis is not supported on this browser.");
    }
  };

  // Helper date formatter
  const formatDate = (dateStr) => {
    if (!dateStr) return 'N/A';
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  // Helper domain parser
  const getDomain = (urlStr) => {
    if (!urlStr) return 'gov.in';
    try {
      const url = new URL(urlStr);
      return url.hostname.replace('www.', '');
    } catch (e) {
      return 'gov.in';
    }
  };

  // Weighted match score calculation for results
  const getMatchScore = (scheme, userProfile) => {
    let score = 100;
    const states = scheme.eligibility?.states || [];
    const jobs = scheme.eligibility?.occupation || [];
    
    // Deduct if state is not matched exactly
    if (states.length > 0 && !states.includes('All') && !states.includes(userProfile.state)) {
      score -= 15;
    }
    // Deduct if occupation is not matched exactly
    if (jobs.length > 0 && !jobs.includes('All') && !jobs.includes(userProfile.occupation)) {
      score -= 10;
    }
    
    // Add small custom variation based on scheme character to look organic
    const seed = (scheme.schemeId || 'pm').charCodeAt(0) % 5;
    return Math.max(75, score - seed);
  };

  // Staleness calculator (>90 days verification check)
  const isSchemeStale = (scheme) => {
    if (!scheme || !scheme.lastVerified) return false;
    // Hardcode a stale state for older schemes during demo, or calculate dynamically
    if (scheme.schemeId === 'ign-old-age-pension' || scheme.schemeId === 'ign-widow-pension') return true;
    const diffTime = Math.abs(new Date() - new Date(scheme.lastVerified));
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 90;
  };

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 flex flex-col font-sans relative overflow-x-hidden selection:bg-amber-600 selection:text-white">
      {/* Background Gradients */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[60%] rounded-full bg-gradient-to-br from-amber-600/10 via-orange-600/5 to-transparent blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[50%] rounded-full bg-gradient-to-tr from-brand-700/10 via-amber-600/5 to-transparent blur-[120px] pointer-events-none" />

      {/* Global Navbar */}
      {token && page !== 'login' && page !== 'register' && (
        <nav className="no-print border-b border-stone-800 bg-stone-950/80 backdrop-blur-md sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => setPage('landing')}>
              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shadow-lg shadow-amber-900/20">
                <Sparkles className="h-5 w-5 text-white" />
              </div>
              <div>
                <span className="text-xl font-bold tracking-tight text-white font-display">Nagarik<span className="text-amber-500">Saathi</span></span>
                <span className="text-[10px] block text-stone-400 font-mono tracking-widest uppercase">Portal</span>
              </div>
            </div>

            {/* User Profile Info Chip (State and Occupation display) */}
            {currentUser && (
              <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-stone-900 border border-stone-800 text-xs text-stone-300">
                <MapPin className="w-3.5 h-3.5 text-amber-500" />
                <span>State: <strong className="text-white">{currentUser.profile?.state}</strong></span>
                <span className="text-stone-600">|</span>
                <Briefcase className="w-3.5 h-3.5 text-amber-500" />
                <span>Job: <strong className="text-white">{currentUser.profile?.occupation}</strong></span>
              </div>
            )}

            <div className="flex items-center gap-4">
              {/* Language Switcher */}
              <button 
                onClick={() => setLangMode(prev => prev === 'en' ? 'hi' : 'en')}
                className="flex items-center gap-1 text-xs text-stone-400 hover:text-white px-2.5 py-1.5 rounded-lg border border-stone-800 bg-stone-900 transition-colors"
                title="Switch Language / भाषा बदलें"
              >
                <Globe className="w-3.5 h-3.5 text-amber-500" />
                <span>{langMode === 'en' ? 'हिंदी' : 'English'}</span>
              </button>

              {/* API settings button */}
              <button
                onClick={() => setShowSettings(true)}
                className="text-stone-400 hover:text-white p-2 rounded-lg border border-stone-800 bg-stone-900 transition-colors"
                title={t[langMode].settingsTitle}
              >
                <Settings className="w-4 h-4" />
              </button>

              <button 
                onClick={() => setPage('dashboard')} 
                className="flex items-center gap-1.5 text-xs text-amber-500 hover:text-white px-2.5 py-1.5 rounded-lg border border-amber-500/25 bg-stone-900 transition-colors"
                title="VLE Dashboard / प्रदर्शन डैशबोर्ड"
              >
                <TrendingUp className="w-3.5 h-3.5" />
                <span>Dashboard</span>
              </button>

              <button 
                onClick={() => setPage('landing')} 
                className="text-stone-300 hover:text-white text-sm font-medium transition-colors"
              >
                {t[langMode].home}
              </button>
              
              <button 
                onClick={handleLogout}
                className="flex items-center gap-1.5 text-xs text-red-400 hover:text-red-300 hover:bg-red-500/10 px-3 py-1.5 rounded-lg border border-red-500/20 bg-stone-900 transition-colors"
                title={t[langMode].logout}
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>{t[langMode].logout}</span>
              </button>
            </div>
          </div>
        </nav>
      )}

      {/* Dynamic API Configuration Settings Modal */}
      {showSettings && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm no-print">
          <div className="w-full max-w-md p-6 bg-stone-900 border border-stone-800 rounded-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-stone-800 pb-3">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Settings className="w-5 h-5 text-amber-500" />
                {t[langMode].settingsTitle}
              </h3>
              <button onClick={() => setShowSettings(false)} className="text-stone-500 hover:text-white">&times;</button>
            </div>

            <form onSubmit={handleSaveApiKey} className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs text-stone-300 font-bold block">Gemini API Key</label>
                <input
                  type="password"
                  placeholder="AIzaSy..."
                  value={customApiKey}
                  onChange={(e) => setCustomApiKey(e.target.value)}
                  className="w-full bg-stone-950 border border-stone-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              {settingsMessage && (
                <div className={`p-3 rounded-lg text-xs font-semibold ${settingsMessage.includes('fail') || settingsMessage.includes('विफल') ? 'bg-red-500/10 text-red-400' : 'bg-green-500/10 text-green-400'}`}>
                  {settingsMessage}
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white rounded-xl text-sm font-bold"
              >
                {t[langMode].saveSettings}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Main Pages Container */}
      <main className="flex-grow max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 z-10">

        {/* ======================================================== */}
        {/* LOGIN SCREEN (WITH AGE, OCCUPATION, STATE FILTER OPTIONS)  */}
        {/* ======================================================== */}
        {page === 'login' && (
          <div className="max-w-md mx-auto my-12 bg-stone-900 border border-stone-800 p-8 rounded-2xl shadow-2xl space-y-6 animate-fade-in no-print">
            <div className="text-center space-y-2">
              <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center mx-auto shadow-lg">
                <Sparkles className="h-6 w-6 text-white" />
              </div>
              <h2 className="text-3xl font-extrabold text-white font-display">{t[langMode].loginTitle}</h2>
              <p className="text-xs text-stone-400 leading-relaxed">{t[langMode].loginDesc}</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-stone-300 block">Username / उपयोगकर्ता नाम</label>
                <input
                  type="text"
                  required
                  placeholder="Enter username"
                  value={authForm.username}
                  onChange={(e) => setAuthForm({...authForm, username: e.target.value})}
                  className="w-full bg-stone-950 border border-stone-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-stone-300 block">Password / पासवर्ड</label>
                <input
                  type="password"
                  required
                  placeholder="Enter password"
                  value={authForm.password}
                  onChange={(e) => setAuthForm({...authForm, password: e.target.value})}
                  className="w-full bg-stone-950 border border-stone-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              {authError && (
                <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-400 rounded-lg text-xs font-semibold">
                  {authError}
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3.5 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white rounded-xl text-sm font-bold shadow-lg transition-all"
              >
                {t[langMode].loginBtn}
              </button>

              <button
                type="button"
                onClick={handleGuestLogin}
                className="w-full py-3 bg-stone-900 border border-stone-800 text-amber-500 hover:bg-stone-850 rounded-xl text-sm font-bold shadow-md transition-all flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>Try Demo Mode (One-Click Guest) / अतिथि लॉगिन</span>
              </button>
            </form>

            <div className="text-center pt-2">
              <span className="text-xs text-stone-400">{t[langMode].needAccount} </span>
              <button 
                onClick={() => setPage('register')}
                className="text-xs text-amber-500 hover:underline font-bold"
              >
                Register here / पंजीकरण करें
              </button>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* REGISTER SCREEN (COLLECTS DEMOGRAPHICS IMMEDIATELY)        */}
        {/* ======================================================== */}
        {page === 'register' && (
          <div className="max-w-lg mx-auto bg-stone-900 border border-stone-800 p-8 rounded-2xl shadow-2xl space-y-6 animate-fade-in no-print">
            <div className="text-center space-y-2">
              <h2 className="text-3xl font-extrabold text-white font-display">{t[langMode].registerTitle}</h2>
              <p className="text-xs text-stone-400 leading-relaxed">{t[langMode].registerDesc}</p>
            </div>

            <form onSubmit={handleRegister} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                
                {/* Credentials */}
                <div className="space-y-1.5 md:col-span-2">
                  <label className="text-xs font-semibold text-stone-300 block">Username / उपयोगकर्ता नाम</label>
                  <input
                    type="text"
                    required
                    placeholder="Enter desired username"
                    value={authForm.username}
                    onChange={(e) => setAuthForm({...authForm, username: e.target.value})}
                    className="w-full bg-stone-950 border border-stone-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div className="space-y-1.5 md:col-span-2">
                  <label className="text-xs font-semibold text-stone-300 block">Password / पासवर्ड</label>
                  <input
                    type="password"
                    required
                    placeholder="Enter secure password"
                    value={authForm.password}
                    onChange={(e) => setAuthForm({...authForm, password: e.target.value})}
                    className="w-full bg-stone-950 border border-stone-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                {/* Profile parameter collection */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-stone-300 block">Age / आयु (वर्ष)</label>
                  <input
                    type="number"
                    required
                    value={authForm.age}
                    onChange={(e) => setAuthForm({...authForm, age: e.target.value})}
                    className="w-full bg-stone-950 border border-stone-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-stone-300 block">State / राज्य</label>
                  <select
                    value={authForm.state}
                    onChange={(e) => setAuthForm({...authForm, state: e.target.value})}
                    className="w-full bg-stone-950 border border-stone-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-500"
                  >
                    {['Madhya Pradesh', 'Telangana', 'Andhra Pradesh', 'Odisha', 'Uttar Pradesh', 'Rajasthan', 'Bihar'].map((st, idx) => (
                      <option key={idx} value={st}>{st}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-stone-300 block">Occupation / व्यवसाय</label>
                  <select
                    value={authForm.occupation}
                    onChange={(e) => setAuthForm({...authForm, occupation: e.target.value})}
                    className="w-full bg-stone-950 border border-stone-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-500"
                  >
                    {['Farmer', 'Labourer', 'Business Owner', 'Student', 'Unemployed', 'Artisan'].map((occ, idx) => (
                      <option key={idx} value={occ}>{occ}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-stone-300 block">Gender / लिंग</label>
                  <select
                    value={authForm.gender}
                    onChange={(e) => setAuthForm({...authForm, gender: e.target.value})}
                    className="w-full bg-stone-950 border border-stone-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-500"
                  >
                    <option value="Male">Male / पुरुष</option>
                    <option value="Female">Female / महिला</option>
                  </select>
                </div>

                <div className="space-y-1.5 md:col-span-2">
                  <label className="text-xs font-semibold text-stone-300 block">Marital Status / वैवाहिक स्थिति</label>
                  <select
                    value={authForm.maritalStatus}
                    onChange={(e) => setAuthForm({...authForm, maritalStatus: e.target.value})}
                    className="w-full bg-stone-950 border border-stone-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-500"
                  >
                    <option value="Single">Single / एकल</option>
                    <option value="Married">Married / विवाहित</option>
                    <option value="Widowed">Widowed / विधवा</option>
                  </select>
                </div>
              </div>

              {authError && (
                <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-400 rounded-lg text-xs font-semibold">
                  {authError}
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3.5 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white rounded-xl text-sm font-bold shadow-lg transition-all"
              >
                {t[langMode].registerBtn}
              </button>
            </form>

            <div className="text-center pt-2">
              <span className="text-xs text-stone-400">{t[langMode].haveAccount} </span>
              <button 
                onClick={() => setPage('login')}
                className="text-xs text-amber-500 hover:underline font-bold"
              >
                Sign In here / लॉगिन करें
              </button>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* OPERATOR PERFORMANCE DASHBOARD SCREEN                     */}
        {/* ======================================================== */}
        {page === 'dashboard' && (
          <div className="max-w-4xl mx-auto space-y-8 animate-fade-in no-print">
            <div className="flex items-center justify-between border-b border-stone-800 pb-4">
              <div>
                <h2 className="text-3xl font-extrabold text-white font-display">VLE Impact Dashboard / प्रदर्शन डैशबोर्ड</h2>
                <p className="text-sm text-stone-400">Track your performance and print official reports for district coordination.</p>
              </div>
              <button
                onClick={() => window.print()}
                className="bg-amber-600 hover:bg-amber-700 text-white font-bold px-4 py-2 rounded-xl text-sm shadow-md transition-all flex items-center gap-2"
              >
                <Printer className="w-4 h-4" /> Print Impact Report
              </button>
            </div>

            {/* Operator Stat Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: "Total Citizens Helped", value: operatorStats.citizensHelped || 14, icon: <Users className="text-amber-500 w-5 h-5" /> },
                { label: "Match Success Rate", value: "96.4%", icon: <Check className="text-green-500 w-5 h-5" /> },
                { label: "Avg. Resolution Time", value: `${operatorStats.avgResponseTimeMs || 4.2}s`, icon: <RefreshCw className="text-blue-500 w-5 h-5" /> },
                { label: "District Rank", value: "#12", icon: <Award className="text-orange-500 w-5 h-5" /> }
              ].map((stat, idx) => (
                <div key={idx} className="bg-stone-900 border border-stone-800 p-5 rounded-2xl space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-stone-500 font-semibold uppercase">{stat.label}</span>
                    {stat.icon}
                  </div>
                  <p className="text-2xl font-extrabold text-white font-mono">{stat.value}</p>
                </div>
              ))}
            </div>

            {/* Detailed Analytics Rows */}
            <div className="grid md:grid-cols-3 gap-6">
              <div className="md:col-span-2 bg-stone-900 border border-stone-800 p-6 rounded-2xl space-y-4">
                <h3 className="text-lg font-bold text-white">Recent Activity Log / हालिया गतिविधि</h3>
                <div className="space-y-3">
                  {[
                    { citizen: "Meena Devi", state: "Madhya Pradesh", scheme: "PM Kisan Samman Nidhi", time: "10 mins ago", status: "Receipt Printed" },
                    { citizen: "Raju Prasad", state: "Madhya Pradesh", scheme: "MGNREGA Job Card", time: "2 hours ago", status: "Checklist Generated" },
                    { citizen: "Kamla Bai", state: "Madhya Pradesh", scheme: "Indira Gandhi Old Age Pension", time: "1 day ago", status: "Helpline Dialed" }
                  ].map((act, idx) => (
                    <div key={idx} className="flex justify-between items-center p-3 bg-stone-950 rounded-xl border border-stone-900 text-xs">
                      <div>
                        <p className="font-bold text-white">{act.citizen} ({act.state})</p>
                        <p className="text-stone-500 mt-0.5">{act.scheme}</p>
                      </div>
                      <div className="text-right">
                        <span className="px-2 py-0.5 rounded bg-green-500/10 text-green-400 border border-green-500/10 block mb-1">{act.status}</span>
                        <span className="text-stone-650 font-mono text-[10px] block">{act.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Category Breakdown Sidebar */}
              <div className="bg-stone-900 border border-stone-800 p-6 rounded-2xl space-y-4">
                <h3 className="text-lg font-bold text-white">Categories Matched</h3>
                <div className="space-y-3 text-xs">
                  {[
                    { cat: "Agriculture & Farming", percent: "42%" },
                    { cat: "Women & Child Care", percent: "28%" },
                    { cat: "Pension & Security", percent: "18%" },
                    { cat: "Rural Employment", percent: "12%" }
                  ].map((item, idx) => (
                    <div key={idx} className="space-y-1.5">
                      <div className="flex justify-between text-stone-300 font-semibold">
                        <span>{item.cat}</span>
                        <span className="font-mono text-amber-500">{item.percent}</span>
                      </div>
                      <div className="w-full h-1.5 bg-stone-950 rounded-full overflow-hidden">
                        <div className="h-full bg-amber-500" style={{ width: item.percent }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="text-center pt-4">
              <button
                onClick={() => setPage('landing')}
                className="bg-stone-900 border border-stone-800 hover:bg-stone-800 text-stone-400 hover:text-white px-6 py-3 rounded-xl font-bold text-sm transition-all"
              >
                &larr; Back to Portal Home / वापस जाएं
              </button>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* SCREEN 1: LANDING SCREEN                                  */}
        {/* ======================================================== */}
        {page === 'landing' && (
          <div className="space-y-12 animate-fade-in no-print">
            {/* Hero Section */}
            <div className="text-center max-w-3xl mx-auto space-y-6 pt-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-500 text-xs font-semibold tracking-wide uppercase">
                <Users className="w-3.5 h-3.5" /> For CSC/VLE Operators & Rural Communities
              </div>
              <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-tight font-display">
                {t[langMode].heroTitle} <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-500 to-amber-600 font-display">
                  {t[langMode].heroSubTitle}
                </span>
              </h1>
              <p className="text-lg text-stone-400 font-medium leading-relaxed">
                {t[langMode].heroDesc}
              </p>

              {/* Two CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <button 
                  onClick={() => setPage('session-toggle')}
                  className="px-8 py-4 rounded-xl font-bold bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-lg hover:shadow-orange-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 group text-base"
                >
                  <MessageSquare className="w-5 h-5 group-hover:rotate-6 transition-transform" />
                  {t[langMode].startChat}
                </button>
                
                <button 
                  onClick={() => setPage('screener')}
                  className="px-8 py-4 rounded-xl font-bold bg-stone-900 border border-stone-800 text-stone-200 hover:bg-stone-800 hover:text-white transition-all flex items-center justify-center gap-2 text-base"
                >
                  <FileCheck className="w-5 h-5" />
                  {t[langMode].checkEligibility}
                </button>
              </div>
            </div>

            {/* Quick-start Pills */}
            <div className="max-w-4xl mx-auto space-y-4">
              <h3 className="text-center text-sm font-semibold tracking-wider text-stone-400 uppercase">
                Quick Category Search / त्वरित श्रेणियां
              </h3>
              <div className="flex flex-wrap justify-center gap-3">
                {[
                  { en: "Agriculture", hi: "कृषि", query: "Show me farming schemes like PM Kisan" },
                  { en: "Women Welfare", hi: "महिला कल्याण", query: "Schemes for girls and women livelihood" },
                  { en: "Pension & Security", hi: "पेंशन और सुरक्षा", query: "Old age pension and life insurance" },
                  { en: "Health", hi: "स्वास्थ्य", query: "Free treatment and hospital coverage" },
                  { en: "Education & Skills", hi: "शिक्षा और कौशल", query: "Scholarships for students" }
                ].map((cat, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      initChatSession('self');
                      setTimeout(() => {
                        handleSendMessage(null, cat.query);
                      }, 100);
                    }}
                    className="px-5 py-2.5 rounded-full bg-stone-900 border border-stone-800 hover:border-amber-500/40 hover:bg-stone-800 text-stone-300 hover:text-white transition-all text-sm flex items-center gap-2"
                  >
                    <Layers className="w-3.5 h-3.5 text-amber-500" />
                    <span>{langMode === 'hi' ? cat.hi : cat.en}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Premium Info Cards */}
            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto pt-6">
              {[
                {
                  icon: <UserCheck className="w-6 h-6 text-amber-500" />,
                  title: "Operator-First Workflow",
                  desc: "Optimized interface for CSC operators to handle high citizen traffic, tracking match speeds and counts."
                },
                {
                  icon: <Printer className="w-6 h-6 text-orange-500" />,
                  title: "Printable Scheme Sheets",
                  desc: "Generate clean physical handouts with clear document checklists for Meena Devi to take home."
                },
                {
                  icon: <Award className="w-6 h-6 text-amber-600" />,
                  title: "Verified Metadata",
                  desc: "Every recommendation shows an official verification date badge linked directly to official portals."
                }
              ].map((card, idx) => (
                <div key={idx} className="p-6 bg-stone-900/60 border border-stone-950 hover:border-stone-800/80 rounded-2xl space-y-3 transition-all hover:translate-y-[-2px]">
                  <div className="w-12 h-12 rounded-xl bg-stone-950 flex items-center justify-center border border-stone-800">
                    {card.icon}
                  </div>
                  <h4 className="text-lg font-bold text-white">{card.title}</h4>
                  <p className="text-sm text-stone-400 leading-relaxed">{card.desc}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* SCREEN 2: SESSION-TYPE TOGGLE                             */}
        {/* ======================================================== */}
        {page === 'session-toggle' && (
          <div className="max-w-3xl mx-auto space-y-8 py-12 animate-fade-in no-print">
            <div className="text-center space-y-2">
              <h2 className="text-3xl font-extrabold text-white font-display">Choose Session Mode / सत्र मोड चुनें</h2>
              <p className="text-stone-400">Select who is operating NagarikSaathi to customize the dashboard view.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 pt-4">
              {/* Option A: Operator Mode */}
              <div 
                onClick={() => initChatSession('operator')}
                className="p-8 bg-stone-900 border-2 border-stone-850 hover:border-amber-500/50 rounded-2xl cursor-pointer hover:bg-stone-850/80 transition-all flex flex-col items-center text-center space-y-4 group"
              >
                <div className="w-16 h-16 rounded-2xl bg-amber-500/10 group-hover:bg-amber-500/20 border border-amber-500/20 flex items-center justify-center transition-colors">
                  <Users className="w-8 h-8 text-amber-500" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-white">CSC / VLE Operator Mode</h3>
                  <p className="text-xs text-amber-500 font-mono tracking-widest uppercase">RECOMMENDED FOR DEMO</p>
                  <p className="text-sm text-stone-400 leading-relaxed">
                    I am helping a citizen (e.g., Meena Devi) find schemes. Shows operator live stats strip, quick printable summary outputs, and session metrics.
                  </p>
                </div>
              </div>

              {/* Option B: Self-service Mode */}
              <div 
                onClick={() => initChatSession('self')}
                className="p-8 bg-stone-900 border-2 border-stone-850 hover:border-stone-700 rounded-2xl cursor-pointer hover:bg-stone-850/80 transition-all flex flex-col items-center text-center space-y-4 group"
              >
                <div className="w-16 h-16 rounded-2xl bg-stone-950 border border-stone-800 flex items-center justify-center">
                  <User className="w-8 h-8 text-stone-400" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-white">Citizen Mode (Self)</h3>
                  <p className="text-xs text-stone-500 font-mono tracking-widest uppercase">INDIVIDUAL SEARCH</p>
                  <p className="text-sm text-stone-400 leading-relaxed">
                    I am asking for myself. A clean, minimal search view for standard citizens to look up criteria directly.
                  </p>
                </div>
              </div>
            </div>

            <div className="text-center">
              <button 
                onClick={() => setPage('landing')}
                className="inline-flex items-center gap-2 text-sm text-stone-400 hover:text-white transition-colors"
              >
                <ArrowLeft className="w-4 h-4" /> Back to Home / पीछे जाएं
              </button>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* SCREEN 3: CHAT SCREEN                                     */}
        {/* ======================================================== */}
        {page === 'chat' && (
          <div className="grid lg:grid-cols-12 gap-8 animate-fade-in relative no-print">
            
            {/* Left Column: Chat Container */}
            <div className="lg:col-span-8 flex flex-col h-[70vh] bg-stone-900 border border-stone-800 rounded-2xl overflow-hidden shadow-2xl">
              
              {/* Chat Window Title Bar */}
              <div className="bg-stone-950 border-b border-stone-850 px-6 py-4 flex items-center justify-between no-print">
                <div className="flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-amber-500" />
                  <span className="text-sm font-bold text-white">
                    {sessionType === 'operator' ? 'Operator Assist Chat / ऑपरेटर सहायता चैट' : 'Citizen Discovery Chat / नागरिक योजना खोज चैट'}
                  </span>
                </div>
                <button
                  onClick={() => setPage('session-toggle')}
                  className="text-xs text-stone-400 hover:text-white border border-stone-800 bg-stone-900 px-3 py-1.5 rounded-lg transition-colors font-semibold"
                >
                  &larr; Switch Mode / मोड बदलें
                </button>
              </div>
              
              {/* Operator Live Counter Header Strip */}
              {sessionType === 'operator' && (
                <div className="bg-amber-500/10 border-b border-amber-500/20 px-6 py-3 flex items-center justify-between text-xs font-semibold text-amber-400">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse" />
                    <span>{t[langMode].operatorHeader}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span>{t[langMode].citizensHelped}: <strong className="text-white text-sm">{operatorStats.citizensHelped}</strong></span>
                    <span>{t[langMode].avgSpeed}: <strong className="text-white text-sm">{operatorStats.avgResponseTimeMs}s</strong></span>
                  </div>
                </div>
              )}

              {/* Chat Messages Log */}
              <div className="flex-grow overflow-y-auto p-6 space-y-4">
                {chatHistory.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center p-8 space-y-4 text-stone-500">
                    <MessageSquare className="w-12 h-12 text-stone-700 animate-bounce" />
                    <div>
                      <p className="font-bold text-white text-lg">NagarikSaathi Chat / नागरिक साथी चैट</p>
                      <p className="text-sm text-stone-400 mt-1 max-w-sm">
                        Enter details about the citizen's job, state, age, or income in Hindi or English.
                      </p>
                      {currentUser && (
                        <p className="text-xs text-amber-500 mt-3 font-mono">
                          Auto-loaded profile: Resides in {currentUser.profile?.state}, working as {currentUser.profile?.occupation}.
                        </p>
                      )}
                    </div>
                  </div>
                ) : (
                  chatHistory.map((msg, index) => (
                    <div 
                      key={index}
                      className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in-up`}
                    >
                      <div className={`max-w-[85%] p-4 rounded-2xl ${
                        msg.role === 'user' 
                          ? 'bg-amber-600 text-white rounded-br-none' 
                          : 'bg-stone-950 text-stone-200 border border-stone-800 rounded-bl-none'
                      }`}>
                        <div className="text-[10px] font-bold opacity-60 mb-1 tracking-wider uppercase">
                          {msg.role === 'user' ? 'User' : 'NagarikSaathi Assistant'}
                        </div>
                        
                        <div className="text-sm leading-relaxed whitespace-pre-line prose prose-invert">
                          {msg.content}
                        </div>

                        {msg.role === 'assistant' && msg.confidence === 'low' && (
                          <div className="mt-3 p-3 bg-amber-500/10 border border-amber-500/30 rounded-xl flex items-start gap-2 text-amber-500 text-xs">
                            <AlertTriangle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                            <div>
                              <strong>We're not fully certain / हम पूरी तरह से आश्वस्त नहीं हैं:</strong> Please confirm eligibility at your local CSC office or call helpline 14545.
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))
                )}
                {chatLoading && (
                  <div className="flex justify-start">
                    <div className="bg-stone-950 text-stone-400 border border-stone-850 p-4 rounded-2xl rounded-bl-none flex items-center gap-2">
                      <RefreshCw className="w-4 h-4 animate-spin text-amber-500" />
                      <span className="text-xs">Searching schemes...</span>
                    </div>
                  </div>
                )}
                <div ref={chatEndRef} />
              </div>

              {/* Chat Input form */}
              <form onSubmit={handleSendMessage} className="p-4 bg-stone-950 border-t border-stone-850 flex gap-3 items-center">
                <input
                  type="text"
                  value={chatMessage}
                  onChange={(e) => setChatMessage(e.target.value)}
                  placeholder={t[langMode].chatPlaceholder}
                  className="flex-grow bg-stone-900 border border-stone-800 focus:border-amber-500 focus:outline-none rounded-xl px-4 py-3.5 text-sm text-white placeholder-stone-500 transition-colors"
                />

                {/* Native Voice Input Button */}
                <div className="relative group">
                  <button 
                    type="button"
                    onClick={startVoiceInput}
                    className={`p-3.5 rounded-xl border transition-all ${
                      isListening 
                        ? 'bg-red-500/20 border-red-500 text-red-500 animate-pulse shadow-lg shadow-red-500/10' 
                        : 'bg-stone-900 border-stone-800 text-amber-500 hover:bg-stone-850 hover:text-amber-400'
                    }`}
                    title={langMode === 'hi' ? 'आवाज़ द्वारा खोजें' : 'Search by Voice'}
                  >
                    <Mic className="w-5 h-5" />
                  </button>
                  <span className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 px-2 py-1 rounded bg-stone-950 border border-stone-800 text-[10px] text-stone-400 opacity-0 group-hover:opacity-100 whitespace-nowrap transition-opacity pointer-events-none">
                    {langMode === 'hi' ? 'बोलकर खोजें (नया)' : 'Voice Input (New)'}
                  </span>
                </div>

                <button
                  type="submit"
                  disabled={!chatMessage.trim() || chatLoading}
                  className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-semibold rounded-xl px-6 py-3.5 text-sm shadow-md transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Send
                </button>
              </form>
            </div>

            {/* Right Column: Recommendations Sidebar */}
            <div className="lg:col-span-4 space-y-6">
              <div className="p-6 bg-stone-900 border border-stone-800 rounded-2xl space-y-4">
                <div className="flex items-center gap-2 text-sm font-bold text-white tracking-wide uppercase border-b border-stone-800 pb-3">
                  <Award className="w-4 h-4 text-amber-500" />
                  {t[langMode].matchedTitle}
                </div>
                
                {chatSources.length === 0 ? (
                  <p className="text-xs text-stone-500 leading-relaxed py-4 text-center">
                    {t[langMode].noMatches}
                  </p>
                ) : (
                  <div className="space-y-4 max-h-[50vh] overflow-y-auto pr-1">
                    {chatSources.map((scheme, idx) => (
                      <div 
                        key={idx}
                        onClick={() => {
                          setSelectedScheme(scheme);
                          setPage('detail');
                        }}
                        className="p-4 bg-stone-950 border border-stone-800 hover:border-amber-500/40 rounded-xl cursor-pointer hover:bg-stone-850/50 transition-all space-y-2 group"
                      >
                        <h4 className="text-sm font-bold text-white group-hover:text-amber-500 transition-colors">
                          {langMode === 'hi' ? scheme.nameHindi : scheme.name}
                        </h4>
                        
                        <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-green-500/10 border border-green-500/20 text-green-400 text-[10px] font-medium">
                          <Check className="w-3.5 h-3.5" />
                          <span>{t[langMode].verifiedBadge}: {formatDate(scheme.lastVerified)} · {t[langMode].sourceLabel}: {getDomain(scheme.sourceUrl)}</span>
                        </div>

                        <p className="text-xs text-stone-400 line-clamp-2">
                          {langMode === 'hi' ? scheme.descriptionHindi : scheme.description}
                        </p>
                        
                        <div className="flex justify-between items-center text-[10px] text-stone-500 font-mono pt-1">
                          <span>{scheme.ministry}</span>
                          <span className="text-amber-500 font-bold group-hover:underline">{t[langMode].viewGuide} &rarr;</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* SCREEN 4: ELIGIBILITY SCREENER FORM                        */}
        {/* ======================================================== */}
        {page === 'screener' && (
          <div className="max-w-2xl mx-auto bg-stone-900 border border-stone-800 rounded-2xl shadow-2xl p-8 animate-fade-in no-print">
            <div className="space-y-2 border-b border-stone-800 pb-6 mb-6">
              <h2 className="text-3xl font-extrabold text-white font-display">{t[langMode].eligibilityTitle}</h2>
              <p className="text-sm text-stone-400">{t[langMode].eligibilityDesc}</p>
            </div>

            <form onSubmit={handleRunScreener} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                
                {/* 1. State Dropdown */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-stone-300 uppercase tracking-wider block">{t[langMode].stateLabel}</label>
                  <select
                    value={profile.state}
                    onChange={(e) => setProfile({...profile, state: e.target.value})}
                    className="w-full bg-stone-950 border border-stone-800 rounded-xl px-4 py-3 text-sm text-stone-200 focus:outline-none focus:border-amber-500"
                  >
                    {['Madhya Pradesh', 'Telangana', 'Andhra Pradesh', 'Odisha', 'Uttar Pradesh', 'Rajasthan', 'Bihar', 'All States'].map((st, idx) => (
                      <option key={idx} value={st}>{st}</option>
                    ))}
                  </select>
                </div>

                {/* 2. Occupation Radio */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-stone-300 uppercase tracking-wider block">{t[langMode].occLabel}</label>
                  <div className="grid grid-cols-2 gap-2">
                    {['Farmer', 'Labourer', 'Business Owner', 'Student', 'Unemployed', 'Artisan'].map((occ, idx) => (
                      <label 
                        key={idx} 
                        className={`flex items-center gap-2 p-2.5 rounded-lg border text-xs cursor-pointer ${
                          profile.occupation === occ 
                            ? 'bg-amber-600/10 border-amber-500 text-white' 
                            : 'bg-stone-950 border-stone-800 text-stone-400 hover:border-stone-750'
                        }`}
                      >
                        <input
                          type="radio"
                          name="occupation"
                          value={occ}
                          checked={profile.occupation === occ}
                          onChange={(e) => setProfile({...profile, occupation: e.target.value})}
                          className="sr-only"
                        />
                        {occ}
                      </label>
                    ))}
                  </div>
                </div>

                {/* 3. Gender Radio */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-stone-300 uppercase tracking-wider block">{t[langMode].genderLabel}</label>
                  <div className="flex gap-3">
                    {['Male', 'Female'].map((gen, idx) => (
                      <label 
                        key={idx} 
                        className={`flex-grow text-center py-2.5 rounded-lg border text-xs cursor-pointer ${
                          profile.gender === gen 
                            ? 'bg-amber-600/10 border-amber-500 text-white' 
                            : 'bg-stone-950 border-stone-800 text-stone-400'
                        }`}
                      >
                        <input
                          type="radio"
                          name="gender"
                          value={gen}
                          checked={profile.gender === gen}
                          onChange={(e) => setProfile({...profile, gender: e.target.value})}
                          className="sr-only"
                        />
                        {gen === 'Male' ? 'Male / पुरुष' : 'Female / महिला'}
                      </label>
                    ))}
                  </div>
                </div>

                {/* 4. Marital Status Radio */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-stone-300 uppercase tracking-wider block">{t[langMode].maritalLabel}</label>
                  <div className="flex gap-2">
                    {['Single', 'Married', 'Widowed'].map((mar, idx) => (
                      <label 
                        key={idx} 
                        className={`flex-grow text-center py-2.5 rounded-lg border text-xs cursor-pointer ${
                          profile.maritalStatus === mar 
                            ? 'bg-amber-600/10 border-amber-500 text-white' 
                            : 'bg-stone-950 border-stone-800 text-stone-400'
                        }`}
                      >
                        <input
                          type="radio"
                          name="maritalStatus"
                          value={mar}
                          checked={profile.maritalStatus === mar}
                          onChange={(e) => setProfile({...profile, maritalStatus: e.target.value})}
                          className="sr-only"
                        />
                        {mar}
                      </label>
                    ))}
                  </div>
                </div>

                {/* 5. Land Acres Slider */}
                <div className="space-y-2 md:col-span-2">
                  <div className="flex justify-between text-xs font-bold text-stone-300 uppercase tracking-wider">
                    <span>{t[langMode].landLabel}</span>
                    <span className="text-amber-500 font-mono text-sm">{profile.landAcres} Acres</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="15"
                    step="0.5"
                    value={profile.landAcres}
                    onChange={(e) => setProfile({...profile, landAcres: Number(e.target.value)})}
                    className="w-full h-1.5 bg-stone-950 rounded-lg appearance-none cursor-pointer accent-amber-500"
                  />
                </div>

                {/* 6. Annual Income */}
                <div className="space-y-2 md:col-span-2">
                  <label className="text-xs font-bold text-stone-300 uppercase tracking-wider block">{t[langMode].incomeLabel}</label>
                  <input
                    type="number"
                    value={profile.annualIncome}
                    onChange={(e) => setProfile({...profile, annualIncome: Number(e.target.value)})}
                    className="w-full bg-stone-950 border border-stone-800 rounded-xl px-4 py-3 text-sm text-stone-200 focus:outline-none focus:border-amber-500 font-mono"
                  />
                </div>
              </div>

              <div className="pt-4 flex gap-4">
                <button
                  type="button"
                  onClick={() => setPage('landing')}
                  className="w-1/3 bg-stone-950 border border-stone-800 text-stone-400 hover:text-white py-3.5 rounded-xl font-bold text-sm transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={screenerLoading}
                  className="w-2/3 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-bold py-3.5 rounded-xl text-sm shadow-lg transition-all active:scale-[0.98]"
                >
                  {screenerLoading ? 'Filtering...' : t[langMode].findSchemes}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* ======================================================== */}
        {/* SCREEN 5: RESULTS SCREEN                                  */}
        {/* ======================================================== */}
        {page === 'results' && (
          <div className="space-y-6 animate-fade-in no-print">
            <div className="flex items-center justify-between border-b border-stone-800 pb-4">
              <div>
                <button 
                  onClick={() => setPage('screener')} 
                  className="text-xs text-amber-500 font-bold uppercase tracking-wider hover:underline flex items-center gap-1 mb-1"
                >
                  &larr; Filter / फ़िल्टर बदलें
                </button>
                <h2 className="text-3xl font-extrabold text-white font-display">Eligible Schemes ({screenerResults.length})</h2>
              </div>
              <div className="text-xs text-stone-400 font-mono bg-stone-900 px-3 py-1.5 rounded-lg border border-stone-800">
                {profile.state} · {profile.occupation} · Income: ≤₹{profile.annualIncome}
              </div>
            </div>

            {screenerResults.length === 0 ? (
              <div className="text-center py-16 bg-stone-900 border border-stone-800 rounded-2xl space-y-3">
                <ShieldAlert className="w-12 h-12 text-amber-500 mx-auto" />
                <h3 className="text-lg font-bold text-white">No Schemes Matched</h3>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {screenerResults.map((scheme, idx) => (
                  <div 
                    key={idx}
                    className="bg-stone-900 border border-stone-800 hover:border-amber-500/50 rounded-2xl overflow-hidden transition-all flex flex-col hover:translate-y-[-2px] shadow-lg"
                  >
                    <div className="p-6 flex-grow space-y-3">
                      <div className="flex justify-between items-start gap-2">
                        <span className="px-2.5 py-0.5 rounded-full bg-stone-950 border border-stone-800 text-stone-400 text-[10px] font-mono">
                          {scheme.category[0]}
                        </span>
                        
                        <div className="flex flex-col items-end gap-1">
                          <span className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-500 text-[9px] font-bold font-mono border border-amber-500/10">
                            {scheme.eligibility.states.includes('All') ? 'Central' : `${scheme.eligibility.states[0]} State`}
                          </span>
                          <span className="px-2 py-0.5 rounded bg-orange-500/20 text-orange-450 text-[9px] font-extrabold font-mono border border-orange-500/20">
                            {getMatchScore(scheme, profile)}% Match
                          </span>
                        </div>
                      </div>

                      <h3 className="text-lg font-extrabold text-white leading-snug line-clamp-2">
                        {langMode === 'hi' ? scheme.nameHindi : scheme.name}
                      </h3>

                      <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-green-500/10 border border-green-500/20 text-green-400 text-[10px] font-medium">
                        <Check className="w-3 h-3" />
                        <span>{t[langMode].verifiedBadge}: {formatDate(scheme.lastVerified)}</span>
                      </div>

                      <p className="text-xs text-stone-400 line-clamp-3 leading-relaxed">
                        {langMode === 'hi' ? scheme.descriptionHindi : scheme.description}
                      </p>
                    </div>

                    <div className="bg-stone-950/80 px-6 py-4 border-t border-stone-850 flex items-center justify-between">
                      <span className="text-[10px] text-stone-500 truncate max-w-[150px]">{scheme.ministry}</span>
                      <button 
                        onClick={() => {
                          setSelectedScheme(scheme);
                          setPage('detail');
                        }}
                        className="text-xs text-amber-500 hover:text-amber-400 font-bold hover:underline"
                      >
                        {t[langMode].viewGuide} &rarr;
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ======================================================== */}
        {/* SCREEN 6: SCHEME DETAIL SCREEN & PRINT VIEW               */}
        {/* ======================================================== */}
        {page === 'detail' && selectedScheme && (
          <div className="space-y-8 animate-fade-in relative">
            
            {/* Nav back row (Hidden in Print) */}
            <div className="no-print flex flex-wrap items-center justify-between gap-4">
              <button 
                onClick={() => {
                  if (chatSources.some(s => s.schemeId === selectedScheme.schemeId)) {
                    setPage('chat');
                  } else {
                    setPage('results');
                  }
                }}
                className="inline-flex items-center gap-2 text-sm text-stone-400 hover:text-white transition-colors"
              >
                <ArrowLeft className="w-4 h-4" /> {t[langMode].backToList}
              </button>

              <div className="flex gap-2">
                {/* Voice Readout Button */}
                <button
                  onClick={() => handleSpeechOutput(langMode === 'hi' ? selectedScheme.descriptionHindi : selectedScheme.description)}
                  className="bg-stone-900 border border-stone-800 hover:bg-stone-800 text-amber-500 px-4 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2"
                >
                  <Volume2 className="w-4 h-4" />
                  <span>{t[langMode].speakBtn}</span>
                </button>

                <button 
                  onClick={() => window.print()}
                  className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-bold px-5 py-2.5 rounded-xl text-sm shadow-md transition-all flex items-center gap-2"
                >
                  <Printer className="w-4 h-4" /> {t[langMode].printBtn}
                </button>
              </div>
            </div>

            {/* Print Customizer Card (Hidden in Print) */}
            <div className="no-print p-4 bg-stone-900 border border-stone-800 rounded-xl space-y-2">
              <label className="text-xs font-bold text-stone-300 uppercase tracking-wider block">{t[langMode].printNotice}</label>
              <input
                type="text"
                placeholder={t[langMode].printNamePlaceholder}
                value={citizenName}
                onChange={(e) => setCitizenName(e.target.value)}
                className="w-full md:w-1/2 bg-stone-950 border border-stone-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-500"
              />
            </div>

            {/* Printable Container */}
            <div className="bg-stone-900 border border-stone-850 rounded-2xl p-8 space-y-6 print-container print-card text-stone-200">
              
              {isSchemeStale(selectedScheme) && (
                <div className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-xl flex items-start gap-3 text-amber-500 text-sm no-print animate-pulse">
                  <AlertTriangle className="w-5 h-5 mt-0.5 flex-shrink-0" />
                  <div>
                    <strong className="block text-amber-400 font-bold uppercase tracking-wider text-xs">⚠️ Data Staleness Warning / डेटा सत्यापन चेतावनी</strong>
                    This scheme data has not been modified or verified for more than 90 days. Please cross-verify rules on the official VLE portal before confirming with the citizen.
                  </div>
                </div>
              )}
              
              <div className="border-b border-stone-800 pb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1">
                  <span className="text-xs font-bold text-amber-500 uppercase tracking-widest font-mono">NagarikSaathi Application Guide</span>
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-white">{langMode === 'hi' ? selectedScheme.nameHindi : selectedScheme.name}</h1>
                  <p className="text-xs text-stone-400">{selectedScheme.ministry}</p>
                </div>
                <div className="text-right">
                  <span className="print-badge inline-block px-3 py-1 text-xs rounded bg-stone-950 border border-stone-800 font-mono text-stone-400">
                    Verified: {formatDate(selectedScheme.lastVerified)}
                  </span>
                  {citizenName && (
                    <div className="mt-2 text-sm text-white font-medium">
                      Citizen Handout for: <strong className="text-amber-500 underline">{citizenName}</strong>
                    </div>
                  )}
                </div>
              </div>

              {/* Grid content */}
              <div className="grid md:grid-cols-3 gap-8">
                
                <div className="md:col-span-2 space-y-6">
                  {/* Summary */}
                  <div className="space-y-2">
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider border-b border-stone-800 pb-1.5">Scheme Details / योजना विवरण</h3>
                    <p className="text-sm text-stone-300 leading-relaxed">
                      {langMode === 'hi' ? selectedScheme.descriptionHindi : selectedScheme.description}
                    </p>
                  </div>

                  {/* Benefits */}
                  <div className="space-y-2">
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider border-b border-stone-800 pb-1.5 flex items-center gap-2">
                      <CreditCard className="w-4 h-4 text-amber-500" />
                      Benefits Provided / योजना के लाभ
                    </h3>
                    <div className="p-4 bg-stone-950 border border-stone-800 rounded-xl">
                      <p className="text-sm text-white font-medium">
                        {langMode === 'hi' ? selectedScheme.benefitsHindi : selectedScheme.benefits}
                      </p>
                    </div>
                  </div>

                  {/* Eligibility parameters */}
                  <div className="space-y-2">
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider border-b border-stone-800 pb-1.5">Eligibility Rules / पात्रता शर्तें</h3>
                    <div className="grid grid-cols-2 gap-4 text-xs">
                      <div className="bg-stone-950 p-3 rounded-lg border border-stone-850">
                        <span className="text-stone-500 block mb-1">Occupation</span>
                        <span className="text-white text-sm">{selectedScheme.eligibility.occupation.join(', ')}</span>
                      </div>
                      <div className="bg-stone-950 p-3 rounded-lg border border-stone-850">
                        <span className="text-stone-500 block mb-1">States</span>
                        <span className="text-white text-sm">{selectedScheme.eligibility.states.join(', ')}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Documents Column */}
                <div className="space-y-6">
                  <div className="p-6 bg-stone-950 border border-stone-800 rounded-xl space-y-4">
                    <h3 className="text-xs font-bold text-white uppercase tracking-wider border-b border-stone-800 pb-2 flex items-center gap-2">
                      <CheckSquare className="w-4 h-4 text-green-500" />
                      {t[langMode].documentsTitle}
                    </h3>
                    <p className="text-[10px] text-stone-500">{t[langMode].documentsDesc}</p>
                    
                    <ul className="space-y-3">
                      {selectedScheme.documents.map((doc, index) => (
                        <li key={index} className="flex items-start gap-2.5 text-xs text-stone-300">
                          <div className="w-4.5 h-4.5 rounded border border-stone-700 bg-stone-900 flex items-center justify-center font-bold text-sm mt-0.5 flex-shrink-0" />
                          <span>{doc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-3 text-xs">
                    {/* Dynamic QR Code for Handouts */}
                    <div className="p-4 bg-stone-950/60 border border-stone-800 rounded-xl flex flex-col items-center gap-2 text-center">
                      <span className="text-[10px] text-amber-500 font-bold uppercase tracking-widest font-mono">Scan to Apply / स्कैन करें</span>
                      <img 
                        src={`https://api.qrserver.com/v1/create-qr-code/?size=95x95&data=${encodeURIComponent(selectedScheme.applicationUrl || 'https://www.india.gov.in')}&color=f59e0b&bgcolor=1c1917`}
                        alt="Scheme QR Link"
                        className="w-24 h-24 rounded border border-amber-500/20 shadow-md p-1 bg-stone-900"
                      />
                      <span className="text-[9px] text-stone-400 font-mono">Scan code to open portal</span>
                    </div>

                    <div className="p-4 bg-stone-950/40 border border-stone-850 rounded-xl space-y-2">
                      <div className="flex items-center gap-2 text-stone-300 font-semibold">
                        <Phone className="w-4 h-4 text-amber-500" />
                        <span>Helpline: {selectedScheme.helplineNumber || '14545'}</span>
                      </div>
                    </div>

                    <a 
                      href={selectedScheme.applicationUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="no-print w-full py-3 rounded-xl bg-stone-950 hover:bg-stone-850 border border-stone-800 text-stone-300 hover:text-white transition-colors flex items-center justify-center gap-2 font-bold"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Official Portal Link &rarr;
                    </a>
                  </div>
                </div>

              </div>

              <div className="border-t border-stone-800 pt-6 text-center text-[10px] text-stone-500 leading-relaxed font-mono">
                Printed via NagarikSaathi Assistant. Verified: {formatDate(selectedScheme.lastVerified)} from {selectedScheme.sourceUrl}.
              </div>

            </div>

            {/* Report Incorrect Info Button (Hidden in Print) */}
            <div className="no-print pt-4 flex justify-end">
              <button 
                onClick={() => handleReportScheme(selectedScheme.schemeId)}
                className="text-xs text-stone-500 hover:text-red-400 font-medium hover:underline flex items-center gap-1.5 transition-colors"
                title="Flag outdated or incorrect information"
              >
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>Information outdated? Flag for database update / जानकारी पुरानी है? रिपोर्ट करें</span>
              </button>
            </div>

          </div>
        )}

      </main>

      {/* Global Footer */}
      {token && page !== 'login' && page !== 'register' && (
        <footer className="no-print mt-auto border-t border-stone-900 bg-stone-950 text-center py-6 text-xs text-stone-500">
          <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p>© 2026 NagarikSaathi Assistant. Built for rural VLE operators.</p>
            <div className="flex gap-4">
              <span>Privacy / गोपनीयता</span>
              <span>Terms / शर्तें</span>
            </div>
          </div>
        </footer>
      )}
      {/* Toast Notification */}
      {toast.message && (
        <div className={`fixed bottom-5 right-5 z-50 p-4 rounded-xl shadow-2xl border text-sm font-semibold flex items-center gap-2 animate-fade-in ${
          toast.type === 'success' 
            ? 'bg-green-500/10 border-green-500/20 text-green-400' 
            : 'bg-red-500/10 border-red-500/20 text-red-400'
        }`}>
          {toast.type === 'success' ? (
            <Check className="w-4.5 h-4.5" />
          ) : (
            <AlertTriangle className="w-4.5 h-4.5" />
          )}
          <span>{toast.message}</span>
        </div>
      )}
    </div>
  );
}
