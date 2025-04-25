# Web Accessibility Widget

Ein umfassendes Barrierefreiheits-Widget für Webseiten, das über ein einfaches Skript-Tag eingebunden werden kann und verschiedene Anpassungsmöglichkeiten für verbesserte Zugänglichkeit bietet.

<!-- Hier kannst du später ein Screenshot vom Widget einfügen -->
<!-- ![Web Accessibility Widget](public/widget-preview.png) -->

## Funktionen

Das Widget bietet umfassende Barrierefreiheits-Anpassungen in drei Kategorien:

### Inhaltsanpassungen
- Schriftgröße
- Zeilenhöhe
- Buchstabenabstand
- Schriftart (Helvetica)
- Textausrichtung
- Hervorhebung von Überschriften
- Hervorhebung von Links
- Text-Vergrößerer
- Inhalts-Skalierung

### Farbanpassungen
- Dunkler Kontrast
- Heller Kontrast
- Hoher Kontrast
- Hohe Sättigung
- Niedrige Sättigung
- Monochrome Ansicht

### Orientierungsanpassungen
- Stummschaltung aller Sounds
- Ausblenden aller Bilder
- Lesemaske
- Leseführung
- Stoppen von Animationen
- Fokus-Hervorhebung
- Cursor-Optionen (Standard, Große dunkle Variante, Große helle Variante)
- Hover-Hervorhebung

## Installation

### 1. Widget-Skript einbinden

Füge folgenden Script-Tag in den `<head>` oder am Ende des `<body>` deiner HTML-Seite ein:

```html
<script src="https://deine-github-url/accessibility-widget.js"></script>
```

Ersetze `deine-github-url` durch die tatsächliche URL, unter der das Widget nach dem Hochladen bei GitHub verfügbar ist.

### 2. Widget anpassen (optional)

Du kannst das Widget anpassen, indem du folgende Optionen als Daten-Attribute hinzufügst:

```html
<script 
  src="https://deine-github-url/accessibility-widget.js" 
  data-position="right" 
  data-color="#4A6CF7"
></script>
```

Verfügbare Optionen:
- `data-position`: Position des Widgets ("left" oder "right", Standard ist "right")
- `data-color`: Primärfarbe des Widgets (Standard ist "#4A6CF7")
- `data-icon`: Icon für den Toggle-Button ("accessibility" oder "settings", Standard ist "accessibility")
- `data-open-on-load`: Widget beim Laden öffnen ("true" oder "false", Standard ist "false")

## Nutzung

1. **Widget öffnen**: Klicke auf das Accessibility-Symbol in der rechten (oder linken) Ecke der Webseite
2. **Tabs navigieren**: Wechsle zwischen Inhalts-, Farb- und Orientierungsanpassungen
3. **Einstellungen anpassen**: Wähle deine bevorzugten Barrierefreiheits-Einstellungen
4. **Zurücksetzen**: Klicke auf "Zurücksetzen", um alle Anpassungen auf die Standardwerte zurückzusetzen

## Tastaturkürzel

- **Alt + L**: Setzt alle Anpassungen zurück

## Entwicklung

### Projekt-Setup

1. Repository klonen:
   ```bash
   git clone https://github.com/dein-username/web-accessibility-widget.git
   cd web-accessibility-widget
   ```

2. Abhängigkeiten installieren:
   ```bash
   npm install
   ```

3. Entwicklungsserver starten:
   ```bash
   npm run dev
   ```

4. Widget für Produktion bauen:
   ```bash
   npm run build
   ```

## Anpassung und Erweiterung

Du kannst das Widget an deine Bedürfnisse anpassen, indem du die folgenden Dateien bearbeitest:

- `public/accessibility-widget.js`: Hauptskript für das eigenständige Widget
- `client/src/components/accessibility-widget/`: React-Komponenten-Version des Widgets
- `client/src/hooks/use-accessibility-store.ts`: Zustandsverwaltung für das Widget
- `client/src/lib/accessibility-effects.ts`: Effekt-Funktionen für Barrierefreiheits-Anpassungen

## Kompatibilität

- Das Widget funktioniert in allen modernen Browsern
- Es ist vollständig responsiv und funktioniert auf Desktop- und Mobilgeräten
- Die Anpassungen werden automatisch auf alle DOM-Elemente angewendet, ohne dass zusätzliche Konfiguration erforderlich ist

## Lizenz

MIT

---

Erstellt mit ❤️ für mehr Barrierefreiheit im Web