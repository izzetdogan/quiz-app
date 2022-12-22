export interface IQuiz {
  id: number;
  title: string;
  description: string;
  maxMarks: number;
  numberOfQuestion: number;
  active: boolean;
  category: IQuiz;
}
