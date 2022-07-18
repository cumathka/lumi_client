import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { TRANSLATIONS_DE } from './de/translations'
import { TRANSLATIONS_EN } from './en/translations'
import { TRANSLATIONS_FR } from './fr/translations'
import { TRANSLATIONS_IT } from './it/translations'
i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      de: {
        translation: TRANSLATIONS_DE,
      },
      en: {
        translation: TRANSLATIONS_EN,
      },
      fr: {
        translation: TRANSLATIONS_FR,
      },
      it: {
        translation: TRANSLATIONS_IT,
      },
    },
  })
  i18n.changeLanguage('en')
export default i18n;