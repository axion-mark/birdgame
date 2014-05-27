/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

jQuery(document).ready(function($) {
	window.setInterval(function(){
		alive();
	}, 1);
	window.setInterval(function(){
		if($('.sprite').hasClass('stationary')) {} else {
			addObstacle();
		}
	}, 5000);
	var stage = document.getElementById("stage");
	stage.addEventListener('touchstart', jump, false);
});

function addObstacle() {
	$('.stage').append('<div class="obstacle"></div>');
	$('.obstacle').animate({
		right: "+=1000"
	},3000);
}

function jump() {
	$('.sprite').stop(true, false).removeClass('stationary');
	$('.sprite').animate({
	    top: "-=100"
	}, 300, function() {
	    $('.sprite').animate({
		    top: "+=1000"
		}, 1500);
	});
}

function alive() {
	var stageHeight = $('.stage').height();
	var spritePosition = $('.sprite').position();
	if (spritePosition.top < 10) {
		$('.sprite').stop(false, false);
		alert("You've gone too high!");
		$('.sprite').css('top', '50%').addClass('stationary');
		return;
	}
	if (parseInt(spritePosition.top) > parseInt(stageHeight) - 10) {
		$('.sprite').stop(false, false);
		alert("You've gone too low!");
		$('.sprite').css('top', '50%').addClass('stationary');
		return;
	}
}
