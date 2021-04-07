/* Photocell simple testing sketch. 
 
Connect one end of the photocell to 5V, the other end to Analog 0.
Then connect one end of a 10K resistor from Analog 0 to ground
 
For more information see http://learn.adafruit.com/photocells */
#include <dht_nonblocking.h>
#include <Servo.h>

#define DHT_SENSOR_TYPE DHT_TYPE_11


static const int DHT_SENSOR_PIN = 2;
DHT_nonblocking dht_sensor( DHT_SENSOR_PIN, DHT_SENSOR_TYPE );
 
int photocellPin = 0;     // the cell and 10K pulldown are connected to a0
int moistureSensorPin = 1; // connect to a1
Servo myservo;
 
void setup(void) {
  // We'll send debugging information via the Serial monitor
  pinMode(8, OUTPUT);

  digitalWrite(8, HIGH);
  //myservo.attach(9);
  //myservo.write(90);// move servos to center position -> 90°
  Serial.begin(9600);   
  Serial1.begin(9600);
  Serial.println("Arduino starting...");
  delay(2000);
}

void rotateServo() {
  digitalWrite(8, LOW);// move servos to center position -> 90°
  delay(2000);
  digitalWrite(8, HIGH);// move servos to center position -> 60°
  delay(2000);
}

static bool measure_environment( float *temperature, float *humidity, int * photocellReading, int* moistureReading )
{
  static unsigned long measurement_timestamp = millis( );

  /* Measure once every four seconds. */
  if( millis( ) - measurement_timestamp > 60000ul ) // every 1 min
  {
    if( dht_sensor.measure( temperature, humidity ) == true )
    {
      measurement_timestamp = millis();
      *photocellReading = analogRead(photocellPin);
      *moistureReading = analogRead(moistureSensorPin);
      return( true );
    }
  }

  return( false );
}

 
void loop(void) {
  int photocellReading;     // the analog reading from the analog resistor divider
  int moistureReading; 
  float temperature;
  float humidity;


  if( measure_environment( &temperature, &humidity, &photocellReading, &moistureReading ) == true )
  {
  
    Serial.print( "T = " );
    Serial.print( temperature, 1 );
    Serial.print( " deg. C, H = " );
    Serial.print( humidity, 1 );
    Serial.println( "%" );
    Serial.print("Analog reading = ");
    Serial.print(photocellReading);     // the raw analog reading
    Serial.println(" ");
    Serial.print("moisture Reading = ");
    Serial.print(moistureReading);
   
    // We'll have a few threshholds, qualitatively determined
    if (photocellReading < 10) {
      Serial.println(" - Dark");
    } else if (photocellReading < 200) {
      Serial.println(" - Dim");
    } else if (photocellReading < 500) {
      Serial.println(" - Light");
    } else if (photocellReading < 800) {
      Serial.println(" - Bright");
    } else {
      Serial.println(" - Very bright");
    }
    String str = String(humidity)+String(',')+String(temperature)+String(',')+String(photocellReading)+String(',')+String(moistureReading);
    Serial1.println(str);
    if (moistureReading> 200) {
      rotateServo();
    }
  }
  //delay(10000); // once ever x seconds
}
