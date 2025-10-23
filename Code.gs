/**
 * Google Apps Script - Trading Signals Webhook Handler
 * This script receives webhook data from TradingView and stores it in Google Sheets
 * Deploy as Web App with "Anyone" access to receive webhooks
 */

// Spreadsheet ID (replace with your own)
const SPREADSHEET_ID = 'YOUR_SPREADSHEET_ID';
const SHEET_NAME = 'Signals';

/**
 * Handle GET requests - Serve the web app
 */
function doGet(e) {
  var page = e.parameter.page || 'index';
  
  try {
    var template;
    if (page === 'dashboard') {
      template = HtmlService.createHtmlOutputFromFile('dashboard');
    } else {
      template = HtmlService.createHtmlOutputFromFile('index');
    }
    
    return template
      .setTitle('Trading Signals')
      .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
  } catch (error) {
    return HtmlService.createHtmlOutput('<h1>Error loading page</h1><p>' + error.message + '</p>');
  }
}

/**
 * Handle POST requests - Receive webhook from TradingView
 */
function doPost(e) {
  try {
    // Parse the incoming data
    var data = JSON.parse(e.postData.contents);
    
    // Add timestamp
    data.timestamp = new Date().toISOString();
    
    // Store in spreadsheet
    storeSignal(data);
    
    // Return success response
    return ContentService
      .createTextOutput(JSON.stringify({
        status: 'success',
        message: 'Signal received',
        data: data
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    // Return error response
    return ContentService
      .createTextOutput(JSON.stringify({
        status: 'error',
        message: error.message
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Store signal data in Google Sheets
 */
function storeSignal(data) {
  try {
    var ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    var sheet = ss.getSheetByName(SHEET_NAME);
    
    // Create sheet if it doesn't exist
    if (!sheet) {
      sheet = ss.insertSheet(SHEET_NAME);
      // Add headers
      sheet.appendRow([
        'Timestamp',
        'Symbol',
        'Action',
        'Price',
        'Timeframe',
        'Strategy',
        'Stop Loss',
        'Take Profit',
        'Volume',
        'Notes'
      ]);
    }
    
    // Add the signal data
    sheet.appendRow([
      data.timestamp || new Date().toISOString(),
      data.symbol || '',
      data.action || '',
      data.price || '',
      data.timeframe || '',
      data.strategy || '',
      data.stopLoss || '',
      data.takeProfit || '',
      data.volume || '',
      data.notes || ''
    ]);
    
    Logger.log('Signal stored successfully');
  } catch (error) {
    Logger.log('Error storing signal: ' + error.message);
    throw error;
  }
}

/**
 * Get recent signals (for dashboard)
 * Can be called from client-side using google.script.run
 */
function getRecentSignals(limit) {
  try {
    limit = limit || 50;
    
    var ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    var sheet = ss.getSheetByName(SHEET_NAME);
    
    if (!sheet) {
      return [];
    }
    
    var data = sheet.getDataRange().getValues();
    var headers = data[0];
    var signals = [];
    
    // Convert to array of objects (skip header row)
    for (var i = Math.max(1, data.length - limit); i < data.length; i++) {
      var row = data[i];
      var signal = {};
      
      for (var j = 0; j < headers.length; j++) {
        signal[headers[j].toLowerCase().replace(' ', '')] = row[j];
      }
      
      signals.push(signal);
    }
    
    // Reverse to get newest first
    return signals.reverse();
    
  } catch (error) {
    Logger.log('Error getting signals: ' + error.message);
    return [];
  }
}

/**
 * Get statistics about signals
 */
function getSignalStats() {
  try {
    var ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    var sheet = ss.getSheetByName(SHEET_NAME);
    
    if (!sheet) {
      return {
        total: 0,
        buy: 0,
        sell: 0,
        lastUpdate: null
      };
    }
    
    var data = sheet.getDataRange().getValues();
    var total = data.length - 1; // Exclude header
    var buy = 0;
    var sell = 0;
    var lastUpdate = null;
    
    // Count buy/sell signals (Action is in column 2)
    for (var i = 1; i < data.length; i++) {
      var action = String(data[i][2]).toLowerCase();
      if (action === 'buy') buy++;
      if (action === 'sell') sell++;
    }
    
    // Get last update (Timestamp is in column 0)
    if (total > 0) {
      lastUpdate = data[data.length - 1][0];
    }
    
    return {
      total: total,
      buy: buy,
      sell: sell,
      lastUpdate: lastUpdate
    };
    
  } catch (error) {
    Logger.log('Error getting stats: ' + error.message);
    return {
      total: 0,
      buy: 0,
      sell: 0,
      lastUpdate: null
    };
  }
}

/**
 * Test function to create sample data
 */
function testWebhook() {
  var testData = {
    symbol: 'BTCUSDT',
    action: 'BUY',
    price: '43500.00',
    timeframe: '1H',
    strategy: 'EMA Crossover',
    stopLoss: '42800',
    takeProfit: '44500',
    volume: '1.5',
    notes: 'Test signal'
  };
  
  testData.timestamp = new Date().toISOString();
  storeSignal(testData);
  
  Logger.log('Test signal created');
}

/**
 * Clear all signals (use with caution)
 */
function clearAllSignals() {
  try {
    var ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    var sheet = ss.getSheetByName(SHEET_NAME);
    
    if (sheet) {
      sheet.clear();
      // Re-add headers
      sheet.appendRow([
        'Timestamp',
        'Symbol',
        'Action',
        'Price',
        'Timeframe',
        'Strategy',
        'Stop Loss',
        'Take Profit',
        'Volume',
        'Notes'
      ]);
    }
    
    Logger.log('All signals cleared');
  } catch (error) {
    Logger.log('Error clearing signals: ' + error.message);
  }
}
