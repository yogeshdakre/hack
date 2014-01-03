'use strict';

angular.module('getpaid')
	.controller('graphDBController',
		function($scope, sgI18nService, $window, angularFire, SURVEYURL, surveyService, angularFireCollection, $q, $log, $resource, $rootScope) {
		
		// Common
	    $scope.httpStatus = '';
	    $scope.errors = [];
	    
	    //this controller variables
	    $scope.userresponses = [];
	    var firstTime = true;
	    var chartmodel = null;
	    
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
	        surveyService.loadChartData($scope, SURVEYURL, angularFire, angularFireCollection);
	        
	        $("#container1").block({
	        	message : '<img src="images/loading1.gif" width="400" height="500"/>'
	        });
	        
	        $("#container2").block({
	        	message : '<img src="images/loading1.gif" width="400" height="500"/>'
	        });
	        
	        setTimeout(function() {
	        	
	        	console.log($scope.userresponses);
	        	console.log($scope.chartmodel);
	        	
	        	$scope.reloadchart();
	        	
	        	$scope.chartmodel.on('child_added', function(childSnapshot, prevChildName) {
	        		$scope.reloadchart();
	          	});
	        	
	          }, 10000);
	    };
	    
	    
	    
		$scope.reloadchart = function() {
			
			//chart 1
			var pieData1 = [];
			
			var puneCount = 0;
			var njCount = 0;
			var sanghaiCount = 0;
			var bangCount = 0;
			
			
			//chart 2
			var pieData2 = [];
			
			var question1 = [0,0,0,0,0];
			var question2 = [0,0,0,0,0];
			var question3 = [0,0,0,0,0];
			var question4 = [0,0,0,0,0];
			var question5 = [0,0,0,0,0];
				
//			[{
//                name: 'John',
//                data: [5, 3, 4, 7, 2]
//            }, {
//                name: 'Jane',
//                data: [2, 2, 3, 2, 1]
//            }, {
//                name: 'Joe',
//                data: [3, 4, 4, 2, 5]
//            }]
			for (var i = 0; i<$scope.userresponses.length; i++) {
				//chart 1
				if($scope.userresponses[i].locationname == "Pune") {
					puneCount++; 
				}
				if($scope.userresponses[i].locationname == "New Jersey") {
					njCount++; 
				}
				if($scope.userresponses[i].locationname == "Shanghai") {
					sanghaiCount++; 
				}
				if($scope.userresponses[i].locationname == "Banglore") {
					bangCount++; 
				}
				
				//chart 2
				if($scope.userresponses[i].answer == 1) {
					
					if($scope.userresponses[i].questionid == 1){
						question1[0] = question1[0] + 1;
					} else if($scope.userresponses[i].questionid == 2){
						question1[1] = question1[1] + 1;
					} else if($scope.userresponses[i].questionid == 3){
						question1[2] = question1[2] + 1;
					}else if($scope.userresponses[i].questionid == 4){
						question1[3] = question1[3] + 1;
					}else if($scope.userresponses[i].questionid == 5){
						question1[4] = question1[4] + 1;
					}
					continue;
				}
				
				if($scope.userresponses[i].answer == 2) {
					
					if($scope.userresponses[i].questionid == 1){
						question2[0] = question2[0] + 1;
					} else if($scope.userresponses[i].questionid == 2){
						question2[1] = question2[1] + 1;
					} else if($scope.userresponses[i].questionid == 3){
						question2[2] = question2[2] + 1;
					}else if($scope.userresponses[i].questionid == 4){
						question2[3] = question2[3] + 1;
					}else if($scope.userresponses[i].questionid == 5){
						question2[4] = question2[4] + 1;
					}
					continue;
				}
				
				if($scope.userresponses[i].answer == 3) {
					
					if($scope.userresponses[i].questionid == 1){
						question3[0] = question3[0] + 1;
					} else if($scope.userresponses[i].questionid == 2){
						question3[1] = question3[1] + 1;
					} else if($scope.userresponses[i].questionid == 3){
						question3[2] = question3[2] + 1;
					}else if($scope.userresponses[i].questionid == 4){
						question3[3] = question3[3] + 1;
					}else if($scope.userresponses[i].questionid == 5){
						question3[4] = question3[4] + 1;
					}
					
					continue;
				}
				
				if($scope.userresponses[i].answer == 4) {
					
					if($scope.userresponses[i].questionid == 1){
						question4[0] = question4[0] + 1;
					} else if($scope.userresponses[i].questionid == 2){
						question4[1] = question4[1] + 1;
					} else if($scope.userresponses[i].questionid == 3){
						question4[2] = question4[2] + 1;
					}else if($scope.userresponses[i].questionid == 4){
						question4[3] = question4[3] + 1;
					}else if($scope.userresponses[i].questionid == 5){
						question4[4] = question4[4] + 1;
					}
					
					continue;
				}
				
				if($scope.userresponses[i].answer == 5) {
					
					if($scope.userresponses[i].questionid == 1){
						question5[0] = question5[0] + 1;
					} else if($scope.userresponses[i].questionid == 2){
						question5[1] = question5[1] + 1;
					} else if($scope.userresponses[i].questionid == 3){
						question5[2] = question5[2] + 1;
					}else if($scope.userresponses[i].questionid == 4){
						question5[3] = question5[3] + 1;
					}else if($scope.userresponses[i].questionid == 5){
						question5[4] = question5[4] + 1;
					}
					
					continue;
				}
			}
			
			if(firstTime) {
				$("#container1").unblock();
				$("#container2").unblock();
				firstTime = false;
			}
			
			
			pieData1.push([	"Pune" , puneCount]);
			pieData1.push([	"New Jersey" , njCount]);
			pieData1.push([	"Shanghai" , sanghaiCount]);
			pieData1.push([	"Banglore" , bangCount]);
			
			pieData2.push({"name":"Strongly Disagree","data": question1});
			pieData2.push({"name":"Disagree","data": question2});
			pieData2.push({"name":"Neutral","data": question3});
			pieData2.push({"name":"Strongly Agree","data": question4});
			pieData2.push({"name":"Agree","data": question5});
			
			
			
			$('#container1').highcharts({
		        chart: {
		            plotBackgroundColor: null,
		            plotBorderWidth: null,
		            plotShadow: false
		        },
		        title: {
		            text: 'Location Wise user Participations'
		        },
		        tooltip: {
		    	    pointFormat: '{point.name}: <b>{point.percentage:.1f}%</b>'
		        },
		        plotOptions: {
		            pie: {
		                allowPointSelect: true,
		                cursor: 'pointer',
		                dataLabels: {
		                    enabled: true,
		                    color: '#000000',
		                    connectorColor: '#000000',
		                    format: '<b>{point.name}</b>: {point.percentage:.1f} %'
		                }
		            }
		        },
		        series: [{
		            type: 'pie',
		            name: '',
		            data: (function() {
						return pieData1;
					})()
		        }]
		    });
	        
			//container 2
			 $('#container2').highcharts({
		            chart: {
		                type: 'column'
		            },
		            title: {
		                text: 'Question Wise User Responses'
		            },
		            xAxis: {
		                categories: ['Question 1', 'Question 2', 'Question 3', 'Question 4', 'Question 5']
		            },
		            yAxis: {
		                min: 0,
		                title: {
		                    text: 'User Responses'
		                },
		                stackLabels: {
		                    enabled: true,
		                    style: {
		                        fontWeight: 'bold',
		                        color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
		                    }
		                }
		            },
		            legend: {
		                align: 'right',
		                x: -70,
		                verticalAlign: 'top',
		                y: 20,
		                floating: true,
		                backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColorSolid) || 'white',
		                borderColor: '#CCC',
		                borderWidth: 1,
		                shadow: false
		            },
		            tooltip: {
		                formatter: function() {
		                    return '<b>'+ this.x +'</b><br/>'+
		                        this.series.name +': '+ this.y +'<br/>'+
		                        'Total: '+ this.point.stackTotal;
		                }
		            },
		            plotOptions: {
		                column: {
		                    stacking: 'normal',
		                    dataLabels: {
		                        enabled: true,
		                        color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white'
		                    }
		                }
		            },
		            series:(function() {
						return pieData2;
					})() 
		        });
			 
			 
			 
//			 $('#container2').highcharts({
//		            title: {
//		                text: 'Monthly Average Temperature',
//		                x: -20 //center
//		            },
//		            subtitle: {
//		                text: 'Source: WorldClimate.com',
//		                x: -20
//		            },
//		            xAxis: {
//		                categories: ['Question 1', 'Question 2', 'Question 3', 'Question 4', 'Question 5']
//		            },
//		            yAxis: {
//		                title: {
//		                    text: 'Temperature (°C)'
//		                },
//		                plotLines: [{
//		                    value: 0,
//		                    width: 1,
//		                    color: '#808080'
//		                }]
//		            },
//		            tooltip: {
//		                valueSuffix: '°C'
//		            },
//		            legend: {
//		                layout: 'vertical',
//		                align: 'right',
//		                verticalAlign: 'middle',
//		                borderWidth: 0
//		            },
//		            series:(function() {
//						return pieData2;
//					})() 
//		        });
			
	    };
	    
		 
		 $scope.refresh();
		
		
	}
	);
