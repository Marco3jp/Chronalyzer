export const state = () => ({
  list: [], // 新しいものが先頭にくる、古いものを参照しようとシークするとindexが増えていく形
});

export const mutations = {
  unshift(state, list) {
    if (Array.isArray(list)) {
      state.list.unshift(...list)
    } else {
      state.list.unshift(list);
    }
  },
};

export const getters = {
  latestRecord(state) {
    if (state.list.length > 0) {
      return state.list[0]
    } else {
      return undefined;
    }
  }
};
