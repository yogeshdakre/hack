'use strict';

var getpaid = angular.module('getpaid');

getpaid.factory('surveyService', ['$rootScope', '$q', 'angularFireCollection',
    function($rootScope, $q) {
		var runningQ ={};
 	   
		$rootScope.questionInProgress={"runningQuestion":Math.floor(Math.random()*11)};
	       	   
	
	 
    return {  
    	
        	 questionair : function($scope,SURVEYURL,angularFireCollection){
        		 									var questionsmodel = new Firebase(SURVEYURL+'/questions');
        		 									$scope.questions=angularFireCollection(questionsmodel);
        							   },
        	currentQuestionR : function($scope,SURVEYURL,angularFire){
 		 									var questionsmodel = new Firebase(SURVEYURL+'/currentQuestion');
 		 									var currentQuestion= angularFire(questionsmodel,$scope,'currentQuestion',"");
 		 									console.log(currentQuestion);
 							   },
 							  
 		     userResponsesc : function($scope,SURVEYURL,angularFireCollection){
							        $scope.userResponses=[];
									var questionsmodel = new Firebase(SURVEYURL+'/userresponses');
									$scope.userResponses= angularFireCollection(questionsmodel);
									console.log($scope.userResponses);
					   },
		    loadChartData : function($scope, SURVEYURL, angularFire, angularFireCollection) {
							var chartmodel = new Firebase(SURVEYURL + "/userresponses/");
							$scope.chartmodel = chartmodel;
							$scope.userresponses = angularFireCollection(chartmodel);
							console.log($scope);
						},
						loadMapData : function($scope, SURVEYURL, angularFire, angularFireCollection) {
							var locationmodel = new Firebase(SURVEYURL + "/userresponses/");
							$scope.locationmodel = locationmodel;
							$scope.userresponses = angularFireCollection(locationmodel);
							console.log($scope);
						}
    

    	};
	}]);



