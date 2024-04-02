# barcode-scanner

This is a simple pwa barcode scanner. 

It does not need internet to work. For installing and updating it you need to have internet.

It uses this library for the scanning: https://github.com/mebjas/html5-qrcode

The app will load the data from `data.json`.

When scanning it will look up results found in the data.json file. 

If a result is found it will display the result - otherwise it will display the value of the scanned barcode.

# Install

Go to https://aarhusstadsarkiv.github.io/barcode-scanner/ and in the browser main menu choose "Install app".

Then you can place the app icon on your phone's home screen.

# Updating

Change the `data.json` file and push the changes to the server. Alter the `CACHE_NAME` in the service worker to force the update.
Alter this line:

    const CACHE_NAME = 'qr-scanner-v1';

# Assets

Assets and icons are generated using https://favicon.io/
