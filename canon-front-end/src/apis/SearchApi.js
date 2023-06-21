import axios from "axios";
import TokenManager from "../security/TokenManager";

const base = "http://localhost:8080/search";

const SearchApi = {
  getByErrorIdFromPublic: async (errorId, pageSize, pageNumber) => {
    try {
      const response = await axios.get(`${base}/public/error/${errorId}`, {
        params: { pageSize, pageNumber },
      });
      return response.data;
    } catch (error) {
      console.error("Error occurred while fetching search results:", error);
      throw error;
    }
  },

  countPagesForErrorIdFromPublic: async (errorId, pageSize) => {
    try {
      const response = await axios.get(
        `${base}/public/error/${errorId}/count`,
        {
          params: { pageSize },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error occurred while counting pages:", error);
      throw error;
    }
  },

  getByVersionFromPublic: async (version, pageSize, pageNumber) => {
    try {
      const response = await axios.get(`${base}/public/version/${version}`, {
        params: { pageSize, pageNumber },
      });
      return response.data;
    } catch (error) {
      console.error("Error occurred while fetching search results:", error);
      throw error;
    }
  },

  countPagesForVersionFromPublic: async (version, pageSize) => {
    try {
      const response = await axios.get(
        `${base}/public/version/${version}/count`,
        {
          params: { pageSize },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error occurred while counting pages:", error);
      throw error;
    }
  },

  getByCommitFromPublic: async (commit, pageSize, pageNumber) => {
    try {
      const response = await axios.get(`${base}/public/commit/${commit}`, {
        params: { pageSize, pageNumber },
      });
      return response.data;
    } catch (error) {
      console.error("Error occurred while fetching search results:", error);
      throw error;
    }
  },

  countPagesForCommitFromPublic: async (commit, pageSize) => {
    try {
      const response = await axios.get(
        `${base}/public/commit/${commit}/count`,
        {
          params: { pageSize },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error occurred while counting pages:", error);
      throw error;
    }
  },

  getByVersionFromPrivate: async (version, userId, pageSize, pageNumber) => {
    try {
      const accessToken = TokenManager.getAccessToken();
      const response = await axios.get(`${base}/private/version/${version}`, {
        params: { userId, pageSize, pageNumber },
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });
      return response.data;
    } catch (error) {
      console.error("Error occurred while fetching private search results:", error);
      throw error;
    }
  },
  
  countPagesForVersionFromPrivate: async (version, userId, pageSize) => {
    try {
      const accessToken = TokenManager.getAccessToken();
      const response = await axios.get(`${base}/private/version/${version}/count`, {
        params: { userId, pageSize },
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });
      return response.data;
    } catch (error) {
      console.error("Error occurred while counting private search pages:", error);
      throw error;
    }
  },
  
  getByCommitFromPrivate: async (commit, userId, pageSize, pageNumber) => {
    try {
      const accessToken = TokenManager.getAccessToken();
      const response = await axios.get(`${base}/private/commit/${commit}`, {
        params: { userId, pageSize, pageNumber },
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });
      return response.data;
    } catch (error) {
      console.error("Error occurred while fetching private search results:", error);
      throw error;
    }
  },
  
  countPagesForCommitFromPrivate: async (commit, userId, pageSize) => {
    try {
      const accessToken = TokenManager.getAccessToken();
      const response = await axios.get(`${base}/private/commit/${commit}/count`, {
        params: { userId, pageSize },
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });
      return response.data;
    } catch (error) {
      console.error("Error occurred while counting private search pages:", error);
      throw error;
    }
  },
  getByErrorIdFromPrivate: async (errorId, userId, pageSize, pageNumber) => {
    try {
      const accessToken = TokenManager.getAccessToken();
      const response = await axios.get(`${base}/private/error/${errorId}`, {
        params: { userId, pageSize, pageNumber },
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });
      return response.data;
    } catch (error) {
      console.error("Error occurred while fetching private search results:", error);
      throw error;
    }
  },
  
  countPagesForErrorIdFromPrivate: async (errorId, userId, pageSize) => {
    try {
      const accessToken = TokenManager.getAccessToken();
      const response = await axios.get(`${base}/private/error/${errorId}/count`, {
        params: { userId, pageSize },
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });
      return response.data;
    } catch (error) {
      console.error("Error occurred while counting private search pages:", error);
      throw error;
    }
  },
};

export default SearchApi;
