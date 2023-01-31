function LOAD() {

  for (key in localStorage) {
    if (key !== "debug") {
              $('.favourites').prepend(JSON.parse(localStorage.getItem(key)));
    }
  }
      $('.saveBtn').replaceWith(`<a class="btn btn-dark deleteBtn m-auto">Delete</a>`)
console.log($('.favourites')[0].childElementCount)
   if($('.favourites')[0].childElementCount > 1){
    $('#noFaves').hide()
   } 
}
LOAD();
$(document).on("click", ".deleteBtn", function () {
    var eventName = $(this).siblings("div").children("h5").text();
    $(this).parent().remove();
    localStorage.removeItem(eventName)

})

const today = `${moment().format("YYYY-MM-DDTHH:mm:ss")}Z`;
console.log(today);
async function handleSearch() {
  const suggested = `https://app.ticketmaster.com/discovery/v2/events.json?countryCode=GB&startDateTime=${today}&apikey=NVZ5rDf8pofIV9z9yn3XNFkxCUm5tdut`;

  const response = await fetch(suggested);

  //TODO CHECK FOR RESPONSE STATUS

  const data = await response.json();

  console.log(data);

  const events = data._embedded.events;

  var result_num = 0;

  var suggested_area = $("#suggestedEvents");

  for (let i = 0; i < 4; i++) {
    // console.log(result_num);
    var eName = "";
    for (l of events[i].name) {
      if (eName.length < 16) {
        eName = eName.concat(l);
      }
    }
    var venueLon = events[i]._embedded.venues[0].location.longitude;
    var venueLat = events[i]._embedded.venues[0].location.latitude;
    suggested_area.append(`<div class="card col-6 bg-dark event" id="${i}">
        <img class="card-img-top" style="height:35%" src="${
          events[i].images[0].url
        }">
        <div class="card-body ">
        <h5 class="card-title text-white eventName">${eName}</h5>
        <h6 class="card-subtitle text-white mb-1">${
          events[i]._embedded.venues[0].name
        }</h6>
  
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
    result_num++;
  }
}

handleSearch();
