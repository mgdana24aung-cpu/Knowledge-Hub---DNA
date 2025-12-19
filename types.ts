
export interface Phrase {
  id: number;
  english: string;
  myanmar: string;
  category: string;
}

export interface AudioState {
  isPlaying: boolean;
  isLoading: boolean;
  phraseId: number | null;
}
