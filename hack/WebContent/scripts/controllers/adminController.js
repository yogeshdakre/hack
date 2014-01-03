'use strict';

angular.module('getpaid')
	.controller('adminController',
		function($scope, sgI18nService, $window, angularFire, SURVEYURL, surveyService, angularFireCollection, $q, $log, $resource, $rootScope) {
		
		  // Common
	    $scope.httpStatus = '';
	    $scope.errors = [];
	    // Questions
	    $scope.questions = [];
	    $scope.userResponses = [];
	    $scope.question = {};
	    $scope.radioSeletion = [];
	    $scope.surveyOptions = [
	    		  {	"lable" : "Strongly Disagree" , "key": "1"},
		    	  {	"lable" : "Disagree" , "key": "2"},
		    	  {	"lable" : "Neutral" , "key": "3"},
		    	  {	"lable" : "Agree" , "key": "4"},
		    	  {	"lable" : "Strongly Agree" , "key": "5"}
		    	 	
				];	    
	    $scope.locations = ["Pune" ,"New Jersey" ,"Shanghai" ,"Banglore"];
	    

	    $scope.processErrors = function(response) {
	        $scope.clearErrors();

	        $scope.httpStatus = response.status;
	        response.data.forEach(function(error) {
	            $scope.errors.push({path:error.path, message:error.message});
	        });
	    };

	    $scope.clearErrors = function() {
	        $scope.httpStatus = '';
	        $scope.errors = [];
	    };

	    $scope.reset = function() {
	        $scope.contact = {};
	        $scope.searchValue = '';

	        $scope.clearErrors();
	    };

	    $scope.refresh = function() {
	        $scope.reset();
	        surveyService.questionair($scope,SURVEYURL,angularFireCollection);
	        surveyService.userResponsesc($scope,SURVEYURL,angularFireCollection);
	        console.log($scope.userResponses);
	    };

	  
	    $scope.save = function(array, question) {
	    		array.add({questionid:array.length+1,questiontxt:question});
	    };
	    
	    $scope.addQuestion = function() {
	        console.log($scope.questiontxt);
	        $scope.save($scope.questions, $scope.questiontxt);

	    };
	    
	    
	    // Search

	    $scope.searchType = 'Question';
	    $scope.searchValue = '';

	    $scope.searchIcon = 'user';
	    $scope.searchCollapse = true;

	    $scope.changeSearchType = function(type) {
	        $scope.searchType = type;
	        $scope.searchCollapse = true;
	    };

	    
	    //survey
	    $scope.update=function(){
	    	   console.log($scope.questions);
	    };
	    
	    
	    $scope.selected = [];
	    $scope.isShown = function(question) {
		var rad=$.inArray(question.questionid, $scope.selected);
	          return rad != -1;
	    }
	    
	    $scope.recordAnswer = function(	question,consent) {
	    	
	    	var donotchange=false;
	    	var selected=$.inArray(consent, ["0","1","2","3","4","5"]);
	    	
	    	if(selected==-1){
	    		   donotchange=true;
	    		    $scope.processErrors({status:400,data:[{message:"Please select the inline Agree or Disagree radio button"},{message:question.question}]});
	    	     }
	    	 
	    	 if(!donotchange)
	    		 {			    				    	 
	    		 	$scope.selected.push(question.questionid);
			        var randomIndex = Math.floor(Math.random() * $scope.locations.length); 
			       
			    	 $scope.userResponses.add({answer:selected,questionid:question.questionid,userid:1,locationname:$scope.locations[randomIndex]});
			        console.log(question);
			       // $scope.update();
	    	}
	    };
	    
	    // Refresh
	    $scope.refresh();
	}
);

