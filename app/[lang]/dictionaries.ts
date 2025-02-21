import { Languages, PagesDictionary } from '@/constants/types'
import 'server-only'

const dictionaries: Record<Languages, () => Promise<PagesDictionary>> = {
  en: async () => (await import('../../dictionaries/en.json')).default,
  nl: async () => (await import('../../dictionaries/nl.json')).default,
  es: async () => (await import('../../dictionaries/es.json')).default,
  ar: async () => (await import('../../dictionaries/ar.json')).default,
}

export const getDictionary = async (locale: Languages) =>
  dictionaries[locale]()