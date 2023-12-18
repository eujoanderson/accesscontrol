function isAuthenticated() {
	if (!getToken()) {
	  window.location.href = '/index.html';
	} else {
	  return true;
	}
  }
  
  function getToken() {
	return localStorage.getItem('@hostMonitor:token');
  }
  
  function signin(token) {
	localStorage.setItem('@hostMonitor:token', token);
  
	window.location.href = '../../pages/page-principal.html';
  }
  
  function signout() {
	localStorage.removeItem('@hostMonitor:token');
  
	window.location.href = '../index.html';
  }
  
  export default { isAuthenticated, getToken, signin, signout };