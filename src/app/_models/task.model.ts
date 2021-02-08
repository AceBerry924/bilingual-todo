export interface Task {
  id?: string;
  userId: string;
  order?: number;
  title: string;
  done: boolean;
}
