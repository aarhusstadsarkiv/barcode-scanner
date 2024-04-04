# barcode-scanner

This is a simple PWA barcode scanner. It does not need internet to work. 
For installing and updating it you need to have internet.

The app will load the data from `data.json`.

When scanning it will look up results found in the data.json file. 

If a result is found it will display the result - 
otherwise it will display the value of the scanned barcode.

# Install

Go to https://acceptable-turkey.surge.sh 

You may be prompted for installing it. Then accept. If not prompted
then install it using the browser menu (`Install app`).
Then you can place the app icon on your phone's home screen. 

# Updating

Change the `data.json` file. Alter the `VERSION` in the 
service worker to force the update. Set the `VERSION` in `index.html`

Then push to remove server: 

    surge . acceptable-turkey.surge.sh

If there is a new version the phone will update the app. Then the new app will be 
activated on the next restart of the app. You can force a install by 
clicking on the app icon on the desktop and press `Site settings` and then press
`Delete data & reset permissions`. Then the app will is forced to load the latest version.  

# Assets

Assets and icons are generated using https://favicon.io/
It uses this library for the scanning: https://github.com/mebjas/html5-qrcode
