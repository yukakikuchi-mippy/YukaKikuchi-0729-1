//レクとほぼ変化なし

import Vue from 'vue'
import Vuex from 'vuex'
import quiz from './modules/quiz' // クイズモジュールをインポート

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    quiz // クイズモジュールを登録
  }
})
// import Vue from 'vue'
// import Vuex from 'vuex'

// Vue.use(Vuex)

// export default new Vuex.Store({
//   state: {
//   },
//   getters: {
//   },
//   mutations: {
//   },
//   actions: {
//   },
//   modules: {
//   }
// })
