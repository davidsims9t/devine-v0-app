# Prerequisite

Check out this project into ~/XCodeProjects/

# Installing third-party libraries

1. Inside of ~/XCodeProjects/DevineApp/ use npm install to install all of the React Native dependencies.
2. Open up ~/XCodeProjects/DevineApp/ios/DevineApp.xcodeproj then add all of the third-party dependencies (.xcodeproj) from ~/XCodeProjects/DevineApp/node_modules/ to XCode into the Libraries group.
3. For the FBSDKCoreKit and FBSDKLoginKit plugins you'll need to download the latest FacebookSDK to ~/Documents/. You can download them from https://developers.facebook.com/docs/ios
4. After downloading the SDK files move the .framework files into the Libraries group.
5. Proceed by clicking on the DevineApp project and going to the "Build Phrases" tab.
6. Toggle the Link Binary with Libraries option add all of the "Workspace" files.
7. You will also have to add FacebookSDKCoreKit, FacebookSDKLoginKit, Social frameworks from the "Frameworks" option here.

# Adding assets/resources

1. Click on the DevineApp project and select "Build Phrases."
2. Toggle the Copy Bundle Resources option.
3. Add the items from "Fonts" and "Sounds." This includes the Material Icons, Zocial, as well as the Lato fonts.

# Configuring Facebook framework in XCode

After adding the Facebook frameworks you'll need to add them to the Framework Search Paths in the project. Go to "Build Settings" and search for "Framework Search Paths" then double-click on the field and add ~/Documents/FacebookSDK/ to the search path.

# Configuring Info.plist

1.
