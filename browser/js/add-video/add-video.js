app.config(function($stateProvider) {
    $stateProvider.state('addVideo', {
        url: '/add',
        templateUrl: 'js/add-video/add-video.html',
        controller: 'AddVideo'
    });
});

app.controller('AddVideo', function($scope, AuthService, $state, VideoFactory) {

    $scope.addVideo = function() {
        var embedId = VideoFactory.pullIdFromUrl($scope.video.url);
        VideoFactory.add({
            url: $scope.video.url,
            embedId: embedId
        }).then(function(video) {
            $state.go('room.id', {
                id: video._id
            });
        }, function(error) {
            console.log(error);
        });
    }
});