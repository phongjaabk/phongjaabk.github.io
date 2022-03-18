const handleGetPost = async () => {
  const res = await baseGet({
    uri: "post/list",
    auth: false,
  });
  console.log("res", { res });
  return res;
  // // save token
  // if (res?.access_token) {
  //   localStorage.setItem("access_token", res.access_token);
  //   localStorage.setItem("refresh_token", res.refresh_token);
  //   closeModal();
  // } else {
  //   err_pw.innerHTML = "Login fail" + res;
  // }
};

const convertMarkdownToHtml = (markdownPlainText) => {
  const converter = new showdown.Converter();
  const html = converter.makeHtml(markdownPlainText);
  console.log("html", html);
  return html;
};
