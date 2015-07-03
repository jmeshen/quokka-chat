'use strict';
window.app = angular.module('FullstackGeneratedApp', ['ui.router', 'ui.bootstrap', 'fsaPreBuilt', 'ngTagsInput']);

app.config(function($urlRouterProvider, $locationProvider) {
    // This turns off hashbang urls (/#about) and changes it to something normal (/about)
    $locationProvider.html5Mode(true);
    // If we go to a URL that ui-router doesn't have registered, go to the "/" url.
    $urlRouterProvider.otherwise('/');
});

app.filter('secondsToDateTime', [

    function() {
        return function(seconds) {
            var hours;
            var minutes = Math.floor(seconds / 60);
            if (minutes >= 60) {
                hours = Math.floor(minutes / 60);
                minutes -= (hours * 60);
                if (String(minutes).length < 2) {
                    minutes = '0' + minutes;
                }
            }

            seconds = seconds % 60;
            if (String(seconds).length < 2) {
                seconds = '0' + seconds;
            }
            var time = (hours ? String(hours) + ':' : '') + minutes + ':' + seconds;
            return time.toString();
        };
    }
]);

// This app.run is for controlling access to specific states.
app.run(function($rootScope, AuthService, $state) {

    // The given state requires an authenticated user.
    var destinationStateRequiresAuth = function(state) {
        return state.data && state.data.authenticate;
    };

    // $stateChangeStart is an event fired
    // whenever the process of changing a state begins.
    $rootScope.$on('$stateChangeStart', function(event, toState, toParams) {

        if (!destinationStateRequiresAuth(toState)) {
            // The destination state does not require authentication
            // Short circuit with return.
            return;
        }

        if (AuthService.isAuthenticated()) {
            // The user is authenticated.
            // Short circuit with return.
            return;
        }

        // Cancel navigating to new state.
        event.preventDefault();

        AuthService.getLoggedInUser().then(function(user) {
            // If a user is retrieved, then renavigate to the destination
            // (the second time, AuthService.isAuthenticated() will work)
            // otherwise, if no user is logged in, go to "login" state.
            if (user) {
                $state.go(toState.name, toParams);
            } else {
                $state.go('login');
            }
        });

    });

});