const express = require("express");
const app = express();
const Router = express.Router();
const axios = require("axios");
const qs = require("qs");
Router.get("/googleOauth", googleOauth);
async function googleOauth(req, res) {
  const code = req.query.code.toString();
  const { id_token, access_token } = await getGoogleAuthTokens({ code });
  console.log({ id_token, access_token });
}
app.use(express.json());
app.use(express.urlencoded());
app.use(Router);
async function getGoogleAuthTokens({ code }) {
  const url = "https://oauth2.googleapis.com/token";
  const values = {
    code,
    client_id:
      "1042316838737-fgkf50u39vme5a0bsl6nrjb86mfh693q.apps.googleusercontent.com",
    client_secret: "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",
    redirect_uri: "http://localhost:3000/googleOauth",
    grant_type: "authorization_code",
  };
  console.log(values);
  try {
    const res = await axios.post(url, qs.stringify(values), {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
    return res.data;
  } catch (err) {
    console.log(err, "Failed to fetch Google Oauth Tokens");
    console.error(err.response.data.error);

    // throw new Error(err.message);
  }
}
app.listen(3000, () => {
  console.log("Listening to port 3000");
});
