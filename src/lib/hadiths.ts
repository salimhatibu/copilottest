export const HADITHS = [
  {
    chapter: 'The Prophet’s Traditions About Marriage',
    arabicChapter: 'سنن النبي في النكاح',
    narrator: 'Anas ibn Malik',
    english: 'The Prophet said, “When a man marries, he has fulfilled half of his faith. So let him fear Allah for the other half.”',
    arabic: 'قال النبي ﷺ: «إذا تزوج العبد فقد استكمل نصف الدين، فليتق الله في النصف الباقي.»',
    reference: 'Sahih al-Bukhari, Book of Wedlock, Hadith 5193',
  },
  {
    chapter: 'The Best of You Are Those Best to Their Wives',
    arabicChapter: 'خيركم خيركم لأهله',
    narrator: 'Abu Hurairah',
    english: 'The Prophet said, “The best of you are those who are best to their wives.”',
    arabic: 'قال النبي ﷺ: «خيركم خيركم لأهله»',
    reference: 'Sahih al-Bukhari, Book of Wedlock, Hadith 5194',
  },
  {
    chapter: 'Marriage and Companionship',
    arabicChapter: 'النكاح والصحبة',
    narrator: 'Abdullah ibn Abbas',
    english: 'The Prophet said, “A woman is the guardian of her husband’s home and his family.”',
    arabic: 'قال النبي ﷺ: «المرأة راعية في بيت زوجها وهي مسؤولة عن رعاياها»',
    reference: 'Sahih al-Bukhari, Book of Wedlock, Hadith 5195',
  },
]

export function getHadithOfDay(isoDate: string) {
  const date = new Date(isoDate)
  const dayOfYear = Math.floor((date.getTime() - new Date(date.getFullYear(), 0, 0).getTime()) / 86400000)
  const index = dayOfYear % HADITHS.length
  return HADITHS[index]
}
