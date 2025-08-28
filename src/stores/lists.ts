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
    const userId = useConfigStore().userId
    if (!userId) localStorage.setItem('grocerylist', JSON.stringify(groceryList.value))
  }
  const setMealPlan = (newPlan: Meal[]) => {
    if (!newPlan) return
    mealPlan.value = newPlan
    localStorage.setItem('mealPlan', JSON.stringify(mealPlan.value))
  }
  const setItemPlanned = async (item: ListItem) => {
    const clonedWithNewState: ListItem[] = [...groceryList.value]
    const userId = useConfigStore().userId

    if (!clonedWithNewState) return
    if (userId) {
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
            planned: !item.planned,
            quantity: item.quantity
          })
        })

        const data = await response.json()
        if (data.updatedList?.data?.groceryList) setGroceryList(data.updatedList.data.groceryList)
      } catch (error) {
        console.error('Error updating grocery item:', error)
      }
    } else {
      const isPlanned = item.planned
      const index = clonedWithNewState.findIndex((entry) => entry.name === item.name) ?? 0
      if (clonedWithNewState[index]) clonedWithNewState[index].planned = !isPlanned
      groceryList.value = clonedWithNewState
      localStorage.setItem('grocerylist', JSON.stringify(groceryList.value))
    }
    await Promise.resolve()
  }
  const addNewItem = async (name: string) => {
    const clonedList = [...groceryList.value]
    const index = clonedList.findIndex((listItem) => listItem.name === name)
    if (name === undefined || name.length === 0) return
    const userId = useConfigStore().userId
    if (userId) {
      if (index === -1) {
        try {
          const response = await fetch('/api/createItem', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              entryId: userId,
              name: name
            })
          })

          const data = await response.json()
          if (data.updatedList?.data?.groceryList) setGroceryList(data.updatedList.data.groceryList)
        } catch (error) {
          console.error('Error updating grocery item:', error)
        }
      } else {
        try {
          const response = await fetch('/api/updateItem', {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              entryId: userId,
              groceryItemId: clonedList[index]!.id,
              name: name,
              planned: true,
              quantity: clonedList[index]!.quantity
            })
          })

          const data = await response.json()
          if (data.updatedList?.data?.groceryList) setGroceryList(data.updatedList.data.groceryList)
        } catch (error) {
          console.error('Error updating grocery item:', error)
        }
      }
    } else {
      if (index === -1) {
        clonedList.push({
          name: name,
          planned: true,
          id: newGroceryItemId()
        })
      } else clonedList[index]!.planned = true
      groceryList.value = clonedList
      localStorage.setItem('grocerylist', JSON.stringify(groceryList.value))
    }
  }
  const deleteSingleItem = async (element: ListItem) => {
    const userId = useConfigStore().userId
    if (userId) {
      try {
        const response = await fetch('/api/deleteItem', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ entryId: userId, groceryItemId: element.id })
        })

        const result = await response.json()
        if (result.updatedList?.data?.groceryList) setGroceryList(result.updatedList.data.groceryList)
      } catch (error: any) {
        console.error('Error deleting grocery item:', error.message)
      }
    } else {
      const index = groceryList.value
        .map(function (entry) {
          return entry.name
        })
        .indexOf(element.name)
      groceryList.value.splice(index, 1)
      localStorage.setItem('grocerylist', JSON.stringify(groceryList.value))
    }
  }
  const checkSingleItem = async (element: ListItem) => {
    const userId = useConfigStore().userId
    if (userId) {
      try {
        const response = await fetch('/api/updateItem', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            entryId: userId,
            groceryItemId: element.id,
            name: element.name,
            planned: !element.planned,
            quantity: element.quantity
          })
        })

        const data = await response.json()
        if (data.updatedList?.data?.groceryList) setGroceryList(data.updatedList.data.groceryList)
      } catch (error) {
        console.error('Error updating grocery item:', error)
      }
    } else {
      const indexGroceryList = groceryList.value
        .map(function (element: ListItem) {
          return element.name
        })
        .indexOf(element.name)
      if (groceryList.value[indexGroceryList]) {
        groceryList.value[indexGroceryList].planned = false
        groceryList.value[indexGroceryList].quantity = ''
      }
      localStorage.setItem('grocerylist', JSON.stringify(groceryList.value))
    }
  }
  const addNewMeal = async (payload: Meal) => {
    const index = mealPlan.value.findIndex((listItem) => listItem.name === payload.name)
    const clonedList = [...mealPlan.value]

    if (!payload) return

    const { name, ingredients, recipe } = payload
    const userId = useConfigStore().userId
    if (userId) {
      if (index === -1) {
        try {
          const response = await fetch('/api/createMeal', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              entryId: userId,
              name,
              planned: true,
              ingredients: ingredients,
              recipe
            })
          })

          const data = await response.json()
          if (data.updatedList?.data?.mealPlan) setMealPlan(data.updatedList.data.mealPlan)
        } catch (error) {
          console.error('Error updating meal:', error)
        }
      } else {
        try {
          const response = await fetch('/api/updateMeal', {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              entryId: userId,
              id: clonedList[index]!.id,
              name: name,
              planned: !clonedList[index]!.planned,
              ingredients: clonedList[index]!.ingredients ?? [],
              recipe: clonedList[index]!.recipe ?? ''
            })
          })

          const data = await response.json()
          if (data.updatedList?.data?.groceryList) setGroceryList(data.updatedList.data.groceryList)
        } catch (error) {
          console.error('Error updating grocery item:', error)
        }
      }
    } else {
      if (index === -1) {
        clonedList.push({
          name: payload.name,
          planned: true,
          id: newMealId(),
          ingredients: payload.ingredients,
          recipe: payload.recipe
        })
      } else clonedList[index]!.planned = true
      mealPlan.value = clonedList
      localStorage.setItem('mealPlan', JSON.stringify(mealPlan.value))
    }
  }
  const setMealPlanned = async (meal: Meal) => {
    const userId = useConfigStore().userId
    if (userId) {
      try {
        const { id, name, planned, ingredients, recipe } = meal
        const response = await fetch('/api/updateMeal', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            entryId: userId,
            id,
            name,
            planned: !planned,
            ingredients: ingredients,
            recipe
          })
        })

        const data = await response.json()

        if (data.updatedList?.data?.mealPlan) setMealPlan(data.updatedList.data.mealPlan)
      } catch (error) {
        console.error('Error updating grocery item:', error)
      }
    } else {
      const clonedWithNewState = [...mealPlan.value]
      const indexInMealPlan = mealPlan.value
        .map(function (element: Meal) {
          return element.name
        })
        .indexOf(meal.name)

      if (!clonedWithNewState[indexInMealPlan]) return

      const isPlanned = clonedWithNewState[indexInMealPlan].planned
      clonedWithNewState[indexInMealPlan].planned = !isPlanned
      localStorage.setItem('mealPlan', JSON.stringify(mealPlan.value))
    }
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
        entriesByFirstLetter[index]!.push(item)
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
        entriesByFirstLetter[index]!.push(item)
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
