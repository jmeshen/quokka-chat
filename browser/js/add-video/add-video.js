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

        VideoFactory.getVideoByEmbedId($scope.video.embedId).then(function(video) {
            console.log(video);
            if (video) {
                $state.go('aRoom', {
                    id: video._id
                });
            } else {
                VideoFactory.add($scope.video).then(function(video) {
                    $state.go('aRoom', {
                        id: video._id
                    });
                }, function(error) {
                    console.log(error);
                });
            }
        })

    }
});