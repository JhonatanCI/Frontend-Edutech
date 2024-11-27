export type UUID = `${string}-${string}-${string}-${string}-${string}`;

export interface Program {
  id: UUID,
  name: string,
  description: string,
  image: string,
  credits: number
}

export interface World {
    id: UUID,
    name: string,
    description: string,
    image: string
}

export interface LearningItem {
  title: string;
  description: string;
  icon: JSX.Element;
}