# Accessibility Widget

Ein leichtgewichtiges, anpassbares Widget zur Verbesserung der Barrierefreiheit auf Webseiten.

![Accessibility Widget](widget-preview.png)

## Inhaltsverzeichnis

- [Übersicht](#übersicht)
- [Installation](#installation)
  - [Schnellstart (CDN)](#schnellstart-cdn)
  - [Selbst-Hosting](#selbst-hosting)
- [Konfiguration](#konfiguration)
- [Anpassung](#anpassung)
- [Entwicklung](#entwicklung)
- [Funktionen](#funktionen)
- [Kompatibilität](#kompatibilität)
- [Lizenz](#lizenz)

## Übersicht

Das Accessibility Widget ist ein einfach zu implementierendes Tool, das die Barrierefreiheit jeder Webseite verbessert. Es bietet Benutzern verschiedene Anpassungsmöglichkeiten, um Webinhalte gemäß ihrer individuellen Bedürfnisse anzuzeigen.

### Hauptfunktionen:

- **Inhaltsanpassungen**: Schriftgröße, Zeilenhöhe, Buchstabenabstand, usw.
- **Farbanpassungen**: Kontrastoptionen, Sättigung, Monochrom-Modus
- **Orientierungshilfen**: Lesemaske, Lesehilfe, fokussierte Elemente hervorheben

## Installation

### Schnellstart (CDN)

Um das Widget schnell zu implementieren, füge folgendes Script-Tag in den `<head>` oder am Ende des `<body>` Bereichs deiner HTML-Datei ein:

```html
<script src="https://cdn.jsdelivr.net/gh/dein-benutzername/accessibility-widget@latest/dist/accessibility-widget.min.js"></script>
```

> **Wichtig**: Ersetze `dein-benutzername` mit deinem tatsächlichen GitHub-Benutzernamen, sobald du das Repository auf GitHub veröffentlicht hast.

### Selbst-Hosting

1. **Repository klonen oder herunterladen**
   ```bash
   git clone https://github.com/dein-benutzername/accessibility-widget.git
   ```

2. **Produktionsdatei kopieren**
   Kopiere die Datei `dist/accessibility-widget.min.js` in dein Webprojekt.

3. **Script in die HTML-Datei einbinden**
   ```html
   <script src="pfad/zu/accessibility-widget.min.js"></script>
   ```

## Erstveröffentlichung auf GitHub

Um das Widget zum ersten Mal zu hosten und öffentlich zugänglich zu machen:

1. **Erstelle ein neues GitHub-Repository**
   - Gehe zu [GitHub](https://github.com/) und melde dich an
   - Klicke auf "New" um ein neues Repository zu erstellen
   - Gib einen Namen ein (z.B. "accessibility-widget")
   - Wähle "Public" als Sichtbarkeit
   - Klicke auf "Create repository"

2. **Dateien zum Repository hinzufügen**
   ```bash
   git init
   git add .
   git commit -m "Erstveröffentlichung des Accessibility Widgets"
   git remote add origin https://github.com/dein-benutzername/accessibility-widget.git
   git push -u origin main
   ```

3. **Release erstellen**
   - Gehe zu deinem Repository auf GitHub
   - Klicke auf "Releases" auf der rechten Seite
   - Klicke auf "Create a new release"
   - Gib einen Tag-Namen ein (z.B. "v1.0.0")
   - Füge einen Titel und eine Beschreibung hinzu
   - Füge die Datei `dist/accessibility-widget.min.js` als Anhang hinzu
   - Klicke auf "Publish release"

4. **CDN aktivieren**
   Nach der Veröffentlichung kannst du das Widget über jsDelivr einbinden:
   ```html
   <script src="https://cdn.jsdelivr.net/gh/dein-benutzername/accessibility-widget@v1.0.0/dist/accessibility-widget.min.js"></script>
   ```
   oder die neueste Version:
   ```html
   <script src="https://cdn.jsdelivr.net/gh/dein-benutzername/accessibility-widget@latest/dist/accessibility-widget.min.js"></script>
   ```

## Konfiguration

Das Widget funktioniert direkt nach der Einbindung ohne weitere Konfiguration. Möchtest du jedoch Einstellungen anpassen, kannst du vor dem Einbinden des Widgets einen Konfigurationsblock hinzufügen:

```html
<script>
  window.AccessibilityWidgetConfig = {
    position: 'right', // 'left' oder 'right'
    color: '#4A6CF7',  // Hauptfarbe des Widgets
    zIndex: 9999,      // z-index für das Widget
    labels: {          // Anpassen der Texte
      toggleButton: 'Barrierefreiheit',
      closeButton: 'Schließen',
      resetButton: 'Zurücksetzen'
      // weitere Label können angepasst werden
    }
  };
</script>
<script src="pfad/zu/accessibility-widget.min.js"></script>
```

## Anpassung

### CSS-Anpassung

Du kannst das Erscheinungsbild des Widgets über CSS anpassen. Alle Widget-Elemente haben Klassen mit dem Präfix `acc-`.

```css
/* Beispiel: Widget-Button anpassen */
#acc-widget-toggle {
  background-color: #ff0000 !important;
}

/* Beispiel: Widget-Panel anpassen */
#acc-widget {
  width: 350px !important;
}
```

### Fortgeschrittene Anpassung

Für umfassendere Anpassungen kannst du den Quellcode modifizieren und die Datei neu erstellen:

1. **Projekt klonen**
   ```bash
   git clone https://github.com/dein-benutzername/accessibility-widget.git
   cd accessibility-widget
   ```

2. **Quellcode bearbeiten**
   Bearbeite die Dateien im `src` Verzeichnis nach deinen Vorstellungen.

3. **Neue Version erstellen**
   ```bash
   npm run build
   ```

4. **Die erstellte Datei verwenden**
   Die neue minifizierte Version findest du im `dist` Verzeichnis.

## Entwicklung

Wenn du zum Projekt beitragen oder es für deine eigenen Zwecke anpassen möchtest:

1. **Repository klonen**
   ```bash
   git clone https://github.com/dein-benutzername/accessibility-widget.git
   cd accessibility-widget
   ```

2. **Development-Server starten**
   ```bash
   npm run dev
   ```

3. **Tests ausführen**
   ```bash
   npm test
   ```

4. **Build erstellen**
   ```bash
   npm run build
   ```

## Funktionen

### Inhaltsanpassungen
- Schriftgröße ändern
- Zeilenhöhe anpassen
- Buchstabenabstand anpassen
- Helvetica-Schriftart verwenden
- Textausrichtung ändern
- Überschriften hervorheben
- Links hervorheben
- Textvergrößerung beim Hover
- Inhaltsskalierung

### Farbanpassungen
- Dunkler Kontrast
- Heller Kontrast
- Hoher Kontrast
- Hohe Sättigung
- Niedrige Sättigung
- Monochrom-Modus

### Orientierungshilfen
- Ton stummschalten
- Bilder ausblenden
- Lesemaske
- Lesehilfe
- Animationen stoppen
- Fokus hervorheben
- Cursor-Optionen
- Hover-Hervorhebung

## Kompatibilität

Das Widget ist kompatibel mit:
- Chrome (letzte 2 Versionen)
- Firefox (letzte 2 Versionen)
- Safari (letzte 2 Versionen)
- Edge (letzte 2 Versionen)
- IE11 (mit Einschränkungen)

## Lizenz

Dieses Projekt ist unter der MIT-Lizenz veröffentlicht - siehe die [LICENSE](LICENSE) Datei für Details.

---

## Häufig gestellte Fragen

### Beeinträchtigt das Widget die Seitenleistung?
Nein, das Widget ist leichtgewichtig und lädt erst, wenn die Seite vollständig geladen ist. Es hat minimalen Einfluss auf die Ladezeit.

### Kann ich das Widget mit meinem CMS verwenden?
Ja, du kannst das Widget mit jedem CMS (WordPress, Joomla, Drupal, etc.) verwenden, indem du den Script-Tag in die entsprechende Stelle des Themes oder Templates einfügst.

### Funktioniert das Widget mit Single-Page-Applications (SPA)?
Ja, das Widget funktioniert mit SPAs wie React, Angular oder Vue. Achte darauf, dass du das Script nach dem Laden deiner App initialisierst.

### Ist das Widget DSGVO-konform?
Ja, das Widget speichert Benutzereinstellungen ausschließlich im localStorage des Browsers und sendet keine Daten an externe Server.

---

Bei Fragen oder Problemen öffne bitte ein [Issue](https://github.com/dein-benutzername/accessibility-widget/issues).
