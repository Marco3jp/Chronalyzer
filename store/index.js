export const state = () => ({
  baseLength: 1000,
  windowRatio: 1.0, // width / height
  isPortrait: false,
});

export const mutations = {
  setBaseLength(state, length) {
    state.baseLength = length;
  },
  setIsPortrait(state, value) {
    state.isPortrait = value;
  },
  setWindowRatio(state, ratio) {
    state.windowRatio = ratio;
  }
};
