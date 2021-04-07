#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>

#define SERVER_IP "<SRVER_URL>"

#ifndef STASSID
#define STASSID "<WIFI_NAME>"
#define STAPSK  "<WIFI_PASSWORD>"
#endif


void setup() {
  // put your setup code here, to run once:
  Serial.begin(9600);
  WiFi.begin(STASSID, STAPSK);
  while(!Serial) {
    ;
  }
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("");
  Serial.print("Connected! IP address: ");
  Serial.println(WiFi.localIP());
}

void loop() {
  // put your main code here, to run repeatedly:
  if(Serial.available()) {
    String aaa = Serial.readString();
    Serial.println(aaa);
    char charBuf[aaa.length() + 1];
    aaa.toCharArray(charBuf, aaa.length());
    char* strtokIndx = strtok(charBuf,",");      // get the first part - the string
    float aa = atof(strtokIndx);     // convert this part to an integer
    strtokIndx = strtok(NULL, ","); // this continues where the previous call left off
    float a = atof(strtokIndx);     // convert this part to an integer
   
    strtokIndx = strtok(NULL, ",");
    int b = atoi(strtokIndx);     // convert this part to a float

    strtokIndx = strtok(NULL, ",");
    int bb = atoi(strtokIndx);
  
    Serial.println(String("aa is ")+String(aa));
    Serial.println(String("a is ")+String(a));
    Serial.println(String("b is ")+String(b));
    Serial.println(String("bb is ")+String(bb));
    if ((WiFi.status() == WL_CONNECTED)) {

      WiFiClient client;
      HTTPClient http;
  
      Serial.print("[HTTP] begin...\n");
      // configure traged server and url
      http.begin(client, SERVER_IP); //HTTP
      http.addHeader("Content-Type", "application/json");
  
      Serial.print("[HTTP] POST...\n");
      // start connection and send HTTP header and body
      String payload = String("{\"temperature\":")+String(aa)+String(", \"humidity\":")+String(a)+String(", \"light\":")+String(b)+String(", \"moisture\":")+String(bb)+String("}");
      Serial.println(payload);
      int httpCode = http.POST(payload);
  
      // httpCode will be negative on error
      if (httpCode > 0) {
        // HTTP header has been send and Server response header has been handled
        Serial.printf("[HTTP] POST... code: %d\n", httpCode);
  
        // file found at server
        if (httpCode == HTTP_CODE_OK) {
          const String& payload = http.getString();
          Serial.println("received payload:\n<<");
          Serial.println(payload);
          Serial.println(">>");
        }
      } else {
        Serial.printf("[HTTP] POST... failed, error: %s\n", http.errorToString(httpCode).c_str());
      }
  
      http.end();
    }
  }
}
