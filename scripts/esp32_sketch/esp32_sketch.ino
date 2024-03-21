#include <Arduino.h>
#include "freertos/FreeRTOS.h"
#include "freertos/task.h"
#include "esp_system.h"
#include "esp_log.h"
#include "driver/uart.h"
#include "string.h"
#include "driver/gpio.h"
#include <BLEDevice.h>
#include <BLEUtils.h>
#include <BLEScan.h>

BLEServer *pServer;
BLEScan* pBLEScan;

#define TXD_PIN (GPIO_NUM_17)
#define RXD_PIN (GPIO_NUM_16)

const int MAX_DEVICES = 10; // Maximum number of devices to track
const int RSSI_THRESHOLD = -70; // Adjust as needed based on signal strength

struct Device {
  String address;
  int rssi;
};

Device devices[MAX_DEVICES];
int numDevices = 0;
int isBLEScan = 0;

void setup() {
  Serial.begin(9600);
  // initialize uart2 port with esp32 and stm32
  const uart_port_t uart_num = UART_NUM_2;
  uart_config_t uart_config = {
      .baud_rate = 9600,
      .data_bits = UART_DATA_8_BITS,
      .parity = UART_PARITY_DISABLE,
      .stop_bits = UART_STOP_BITS_1,
      .flow_ctrl = UART_HW_FLOWCTRL_CTS_RTS,
      .rx_flow_ctrl_thresh = 122,
  };
  // Configure UART parameters
  ESP_ERROR_CHECK(uart_param_config(uart_num, &uart_config));
  ESP_ERROR_CHECK(uart_set_pin(UART_NUM_2, TXD_PIN, RXD_PIN, 18, 19));
  const int uart_buffer_size = (1024 * 2);
  QueueHandle_t uart_queue;
  // Install UART driver using an event queue here
  ESP_ERROR_CHECK(uart_driver_install(UART_NUM_2, uart_buffer_size, \
                                      uart_buffer_size, 10, &uart_queue, 0));

  // initialize bluetooth mapping
  BLEDevice::init("TEST_BLUETOOTH");
  pServer = BLEDevice::createServer();
  BLEService *pService = pServer->createService("8c7a056b-b542-4807-9c04-95631def9325");

  // Add characteristics to the service
  BLECharacteristic *pCharacteristic = pService->createCharacteristic(
      "8c7a056b-b542-4807-9c04-95631def9325",
      BLECharacteristic::PROPERTY_READ | BLECharacteristic::PROPERTY_WRITE
  );
  pCharacteristic->setValue("This is Tony's stuff");
  // Add the characteristic to the service
  pService->addCharacteristic(pCharacteristic);

  // Start the service
  pService->start();
}

void loop() {
  // Read data from UART.
  if (isBLEScan == 0) {
    const uart_port_t uart_num = UART_NUM_2;
    uint8_t data[128];
    int length = 0;
    ESP_ERROR_CHECK(uart_get_buffered_data_len(uart_num, (size_t*)&length));
    length = uart_read_bytes(uart_num, data, length, 100);
    if (length > 0) {
        String command = (char*) data;
        command.trim();
        command.replace("\r", "");
        command.replace("\n", "");
        Serial.println(command);

        // Send back a message
        if (command.startsWith("AT+BT=ON")) {
          Serial.println("Command valid");
          isBLEScan = 1;
          enableBluetooth();      
        }
    }
  }
}

class MyAdvertisedDeviceCallbacks: public BLEAdvertisedDeviceCallbacks {
  void onResult(BLEAdvertisedDevice advertisedDevice) {
    Serial.println("On result callback()");
    // strong signal with a ble device
    if (advertisedDevice.haveRSSI()) {
      Serial.println("Valid RSSI");
      if (numDevices < MAX_DEVICES) {
        std::string stdAddress = advertisedDevice.getAddress().toString();
        devices[numDevices].address = String(stdAddress.c_str()); // Convert std::string to String
        devices[numDevices].rssi = advertisedDevice.getRSSI();

        Serial.print("Phone detected: ");
        Serial.print(devices[numDevices].address);
        Serial.print(", RSSI: ");
        Serial.println(devices[numDevices].rssi);

        numDevices++;
        Serial.println(numDevices);
      }
    }
  }
};

void enableBluetooth() {
  BLEDevice::startAdvertising();
  Serial.println("Bluetooth is ON.");
  pBLEScan = BLEDevice::getScan();
  pBLEScan->setAdvertisedDeviceCallbacks(new MyAdvertisedDeviceCallbacks());
  pBLEScan->setActiveScan(true);
  pBLEScan->start(0);
}