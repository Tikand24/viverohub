import { getAllComplements } from '../firebase/client';
export const COMPLEMENT_GET_ALL = 'COMPLEMENT_GET_ALL';
export const COMPLEMENT_SET_ALL = 'COMPLEMENT_SET_ALL';

export default {
  state: {
    complements: {
        bags:[],
        expenseTypes:[]
    },
  },
  mutations: {
    [COMPLEMENT_SET_ALL]: (state, complement) => {
      state.complements.bags = complement.bags;
      state.complements.expenseTypes = complement.expenseTypes;
    },
  },
  actions: {
    [COMPLEMENT_GET_ALL]: ({ commit }) => {
      return new Promise((resolve, reject) => {
        getAllComplements()
          .then((response) => {
            const complementsData = {
              bags:[],
              expenseType:[]
            };
            response.forEach((doc) => {
              complementsData.bags = doc.data().bags;
              complementsData.expenseTypes = doc.data().expenseType;
            });
            commit(COMPLEMENT_SET_ALL, complementsData);
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
