// index.js
const express = require("express");
const { twiml: { VoiceResponse } } = require("twilio");

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Ruta de salud para Render (coincide con la que viste en "Avanzado")
app.get("/salud", (_req, res) => {
  res.status(200).send("ok");
});

// Webhook de llamada entrante (Twilio > Número > Webhook)
app.post("/incoming-call", (req, res) => {
  const vr = new VoiceResponse();
  vr.say({ voice: "alice", language: "es-MX" }, "¡Hola! Tu servicio en Render ya está funcionando.");
  // Para colgar después del mensaje:
  vr.hangup();
  res.type("text/xml");
  res.send(vr.toString());
});

// Render te inyecta el puerto en process.env.PORT
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en puerto ${PORT}`);
});
