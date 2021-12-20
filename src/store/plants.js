import {
  getAllPlants,
  addPlant,
  updatePlant,
  addBalance,
  getAllBalances,
  getBalanceById,
  updateBalance
} from '../firebase/client';
export const PLANT_GET_ALL = 'PLANT_GET_ALL';
export const PLANT_SET_ALL = 'PLANT_SET_ALL';
export const PLANT_SET = 'PLANT_SET';
export const PLANT_UPDATE = 'PLANT_UPDATE';
export const BALANCE_GET = 'BALANCE_GET';
export const BALANCE_SET = 'BALANCE_SET';
export const BALANCE_UPDATE = 'BALANCE_UPDATE';
export const BALANCE_GET_ALL = 'BALANCE_GET_ALL';
export const BALANCE_SET_ALL = 'BALANCE_SET_ALL';

export default {
  state: {
    plant: null,
    plants: [],
    balance: null,
    balances: [],
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
    [BALANCE_SET]: (state, data) => {
      state.balance = data.balance;
    },
    [BALANCE_SET_ALL]: (state, data) => {
      state.balances = data;
    },
    [BALANCE_UPDATE]: (state, data) => {
      if (data.balance) {
        const index = state.balances.findIndex((p) => p.id == data.balance.id);
        if (index != -1) {
          state.balances.splice(index, 1, data.balance);
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
    [BALANCE_SET]: ({ commit }, data) => {
      return new Promise((resolve, reject) => {
        addBalance(data)
          .then((response) => {
            console.log('balance create', response);
            commit(BALANCE_SET, { balance: data });
            resolve();
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    [BALANCE_GET_ALL]: ({ commit }) => {
      return new Promise((resolve, reject) => {
        getAllBalances()
          .then((response) => {
            const dataResponse = [];
            response.forEach((doc) => {
              const data = doc.data();
              data.id = doc.id;
              dataResponse.push(data);
            });
            commit(BALANCE_SET_ALL, dataResponse);
            resolve(dataResponse);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    [BALANCE_GET]: ({ commit },id) => {
      return new Promise((resolve, reject) => {
        getBalanceById(id)
          .then((response) => {
            const data = response.data();
            data.id = response.id;
            commit(BALANCE_SET, data);
            resolve(data);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    [BALANCE_UPDATE]: ({ commit }, data) => {
      return new Promise((resolve, reject) => {
        updateBalance(data)
          .then((response) => {
            console.log('Update balance', response);
            commit(BALANCE_UPDATE, { balance: data });
            resolve(data);
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
    balance: (state) => state.plant,
    balances: (state) => state.balances,
  },
};
