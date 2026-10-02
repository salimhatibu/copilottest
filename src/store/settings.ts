import { create } from 'zustand'

interface AppSettings {
  shortName: string
  currencySymbol: string
  postalAddress?: string
  accountName?: string
  bank?: string
  paybill?: string
  accountNumber?: string
}

const DEFAULT_SETTINGS: AppSettings = {
  shortName: 'MARKAZ',
  currencySymbol: 'KES',
  postalAddress: 'P.O. Box 3011-80100 Mombasa',
  accountName: 'Ahlul Athar Registered Trustees',
  bank: 'Gulf African Bank',
  paybill: '985050',
  accountNumber: '0700004102',
}

export const useSettings = create<AppSettings>(() => DEFAULT_SETTINGS)
