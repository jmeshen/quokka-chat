app.config(function($stateProvider) {
    $stateProvider.state('contact', {
        url: '/contact',
        templateUrl: 'js/contact/contact.html',
        controller: 'ContactCtrl'
    });
});

app.controller('ContactCtrl', function($scope) {

});