import { createStore } from 'vuex'
import state from './state'
import actions from './actions'
import mutations from './mutations'
import createPersistedstate from 'vuex-persistedstate'

export default createStore({
	state,
	mutations,
	actions,
	modules: {},
	plugins: [
		createPersistedstate()
	]
})