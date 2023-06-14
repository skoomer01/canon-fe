import jwt_decode from "jwt-decode";

const TokenManager = {
    getAccessToken: () => localStorage.getItem('accessToken'),
    getClaims: () => {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        return undefined;
      }
      const claims = jwt_decode(token);
      return claims;
    },
    setAccessToken: (token) => {
      localStorage.setItem('accessToken', token);
      const claims = jwt_decode(token);
      return claims;
    },
    clear: () => {
      localStorage.removeItem('accessToken');
    },
  };
  
  export default TokenManager;
  