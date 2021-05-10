import { getReadingSetting, setReadingSetting } from '@/utils/reading-setting'
const getDefaultState = () => {
  return {
    readStyleId: '1',
    fontSize: 16,
    fontFamily: 'microsoft yahei'
  }
}

const state = getReadingSetting() ? getReadingSetting() : getDefaultState()

const mutations = {
  SET_READINGSETTING: (state, data) => {
    state.readStyleId = data.readStyleId
    state.fontSize = data.fontSize
    state.fontFamily = data.fontFamily
    setReadingSetting(data)
  }
}

export default {
  namespaced: true,
  state,
  mutations
}
