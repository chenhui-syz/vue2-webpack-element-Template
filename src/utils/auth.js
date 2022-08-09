const accessTokenKey = 'DOSSEN_ACCESS_TOKEN',
  refreshTokenKey = 'DOSSEN_REFRESH_TOKEN',
  accessTokenTTLKey = 'DOSSEN_ACCESS_TOKEN_TTL';

export function getAccessToken() {
  return window.localStorage.getItem (accessTokenKey);
}

export function setAccessToken(token) {
  window.localStorage.setItem (accessTokenKey, token);
}

export function removeAccessToken() {
  window.localStorage.removeItem (accessTokenKey);
}

export function getRefreshToken() {
  return window.localStorage.getItem (refreshTokenKey);
}

export function setRefreshToken(token) {
  window.localStorage.setItem (refreshTokenKey, token);
}

export function removeRefreshToken() {
  window.localStorage.removeItem (refreshTokenKey);
}

export function getAccessTokenTTL() {
  return window.localStorage.getItem (accessTokenTTLKey);
}

export function setAccessTokenTTL(ttl) {
  window.localStorage.setItem (accessTokenTTLKey, ttl);
}

export function removeAccessTokenTTL() {
  window.localStorage.removeItem (accessTokenTTLKey);
}

export function clearTokenAndTTL() {
  removeAccessToken ();
  removeRefreshToken ();
  removeAccessTokenTTL ();
}
