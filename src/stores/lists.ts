import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { ListItem } from '@/types/listitem'
import type { Meal } from '@/types/meal'
import { useConfigStore } from './config'

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
  const setItemPlanned = async (index: number) => {
    const clonedWithNewState = [...groceryList.value]
    const isPlanned = clonedWithNewState[index].planned
    clonedWithNewState[index].planned = !isPlanned
    groceryList.value = clonedWithNewState
    const item = clonedWithNewState[index]
    const userId = useConfigStore().userId
    if (!clonedWithNewState) return
    localStorage.setItem('grocerylist', JSON.stringify(groceryList.value))
    try {
      const response = await fetch('/api/updateItem', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          entryId: userId,
          groceryItemId: item.id,
          name: item.name,
          planned: item.planned,
          quantity: item.quantity
        })
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Failed to update grocery item')
      }
    } catch (error) {
      console.error('Error updating grocery item:', error)
    }
  }
  const addNewItem = async (name: string) => {
    const clonedList = [...groceryList.value]
    const index = clonedList.findIndex((listItem) => listItem.name === name)
    if (name === undefined || name.length === 0) return
    if (index == -1) {
      try {
        const userId = useConfigStore().userId
        const response = await fetch('/api/createItem', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            entryId: userId,
            name: name,
          })
        })

        const data = await response.json()

        if (!response.ok) {
          throw new Error(data.message || 'Failed to update grocery item')
        }
      } catch (error) {
        console.error('Error updating grocery item:', error)
      }
      clonedList.push({
        name: name,
        planned: true,
        id: newGroceryItemId()
      })
    } else {
      try {
        const userId = useConfigStore().userId
        const response = await fetch('/api/updateItem', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            entryId: userId,
            groceryItemId: clonedList[index].id,
            name: name,
            planned: true,
            quantity: clonedList[index].quantity
          })
        })

        const data = await response.json()

        if (!response.ok) {
          throw new Error(data.message || 'Failed to update grocery item')
        }
      } catch (error) {
        console.error('Error updating grocery item:', error)
      }
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
  const checkSingleItem = async (element: ListItem) => {
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
    const item = groceryList.value[indexGrocerylist]
    const userId = useConfigStore().userId
    try {
      const response = await fetch('/api/updateItem', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          entryId: userId,
          groceryItemId: item.id,
          name: item.name,
          planned: item.planned,
          quantity: item.quantity
        })
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Failed to update grocery item')
      }

      console.log('Grocery item updated:', data)
    } catch (error) {
      console.error('Error updating grocery item:', error)
    }
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
    if (!clonedWithNewState) return
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
