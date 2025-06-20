import './assets/main.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createI18n } from 'vue-i18n'
import { createRouter, createWebHistory } from 'vue-router'

import App from './App.vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import Vue3Toastify, { type ToastContainerOptions } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

const router = createRouter({
  history: createWebHistory(''),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: App
    }
  ]
})

const i18n = createI18n({
  locale: 'en',
  fallbackLocale: 'en',
  messages: {
    de: {
      mealPlan: 'Speiseplan',
      groceryList: 'Einkaufsliste',
      cookbook: 'Kochbuch',
      itemList: 'Artikelliste',
      randomRecipe: 'Zufälliges Rezept',
      noMeals: 'Füge neue Speisen hinzu oder wähle eine aus deinem Kochbuch',
      noItems: 'Füge neue Artikel hinzu oder wähle aus deiner Artikelliste',
      mealsPlanned: 'Speise(n) geplant',
      itemsLeft: 'Artikel verbleibend',
      category: 'Kategorie',
      area: 'Region',
      quantity: 'Wie viel von {item} wird benötigt?',
      buttons: {
        addMeal: 'Speise hinzufügen',
        deleteAll: 'Alle löschen',
        delete: 'Löschen',
        close: 'Schließen',
        openRecipe: 'Rezept öffnen',
        addToCookbook: 'Zum Kochbuch hinzufügen',
        loadNewRecipe: 'Neues Rezept laden',
        instructions: 'Anleitung',
        ingredients: 'Zutaten',
        copyPlan: 'Plan kopieren',
        copyList: 'Liste kopieren',
        cancel: 'Abbrechen',
        submitAndClose: 'Bestätigen',
        logout: 'Abmelden'
      },
      toasts: {
        copiedListToClipboard: 'Liste in Zwischenablage kopiert',
        copiedLinkToClipboard: 'Link in Zwischenablage kopiert',
        savedRandomRecipe: '{recipe} zum Kochbuch hinzugefügt',
        itemListDeleted: 'Artikelliste wurde gelöscht',
        cookbookDeleted: 'Kochbuch wurde gelöscht',
        confirmDeleteList: 'Soll die Artikelliste wirklich gelöscht werden?',
        confirmDeleteCookbook: 'Soll das Kochbuch wirklich gelöscht werden?',
        entryDeleted: '{entry} wurde gelöscht',
      },
      placeholders: {
        addArticle: 'Artikel hinzufügen - trennbar durch Komma oder Zeilenumbruch',
        addMeal: 'Neue Speise hinzufügen',
        addRecipeLink: 'Rezept Link hinzufügen (optional)',
        addIngredient: 'Zutat hinzufügen (optional)',
        addQuantity: 'Menge hinzufügen (z.B. 5x, 1kg oder 250ml)'
      },
      about: {
        title: 'About',
        intro:
          'Der Vue Meal Planner ist eine Single Page Application, die ich in Vue JS umgesetzt habe. Die Applikation kombiniert Einkaufsliste und Speiseplan.',
        featuresIncluded: 'Beinhaltete Features:',
        feature1:
          'Hinzufügen/Entfernen von Gerichten aus eigenem Kochbuch (gespeichert im Local Storage) zum Speiseplan',
        feature2: 'Hinzufügen von Zutaten zu einem Gericht',
        feature3: 'Einkaufsliste erstellen',
        feature4: 'Hinzufügen neuer Artikel zur Artikelliste',
        feature5: 'Artikelquantität angeben',
        feature6: 'Hinzufügen von Zutaten zur Einkaufsliste direkt aus der geplanten Speise',
        feature7:
          'Anzeigen zufälliger Rezepte (gefetched von API), die direkt dem Kochbuch hinzugefügt werden können',
        feature8: 'Installierbar als Progressive Web App',
        feature9: 'Konami Code 😉',
        githubLink: ' Vue Mealplanner auf '
      },
      userModal: {
        headline: 'Online Liste erstellen',
        intro:
          'Erstelle eine Online Liste, um mit anderen online gemeinsam eine Liste zu bearbeiten',
        generateNewId: 'Erstelle neue ID',
        placeholder: 'Suche nach einer ID',
        success: 'Neue ID erfolgreich generiert',
        or: 'oder',
        shareLink: 'Link zur Liste teilen',
        signedInAs: 'Angemeldet als: ',
        placeholderName: 'Wie soll dein User heißen?'
      },
      confirmDeleteMeal: 'Soll {meal} aus dem Kochbuch gelöscht werden?',
      confirmDeleteItem: 'Soll {item} von der Artikelliste gelöscht werden?',
    },
    en: {
      mealPlan: 'Meal Plan',
      groceryList: 'Grocery List',
      cookbook: 'Cookbook',
      itemList: 'Item List',
      randomRecipe: 'Random Recipe',
      noMeals: 'Add new meals or choose from your cookbook',
      noItems: 'Add new items or choose from your item list',
      mealsPlanned: 'Meal(s) planned',
      itemsLeft: 'Items remaining',
      category: 'Category',
      area: 'Area',
      quantity: 'How much of {item} is needed?',
      buttons: {
        addMeal: 'Add Meal',
        deleteAll: 'Delete All',
        delete: 'Delete',
        close: 'Close',
        openRecipe: 'Open Recipe',
        addToCookbook: 'Add to Cookbook',
        loadNewRecipe: 'Load New Recipe',
        instructions: 'Instructions',
        ingredients: 'Ingredients',
        copyPlan: 'Copy Plan',
        copyList: 'Copy List',
        cancel: 'Cancel',
        submitAndClose: 'Submit',
        logout: 'Logout'
      },
      toasts: {
        copiedListToClipboard: 'Copied list to clipboard',
        copiedLinkToClipboard: 'Copied link to clipboard',
        savedRandomRecipe: '{recipe} added to Cookbook',
        itemListDeleted: 'Item list deleted',
        cookbookDeleted: 'Cookbook deleted',
        confirmDeleteList: 'Are you sure you want to delete the item list?',
        confirmDeleteCookbook: 'Are you sure you want to delete the cookbook?',
        entryDeleted: '{entry} was deleted',
      },
      placeholders: {
        addArticle: 'Add article - separable by comma or line break',
        addMeal: 'Add new meal',
        addRecipeLink: 'Add recipe link (optional)',
        addIngredient: 'Add ingredient (optional)',
        addQuantity: 'Add quantity (e.g. 5x, 1kg or 250ml)'
      },
      about: {
        title: 'About',
        intro:
          'The Vue Meal Planner is a single page application I created in Vue JS. The application combines a grocery list and a meal plan.',
        featuresIncluded: 'Included features:',
        feature1:
          'Add/Remove dishes from your own cookbook (saved in local storage) to the meal plan',
        feature2: 'Add ingredients to a dish',
        feature3: 'Create grocery list',
        feature4: 'Add new items to item list',
        feature5: 'Specify item quantity',
        feature6: 'Add ingredients to the grocery list directly from the planned meal',
        feature7:
          'Display random recipes (fetched from API) that can be directly added to the cookbook',
        feature8: 'Installable as a Progressive Web App',
        feature9: 'Konami Code',
        githubLink: ' Vue Mealplanner on '
      },
      userModal: {
        headline: 'Create online list',
        intro: 'Create an online list and collaborate with other users',
        generateNewId: 'Create new ID',
        placeholder: 'Search for an ID',
        success: 'Create new ID',
        or: 'or',
        shareLink: 'Share link to your list',
        signedInAs: 'Signed in as: ',
        placeholderName: 'What should your username be?'
      },
      confirmDeleteMeal: 'Do you want to delete {meal} from your cookbook?',
      confirmDeleteItem: 'Do you want to delete {item} from your item list?',
    }
  }
})
const app = createApp(App)
library.add(fas)
app.component('font-awesome-icon', FontAwesomeIcon)
app.use(createPinia())
app.use(i18n)
app.use(router)
app.use(Vue3Toastify, {
  autoClose: 3000
} as ToastContainerOptions)

app.mount('#app')
