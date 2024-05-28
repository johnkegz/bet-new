import api from "../api";
import { createModel } from "@rematch/core";

const { createRequest } = api;

interface stateType {
  data: {
    message: string;
  };
  invitations: any;
}

interface errorType {
  response: {
    data: {
      message: "";
    };
  };
}

const invitations = createModel<any>()({
  state: {
    data: {
      message: "",
    },
    invitations: [],
  },
  reducers: {
    created(state: stateType) {
      return {
        ...state,
        data: state.data,
      };
    },
    saveInvitations(state: any, payload: any) {
      return {
        ...state,
        invitations: payload,
      };
    },
  },
  effects: (dispatch) => ({
    inviteUser: async (data: any) => {
      await createRequest("invitations/admin-user-invitation", data.invitation)
        .then((res) => {
          dispatch.invitations.created(res.data);
          data.onSuccess && data.onSuccess(res.statusText);
        })
        .catch((err: errorType) => {
          if (err && err.response && err.response.data) {
            data.onSuccess && data.onError(err.response.data);
          }
        });
    },
  }),
});

export default invitations;
