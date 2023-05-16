const aud = document.getElementById("aud");

const prv = document.getElementById("prv");

const stop = document.getElementById("stop");

const nxt = document.getElementById("nxt");

const selectImage = document.getElementById("select-image");

let audios = [];

let selectAudio = document.getElementById("select-audio");

let img = document.getElementById("img");


//Listen when the select-audio button is clicked to perform the action of selecting the audio files

selectAudio.addEventListener('click', function(){

//CREATE AN INPUT ELEMENT AND THEN CHECK FOR CHANGE
const input = document.createElement('input');

input.type = "file";
input.accept = "audio/*";
input.multiple = true;
input.onchange = function (e){

    audios = Array.from(e.target.files);
    playAudios(audios,0); //it's 0 here so that it plays the first audio
    
};//END OF ONCHANGE FUNCTION OF THE INPUT

input.click();


}//END OF THE ADD EVENT LISTENER FUNCTION

);//END OF selectAudio EVENT LISTENER



//Play the Audios, NOTE that the following function was called previousely under the onchange function
// so that it changes once the audio player's value is changed


function playAudios (audios, index){

  //setting the title of the audio file
	function setTitle(file) {
    document.getElementById("title").innerHTML = file.name
}

    //First let's define a function to play the next audio file
    function nxtAudio(){

        if (index < audios.length -1){ index++ }
            else { index=0; }
        const url = URL.createObjectURL(audios[index]);
        aud.src = url;
        aud.play();

        setTitle(audios[index])
        
        
    }//END OF nxtAudio FUNCTION


    //Next let's define a function to play the previous audio file

    function prvAudio(){

        if (index > 0){ index-- }
            else { index = audios.length - 1 ; }
        const url = URL.createObjectURL(audios[index]);
        aud.src = url;
        aud.play();

        setTitle(audios[index])
        

    }//END OF prvAudio FUNCTION


    //Listen when the Audio has ENDED

    aud.addEventListener('ended', function(){

        nxtAudio();

    }//END OF THE 'ENDED' FUNCTION
     );//END OF THE addEventListener


    //LISTEN WHEN THE NEXT BUTTON IS CLICKED
    nxt.addEventListener('click', function(){
        nxtAudio();
    });//END OF NXT


    //LISTEN WHEN THE PREVIOUS BUTTON IS CLICKED
    prv.addEventListener('click', function(){
        prvAudio();
    });//END OF PRV
    
    //LISTEN WHEN THE STOP BUTTON IS CLICKED
    
    stop.addEventListener('click', function (){
      aud.pause();
      aud.currentTime = 0;
    });
    
    
    //START PLAYING THE FIRST AUDIO
    const url = URL.createObjectURL(audios[index]);
    aud.src = url;
    aud.play();

    setTitle(audios[index])

}// THE END OF THE playAudios FUNCTION






//Setting the image

selectImage.addEventListener("click", function(){
	const input = document.createElement("input");
	input.type = "file";
	input.accept = "image/*";
	input.onchange = function(e) {
      let imgsrc = Array.from(e.target.files);
      const url = URL.createObjectURL(imgsrc[0]);
      img.src = url;
      const rule = `body::before { background-image: url(${url}); }`;
      document.styleSheets[0].deleteRule(0);
      document.styleSheets[0].insertRule(rule, 0);
    
		
		const reader = new FileReader();
		
		reader.addEventListener("load", () => {
			localStorage.setItem("savedImg", reader.result);
		});//End of rader loaded
		
		reader.readAsDataURL(e.target.files[0]);
		
	}//End of onchange
	
	input.click();
	
});//End of selectImage Event Listener


//load the saved image when you open the app/browser
document.addEventListener("DOMContentLoaded", () => {
	
	//check if a saved image exists otherwise it will display a broken image
	
	const savedImg = localStorage.getItem("savedImg");
	
	if(savedImg){
	img.src = savedImg
	const rule = `body::before { background-image: url(${savedImg}); }`;
      document.styleSheets[0].deleteRule(0);
      document.styleSheets[0].insertRule(rule, 0);
	}
});//End of DOMContentLoaded
