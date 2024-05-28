import api from '../api';
import { createModel } from '@rematch/core';

const { getRequest, createRequest } = api;

interface StateType {
  questionnaires: Array<{}>;
  questionnaire: {};
}

interface ErrorType {
  message?: string;
  response?: {
    data?: {
      message?: string;
      statusCode?: any;
    };
  };
}

const questionnaires = createModel<any>()({
  state: {
    questionnaires: [],
    questionnaire: {},
  },
  reducers: {
    getQuestionnaires(state: StateType, payload: any) {
      return {
        ...state,
        questionnaires: payload,
      };
    },
    singleQuestionnaire(state: StateType, payload: any) {
      return {
        ...state,
        questionnaire: payload,
      };
    }
  },
  effects: (dispatch) => ({
    getAllQuestionnaires: async (data: any) => {
      await getRequest('questionnaires')
        .then((res) => {
          dispatch.questionnaires.getQuestionnaires(res.data.rows);
          data.onSuccess && data.onSuccess(res.data.rows);
        })
        .catch((err: ErrorType) => {
          if (err.message === 'Network Error') {
            return data.onError && data.onError(err.message);
          }
          if (err.response && err.response.data.statusCode === 401) {
            dispatch.questionnaires.getQuestionnaires([]);
          }
          if (err && err.response && err.response.data) {
            data.onError && data.onError(err.response.data.message);
          }
        });
    },
    createQuestionnaire: async (data: any) => {
      await createRequest('questionnaires/create', data.questionnaire)
        .then((res) => {
          data.onSuccess && data.onSuccess(res.data);
        })
        .catch((err: ErrorType) => {
          if (err && err.response && err.response.data) {
            data.onSuccess && data.onError(err.response.data.message);
          }
        });
    },
    getQuestionnaire: async (data: any) => {
      await getRequest(`questionnaires/${data.id}`)
        .then((res) => {
          dispatch.questionnaires.singleQuestionnaire(res.data);
          data.onSuccess && data.onSuccess(res.data);
        })
        .catch((err: ErrorType) => {
          data.onError && data.onError(err);
        });
    },
  }),
});

export default questionnaires;
