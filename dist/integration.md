# Accessibility Widget - Installationsanleitung

Diese Anleitung führt dich Schritt für Schritt durch die Installation und Integration des Accessibility Widgets auf deiner Webseite.

## Schnellinstallation

### Methode 1: Direkte Einbindung (für schnelle Tests)

1. Kopiere den folgenden Code und füge ihn vor dem schließenden `</body>` Tag deiner HTML-Seite ein:

```html
<script src="https://cdn.jsdelivr.net/gh/dein-benutzername/accessibility-widget@latest/dist/accessibility-widget.min.js"></script>
```

> Hinweis: Ersetze "dein-benutzername" mit deinem tatsächlichen GitHub-Benutzernamen, nachdem du das Repository veröffentlicht hast.

### Methode 2: Lokale Installation

1. Lade die Datei `accessibility-widget.min.js` aus dem `dist` Ordner herunter
2. Kopiere die Datei in dein Webprojekt
3. Binde das Script in deine HTML-Seite ein:

```html
<script src="pfad/zu/accessibility-widget.min.js"></script>
```

## Integration in verschiedene Systeme

### WordPress

1. Gehe zu deinem WordPress-Dashboard
2. Navigiere zu "Appearance" > "Theme Editor"
3. Öffne die Datei "footer.php"
4. Füge vor dem schließenden `</body>` Tag folgenden Code ein:

```php
<script src="https://cdn.jsdelivr.net/gh/dein-benutzername/accessibility-widget@latest/dist/accessibility-widget.min.js"></script>
```

5. Klicke auf "Update File"

**Alternative mit Plugin:**

1. Installiere das Plugin "Header and Footer Scripts"
2. Gehe zu "Settings" > "Header and Footer Scripts"
3. Füge den Script-Tag im "Footer"-Bereich ein
4. Klicke auf "Save"

### Shopify

1. Gehe zu deinem Shopify-Dashboard
2. Navigiere zu "Online Store" > "Themes"
3. Klicke auf "Actions" > "Edit code"
4. Öffne die Datei "theme.liquid"
5. Füge vor dem schließenden `</body>` Tag folgenden Code ein:

```html
<script src="https://cdn.jsdelivr.net/gh/dein-benutzername/accessibility-widget@latest/dist/accessibility-widget.min.js"></script>
```

6. Klicke auf "Save"

### Wix

1. Gehe zu deinem Wix-Dashboard
2. Klicke auf "Settings" > "Custom Code"
3. Klicke auf "+ Add Custom Code"
4. Gib einen Namen ein (z.B. "Accessibility Widget")
5. Füge folgenden Code ein:

```html
<script src="https://cdn.jsdelivr.net/gh/dein-benutzername/accessibility-widget@latest/dist/accessibility-widget.min.js"></script>
```

6. Wähle "All pages" unter "Add Code to Pages"
7. Stelle sicher, dass "Place code in: Body - end" ausgewählt ist
8. Klicke auf "Apply"

### Squarespace

1. Gehe zu deinem Squarespace-Dashboard
2. Navigiere zu "Settings" > "Advanced" > "Code Injection"
3. Scrolle zum Abschnitt "Footer"
4. Füge folgenden Code ein:

```html
<script src="https://cdn.jsdelivr.net/gh/dein-benutzername/accessibility-widget@latest/dist/accessibility-widget.min.js"></script>
```

5. Klicke auf "Save"

### Webflow

1. Öffne dein Webflow-Projekt
2. Navigiere zum Dashboard und klicke auf "Settings" im Menü
3. Scrolle nach unten und klicke auf "Custom Code"
4. Füge im Abschnitt "Footer Code" folgenden Code ein:

```html
<script src="https://cdn.jsdelivr.net/gh/dein-benutzername/accessibility-widget@latest/dist/accessibility-widget.min.js"></script>
```

5. Klicke auf "Save Changes" und veröffentliche die Seite

### React

Für React-Anwendungen:

1. Erstelle eine neue Komponente, z.B. `AccessibilityWidget.js`:

```jsx
import React, { useEffect } from 'react';

const AccessibilityWidget = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/gh/dein-benutzername/accessibility-widget@latest/dist/accessibility-widget.min.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return null;
};

export default AccessibilityWidget;
```

2. Importiere und verwende die Komponente in deiner App:

```jsx
import AccessibilityWidget from './AccessibilityWidget';

function App() {
  return (
    <div className="App">
      {/* Deine App-Komponenten */}
      <AccessibilityWidget />
    </div>
  );
}
```

### Vue.js

Für Vue.js-Anwendungen:

1. Erstelle eine neue Komponente, z.B. `AccessibilityWidget.vue`:

```vue
<template>
  <div></div>
</template>

<script>
export default {
  name: 'AccessibilityWidget',
  mounted() {
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/gh/dein-benutzername/accessibility-widget@latest/dist/accessibility-widget.min.js';
    script.async = true;
    document.body.appendChild(script);
  },
  beforeDestroy() {
    const script = document.querySelector('script[src="https://cdn.jsdelivr.net/gh/dein-benutzername/accessibility-widget@latest/dist/accessibility-widget.min.js"]');
    if (script) {
      document.body.removeChild(script);
    }
  }
}
</script>
```

2. Importiere und verwende die Komponente in deiner App:

```vue
<template>
  <div id="app">
    <!-- Deine App-Komponenten -->
    <AccessibilityWidget />
  </div>
</template>

<script>
import AccessibilityWidget from './components/AccessibilityWidget.vue'

export default {
  name: 'App',
  components: {
    AccessibilityWidget
  }
}
</script>
```

## Anpassungen

### Grundlegende Anpassung

Um das Widget anzupassen, füge vor dem Widget-Script einen Konfigurationsblock hinzu:

```html
<script>
  window.AccessibilityWidgetConfig = {
    position: 'right',     // 'left' oder 'right'
    color: '#4A6CF7',      // Hauptfarbe des Widgets
    zIndex: 9999           // z-index für das Widget
  };
</script>
<script src="https://cdn.jsdelivr.net/gh/dein-benutzername/accessibility-widget@latest/dist/accessibility-widget.min.js"></script>
```

### Sprache anpassen

Um die Texte des Widgets anzupassen:

```html
<script>
  window.AccessibilityWidgetConfig = {
    labels: {
      toggleButton: 'Barrierefreiheit',
      closeButton: 'Schließen',
      resetButton: 'Zurücksetzen',
      tabContent: 'Inhalt',
      tabColor: 'Farbe',
      tabOrientation: 'Orientierung',
      fontSize: 'Schriftgröße',
      lineHeight: 'Zeilenhöhe',
      letterSpacing: 'Buchstabenabstand'
      // Weitere Labels können hier angepasst werden
    }
  };
</script>
<script src="https://cdn.jsdelivr.net/gh/dein-benutzername/accessibility-widget@latest/dist/accessibility-widget.min.js"></script>
```

## Lokalisierung (Sprachpakete)

### Deutsches Sprachpaket

Füge dies vor dem Widget-Script ein:

```html
<script>
  window.AccessibilityWidgetConfig = {
    labels: {
      toggleButton: 'Barrierefreiheit',
      closeButton: 'Schließen',
      resetButton: 'Zurücksetzen (Alt + L)',
      tabContent: 'Inhalt',
      tabColor: 'Farbe',
      tabOrientation: 'Orientierung',
      fontSize: 'Schriftgröße',
      lineHeight: 'Zeilenhöhe',
      letterSpacing: 'Buchstabenabstand',
      fontFamily: 'Helvetica verwenden',
      textAlignment: 'Textausrichtung',
      highlightHeadings: 'Überschriften hervorheben',
      highlightLinks: 'Links hervorheben',
      textMagnifier: 'Textvergrößerung',
      contentScaling: 'Inhaltsskalierung',
      darkContrast: 'Dunkler Kontrast',
      lightContrast: 'Heller Kontrast',
      highContrast: 'Hoher Kontrast',
      highSaturation: 'Hohe Sättigung',
      lowSaturation: 'Niedrige Sättigung',
      monochrome: 'Monochrom',
      colorModePreview: 'Farbmodus-Vorschau',
      muteSounds: 'Ton stummschalten',
      hideImages: 'Bilder ausblenden',
      readingMask: 'Lesemaske',
      readingGuide: 'Lesehilfe',
      stopAnimations: 'Animationen stoppen',
      highlightFocus: 'Fokus hervorheben',
      cursorOptions: 'Cursor-Optionen',
      defaultCursor: 'Standard',
      bigBlackCursor: 'Groß Dunkel',
      bigWhiteCursor: 'Groß Hell',
      hoverHighlight: 'Hover-Hervorhebung'
    }
  };
</script>
<script src="https://cdn.jsdelivr.net/gh/dein-benutzername/accessibility-widget@latest/dist/accessibility-widget.min.js"></script>
```

## Fehlerbehebung

### Das Widget wird nicht angezeigt

1. Überprüfe, ob das Script korrekt eingebunden ist
2. Prüfe in der Browser-Konsole (F12) auf Fehlermeldungen
3. Stelle sicher, dass es keine JavaScript-Fehler auf deiner Seite gibt
4. Überprüfe, ob der Pfad zum Script korrekt ist

### Das Widget wird angezeigt, funktioniert aber nicht richtig

1. Überprüfe, ob die Konfiguration korrekt ist
2. Prüfe, ob es Konflikte mit anderen Scripts auf deiner Seite gibt
3. Stelle sicher, dass deine Seite valides HTML verwendet

### Bei weiteren Problemen

Wenn du weitere Hilfe benötigst oder auf Probleme stößt, öffne bitte ein Issue auf GitHub:
[https://github.com/dein-benutzername/accessibility-widget/issues](https://github.com/dein-benutzername/accessibility-widget/issues)