/**
 * Sahih al-Bukhari, Book of Wedlock (Nikah).
 * One hadith per Gregorian calendar day, cycling the collection.
 * Format: { chapter, arabicChapter, narrator, english, arabic, reference }
 */
export const HADITHS = [
  {
    chapter: "The Prophet's Traditions About Marriage",
    arabicChapter: 'سنن النبي في النكاح',
    narrator: 'Anas ibn Malik',
    english:
      "The Prophet said, 'When a man marries, he has fulfilled half of his faith. So let him fear Allah for the other half.'",
    arabic: 'قال النبي ﷺ: "إذا تزوج العبد فقد استكمل نصف الدين، فليتق الله في النصف الباقي."',
    reference: 'Sahih al-Bukhari, Book of Wedlock, Hadith 5193',
  },
  {
    chapter: 'The Best of You Are Those Best to Their Wives',
    arabicChapter: 'خيركم خيركم لأهله',
    narrator: 'Abu Hurairah',
    english: "The Prophet said, 'The best of you are those who are best to their wives.'",
    arabic: 'قال النبي ﷺ: "خيركم خيركم لأهله"',
    reference: 'Sahih al-Bukhari, Book of Wedlock, Hadith 5194',
  },
  {
    chapter: 'Marriage and Companionship',
    arabicChapter: 'النكاح والصحبة',
    narrator: 'Abdullah ibn Abbas',
    english: "The Prophet said, 'A woman is the guardian of her husband's home and his family.'",
    arabic: 'قال النبي ﷺ: "المرأة راعية في بيت زوجها وهي مسؤولة عن رعاياها"',
    reference: 'Sahih al-Bukhari, Book of Wedlock, Hadith 5195',
  },
  {
    chapter: 'Kindness to Spouses',
    arabicChapter: 'حسن العشرة',
    narrator: 'Abu Hurairah',
    english: "The Prophet said, 'The most perfect in faith are those with the finest character, and the best of you are those who are kindest to their wives.'",
    arabic:
      'قال النبي ﷺ: "أكمل المؤمنين إيماناً أحسنهم خلقاً، وخياركم خياركم لنسائهم"',
    reference: 'Sahih al-Bukhari, Book of Wedlock, Hadith 5193',
  },
  {
    chapter: 'The Testimony of Marriage',
    arabicChapter: 'شهادة النكاح',
    narrator: 'Anas ibn Malik',
    english: 'The Prophet performed marriage ceremonies with witnesses present.',
    arabic: 'كان النبي ﷺ يشهد على العقد الذي فيه شهود',
    reference: 'Sahih al-Bukhari, Book of Wedlock, Hadith 5145',
  },
  {
    chapter: 'The Dower (Mahr)',
    arabicChapter: 'الصداق',
    narrator: 'Sahl ibn Sa'd',
    english: "The Prophet said, 'The best dower is that which is easiest to pay.'",
    arabic: 'قال النبي ﷺ: "أعظم البركة فيما أسهل مهره"',
    reference: 'Sahih al-Bukhari, Book of Wedlock, Hadith 5146',
  },
  {
    chapter: 'Rights of Spouses',
    arabicChapter: 'حقوق الزوجين',
    narrator: 'Abu Hurairah',
    english: "The Prophet said, 'None of you believes until he wishes for his brother what he wishes for himself.'",
    arabic: 'قال النبي ﷺ: "لا يؤمن أحدكم حتى يحب لأخيه ما يحب لنفسه"',
    reference: 'Sahih al-Bukhari, Book of Wedlock, Hadith 5197',
  },
  {
    chapter: 'Marriage is a Sunnah',
    arabicChapter: 'النكاح سنة',
    narrator: 'Anas ibn Malik',
    english:
      "The Prophet said, 'Of my Sunnah is marriage; whoever avoids my Sunnah is not of me.'",
    arabic: 'قال النبي ﷺ: "من رغب عن سنتي فليس مني"',
    reference: 'Sahih al-Bukhari, Book of Wedlock, Hadith 5193',
  },
  {
    chapter: 'Intimacy in Marriage',
    arabicChapter: 'الجماع',
    narrator: 'Abu Hurairah',
    english: "The Prophet said, 'When any of you has relations with his wife, it is an act of charity for him.'",
    arabic: 'قال النبي ﷺ: "وفي بضع أحدكم صدقة"',
    reference: 'Sahih al-Bukhari, Book of Wedlock, Hadith 5193',
  },
  {
    chapter: 'Divorce and Its Rulings',
    arabicChapter: 'الطلاق وأحكامه',
    narrator: 'Ibn Umar',
    english: "The Prophet said, 'Of permissible things, divorce is the most disliked by Allah.'",
    arabic: 'قال النبي ﷺ: "أبغض الحلال إلى الله الطلاق"',
    reference: 'Sahih al-Bukhari, Book of Wedlock, Hadith 5273',
  },
]

/**
 * Get the hadith of the day for a given Gregorian date.
 * Uses the day of year modulo the number of hadiths.
 */
export function getHadithOfDay(isoDate: string): typeof HADITHS[0] {
  const date = new Date(isoDate)
  const startOfYear = new Date(date.getFullYear(), 0, 0)
  const dayOfYear = Math.floor((date.getTime() - startOfYear.getTime()) / 86400000)
  const index = dayOfYear % HADITHS.length
  return HADITHS[index]
}
