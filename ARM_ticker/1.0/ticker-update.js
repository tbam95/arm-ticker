const NASDAQ_URL = 'https://www.nasdaq.com/market-activity/stocks/arm';
var apikey = "**************";

function onAlarm(alarm) {
  updateTicker();
}

function onInit() {
  updateTicker();
  chrome.alarms.create('arm-ticker-watchdog', {periodInMinutes: 15});

  const NASDAQ_MENU_ITEM_ID = 'nasdaq_menu_item';

  chrome.contextMenus.onClicked.addListener((info, tab)=>{

    let navLink = null;

    if (info.menuItemId == NASDAQ_MENU_ITEM_ID) {
      navLink = NASDAQ_URL;
    }

    if (navLink) {
      chrome.tabs.create({url: navLink});
    }

  });
}

async function updateTicker() {

  [priceResp] = await Promise.all([
      fetch('https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=ARM&interval=15min&outputsize=compact&extended_hours=false&apikey=************', {cache: "no-store"})
  ]);

  const tickerData = await priceResp.json();

  var datetime = Object.keys(tickerData["Time Series (15min)"])[0];

  const rateUsd = Math.trunc(tickerData["Time Series (15min)"][datetime]["4. close"]);

  let rateUsdStr = rateUsd.toString();

  if (rateUsd > 10000) {
    to_trunc = (value, n) => Math.floor(value*Math.pow(10,n))/(Math.pow(10,n));
    rateUsdStr = Number.parseFloat(to_trunc(rateUsd/1000, 1)).toPrecision(3)+'k';
  }

  const rateUsdLocale = rateUsd.toLocaleString();

  const title = `${chrome.i18n.getMessage('tooltip_price_title')} \n$${rateUsdLocale}`;

  chrome.action.setBadgeText({text: rateUsdStr});
  chrome.action.setBadgeBackgroundColor({color: '#22750B'});
  chrome.action.setTitle({title: title});
}

function navigateAway() {
  const navLink = 'https://www.nasdaq.com/market-activity/stocks/arm';
  chrome.tabs.create({url: navLink});
}

chrome.runtime.onInstalled.addListener(onInit);
chrome.alarms.onAlarm.addListener(onAlarm);
chrome.action.onClicked.addListener(navigateAway);
