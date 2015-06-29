app.factory('VideoFactory', function($http) {
    var video = {};

    var player;

    video.onYouTubeIframeAPIReady = function(newVideo) {
        player = new YT.Player('player', {
            height: '390',
            width: '640',
            videoId: newVideo,
            events: {
                'onReady': onPlayerReady,
                //'onStateChange': onPlayerStateChange
            }
        });
        // console.log(newVideo, "this is new video");
        // console.log(player, "this is the player");
    }

    function onPlayerReady(event) {
        event.target.pauseVideo();
    }

    video.pauseVid = function() {
        player.pauseVideo();
    }

    video.getCurTime = function() {
        console.log('THIS BE PLAYER, YO', player)
        var curTime = player.getCurrentTime();
        console.log(curTime);
        return curTime;
    }

    video.pullIdFromUrl = function(url) {
        url = url.split('')
        if (url.indexOf('=')) {
            return url.slice((url.indexOf('=') + 1)).join('');
        } else {
            return url.slice((url.indexOf('.') + 4)).join('');
        }
    };

    video.getVideoObjectId = function(objectId) {
        return $http.get('/api/video/' + objectId).then(function(videoObj) {
            console.log('getting video from objectId', videoObj.data)
            return videoObj.data
        })
    }

    video.add = function(newVideo) {
        return $http.post('api/video/', newVideo).then(function(response) {
            console.log('what is response? from add', response)
            return response.data;
        }, function(error) {
            console.log(error);
        });
    }

    return video;
});