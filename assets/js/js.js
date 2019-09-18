// this code means to load the HTML and then JS to avoid errors
$(document).ready(function() {
  // i made buttons array
  var animals = ['dog', 'cat', 'cow', 'pig', 'bird'];
  // function to genarate buttons
  function genarateButtons() {
    // this empty function to reset old actions to avoid add it with new actions
    $('.topButtons').empty();
    for (var i = 0; i < animals.length; i++) {
      // now creating button tag
      var buttonTag = $('<button>');
      // adding class
      buttonTag.addClass('animalButton');

      buttonTag.attr('data-type', animals[i]);
      // adding the array text to button tag
      buttonTag.text(animals[i]);
      $('.topButtons').append(buttonTag);
    }
  }
  $('#add-animal').on('click', function(event) {
    // to avoid (complete page refresh)thats will take time with big projects
    event.preventDefault();
    var newAnimal = $('input').val();
    console.log('new Animal: ' + newAnimal);
    // adding newAnimal to animals array (User will add it with Submit button)
    animals.push(newAnimal);
    // call the function
    genarateButtons();
  });
  genarateButtons();
  $(document).on('click', '.animalButton ', function() {
    // container to add api's data
    $('#gifContainer').empty();
    var query = $(this).attr('data-type');
    // getting data from ajax
    $.ajax({
      url:
        'http://api.giphy.com/v1/gifs/search?q=' +
        query +
        '&api_key=dc6zaTOxFJmzC&limit=10',
      method: 'GET'
    }).then(function(response) {
      var results = response.data;
      //console.log(results[0]);
      for (var i = 0; i < results.length; i++) {
        // creating new div
        var animalDiv = $('<div>');
        var rating = results[i].rating;
        var p = $('<p>').text('Rating: ' + rating);
        animalDiv.append(p);
        // stop and animate the images
        var still = results[i].images.fixed_height_still.url;
        var animate = results[i].images.fixed_height.url;

        var animalImage = $('<img>');
        animalImage.attr('src', still);
        animalImage.attr('data-state', 'still');
        animalImage.attr('data-still', still);
        animalImage.attr('data-animate', animate);
        animalImage.addClass('animalGif');

        animalDiv.append(animalImage);
        $('#gifContainer').append(animalDiv);
      }
    });
  });
});
// stop and animate images when press on it
$(document).on('click', '.animalGif', function() {
  var state = $(this).attr('data-state');
  var animatedURL = $(this).attr('data-animate');
  console.log('animate url: ' + animatedURL);
  var stillURL = $(this).attr('data-still');
  if (state == 'still') {
    $(this).attr('src', animatedURL);
    $(this).attr('data-state', 'animate');
  }
  if (state == 'animate') {
    $(this).attr('src', stillURL);
    $(this).attr('data-state', 'still');
  }
});
