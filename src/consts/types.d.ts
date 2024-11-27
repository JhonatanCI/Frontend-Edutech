export type UUID = `${string}-${string}-${string}-${string}-${string}`;

export interface Program {
  id: UUID,
  name: string,
  description: string,
  image: string
}

export interface World {
    id: UUID,
    name: string,
    description: string,
    image: string
}