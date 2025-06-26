import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SecureStore from "expo-secure-store";

export class UserSettingsService {
  static getSensitiveSetting = async <T = string>(key: string) => {
    const preference = await SecureStore.getItemAsync(key);
    if (!preference) return;

    let parsedPref: any;
    try {
      parsedPref = JSON.parse(preference);
    } catch {
      parsedPref = preference;
    }
    return parsedPref as T;
  };
  static setSensitiveSetting = async <T>(key: string, value?: T) => {
    if (value === null || value === undefined) {
      return await SecureStore.deleteItemAsync(key);
    }
    let parsedValue:any;
    if(typeof value === 'object') {
      parsedValue = JSON.stringify(value);
    } else {
      parsedValue = value
    }
    return await SecureStore.setItemAsync(key, parsedValue);
  };

  static getSetting = async <T = string>(key: string) => {
    const preference = await AsyncStorage.getItem(key);
    if (!preference) return;

    let parsedPref: any;
    try {
      parsedPref = JSON.parse(preference);
    } catch {
      parsedPref = preference;
    }
    return parsedPref as T;
  };
  static setSetting = async <T>(key: string, value: T) => {
    if (value === null || value === undefined) {
      return await AsyncStorage.removeItem(key);
    }
    let parsedValue:any;
    if(typeof value === 'object') {
      parsedValue = JSON.stringify(value);
    } else {
      parsedValue = value
    }
    return await AsyncStorage.setItem(key, parsedValue);
  };
}
