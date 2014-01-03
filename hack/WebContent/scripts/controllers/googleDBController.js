'use strict';

angular.module('getpaid')
	.controller('googleDBController',
		function($scope, sgI18nService, $window, angularFire, SURVEYURL, surveyService, angularFireCollection, $q, $log, $resource, $rootScope) {
		
		// Common
	    $scope.httpStatus = '';
	    $scope.errors = [];
	    
	    //this controller variables
	    $scope.userresponses = [];
	    
	    var map = null;
	    var locationmodel = null;
	    var firstTime = true;
	    
	    //google maps variable
	    var markersArray = [];
	    var infoWindowArray = [];
	    var markericon = new google.maps.MarkerImage("images/icon.png", null, null, new google.maps.Point(0, 24), new google.maps.Size(24, 24));
	    
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
	        $scope.clearErrors();
	    };
		
		$scope.refresh = function() {
	        $scope.reset();
	        surveyService.loadMapData($scope, SURVEYURL, angularFire, angularFireCollection);
	        
	        $("#map-div").block({
	        	message : '<img src="images/loading1.gif" width="400" height="500"/>'
	        });
	        
	        setTimeout(function() {
	        	
	        	console.log($scope.userresponses);
	        	console.log($scope.locationmodel);
	        	
	        	$scope.reloadmap();
	        	
	        	$scope.locationmodel.on('child_added', function(childSnapshot, prevChildName) {
	        		$scope.reloadmap();
	          	});
	        	
	          }, 10000);
	    };
	    
	    
	    
		$scope.reloadmap = function() {
			
			var puneCount = 0;
			var njCount = 0;
			var sanghaiCount = 0;
			var bangCount = 0;
			
//			var question1 = [0,0,0,0,0];
//			var question2 = [0,0,0,0,0];
//			var question3 = [0,0,0,0,0];
//			var question4 = [0,0,0,0,0];
//			var question5 = [0,0,0,0,0];
			
			var loc1 = [0,0,0,0,0];
			var loc2 = [0,0,0,0,0];
			var loc3 = [0,0,0,0,0];
			var loc4 = [0,0,0,0,0];
				
			for (var i = 0; i<$scope.userresponses.length; i++) {
				//chart 1
				if($scope.userresponses[i].locationname == "Pune") {
					puneCount++; 
					if($scope.userresponses[i].answer == 1){
						loc1[0] = loc1[0] + 1;
					}
					if($scope.userresponses[i].answer == 2){
						loc1[1] = loc1[1] + 1;
					}
					if($scope.userresponses[i].answer == 3){
						loc1[2] = loc1[2] + 1;
					}
					if($scope.userresponses[i].answer == 4){
						loc1[3] = loc1[3] + 1;
					}
					if($scope.userresponses[i].answer == 5){
						loc1[4] = loc1[4] + 1;
					}
				}
				if($scope.userresponses[i].locationname == "New Jersey") {
					njCount++; 
					if($scope.userresponses[i].answer == 1){
						loc2[0] = loc2[0] + 1;
					}
					if($scope.userresponses[i].answer == 2){
						loc2[1] = loc2[1] + 1;
					}
					if($scope.userresponses[i].answer == 3){
						loc2[2] = loc2[2] + 1;
					}
					if($scope.userresponses[i].answer == 4){
						loc2[3] = loc2[3] + 1;
					}
					if($scope.userresponses[i].answer == 5){
						loc2[4] = loc2[4] + 1;
					}
				}
				if($scope.userresponses[i].locationname == "Shanghai") {
					sanghaiCount++; 
					if($scope.userresponses[i].answer == 1){
						loc3[0] = loc3[0] + 1;
					}
					if($scope.userresponses[i].answer == 2){
						loc3[1] = loc3[1] + 1;
					}
					if($scope.userresponses[i].answer == 3){
						loc3[2] = loc3[2] + 1;
					}
					if($scope.userresponses[i].answer == 4){
						loc3[3] = loc3[3] + 1;
					}
					if($scope.userresponses[i].answer == 5){
						loc3[4] = loc3[4] + 1;
					}
				}
				if($scope.userresponses[i].locationname == "Banglore") {
					bangCount++;
					if($scope.userresponses[i].answer == 1){
						loc4[0] = loc4[0] + 1;
					}
					if($scope.userresponses[i].answer == 2){
						loc4[1] = loc4[1] + 1;
					}
					if($scope.userresponses[i].answer == 3){
						loc4[2] = loc4[2] + 1;
					}
					if($scope.userresponses[i].answer == 4){
						loc4[3] = loc4[3] + 1;
					}
					if($scope.userresponses[i].answer == 5){
						loc4[4] = loc4[4] + 1;
					}
				}
				
			}
			
			if(firstTime) {
				$("#map-div").unblock();
				var centerLatLong = new google.maps.LatLng(47.6000, 13.7833);
				var mapOptions = {
			  	          center: centerLatLong,
			    			//center: firstLatLong,
			  	          zoom: 3
			  	        };
			    	map = new google.maps.Map(document.getElementById("map-div"), mapOptions);
			    	firstTime = false;
			}
			
			//dynamic creation of markers and infoWindows 5 is fixed for demo
			
			//reset first
			
			if (markersArray && markersArray.length>0) {
			    for (i in markersArray) {
			      markersArray[i].setMap(null);
			    }
			    markersArray.length = 0;
			}
			
			//location 1
			var contentString1 = '<div">' +
			'<p align="left">' +
			'<b><font style="font-size:18px;color:red;">Location: Pune</font></b>' +
			'&nbsp;&nbsp;&nbsp;<img border="0" valign="middle" src="images/sungard_logo.png" style="height:50px; width:50px;"><br>' +
			'<hr size="1" color="#dddddd" style="width:50px">' +
			'Total participations: <b>'+puneCount+'</b> <br>Strongly Disagree: '+loc1[0]+' <br>Disagree: '+ loc1[1] + '<br>Neutral: ' + loc1[2] + '<br>Strongly Agree: ' + loc1[3] + '<br>Agree: ' + loc1[4] + '<br>'+
			'</p></div>' ;
			
			//let us create marker with infoWindow
			var infowindow1 = new google.maps.InfoWindow({
			    content: contentString1
			});

			var marker1 = new google.maps.Marker({
			    position: new google.maps.LatLng(18.5203, 73.8567),
			    map: map,
			    title: "Pune",
			    icon: markericon,
			    shadow: null,
			    optimized: false
			});

			google.maps.event.addListener(marker1, 'click', function() {
			  infowindow1.open(map,marker1);
			});
			//ends here
			
			
			
			//location 2
			var contentString2 = '<div">' +
			'<p align="left">' +
			'<b><font style="font-size:18px;color:red;">Location: New Jersey</font></b>' +
			'&nbsp;&nbsp;&nbsp;<img border="0" valign="middle" src="images/sungard_logo.png" style="height:50px; width:50px;"><br>' +
			'<hr size="1" color="#dddddd" style="width:50px">' +
			'Total participations: <b>'+njCount+'</b> <br>Strongly Disagree: '+loc2[0]+' <br>Disagree: '+ loc2[1] + '<br>Neutral: ' + loc2[2] + '<br>Strongly Agree: ' + loc2[3] + '<br>Agree: ' + loc2[4] + '<br>'+
			'</p></div>' ;
			
			//let us create marker with infoWindow
			var infowindow2 = new google.maps.InfoWindow({
			    content: contentString2
			});

			var marker2 = new google.maps.Marker({
			    position: new google.maps.LatLng(40.0000, -74.5000),
			    map: map,
			    title: "New Jersey",
			    icon: markericon,
			    shadow: null,
			    optimized: false
			});

			google.maps.event.addListener(marker2, 'click', function() {
			  infowindow2.open(map,marker2);
			});
			//ends here
			
			
			//location 3
			var contentString3 = '<div">' +
			'<p align="left">' +
			'<b><font style="font-size:18px;color:red;">Location: Shanghai</font></b>' +
			'&nbsp;&nbsp;&nbsp;<img border="0" valign="middle" src="images/sungard_logo.png" style="height:50px; width:50px;"><br>' +
			'<hr size="1" color="#dddddd" style="width:50px">' +
			'Total participations: <b>'+sanghaiCount+'</b> <br>Strongly Disagree: '+loc3[0]+' <br>Disagree: '+ loc3[1] + '<br>Neutral: ' + loc3[2] + '<br>Strongly Agree: ' + loc3[3] + '<br>Agree: ' + loc3[4] + '<br>'+
			'</p></div>' ;
			
			//let us create marker with infoWindow
			var infowindow3 = new google.maps.InfoWindow({
			    content: contentString3
			});

			var marker3 = new google.maps.Marker({
			    position: new google.maps.LatLng(31.2000, 121.5000),
			    map: map,
			    title: "Shanghai",
			    icon: markericon,
			    shadow: null,
			    optimized: false
			});

			google.maps.event.addListener(marker3, 'click', function() {
			  infowindow3.open(map,marker3);
			});
			//ends here

			
			
			//location 4
			var contentString4 = '<div">' +
			'<p align="left">' +
			'<b><font style="font-size:18px;color:red;">Location: Bangalore</font></b>' +
			'&nbsp;&nbsp;&nbsp;<img border="0" valign="middle" src="images/sungard_logo.png" style="height:50px; width:50px;"><br>' +
			'<hr size="1" color="#dddddd" style="width:50px">' +
			'Total participations: <b>'+bangCount+'</b> <br>Strongly Disagree: '+loc4[0]+' <br>Disagree: '+ loc4[1] + '<br>Neutral: ' + loc4[2] + '<br>Strongly Agree: ' + loc4[3] + '<br>Agree: ' + loc4[4] + '<br>'+
			'</p></div>' ;
			
			//let us create marker with infoWindow
			var infowindow4 = new google.maps.InfoWindow({
			    content: contentString4
			});

			var marker4 = new google.maps.Marker({
			    position: new google.maps.LatLng(12.9667, 77.5667),
			    map: map,
			    title: "Bangalore",
			    icon: markericon,
			    shadow: null,
			    optimized: false
			});

			google.maps.event.addListener(marker4, 'click', function() {
			  infowindow4.open(map,marker4);
			});
			//ends here
			
			
			markersArray.push(marker1);
			markersArray.push(marker2);
			markersArray.push(marker3);
			markersArray.push(marker4);
			
			
			if (markersArray && markersArray.length>0) {
				for (i in markersArray) {
			      markersArray[i].setMap(map);
			      //trigger click event to open infowindow as well
			      google.maps.event.trigger(markersArray[i], 'click');
			    }
			 }
			
			
			
			
			
			
			
			
			
			
			
			
			
		};
		    	
			 $scope.refresh();
				
				
		}
	);
