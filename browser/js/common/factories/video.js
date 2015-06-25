app.factory('VideoFactory', function($http) {
    var video = {};

    video.pullIdFromUrl = function(url) {
        url = url.split('')
        if (url.indexOf('=')) {
            return url.slice((url.indexOf('=') + 1)).join('');
        } else {
            return url.slice((url.indexOf('.') + 4)).join('');
        }
    };

    video.getVideoObjectId = function(objectId) {
        return $http.get('/api/video/' + objectId).then(function(video) {
            return video.data
        })
    }

    video.add = function(newVideo) {
        return $http.post('api/video/', newVideo).then(function(response) {
            return response.data;
        }, function(error) {
            console.log(error);
        });
    }

    return video;
});