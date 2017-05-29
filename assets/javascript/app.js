$(document).ready(function() {
var topics = ["Keanu Reeves", "Bruce Lee", "Chuck Norris", "Jennifer Lawerence", "Johnny Depp"]; 
var results;


function displaygifDiv(){
	$("#gifs-appear-here").empty();
	var actor = $(this).attr("data-name");

	
	var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        actor + "&api_key=dc6zaTOxFJmzC&limit=10";
        
    $.ajax({
    	url: queryURL,
    	method: "GET",
    })
    .done(function(response){
    	console.log(queryURL);
    	console.log(response);
    	results = response.data;

    	for (var i = 0; i < results.length; i++) {
    		if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
    			var gifDiv = $("<div class='item'>");
    			     var rating = results[i].rating;
    			         var p = $("<p>").text("Rating: " + rating);
    			
                var actorImage = $("<img>");
    			actorImage.attr("src", results[i].images.fixed_height_still.url);
    			actorImage.attr("data-still", actorImage.attr("src"));
    			actorImage.attr("data-animate", results[i].images.fixed_height.url);
    			actorImage.on("click", function(){

    				if($(this).attr("src") === $(this).attr("data-still")){
                        
                        $(this).attr("src", $(this).attr("data-animate"));

                    } //these attributes allow the user to pause the gif
                    else {
                        $(this).attr("src", $(this).attr("data-still"));
                    }
    			});
    			gifDiv.addClass("thumbnail");
    			gifDiv.append(p);
    			gifDiv.append(actorImage);
    			$("#gifs-appear-here").prepend(gifDiv);
    		}
    	}
    });

}

    function renderButtons(){ 

        // Clears the buttons for re-use.
        $("#buttonsView").empty();

        // Loops through the array of topics
        for (var i = 0; i < topics.length; i++){

            
            var a = $("<button>") 
            a.addClass("actors"); 
            a.attr("data-name", topics[i]); 
            a.text(topics[i]); 
            $("#buttonsView").append(a); 
        }
    }


    $("#add-gif").on("click", function(){
        event.preventDefault();

        var actor = $("#gif-input").val().trim();
        console.log(actor);
        $("#gif-input").val(" ");

        topics.push(actor);
        console.log(topics);
        
        renderButtons();

        return false;
    })


    $(document).on("click", ".actors", displaygifDiv);

    renderButtons();
});
