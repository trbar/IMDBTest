# IMDB Test

## Prerequisites

- [Node.js > 12](https://nodejs.org) and npm (Recommended: Use [nvm](https://github.com/nvm-sh/nvm))
- [Watchman](https://facebook.github.io/watchman)
- [Xcode](https://developer.apple.com/xcode)
- [Cocoapods](https://cocoapods.org)
- [JDK > 11](https://www.oracle.com/java/technologies/javase-jdk11-downloads.html)
- [Android Studio and Android SDK](https://developer.android.com/studio)

## Base dependencies

- [@react-native-async-storage/async-storage](https://react-native-async-storage.github.io/async-storage/) for app persistent storage.
- [@react-native-community/netinfo](https://github.com/react-native-netinfo/react-native-netinfo) for network internet status.
- [react-navigation](https://reactnavigation.org/) navigation library & dependencies.
- [react-native-paper](https://callstack.github.io/react-native-paper/index.html) for prestyled UI components.
- [react-native-vector-icons](https://github.com/ammarahm-ed/react-native-mmkv-storage#readme) for icons & dependecies.
- [react-redux](https://redux.js.org/) & [@reduxjs/toolkit](https://redux-toolkit.js.org/) for state management.
- [redux-saga](https://redux-saga.js.org/) for flow control and side effects.
- [redux-logger](https://github.com/LogRocket/redux-logger) for quick debugging.

## Installation

1. clone the repository
2. install dependencies using `yarn` or `npm`
3. rename [apikeys.sample.tsx](apikeys.sample.tsx) to  `apikeys.tsx` and add your own [IMDB api key](https://imdb-api.com/) or use the included sample api key in the [apikeys.sample.tsx](apikeys.sample.tsx)
3. for running ios: `npx react-native run-ios`
4. for running android: `npx react-native run-android`

## QA Script (could be converted to Appium E2E test)

- [ ] start up iOS app after having made sure the device has been completely erased
- [ ] verify that there are two bottom "Tab"s: "Favourites" & "Search"
- [ ] verify that in the "Favourites" "Tab", "Search movies to add to Favourites" text is visible, and that the "Favourites" "Tab" is focused
- [ ] tap on the "Search" bottom tab, verify that the "Search" bottom "Tab" is active
- [ ] verify that the "Search" "Tab" contains a "Search Box" to search movies
- [ ] input "The Godfather" into the "Search Box" and ensure there is an "Loading Indicator" that is displayed
- [ ] verify that the first 3 "Result" "Titles" are the following: "The Godfather", "The Godfather: Part II" & "The Godfather: Part III"
- [ ] verify that when you click on the "Result", a "Modal" shows with a "Loading Indicator" or an "Image" with a movie poster
- [ ] verify that swiping down will close down the "Modal" and return to the previous screen
- [ ] verify that after clicking the button "ADD TO FAVOURITES" in the "The Godfather" "Result" will disappear from the "Search" "List" and the first "Result" displayed contains the "Title" "The Godfather: Part II"
- [ ] click on the "Favourites" "Tab" and verify that the "The Godfather" "Result" is displayed
- [ ] click on the "Search" "Tab" and verify the first "Result" from the "Search" "List" contains the title "The Godfather: Part II"
- [ ] in the "Result" that contains the "Title" "The Godfather: Part II", click on the "Button" "HIDE FROM SEARCH RESULTS" and verify that the "Result" disappears from the "Search" "List" and the first "Result" in the "Search" "List" contains the title "The Godfather: Part III"
- [ ] in the "Search" "List", in the "Result" that contains the "Title" "The Godfather: Part III", click on the button "ADD TO FAVOURITES" and verify that the "Results" disappears and the first "Result" in the "Search" "List" contains the title "Miracles: The Canton Godfather"
- [ ] click on the "Favourites" "Tab" and verify that 2 "Results" are displayed in the "Favourite List": the first "Result" that contains the "Title" "The Godfather" and the second "Result" that contains the "Title" "The Godfather: Part III"
- [ ] restart the app and verify that the "Favourites" "Tab" contains 2 "Results" that are displayed: the first "Result" that contains the "Title" "The Godfather" and the second "Result" that contains the "Title" "The Godfather: Part III"
- [ ] on the "Result" in the "Favourites" "List" that contains the "Title" "The Godfather", click on the "Button" "REMOVE FROM FAVOURITES" and verify the "Favourites" "List" only contains one "Result" that contains the "Title" "The Godfather: Part III"
- [ ] click on the "Search Box" and input the text "The Godfather"
- [ ] verify that the first 3 "Result" "Titles" are the following: "The Godfather", "Miracles: The Canton Godfather" & "The Last Godfather"
- [ ] turn off internet and verify that below the "Search Box" a red "Status Bar" appears with the text "No Internet Connection"
- [ ] click on the "Favourites" "Tab" and verify that a red "Status Bar" appears under the "Favourites" "Title" "Screen Header"
- [ ] turn on the internet and verify that there is an internet connection for the device
- [ ] verify that the red "Status Bar" that contains the text "No Internet Connection" disappears in the "Favourites" "Tab"
- [ ] click on the "Search" "Tab" and verify that the red "Status Bar" that contains the text "No Internet Connection" has disappeared from below the "Search Box"
- [ ] repeat all the above steps for the Android app

