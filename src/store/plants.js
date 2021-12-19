import { getAllPlants, addPlant, updatePlant } from '../firebase/client';
export const PLANT_GET_ALL = 'PLANT_GET_ALL';
export const PLANT_SET_ALL = 'PLANT_SET_ALL';
export const PLANT_SET = 'PLANT_SET';
export const PLANT_UPDATE = 'PLANT_UPDATE';

export default {
  state: {
    plant: null,
    plants: [],
  },
  mutations: {
    [PLANT_SET_ALL]: (state, data) => {
      state.plants = data;
    },
    [PLANT_SET]: (state, data) => {
      if (data.isPush) {
        state.plants.unshift(data.plant);
      } else {
        state.plant = data.plant;
      }
    },
    [PLANT_UPDATE]: (state, data) => {
      if (data.plant) {
        const index = state.plants.findIndex((p) => p.id == data.plant.id);
        if (index != -1) {
          state.plants.splice(index, 1, data.plant);
        }
      }
    },
  },
  actions: {
    [PLANT_GET_ALL]: ({ commit }) => {
      return new Promise((resolve, reject) => {
        getAllPlants()
          .then((response) => {
            const dataResponse = [];
            response.forEach((doc) => {
              const data = doc.data();
              data.id = doc.id;
              dataResponse.push(data);
            });
            commit(PLANT_SET_ALL, dataResponse);
            resolve();
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    [PLANT_SET]: ({ commit }, data) => {
      return new Promise((resolve, reject) => {
        addPlant(data)
          .then((response) => {
            console.log('create plant', response);
            commit(PLANT_SET, { plant: data, isPush: true });
            resolve();
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    [PLANT_UPDATE]: ({ commit }, data) => {
      return new Promise((resolve, reject) => {
        updatePlant(data)
          .then((response) => {
            console.log('Update plant', response);
            commit(PLANT_UPDATE, { plant: data });
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
