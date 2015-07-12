app.config(function($stateProvider) {
    $stateProvider.state('aRoom', {
        url: '/room/:id',
        templateUrl: 'js/rooms/aRoom.html',
        controller: 'SingleRoomCtrl',
        resolve: {
            VideoObj: function(VideoFactory, $stateParams) {
                return VideoFactory.getVideoObjectId($stateParams.id)
                    .then(function(video) {
                        return video;
                    });
            },
            user: function(AuthService) {
                return AuthService.getLoggedInUser().then(function(user) {
                    return user
                })
            }
        }
    });
});



app.controller('SingleRoomCtrl', function($scope, $rootScope, user, VideoObj, CommentFactory, VideoFactory, AuthService, Socket) {
    //declaration of scope variables
    $scope.user = user
    $scope.video = VideoObj;
    $scope.clicked = false;
    $scope.comments = VideoObj.comments.sort(function(a, b) {
        if (a.videoTime < b.videoTime) return -1
        else if (a.videoTime > b.videoTime) return 1
        else return 0
    })
    $scope.oneAtATime = true;
    $scope.displayComments = []
    $scope.clicked = false;
    $scope.display = false;
    $scope.empty = true
    var refresher;
    ///////////////////////////////////////////////////////////////////////
    //declaration of local functions

    $scope.refreshDisplay = function(num) {
        var x = Math.floor(num / 5)
        $scope.displaying = $scope.displayComments[x]
        if (!$scope.displaying) $scope.displaying = []
        if ($scope.displaying.length === 0) $scope.empty = true
        else $scope.empty = false
        $scope.$apply()

    }
    $scope.changeInterval = function(number) {
        var bucket = 0
        for (var i = 0; i < $scope.comments.length; i++) {
            if (!$scope.displayComments[bucket]) $scope.displayComments[bucket] = []
            if ((Math.floor($scope.comments[i].videoTime / number) === bucket)) {
                $scope.displayComments[bucket].push($scope.comments[i])
            } else {
                i--
                bucket += 1
            }
        }

        $scope.refreshDisplay(0)
    }
    $scope.changeInterval(5)

    //declaration of event emitters
    $rootScope.$on('duration', function(event, player) {
        $scope.duration = player.getDuration()
    })

    $rootScope.$on('status', function(event, player) {
        if (player.getPlayerState() === 1) {
            window.clearInterval(refresher)
            refresher = window.setInterval(function() {
                $rootScope.$emit('playing', player.getCurrentTime())
            }, 1000)
        } else if (player.getPlayerState() === 3) {
            $scope.refreshDisplay(player.getCurrentTime())
        } else {
            window.clearInterval(refresher)
            refresher = undefined
        }
    })

    $rootScope.$on('playing', function(event, currentTime) {
        $scope.refreshDisplay(currentTime)

    })
    ///////////////////////////////////////////////////////////////////////////

    Socket.on('post', function(SockComment) {
        var bucket = Math.floor(SockComment.videoTime / 5)
        $scope.displayComments[bucket].push(SockComment)
    })

    //////////////////////////////////////////////////////////////////////////


    $scope.showForm = function() {
        $scope.clicked = true;
        VideoFactory.pauseVid();
    };

    $scope.hideForm = function() {
        $scope.clicked = false
        $scope.comment = null
    }
    $scope.getReplies = function(parent) {
        CommentFactory.getReplies(parent._id).then(function(replies) {
            replies = replies.sort(function(a, b) {
                return parseInt(b.rating.score) - parseInt(a.rating.score);
            });
            $scope.children = replies;
        });
    }

    $scope.addingComment = function(comment) {
        comment = {
            user: $scope.user._id,
            username: $scope.user.username,
            title: $scope.comment.title,
            videoTime: VideoFactory.getCurTime(),
            content: $scope.comment.content,
            tags: $scope.comment.tags
        }
        CommentFactory.saveComment(comment).then(function(comment) {
            VideoFactory.addCommentToVid(comment, $scope.video._id).then(function(video) {
                $scope.comments = video.comments;
                $scope.displaying.push(comment)
                $scope.comment = null
                Socket.emit('comment', comment)
            }).catch(console.log);
        });
        $scope.hideForm();
        $scope.empty = false
    }
});