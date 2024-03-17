import serial
import time

# Define the COM port
com_port = 'COM7'

# Define the baud rate
baud_rate = 9600  

try:
    ser = serial.Serial(com_port, baud_rate, timeout=1)
    print(f"Connected to {com_port} at {baud_rate} baud.")
except serial.SerialException:
    print(f"Failed to connect to {com_port}.")
    exit()

try:
    while True:
        # Read data from the serial port
        try:
            data = ser.readline().decode('utf-8').strip()
            if data:
                print("Received:", data)
        except UnicodeDecodeError:
            print("Failed to decode received data. Make sure the stm is sending data")
        
        time.sleep(0.1)
except KeyboardInterrupt:
    print("Exiting...")
    ser.close()  # Close the serial port when exiting