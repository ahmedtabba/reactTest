import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl + "/branches";

function branchUrl(id) {
  return `${apiEndpoint}/${id}`;
}

export function getBranchesApi() {
  return http.get(apiEndpoint);
}

export function getBranch(branchId) {
  return http.get(branchUrl(branchId));
}

export function saveBranch(branch) {
  if (branch.id) {
    const body = { ...branch };
    return http.put(branchUrl(branch.id), body);
  }

  return http.post(apiEndpoint, branch);
}

export function deleteBranchApi(branchId) {
  return http.delete(branchUrl(branchId));
}
