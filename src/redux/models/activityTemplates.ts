import api from '../api';
import { createModel } from '@rematch/core'

const { getRequest, createRequest, patchRequest } = api;

interface stateType {
  activityTemplates: {};
  activityTemplate: {};
  filteredActivityTemplates: Array<{}>;
  isFetching: boolean;
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

const activityTemplates = createModel<any>()({
  state: {
    activityTemplates: {},
    activityTemplate: {},
    filteredActivityTemplates: [],
    isFetching: false,
  },
  reducers: {
    getActivityTemplates(state: stateType, payload: any) {
      return {
        ...state,
        activityTemplates: payload
      };
    },
    singleActivityTemplate(state: stateType, payload: any) {
      return {
        ...state,
        activityTemplate: payload
      };
    },
    getFilteredActivityTemplates(state: stateType, payload: any) {
        return {
            ...state,
            filteredActivityTemplates: payload.rows,
            activityTemplates: payload,
            isFetching: false
        };
    },
     setIsFetching(state: stateType, payload: any) {
        return {
            ...state,
            isFetching: payload
        };
    },
  },
  effects: (dispatch) => ({
    // getAllActivityTemplates: async (data: any) => {
    //    await getRequest('activityTemplates')
    //     .then((res) => {
    //       dispatch.activityTemplate.getActivityTemplates(res.data.rows);
    //       data.onSuccess && data.onSuccess(res.data.rows);
    //     })
    //     .catch((err: errorType) => {
    //       if(err.message === "Network Error"){
    //         return data.onError && data.onError(err.message);
    //       }
    //       if (err.response && err.response.data.statusCode === 401) {
    //         dispatch.activityTemplates.getActivityTemplates([]);
    //       }
    //       if (err && err.response && err.response.data) {
    //         data.onError && data.onError(err.response.data.message);
    //       }
    //     })
    // },
    filterActivityTemplate: async (data: any) => {
      dispatch.activityTemplates.setIsFetching(true);
      await getRequest(`activitytemplate/filter?${data.data}`)
        .then((res) => {
          dispatch.activityTemplates.getFilteredActivityTemplates(res.data);
          data.onSuccess && data.onSuccess(res.data.rows);
        })
        .catch((err: errorType) => {
            if (err.response && err.response.data) {
                data.onError && data.onError(err.response.data.message);
            }
        })
    },
    createActivityTemplate: async (data: any) => {
      await createRequest('activitytemplate/create', data.activityTemplate)
      .then((res) => {
          data.onSuccess && data.onSuccess(res.data);
      })
      .catch((err: errorType) => {
          if (err && err.response && err.response.data) {
              data.onSuccess && data.onError(err.response.data.message);
          }
      });
    },
    getActivityTemplate: async (data: any) => {
      await getRequest(`activitytemplate/${data.id}`)
          .then((res) => {
            dispatch.activityTemplates.singleActivityTemplate(res.data);
              data.onSuccess && data.onSuccess(res.data);
          })
          .catch((err: errorType) => {
            data.onError && data.onError(err);
          });
    },
    editActivityTemplate: async (data: any) => {
      await patchRequest(`activitytemplate/${data.id}`, data.activityTemplate)
        .then((res) => {
          data.onSuccess && data.onSuccess(res.data);
        })
        .catch((err: errorType) => {
          if (err && err.response && err.response.data) {
            data.onError && data.onError(err.response.data.message);
          }
        });
    },
  })
})

export default activityTemplates;
