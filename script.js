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
        showReviewContainer();
      }
    };
  else bootstrap.onload = showReviewContainer;
  document.querySelector('head').appendChild(bootstrap);

  // // Inject HTML after loading everything
  function showReviewContainer() {
    widgetContainer = document.querySelector(vkreviewlocation);
    const mainContainer = document.createElement('div');
    mainContainer.classList =
      'container border border-3 border-primary rounded p-2';
    widgetContainer.append(mainContainer);
    const reviewHeader = document.createElement('h3');
    reviewHeader.innerText = 'Review';
    mainContainer.append(reviewHeader);
    const reviewContainer = document.createElement('div');
    reviewContainer.classList = 'review-container';
    mainContainer.append(reviewContainer);
    return reviewContainer;
  }

  function appendReview(reviews) {
    const reviewContainer =
      document.querySelector('.review-container') || showReviewContainer();
    reviewContainer.innerHTML = '';
    reviews.forEach((review) => {
      const reviewBody = document.createElement('div');
      reviewBody.classList = 'review';
      reviewContainer.append(reviewBody);
      reviewBody.innerHTML = `
      <h5>${review.title}</h5>
      <p><strong>Rating:</strong> ${review.rating}</p>
      <p>${review.text}</p>
      `;
    });
  }
  const reviewservice = {
    push: function ({ email, review_items }) {
      // Push to end point
      fetch(`http://localhost:8000/api/v1/orders/?id=${vkreview}`, {
        method: 'POST', // or 'PUT'
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, review_items }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log('Success:', data);
        })
        .catch((error) => {
          console.error('Error:', error);
        });
      console.log({ email, review_items });
    },
    get: function (item_name) {
      // Push to end point
      fetch(`http://localhost:8000/api/v1/reviews/?id=${vkreview}`, {
        method: 'POST', // or 'PUT'
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ item_name }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log('Success:', data);
          appendReview(data);
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    },
  };
  window.reviewservice = reviewservice;
})();
