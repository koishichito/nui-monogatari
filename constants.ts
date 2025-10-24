
import { Statue } from './types';

export const STATUES: Statue[] = [
  {
    name: "浜尾新の銅像",
    description: "これは東京大学の元総長、浜尾新の銅像だ。彼の教育への貢献は計り知れない。",
    image: "https://picsum.photos/seed/statue1/800/600"
  },
  {
    name: "エドワード・ダイヴァースの銅像",
    description: "これはお雇い外国人教師、エドワード・ダイヴァースの銅像だ。日本の化学の発展に大きく貢献した。",
    image: "https://picsum.photos/seed/statue2/800/600"
  },
  {
    name: "上野英三郎とハチ公の像",
    description: "これは有名なハチ公とその飼い主、上野英三郎博士の像だ。再会を喜ぶ姿に心温まる。",
    image: "https://picsum.photos/seed/statue3/800/600"
  }
];

export const INITIAL_POINTS = 0;
export const POINTS_THRESHOLD_GOOD = 8;
export const POINTS_THRESHOLD_NEUTRAL = 1;
