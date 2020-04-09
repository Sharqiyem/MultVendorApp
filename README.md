adb shell am start -W -a android.intent.action.VIEW -d "exp://127.0.0.1:19000/--/details com.vistanasoft.astore
adb shell am start -W -a android.intent.action.VIEW -d "exp://127.0.0.1:19000/--/details host.exp.exponent

xcrun simctl openurl booted exp://127.0.0.1:19000/--/details

################################################################
emulator -list-avds

//PIXEL
/Users/sharqi/Library/Android/sdk/emulator/emulator -avd Pixel_2_API_27 -netdelay none -netspeed full

//NEXUS
/Users/sharqi/Library/Android/sdk/emulator/emulator -avd Nexus_6_API_27 -netdelay none -netspeed full

yarn cache clean &&
yarn install &&
yarn start -- --reset-cache
