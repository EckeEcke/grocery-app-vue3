import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { ListItem } from '../types/listitem'
import type { Meal } from '../types/meal'

export const useListsStore = defineStore('lists', () => {
  const groceryList = ref<[] | ListItem[]>([])
  const mealPlan = ref<[] | Meal[]>([])
  const setGroceryList = (newList: ListItem[]) => {
    if (!newList) return
    groceryList.value = newList
    localStorage.setItem('grocerylist', JSON.stringify(groceryList.value))
  }
  const setMealPlan = (newPlan: Meal[]) => {
    if (!newPlan) return
    mealPlan.value = newPlan
    localStorage.setItem('mealPlan', JSON.stringify(mealPlan.value))
  }
  const setItemPlanned = (index: number) => {
    const clonedWithNewState = [...groceryList.value]
    const isPlanned = clonedWithNewState[index].planned
    clonedWithNewState[index].planned = !isPlanned
    groceryList.value = clonedWithNewState
    if (clonedWithNewState === undefined) return
    localStorage.setItem('grocerylist', JSON.stringify(groceryList.value))
  }
  const addNewItem = (name: string) => {
    const clonedList = [...groceryList.value]
    const index = clonedList.findIndex((listItem) => listItem.name === name)
    if (name === undefined || name.length === 0) return
    if (index == -1) {
      clonedList.push({
        name: name,
        planned: true,
        id: newGroceryItemId()
      })
    } else {
      clonedList[index].planned = true
    }
    groceryList.value = clonedList
    localStorage.setItem('grocerylist', JSON.stringify(groceryList.value))
  }
  const deleteSingleItem = (element: ListItem) => {
    const index = groceryList.value
      .map(function (entry) {
        return entry.name
      })
      .indexOf(element.name)
    groceryList.value.splice(index, 1)
    localStorage.setItem('grocerylist', JSON.stringify(groceryList.value))
  }
  const checkSingleItem = (element: ListItem) => {
    const indexGrocerylist = groceryList.value
      .map(function (element: ListItem) {
        return element.name
      })
      .indexOf(element.name)
    if (groceryList.value[indexGrocerylist]) {
      groceryList.value[indexGrocerylist].planned = false
      groceryList.value[indexGrocerylist].quantity = ''
    }
    localStorage.setItem('grocerylist', JSON.stringify(groceryList.value))
  }
  const addNewMeal = (payload: Meal) => {
    const clonedList = [...mealPlan.value]
    const index = mealPlan.value.findIndex((listItem) => listItem.name === payload.name)
    if (index == -1) {
      clonedList.push({
        name: payload.name,
        planned: true,
        id: newMealId(),
        ingredients: payload.ingredients,
        recipe: payload.recipe
      })
    } else {
      clonedList[index].planned = true
    }
    mealPlan.value = clonedList
    localStorage.setItem('mealPlan', JSON.stringify(mealPlan.value))
  }
  const setMealPlanned = (index: number) => {
    const clonedWithNewState = [...mealPlan.value]
    const isPlanned = clonedWithNewState[index].planned
    clonedWithNewState[index].planned = !isPlanned
    mealPlan.value = clonedWithNewState
    if (clonedWithNewState === undefined) return
    localStorage.setItem('mealPlan', JSON.stringify(mealPlan.value))
  }
  const deleteSingleMeal = (element: Meal) => {
    const index = mealPlan.value
      .map(function (entry) {
        return entry.name
      })
      .indexOf(element.name)
    mealPlan.value.splice(index, 1)
    localStorage.setItem('mealPlan', JSON.stringify(mealPlan.value))
  }

  const newGroceryItemId = () => {
    if (groceryList.value && groceryList.value.length) {
      return Math.max(...groceryList.value.map((item) => item.id ?? 0)) // check if +1 needed
    } else return 0
  }

  const newMealId = () => {
    if (mealPlan.value !== undefined && mealPlan.value.length) {
      return Math.max(...mealPlan.value.map((item) => item.id ?? 0)) // check if +1 needed
    } else return 0
  }

  const splitUpListItemsAndSortByFirstLetter = () => {
    const itemList = [...groceryList.value]
    const entriesByFirstLetter: (string | ListItem)[][] = []
    itemList.map((item: ListItem) => {
      const firstLetter = item.name.charAt(0).toUpperCase()
      const index: number = entriesByFirstLetter.findIndex((arr) => arr[0] === firstLetter)

      if (index === -1) {
        entriesByFirstLetter.push([firstLetter, item])
      } else {
        entriesByFirstLetter[index].push(item)
      }
    })

    entriesByFirstLetter.sort((a, b) => {
      const letterA = a[0] as string
      const letterB = b[0] as string
      return letterA.localeCompare(letterB)
    })

    return entriesByFirstLetter
  }

  const splitUpMealsAndSortByFirstLetter = () => {
    const itemList = [...mealPlan.value]
    const entriesByFirstLetter: (string | Meal)[][] = []
    itemList.map((item: Meal) => {
      const firstLetter = item.name.charAt(0).toUpperCase()
      const index: number = entriesByFirstLetter.findIndex((arr) => arr[0] === firstLetter)

      if (index === -1) {
        entriesByFirstLetter.push([firstLetter, item])
      } else {
        entriesByFirstLetter[index].push(item)
      }
    })

    entriesByFirstLetter.sort((a, b) => {
      const letterA = a[0] as string
      const letterB = b[0] as string
      return letterA.localeCompare(letterB)
    })

    return entriesByFirstLetter
  }

  return {
    groceryList,
    mealPlan,
    setGroceryList,
    setMealPlan,
    setItemPlanned,
    addNewItem,
    deleteSingleItem,
    checkSingleItem,
    addNewMeal,
    setMealPlanned,
    deleteSingleMeal,
    newGroceryItemId,
    newMealId,
    splitUpListItemsAndSortByFirstLetter,
    splitUpMealsAndSortByFirstLetter
  }
})
