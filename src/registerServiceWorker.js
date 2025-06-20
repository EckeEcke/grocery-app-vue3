/* eslint-disable no-console */
import { registerSW } from 'virtual:pwa-register'

if (import.meta.env.PROD) {
  const updateSW = registerSW({
    onOfflineReady() {
      console.log(
        'App is being served from cache by a service worker.\n' +
        'For more details, visit https://goo.gl/AFskqB'
      )
      console.log('Content has been cached for offline use.')
    },

    onRegistered() {
      console.log('Service worker has been registered.')
    },

    onRegisterError(error) {
      console.error('Error during service worker registration:', error)
    },

    onNeedRefresh() {
      console.log('New content is available; please refresh.')
      const shouldUpdate = confirm('New content is available. Update now?')

      if (shouldUpdate) {
        updateSW()
      }
    },
  })

  window.addEventListener('offline', () => {
    console.log('No internet connection found. App is running in offline mode.')
  })
}
