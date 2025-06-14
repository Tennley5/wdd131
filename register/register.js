let participantCount = 1;

const addBtn = document.getElementById("add");

addBtn.addEventListener("click", () => {
  participantCount++;
  const newSection = participantTemplate(participantCount);
  addBtn.insertAdjacentHTML("beforebegin", newSection);
});

function participantTemplate(count) {
  return `
    <section class="participant${count}">
      <p>Participant ${count}</p>
      <div class="item">
        <label for="fname${count}">First Name<span>*</span></label>
        <input id="fname${count}" type="text" name="fname${count}" required />
      </div>
      <div class="item activities">
        <label for="activity${count}">Activity #<span>*</span></label>
        <input id="activity${count}" type="text" name="activity${count}" />
      </div>
      <div class="item">
        <label for="fee${count}">Fee ($)<span>*</span></label>
        <input id="fee${count}" type="number" name="fee${count}" />
      </div>
      <div class="item">
        <label for="date${count}">Desired Date<span>*</span></label>
        <input id="date${count}" type="date" name="date${count}" />
      </div>
      <div class="item">
        <p>Grade</p>
        <select>
          <option selected value="" disabled></option>
          <option value="1">1st</option>
          <option value="2">2nd</option>
          <!-- Add remaining grades as needed -->
        </select>
      </div>
    </section>
  `;
}




const form = document.querySelector("form");

form.addEventListener("submit", submitForm);

function submitForm(event) {
  event.preventDefault();

  const total = totalFees();
  const adultName = document.getElementById("adult_name").value;
  const summary = document.getElementById("summary");

  form.style.display = "none";         
  summary.style.display = "block";     

  summary.innerHTML = successTemplate({
    name: adultName,
    total,
    count: participantCount
  });
}


function totalFees() {
  let feeElements = document.querySelectorAll("[id^=fee]");
  feeElements = [...feeElements];

  const total = feeElements.reduce((sum, el) => {
    const fee = parseFloat(el.value) || 0;
    return sum + fee;
  }, 0);

  return total;
}

function successTemplate(info) {
  return `
    <h2>Thank you ${info.name} for registering!</h2>
    <p>You have registered ${info.count} participant${info.count > 1 ? "s" : ""} 
    and owe $${info.total.toFixed(2)} in fees.</p>
  `;
}
