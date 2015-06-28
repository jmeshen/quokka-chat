app.config(function($stateProvider) {
    $stateProvider.state('addVideo', {
        url: '/add',
        templateUrl: 'js/add-video/add-video.html',
        controller: 'AddVideo'
    });
});

app.controller('AddVideo', function($scope, AuthService, $state, VideoFactory) {

    $scope.addVideo = function() {
        $scope.video.embedId = VideoFactory.pullIdFromUrl($scope.video.url);
        VideoFactory.add($scope.video).then(function(video) {
            console.log('what is video after add', video)
            $state.go('room.id', {
                id: video._id
            });
            console.log('why you no go?');
        }, function(error) {
            console.log(error);
        });
    }
});