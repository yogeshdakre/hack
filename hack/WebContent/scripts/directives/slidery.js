var getpaid = angular.module('getpaid');

getpaid.directive('slidery', function() {
	return {
	    
        restrict:'E',

        link:function($scope,element,attrs)
		{
		      element.slider(
		      {
		        range: true,
		        min: 0,
		        max: 100,
		        values: [ 0, 10],
		        step: 1,
		        slide: function( event, ui ) {
		        	 $scope.per={"min":ui.values[0],"max":ui.values[1]};
		        	 $scope.$apply();
		        	}
			      		    	
		       });
		}
	};
});
