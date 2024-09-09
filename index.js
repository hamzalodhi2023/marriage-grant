let personalNoInput = document.querySelector("#personal-no");
let cnicNoInput = document.querySelector("#cnic-no");
let searchBtn = document.querySelector("#search-btn");
let resetBtn = document.querySelector("#reset-btn");
let tbody = document.querySelector("tbody");

searchBtn.addEventListener("click", async function () {
  let cnicNo = cnicNoInput.value;
  let personalNo = personalNoInput.value;

  if (!cnicNo && !personalNo) {
    alert("Please enter CNIC Number or Personal No.");
    return;
  }

  let response = await fetch(
    `https://script.google.com/macros/s/AKfycbx-4dhqRaE1_JskfpJ_GmDZnZtvhu0bzlrCiS1k2m03XZt83sXFsLzrq_LAjeuGM-m8/exec?personalno=${personalNo}&cnic=${cnicNo}`
  );
  let data = await response.json();
  appendDataToTable(data.data);
});

async function appendDataToTable(data) {
  tbody.innerHTML = "";

  await data.forEach((element) => {
    let tr = document.createElement("tr");
    tr.innerHTML = `
        <td>${element.nameRank}</td>
        <td>${element.personalNumber}</td>
        <td>${element.cnic}</td>
        <td>${element.districtUnit}</td>
        <td>${element.brideName}</td>
        <td>${element.remarks}</td>
        <td>${element.dateOfArrival}</td>
    `;
    tbody.appendChild(tr);
  });
}

resetBtn.addEventListener("click", () => {
  personalNoInput.value = "";
  cnicNoInput.value = "";
  tbody.innerHTML = "";
});
