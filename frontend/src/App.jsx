import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { 
  Search, MessageSquare, ShieldAlert, Award, FileText, CheckSquare,
  MapPin, User, FileCheck, Phone, ExternalLink, HelpCircle, ArrowLeft,
  TrendingUp, Check, Users, Sparkles, BookOpen, AlertTriangle, Settings, LogOut, Volume2, Globe, Mic, Briefcase
} from 'lucide-react';
import { INDIAN_STATES, OCCUPATIONS, CASTE_CATEGORIES, LANGUAGES } from './utils/constants.js';
import EligibilityScreener from './components/EligibilityScreener.jsx';
import ResultsScreen from './components/ResultsScreen.jsx';
import DetailScreen from './components/DetailScreen.jsx';
import AuthScreen from './components/AuthScreen.jsx';
import LandingScreen from './components/LandingScreen.jsx';
import DashboardScreen from './components/DashboardScreen.jsx';
import ChatScreen from './components/ChatScreen.jsx';

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
    maritalStatus: 'Married',
    annualIncome: 50000,
    casteCategory: 'General',
    languagePreference: 'hi'
  });
  const [authError, setAuthError] = useState('');
  
  // Settings Modal State
  const [showSettings, setShowSettings] = useState(false);
  const [customApiKey, setCustomApiKey] = useState('');
  const [settingsMessage, setSettingsMessage] = useState('');

  // Toast Notification & Global Error State
  const [toast, setToast] = useState({ message: '', type: '' });
  const [globalError, setGlobalError] = useState('');

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
    gender: 'Male',
    maritalStatus: 'Single',
    landAcres: 0,
    annualIncome: 50000,
    casteCategory: 'General',
    languagePreference: 'hi'
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
  const fetchStats = async () => {
    try {
      const res = await axios.get(`${API_BASE}/stats`);
      setOperatorStats(res.data);
    } catch (err) {
      console.warn("Could not fetch stats, using default values");
    }
  };

  useEffect(() => {
    if (sessionType === 'operator') {
      fetchStats();
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
      setGlobalError('');
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
        fetchStats();
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
      setGlobalError(errMsg);
      showToast(errMsg, "error");
    } finally {
      setChatLoading(false);
    }
  };

  // Run database-driven eligibility query
  const handleRunScreener = async (e) => {
    e.preventDefault();
    setPage('results');
    setScreenerLoading(true);
    setGlobalError('');
    try {
      const res = await axios.post(`${API_BASE}/eligibility`, {
        sessionId,
        ...profile
      });
      setScreenerResults(res.data);
      showToast(`Found ${res.data.length} eligible schemes!`, "success");
    } catch (err) {
      console.error(err);
      const errMsg = "Error calculating eligibility. Please check if the server is running.";
      setGlobalError(errMsg);
      showToast(errMsg, "error");
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
      {globalError && (
        <div className="bg-red-600/90 text-white text-sm font-semibold text-center py-2 z-50 relative animate-fade-in flex items-center justify-center gap-2">
          <AlertTriangle className="w-4 h-4" /> {globalError}
        </div>
      )}
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
        {/* AUTH SCREENS                                               */}
        {/* ======================================================== */}
        {(page === 'login' || page === 'register') && (
          <AuthScreen 
            page={page}
            setPage={setPage}
            t={t}
            langMode={langMode}
            authForm={authForm}
            setAuthForm={setAuthForm}
            authError={authError}
            handleLogin={handleLogin}
            handleRegister={handleRegister}
            handleGuestLogin={handleGuestLogin}
          />
        )}

        {/* ======================================================== */}
        {/* OPERATOR PERFORMANCE DASHBOARD SCREEN                     */}
        {/* ======================================================== */}
        {page === 'dashboard' && (
          <DashboardScreen setPage={setPage} operatorStats={operatorStats} />
        )}

        {/* ======================================================== */}
        {/* LANDING & SESSION TOGGLE SCREENS                          */}
        {/* ======================================================== */}
        {(page === 'landing' || page === 'session-toggle') && (
          <LandingScreen 
            page={page}
            setPage={setPage}
            t={t}
            langMode={langMode}
            initChatSession={initChatSession}
            handleSendMessage={handleSendMessage}
          />
        )}

        {/* ======================================================== */}
        {/* SCREEN 3: CHAT SCREEN                                     */}
        {/* ======================================================== */}
        {page === 'chat' && (
          <ChatScreen 
            setPage={setPage}
            sessionType={sessionType}
            t={t}
            langMode={langMode}
            operatorStats={operatorStats}
            chatHistory={chatHistory}
            currentUser={currentUser}
            chatLoading={chatLoading}
            chatEndRef={chatEndRef}
            handleSendMessage={handleSendMessage}
            chatMessage={chatMessage}
            setChatMessage={setChatMessage}
            startVoiceInput={startVoiceInput}
            isListening={isListening}
            chatSources={chatSources}
            setSelectedScheme={setSelectedScheme}
            formatDate={formatDate}
            getDomain={getDomain}
          />
        )}

        {/* ======================================================== */}
        {/* SCREEN 4: ELIGIBILITY SCREENER FORM                        */}
        {/* ======================================================== */}
        {page === 'screener' && (
          <EligibilityScreener 
            profile={profile} 
            setProfile={setProfile} 
            handleRunScreener={handleRunScreener} 
            setPage={setPage} 
            screenerLoading={screenerLoading} 
            t={t} 
            langMode={langMode} 
          />
        )}

        {/* ======================================================== */}
        {/* SCREEN 5: RESULTS SCREEN                                  */}
        {/* ======================================================== */}
        {page === 'results' && (
          <ResultsScreen 
            screenerResults={screenerResults}
            screenerLoading={screenerLoading}
            profile={profile}
            setPage={setPage}
            setSelectedScheme={setSelectedScheme}
            getMatchScore={getMatchScore}
            formatDate={formatDate}
            t={t}
            langMode={langMode}
          />
        )}

        {/* ======================================================== */}
        {/* SCREEN 6: SCHEME DETAIL SCREEN & PRINT VIEW               */}
        {/* ======================================================== */}
        {page === 'detail' && selectedScheme && (
          <DetailScreen 
            selectedScheme={selectedScheme}
            chatSources={chatSources}
            setPage={setPage}
            handleSpeechOutput={handleSpeechOutput}
            langMode={langMode}
            t={t}
            citizenName={citizenName}
            setCitizenName={setCitizenName}
            isSchemeStale={isSchemeStale}
            formatDate={formatDate}
            handleReportScheme={handleReportScheme}
          />
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
