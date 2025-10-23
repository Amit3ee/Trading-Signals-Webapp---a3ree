// Configuration
const DEMO_OTP = '123456';
const STORAGE_KEY = 'tradingSignalsAuth';
const SIGNALS_KEY = 'tradingSignals';

// Check if user is already logged in
if (window.location.pathname.includes('index.html') || window.location.pathname === '/') {
    if (isAuthenticated() && !window.location.pathname.includes('index.html')) {
        // User is already authenticated
    }
} else if (window.location.pathname.includes('dashboard.html')) {
    if (!isAuthenticated()) {
        window.location.href = 'index.html';
    }
}

// OTP Login Logic
if (document.getElementById('otp1')) {
    const otpInputs = document.querySelectorAll('.otp-input');
    const verifyBtn = document.getElementById('verifyBtn');
    const errorMessage = document.getElementById('errorMessage');

    // Auto-focus next input
    otpInputs.forEach((input, index) => {
        input.addEventListener('input', (e) => {
            const value = e.target.value;
            if (value.length === 1 && index < otpInputs.length - 1) {
                otpInputs[index + 1].focus();
            }
        });

        input.addEventListener('keydown', (e) => {
            if (e.key === 'Backspace' && !e.target.value && index > 0) {
                otpInputs[index - 1].focus();
            }
        });

        // Allow only numbers
        input.addEventListener('keypress', (e) => {
            if (!/[0-9]/.test(e.key)) {
                e.preventDefault();
            }
        });
    });

    // Verify OTP
    verifyBtn.addEventListener('click', verifyOTP);
    
    // Allow Enter key to verify
    otpInputs.forEach(input => {
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                verifyOTP();
            }
        });
    });

    function verifyOTP() {
        const otp = Array.from(otpInputs).map(input => input.value).join('');
        
        if (otp.length !== 6) {
            showError('Please enter all 6 digits');
            return;
        }

        if (otp === DEMO_OTP) {
            // Store authentication
            localStorage.setItem(STORAGE_KEY, JSON.stringify({
                authenticated: true,
                timestamp: new Date().getTime()
            }));
            
            // Redirect to dashboard
            window.location.href = 'dashboard.html';
        } else {
            showError('Invalid OTP. Try: 123456');
            otpInputs.forEach(input => {
                input.value = '';
                input.classList.add('shake');
            });
            
            setTimeout(() => {
                otpInputs.forEach(input => input.classList.remove('shake'));
            }, 500);
            
            otpInputs[0].focus();
        }
    }

    function showError(message) {
        errorMessage.textContent = message;
        setTimeout(() => {
            errorMessage.textContent = '';
        }, 3000);
    }
}

// Dashboard Logic
if (window.location.pathname.includes('dashboard.html')) {
    const logoutBtn = document.getElementById('logoutBtn');
    const refreshBtn = document.getElementById('refreshBtn');
    const signalsList = document.getElementById('signalsList');
    const totalSignalsEl = document.getElementById('totalSignals');
    const buySignalsEl = document.getElementById('buySignals');
    const sellSignalsEl = document.getElementById('sellSignals');
    const lastUpdateEl = document.getElementById('lastUpdate');

    // Logout
    logoutBtn.addEventListener('click', () => {
        localStorage.removeItem(STORAGE_KEY);
        window.location.href = 'index.html';
    });

    // Refresh signals
    refreshBtn.addEventListener('click', loadSignals);

    // Load signals on page load
    loadSignals();
    
    // Auto-refresh every 30 seconds
    setInterval(loadSignals, 30000);

    function loadSignals() {
        // Get signals from localStorage (in real app, this would be from Google Apps Script)
        const signals = getStoredSignals();
        
        if (signals.length === 0) {
            signalsList.innerHTML = `
                <div class="empty-state">
                    <div class="empty-icon">📭</div>
                    <p>No signals yet</p>
                    <p class="empty-subtitle">Signals from TradingView will appear here</p>
                </div>
            `;
            updateStats([], new Date());
            return;
        }

        // Sort by timestamp (newest first)
        signals.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

        // Display signals
        signalsList.innerHTML = signals.map(signal => createSignalHTML(signal)).join('');
        
        // Update stats
        updateStats(signals, new Date(signals[0].timestamp));
    }

    function createSignalHTML(signal) {
        const time = new Date(signal.timestamp).toLocaleString();
        
        return `
            <div class="signal-item ${signal.action.toLowerCase()}">
                <div class="signal-header">
                    <span class="signal-symbol">${signal.symbol || 'N/A'}</span>
                    <span class="signal-type ${signal.action.toLowerCase()}">${signal.action}</span>
                </div>
                <div class="signal-details">
                    <div class="signal-detail">
                        <span class="signal-detail-label">Price</span>
                        <span class="signal-detail-value">${signal.price || 'N/A'}</span>
                    </div>
                    <div class="signal-detail">
                        <span class="signal-detail-label">Timeframe</span>
                        <span class="signal-detail-value">${signal.timeframe || 'N/A'}</span>
                    </div>
                    <div class="signal-detail">
                        <span class="signal-detail-label">Strategy</span>
                        <span class="signal-detail-value">${signal.strategy || 'N/A'}</span>
                    </div>
                    ${signal.stopLoss ? `
                    <div class="signal-detail">
                        <span class="signal-detail-label">Stop Loss</span>
                        <span class="signal-detail-value">${signal.stopLoss}</span>
                    </div>
                    ` : ''}
                    ${signal.takeProfit ? `
                    <div class="signal-detail">
                        <span class="signal-detail-label">Take Profit</span>
                        <span class="signal-detail-value">${signal.takeProfit}</span>
                    </div>
                    ` : ''}
                </div>
                <div class="signal-time">Received: ${time}</div>
            </div>
        `;
    }

    function updateStats(signals, lastUpdate) {
        totalSignalsEl.textContent = signals.length;
        
        const buyCount = signals.filter(s => s.action.toLowerCase() === 'buy').length;
        const sellCount = signals.filter(s => s.action.toLowerCase() === 'sell').length;
        
        buySignalsEl.textContent = buyCount;
        sellSignalsEl.textContent = sellCount;
        
        if (signals.length > 0) {
            lastUpdateEl.textContent = lastUpdate.toLocaleTimeString();
        }
    }
}

// Helper functions
function isAuthenticated() {
    const auth = localStorage.getItem(STORAGE_KEY);
    if (!auth) return false;
    
    try {
        const authData = JSON.parse(auth);
        // Check if authentication is less than 24 hours old
        const now = new Date().getTime();
        const authTime = authData.timestamp;
        const hoursPassed = (now - authTime) / (1000 * 60 * 60);
        
        return authData.authenticated && hoursPassed < 24;
    } catch (e) {
        return false;
    }
}

function getStoredSignals() {
    const stored = localStorage.getItem(SIGNALS_KEY);
    if (!stored) {
        // Return demo signals for demonstration
        return [
            {
                symbol: 'BTCUSDT',
                action: 'BUY',
                price: '43250.50',
                timeframe: '1H',
                strategy: 'EMA Crossover',
                stopLoss: '42800',
                takeProfit: '44500',
                timestamp: new Date(Date.now() - 3600000).toISOString()
            },
            {
                symbol: 'ETHUSDT',
                action: 'SELL',
                price: '2280.75',
                timeframe: '4H',
                strategy: 'RSI Overbought',
                stopLoss: '2320',
                takeProfit: '2200',
                timestamp: new Date(Date.now() - 7200000).toISOString()
            },
            {
                symbol: 'BNBUSDT',
                action: 'BUY',
                price: '315.20',
                timeframe: '15M',
                strategy: 'Support Bounce',
                stopLoss: '310',
                takeProfit: '325',
                timestamp: new Date(Date.now() - 10800000).toISOString()
            }
        ];
    }
    
    try {
        return JSON.parse(stored);
    } catch (e) {
        return [];
    }
}

function saveSignal(signal) {
    const signals = getStoredSignals();
    signals.unshift(signal);
    
    // Keep only last 100 signals
    if (signals.length > 100) {
        signals.splice(100);
    }
    
    localStorage.setItem(SIGNALS_KEY, JSON.stringify(signals));
}

// CSS animation for shake effect
if (!document.querySelector('#shake-style')) {
    const style = document.createElement('style');
    style.id = 'shake-style';
    style.textContent = `
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
            20%, 40%, 60%, 80% { transform: translateX(5px); }
        }
        .shake {
            animation: shake 0.5s;
        }
    `;
    document.head.appendChild(style);
}
