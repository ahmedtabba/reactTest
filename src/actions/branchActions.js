import {
  GET_BRANCHES,
  POST_BRANCH,
  DELETE_BRANCH,
  UPDATE_BRANCH
} from "./types";
import {
  getBranchesApi,
  saveBranch,
  deleteBranchApi
} from "../services/branchServices";
import { toast } from "react-toastify";

export function getBranches() {
  return async function(dispatch) {
    const { data: branches } = await getBranchesApi();

    dispatch({
      type: GET_BRANCHES,
      payload: branches
    });
  };
}

export function createBranches(branchData) {
  return async function(dispatch) {
    const newBranch = await saveBranch(branchData);
    dispatch({
      type: POST_BRANCH,
      payload: newBranch.data
    });
  };
}

export function updateBranch(branch) {
  return async function(dispatch) {
    const newBranch = await saveBranch(branch);
    dispatch({
      type: UPDATE_BRANCH,
      payload: newBranch.data
    });
  };
}

export function deleteBranch(branchId) {
  return async function(dispatch) {
    try {
      await deleteBranchApi(branchId);
      dispatch({
        type: DELETE_BRANCH,
        payload: branchId
      });
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        toast.error("This branch has already been deleted.");

      if (ex.response && ex.response.status === 400)
        toast.error(ex.response.data.message);
    }
  };
}
