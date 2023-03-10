(function () {
  // Jquery or some other package check
  (function ensureJquery(readyCallback) {
    if (
      window.jQuery === undefined ||
      parseFloat(window.jQuery.fn.jquery) < 3.6
    ) {
      var js = document.createElement('script');
      js.src =
        'https://ajax.googleapis.com/ajax/libs/jquery/3.6.1/jquery.min.js';
      if (js.readyState)
        js.onreadystatechange = function () {
          if (this.readyState === 'complete' || this.readyState === 'loaded') {
            jQueryLoadHandler();
          }
        };
      else js.onload = jQueryLoadHandler;
      (
        document.getElementsByTagName('head')[0] || document.documentElement
      ).appendChild(js);
    } else {
      readyCallback(window.jQuery);
    }

    function jQueryLoadHandler() {
      readyCallback(window.jQuery.noConflict(true));
    }
  })(function () {});
  // Grab some bootstrap, can check for Bootstrap JavaScript but CSS is not possible
  const bootstrap = document.createElement('link');
  bootstrap.href =
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css';
  bootstrap.rel = 'stylesheet';
  bootstrap.integrity =
    'sha384-GLhlTQ8iRABdZLl6O3oVMWSktQOp6b7In1Zl3/Jr59b6EGGoI1aFkw7cmDA6j6gD';
  bootstrap.crossOrigin = 'anonymous';

  // Load bootstrap before inject HTML
  if (bootstrap.readyState)
    bootstrap.onreadystatechange = function () {
      if (this.readyState === 'complete' || this.readyState === 'loaded') {
        testForm();
      }
    };
  else bootstrap.onload = testForm;
  document.querySelector('head').appendChild(bootstrap);

  // Inject HTML after loading everything
  function testForm() {
    const widgetContainer = document.querySelector('#test-form');
    widgetContainer.classList = 'position-absolute bottom-0 end-0 m-4';
    const mainContainer = document.createElement('div');
    mainContainer.classList = 'border border-3 border-primary rounded p-2';
    widgetContainer.append(mainContainer);
    const titleBar = document.createElement('div');
    titleBar.classList = 'border-bottom border-3 border-primary mb-2 p-2';
    mainContainer.appendChild(titleBar);
    const heading = document.createElement('h4');
    heading.textContent = 'Test form';
    titleBar.appendChild(heading);
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
  }
})();
