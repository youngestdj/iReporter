if (checkCookie('iReporterToken')) {
  extendCookie('iReporterToken', getCookie('iReporterToken'), 30);
} else {
  window.location.replace("login.html");
}
