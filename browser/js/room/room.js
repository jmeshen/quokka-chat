app.config(function($stateProvider) {
    $stateProvider.state('room', {
        url: '/room',
        templateUrl: 'js/room/room.html'
    });
    $stateProvider.state('room.id', {
        url: '/:id',
        templateUrl: 'js/room/room.html',
        controller: 'RoomggggfCtrl',
        resolve: {
            VidObj: function (VideoFactory, $stateParams) {
                return VideoFactory.getVideoObjectId($stateParams.id).then(function(video) {
                        return video;
                });
            }
        }
    });
});

app.controller('RoomCtrl', function($scope, VidObj) {
        $scope.video = VidObj;
});
