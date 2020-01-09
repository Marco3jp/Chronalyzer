export const state = () => ({
  list: [],
});

export const mutations = {
  push(state, list) {
    if (Array.isArray(list)) {
      state.list.push(...list)
    } else {
      state.list.push(list);
    }
  },
};
