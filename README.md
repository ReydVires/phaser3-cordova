# phaser3-cordova


> **References**

- Signing App - https://cordova.apache.org/docs/en/latest/guide/platforms/android/index.html#signing-an-app

- Add Platform - https://cordova.apache.org/docs/en/latest/guide/cli/index.html#add-platforms

- Build Project - https://cordova.apache.org/docs/en/latest/guide/cli/index.html#build-the-app


> **Flow**

- File of game in *phaser_project* directory

- Read [README](https://github.com/ReydVires/phaser3-cordova/blob/master/phaser_project/README.md) in *phaser_project* directory for installation **Phaser 3**

- Build result from phaser in *www/build/* directory

- You may change (manually setting) any *index.html* code properly

- All assets that used in game need also to be in *www/assets/* directory

- To bulid the apk, use `cordova build android` (for detail, see **References**)

- If *PATH* of Android requirement corrected, it will produce apk debug under *platforms/android/app/build/outputs/apk/debug/* directory
