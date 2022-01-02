import {
    addRoute,
    updateRoute,
    getAllRoutes,
    getRouteById,
    addCustomer,
    updateCustomer,
    getAllCustomers,
    getCustomerById,
  } from '../firebase/client';
  export const ROUTE_GET = 'ROUTE_GET';
  export const ROUTE_SET = 'ROUTE_SET';
  export const ROUTE_UPDATE = 'ROUTE_UPDATE';
  export const ROUTE_GET_ALL = 'ROUTE_GET_ALL';
  export const ROUTE_SET_ALL = 'ROUTE_SET_ALL';
  export const CUSTOMER_GET = 'CUSTOMER_GET';
  export const CUSTOMER_SET = 'CUSTOMER_SET';
  export const CUSTOMER_UPDATE = 'CUSTOMER_UPDATE';
  export const CUSTOMER_GET_ALL = 'CUSTOMER_GET_ALL';
  export const CUSTOMER_SET_ALL = 'CUSTOMER_SET_ALL';
  
  export default {
    state: {
      route: null,
      routes: [],
      customer: null,
      customers: [],
    },
    mutations: {
      [ROUTE_SET_ALL]: (state, data) => {
        state.routes = data;
      },
      [ROUTE_SET]: (state, data) => {
        if (data.isPush) {
          state.routes.unshift(data.route);
        } else {
          state.route = data.route;
        }
      },
      [ROUTE_UPDATE]: (state, data) => {
        if (data.route) {
          const index = state.routes.findIndex((p) => p.id == data.route.id);
          if (index != -1) {
            state.routes.splice(index, 1, data.route);
          }
        }
      },
      [CUSTOMER_SET_ALL]: (state, data) => {
        state.customers = data;
      },
      [CUSTOMER_SET]: (state, data) => {
        if (data.isPush) {
          state.customers.unshift(data.customer);
        } else {
          state.customer = data.customer;
        }
      },
      [CUSTOMER_UPDATE]: (state, data) => {
        if (data.customer) {
          const index = state.customers.findIndex((p) => p.id == data.customer.id);
          if (index != -1) {
            state.customers.splice(index, 1, data.customer);
          }
        }
      },
    },
    actions: {
      [ROUTE_SET]: ({ commit }, data) => {
        return new Promise((resolve, reject) => {
          addRoute(data)
            .then((response) => {
              console.log('route create', response);
              commit(ROUTE_SET, { route: data,isPush:true });
              resolve();
            })
            .catch((error) => {
              reject(error);
            });
        });
      },
      [ROUTE_GET_ALL]: ({ commit }) => {
        return new Promise((resolve, reject) => {
          getAllRoutes()
            .then((response) => {
              const dataResponse = [];
              response.forEach((doc) => {
                const data = doc.data();
                data.id = doc.id;
                dataResponse.push(data);
              });
              commit(ROUTE_SET_ALL, dataResponse);
              resolve(dataResponse);
            })
            .catch((error) => {
              reject(error);
            });
        });
      },
      [ROUTE_GET]: ({ commit }, id) => {
        return new Promise((resolve, reject) => {
          getRouteById(id)
            .then((response) => {
              const data = response.data();
              data.id = response.id;
              commit(ROUTE_SET, data);
              resolve(data);
            })
            .catch((error) => {
              reject(error);
            });
        });
      },
      [ROUTE_UPDATE]: ({ commit }, data) => {
        return new Promise((resolve, reject) => {
          updateRoute(data)
            .then((response) => {
              console.log('Update route', response);
              commit(ROUTE_UPDATE, { route: data });
              resolve(data);
            })
            .catch((error) => {
              reject(error);
            });
        });
      },
      [CUSTOMER_SET]: ({ commit }, data) => {
        return new Promise((resolve, reject) => {
          addCustomer(data)
            .then((response) => {
              console.log('customer create', response);
              commit(CUSTOMER_SET, { customer: data,isPush:true });
              resolve(data);
            })
            .catch((error) => {
              reject(error);
            });
        });
      },
      [CUSTOMER_GET_ALL]: ({ commit }) => {
        return new Promise((resolve, reject) => {
          getAllCustomers()
            .then((response) => {
              const dataResponse = [];
              response.forEach((doc) => {
                const data = doc.data();
                data.id = doc.id;
                dataResponse.push(data);
              });
              commit(CUSTOMER_SET_ALL, dataResponse);
              resolve(dataResponse);
            })
            .catch((error) => {
              reject(error);
            });
        });
      },
      [CUSTOMER_GET]: ({ commit }, id) => {
        return new Promise((resolve, reject) => {
          getCustomerById(id)
            .then((response) => {
              const data = response.data();
              data.id = response.id;
              commit(CUSTOMER_SET, data);
              resolve(data);
            })
            .catch((error) => {
              reject(error);
            });
        });
      },
      [CUSTOMER_UPDATE]: ({ commit }, data) => {
        return new Promise((resolve, reject) => {
          updateCustomer(data)
            .then((response) => {
              console.log('Update customer', response);
              commit(CUSTOMER_UPDATE, { customer: data });
              resolve(data);
            })
            .catch((error) => {
              reject(error);
            });
        });
      },
    },
    getters: {
      route: (state) => state.route,
      routes: (state) => state.routes,
      customer: (state) => state.customer,
      customers: (state) => state.customers
    },
  };
  