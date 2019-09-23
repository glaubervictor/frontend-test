import api from "../services/api";
import { notification } from "antd";
import messages from "../helpers/messages";
import history from "../helpers/history";

/**
 * Action types
 */
export const Types = {
  LOADING: "starships/LOADING",
  GET_ALL: "starships/GET_ALL"
};

/**
 * Reducer
 */
const INITIAL_STATE = {
  loading: false,
  records: []
};

/**
 * Action creators
 */
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case Types.LOADING:
      return { ...state, loading: action.payload };
    case Types.GET_ALL:
      return { ...state, records: action.payload };
    default:
      return state;
  }
};

/**
 * Creators
 */
export const Creators = {
  setLoading: loading => ({
    type: Types.LOADING,
    payload: loading
  }),
  setIds: ids => dispatch => {
    if (ids && ids.length > 0) {
      dispatch([
        localStorage.clear(),
        localStorage.setItem("@test:ids", ids),
        history.push("/starships")
      ]);
    } else {
      notification["warning"]({
        message: "Naves Estelares",
        description: messages.EMPTY
      });
    }
  },
  getByIds: () => dispatch => {
    if (localStorage.getItem("@test:ids")) {
      dispatch(Creators.setLoading(true));
      const ids = localStorage.getItem("@test:ids").split(",");

      Promise.all(
        ids.map(id =>
          api.get(`/starships/${id}`).then(response => {
            const { data } = response;
            return data;
          })
        )
      )
        .then(results => {
          dispatch([
            { type: Types.GET_ALL, payload: results },
            history.push("/starships"),
            Creators.setLoading(false)
          ]);
        })
        .catch(() => {
          notification["error"]({
            message: "Naves Estelares",
            description: messages.ERROR
          });

          dispatch(Creators.setLoading(false));
        });
    } else {
      notification["warning"]({
        message: "Naves Estelares",
        description: messages.EMPTY
      });
    }
  }
};
