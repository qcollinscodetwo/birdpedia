var icon = document.querySelectorAll('i');

var reset = function() {
    icon.forEach(function(icn) {
        icn.nextElementSibling.pause();
        icn.classList.remove('fa-pause');
        icn.classList.add('fa-play');
    });
}

for(var x = 0; x < icon.length; x++) {


    icon[x].addEventListener("click", function() {
        var setTimeOutFunc;
        var thisIcon = this;
        
       for(var i = 0; i < icon.length; i++) {
           if (icon[i] !== thisIcon) {
            icon[i].nextElementSibling.pause();
            icon[i].classList.remove('fa-pause');
            icon[i].classList.add('fa-play');
           }
       }

        if(this.classList.contains('fa-play') === true) {



            var sTODuration = parseInt(this.nextElementSibling.duration * 1000),
                sTOCurrentTime = parseInt(this.nextElementSibling.currentTime * 1000),
                timeLeftBox = this.previousElementSibling.firstElementChild,
                sTOTimeLeft = sTODuration - sTOCurrentTime,
                iconButton = this;

            this.nextElementSibling.ontimeupdate = function() {


                var duration = parseInt( this.duration ),
                    currentTime = parseInt( this.currentTime ),
                    timeLeft = duration - currentTime,
                    s, m;
                
                s = timeLeft % 60;
                m = Math.floor( timeLeft / 60 ) % 60;

                s = s < 10 ? "0" + s: s;
                m = m < 10 ? "0" + m: m;

                var checkAudioEnded = this.paused;
                timeLeftBox.innerHTML = " " + m + ":" + s;

                if (checkAudioEnded) {
                    iconButton.classList.remove("fa-pause");
                    iconButton.classList.add("fa-play");
                }


            }




            this.classList.remove('fa-play');
            this.classList.add('fa-pause');
            this.nextElementSibling.play();




        } else if (this.classList.contains('fa-pause') === true) {
            this.classList.remove('fa-pause');
            this.classList.add('fa-play');
            this.nextElementSibling.pause();
            clearTimeout(setTimeOutFunc);
        }
    }, false);
}