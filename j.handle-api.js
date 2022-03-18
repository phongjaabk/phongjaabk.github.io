// const url = "https://jaa-blog-server.herokuapp.com/";
const url = "http://localhost:2000/";

const insertParam = (url, key, value) => {
  key = encodeURIComponent(key);
  value = encodeURIComponent(value);

  // kvp looks like ['key1=value1', 'key2=value2', ...]
  var kvp = url.substr(1).split("&");
  let i = 0;

  for (; i < kvp.length; i++) {
    if (kvp[i].startsWith(key + "=")) {
      let pair = kvp[i].split("=");
      pair[1] = value;
      kvp[i] = pair.join("=");
      break;
    }
  }

  if (i >= kvp.length) {
    kvp[kvp.length] = [key, value].join("=");
  }

  // can return this or...
  let params = kvp.join("&");

  // reload page with new params
  return params;
};

const insertParamToSearch = () => {
  const params = insertParam(document.location.search);
  document.location.search = params;
};

const findGetParameter = (parameterName) => {
  var result = null,
    tmp = [];
  location.search
    .substr(1)
    .split("&")
    .forEach(function (item) {
      tmp = item.split("=");
      if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
    });
  return result;
};

const setHeaderAuth = () => {
  const token = localStorage.get("access_token");
  console.log('token', token);
  return { headers: { Authorization: `Bearer ${token}` } };
};

const baseGet = async ({ uri = "", auth = true, params = [] }) => {
  try {
    console.log("getUser");
    let rawUrl = url + uri;
    const searchParam = [];
    const listParam = [...params, ...searchParam];
    for (let p of listParam) {
      rawUrl = insertParam(rawUrl);
    }
    const res = await axios.get(rawUrl, { ...(auth && setHeaderAuth()) });
    return res.data;
  } catch (err) {
    return err.message || String(err);
  }
};

const basePost = async ({ uri = "", body = {}, auth = true }) => {
  try {
    const res = await axios.post(url + uri, body, {
      ...(auth && setHeaderAuth()),
    });
    return res.data;
  } catch (err) {
    return err.message || String(err);
  }
};
