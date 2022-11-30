window.addEventListener("load", loadJoke);
window.addEventListener("load", loadTime);

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
  // Open API: https://sv443.net/jokeapi/v2/
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
function loadTime() {
  const myAge = moment([1995, 03, 21]);
  const timeJungschar = moment([2012, 01, 01]);
  moment.locale("de-ch");
  document.querySelector(`[data-field="myAge"]`).innerHTML = moment().from(
    myAge,
    true
  );
  document.querySelector(`[data-field="timeJungschar"]`).innerHTML =
    moment().from(timeJungschar, true);
}
