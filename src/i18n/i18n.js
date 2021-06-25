import { I18nManager } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

// import * as Localization from 'expo-localization';
import I18n from "i18n-js";

import ar from "./ar.json";
import en from "./en.json";

import moment from "moment";

I18n.fallbacks = true;
I18n.translations = {
  en,
  ar,
};

I18n.locale = "en"; //Localization.locale;

I18n.isRTL = I18n.locale === "ar";
moment.locale(I18n.isRTL ? "ar" : "en");
// Allow RTL alignment in RTL languages
// I18nManager.allowRTL(I18n.isRTL);

I18n.changLanguage = (lang) => {
  I18n.locale = lang;
  I18n.isRTL = I18n.locale === "en";

  // Allow RTL alignment in RTL languages
  I18nManager.allowRTL(false);
  I18nManager.forceRTL(false);
  moment.locale(I18n.isRTL ? "ar" : "en");
};

I18n.LoadSavedLanguage = () => {
  AsyncStorage.getItem("lang")
    .then((lang) => {
      console.log("AsyncStorage.getItem lang", lang);
      if (lang) {
        I18n.locale = lang;
        I18n.isRTL = I18n.locale === "ar";
      }
    })
    .catch((err) => {
      // const newLang = I18n.locale === 'ar' ? 'en' : 'ar';
      // I18n.changLanguage(newLang);
      console.log("err loading lang", err);
    });
};
I18n.changDefLanguage = () => {
  const newLang = I18n.locale === "ar" ? "en" : "ar";
  I18n.changLanguage(newLang);
};

I18n.missingTranslation = function (scope, options) {
  //guess intended string
  // console.log('Missing translate ', { scope });
  if (this.missingBehaviour === "guess") {
    //get only the last portion of the scope
    const s = scope.split(".").slice(-1)[0];
    //replace underscore with space && camelcase with space and lowercase letter
    return (
      (this.missingTranslationPrefix.length > 0
        ? this.missingTranslationPrefix
        : "") +
      s
        .replace("_", " ")
        .replace(
          /([a-z])([A-Z])/g,
          (match, p1, p2) => `${p1} ${p2.toLowerCase()}`
        )
    );
  }

  const defaultTranslation = options.defaultTranslation;
  if (defaultTranslation) return defaultTranslation;
  console.log("NO TRANSLATES", scope);
  // return "NO TRANSLATES " + scope;
  return scope;
};

export const getString = (param: string, mapObj?: object) => {
  if (mapObj) {
    I18n.t(param, mapObj);
  }
  return I18n.t(param);
};

export default I18n;
