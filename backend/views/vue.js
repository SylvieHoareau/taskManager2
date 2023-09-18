// cela fonctionne en Node.js sur le serveur.
import { createSSRApp } from 'vue'
// L'API de rendu de serveur de Vue est exposée sous `vue/server-renderer`.
import { renderToString } from 'vue/server-renderer'

const app = createSSRApp({
  data: () => ({ count: 1 }),
  template: `<button @click="count++">{{ count }}</button>`
})

renderToString(app).then((html) => {
  console.log(html)
})