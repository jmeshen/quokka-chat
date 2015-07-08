app.factory('CommentFactory', function($http) {
    var comment = {};

    comment.getReplies = function(parentId) {
        return $http.get('/api/comments/' + parentId + '/response/').then(function(response) {
            return response.data;
        })
    }

    comment.saveComment = function(comment) {
        return $http.post('/api/comments/', comment).then(function(response) {
            return response.data;
        });
    }

    comment.addReply = function(commentId, reply) {
        return $http.post('/api/comments/' + commentId + '/response/', reply).then(function(response) {
            return response.data;
        });
    }

    comment.changeRating = function(commentId, rating) {
        return $http.put('/api/comments/' + commentId, rating).then(function(response) {
            return response.data;
        })
    }

    comment.removeComment = function(commentId) {
        return $http.delete('/api/comments/delete/' + commentId);
    }

    return comment;
});