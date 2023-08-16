function getGoogleUrl() {
  const rootUrl = "http://accounts.google.com/o/oauth2/v2/auth";
  const options = {
    redirect_uri: "http://localhost:3000/googleOauth",
    client_id:
      "1042316838737-fgkf50u39vme5a0bsl6nrjb86mfh693q.apps.googleusercontent.com",
    access_type: "offline",
    response_type: "code",
    prompt: "consent",
    scope: [
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email",
    ].join(" "),
  };
  console.log({ options });

  const qs = new URLSearchParams(options);
  console.log({ qs });
  return `${rootUrl}?${qs.toString()}`;
}

console.log(getGoogleUrl());
module.exports = getGoogleUrl;
