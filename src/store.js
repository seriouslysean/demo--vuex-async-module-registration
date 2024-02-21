import { createStore } from 'vuex';

const state = () => ({
  count: 0,
});

const actions = {};

const mutations = {
  increment(state) {
    state.count++;
  },
};

export const initStore = (app) => {
  // Create a new store instance.
  const store = createStore({
    state,
    actions,
    mutations,
  });

  // Add to Vue
  app.use(store);

  return store;
};
