function myDisplayer(obj) {
  document.querySelector(`[data-field="geekjoke"]`).innerHTML =
    JSON.parse(obj).joke;
}

let myPromise = new Promise(function (myResolve, myReject) {
  const req = new XMLHttpRequest();
  req.open("GET", "https://geek-jokes.sameerkumar.website/api?format=json");
  req.onloadend = function () {
    if (req.status == 200) {
      document.querySelector(`[data-field="geekjoke"]`).innerHTML =
        req.response;
      myResolve(req.response);
    } else {
      document.querySelector(`[data-field="geekjoke"]`).innerHTML =
        "Leider kein Witz vorhanden";
      myResolve();
    }
  };
  req.send();
});

myPromise.then(
  function (value) {
    myDisplayer(value);
  },
  function (error) {
    myDisplayer(error);
  }
);
