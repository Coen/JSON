
$(document).ready(function() {

  var zoekTerm;

  $('#gaHalen').click(function() {
    zoekTerm = $('#zoekterm').val();
    haalFotos();
  });

  $('#zoekterm').keydown(function(e) {
    if(e.keyCode == 13) {
      zoekterm = $(this).val();
      haalFotos();
    }
  });

  function haalFotos() {
    var flickrURL = "http://api.flickr.com/services/feeds/photos_public.gne?format=json&tags="+ zoekTerm +"&jsoncallback=?"
    $.ajax(
      {
        dataType: 'json',
        method: 'GET',
        url: flickrURL,
        success: verwerkFotos
      }
    )
  };

  function verwerkFotos(data) {
    console.log(data);
    $('#fotos').html("");
    for(var i=0; i<data.items.length; i++) {
      var image = data.items[i];
      var htmlCode = "<div class='holder'><div class='image'><a href='" + image.link + "' target='_blank'><img src='" + image.media.m + "' alt='" + image.title + "' ></a></div><h4>" + image.title + "</h4></div>";
      $('#fotos').append(htmlCode);
    }
    $('#afkomst a').attr("href", data.link).text(data.title + " by Flickr.com");
  };

});
