const API_BASE_URL = "http://localhost:8081";

async function getBranchesWithErrorId(errorID) {
  const response = await fetch(`${API_BASE_URL}/branches/filter/error/${errorID}`);
  if (response.ok) {
    const data = await response.json();
    return data;
  } else {
    throw new Error("Failed to fetch branches with error ID");
  }
}

async function getBranchesByCommit(commit) {
  const response = await fetch(`${API_BASE_URL}/branches/filter/commit/${commit}`);
  if (response.ok) {
    const data = await response.json();
    return data;
  } else {
    throw new Error("Failed to fetch branches by commit");
  }
}

async function getBranchesByVersion(version) {
  const response = await fetch(`${API_BASE_URL}/branches/filter/version/${version}`);
  if (response.ok) {
    const data = await response.json();
    return data;
  } else {
    throw new Error("Failed to fetch branches by version");
  }
}

export const searchApiService = {
  getBranchesWithErrorId,
  getBranchesByCommit,
  getBranchesByVersion,
};
