const JOKE_API_URL =
  'https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist,explicit';

export const MODULE_NAME = 'jokes';

const SET_JOKE = 'setJoke';

// --------------- JOKE STORE

const jokeStore = {
  namespaced: true,
  state: () => ({
    joke: '',
    jokeComponent: null,
  }),
  mutations: {
    [SET_JOKE](state, joke) {
      state.joke = joke ?? '';
    },
  },
};

async function fetchJoke() {
  try {
    if (!JOKE_API_URL) {
      throw new Error('Joke API url required');
    }

    const response = await fetch(JOKE_API_URL);

    if (!response.ok) {
      throw new Error('Bad network response');
    }

    const data = await response.json();

    const joke = 'joke' in data ? data.joke : `${data.setup} ${data.delivery}`;

    return joke;
  } catch (error) {
    console.error('There has been a problem with your fetch operation:', error);
    return '';
  }
}

export async function intializeJokeModule(store) {
  if (store.hasModule(MODULE_NAME)) {
    console.warn('Module already exists', store.state);
    return;
  }

  console.log('Registering module', {
    MODULE_NAME,
    jokeStore,
  });
  store.registerModule(MODULE_NAME, jokeStore);

  const joke = await fetchJoke();

  store.commit(`${MODULE_NAME}/${SET_JOKE}`, joke);
}
