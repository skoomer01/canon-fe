import axios from "axios";

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
};

export default SearchApi;
