export type LearningItem = {
  title: string;
  description: string;
  icon: JSX.Element;
}

export type Image = {
  src: string,
  alt: string
}

export type ChartValues = {
  categories: string[],
  max: number
}