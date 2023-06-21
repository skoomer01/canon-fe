import jwtDecode from "jwt-decode";
import jwt_decode from "jwt-decode";

const TokenManager = {
    getAccessToken: () => sessionStorage.getItem('token'),
    getClaims: () => {
      const token = sessionStorage.getItem('token');
      if (!token) {
        return undefined;
      }
      const claims = jwtDecode(token);
      return claims;
    },
    setAccessToken: (token) => {
      sessionStorage.setItem('token', token);
      const claims = jwtDecode(token);
      return claims;
    },
    clear: () => {
      sessionStorage.removeItem('token');
    },
  };
  
  export default TokenManager;
  