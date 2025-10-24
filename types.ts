
export type GameState = 'start' | 'statue_tour' | 'vtuber_end_scene' | 'ending';
export type Companion = 'none' | 'aria';
export type EndingType = 'good' | 'neutral' | 'bad' | null;

export interface StoryChoice {
  text: string;
  id: string;
}

export interface Statue {
  name: string;
  description: string;
  image: string;
}
