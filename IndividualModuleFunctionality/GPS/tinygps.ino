#include <TinyGPS++.h>
#include <SoftwareSerial.h>

// Including library TinyGPS to interact with the GPS module from ublox MAX-M8C
//Connections:
// Arduino Pin 2 RX -> CAM M8C TX
//Arduino Pin 3 TX -> CAM M8C RX

//With this line I tell Arduino to receive data on digital pin 2, znd send data from pin 3
static const short RX_pin = 2, TX_pin = 3;

static const uint32_t GPSBaud_rate = 9600; //Baud rate for GPS system

SoftwareSerial ss(RX_pin, TX_pin); // Define the software serial according to the RX snd TX pins

TinyGPSPlus GPS_ublox; //create the object for the GPS ublox MXXXXX

void setup() {
  
  Serial.begin(115200); //open serial to read the output of the GPS module on screen
  ss.begin(GPSBaud_rate);    //open the software serial to connect to GPS_ublox
  
  Serial.println("GPS test...");
    
}

void loop() {
    Serial.print("SAT #: ");Serial.print(GPS_ublox.satellites.value()); //Number of satellites connected
    Serial.print("LAT: "); Serial.print(GPS_ublox.location.lat());      //Latitude
    Serial.print("LONG: "); Serial.print(GPS_ublox.location.lng());    //Longitude
    Serial.print("ALT:  "); Serial.println(GPS_ublox.altitude.meters());      //Altitude

    smartDelay(1000);  // a smart delay is needed when working with GPS data
  
    //The GPS module sends the data to arduino as a string. The following block check if 
    //this is actually happening or if there are error in communication, e.g. due to the
    //wiring or because of a faulty module. If more than 10 seconds pass and the string
    //from the module is very short, below 10 characters, an error message is generated
    if (millis() > 10000 && GPS_ublox.charsProcessed() < 10)
    Serial.println("Error! No GPS data received from the module!");
}

// A smart version of the delay function is needed when dealing with GPS data
// This delay make sure not to interrupt any dialogue with the GPS module

static void smartDelay(unsigned long ms)
{
  unsigned long start = millis();
  do 
  {
    while (ss.available())
      GPS_ublox.encode(ss.read());
  } while (millis() - start < ms);
}