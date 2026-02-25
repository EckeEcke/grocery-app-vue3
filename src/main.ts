import './assets/main.scss'
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
      path: '/:locale?',
      name: 'Home',
      component: App
    }
  ]
})

const i18n = createI18n({
  locale: 'de',
  fallbackLocale: 'de',
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
        ai: 'Rezept zum Kochbuch hinzugefügt'
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
        feature7: 'Anzeigen zufälliger Rezepte (gefetched von API), die direkt dem Kochbuch hinzugefügt werden können',
        feature8: 'Installierbar als Progressive Web App',
        feature9: 'Konami Code 😉',
        githubLink: ' Vue Mealplanner auf ',
        ai: 'KI Rezeptvorschläge (Google Gemini)'
      },
      userModal: {
        headline: 'Online Liste erstellen',
        intro: 'Erstelle eine Online Liste, um mit anderen online gemeinsam eine Liste zu bearbeiten',
        generateNewId: 'Erstelle neue ID',
        placeholder: 'Suche nach einer ID',
        success: 'Neue ID erfolgreich generiert',
        or: 'oder',
        shareLink: 'Link zur Liste teilen',
        signedInAs: 'Angemeldet als: ',
        placeholderName: 'Wie soll dein User heißen?'
      },
      ai: {
        title: 'KI Rezeptempfehlung',
        introTitle: 'Keine Idee, was du kochen sollst?',
        introText:
          'Lass dir Rezepte von der KI vorschlagen, basierend auf deinen gespeicherten Gerichten, deinem Ernährungstyp und deinem gewünschten Zeitaufwand.',
        dietLabel: 'Ernährung',
        timeLabel: 'Maximale Zeit',
        diets: {
          none: 'Allesesser',
          vegetarian: 'Vegetarisch',
          vegan: 'Vegan',
          lowcarb: 'Low Carb'
        },
        times: {
          m15: '15 Min.',
          m30: '30 Min.',
          m60: '1 Std.'
        },
        buttons: {
          submit: 'KI Rezeptidee bekommen',
          loading: 'KI generiert...',
          add: 'Zum Kochbuch hinzufügen',
          another: 'Anderes Rezept'
        }
      },
      confirmDeleteMeal: 'Soll {meal} aus dem Kochbuch gelöscht werden?',
      confirmDeleteItem: 'Soll {item} von der Artikelliste gelöscht werden?'
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
        ai: 'Recipe added to cookbook'
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
        feature1: 'Add/Remove dishes from your own cookbook (saved in local storage) to the meal plan',
        feature2: 'Add ingredients to a dish',
        feature3: 'Create grocery list',
        feature4: 'Add new items to item list',
        feature5: 'Specify item quantity',
        feature6: 'Add ingredients to the grocery list directly from the planned meal',
        feature7: 'Display random recipes (fetched from API) that can be directly added to the cookbook',
        feature8: 'Installable as a Progressive Web App',
        feature9: 'Konami Code',
        githubLink: ' Vue Mealplanner on ',
        ai: 'AI Recipe Suggestions (Google Gemini)'
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
      ai: {
        title: 'AI Recipe Recommendation',
        introTitle: 'No idea what to cook?',
        introText: 'Let the AI suggest recipes based on your saved dishes, diet type, and preferred time.',
        dietLabel: 'Diet',
        timeLabel: 'Maximum time',
        diets: {
          none: 'Omnivore',
          vegetarian: 'Vegetarian',
          vegan: 'Vegan',
          lowcarb: 'Low Carb'
        },
        times: {
          m15: '15 min',
          m30: '30 min',
          m60: '1 hr'
        },
        buttons: {
          submit: 'Get AI recipe idea',
          loading: 'AI is generating...',
          add: 'Add to cookbook',
          another: 'Get another recipe'
        }
      },
      confirmDeleteMeal: 'Do you want to delete {meal} from your cookbook?',
      confirmDeleteItem: 'Do you want to delete {item} from your item list?'
    },
    es: {
      mealPlan: 'Plan de Comidas',
      groceryList: 'Lista de Compras',
      cookbook: 'Recetario',
      itemList: 'Lista de Artículos',
      randomRecipe: 'Receta Aleatoria',
      noMeals: 'Añade nuevas comidas o elige de tu recetario',
      noItems: 'Añade nuevos artículos o elige de tu lista de artículos',
      mealsPlanned: 'Comida(s) planeada(s)',
      itemsLeft: 'Artículos restantes',
      category: 'Categoría',
      area: 'Región',
      quantity: '¿Cuánto de {item} se necesita?',
      buttons: {
        addMeal: 'Añadir Comida',
        deleteAll: 'Eliminar Todo',
        delete: 'Eliminar',
        close: 'Cerrar',
        openRecipe: 'Abrir Receta',
        addToCookbook: 'Añadir al Recetario',
        loadNewRecipe: 'Cargar Nueva Receta',
        instructions: 'Instrucciones',
        ingredients: 'Ingredientes',
        copyPlan: 'Copiar Plan',
        copyList: 'Copiar Lista',
        cancel: 'Cancelar',
        submitAndClose: 'Enviar',
        logout: 'Cerrar Sesión'
      },
      toasts: {
        copiedListToClipboard: 'Lista copiada al portapapeles',
        copiedLinkToClipboard: 'Enlace copiado al portapapeles',
        savedRandomRecipe: '{recipe} añadida al Recetario',
        itemListDeleted: 'Lista de artículos eliminada',
        cookbookDeleted: 'Recetario eliminado',
        confirmDeleteList: '¿Estás seguro de que quieres eliminar la lista de artículos?',
        confirmDeleteCookbook: '¿Estás seguro de que quieres eliminar el recetario?',
        entryDeleted: '{entry} fue eliminado',
        ai: 'Receta añadida al libro de cocina'
      },
      placeholders: {
        addArticle: 'Añadir artículo - separable por coma o salto de línea',
        addMeal: 'Añadir nueva comida',
        addRecipeLink: 'Añadir enlace de receta (opcional)',
        addIngredient: 'Añadir ingrediente (opcional)',
        addQuantity: 'Añadir cantidad (ej. 5x, 1kg o 250ml)'
      },
      about: {
        title: 'About',
        intro:
          'Meal Planner es una aplicación de página única que creé en Vue JS. La aplicación combina una lista de compras y un plan de comidas.',
        featuresIncluded: 'Características incluidas:',
        feature1: 'Añadir/Eliminar platos de tu propio recetario (guardado en almacenamiento local) al plan de comidas',
        feature2: 'Añadir ingredientes a un plato',
        feature3: 'Crear lista de compras',
        feature4: 'Añadir nuevos artículos a la lista de artículos',
        feature5: 'Especificar cantidad de artículos',
        feature6: 'Añadir ingredientes a la lista de compras directamente desde la comida planeada',
        feature7: 'Mostrar recetas aleatorias (obtenidas de API) que pueden añadirse directamente al recetario',
        feature8: 'Instalable como una Aplicación Web Progresiva',
        feature9: 'Código Konami',
        githubLink: ' Meal Planner en ',
        ai: 'Sugerencias de recetas por IA (Google Gemini)'
      },
      userModal: {
        headline: 'Crear lista en línea',
        intro: 'Crea una lista en línea y colabora con otros usuarios',
        generateNewId: 'Crear nuevo ID',
        placeholder: 'Buscar un ID',
        success: 'Crear nuevo ID',
        or: 'o',
        shareLink: 'Compartir enlace a tu lista',
        signedInAs: 'Conectado como: ',
        placeholderName: '¿Cuál debería ser tu nombre de usuario?'
      },
      ai: {
        title: 'Recomendación de recetas por IA',
        introTitle: '¿No sabes qué cocinar?',
        introText:
          'Deja que la IA te sugiera recetas basadas en tus platos guardados, tu tipo de dieta y el tiempo deseado.',
        dietLabel: 'Dieta',
        timeLabel: 'Tiempo máximo',
        diets: {
          none: 'Omnívoro',
          vegetarian: 'Vegetariano',
          vegan: 'Vegano',
          lowcarb: 'Bajo en carbohidratos'
        },
        times: {
          m15: '15 min',
          m30: '30 min',
          m60: '1 h'
        },
        buttons: {
          submit: 'Obtener idea de receta por IA',
          loading: 'IA generando...',
          add: 'Añadir al libro de cocina',
          another: 'Otra receta'
        }
      },
      confirmDeleteMeal: '¿Quieres eliminar {meal} de tu recetario?',
      confirmDeleteItem: '¿Quieres eliminar {item} de tu lista de artículos?'
    },
    fr: {
      mealPlan: 'Plan de Repas',
      groceryList: 'Liste de Courses',
      cookbook: 'Livre de Recettes',
      itemList: "Liste d'Articles",
      randomRecipe: 'Recette Aléatoire',
      noMeals: 'Ajoutez de nouveaux repas ou choisissez dans votre livre de recettes',
      noItems: "Ajoutez de nouveaux articles ou choisissez dans votre liste d'articles",
      mealsPlanned: 'Repas planifié(s)',
      itemsLeft: 'Articles restants',
      category: 'Catégorie',
      area: 'Région',
      quantity: 'Quelle quantité de {item} est nécessaire ?',
      buttons: {
        addMeal: 'Ajouter un Repas',
        deleteAll: 'Tout Supprimer',
        delete: 'Supprimer',
        close: 'Fermer',
        openRecipe: 'Ouvrir la Recette',
        addToCookbook: 'Ajouter au Livre de Recettes',
        loadNewRecipe: 'Charger une Nouvelle Recette',
        instructions: 'Instructions',
        ingredients: 'Ingrédients',
        copyPlan: 'Copier le Plan',
        copyList: 'Copier la Liste',
        cancel: 'Annuler',
        submitAndClose: 'Soumettre',
        logout: 'Se Déconnecter'
      },
      toasts: {
        copiedListToClipboard: 'Liste copiée dans le presse-papiers',
        copiedLinkToClipboard: 'Lien copié dans le presse-papiers',
        savedRandomRecipe: '{recipe} ajoutée au Livre de Recettes',
        itemListDeleted: "Liste d'articles supprimée",
        cookbookDeleted: 'Livre de recettes supprimé',
        confirmDeleteList: "Êtes-vous sûr de vouloir supprimer la liste d'articles ?",
        confirmDeleteCookbook: 'Êtes-vous sûr de vouloir supprimer le livre de recettes ?',
        entryDeleted: '{entry} a été supprimé',
        ai: 'Receta añadida al libro de cocina'
      },
      placeholders: {
        addArticle: 'Ajouter un article - séparable par virgule ou saut de ligne',
        addMeal: 'Ajouter un nouveau repas',
        addRecipeLink: 'Ajouter un lien de recette (facultatif)',
        addIngredient: 'Ajouter un ingrédient (facultatif)',
        addQuantity: 'Ajouter une quantité (ex. 5x, 1kg ou 250ml)'
      },
      about: {
        title: 'À Propos',
        intro:
          "Meal Planner est une application à page unique que j'ai créée en Vue JS. L'application combine une liste de courses et un plan de repas.",
        featuresIncluded: 'Fonctionnalités incluses :',
        feature1:
          'Ajouter/Supprimer des plats de votre propre livre de recettes (sauvegardé en stockage local) au plan de repas',
        feature2: 'Ajouter des ingrédients à un plat',
        feature3: 'Créer une liste de courses',
        feature4: "Ajouter de nouveaux articles à la liste d'articles",
        feature5: "Spécifier la quantité d'articles",
        feature6: 'Ajouter des ingrédients à la liste de courses directement depuis le repas planifié',
        feature7:
          'Afficher des recettes aléatoires (obtenues via API) qui peuvent être directement ajoutées au livre de recettes',
        feature8: 'Installable comme une Application Web Progressive',
        feature9: 'Code Konami',
        githubLink: ' Meal Planner sur ',
        ai: 'Suggestions de recettes par IA (Google Gemini)'
      },
      userModal: {
        headline: 'Créer une liste en ligne',
        intro: "Créez une liste en ligne et collaborez avec d'autres utilisateurs",
        generateNewId: 'Créer un nouvel ID',
        placeholder: 'Rechercher un ID',
        success: 'Créer un nouvel ID',
        or: 'ou',
        shareLink: 'Partager le lien vers votre liste',
        signedInAs: 'Connecté en tant que : ',
        placeholderName: "Quel devrait être votre nom d'utilisateur ?"
      },
      ai: {
        title: 'Recommandation de recettes par IA',
        introTitle: 'Aucune idée de quoi cuisiner ?',
        introText:
          "Laissez l'IA vous suggérer des recettes basées sur vos plats enregistrés, votre régime alimentaire et le temps souhaité.",
        dietLabel: 'Régime alimentaire',
        timeLabel: 'Temps maximum',
        diets: {
          none: 'Omnivore',
          vegetarian: 'Végétarien',
          vegan: 'Végan',
          lowcarb: 'Faible en glucides'
        },
        times: {
          m15: '15 min',
          m30: '30 min',
          m60: '1 h'
        },
        buttons: {
          submit: 'Obtenir une idée de recette par IA',
          loading: "L'IA génère...",
          add: 'Ajouter au livre de cuisine',
          another: 'Autre recette'
        }
      },
      confirmDeleteMeal: 'Voulez-vous supprimer {meal} de votre livre de recettes ?',
      confirmDeleteItem: "Voulez-vous supprimer {item} de votre liste d'articles ?"
    },
    it: {
      mealPlan: 'Piano Pasti',
      groceryList: 'Lista della Spesa',
      cookbook: 'Ricettario',
      itemList: 'Elenco Articoli',
      randomRecipe: 'Ricetta Casuale',
      noMeals: 'Aggiungi nuovi pasti o scegli dal tuo ricettario',
      noItems: 'Aggiungi nuovi articoli o scegli dal tuo elenco articoli',
      mealsPlanned: 'Pasto/i pianificato/i',
      itemsLeft: 'Articoli rimanenti',
      category: 'Categoria',
      area: 'Regione',
      quantity: 'Quanta quantità di {item} è necessaria?',
      buttons: {
        addMeal: 'Aggiungi Pasto',
        deleteAll: 'Elimina Tutto',
        delete: 'Elimina',
        close: 'Chiudi',
        openRecipe: 'Apri Ricetta',
        addToCookbook: 'Aggiungi al Ricettario',
        loadNewRecipe: 'Carica Nuova Ricetta',
        instructions: 'Istruzioni',
        ingredients: 'Ingredienti',
        copyPlan: 'Copia Piano',
        copyList: 'Copia Lista',
        cancel: 'Annulla',
        submitAndClose: 'Invia',
        logout: 'Disconnetti'
      },
      toasts: {
        copiedListToClipboard: 'Lista copiata negli appunti',
        copiedLinkToClipboard: 'Link copiato negli appunti',
        savedRandomRecipe: '{recipe} aggiunta al Ricettario',
        itemListDeleted: 'Elenco articoli eliminato',
        cookbookDeleted: 'Ricettario eliminato',
        confirmDeleteList: "Sei sicuro di voler eliminare l'elenco articoli?",
        confirmDeleteCookbook: 'Sei sicuro di voler eliminare il ricettario?',
        entryDeleted: '{entry} è stato eliminato',
        ai: 'Recette ajoutée au livre de cuisine'
      },
      placeholders: {
        addArticle: 'Aggiungi articolo - separabile con virgola o a capo',
        addMeal: 'Aggiungi nuovo pasto',
        addRecipeLink: 'Aggiungi link alla ricetta (opzionale)',
        addIngredient: 'Aggiungi ingrediente (opzionale)',
        addQuantity: 'Aggiungi quantità (es. 5x, 1kg o 250ml)'
      },
      about: {
        title: 'Informazioni',
        intro:
          "Meal Planner è un'applicazione a pagina singola che ho creato in Vue JS. L'applicazione combina una lista della spesa e un piano pasti.",
        featuresIncluded: 'Funzionalità incluse:',
        feature1: 'Aggiungere/Rimuovere piatti dal tuo ricettario personale (salvato in memoria locale) al piano pasti',
        feature2: 'Aggiungere ingredienti a un piatto',
        feature3: 'Creare lista della spesa',
        feature4: "Aggiungere nuovi articoli all'elenco articoli",
        feature5: 'Specificare la quantità degli articoli',
        feature6: 'Aggiungere ingredienti alla lista della spesa direttamente dal pasto pianificato',
        feature7:
          'Visualizzare ricette casuali (recuperate tramite API) che possono essere aggiunte direttamente al ricettario',
        feature8: 'Installabile come App Web Progressiva',
        feature9: 'Codice Konami',
        githubLink: ' Meal Planner su ',
        ai: 'Suggerimenti ricette IA (Google Gemini)'
      },
      userModal: {
        headline: 'Crea lista online',
        intro: 'Crea una lista online e collabora con altri utenti',
        generateNewId: 'Crea nuovo ID',
        placeholder: 'Cerca un ID',
        success: 'Crea nuovo ID',
        or: 'oppure',
        shareLink: 'Condividi link alla tua lista',
        signedInAs: 'Accesso effettuato come: ',
        placeholderName: 'Quale dovrebbe essere il tuo nome utente?'
      },
      ai: {
        title: 'Suggerimento ricette IA',
        introTitle: 'Non sai cosa cucinare?',
        introText:
          "Lascia che l'IA ti suggerisca ricette in base ai tuoi piatti salvati, al tuo tipo di dieta e al tempo desiderato.",
        dietLabel: 'Dieta',
        timeLabel: 'Tempo massimo',
        diets: {
          none: 'Onnivoro',
          vegetarian: 'Vegetariano',
          vegan: 'Vegano',
          lowcarb: 'Low Carb'
        },
        times: {
          m15: '15 min',
          m30: '30 min',
          m60: '1 ora'
        },
        buttons: {
          submit: 'Ottieni idea ricetta IA',
          loading: 'IA in generazione...',
          add: 'Aggiungi al ricettario',
          another: "Un'altra ricetta"
        }
      },
      confirmDeleteMeal: 'Vuoi eliminare {meal} dal tuo ricettario?',
      confirmDeleteItem: 'Vuoi eliminare {item} dal tuo elenco articoli?'
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
