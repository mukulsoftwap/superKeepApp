var app = angular.module('sample',['ngRoute']);

app.controller('demoCtrl',demoCtrl);
app.controller('loginCtrl',loginCtrl);
app.controller('registerCtrl', registerCtrl);

app.config(route);

app.directive('keep', keep);


function route($routeProvider){
    $routeProvider
    .when('/login', {
        templateUrl: 'templates/login.html',
        controller: 'loginCtrl'
    })
    .when('/register', {
        templateUrl: 'templates/signup.html',
        controller: 'registerCtrl'
    })
    .when('/user', {
        templateUrl: 'templates/user.html',
        controller: 'demoCtrl'
    })
    .otherwise({ redirectTo: '/login' })
}

function loginCtrl($scope,$http, $location){

    if(localStorage.getItem('token') != null &&  localStorage.getItem('token')!="")
        $location.path('/user');

    $scope.signIn = function(){
        $http.post('http://127.0.0.1:3000/v1/auth/signin',$scope.user).then(function(res){
            localStorage.setItem('token', res.data.data.token);
            localStorage.setItem('userId', res.data.data.user.id);
            $location.path('/user');
        });
    }

    $scope.register = function(){
        $location.path('/register');
    }

}

function registerCtrl($scope, $http, $location){

    $scope.signup = function(){
        $http.post('http://127.0.0.1:3000/v1/auth/signup',$scope.user).then(function(res){
            localStorage.setItem('token',res.data.data.token);
            localStorage.setItem('userId', res.data.data.user.id);
            $location.path('/user');
        })
    }
}

function demoCtrl($scope, $http, $location){

    $scope.myvalue = false;
    $scope.notes = [];
    $scope.bgColor = "#fff";
    var userId = localStorage.getItem('userId');

    if(localStorage.getItem('token') == null || localStorage.getItem('token')=="")
        $location.path('/login');

    $scope.signOut = function(){
        localStorage.clear('token');
        $location.path('/login');
    }

    refresh();

    $scope.addToList = function(){
        if($scope.title != undefined && $scope.desc != undefined && $scope.title !="" && $scope.desc != ""){
            var colors = ['#EF9A9A', '#F48FB1', '#CE93D8', '#B39DDB', '#9FA8DA', '#90CAF9', '#4DB6AC', '#81C784', '#AED581', '#DCE775', '#FFF59D', '#FFCC80', '#E0E0E0', '#A1887F', '#90A4AE'];
            var data = {
                title : $scope.title, 
                desc : $scope.desc,
                color : colors[Math.floor(Math.random()*colors.length)],
                userId : userId
            };
            console.log(data);
            $http.post('http://127.0.0.1:3000/v1/keeps', data).then(function(res){
                refresh();
            })
        }
        $scope.title = "";
        $scope.desc = "";
    }

    $scope.delete = function(id){
        $http.delete('http://127.0.0.1:3000/v1/keeps/'+id).then(function(res){
            refresh();
        })
    }

    $scope.editDone = function(){
        if($scope.title1 != undefined && $scope.desc1 != undefined && $scope.title1 !="" && $scope.desc1 != ""){
            var finalObj = {
                title : $scope.title1, 
                desc : $scope.desc1,
                color : $sceope.bgColor
            }
            $http.put('http://127.0.0.1:3000/v1/keeps/'+$scope.id, finalObj).then(function(res){
                refresh();
            })
            $scope.myvalue = false;
        }
    }

    $scope.edit = function(indx){
        $scope.myvalue = $scope.myvalue== true ? false : true;
        $scope.title1= $scope.notes[indx].title;
        $scope.desc1= $scope.notes[indx].desc;
        $scope.bgColor = $scope.notes[indx].color;
        $scope.id = $scope.notes[indx].id;
    }

    function refresh(){
        console.log("content loaded...");
        $http.get('http://127.0.0.1:3000/v1/keeps/getUserKeep/'+userId).then(function(res){
            $scope.notes = res.data.data;
            console.log(res);
        })
    }
}

function keep(){
    return {
        restrict: 'E',
        templateUrl : 'templates/keep.html',
        replace : true,
        link: function (scope, elem, attrs) {
            // scope.edit = function(indx){
            //     scope.$parent.myvalue = scope.$parent.myvalue== true ? false : true;
            //     scope.$parent.title1= scope.notes[indx].title;
            //     scope.$parent.desc1= scope.notes[indx].desc;
            //     scope.$parent.index=indx;
            //     scope.$parent.bgColor = color;
            // }
            // scope.delete = function(indx){
            //     scope.notes.splice(indx,1);
            // }
        }
    };
}
