app.config(function($stateProvider) {
    $stateProvider.state('allRooms', {
        url: '/rooms',
        templateUrl: 'js/rooms/allRooms.html',
        controller: 'AllRoomCtrl'
    });
});

app.controller('AllRoomCtrl', function($scope, VideoFactory, $state) {
    VideoFactory.getAll().then(function(videos) {
        $scope.videos = videos;
    })

    $scope.deleteVideo = function(vidId, $event) {
        $event.stopPropagation();
        VideoFactory.removeVideo(vidId).then(function() {
            return VideoFactory.getAll();
        }).then(function(videos) {
            $scope.videos = videos;
        })
    }

    $scope.whichTag;

    $scope.searchVidsByTag = function(tag) {
        VideoFactory.getVidsByTag(tag).then(function(videos) {
            $scope.videos = videos;
        })
    }
});