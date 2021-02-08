import Vue from 'vue'
import App from './App.vue'
// Test import of a JavaScript function
import { example } from './js/example'

// Test import of an asset
import webpackLogo from './assets/webpack-logo.svg'

// Test import of styles
import './styles/index.scss'

// Appending to the DOM
const logo = document.createElement('img')
logo.src = webpackLogo

const heading = document.createElement('h1')
heading.textContent = example()

const app = document.querySelector('#root')
app.append(logo, heading)

//  Variabile globale compilata da webpack
console.log(TWO)

//  load vue app
Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  render: (h) => h(App),
}).$mount('#app')
