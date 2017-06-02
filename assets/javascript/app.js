$(document).ready(function() {
var topics = ["Birds", "Anime", "Chuck Norris", "Star Wars", "Donald Trump", "Cats", "Prank", "80's Cartoons", "Toys", "Dogs"]; 
var results;


function displaygifDiv(){
	$("#gifs-appear-here").empty();
	var x = $(this).attr("data-name");

	var queryURL = "https://api.giphy.com/v1/gifs/search?q="+x+"&api_key=dc6zaTOxFJmzC&limit=10";
        
    $.ajax({url: queryURL,method:'GET'})
    .done(function(response){
    	console.log(queryURL);
    	console.log(response);
    	results = response.data;

    	for (var i = 0; i < results.length; i++) {
    			var gifDiv = $("<div class='item'>");
    			     var rating = results[i].rating;
    			         var p = $("<p>").text("Rating: " + rating);
    			
                var gifImage = $("<img>");
    			gifImage.attr("src", results[i].images.fixed_height_still.url);
    			gifImage.attr("data-still", gifImage.attr("src"));
    			gifImage.attr("data-animate", results[i].images.fixed_height.url);
    			gifImage.on("click", function(){

    				if($(this).attr("src") === $(this).attr("data-still")){
                        
                        $(this).attr("src", $(this).attr("data-animate"));

                    } //these attributes allow the user to pause the gif
                    else {
                        $(this).attr("src", $(this).attr("data-still"));
                    }
    			});
    			gifDiv.addClass("thumbnail");
    			gifDiv.append(p);
    			gifDiv.append(gifImage);
    			$("#gifs-appear-here").prepend(gifDiv);
    	}
    });

}

    function renderButtons(){ 

        // Clears the buttons for re-use.
        $("#buttonsView").empty();

        // Loops through the array of topics
        for (var i = 0; i < topics.length; i++){

            
            var a = $("<button>") 
            a.addClass("buttons"); 
            a.attr("data-name", topics[i]); 
            a.text(topics[i]); 
            $("#buttonsView").append(a); 
        }
    }


    $("#add-gif").on("click", function(){
        //event.preventDefault()

        var gifInput = $("#gif-input").val().trim();
        if (gifInput !==  "") {
        
        console.log(gifInput);
        $("#gif-input").val(" ");

        topics.push(gifInput);

        console.log(topics);
        
        renderButtons();

        return false;
    }
    })


    $(document).on("click", ".buttons", displaygifDiv);

    renderButtons();
});
