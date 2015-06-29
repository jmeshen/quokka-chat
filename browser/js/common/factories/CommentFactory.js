app.factory('CommentFactory', function($http) {
    var comment = {};

    comment.saveComment = function(comment) {
        console.log(comment)
        return $http.post('/api/comments/', comment).then(function(response) {
            return response.data;
        }, function(error) {
            console.log(error);
        });
    }



    return comment;
});