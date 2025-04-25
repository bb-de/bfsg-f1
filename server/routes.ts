import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import path from "path";
import fs from "fs";

export async function registerRoutes(app: Express): Promise<Server> {
  // Serve the accessibility widget script
  app.get("/accessibility-widget.js", (req, res) => {
    const scriptPath = path.resolve(import.meta.dirname, "..", "public/accessibility-widget.js");
    
    if (fs.existsSync(scriptPath)) {
      res.set('Content-Type', 'application/javascript');
      res.sendFile(scriptPath);
    } else {
      res.status(404).send('Script not found');
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
