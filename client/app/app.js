var app = angular.module('sample',[]);

app.controller('demoCtrl',demoCtrl);

app.directive('keep', keep);

function demoCtrl($scope){
    $scope.myvalue = false;
    $scope.notes = [];
    $scope.index = -1;
    $scope.bgColor = "#fff";

    $scope.addToList = function(){
        if($scope.title != undefined && $scope.desc != undefined && $scope.title !="" && $scope.desc != "" && $scope.index == -1){
            $scope.notes.push({title : $scope.title, desc : $scope.desc});
        }
        else if($scope.index != -1)
        {
             if($scope.title1 != undefined && $scope.desc1 != undefined && $scope.title1 !="" && $scope.desc1 != "")
            {$scope.notes[$scope.index].title = $scope.title1;
            $scope.notes[$scope.index].desc = $scope.desc1;}
            $scope.index = -1;
            $scope.myvalue = false;
        }
        $scope.title = "";
        $scope.desc = "";
    }
}

function keep(){
    return {
        restrict: 'E',
        templateUrl : 'templates/keep.html',
        replace : true,
        link: function (scope, elem, attrs) {
            var colors = ['#EF9A9A', '#F48FB1', '#CE93D8', '#B39DDB', '#9FA8DA', '#90CAF9', '#4DB6AC', '#81C784', '#AED581', '#DCE775', '#FFF59D', '#FFCC80', '#E0E0E0', '#A1887F', '#90A4AE'];
            var color = colors[Math.floor(Math.random()*colors.length)];
            elem[0].style.backgroundColor = color;
            console.log(elem);
            scope.edit = function(indx){
                scope.$parent.myvalue = scope.$parent.myvalue== true ? false : true;
                scope.$parent.title1= scope.notes[indx].title;
                scope.$parent.desc1= scope.notes[indx].desc;
                scope.$parent.index=indx;
                scope.$parent.bgColor = color;
            }
            scope.delete = function(indx){
                scope.notes.splice(indx,1);
            }
        }
    };
}
