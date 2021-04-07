$(document).ready(function() { 

    var preloadedImages = []
    var imageUrlList = [
        "assets/img/foggy_walkway.jpg",
        "assets/img/hallway.jpg",
        "assets/img/london_cloudy.jpg",
        "assets/img/london_storm.jpg",
        "assets/img/mail_seal.jpg",
        "assets/img/mayfair_chair.jpg",
        "assets/img/mayfair_door.jpg",
        "assets/img/mayfair_hallway.jpg",
        "assets/img/mayfair.jpg",
        "assets/img/old_office.jpg",
        "assets/img/old_street.jpg",
        "assets/img/postbox.jpg",
        "assets/img/pub_man.jpg",
        "assets/img/pub.jpg",
        "assets/img/pub2.jpg",
        "assets/img/pub3.jpg",
        "assets/img/puddle.jpg",
        "assets/img/rain_night.jpg",
        "assets/img/rainy_westminster.jpg",
        "assets/img/small_street.jpg",
        "assets/img/station.jpg",
        "assets/img/the_peacock.jpg",
        "assets/img/underpass.jpg",
        "assets/img/westminster_bridge.jpg",
    ];
    function preloadImages()
    {
        imageUrlList.forEach(function(imageUrl) {
            var newImage = new Image();
            newImage.src = imageUrl;
            preloadedImages.push(newImage);
        });
    }

    preloadImages();

    //Default variables
    var start_dialog_name = "start";

    //Generic function to load file for local path
    //Added current date parameter to avoid caching
    function load_file(path) { 
        return $.ajax({
            url: path + "?_=" + new Date().getTime(),
            dataType: "json",
            async: false,
            success: function(data) {
                return data;
            }
        });
    };

    //Generic function to load a dialog based on json file name (without .json extension)
    function load_dialog(dialog_name) {
        //Load dialog json based on dialog name
        //Fall back to start if dialog doesn't exist
        var dialog_path = "dialogs/" + dialog_name + ".json";
        var dialog_file = load_file(dialog_path).responseJSON;

        var should_reset_to_start = dialog_file === undefined;

        if (should_reset_to_start)
        {
            dialog_name = start_dialog_name;
            dialog_path = "dialogs/" + dialog_name + ".json";
            dialog_file = load_file(dialog_path).responseJSON;
        }

        //Add anchor to url to identify current dialog
        window.location.href = "#" + dialog_name.replace(".json", "");
        //Load required page template for the dialog file 
        var template_url = dialog_file["template_url"] !== undefined ? dialog_file["template_url"] : "templates/default.template";
        var template_source = load_file(template_url).responseText;
        //Load deafult animations name
        var default_animations_file = load_file("dialogs/default_animations.json").responseJSON;
        //Populate the #template-content div by populating the 'tepmplate_source' template with the 'dialog_file' content. 
        $('#template-content').html(tmpl(template_source, dialog_file));

        //Get dialog specific start & end animations. 
        var start_animations = dialog_file["start_animations"];
        var end_animations = dialog_file["end_animations"];

        var all_start_animations = start_animations;
        var all_end_animations = end_animations;

        // if (dialog_file["use_default_animations"] == true)
        // {
        //     //Get default start & end animations. 
        //     var default_start_animations = default_animations_file["start_animations"];
        //     var default_end_animations = default_animations_file["end_animations"];

        //     //Concatenate dialog specific animations & default animations. 
        //     all_start_animations = default_start_animations.concat(start_animations);
        //     all_end_animations = default_end_animations.concat(end_animations);
        // }

        if (dialog_file["custom_scripts_to_run"] !== undefined)
        {
            dialog_file["custom_scripts_to_run"].forEach(function(custom_script) {
                eval("(" + custom_script + ")()");
            });
        }

        //Get play animations at dialog start. 
        play_animations(all_start_animations);

        //Remove event handlers from dialog buttons, then re-add them to avoid duplicate event handler calls. 
        $(".dialog-button").off("click");
        $(".dialog-button").click(function(e){
            e.preventDefault();
            //Identify the next dialog's name based on the pressed button' data-dialog attribute. 
            var next_dialog_name = $(this).attr('data-dialog');

            //Play the dialog end animations before loading the next dialog. 
            // (async() => {
                // await play_animations(all_end_animations);
            play_animations(all_end_animations);
            load_dialog(next_dialog_name);
            // })();
        });
    }

    //Function to play animations asnyc. 
    function play_animations(animation_data) {
        return new Promise(resolve => {
            if (animation_data !== undefined)
            {
                animation_data.forEach(function(animation) {
                    anime(animation);
                });
            }
            resolve('🤡');;
        });
    }

    //Check if the url has a anchor tag. 
    //Since the same page url will be used for each dialog, I identify the current dialog progress with anchors at the end of the url.. 
    if(window.location.hash) {
        //If an anchor is found, try to load the appropriate dialog. 
        var anchor = window.location.hash.substring(1); 

        //Check if a dialog can be found with this name. 
        var dialog_path = "dialogs/" + anchor + ".json";
        var dialog_file = load_file(dialog_path);

        //If a dialog is found, load it, otherwise start from the beginning
        if (dialog_file !== undefined)
        {
            load_dialog(anchor);
        }
        else
        {
            load_dialog(start_dialog_name);
        }
    }
    else
    {
        load_dialog(start_dialog_name);
    }
});