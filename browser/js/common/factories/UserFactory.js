app.factory('UserFactory', function($http) {
    return {
        createUser: function(user) {
            return $http.post("/signup", user)
                .then(function(response) {
                    return response.data;
                });
        },
        getUserById: function(id) {
            return $http.get("/" + id)
                .then(function(response) {
                    return response.data;
                });
        },
        promoteUserStatus: function(id, info) {
            return $http.put('/promote/' + id, info)
                .then(function(response) {
                    return response.data;
                })
        },
        resetUserPassword: function(id, info) {
            return $http.put('/reset/' + id, info)
                .then(function(response) {
                    return response.data;
                })
        },
        deleteUserById: function(id) {
            return $http.delete('/delete/' + id);
        }
    }
})