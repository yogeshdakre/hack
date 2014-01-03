'use strict';

angular.module('getpaid')
	.controller('teamController',
		function($scope, sgI18nService, $window, angularFire, SURVEYURL, surveyService, angularFireCollection, $q, $log, $resource, $rootScope) {
		
			console.log("In controller");
			$scope.per={"min":0,"max":100};   
			surveyService.currentQuestionR($scope,SURVEYURL,angularFire);
	}
);

