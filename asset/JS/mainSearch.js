var form = $("#searchForm");

const searchInput = document.querySelector("#search-input");
const searchButton = document.querySelector("#search-button");
const searchResults = document.querySelector("#search-results");

$(searchButton).click(function (event) {
  $(searchResults).empty();

  handleSearch();
  event.preventDefault();
});

const startDateInput = document.querySelector("#start-date");

async function handleSearch() {
  const searchTerm = searchInput.value;

  const rawDate = startDateInput.value
    ? new Date(startDateInput.value) // users selection if its there
    : new Date(); // now
  const startDate = `${moment(rawDate).format("YYYY-MM-DDTHH:mm:ss")}Z`;

  if (searchTerm) {
    const searchQuery = `https://app.ticketmaster.com/discovery/v2/events.json?countryCode=GB&keyword=${searchTerm}&startDateTime=${startDate}&apikey=NVZ5rDf8pofIV9z9yn3XNFkxCUm5tdut&sort=date,asc`;

    const response = await fetch(searchQuery);

    //TODO CHECK FOR RESPONSE STATUS

    const data = await response.json();

    const events = data._embedded.events;

    var results_area = $("#search-results");
    results_area.html("");

    for (let i = 0; i < events.length; i++) {
      var eName = "";
      for (l of events[i].name) {
        if (eName.length < 16) {
          eName = eName.concat(l);
        }
      }
      var venueLon = events[i]._embedded.venues[0].location?.longitude;
      var venueLat = events[i]._embedded.venues[0].location?.latitude;
      results_area.append(`<div class="card col-3 bg-dark event" id="${i}">
      <img class="card-img-top" style="height:35%" src="${
        events[i].images[0].url
      }">
      <div class="card-body ">
      <h5 class="card-title text-white eventName">${eName}</h5>
      <div>
      <span class="card-subtitle text-white mb-1 small-text">${
        events[i]._embedded.venues[0].name
      }</span>
      <span class="event-date text-white mb-1 small-text">${
        events[i].dates.start.localDate
      }</span>
      </div>

      <button type="button" class="btn btn-dark" data-bs-toggle="modal" data-bs-target="#exampleModal-${i}">
      More Details
      </button>
      </div>
      
      <a class="btn btn-dark saveBtn m-auto">Save</a>
      

      
      
      <div class="modal fade" id="exampleModal-${i}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
            <h3 class=“modal-title fs-5” id=“exampleModalLabel”><p class=“text-black”>${
              events[i].name
            }</p></h3>
            <p class=“text-black”>${moment(
              events[i].dates.start.localDate
            ).format("dddd, MMMM Do YYYY")} ${
        events[i].dates.start.localTime
      }</p>
            <p class=“text-black”> ${moment(
              events[i].dates.start.localDate
            ).fromNow()}</p>
              
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
            <iframe src="http://maps.google.com/maps?q=${venueLat},${venueLon}&z=10&output=embed" width="100%"></iframe>
            <p class="text-black">${
              events[i]._embedded.venues[0].address.line1
            }, ${events[i]._embedded.venues[0].postalCode}, ${
        events[i]._embedded.venues[0].city.name
      } </p>
            <p class="text-black">${
              events[i]._embedded.venues[0].country.name
            }</p>
            <a href="${
              events[i].url
            }" target="_blank">Event Website - Information</a>
            <a href="${
              events[i]._embedded.venues[0].url
            }" target="_blank">Book ticket</a>
            </div>
            <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>

              
            </div>
          </div>
        </div>
      </div>

      
      </div>`);
    }

    $(document).on("click", ".saveBtn", function () {
      // console.log($(this).parent()[0])

      var i = $(this).parent()[0].getAttribute("id");
      var eventName = $(this).siblings("div").children("h5").text();
      var eventInfo = $(`#${i}`);
      var html = $("<div />").append($(eventInfo).clone()).html();
      console.log(eventInfo);
      localStorage.setItem(eventName, JSON.stringify(html));
    });
  }
}
