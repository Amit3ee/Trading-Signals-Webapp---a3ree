/**
 * Trading Signals Web App - Backend
 * Company: Maurvi Consultants
 * App Name: Automated Trading Signals
 */

// Configuration
const SCRIPT_PROPERTIES = PropertiesService.getScriptProperties();
const USER_PROPERTIES = PropertiesService.getUserProperties();
const OTP_EXPIRY_MINUTES = 3;
const ADMIN_EMAIL = 'amit3ree@gmail.com';

/**
 * Serves the main HTML page
 */
function doGet(e) {
  const template = HtmlService.createTemplateFromFile('Index');
  return template.evaluate()
    .setTitle('Automated Trading Signals - Maurvi Consultants')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)
    .addMetaTag('viewport', 'width=device-width, initial-scale=1');
}

/**
 * Handles POST requests from TradingView webhooks
 */
function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const indicator = e.parameter.indicator || 'unknown';
    
    // Store the alert data
    storeAlertData(indicator, data);
    
    return ContentService.createTextOutput(JSON.stringify({
      status: 'success',
      message: 'Alert received'
    })).setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    Logger.log('Error in doPost: ' + error);
    return ContentService.createTextOutput(JSON.stringify({
      status: 'error',
      message: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Stores alert data from indicators
 */
function storeAlertData(indicator, data) {
  const sheet = getOrCreateSheet('AlertData');
  const timestamp = new Date().getTime();
  
  // Normalize data format
  let normalizedData = {
    timestamp: data.timestamp || timestamp,
    symbol: data.scrip || data.ticker || '',
    reason: data.reason || '',
    capital_deployed_cr: data.capital_deployed_cr || '',
    indicator: indicator,
    received_at: timestamp
  };
  
  sheet.appendRow([
    normalizedData.timestamp,
    normalizedData.symbol,
    normalizedData.reason,
    normalizedData.capital_deployed_cr,
    normalizedData.indicator,
    normalizedData.received_at
  ]);
  
  // Check for sync
  checkAndUpdateSync(normalizedData);
}

/**
 * Checks if a symbol should be marked as synced
 */
function checkAndUpdateSync(newData) {
  const sheet = getOrCreateSheet('AlertData');
  const data = sheet.getDataRange().getValues();
  
  // Look for matching symbol from different indicators
  for (let i = 1; i < data.length; i++) {
    if (data[i][1] === newData.symbol && data[i][4] !== newData.indicator) {
      // Found a match, mark both as synced
      updateSyncStatus(newData.symbol, true);
      break;
    }
  }
}

/**
 * Updates sync status for a symbol
 */
function updateSyncStatus(symbol, synced) {
  const sheet = getOrCreateSheet('SyncStatus');
  const data = sheet.getDataRange().getValues();
  
  let found = false;
  for (let i = 1; i < data.length; i++) {
    if (data[i][0] === symbol) {
      sheet.getRange(i + 1, 2).setValue(synced);
      sheet.getRange(i + 1, 3).setValue(new Date().getTime());
      found = true;
      break;
    }
  }
  
  if (!found) {
    sheet.appendRow([symbol, synced, new Date().getTime()]);
  }
}

/**
 * Gets or creates a sheet
 */
function getOrCreateSheet(sheetName) {
  const ss = SpreadsheetApp.getActiveSpreadsheet() || SpreadsheetApp.create('Trading Signals Data');
  let sheet = ss.getSheetByName(sheetName);
  
  if (!sheet) {
    sheet = ss.insertSheet(sheetName);
    // Add headers based on sheet type
    if (sheetName === 'AlertData') {
      sheet.appendRow(['Timestamp', 'Symbol', 'Reason', 'Capital Deployed (Cr)', 'Indicator', 'Received At']);
    } else if (sheetName === 'SyncStatus') {
      sheet.appendRow(['Symbol', 'Synced', 'Updated At']);
    }
  }
  
  return sheet;
}

/**
 * Generates and sends OTP
 */
function generateAndSendOTP() {
  try {
    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const formattedOTP = otp.substring(0, 3) + '-' + otp.substring(3);
    
    // Store OTP with expiry
    const expiryTime = new Date().getTime() + (OTP_EXPIRY_MINUTES * 60 * 1000);
    SCRIPT_PROPERTIES.setProperty('current_otp', otp);
    SCRIPT_PROPERTIES.setProperty('otp_expiry', expiryTime.toString());
    
    // Send email
    MailApp.sendEmail({
      to: ADMIN_EMAIL,
      subject: 'Your OTP for Automated Trading Signals',
      htmlBody: `
        <html>
          <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; padding: 20px;">
            <div style="max-width: 600px; margin: 0 auto; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px; border-radius: 20px;">
              <h2 style="color: white; text-align: center;">Maurvi Consultants</h2>
              <h3 style="color: white; text-align: center;">Automated Trading Signals</h3>
              <div style="background: rgba(255,255,255,0.95); padding: 30px; border-radius: 15px; margin-top: 20px;">
                <p style="font-size: 16px; color: #333;">Your OTP for login is:</p>
                <h1 style="text-align: center; color: #667eea; font-size: 36px; letter-spacing: 8px; margin: 20px 0;">${formattedOTP}</h1>
                <p style="text-align: center; color: #666; font-size: 14px;">This OTP will expire in ${OTP_EXPIRY_MINUTES} minutes.</p>
              </div>
            </div>
          </body>
        </html>
      `
    });
    
    return {
      success: true,
      message: 'OTP sent to ' + ADMIN_EMAIL,
      expiryTime: expiryTime
    };
  } catch (error) {
    Logger.log('Error generating OTP: ' + error);
    return {
      success: false,
      message: 'Error sending OTP: ' + error.toString()
    };
  }
}

/**
 * Verifies OTP
 */
function verifyOTP(enteredOTP) {
  try {
    const storedOTP = SCRIPT_PROPERTIES.getProperty('current_otp');
    const expiryTime = parseInt(SCRIPT_PROPERTIES.getProperty('otp_expiry'));
    const currentTime = new Date().getTime();
    
    // Remove hyphens from entered OTP
    const cleanOTP = enteredOTP.replace(/-/g, '');
    
    if (!storedOTP || !expiryTime) {
      return {
        success: false,
        message: 'No OTP generated. Please generate a new OTP.'
      };
    }
    
    if (currentTime > expiryTime) {
      return {
        success: false,
        message: 'OTP expired. Please generate a new OTP.'
      };
    }
    
    if (cleanOTP === storedOTP) {
      // Generate session token
      const sessionToken = Utilities.getUuid();
      const sessionExpiry = new Date();
      sessionExpiry.setHours(23, 59, 59, 999); // End of day
      
      USER_PROPERTIES.setProperty('session_token', sessionToken);
      USER_PROPERTIES.setProperty('session_expiry', sessionExpiry.getTime().toString());
      
      return {
        success: true,
        message: 'Login successful',
        sessionToken: sessionToken
      };
    } else {
      return {
        success: false,
        message: 'Invalid OTP. Please try again.'
      };
    }
  } catch (error) {
    Logger.log('Error verifying OTP: ' + error);
    return {
      success: false,
      message: 'Error verifying OTP: ' + error.toString()
    };
  }
}

/**
 * Checks if user has valid session
 */
function checkSession(sessionToken) {
  try {
    const storedToken = USER_PROPERTIES.getProperty('session_token');
    const sessionExpiry = parseInt(USER_PROPERTIES.getProperty('session_expiry'));
    const currentTime = new Date().getTime();
    
    if (storedToken === sessionToken && currentTime < sessionExpiry) {
      return {
        valid: true,
        message: 'Session valid'
      };
    } else {
      return {
        valid: false,
        message: 'Session expired or invalid'
      };
    }
  } catch (error) {
    return {
      valid: false,
      message: 'Error checking session: ' + error.toString()
    };
  }
}

/**
 * Gets all alert data
 */
function getAllAlerts() {
  try {
    const sheet = getOrCreateSheet('AlertData');
    const data = sheet.getDataRange().getValues();
    
    // Skip header row
    const alerts = [];
    for (let i = 1; i < data.length; i++) {
      alerts.push({
        timestamp: data[i][0],
        symbol: data[i][1],
        reason: data[i][2],
        capital_deployed_cr: data[i][3],
        indicator: data[i][4],
        received_at: data[i][5]
      });
    }
    
    return {
      success: true,
      data: alerts
    };
  } catch (error) {
    Logger.log('Error getting alerts: ' + error);
    return {
      success: false,
      message: error.toString()
    };
  }
}

/**
 * Gets sync status for all symbols
 */
function getSyncStatus() {
  try {
    const sheet = getOrCreateSheet('SyncStatus');
    const data = sheet.getDataRange().getValues();
    
    const statuses = {};
    for (let i = 1; i < data.length; i++) {
      statuses[data[i][0]] = {
        synced: data[i][1],
        updated_at: data[i][2]
      };
    }
    
    return {
      success: true,
      data: statuses
    };
  } catch (error) {
    Logger.log('Error getting sync status: ' + error);
    return {
      success: false,
      message: error.toString()
    };
  }
}

/**
 * Gets dashboard statistics
 */
function getDashboardStats() {
  try {
    const alerts = getAllAlerts().data || [];
    const syncStatus = getSyncStatus().data || {};
    
    // Count symbols from indicator 1
    const indicator1Symbols = new Set();
    const syncedSymbols = new Set();
    let latestSymbol = null;
    let latestTime = 0;
    
    alerts.forEach(alert => {
      if (alert.indicator === '1' || alert.indicator === 'indicator1') {
        indicator1Symbols.add(alert.symbol);
        if (alert.received_at > latestTime) {
          latestTime = alert.received_at;
          latestSymbol = alert.symbol;
        }
      }
      
      if (syncStatus[alert.symbol] && syncStatus[alert.symbol].synced) {
        syncedSymbols.add(alert.symbol);
      }
    });
    
    // Get Nifty data
    const niftyAlerts = alerts.filter(a => 
      a.symbol.toUpperCase().includes('NIFTY') && 
      (a.indicator === '3' || a.indicator === 'indicator3')
    );
    
    return {
      success: true,
      data: {
        totalSymbols: indicator1Symbols.size,
        syncedCount: syncedSymbols.size,
        latestSymbol: latestSymbol,
        niftyData: niftyAlerts
      }
    };
  } catch (error) {
    Logger.log('Error getting dashboard stats: ' + error);
    return {
      success: false,
      message: error.toString()
    };
  }
}

/**
 * Include HTML files
 */
function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}
