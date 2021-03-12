$(document).ready(function() { 
    function load_json_file(path) { 
        return $.ajax({
            url: path + "?_=" + new Date().getTime(),
            dataType: "json",
            async: false,
            success: function(data) {
                return data;
            }
        }).responseJSON;
    };

    function load_dialog(dialog_name) {

        var dialog_file = load_json_file(dialog_name);
        var default_animations_file = load_json_file("dialogs/default_animations.json");

        $('#template-content').html(tmpl('template-source', dialog_file));

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
            var next_dialog = $(this).attr('data-dialog');

            (async() => {
                await play_animations(all_end_animations);
                load_dialog(next_dialog);
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
    load_dialog("dialogs/start.json");
});