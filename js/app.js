const logo = document.querySelector("#logo_in");
const kompaniyaInput = document.querySelector("#komp_in");
const lavozim = document.querySelector("#lavoz_in");
const yangi = document.querySelector("#new");
const featured = document.querySelector("#featured");
const vaqt = document.querySelector("#vaqt");
const ishTuri = document.querySelector("#ish");
const joylashuv = document.querySelector("#joy");
const fullstak = document.querySelector("#fullstak");
const react = document.querySelector("#react");
const button = document.querySelector("#btn");
const block = document.querySelector(".block");
const backend = document.querySelector("#backend");
const frontend = document.querySelector("#frontend");

function validateKompaniya() {
    if (kompaniyaInput.value.length < 4) {
        alert("Kompaniya nomi eng kamida 4 ta belgidan iborat bo'lishi kerak");
        kompaniyaInput.focus();
        return false;
    }
    return true;
}

function validateLavozim() {
    if (lavozim.value.length < 4) {
        alert("Lavozim eng kamida 4 ta belgidan iborat bo'lishi kerak");
        lavozim.focus();
        return false;
    }
    return true;
}

function createCard(data) {
    return `
    <div class="card">
      <div class="site_left">
        <button data-id = ${data.id} class ="delete">delete</button>

        <div class="logo_img">
          <img src="${data.logo}" alt="logo" />
        </div>
        <div class="site_left_tit">
          <div class="soxa_top">
            <div class="title_top">
              <div class="title_soxa">
                <h3>${data.kompaniya}</h3>
              </div>
              <div class="span_soxa">
                <div class="new">
                  ${data.new ? `<span> New </span>` : ""}
                </div>
                <div class="fatured">
                  ${data.featured ? `<span> Featured </span>` : ""}
                </div>
              </div>
            </div>
            <div class="senior">
              <div class="senior_top">
                <h4>${data.ishLavozim}</h4>
              </div>
              <div class="senior_bottom">
                <ul id="bottom_ul">
                  <li>${data.vaqt}</li>
                  <li class="point">.</li>
                  <li>${data.ishTuri}</li>
                  <li class="point">.</li>
                  <li>${data.joy}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="site_right">
        <ul id="right_ul">
          ${data.fullstak ? `<li>Full Stack</li>` : ""}
          ${data.react ? `<li>React</li>` : ""}
          ${data.frontend ? `<li>Frontend</li>` : ""}
          ${data.backend ? `<li>Backend</li>` : ""}
        </ul>
      </div>

    </div>
  `;
}

function getDataFromLocalStorage() {
  let data = [];
  if (localStorage.getItem("todos")) {
    data = JSON.parse(localStorage.getItem("todos"));
  }

  return data;
}

function saveDataToLocalStorage(data) {
  localStorage.setItem("todos", JSON.stringify(data));
}

button &&
  button.addEventListener("click", function (event) {
    event.preventDefault();

    if (!validateKompaniya() || !validateLavozim()) {
      return;
    }

    const job = {
      id: Date.now(),
      logo: logo.value,
      kompaniya: kompaniyaInput.value,
      new: yangi.checked,
      featured: featured.checked,
      ishLavozim: lavozim.value,
      vaqt: vaqt.value,
      ishTuri: ishTuri.value,
      joy: joylashuv.value,
      fullstak: fullstak.checked,
      react: react.checked,
      frontend: frontend.checked,
      backend: backend.checked,
    };

    let card = createCard(job);
    block.innerHTML += card;

    let todos = getDataFromLocalStorage();
    todos.push(job);
    saveDataToLocalStorage(todos);
  });

document.addEventListener("DOMContentLoaded", function () {
  let jobs = getDataFromLocalStorage();

  jobs.forEach((job) => {
    let card = createCard(job);
    block.innerHTML += card;
  });

  let buttons = document.querySelectorAll(".delete");

  buttons.length > 0 &&
    buttons.forEach((btn) => {
      btn &&
        btn.addEventListener("click", function (event) {
          let isDelete = confirm("Rostan ham ochirmoqchimisiz ???");

          if (isDelete) {
            this.parentNode.parentNode.remove();

            let id = this.getAttribute("data-id");
            if (id) {
              jobs = jobs.filter((value) => {
                return value.id != id;
              });

              localStorage.setItem("jobs", JSON.stringify(jobs));
            }
          }
        });
    });
});