# WebUntis Recode

A clone of the **Untis Mobile** app (the WebUntis student app) for Android, built with Capacitor, in light and dark mode (follows the system setting).

It adds an admin mode to change things about the lessons.

> Unofficial fan project, not affiliated with or endorsed by Untis. "Untis", "WebUntis" and the Untis logo belong to their owners; the logo is only used here to look like the original app.

The UI is plain HTML/CSS/JS in `public/`; all WebUntis requests go through Capacitor's native HTTP, so no server is needed.

## Build the APK
Needs Android Studio (it bundles the JDK and SDK).

```
npm install
npm run android     # copies public/ into android/ and opens Android Studio -> Build > Build APK(s)
npm run apk         # or: command-line debug APK (needs ANDROID_HOME + JDK 17/21)
```
The APK ends up in `android/app/build/outputs/apk/debug/app-debug.apk`. After changing anything in `public/`, run `npm run sync`.

## Log in
Search for your school (or use **Manuelle Anmeldung**), enter your WebUntis user name and password. The password is stored
on the device so the session can be renewed automatically; **Abmelden** removes it again. To try the app without an account,
search for "demo" and log in with any user name and password.

## Development preview (optional)
`npm run preview` serves `public/` on http://localhost:3000. Only demo mode works there (real logins need the native app).
Handy URL options: `?demo`, `?theme=dark|light`, `?date=YYYY-MM-DD`, `?admin=1`.

## Files
`public/app.js` UI and routing · `public/api.js` demo + WebUntis data · `public/data.js` demo data · `public/styles.css` ·
`assets/icon.svg` app icon source · `tools/preview.js` static preview server.
