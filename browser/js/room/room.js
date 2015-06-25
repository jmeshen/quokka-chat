app.config(function($stateProvider) {
    $stateProvider.state('room', {
        url: '/room',
        templateUrl: 'js/room/room.html'
    });
    $stateProvider.state('room.id', {
        url: '/:id',
        templateUrl: 'js/room/room.html'
    });
});

app.controller('RoomCtrl', function($scope, $stateParams, VideoFactory) {
    $scope.video = VideoFactory.getVideoObjectId($stateParams.id)
    // $scope.embedId = VideoFactory.pullIdFromUrl($scope.video.url)
    console.log('this my embedId', $scope.video.embedId)
})