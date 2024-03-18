export default {
  addTestId(state, payload) {
    state.testId = payload;
  },

  addProductId(state, payload) {
    state.productId = payload;
  },

  addUtid(state, payload) {
    state.utid = payload;
  },

  addCurTestNum(state, payload) {
    state.curTestNum = payload;
  },

  addTitle(state, payload) {
    state.title = payload;
  },

  addReportId(state, payload) {
    state.reportId = payload;
  },
  addType(state, type) {
    state.curType = type;
  },
  adduserType(state, type) {
    state.userType = type;
  },
  addShowMenuHolder(state, payload) {
    state.showMenuHolder = payload;
  },
  addTestCount(state, payload) {
    state.testCount = payload;
  },
  addTimes(state, payload) {
    state.times = payload;
  },
};
