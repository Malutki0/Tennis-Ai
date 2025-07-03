import React, { useState, useEffect, useRef, useCallback } from 'react';

// Komponent modalny dla niestandardowych alertów
const Modal = ({ message, onClose }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
            <div className="bg-white p-8 rounded-2xl shadow-3xl max-w-sm w-full text-center transform transition-all duration-300 scale-100 opacity-100 animate-fade-in-up">
                <p className="text-gray-800 text-lg mb-8 font-semibold">{message}</p>
                <button
                    onClick={onClose}
                    className="btn bg-gradient-to-r from-[#CCFF00] to-[#B3E600] hover:from-[#B3E600] hover:to-[#99CC00] active:from-[#99CC00] active:to-[#80B300] text-gray-900"
                >
                    OK
                </button>
            </div>
        </div>
    );
};

// Dane językowe
const translations = {
    pl: {
        appName: "Tennis AI Line Judge",
        appDescription: "To jest prototyp aplikacji mobilnej 'Tennis AI Line Judge', stworzony w celu demonstracji jej kluczowych funkcjonalności. Aplikacja symuluje wykrywanie, czy piłka tenisowa trafiła w obręb pola gry ('IN') czy poza nie ('OUT'), wykorzystując podgląd z kamery. W prawdziwej aplikacji, w tym miejscu działałby zaawansowany model sztucznej inteligencji, analizujący obraz wideo w czasie rzeczywistym. Aby rozpocząć, najpierw skalibruj kort, klikając w cztery narożniki kortu na obrazie z kamery, a następnie kliknij 'Rozpocznij Detekcję'.",
        cameraWaiting: "Czekam na obraz z kamery...",
        cameraAccessDenied: "Błąd dostępu do kamery. Upewnij się, że zezwoliłeś na dostęp i żadna inna aplikacja jej nie używa.",
        aiLoading: "Ładowanie modelu AI...",
        aiLoadingWait: "(Proszę czekać)",
        calibrateCorner: "Kliknij, aby zaznaczyć",
        corner: "narożnik",
        in: "IN",
        out: "OUT",
        calibrateCourt: "Kalibruj Kort",
        startDetection: "Rozpocznij Detekcję",
        stopDetection: "Zatrzymaj Detekcję",
        resetApp: "Resetuj Aplikację",
        sessionStats: "Statystyki Sesji",
        detectionHistory: "Historia Detekcji",
        noDetections: "Brak zarejestrowanych detekcji.",
        cameraNotReady: "Kamera nie jest gotowa. Proszę poczekać lub sprawdzić dostęp do kamery.",
        aiNotLoaded: "Model AI nie jest jeszcze załadowany. Proszę poczekać.",
        courtNotCalibrated: "Proszę najpierw skalibrować kort, zaznaczając 4 narożniki.",
        loginTitle: "Zaloguj się do Tennis AI",
        usernamePlaceholder: "Nazwa użytkownika",
        passwordPlaceholder: "Hasło",
        loginButton: "Zaloguj",
        settingsTitle: "Ustawienia",
        theme: "Motyw",
        language: "Język",
        darkMode: "Ciemny",
        lightMode: "Jasny",
        polish: "Polski",
        english: "Angielski",
        home: "Home",
        profile: "Profil",
        settings: "Ustawienia",
        logout: "Wyloguj",
        uiStage: "UI Stage",
        userInterface: "User Interface",
        permissions: "Uprawnienia",
        cameraAccess: "Dostęp do kamery",
        cameraAccessDesc: "Wymagany do analizy obrazu wideo. Możesz zarządzać tym w ustawieniach prywatności urządzenia.",
        internetAccess: "Dostęp do Internetu",
        internetAccessDesc: "Wymagany dla funkcji chmurowych (np. historia, statystyki PRO/CLUB).",
        profileStats: "Twoje Statystyki",
        premiumPlans: "Plany Premium",
        premiumDesc: "Ulepsz do planu PRO lub CLUB, aby odblokować zaawansowane statystyki, eksporty raportów i tryb sędziowski.",
        viewPlans: "Zobacz plany",
        back: "Wróć",
    },
    en: {
        appName: "Tennis AI Line Judge",
        appDescription: "This is a prototype of the 'Tennis AI Line Judge' mobile application, created to demonstrate its key functionalities. The application simulates detecting whether a tennis ball landed within the playing field ('IN') or outside ('OUT') using a camera feed. In a real application, an advanced artificial intelligence model would analyze the video feed in real-time. To start, first calibrate the court by clicking on its four corners in the camera view, then click 'Start Detection'.",
        cameraWaiting: "Waiting for camera feed...",
        cameraAccessDenied: "Camera access error. Please ensure you've granted permission and no other app is using it.",
        aiLoading: "Loading AI model...",
        aiLoadingWait: "(Please wait)",
        calibrateCorner: "Click to mark",
        corner: "corner",
        in: "IN",
        out: "OUT",
        calibrateCourt: "Calibrate Court",
        startDetection: "Start Detection",
        stopDetection: "Stop Detection",
        resetApp: "Reset Application",
        sessionStats: "Session Statistics",
        detectionHistory: "Detection History",
        noDetections: "No detections recorded.",
        cameraNotReady: "Camera is not ready. Please wait or check camera access.",
        aiNotLoaded: "AI model is not loaded yet. Please wait.",
        courtNotCalibrated: "Please calibrate the court first by marking 4 corners.",
        loginTitle: "Login to Tennis AI",
        usernamePlaceholder: "Username",
        passwordPlaceholder: "Password",
        loginButton: "Login",
        settingsTitle: "Settings",
        theme: "Theme",
        language: "Language",
        darkMode: "Dark",
        lightMode: "Light",
        polish: "Polish",
        english: "English",
        home: "Home",
        profile: "Profile",
        settings: "Settings",
        logout: "Logout",
        uiStage: "UI Stage",
        userInterface: "User Interface",
        permissions: "Permissions",
        cameraAccess: "Camera Access",
        cameraAccessDesc: "Required for video analysis. You can manage this in your device's privacy settings.",
        internetAccess: "Internet Access",
        internetAccessDesc: "Required for cloud features (e.g., PRO/CLUB history, statistics).",
        profileStats: "Your Statistics",
        premiumPlans: "Premium Plans",
        premiumDesc: "Upgrade to PRO or CLUB plan to unlock advanced statistics, report exports, and referee mode.",
        viewPlans: "View Plans",
        back: "Back",
    }
};

// Komponent ekranu logowania
const LoginScreen = ({ onLogin, currentLanguage }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const t = translations[currentLanguage];

    const handleSubmit = (e) => {
        e.preventDefault();
        // Symulacja logowania - w prawdziwej aplikacji byłaby tu walidacja i autoryzacja
        if (username === 'user' && password === 'password') {
            onLogin(true);
        } else if (username === 'admin' && password === '1') { // Dodane konto admin
            onLogin(true);
        }
        else {
            alert('Nieprawidłowa nazwa użytkownika lub hasło.'); // Używamy alertu tylko dla symulacji
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-[#1A1A1A] text-gray-100 p-4">
            <div className="bg-[#2A2A2A] p-10 rounded-2xl shadow-3xl max-w-md w-full border border-[#4A4A4A]">
                <h2 className="text-4xl font-bold text-white mb-8 text-center">{t.loginTitle}</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="username" className="sr-only">{t.usernamePlaceholder}</label>
                        <input
                            type="text"
                            id="username"
                            placeholder={t.usernamePlaceholder}
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full p-4 rounded-full bg-[#4A4A4A] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#CCFF00]"
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="sr-only">{t.passwordPlaceholder}</label>
                        <input
                            type="password"
                            id="password"
                            placeholder={t.passwordPlaceholder}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-4 rounded-full bg-[#4A4A4A] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#CCFF00]"
                        />
                    </div>
                    <button type="submit" className="btn w-full bg-gradient-to-r from-[#CCFF00] to-[#B3E600] hover:from-[#B3E600] hover:to-[#99CC00] text-gray-900">
                        {t.loginButton}
                    </button>
                </form>
            </div>
        </div>
    );
};

// Komponent ustawień (modal)
const SettingsModal = ({ onClose, currentTheme, onThemeChange, currentLanguage, onLanguageChange, onLogout }) => {
    const t = translations[currentLanguage];
    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
            <div className="bg-[#2A2A2A] p-8 rounded-2xl shadow-3xl max-w-md w-full border border-[#4A4A4A] transform transition-all duration-300 scale-100 opacity-100 animate-fade-in-up">
                <h2 className="text-3xl font-bold text-white mb-8 text-center">{t.settingsTitle}</h2>

                <div className="mb-6">
                    <h3 className="text-xl font-semibold text-gray-300 mb-4">{t.theme}</h3>
                    <div className="flex justify-center gap-4">
                        <button
                            onClick={() => onThemeChange('dark')}
                            className={`btn ${currentTheme === 'dark' ? 'bg-[#CCFF00] text-gray-900' : 'bg-gray-600'} hover:bg-[#B3E600]`}
                        >
                            {t.darkMode}
                        </button>
                        <button
                            onClick={() => onThemeChange('light')}
                            className={`btn ${currentTheme === 'light' ? 'bg-[#CCFF00] text-gray-900' : 'bg-gray-600'} hover:bg-[#B3E600]`}
                        >
                            {t.lightMode}
                        </button>
                    </div>
                </div>

                <div className="mb-8">
                    <h3 className="text-xl font-semibold text-gray-300 mb-4">{t.language}</h3>
                    <div className="flex justify-center gap-4">
                        <button
                            onClick={() => onLanguageChange('pl')}
                            className={`btn ${currentLanguage === 'pl' ? 'bg-[#CCFF00] text-gray-900' : 'bg-gray-600'} hover:bg-[#B3E600]`}
                        >
                            {t.polish}
                        </button>
                        <button
                            onClick={() => onLanguageChange('en')}
                            className={`btn ${currentLanguage === 'en' ? 'bg-[#CCFF00] text-gray-900' : 'bg-gray-600'} hover:bg-[#B3E600]`}
                        >
                            {t.english}
                        </button>
                    </div>
                </div>

                <div className="mb-8 p-4 bg-[#3A3A3A] rounded-xl border border-[#4A4A4A]">
                    <h3 className="text-xl font-semibold text-gray-300 mb-4">{t.permissions}</h3>
                    <div className="space-y-4">
                        <div>
                            <p className="text-gray-200 font-medium">{t.cameraAccess}</p>
                            <p className="text-gray-400 text-sm">{t.cameraAccessDesc}</p>
                        </div>
                        <div>
                            <p className="text-gray-200 font-medium">{t.internetAccess}</p>
                            <p className="text-gray-400 text-sm">{t.internetAccessDesc}</p>
                        </div>
                    </div>
                </div>

                <button
                    onClick={onLogout}
                    className="btn bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 w-full mb-4"
                >
                    {t.logout}
                </button>
                <button
                    onClick={onClose}
                    className="btn bg-gray-600 hover:bg-gray-700 w-full"
                >
                    OK
                </button>
            </div>
        </div>
    );
};

// Komponent ekranu profilu
const ProfileScreen = ({ inCount, outCount, currentLanguage, onClose }) => {
    const t = translations[currentLanguage];
    return (
        <div className="flex flex-col items-center p-4 sm:p-6 lg:p-8 font-inter w-full max-w-3xl">
            <h2 className="text-5xl font-extrabold text-white mb-8 tracking-tight text-center">{t.profile}</h2>

            {/* Twoje Statystyki */}
            <div className="w-full bg-[#2A2A2A] p-8 rounded-2xl shadow-3xl mb-10 border border-[#4A4A4A]">
                <h3 className="text-3xl font-bold text-white mb-6 text-center">{t.profileStats}</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-center">
                    <div className="p-6 bg-[#3A3A3A] rounded-xl shadow-inner flex flex-col items-center justify-center">
                        <p className="text-6xl font-extrabold text-[#CCFF00] mb-2">{inCount}</p>
                        <p className="text-gray-300 text-xl font-medium">{t.in}</p>
                    </div>
                    <div className="p-6 bg-[#3A3A3A] rounded-xl shadow-inner flex flex-col items-center justify-center">
                        <p className="text-6xl font-extrabold text-red-400 mb-2">{outCount}</p>
                        <p className="text-gray-300 text-xl font-medium">{t.out}</p>
                    </div>
                </div>
            </div>

            {/* Plany Premium */}
            <div className="w-full bg-[#2A2A2A] p-8 rounded-2xl shadow-3xl mb-10 border border-[#4A4A4A]">
                <h3 className="text-3xl font-bold text-white mb-6 text-center">{t.premiumPlans}</h3>
                <p className="text-lg text-gray-300 text-center mb-8 leading-relaxed">
                    {t.premiumDesc}
                </p>
                <button className="btn w-full bg-gradient-to-r from-[#CCFF00] to-[#B3E600] hover:from-[#B3E600] hover:to-[#99CC00] text-gray-900">
                    {t.viewPlans}
                </button>
            </div>

            <button
                onClick={onClose}
                className="btn bg-gray-600 hover:bg-gray-700 w-full max-w-xs"
            >
                {t.back}
            </button>
        </div>
    );
};


// Główny komponent aplikacji
const App = () => {
    // Stan zarządzający trybem aplikacji (bezczynny, kalibracja, detekcja)
    const [mode, setMode] = useState('idle'); // 'idle', 'calibrating', 'detecting'
    // Stan przechowujący skalibrowane narożniki kortu (4 punkty)
    const [courtCorners, setCourtCorners] = useState([]);
    // Stan przechowujący historię detekcji (zdarzenia IN/OUT)
    const [history, setHistory] = useState([]);
    // Stan dla wyświetlania bieżącego statusu IN/OUT
    const [currentStatus, setCurrentStatus] = useState('');
    // Stan dla liczników IN/OUT
    const [inCount, setInCount] = useState(0);
    const [outCount, setOutCount] = useState(0);
    // Stan do śledzenia, czy kamera jest gotowa
    const [isCameraReady, setIsCameraReady] = useState(false);
    // Stan do śledzenia, czy model AI jest załadowany i gotowy
    const [isAIReady, setIsAIReady] = useState(false);
    // Stan dla komunikatu o błędzie kamery
    const [cameraError, setCameraError] = useState('');
    // Stan dla komunikatu modalnego
    const [modalMessage, setModalMessage] = useState('');
    // Stan logowania
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    // Stan motywu (dark/light)
    const [currentTheme, setCurrentTheme] = useState('dark');
    // Stan języka
    const [currentLanguage, setCurrentLanguage] = useState('pl');
    // Stan widoczności ustawień
    const [showSettings, setShowSettings] = useState(false);
    // Stan aktualnie wyświetlanego ekranu
    const [currentScreen, setCurrentScreen] = useState('main'); // 'main', 'profile'

    // Pobierz tłumaczenia dla bieżącego języka
    const t = translations[currentLanguage];

    // Referencja do elementu canvas
    const canvasRef = useRef(null);
    // Referencja do ukrytego elementu wideo, który będzie odtwarzał strumień z kamery
    const videoRef = useRef(null);
    // Referencja do obiektu MediaStream do zarządzania ścieżkami kamery
    const streamRef = useRef(null);
    // Referencja do ID klatki animacji do zatrzymywania/uruchamiania symulacji
    const animationFrameId = useRef(null);
    // Referencja do ostatniej symulowanej pozycji piłki
    const lastBallPosition = useRef(null);

    // Stałe dla wymiarów canvas (symulowany podgląd z kamery)
    const CANVAS_WIDTH = 640;
    const CANVAS_HEIGHT = 480;

    // Funkcja do rysowania na canvas
    const draw = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');

        // Wyczyść canvas
        ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

        // Narysuj klatkę wideo, jeśli kamera jest gotowa
        if (isCameraReady && videoRef.current && videoRef.current.readyState === 4) {
            ctx.drawImage(videoRef.current, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        } else {
            // Powrót do tła zastępczego, jeśli kamera nie jest gotowa
            ctx.fillStyle = '#1A1A1A'; // Ciemne tło
            ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
            ctx.fillStyle = '#cbd5e0'; // Jasnoszary tekst
            ctx.font = '20px Inter';
            ctx.textAlign = 'center';
            ctx.fillText(t.cameraWaiting, CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2);
        }

        // Narysuj linie kortu, jeśli skalibrowano
        if (courtCorners.length === 4) {
            ctx.strokeStyle = '#CCFF00'; // Kolor piłki tenisowej
            ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.moveTo(courtCorners[0].x, courtCorners[0].y);
            ctx.lineTo(courtCorners[1].x, courtCorners[1].y);
            ctx.lineTo(courtCorners[2].x, courtCorners[2].y);
            ctx.lineTo(courtCorners[3].x, courtCorners[3].y);
            ctx.closePath();
            ctx.stroke();

            // Narysuj linię środkową (uproszczoną)
            ctx.beginPath();
            ctx.moveTo((courtCorners[0].x + courtCorners[3].x) / 2, (courtCorners[0].y + courtCorners[3].y) / 2);
            ctx.lineTo((courtCorners[1].x + courtCorners[2].x) / 2, (courtCorners[1].y + courtCorners[2].y) / 2);
            ctx.stroke();
        }

        // Narysuj punkty kalibracji
        courtCorners.forEach((point, index) => {
            ctx.fillStyle = '#CCFF00'; // Kolor piłki tenisowej dla punktów kalibracji
            ctx.beginPath();
            ctx.arc(point.x, point.y, 8, 0, Math.PI * 2); // Zwiększony promień do 8
            ctx.fill();
            ctx.font = '14px Inter'; // Nieco większa czcionka dla numeru
            ctx.fillStyle = '#1A1A1A'; // Ciemny tekst dla numerów na jasnych punktach
            ctx.fillText(`${index + 1}`, point.x + 12, point.y - 12); // Dostosowana pozycja dla większego okręgu
        });

        // Narysuj ostatnią symulowaną pozycję piłki, jeśli dostępna
        if (lastBallPosition.current) {
            ctx.fillStyle = currentStatus === t.in ? '#CCFF00' : '#ef4444'; // Kolor piłki tenisowej dla IN, Czerwony dla OUT
            ctx.beginPath();
            ctx.arc(lastBallPosition.current.x, lastBallPosition.current.y, 8, 0, Math.PI * 2);
            ctx.fill();
        }
    }, [courtCorners, currentStatus, isCameraReady, t]);

    // Efekt do pobierania strumienia z kamery i ciągłego rysowania klatek
    useEffect(() => {
        const setupCameraAndAI = async () => {
            try {
                // 1. Poproś o dostęp do kamery wideo użytkownika
                const stream = await navigator.mediaDevices.getUserMedia({ video: true });
                streamRef.current = stream; // Zapisz strumień do czyszczenia
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                    // Poczekaj, aż wideo załaduje metadane, aby upewnić się, że jest gotowe do odtwarzania
                    videoRef.current.onloadedmetadata = () => {
                        videoRef.current.play();
                        setIsCameraReady(true);
                        setCameraError(''); // Wyczyść wszelkie poprzednie błędy kamery
                    };
                }

                // 2. Zasymuluj ładowanie modelu AI
                // W prawdziwej aplikacji, tutaj załadowałbyś swój model TensorFlow.js.
                // Przykład: const model = await tf.loadGraphModel('path/to/your/model.json');
                console.log('Ładowanie modelu AI...');
                await new Promise(resolve => setTimeout(resolve, 2000)); // Zasymuluj 2-sekundowy czas ładowania
                setIsAIReady(true);
                console.log('Model AI załadowany.');

            } catch (err) {
                console.error("Błąd dostępu do kamery lub ładowania AI:", err);
                setCameraError(t.cameraAccessDenied);
                setIsCameraReady(false);
                setIsAIReady(false);
            }
        };

        // Uruchom konfigurację kamery i AI tylko jeśli użytkownik jest zalogowany
        if (isLoggedIn) {
            setupCameraAndAI();
        } else {
            // Jeśli użytkownik nie jest zalogowany, upewnij się, że kamera i AI są wyłączone
            if (streamRef.current) {
                streamRef.current.getTracks().forEach(track => track.stop());
                streamRef.current = null;
            }
            setIsCameraReady(false);
            setIsAIReady(false);
        }

        // Pętla animacji do ciągłego rysowania klatek wideo na canvas
        let frameId;
        const animate = () => {
            draw();
            frameId = requestAnimationFrame(animate);
        };
        animate();

        // Funkcja czyszcząca: zatrzymaj ścieżki kamery i anuluj klatkę animacji
        return () => {
            if (streamRef.current) {
                streamRef.current.getTracks().forEach(track => track.stop());
            }
            if (frameId) {
                cancelAnimationFrame(frameId);
            }
        };
    }, [draw, isLoggedIn, t]); // Rysuj ponownie, gdy referencja funkcji draw lub stan logowania się zmieni

    // Obsługa kliknięć do kalibracji (teraz na divie nakładki)
    const handleCalibrationOverlayClick = (event) => {
        const canvas = canvasRef.current;
        const rect = canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        setCourtCorners(prevCorners => {
            const newCorners = [...prevCorners, { x, y }];
            if (newCorners.length === 4) {
                setMode('idle'); // Kalibracja zakończona
                // Tutaj zazwyczaj wykonywałbyś obliczenia homografii
                // W tej symulacji po prostu przechowujemy punkty.
            }
            return newCorners;
        });
    };

    // Funkcja do sprawdzania, czy punkt znajduje się wewnątrz skalibrowanego kortu (uproszczone sprawdzanie wielokąta)
    const isPointInPolygon = useCallback((point, polygon) => {
        if (polygon.length < 3) return false; // Niewłaściwy wielokąt
        let inside = false;
        for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
            const xi = polygon[i].x, yi = polygon[i].y;
            const xj = polygon[j].x, yj = polygon[j].y;

            const intersect = ((yi > point.y) !== (yj > point.y)) &&
                (point.x < (xj - xi) * (point.y - yi) / (yj - yi) + xi);
            if (intersect) inside = !inside;
        }
        return inside;
    }, []);


    // Symulacja detekcji piłki i logiki IN/OUT
    const simulateDetection = useCallback(() => {
        if (mode !== 'detecting' || courtCorners.length !== 4 || !isCameraReady || !isAIReady) {
            // Jeśli nie w trybie detekcji, lub kort nie skalibrowany, lub kamera/AI nie gotowe, zatrzymaj lub poczekaj
            if (animationFrameId.current) {
                cancelAnimationFrame(animationFrameId.current);
                clearTimeout(animationFrameId.current);
                animationFrameId.current = null;
            }
            return;
        }

        // --- KONCEPCJA INTEGRACJI PRAWDZIWEJ AI ---
        // W prawdziwej aplikacji, w tym miejscu:
        // 1. Zarejestrowałbyś bieżącą klatkę wideo z `videoRef.current`.
        //    Przykład: const imageTensor = tf.browser.fromPixels(videoRef.current);
        // 2. Przetworzyłbyś wstępnie imageTensor, jeśli to konieczne (zmiana rozmiaru, normalizacja).
        // 3. Uruchomiłbyś wnioskowanie modelu AI.
        //    Przykład: const predictions = await model.execute(imageTensor);
        // 4. Przeanalizowałbyś przewidywania, aby uzyskać współrzędne ramki ograniczającej piłki.
        //    Przykład: const ballBoundingBox = predictions[0].dataSync(); // Uproszczone
        // 5. Przekształciłbyś ramkę ograniczającą w pojedynczy punkt (np. środek ramki) do śledzenia trajektorii.
        //    Dla symulacji generujemy losowy punkt.
        const ballX = Math.random() * CANVAS_WIDTH;
        const ballY = Math.random() * CANVAS_HEIGHT;
        lastBallPosition.current = { x: ballX, y: ballY };

        // --- KONIEC KONCEPCJI INTEGRACJI PRAWDZIWEJ AI ---

        // Określ, czy symulowane odbicie jest IN czy OUT
        const isIN = isPointInPolygon(lastBallPosition.current, courtCorners);
        const status = isIN ? t.in : t.out;

        setCurrentStatus(status);
        const timestamp = new Date().toLocaleTimeString();

        setHistory(prevHistory => [{ status, timestamp, x: ballX, y: ballY }, ...prevHistory.slice(0, 9)]); // Zachowaj ostatnie 10
        if (isIN) {
            setInCount(prev => prev + 1);
        } else {
            setOutCount(prev => prev + 1);
            // Zasymuluj dźwięk dla OUT
            console.log('OUT! Dźwięk alarmowy!'); // W prawdziwej aplikacji, odtwórz plik audio
        }

        // Zaplanuj kolejną detekcję po krótkim opóźnieniu
        animationFrameId.current = setTimeout(() => {
            animationFrameId.current = requestAnimationFrame(simulateDetection);
        }, 1000); // Symuluj detekcję co 1 sekundę
    }, [mode, courtCorners, isPointInPolygon, isCameraReady, isAIReady, t]);

    // Obsługa uruchomienia detekcji
    const startDetection = () => {
        if (!isCameraReady) {
            setModalMessage(t.cameraNotReady);
            return;
        }
        if (!isAIReady) {
            setModalMessage(t.aiNotLoaded);
            return;
        }
        if (courtCorners.length !== 4) {
            setModalMessage(t.courtNotCalibrated);
            return;
        }
        setMode('detecting');
        simulateDetection();
    };

    // Obsługa zatrzymania detekcji
    const stopDetection = () => {
        setMode('idle');
        if (animationFrameId.current) {
            cancelAnimationFrame(animationFrameId.current);
            clearTimeout(animationFrameId.current); // Wyczyść timeout, jeśli jest ustawiony
            animationFrameId.current = null;
        }
        lastBallPosition.current = null; // Wyczyść ostatnią pozycję piłki
        setCurrentStatus(''); // Wyczyść bieżący status
    };

    // Zresetuj wszystkie stany
    const resetApp = () => {
        stopDetection();
        setCourtCorners([]);
        setHistory([]);
        setInCount(0);
        setOutCount(0);
        setCurrentStatus('');
        setCameraError(''); // Wyczyść błąd kamery po resecie
        setModalMessage(''); // Wyczyść wszelkie aktywne modale
        // Ponownie zainicjuj kamerę i AI po resecie
        setIsCameraReady(false);
        setIsAIReady(false);
    };

    // Obsługa wylogowania
    const handleLogout = () => {
        setIsLoggedIn(false);
        resetApp(); // Zresetuj stan aplikacji po wylogowaniu
        setShowSettings(false); // Ukryj ustawienia
    };

    // Klasa tła w zależności od motywu
    const themeBgClass = currentTheme === 'dark' ? 'bg-[#1A1A1A]' : 'bg-gray-100 text-gray-900';
    const themeCardBgClass = currentTheme === 'dark' ? 'bg-[#2A2A2A]' : 'bg-white text-gray-900';
    const themeBorderClass = currentTheme === 'dark' ? 'border-[#4A4A4A]' : 'border-gray-200';
    const themeTextClass = currentTheme === 'dark' ? 'text-gray-100' : 'text-gray-900';
    const themeSecondaryTextClass = currentTheme === 'dark' ? 'text-gray-300' : 'text-gray-600';

    if (!isLoggedIn) {
        return <LoginScreen onLogin={setIsLoggedIn} currentLanguage={currentLanguage} />;
    }

    return (
        <div className={`min-h-screen ${themeBgClass} ${themeTextClass} flex flex-col items-center p-4 sm:p-6 lg:p-8 font-inter`}>
            <style>
                {`
                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');
                body {
                    font-family: 'Inter', sans-serif;
                    background-color: ${currentTheme === 'dark' ? '#1A1A1A' : '#f3f4f6'}; /* Dynamiczne tło */
                }
                .btn {
                    @apply px-6 py-3 rounded-full shadow-lg transition-all duration-300 ease-in-out font-semibold text-white text-lg; /* Rounded-full dla przycisków */
                    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08);
                }
                /* Dostosowanie kolorów przycisków do palety z obrazka */
                .btn-primary {
                    @apply bg-gradient-to-r from-[#CCFF00] to-[#B3E600] hover:from-[#B3E600] hover:to-[#99CC00] active:from-[#99CC00] active:to-[#80B300] text-gray-900; /* Kolor piłki tenisowej */
                }
                .btn-secondary {
                    @apply bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 active:from-gray-800 active:to-gray-900;
                }
                .btn-danger {
                    @apply bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 active:from-red-700 active:to-red-800;
                }
                .btn-success {
                    @apply bg-gradient-to-r from-[#CCFF00] to-[#B3E600] hover:from-[#B3E600] hover:to-[#99CC00] active:from-[#99CC00] active:to-[#80B300] text-gray-900; /* Kolor piłki tenisowej */
                }
                .toast {
                    @apply fixed bottom-8 left-1/2 -translate-x-1/2 px-8 py-4 rounded-full shadow-2xl z-50 transition-all duration-300 ease-out transform scale-100 opacity-100 animate-fade-in-up;
                    font-size: 1.5rem; /* Większa czcionka dla toast */
                    font-weight: 700;
                    letter-spacing: 0.05em;
                }
                @keyframes fade-in-up {
                    from {
                        opacity: 0;
                        transform: translateY(20px) translateX(-50%);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0) translateX(-50%);
                    }
                }
                `}
            </style>

            {/* Renderuj odpowiedni ekran w zależności od stanu currentScreen */}
            {currentScreen === 'main' && (
                <>
                    {/* Górny pasek nawigacyjny - usunięty */}

                    <h1 className="text-5xl font-extrabold text-white mb-4 tracking-tight">
                        <span className="text-[#CCFF00]">{t.appName.split(' ')[0]} AI</span> {t.appName.split(' ').slice(1).join(' ')}
                    </h1>
                    <p className="text-lg mb-10 text-center max-w-3xl leading-relaxed" style={{ color: currentTheme === 'dark' ? '#E0E0E0' : '#333' }}>
                        {t.appDescription}
                    </p>

                    {cameraError && (
                        <div className="bg-red-700 text-white p-4 rounded-lg mb-6 w-full max-w-xl text-center shadow-md">
                            {cameraError}
                        </div>
                    )}

                    {/* Podgląd z kamery / Canvas - teraz jako "karta" */}
                    <div className={`relative ${themeCardBgClass} rounded-2xl shadow-3xl overflow-hidden mb-10 border-4 ${themeBorderClass} w-full max-w-3xl aspect-video`}>
                        {/* Ukryty element wideo do odtwarzania strumienia z kamery */}
                        <video
                            ref={videoRef}
                            style={{ display: 'none' }}
                            autoPlay
                            playsInline
                            muted
                        />
                        <canvas
                            ref={canvasRef}
                            width={CANVAS_WIDTH}
                            height={CANVAS_HEIGHT}
                            className={`w-full h-full object-cover rounded-2xl ${mode === 'calibrating' ? 'border-[#CCFF00] cursor-crosshair' : 'border-transparent'}`}
                        >
                            Twoja przeglądarka nie obsługuje elementu canvas.
                        </canvas>
                        {/* Nakładka dla ładowania kamery/AI/kalibracji */}
                        {(!isCameraReady || !isAIReady || (mode === 'calibrating' && courtCorners.length < 4)) && (
                            <div
                                className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-60 text-white text-3xl font-bold p-4"
                                onClick={mode === 'calibrating' ? handleCalibrationOverlayClick : undefined}
                                style={{ cursor: mode === 'calibrating' ? 'crosshair' : 'default' }}
                            >
                                {!isCameraReady ? (
                                    <>
                                        <span className="mb-2">{t.cameraWaiting}</span>
                                        <span className="text-lg text-gray-400">(Upewnij się, że zezwoliłeś na dostęp)</span>
                                    </>
                                ) : !isAIReady ? (
                                    <>
                                        <span className="mb-2">{t.aiLoading}</span>
                                        <span className="text-lg text-gray-400">{t.aiLoadingWait}</span>
                                    </>
                                ) : mode === 'calibrating' && courtCorners.length < 4 ? (
                                    <>
                                        <span className="mb-2">{t.calibrateCorner}</span>
                                        <span className="text-[#CCFF00]">{t.corner} {courtCorners.length + 1}</span>
                                    </>
                                ) : null}
                            </div>
                        )}
                        {currentStatus && (
                            <div className={`toast ${currentStatus === t.in ? 'bg-[#CCFF00] text-gray-900' : 'bg-red-500'} text-white`}>
                                {currentStatus === t.in ? `🟢 ${t.in}!` : `🔴 ${t.out}!`}
                            </div>
                        )}
                    </div>

                    {/* Przyciski sterujące */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10 w-full max-w-3xl">
                        <button
                            onClick={() => {
                                setMode('calibrating');
                                setCourtCorners([]); // Zresetuj narożniki dla nowej kalibracji
                            }}
                            disabled={mode === 'calibrating' || mode === 'detecting' || !isCameraReady || !isAIReady}
                            className="btn btn-primary"
                        >
                            {t.calibrateCourt}
                        </button>
                        <button
                            onClick={startDetection}
                            disabled={mode === 'detecting' || courtCorners.length !== 4 || !isCameraReady || !isAIReady}
                            className="btn btn-success"
                        >
                            {t.startDetection}
                        </button>
                        <button
                            onClick={stopDetection}
                            disabled={mode !== 'detecting'}
                            className="btn btn-danger"
                        >
                            {t.stopDetection}
                        </button>
                        <button
                            onClick={resetApp}
                            className="btn btn-secondary"
                        >
                            {t.resetApp}
                        </button>
                    </div>

                    {/* Statystyki */}
                    <div className={`w-full max-w-3xl ${themeCardBgClass} p-8 rounded-2xl shadow-3xl mb-10 border ${themeBorderClass}`}>
                        <h2 className={`text-3xl font-bold ${themeTextClass} mb-6 text-center`}>{t.sessionStats}</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-center">
                            <div className={`p-6 ${currentTheme === 'dark' ? 'bg-[#3A3A3A]' : 'bg-gray-100'} rounded-xl shadow-inner flex flex-col items-center justify-center`}>
                                <p className="text-6xl font-extrabold text-[#CCFF00] mb-2">{inCount}</p>
                                <p className={`text-xl font-medium ${themeSecondaryTextClass}`}>{t.in}</p>
                            </div>
                            <div className={`p-6 ${currentTheme === 'dark' ? 'bg-[#3A3A3A]' : 'bg-gray-100'} rounded-xl shadow-inner flex flex-col items-center justify-center`}>
                                <p className="text-6xl font-extrabold text-red-400 mb-2">{outCount}</p>
                                <p className={`text-xl font-medium ${themeSecondaryTextClass}`}>{t.out}</p>
                            </div>
                        </div>
                    </div>

                    {/* Historia */}
                    <div className={`w-full max-w-3xl ${themeCardBgClass} p-8 rounded-2xl shadow-3xl border ${themeBorderClass}`}>
                        <h2 className={`text-3xl font-bold ${themeTextClass} mb-6 text-center`}>{t.detectionHistory}</h2>
                        {history.length === 0 ? (
                            <p className={`text-center text-lg ${themeSecondaryTextClass}`}>{t.noDetections}</p>
                        ) : (
                            <ul className="space-y-4">
                                {history.map((entry, index) => (
                                    <li key={index} className={`flex flex-col sm:flex-row items-center justify-between p-4 rounded-xl shadow-md ${entry.status === t.in ? 'bg-[#CCFF00] bg-opacity-20' : 'bg-red-900 bg-opacity-30'} border ${entry.status === t.in ? 'border-[#CCFF00]' : 'border-red-700'}`}>
                                        <span className={`font-bold text-xl ${entry.status === t.in ? 'text-[#CCFF00]' : 'text-red-400'} mb-2 sm:mb-0`}>
                                            {entry.status === t.in ? `🟢 ${t.in}` : `🔴 ${t.out}`}
                                        </span>
                                        <span className={`text-base sm:text-lg ${themeSecondaryTextClass}`}>
                                            {entry.timestamp} (X: {entry.x.toFixed(0)}, Y: {entry.y.toFixed(0)})
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </>
            )}

            {currentScreen === 'profile' && (
                <ProfileScreen
                    inCount={inCount}
                    outCount={outCount}
                    currentLanguage={currentLanguage}
                    onClose={() => setCurrentScreen('main')}
                />
            )}


            {/* Dolny pasek nawigacyjny - symulacja */}
            <div className={`fixed bottom-0 w-full ${themeBgClass} py-4 px-6 flex justify-around items-center border-t ${themeBorderClass} shadow-lg`}>
                <div className="flex flex-col items-center text-gray-400 hover:text-[#CCFF00] cursor-pointer transition-colors duration-200" onClick={() => setCurrentScreen('main')}>
                    <svg className="w-6 h-6 mb-1" fill="currentColor" viewBox="0 0 20 20"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path></svg>
                    <span className="text-xs">{t.home}</span>
                </div>
                <div className="flex flex-col items-center text-gray-400 hover:text-[#CCFF00] cursor-pointer transition-colors duration-200" onClick={() => setCurrentScreen('profile')}>
                    <svg className="w-6 h-6 mb-1" fill="currentColor" viewBox="0 0 20 20"><path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z"></path></svg>
                    <span className="text-xs">{t.profile}</span>
                </div>
                <div className="flex flex-col items-center text-gray-400 hover:text-[#CCFF00] cursor-pointer transition-colors duration-200" onClick={() => setShowSettings(true)}>
                    <svg className="w-6 h-6 mb-1" fill="currentColor" viewBox="0 0 20 20"><path d="M7 3a1 1 0 00-1 1v1a1 1 0 002 0V4a1 1 0 00-1-1zm0 5a1 1 0 00-1 1v1a1 1 0 002 0V9a1 1 0 00-1-1zm1 3a1 1 0 00-1 1v1a1 1 0 002 0v-1a1 1 0 00-1-1zM9 3a1 1 0 00-1 1v1a1 1 0 002 0V4a1 1 0 00-1-1zm0 5a1 1 0 00-1 1v1a1 1 0 002 0V9a1 1 0 00-1-1zm1 3a1 1 0 00-1 1v1a1 1 0 002 0v-1a1 1 0 00-1-1zm-1 2a1 1 0 00-1 1v1a1 1 0 002 0v-1a1 1 0 00-1-1zm6-3a1 1 0 00-1 1v1a1 1 0 002 0V9a1 1 0 00-1-1zm-1 3a1 1 0 00-1 1v1a1 1 0 002 0v-1a1 1 0 00-1-1zm-1 2a1 1 0 00-1 1v1a1 1 0 002 0v-1a1 1 0 00-1-1zm-1 2a1 1 0 00-1 1v1a1 1 0 002 0v-1a1 1 0 00-1-1zm-1 2a1 1 0 00-1 1v1a1 1 0 002 0v-1a1 1 0 00-1-1zm-1 2a1 1 0 00-1 1v1a1 1 0 002 0v-1a1 1 0 00-1-1zm-1 2a1 1 0 00-1 1v1a1 1 0 002 0v-1a1 1 0 00-1-1zm-1 2a1 1 0 00-1 1v1a1 1 0 002 0v-1a1 1 0 00-1-1zm-1 2a1 1 0 00-1 1v1a1 1 0 002 0v-1a1 1 0 00-1-1zm-1 2a1 1 0 00-1 1v1a1 1 0 002 0v-1a1 1 0 00-1-1zm-1 2a1 1 0 00-1 1v1a1 1 0 002 0v-1a1 1 0 00-1-1z"></path></svg>
                    <span className="text-xs">{t.settings}</span>
                </div>
            </div>
            {modalMessage && <Modal message={modalMessage} onClose={() => setModalMessage('')} />}
            {showSettings && (
                <SettingsModal
                    onClose={() => setShowSettings(false)}
                    currentTheme={currentTheme}
                    onThemeChange={setCurrentTheme}
                    currentLanguage={currentLanguage}
                    onLanguageChange={setCurrentLanguage}
                    onLogout={handleLogout}
                />
            )}
        </div>
    );
};

export default App;
