$(document).ready(function() { 

    var preloadedImages = [];
    var preloadedJSON = [];

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

    // var jsonUrlList = [
    //     "dialogs/start.json",
    //     "dialogs/about.json",
    //     "dialogs/0_end_lame.json",
    //     "dialogs/01a_street_01.json",
    //     "dialogs/01a_street_02.json",
    //     "dialogs/01b_office_01.json",
    //     "dialogs/01b_office_02.json",
    //     "dialogs/01b_office_03.json",
    //     "dialogs/01b_office_04.json",
    //     "dialogs/02a_tomorrow_01.json",
    //     "dialogs/02a_tomorrow_02.json",
    //     "dialogs/02a_tomorrow_03.json",
    //     "dialogs/02b_study_01.json",
    //     "dialogs/02b_study_02.json",
    //     "dialogs/02c_client_01.json",
    //     "dialogs/02c_client_01a.json",
    //     "dialogs/02c_client_01b.json",
    //     "dialogs/02c_client_01c.json",
    //     "dialogs/02c_client_01d.json",
    //     "dialogs/03a_accepted_01.json",
    //     "dialogs/03a_friends_01.json",
    //     "dialogs/03a_pub_01.json",
    //     "dialogs/03a_pub_02.json",
    //     "dialogs/03a_pub_03.json",
    // ];

    //Preload image assets to avoid layout jumps
    function preload_images_assets()
    {
        imageUrlList.forEach(function(imageUrl) {
            var newImage = new Image();
            newImage.src = imageUrl;
            preloadedImages.push(newImage);
        });
    }

    //Preload image assets to avoid layout jumps
    // function preload_json_assets()
    // {
    //     jsonUrlList.forEach(function(jsonUrl) {
    //         var loadedJSON = load_file(jsonUrl);
    //         preloadedJSON.push(loadedJSON);
    //     }); 
    // }

    preload_images_assets();
    // preload_json_assets();
});