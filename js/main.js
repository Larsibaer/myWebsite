// Open API: https://sv443.net/jokeapi/v2/
window.addEventListener("load", loadJoke);
function loadJoke() {
  function myDisplayer(obj) {
    document.querySelector(`[data-field="geekjoke_setup"]`).innerHTML =
      JSON.parse(obj).setup;
    document.querySelector(`[data-field="geekjoke_delivery"]`).innerHTML =
      JSON.parse(obj).delivery;
  }

  jokeCategory = document.querySelector(
    `[data-field="geekjoke_categorie"]`
  ).value;
  jokeCategory = null ? "Any" : jokeCategory;

  jokeLanguage = document.querySelector(
    `[data-field="geekjoke_language"]`
  ).value;
  jokeLanguage = null ? "de" : jokeLanguage;

  function createPromise() {
    let myPromise = new Promise(function (myResolve, myReject) {
      const req = new XMLHttpRequest();
      req.open(
        "GET",
        "https://v2.jokeapi.dev/joke/" +
          jokeCategory +
          "?lang=" +
          jokeLanguage +
          "&type=twopart"
      );
      req.onloadend = function () {
        if (req.status == 200) {
          myResolve(req.response);
        } else {
          document.querySelector(`[data-field="geekjoke"]`).innerHTML =
            "Leider kein Witz vorhanden";
          myReject();
        }
      };
      req.send();
    });
    return myPromise;
  }

  createPromise().then(
    function (value) {
      myDisplayer(value);
    },
    function (error) {
      myDisplayer(error);
    }
  );
}
