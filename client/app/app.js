var app = angular.module('sample',[]);

app.controller('demoCtrl',demoCtrl);

app.directive('keep', keep);

function demoCtrl($scope, $http){

    $scope.myvalue = false;
    $scope.notes = [];
    $scope.bgColor = "#fff";

    refresh();

    $scope.addToList = function(){
        if($scope.title != undefined && $scope.desc != undefined && $scope.title !="" && $scope.desc != ""){
            var colors = ['#EF9A9A', '#F48FB1', '#CE93D8', '#B39DDB', '#9FA8DA', '#90CAF9', '#4DB6AC', '#81C784', '#AED581', '#DCE775', '#FFF59D', '#FFCC80', '#E0E0E0', '#A1887F', '#90A4AE'];
            var data = {
                title : $scope.title, 
                desc : $scope.desc,
                color : colors[Math.floor(Math.random()*colors.length)]
            };
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
                color : $scope.bgColor
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
        $http.get('http://127.0.0.1:3000/v1/keeps').then(function(res){
            $scope.notes = res.data.data;
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
