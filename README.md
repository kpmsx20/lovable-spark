# Lovable Spark

Open-source Spark edition browser extension for faster Lovable prompt workflows, unlimited prompt support, and credit-aware project building.

Lovable Spark is a Chrome Manifest V3 extension built for Lovable project development. It adds a native side panel, prompt workflow helpers, unlimited prompt workflow support, frozen credit mode, project utilities, file attachment support, and Spark-edition UI enhancements.

> This is an independent community project. It is not affiliated with, endorsed by, or sponsored by Lovable.

## SEO Keywords

Lovable Spark is a lovable extension for users searching for a lovable unlimited credits extension, lovable credits extension, lovable unlimited credits workflow, and lovable unlimited prompts support.

- lovable unlimited credits extension
- lovable unlimited credits
- lovable extension
- lovable credits extension
- lovable unlimited prompts

## Quick Setup

> Important: The extension needs some credits in your Lovable account to work. Lovable gives 5 free credits every day, and those same credits work here too. It will not work with 0 credits.

If you have installed unpacked Chrome extensions before:

1. Download this repository as a ZIP from GitHub.
2. Extract the ZIP.
3. Open `chrome://extensions`.
4. Enable **Developer mode**.
5. Click **Load unpacked**.
6. Select the extracted `lovable-spark` folder.
7. Pin **Lovable Spark** from the Chrome extensions menu.
8. Open [lovable.dev](https://lovable.dev) and start using the extension panel.

Do not delete or move the extracted folder after loading it. Chrome loads unpacked extensions directly from that local folder path.

## Get A 30-Minute Trial Key

The extension uses a license key flow for activation.

1. Open [dl.eklas.dev](https://dl.eklas.dev).
2. Scroll to the **Free Trial Access** section.
3. Click **Get Free Trial Key**.
4. Copy the generated key.
5. Open the Lovable Spark extension panel.
6. Paste the key into the activation field.
7. Click **Validate License**.

Trial keys are temporary and expire after about 30 minutes.

## Community And Support

- Telegram channel: [@eklasstore](https://t.me/eklasstore)
- Telegram bot: [@eklasstorebot](https://t.me/eklasstorebot)
- WhatsApp group: [Join the Lovable Spark community](https://chat.whatsapp.com/FI9afntT96J9ZXhhKccCmY?mode=gi_t)

## Desktop Chrome Install

1. Download or clone this repository.
2. If downloaded as a ZIP, extract it first.
3. Open Google Chrome.
4. Go to `chrome://extensions`.
5. Turn on **Developer mode** in the top-right corner.
6. Click **Load unpacked**.
7. Select the folder containing `manifest.json`.
8. Open [lovable.dev](https://lovable.dev).
9. Click the extension icon or open the side panel.

## Android / Mobile Install

Standard Chrome on Android does not support unpacked Chrome extensions. Use Kiwi Browser.

1. Install Kiwi Browser on Android.
2. Download this repository as a ZIP, or download the Spark ZIP from [dl.eklas.dev](https://dl.eklas.dev).
3. Open Kiwi Browser.
4. Tap the three-dot menu.
5. Open **Extensions**.
6. Enable **Developer mode**.
7. Tap **+(from .zip/.crx/.user.js)**.
8. Select the downloaded ZIP file.
9. Open [lovable.dev](https://lovable.dev) in Kiwi Browser.
10. Open the extension from the Kiwi menu.

## Features

- Chrome Manifest V3 extension.
- Native side panel for Lovable workflows.
- Unlimited prompt workflow support.
- Frozen credit / credit-aware prompt mode.
- Prompt sending and prompt workflow helpers.
- Prompt optimization support.
- File attachment support.
- Project publish and security utility actions.
- Desktop Chrome support.
- Android support through Kiwi Browser.
- Temporary trial key support.

## Permissions

The extension requests permissions needed to integrate with Lovable pages and the extension side panel:

- `storage`
- `activeTab`
- `scripting`
- `tabs`
- `sidePanel`
- `cookies`

Host permissions include:

- `https://*.lovable.dev/*`
- `https://api.lovable.dev/*`
- `https://lovable.dev/*`
- `https://lovable-api.com/*`
- `https://io.eklas.dev/*`

## FAQ

### Is this official Lovable software?

No. This is an independent open-source browser extension.

### Why does Chrome say I need Developer mode?

Chrome requires Developer mode to load unpacked extensions that are not installed from the Chrome Web Store.

### Why does the extension need a license key?

The Spark edition includes activation and trial validation through the extension backend. Use the 30-minute trial key from [dl.eklas.dev](https://dl.eklas.dev) to test it.

### Can I use it on mobile?

Yes, on Android with Kiwi Browser. Standard Chrome for Android does not support custom unpacked extensions.

### Can I move the extension folder after installing?

No. If you move or delete the folder, Chrome will not be able to load the extension. Keep it in a stable location.

### How do I update it?

Pull the latest repository changes or download the latest ZIP again, then go to `chrome://extensions` and click the reload button on Lovable Spark.

### Does this store my Lovable session?

The extension uses Chrome local storage and browser cookies to integrate with active Lovable sessions. Review the source before installing if you are using it on sensitive projects.

## Development

This repository contains the unpacked extension files directly. No build step is required for basic use.

To modify it:

1. Edit the extension files.
2. Open `chrome://extensions`.
3. Click reload on Lovable Spark.
4. Refresh your Lovable tab.

## License

MIT
