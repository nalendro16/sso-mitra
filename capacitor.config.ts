import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.sajang.customer',
  appName: 'Sajang',
  webDir: 'build',
  server: {
    androidScheme: 'https'
  }
};

export default config;
