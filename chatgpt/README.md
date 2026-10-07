# ChatGPT Reading Position

A Chrome extension that remembers where you were reading in a long ChatGPT chat, so you can jump back after asking a follow-up instead of scrolling through the whole conversation.

Built with Manifest V3, JavaScript and CSS.

## How to install

This extension isn't on the Chrome Web Store, so you install it manually. It takes about a minute.

### 1. Download the code

1. On this GitHub page, click the green **Code** button.
2. Click **Download ZIP**.
3. Find the downloaded ZIP file and **extract it** (right-click, then "Extract All"). Chrome can't load a ZIP directly, so you need the extracted folder.

### 2. Open Chrome's extensions page

1. Open Chrome.
2. Type `chrome://extensions` in the address bar and press Enter.

### 3. Turn on Developer mode

In the top-right corner of the extensions page, switch on **Developer mode**.

### 4. Load the extension

1. Click **Load unpacked** (top-left).
2. Select the extracted folder that contains the `manifest.json` file. If you see a folder inside a folder, open down until you find the one with `manifest.json`.
3. The extension now appears in your list.

### 5. Try it

Open [chatgpt.com](https://chatgpt.com), open a long chat, and refresh the page once. The extension only works on ChatGPT pages.

## How to use

1. Scroll to the part of the chat you're reading.
2. Type a follow-up and send it. The extension saves your spot.
3. When ChatGPT jumps to the bottom, click the **back to where I was** button to return to your saved spot.

## Troubleshooting

- **Nothing happens on ChatGPT:** refresh the ChatGPT tab after installing.
- **"Manifest file is missing or unreadable":** you selected the wrong folder. Pick the one that directly contains `manifest.json`.
- **It stopped working after a ChatGPT update:** ChatGPT changes its page layout sometimes. Please [open an issue](../../issues) and I'll fix it.

## Updating

Download the new ZIP, replace your old folder, then go to `chrome://extensions` and click the reload icon on the extension.

## Tech

- Manifest V3
- Content script (JavaScript)
- CSS for the button
