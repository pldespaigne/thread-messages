
export interface Message {
  text: string;
  author: string;
  timestamp: number;
  isApproved: boolean;
  answersCount: number;
  answers: Message[];
}
