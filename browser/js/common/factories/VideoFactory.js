app.factory('VideoFactory', function($http, $rootScope) {
    var video = {};

    var player;

    video.onYouTubeIframeAPIReady = function(newVideo) {
        player = new YT.Player('player', {
            height: '390',
            width: '640',
            videoId: newVideo,
            events: {
                'onReady': onPlayerReady,
                'onStateChange': onPlayerStateChange
            }
        });
    }

    function onPlayerReady(event) {
        $rootScope.$emit('duration', event.target)
        event.target.pauseVideo();
    }

    function onPlayerStateChange(event) {
        console.log('changed')
        $rootScope.$emit('status', event.target.getPlayerState())
    }

    video.getAll = function() {
        return $http.get('/api/video/').then(function(response) {
            return response.data;
        })
    }

    video.pauseVid = function() {
        player.pauseVideo();
    }

    video.getCurTime = function() {
        var curTime = player.getCurrentTime();
        return curTime;
    }

    video.pullIdFromUrl = function(url) {
        url = url.split('')
        if (url.indexOf('=') > -1) {
            return url.slice((url.indexOf('=') + 1)).join('');
        } else {
            return url.slice((url.indexOf('.') + 4)).join('');
        }
    }

    video.getVidsByTag = function(tag) {
        return $http.get('/api/video/tag/' + tag).then(function(response) {
            return response.data;
        })
    }

    video.getVideoObjectId = function(objectId) {
        return $http.get('/api/video/' + objectId).then(function(videoObj) {
            return videoObj.data
        })
    }

    video.add = function(newVideo) {
        return $http.post('api/video/', newVideo).then(function(response) {
            return response.data;
        }, function(error) {
            console.log(error);
        });
    }

    video.addCommentToVid = function(comment, videoId) {
        return $http.put('/api/video/' + videoId, comment).then(function(response) {
            return;
        }, function(error) {
            console.log(error);
        })
    }

    return video;
});