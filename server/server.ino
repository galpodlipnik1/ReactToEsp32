#include <WiFi.h>
#include <WiFiClient.h>
#include <WebServer.h>
#include <ESPmDNS.h>
#include "ArduinoJson.h"

#include <Adafruit_Sensor.h>
#include <Adafruit_AM2320.h>

const char* ssid = "Vegova RVP4";
const char* password = "Vegova_RVP4";

bool ledStatus = false;

float Temp;
float Humidity;

WebServer server(80);
Adafruit_AM2320 AM2320 = Adafruit_AM2320();

const int led = 13;

void handleRoot() {
  server.send(200, "text/plain", "hello from esp32!");
}

void handleNotFound() {
  String message = "File Not Found\n\n";
  message += "URI: ";
  message += server.uri();
  message += "\nMethod: ";
  message += (server.method() == HTTP_GET) ? "GET" : "POST";
  message += "\nArguments: ";
  message += server.args();
  message += "\n";
  for (uint8_t i = 0; i < server.args(); i++) {
    message += " " + server.argName(i) + ": " + server.arg(i) + "\n";
  }
  server.send(404, "text/plain", message);
}

void updateTH() {
  Temp = AM2320.readTemperature();
  Humidity = AM2320.readHumidity();
}

void setup(void) {
  pinMode(led, OUTPUT);
  Serial.begin(115200);

  WiFi.begin(ssid, password);
  Adafruit_AM2320 AM2320 = Adafruit_AM2320();
  server.enableCORS();

  updateTH();
  Serial.println("");

  digitalWrite(led, 0);

  // Wait for connection
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("");
  Serial.print("Connected to ");
  Serial.println(ssid);
  Serial.print("IP address: ");
  Serial.println(WiFi.localIP());

  if (MDNS.begin("esp32")) {
    Serial.println("MDNS responder started");
  }

  server.on("/", handleRoot);

  server.on("/ledon", []() {
    digitalWrite(led, 1);
    ledStatus = true;

    Serial.println("led on");
    server.send(200, "text/plain", "Led turned on");
  });

  server.on("/ledoff", []() {
    digitalWrite(led, 0);
    ledStatus = false;

    Serial.println("led off");
    server.send(200, "text/plain", "Led turned off");
  });

  server.on("/ledstatus", []() {
    StaticJsonDocument<100> status;
    
    if(ledStatus) {
      status["led"] = true;
    } else {
      status["led"] = false;
    }

    String response;
    serializeJson(status, response);

    server.send(200, "application/json", response);
  });

  server.on("/th", []() {
    updateTH();
    StaticJsonDocument<100> reads;
    reads["temp"] = Temp;
    reads["humidity"] = Humidity;

    String response;
    serializeJson(reads, response);
    
    server.send(200, "application/json", response);
  });


  server.onNotFound(handleNotFound);

  server.begin();
  Serial.println("HTTP server started");
}

void loop(void) {
  server.handleClient();
  delay(2);
}
