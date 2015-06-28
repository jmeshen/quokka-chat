app.factory('CommentFactory', function($http) {
    var comment = {};

    comment.saveComment = function(comment) {
        return $http.post('/api/comments/:videoId').then(function(response) {
            console.log('response from add comment', response);
            return response.data;
        }, function(error) {
            console.log(error);
        });
    }

    return comment;
});