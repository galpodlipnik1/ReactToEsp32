#include <WiFi.h>
#include <WiFiClient.h>
#include <WebServer.h>
#include <ESPmDNS.h>
#include "ArduinoJson.h"

#include "DHT.h"

#define DHTPIN 16

#define DHTTYPE DHT22

const char* ssid = "Vegova RVP4";
const char* password = "Vegova_RVP4";

bool ledStatus = false;

float Temp;
float Humidity;

WebServer server(80);
DHT dht(DHTPIN, DHTTYPE);

const int led = 17;

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
  Temp = dht.readTemperature();
  Humidity = dht.readHumidity();
}

void setup(void) {
  pinMode(led, OUTPUT);
  Serial.begin(115200);

  WiFi.begin(ssid, password);
  dht.begin();
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

    server.sendHeader("Access-Control-Allow-Origin","*");
    server.send(200, "text/plain", "Led turned on");
  });

  server.on("/ledoff", []() {
    digitalWrite(led, 0);
    ledStatus = false;

    Serial.println("led off");

    server.sendHeader("Access-Control-Allow-Origin","*");
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

    server.sendHeader("Access-Control-Allow-Origin","*");
    server.send(200, "application/json", response);
  });

  server.on("/th", []() {
    updateTH();
    StaticJsonDocument<100> reads;
    reads["temp"] = Temp;
    reads["humidity"] = Humidity;

    String response;
    serializeJson(reads, response);
    
    server.sendHeader("Access-Control-Allow-Origin","*");
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
