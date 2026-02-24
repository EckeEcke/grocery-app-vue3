export interface Meal {
  name: string
  planned?: boolean
  id?: number
  ingredients: string[]
  recipe?: string
  instructions?: string
}
