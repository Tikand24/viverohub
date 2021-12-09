import { getAllPlants } from '../firebase/client';
export const PLANT_GET_ALL = 'PLANT_GET_ALL';
export const PLANT_SET_ALL = 'PLANT_SET_ALL';

export default {
  state: {
    plant: null,
    plants: [],
  },
  mutations: {
    [PLANT_SET_ALL]: (state, data) => {
      state.plants = data;
    },
  },
  actions: {
    [PLANT_GET_ALL]: ({ commit }) => {
      return new Promise((resolve, reject) => {
        getAllPlants()
          .then((response) => {
            response.forEach((doc) => {
              console.log(`Froechas ${doc.id} => ${doc.data()}`);
            });
            console.log('response', response);
            commit(PLANT_SET_ALL, response);
            resolve();
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
  },
  getters: {
    plant: (state) => state.plant,
    plants: (state) => state.plants,
  },
};
