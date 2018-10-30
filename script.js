var url_on = "https://wind-bow.glitch.me/twitch-api/streams/";
var url_off = "https://wind-bow.glitch.me/twitch-api/";
var channels = [
  "ESL_SC2",
  "OgamingSC2",
  "cretetion",
  "freecodecamp",
  "storbeck",
  "habathcx",
  "RobotCaleb",
  "noobs2ninjas"
];
var streaming = 0;
var channels_api = " ";
var placeholder_img =
  "http://static-cdn.jtvnw.net/jtv_user_pictures/xarth/404_user_150x150.png";

function twitch() {

  for (var i = 0; i < channels.length; i++) {
    $.ajax({
      url: url_on + channels[i] + "?callback=?",
      dataType: "json",
      success: function callback(data) {
        if (data.stream !== null) {
          streaming++;
          $(".main").append(
            "<div class='channel_on'><img class='logo' src =" +
              data.stream.channel.logo +
              " /><a href=" +
              data.stream.channel.url +
              " target='_blank'><h3>" +
              data.stream.channel.display_name +
              "</h3></a>" +
              "<p class='info'>" +
              data.stream.game +
              " - " +
              data.stream.viewers +
              " viewers</p><p class='status'>online</p></div>"
          );
        } else if (data.stream === null) {
          //if
          channels_api = data._links.channel.slice(28);
          $.ajax({
            url: url_off + channels_api + "?callback=?",
            dataType: "json",
            success: function callback(data) {
              if (data.logo === null) {
                data.logo = placeholder_img;
                $(".main").append(
                  "<div class='channel_off'><img class='logo' src =" +
                    data.logo +
                    " /><a href=" +
                    data.url +
                    " target='_blank'><h3>" +
                    data.display_name +
                    "</h3></a>" +
                    "<p class='info'>" +
                    data.views +
                    " - total viewers</p><p class='status'>offline</p></div>"
                );
              } else {
                $(".main").append(
                  "<div class='channel_off'><img class='logo' src =" +
                    data.logo +
                    " /><a href=" +
                    data.url +
                    " target='_blank'><h3>" +
                    data.display_name +
                    "</h3></a>" +
                    "<p class='info'>" +
                    data.views +
                    " - total viewers</p><p class='status'>offline</p></div>"
                );
              }
            } //success
          });
        }
      }
    }); //ajax
  } //loop
} //function

twitch();
