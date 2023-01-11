export default urlHome;

function urlHome(_request, response) {
  response.sendFile("index.html", { root: "public" });
  // response.sendFile("home.html", { root: "public" });
}
