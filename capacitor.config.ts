import { CapacitorConfig } from '@capacitor/cli';
import { SplashScreen } from '@capacitor/splash-screen';

const config: CapacitorConfig = {
  appId: 'com.suuygulamasi.ionic',
  appName: 'Su Uygulaması',
  webDir: 'www',
  bundledWebRuntime: false,
  plugins: {
    PushNotifications: {
      presentationOptions: ["badge", "sound", "alert"],
    },
  },
};


export default config;
