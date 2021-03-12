$(document).ready(function() { 

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
        //Add anchor to url to identify current dialog
        window.location.href = "#" + dialog_name.replace(".json", "");
        var dialog_path = "dialogs/" + dialog_name;
        //Load dialog json based on dialog name
        var dialog_file = load_file(dialog_path).responseJSON;
        //Load required page template for the dialog file 
        var template_source = load_file(dialog_file["template_url"]).responseText;
        //Load deafult animations name
        var default_animations_file = load_file("dialogs/default_animations.json").responseJSON;
        //Populate the #template-content div by populating the 'tepmplate_source' template with the 'dialog_file' content. 
        $('#template-content').html(tmpl(template_source, dialog_file));

        //Get dialog specific start & end animations. 
        var start_animations = dialog_file["start_animations"];
        var end_animations = dialog_file["end_animations"];

        var all_start_animations = start_animations;
        var all_end_animations = end_animations;

        if (dialog_file["use_default_animations"] == true)
        {
            //Get default start & end animations. 
            var default_start_animations = default_animations_file["start_animations"];
            var default_end_animations = default_animations_file["end_animations"];

            //Concatenate dialog specific animations & default animations. 
            all_start_animations = default_start_animations.concat(start_animations);
            all_end_animations = default_end_animations.concat(end_animations);
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
            (async() => {
                await play_animations(all_end_animations);
                load_dialog(next_dialog_name);
            })();
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
            load_dialog(anchor + ".json");
        }
        else
        {
            load_dialog(start_dialog_name + ".json");
        }
    }
    else
    {
        load_dialog(start_dialog_name + ".json");
    }
});