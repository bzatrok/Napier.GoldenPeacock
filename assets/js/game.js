$(document).ready(function() { 
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

    function load_dialog(dialog_name) {

        window.location.href = "#" + dialog_name.replace(".json", "");

        var dialog_path = "dialogs/" + dialog_name;

        var dialog_file = load_file(dialog_path).responseJSON;
        var default_animations_file = load_file("dialogs/default_animations.json").responseJSON;
        var template_source = load_file(dialog_file["template_url"]).responseText;

        $('#template-content').html(tmpl(template_source, dialog_file));

        var default_start_animations = default_animations_file["start_animations"];
        var default_end_animations = default_animations_file["end_animations"];
        var start_animations = dialog_file["start_animations"];
        var end_animations = dialog_file["end_animations"];

        var all_start_animations = start_animations;
        var all_end_animations = end_animations;

        if (dialog_file["use_default_animations"] == true)
        {
            all_start_animations = default_start_animations.concat(start_animations);
            all_end_animations = default_end_animations.concat(end_animations);
        }

        play_animations(all_start_animations);

        $(".dialog-button").off("click");
        $(".dialog-button").click(function(e){
            e.preventDefault();
            var next_dialog_name = $(this).attr('data-dialog');

            (async() => {
                await play_animations(all_end_animations);
                load_dialog(next_dialog_name);
            })();
        });
    }

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

    if(window.location.hash) {
        var anchor = window.location.hash.substring(1); 
        load_dialog(anchor + ".json");
    }
    else
    {
        load_dialog("start.json");
    }
});