# Carleton-EmergencyTrackingGPS

## Description

Carleton-EmergencyTrackingGPS was a fourth-year capstone project focused on developing a low-power GPS tracking watch designed for people living with dementia. The watch's goal was to minimize battery consumption while maintaining real-time communication with a companion mobile app, enabling caregivers to monitor the wearer's location and ensure their safety.

This capstone project is a continuation from previous capstone teams since 2019.

## Development 

Before development of the watch, the goal for this team was to develop the functionality on a Printed Circuit Board (PCB) that contained a Bluetooth chip, an LTE chip and a GPS chip, all connected through the MCU. Below is a detail representation of the board:

![image](https://github.com/user-attachments/assets/d36cd17c-7f70-4f76-a11c-c8f2a8267ff4)

## Folder Explanations

- **EmergencyTrackerSystem**: this folder contains the implementation that embeds into the PCB, which has the functionality of the GPS and the bluetooth.
- **IndividualModuleFunctionality**: this folder contains sample Arduino code to test the different modules individually.
- **designs**: This folder contains the design idea for both the hardware and software side of the things. it includes the mobile design using figma, and the schematics of the PCB.
- **documents**: This folder includes generic documents for the overall project.
- **mobile-app**: This folder includes the full functionality of the mobile app using TypeScript, Firebase and react-native with the expo framework. It allows users to login, register, view their loved ones locations, add new loved to caregive, set home locations for each loved one, and change settings.

You can view the full overview of the project including how testing and development was performed, design decisions was made and more in the [full capstone report](https://github.com/Anthony-Massaad/Carleton-EmergencyTrackingGPS/blob/main/EmergencyTackingGPS_Capstone_Report.pdf)

## Credits
- [Anthony Massaad](https://github.com/Anthony-Massaad)
- [Christopher Semaan](https://github.com/csemaan10)
- [Cory Helm](https://github.com/CoryH99)
- [Nick Tanouchev](https://github.com/NicolasTanouchev1)
