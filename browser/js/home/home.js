app.config(function($stateProvider) {
  $stateProvider.state('home', {
    url: '/',
    templateUrl: 'js/home/home.html',
    controller: 'HomeCtrl'
  });
});

app.controller('HomeCtrl', function($scope, anchorSmoothScroll) {
  $scope.scrollToNext = function(eID) {
    console.log('eID?????',eID)
    anchorSmoothScroll.scrollTo(eID);
  }
  startAnimation($);
});