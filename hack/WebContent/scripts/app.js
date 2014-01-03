'use strict';

angular.module('getpaid', ['shell','firebase','google-maps'])
   // your Firebase URL goes here
   .constant('SURVEYURL', 'https://yogi-firebase.firebaseio.com/esurvey')
    .constant('geolocation_msgs', {
        'errors.location.unsupportedBrowser':'Browser does not support location services',
        'errors.location.notFound':'Unable to determine your location',
});