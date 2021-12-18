import { getAllComplements } from '../firebase/client';
export const COMPLEMENT_GET_ALL = 'COMPLEMENT_GET_ALL';
export const COMPLEMENT_SET_ALL = 'COMPLEMENT_SET_ALL';

export default {
  state: {
    complements: {
        bags:[]
    },
  },
  mutations: {
    [COMPLEMENT_SET_ALL]: (state, bags) => {
      state.complements.bags = bags;
    },
  },
  actions: {
    [COMPLEMENT_GET_ALL]: ({ commit }) => {
      return new Promise((resolve, reject) => {
        getAllComplements()
          .then((response) => {
            let dataBags = [];
            response.forEach((doc) => {
                dataBags = doc.data().bags
            });
            commit(COMPLEMENT_SET_ALL, dataBags);
            resolve();
          })
          .catch((error) => {
            reject(error);
          });
      });
    }
  },
  getters: {
    complements: (state) => state.complements,
  },
};
