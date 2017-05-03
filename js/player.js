
var audio;

$.getJSON("songs.json", (response) => {

    let $library = $("#library");
    $.each(response, function(index, song){
        let $li = $("<li></li>");
        $li.addClass(song.class);
        $li.attr("data-title",  song.title);
        $li.attr("data-artist",  song.artist);
        $li.attr("data-filename",  song.filename); 
        $li.text(song.title + " - " + song.artist);
        $library.append($li);
    });
    var $first = $("#library").children().first();
    initAudio($first);
    play();
    $(".song").click(function(){
    console.log("Hello");
    audio.pause();
    initAudio($(this));
    play();
});
    
}); // Loads the songs from a Json File and plays the first song

function initAudio(element){
    var song = element.data("filename");
    var title = element.data("title");
    var artist = element.data("artist");

    audio = new Audio("media/"+ song)
    audio.volume = parseFloat($(".volume").val() /10);

    if(!audio.currentTime){
        $(".duration").html("0:00");
        $(".total_duration").html("0:00");
    }

    $(".title").text(title + " - " + artist);
    $(".active").removeClass("active");
    element.addClass("active");

}

function play(){
  audio.play();
  $(".play").hide();
  $(".pause").show();
  $(".duration").fadeIn(300);
  show_duration();
//    initMp3Player();
}
$(".play").click(function(){
  play();
});

$(".pause").click(function(){
  audio.pause();
  $(".play").show();
  $(".pause").hide();
});
function next(){
  audio.pause();
  var next = $('.active').next();
  $(".song").removeClass("active");
  next.addClass("active");
  if (next.length==0){
    next = $("#library li:first-child");
  }
  initAudio(next);
  play();

}
$(".next").click(function(){
  next();
});

$(".prev").click(function(){
  audio.pause();
  var prev = $('.active').prev();
  $(".song").removeClass("active");
  prev.addClass("active");
  if (prev.length==0){
    prev = $("#library li:last-child");
  }
  initAudio(prev);
  play();

});

$(".volume").change(function(){
  audio.volume = parseFloat(this.value /10);
});



function show_duration(){

  //Total Duration
  $(audio).bind('timeupdate', function(){
    var total_seconds = parseInt(audio.duration % 60);
    var total_minutes = parseInt((audio.duration /60) % 60);
    if(total_seconds <10){
      total_seconds = '0' + total_seconds;
    }

    //Current time
    var current_seconds = parseInt(audio.currentTime % 60);
    var current_minutes = parseInt((audio.currentTime /60) % 60);
    if(current_seconds <10){
      current_seconds = '0' + current_seconds;
    }
    $(".duration").html(current_minutes + ':' + current_seconds);
    var value = 0;
    if (audio.currentTime > 0){
      value = Math.floor((100/audio.duration) * audio.currentTime);
      $(".total_duration").html(total_minutes + ":" + total_seconds);
    }
    $(".progress_bar").val(value);
    if (audio.currentTime == audio.duration){
      next();
    }

  });
}

$(".progress_bar").change(function(){
  var current_time = Math.floor(this.value /(100/audio.duration));
  audio.currentTime = current_time;
});





//audio analyser

//
//var canvas, ctx, source, context, analyser, fbc_array, bars, bar_x, bar_width, bar_height;
//
//function initMp3Player(){
//		context = new window.AudioContext();
//		analyser = context.createAnalyser();
//		canvas = document.getElementById('audio_analyser');
//		ctx = canvas.getContext('2d');
//        console.log(canvas.width);
//		
//		var source = context.createMediaElementSource(audio);
//		source.connect(analyser);
//		analyser.connect(context.destination);
//		var bufferLength = analyser.frequencyBinCount;
//		fbc_array = new Uint8Array(bufferLength);
//		frameLooper();
//}
//	
//function frameLooper(){
//    window.requestAnimationFrame(frameLooper);
//
//    analyser.getByteFrequencyData(fbc_array);
//    ctx.clearRect(0,0, canvas.width, canvas.height);
//    ctx.fillStyle = '#5100e3';
//    bars = 100;
//
//    for(var i = 0; i< bars; i++){
//        bar_x = i *3;
//        bar_width = 2;
//        bar_height = -(fbc_array[i] /2 );
//        ctx.fillRect(bar_x, canvas.height /2 -1, bar_width, (bar_height /2)-1);
//        ctx.fillRect(bar_x, canvas.height/2 + 1, bar_width, -1 *(bar_height /2) -1 );
//
//    }
//
//}



