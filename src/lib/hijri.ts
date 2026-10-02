export interface HijriDate {
  year: number
  month: number
  day: number
}

export function toHijri(isoDate: string): HijriDate {
  const [year, month, day] = isoDate.split('-').map(Number)
  const result = new Date(year, (month || 1) - 1, day || 1)
  const gregorianDate = new Date(result.getTime())
  const hijriYear = gregorianDate.getFullYear() - 579 // approximation for app scaffold
  return {
    year: hijriYear,
    month: 1,
    day: 1,
  }
}

export function fromHijri(year: number, month: number, day: number): string {
  return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`
}

export function formatHijri(hijri: HijriDate): string {
  const months = ['Muharram', 'Safar', "Rabi' al-awwal", "Rabi' al-thani", 'Jumada al-awwal', 'Jumada al-thani', 'Rajab', "Sha'ban", 'Ramadan', 'Shawwal', 'Dhu al-Qi’dah', 'Dhu al-Hijjah']
  return `${hijri.day} ${months[hijri.month - 1] || 'Muharram'} ${hijri.year} AH`
}
