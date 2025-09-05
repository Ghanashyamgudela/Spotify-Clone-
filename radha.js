document.addEventListener("DOMContentLoaded", () => {
    const masterPlay = document.getElementById("masterPlay");
    const shuffle = document.querySelector('.shuffle');
    const seek = document.querySelector('#seek');
    const bar2 = document.querySelector("#bar2");
    const dot = document.querySelector(".dot");
    const currentStart = document.querySelector("#current-start");
    const currentEnd = document.querySelector("#current-end");
    const vol = document.querySelector("#vol");
    const vol_icon = document.querySelector("#vol-icon");
    const vol_bar = document.querySelector(".vol-bar");
    const vol_dot = document.querySelector("#vol-dot");
    const back = document.querySelector("#back");
    const next = document.querySelector("#next");

    const music = new Audio("./radha/1.mp3");
    let index = 1;
    const playlistPlayButtons = Array.from(document.getElementsByClassName("playListPlay"));
    const songCount = 60;



    if (masterPlay) {
        masterPlay.addEventListener("click", () => {
            if (music.paused || music.currentTime <= 0) {
                music.play();
                masterPlay.classList.add("fa-pause");
                masterPlay.classList.remove("fa-play");
            } else {
                music.pause();
                masterPlay.classList.remove("fa-pause");
                masterPlay.classList.add("fa-play");



            }
        })
    }



    if (playlistPlayButtons.length > 0) {
        playlistPlayButtons.forEach((buttton) => {
            buttton.addEventListener("click", (event) => {
                const playlistPlayId = event.currentTarget.id;
                index = parseInt(playlistPlayId);
                if (!music.paused && music.src.includes(`${index}.mp3`)) {
                    music.pause();
                    buttton.classList.remove("fa-pause");
                    buttton.classList.add("fa-play");

                    if (masterPlay) {
                        masterPlay.classList.remove('fa-pause');
                        masterPlay.classList.add("fa-play");
                    }
                } else {
                    music.src = `./radha/${index}.mp3`;
                    music.currentTime = 0;
                    music.load();
                    music.play().catch(err => console.log("Playback blocked:", err));


                    playlistPlayButtons.forEach((btn) => {
                        btn.classList.remove("fa-pause");
                        btn.classList.add("fa-play");

                    });

                    buttton.classList.add("fa-pause");
                    buttton.classList.remove("fa-play");

                    if (masterPlay) {
                        masterPlay.classList.add("fa-pause");
                        masterPlay.classList.remove("fa-play");
                    }



                }

            })
        })
    }

    music.addEventListener("timeupdate",()=>{
        if(!isNaN(music.duration)){
            const min1=Math.floor(music.duration/60);
            const sec2=Math.floor(music.currentTime%60).toString().padStart(2,'0');
            if(currentStart)currentStart.innerText=`${min1}:${sec2}`;

            const progressBar=(music.currentTime/music.duration)*100;
            if(seek)seek.value=progressBar;
            if(bar2)bar2.style.width = `${progressBar}%`;
            if(dot)dot.style.left=`${progressBar}%`;
        }
    });

if(seek){
    seek.addEventListener('change',()=>{
        music.currentTime=(seek.value*music.duration)/100;


    });
}


if(vol){
    vol.addEventListener("input",()=>{
        const vol_val= vol.value;
if(vol_val==0){
    vol_icon.className='fa-solid fa-volume-off';
}
else if(vol_val>50){
    vol_icon.className='fa-solid fa-volume-high';
}
else{
    vol_icon.className='fa-solid fa-volume-low';

}
if(vol_bar){
    vol_bar.style.width=`${vol_val}%`;
}
if(vol_dot){
    vol_dot.style.left=`${vol_val}%`;
}
music.volume=vol_val/100;

    });
}

if(back){
    back.addEventListener("click",()=>{
        index=index >1? index-1:songCount;
        music.src=`./radha/${index}.mp3`;
        music.play();
        if(masterPlay){
            masterPlay.classList.add("fa-pause");
            masterPlay.classList.remove("fa-play");
        }
    });
}


if(next){
    next.addEventListener("click",()=>{
     index=index<songCount? index+1:1;
        music.src=`./radha/${index}.mp3`;
        music.play();
        if(masterPlay){
            masterPlay.classList.add("fa-pause");
            masterPlay.classList.remove("fa-play");
        }
    });
}


if(shuffle){
    shuffle.addEventListener("click",()=>{
        const mode=dataset.mode||"next"; 
        if(mode=="next"){
            shuffle.className='fa-solid fa-repeat';
            shuffle.dataset.mode='repeat';
        }else if(mode==="repeat"){
            shuffle.className='fa-solid fa-music';
            shuffle.dataset.mode = 'random';

        }else{
            shuffle.className='fa-solid fa-music';
            shuffle.dataset.mode="next";
        }
    });
}


music.addEventListener("ended",()=>{
const mode=shuffle?.dataset||"next";
if(mode==="repeat"){
    music.currentTime=0;
    music.play();
}else if(mode==="random"){
    index=Math.floor(Math.random() *songCount)+1;
    music.src=`./radha/${index}.mp3`;
    music.play();
}else{
    if(next)next.click();
}

})


});