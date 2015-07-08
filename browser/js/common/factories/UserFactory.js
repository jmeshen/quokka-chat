app.factory('UserFactory', function($http) {
    return {
        createUser: function(user) {
            return $http.post("/signup", user)
                .then(function(response) {
                    return response.data;
                });
        },
        getUserByEmail: function(email) {
            return $http.get('/api/users/userEmail/' + email)
                .then(function(response) {
                    return response.data;
                });
        },
        getUserById: function(id) {
            return $http.get("/api/users/" + id)
                .then(function(response) {
                    return response.data;
                });
        },
        promoteUserStatus: function(id, info) {
            return $http.put('/api/users/promote/' + id, info)
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