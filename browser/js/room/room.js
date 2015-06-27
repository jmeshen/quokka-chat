app.config(function($stateProvider) {
    $stateProvider.state('room', {
        url: '/room',
        templateUrl: 'js/room/room.html',
        controller: 'RoomCtrl'

    });

    $stateProvider.state('room.id', {
        url: '/:id',
        templateUrl: 'js/room/roomChild.html',
        controller: 'ChildCtrl',
        resolve: {
            VideoObj: function(VideoFactory, $stateParams) {
                return VideoFactory.getVideoObjectId($stateParams.id)
                    .then(function(video) {
                        console.log('hello')
                        return video;
                    });
            }
        }
    });
});

app.controller('RoomCtrl', function($scope) {
    console.log('hitting RoomCtrl, yo!')
});
app.controller('ChildCtrl', function($scope, VideoObj) {
    $scope.video = VideoObj;
    console.log('HITTING CONTROLLER!!!', $scope.video);
});