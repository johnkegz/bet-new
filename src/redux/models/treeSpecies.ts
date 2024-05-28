import api from '../api';
import { createModel } from '@rematch/core';

const { getRequest } = api;


interface stateType {
  treeSpeciesList: Array<{}>;
}

interface errorType {
  message?: string;
  response?: {
    data?: {
      message?: "";
      statusCode?: any;
    }
  };
}

const treeSpecies = createModel<any>()({
  state: {
    treeSpeciesList: [],
  },
  reducers: {
    setTreeSpeciesList(state: stateType, payload: any) {
      return {
        ...state,
        treeSpeciesList: payload
      };
    },
  },
  effects: (dispatch) => ({
    async fetchTreeSpeciesList() {
      await getRequest('tree-species')
        .then((res) => {
          dispatch.treeSpecies.setTreeSpeciesList(res.data);
        })
        .catch((err: errorType) => {
          console.log(err);
        })
    },
  })
})

export default treeSpecies;
