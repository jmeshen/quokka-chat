app.config(function($stateProvider) {
    $stateProvider.state('allRooms', {
        url: '/rooms',
        templateUrl: 'js/rooms/allRooms.html',
        controller: 'AllRoomCtrl'

    });

    $stateProvider.state('aRoom', {
        url: '/room/:id',
        templateUrl: 'js/rooms/aRoom.html',
        controller: 'SingleRoomCtrl',
        resolve: {
            VideoObj: function(VideoFactory, $stateParams) {
                console.log('hitting the resolve')
                return VideoFactory.getVideoObjectId($stateParams.id)
                    .then(function(video) {
                        console.log('hello')
                        return video;
                    });
            }
        }
    });
});

app.controller('AllRoomCtrl', function($scope, VideoFactory) {
    console.log('hitting RoomCtrl, yo!')
    VideoFactory.getAll().then(function(videos) {
        console.log('videos??', videos)
        $scope.videos = videos;
        console.log('videos on scope?', $scope.videos)
    })
});
app.controller('SingleRoomCtrl', function($scope, VideoObj) {
    $scope.video = VideoObj;
    console.log('HITTING CONTROLLER!!!', $scope.video);
});