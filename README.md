# arm-ticker (Chrome extension)

A chrome extension which displays the current price of ARM according to Nasdaq (using the Alphavantage API).

Features:

- When the extension is pinned, the most recent price is persistently displayed in the corner.
- Clicking the Arm logo links to the Nasdaq website with more detailed company / share information.

Limitations:

- Free API calls are limited to 100 per day, meaning the price can be updated maximum every 15mins.
- Although the extension is written to grab the live price every 15mins, the free version of the API is currently only allowing data from the previous trading day

How to install:

- Visit the AlphaVantage website and request a free API key.
- Enter the API key in 'ticker-update.js', replacing the asterisks "**************".
- Within Chrome, go to Extensions -> Manage Extensions -> Load unpacked  and then add the top level directory.
