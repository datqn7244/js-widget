let show = true;
const widgetContainer = document.querySelector('#test-form');
widgetContainer.classList = 'position-fixed bottom-0 end-0 m-4 bg-light';
const mainContainer = document.createElement('div');
mainContainer.classList = 'border border-3 border-primary rounded p-2';
widgetContainer.append(mainContainer);
const titleBar = document.createElement('div');
titleBar.classList =
  'border-bottom border-3 border-primary mb-2 p-2 d-flex justify-content-between';
mainContainer.appendChild(titleBar);
const heading = document.createElement('h4');
heading.textContent = 'Test form';
const closeButton = document.createElement('button');
closeButton.textContent = 'X';
closeButton.classList = 'btn btn-outline-secondary btn-sm';
titleBar.appendChild(heading);
titleBar.appendChild(closeButton);
const form = document.createElement('div');
mainContainer.appendChild(form);
form.innerHTML = `<form>
        <div class="mb-3">
        <label for="test-email" class="form-label">Email</label>
        <input type="text" name="test-email" class="form-control" id="test-email" placeholder="example@example.com" inputmode="email">
    </div>
    <div class="mb-3">
        <label for="test-message" class="form-label">Message</label>
        <textarea name="test-message" class="form-control" id="test-message" cols="30" rows="5" autocomplete="disable" ></textarea>
    </div>
    </form>
    <div class="mb-3 d-grid gap-2">
    <button class="btn btn-primary" id="test-submit">Send</button>
    </div>
    `;
const openButton = document.createElement('button');
openButton.textContent = 'X';
openButton.classList = 'btn btn-outline-secondary btn-sm';
closeButton.addEventListener('click', function (event) {
  mainContainer.replaceWith(openButton);
});
openButton.addEventListener('click', function (event) {
  openButton.replaceWith(mainContainer);
});
document
  .querySelector('#test-submit')
  .addEventListener('click', function (event) {
    const email = document.querySelector('#test-email').value;
    const message = document.querySelector('#test-message').value;
    // Fetch is good enough for this
    fetch('https://httpbin.org/post', {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, message }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Success:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
    console.log({ email, message });
  });
