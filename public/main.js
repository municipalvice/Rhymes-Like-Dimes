var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// const doom_videos = [
//     {
//         shortCode:"CRHyBwNtkLA",
//         songName:"Doomsday",
//     },{
//         shortCode: "rpaonSDPw7Y",
//         songName: "Accordion"
//     }, {
//         shortCode:"Pb1E5XNheqw",
//         songName:"Questions"
//     }
// ];

var player;

function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        videoId: 'CRHyBwNtkLA',
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        }
    });
}


var done = false;

function onPlayerStateChange(event){
    if (event.data == YT.PlayerState.PLAYING && !done){
        setTimeout(stopVideo, 6000);
        done = true;
    }
}

function onPlayerReady() {
    event.target.playVideo()
}

function stopVideo() {
    player.stopVideo();
}