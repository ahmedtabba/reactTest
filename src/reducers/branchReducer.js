import {
  GET_BRANCHES,
  POST_BRANCH,
  DELETE_BRANCH,
  UPDATE_BRANCH
} from "../actions/types";

const initialState = {
  items: []
};

export default function(state = initialState, action) {
  let branches;
  switch (action.type) {
    case GET_BRANCHES:
      return {
        ...state,
        items: action.payload
      };
    case POST_BRANCH:
      branches = [...state.items];
      branches.push(action.payload);
      return {
        ...state,
        items: branches
      };

    case DELETE_BRANCH:
      return {
        ...state,
        items: state.items.filter(i => i.id !== action.payload)
      };

    case UPDATE_BRANCH:
      branches = [...state.items];

      const branch = branches.find(c => c.id === action.payload.id);

      const index = branches.indexOf(branch);

      branches[index] = { ...action.payload };

      return {
        ...state,
        items: branches
      };
    default:
      return state;
  }
}
