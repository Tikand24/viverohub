import { getAllPlants,addPlant } from '../firebase/client';
export const PLANT_GET_ALL = 'PLANT_GET_ALL';
export const PLANT_SET_ALL = 'PLANT_SET_ALL';
export const PLANT_SET = 'PLANT_SET';

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
      console.log('plantSet',data);
      if(data.isPush){
        state.plants.unshift(data.plant);
      }else{
        state.plant = data.plant;
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
              dataResponse.push(doc.data());
            });
            commit(PLANT_SET_ALL, dataResponse);
            resolve();
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    [PLANT_SET]: ({ commit },data) => {
      return new Promise((resolve, reject) => {
        addPlant(data)
          .then((response) => {
            console.log('responseAddPlant',response,data);
            commit(PLANT_SET, {plant:data,isPush:true});
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
