import api from "../services/api";
import messages from "../helpers/messages";
import { notification } from "antd";

/**
 * Action types
 */
export const Types = {
  LOADING: "people/LOADING",
  GET: "people/GET",
  GET_ALL: "people/GET_ALL",
  CURRENT_PAGE: "people/CURRENT_PAGE",
  TOTAL_RECORDS: "people/TOTAL_RECORDS"
};

/**
 * Reducer
 */
const INITIAL_STATE = {
  loading: false,
  record: null,
  records: [],
  currentPage: 0,
  totalRecords: 0
};

/**
 * Action creators
 */
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case Types.LOADING:
      return { ...state, loading: action.payload };
    case Types.GET:
      return { ...state, record: action.payload };
    case Types.GET_ALL:
      return { ...state, records: action.payload };
    case Types.CURRENT_PAGE:
      return { ...state, currentPage: action.payload };
    case Types.TOTAL_RECORDS:
      return { ...state, totalRecords: action.payload };
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
  setCurrentPage: currentPage => ({
    type: Types.CURRENT_PAGE,
    payload: currentPage
  }),
  setTotalRecords: totalRecords => ({
    type: Types.TOTAL_RECORDS,
    payload: totalRecords
  }),
  get: id => dispatch => {
    dispatch(Creators.setLoading(true));
    api
      .get(`/people/${id}`)
      .then(response => {
        const { data } = response;
        dispatch([
          { type: Types.GET, payload: data },
          Creators.setLoading(false)
        ]);
      })
      .catch(() => {
        notification["error"]({
          message: "Pessoas",
          description: messages.ERROR
        });

        dispatch(Creators.setLoading(false));
      });
  },
  getAll: page => dispatch => {
    dispatch(Creators.setLoading(true));
    api
      .get(`/people/?page=${page}`)
      .then(response => {
        const { results, count } = response.data;
        dispatch([
          Creators.setTotalRecords(count),
          Creators.setCurrentPage(page),
          Creators.setLoading(false),
          { type: Types.GET_ALL, payload: results }
        ]);
      })
      .catch(() => {
        notification["error"]({
          message: "Pessoas",
          description: messages.ERROR
        });

        dispatch(Creators.setLoading(false));
      });
  }
};
