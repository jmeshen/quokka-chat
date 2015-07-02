// app.directive('grandChildren', function(AuthService, AUTH_EVENTS, $state, VideoFactory, CommentFactory) {
//     return {
//         restrict: 'E',
//         scope: {
//             parent: '=',
//             grandChildren: '='
//         },
//         transclude: true,
//         templateUrl: 'js/common/directives/grandchildren/grandchildren.html',
//         link: function(scope) {

//             console.log('THIS IS SCOPE.PARENT', scope.parent);

//             scope.grandChild = {
//                 parent: scope.parent._id
//             }

//             var user = AuthService.getLoggedInUser().then(function(user) {
//                 scope.grandChild.userId = user._id;
//             });

//             scope.reply = function() {
//                 user.then(function() {
//                     return CommentFactory.addReply(scope.grandChild.parent, scope.grandChild);
//                 }).then(function(child) {
//                     console.log('THIS IS CHILD', child);
//                     scope.grandChildren.push(child);
//                     scope.grandChild = null;
//                 }).catch(console.log);
//             }
//         }
//     }
// })