var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

$( "#tabs" ).tabs({
    beforeLoad: function( event, ui ) {
        createIframe('1', 'nIHq1MtJaKs')
    }
  });

$(".accordion").accordion({
    collapsible: true
})

let player = { stopVideo: () => true }

function createIframe(tagId, videoId) {
    player.stopVideo()
    getVideoFromApi(tagId, videoId)
}

function getVideoFromApi(numberOfTagId, videoId) {
    function onYouTubeIframeAPIReady() {
        player = new YT.Player(`video-${numberOfTagId}`, {
            height: '360',
            width: '640',
            videoId: videoId,
            events: {
                'onReady': function onPlayerReady(event) {
                    player = event.target
                    createAccordion(numberOfTagId, event)
                  }
            }
        })
    }

    onYouTubeIframeAPIReady()
}

function createAccordion(tabOrder, event) {
    let minutes = Math.floor(event.target.getDuration()/60)
    let seconds = event.target.getDuration() - minutes*60

    $(`#video-${tabOrder}-name`).text(`${event.target.getVideoData().title}`)
    $(`#video-${tabOrder}-channel`).text("Curso em vídeo")
    $(`#video-${tabOrder}-duration`).text(`${minutes}:${seconds}`)
    $(`#video-${tabOrder}-url`).text(`${event.target.getVideoUrl()}`)
}