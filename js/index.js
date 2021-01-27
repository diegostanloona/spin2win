//Usage

//load your JSON (you could jQuery if you prefer)
function loadJSON(callback) {

    // var xobj = new XMLHttpRequest();
    // xobj.overrideMimeType("application/json");
    // xobj.open('GET', './wheel_data.json', true); 
    // xobj.onreadystatechange = function() {
    //   if (xobj.readyState == 4 && xobj.status == "200") {
    //     //Call the anonymous function (callback) passing in the response
    //     callback();
    //   }
    // };
    // xobj.send(null);
    const config = {
        "colorArray": ["#ffaa00", "#32406f", "#ff9100", "#545e93", "#ffc400", "#3d4b73"],

        "segmentValuesArray": [
            { "probability": 10, "type": "image", "value": "media/pizza.png", "win": true, "resultText": "<img src='media/pizza_opcion.png'/>", "userData": { "score": 1000000 }, "text":"PIZZA", "backColor":"#FFFFFF" },
            { "probability": 10, "type": "image", "value": "media/stars.svg", "win": false, "resultText": "<img src='media/star_opcion.png'/>", "userData": { "score": 0 }, "text": "", "backColor":"#FFFFFF" },
            { "probability": 10, "type": "image", "value": "media/tiramisu.svg", "win": true, "resultText": "<img src='media/tiramisu_opcion.png'/>", "userData": { "score": 0 }, "text": "TIRAMISU", "backColor":"#FFFFFF" },
            { "probability": 10, "type": "image", "value": "media/stars.svg", "win": false, "resultText": "<img src='media/star_opcion.png'/>", "userData": { "score": 40 }, "text": "", "backColor":"#FFFFFF" },
            { "probability": 10, "type": "image", "value": "media/lambrusco.svg", "win": true, "resultText": "<img src='media/lambrusco_opcion.png'/>", "userData": { "score": 0 }, "text": "LAMBRUSCO", "backColor":"#FFFFFF" },
            { "probability": 10, "type": "image", "value": "media/stars.svg", "win": false, "resultText": "<img src='media/star_opcion.png'/>", "userData": { "score": 50 }, "text": "", "backColor":"#FFFFFF" }
        ],

        "svgWidth": 1024,
        "svgHeight": 1024,
        "wheelStrokeColor": "#D0BD0C",
        "wheelStrokeWidth": 18,
        "wheelSize": 1050,
        "wheelTextOffsetY": 120,
        "wheelTextColor": "#EDEDED",
        "wheelTextSize": "2.3em",
        "wheelImageOffsetY": 95,
        "wheelImageSize": 110,
        "centerCircleSize": 0,
        "centerCircleStrokeColor": "#F1DC15",
        "centerCircleStrokeWidth": 12,
        "centerCircleFillColor": "#EDEDED",
        "centerCircleImageUrl": "media/hamburger.png",
        "centerCircleImageWidth": 300,
        "centerCircleImageHeight": 300,
        "segmentStrokeColor": "#FFFFFF",
        "segmentStrokeWidth": 4,
        "centerX": 512,
        "centerY": 512,
        "hasShadows": false,
        "numSpins": -1,
        "spinDestinationArray": [],
        "minSpinDuration": 30,
        "gameOverText": "",
        "invalidSpinText": "INVALID SPIN. PLEASE SPIN AGAIN.",
        "introText": "",
        "hasSound": true,
        "gameId": "9a0232ec06bc431114e2a7f3aea03bbe2164f1aa",
        "clickToSpin": true,
        "spinDirection": "ccw"
    };

    var url = new URL(window.location.href);
    var url_params = {
        i: url.searchParams.get("i"),
        backcolor: url.searchParams.get("backcolor"),
        image: url.searchParams.get("image"),
        ruleta: url.searchParams.get("ruleta"),
        image_nowin: url.searchParams.get("image_nowin")
    }
    console.log(url_params);

    


    callback(evaluateParams(url_params, config));
}

function evaluateParams(params, config){

  var new_config = config;
  var imagenCentro = ["media/garden.jpeg",
        "media/hamb.jpeg"
    ];

    var backColor = [
        ["rgb(253, 166, 0)", "rgb(216, 113, 0)"], //orange
        ["rgb(219, 220, 221)", "rgb(178, 179, 179)"], //white
        ["rgb(221, 16, 26)", "rgb(151, 13, 32)"], //red
        ["rgb(87 ,220 ,99)", "rgb(0, 164, 97)"]  //green
    ]; 

    var fotoIcono = {
        foto: ["media/pizza_opcion.png", "media/tiramisu_opcion.png", "media/lambrusco_opcion.png"],
        icono1: ["media/pizza_opcion_icono.svg", "media/tiramisu_opcion_icono.svg", "media/lambrusco_opcion_icono.svg"],
        icono2: ["", "", ""]
    };

    var ruleta = {
        red: ["rgb(243, 0, 0)", "rgb(146, 0, 0)", "rgb(243, 0, 0)", "rgb(146, 0, 0)", "rgb(243, 0, 0)", "rgb(146, 0, 0)"],
        blue_orange: ["#ffaa00", "#32406f", "#ff9100", "#545e93", "#ffc400", "#3d4b73"],
        colors1: ["rgb(0, 161, 219)", "rgb(228, 229, 230)", "rgb(252, 162, 27)", "rgb(228, 229, 230)", "rgb(114, 198, 88)", "rgb(228, 229, 230)"],
        colors2: ["rgb(255, 68, 0)", "rgb(228, 229, 230)", "rgb(0, 224, 123)", "rgb(228, 229, 230)", "rgb(0, 161, 219)", "rgb(228, 229, 230)"]
    };

    var image_nowin = {
        nada: "",
        estrella: "media/star_opcion.svg",
        cara: "media/cara_opcion.svg"
    }

  switch (params.i) {
      case "1": //pizza
          new_config.centerCircleImageUrl = imagenCentro[0];
        break;
      case "2": //turtle
          new_config.centerCircleImageUrl = imagenCentro[1];
        break;
      default: //turtle
          new_config.centerCircleImageUrl = imagenCentro[1];
        break;
    }

  switch (params.backcolor) {
      case "1": //orange
          document.body.style.backgroundColor = backColor[0][1];
          document.body.style.backgroundImage = "linear-gradient("+backColor[0][0]+", "+backColor[0][1]+")";
        break;
      case "2": //white
          document.body.style.backgroundColor = backColor[1][1];
          document.body.style.backgroundImage = "linear-gradient("+backColor[1][0]+", "+backColor[1][1]+")";
        break;
      case "3": //red
          document.body.style.backgroundColor = backColor[2][1];
          document.body.style.backgroundImage = "linear-gradient("+backColor[2][0]+", "+backColor[2][1]+")";
        break;
      case "4": //green
          document.body.style.backgroundColor = backColor[3][1];
          document.body.style.backgroundImage = "linear-gradient("+backColor[3][0]+", "+backColor[3][1]+")";
        break;
      default: //orange
          document.body.style.backgroundColor = backColor[0][1];
          document.body.style.backgroundImage = "linear-gradient("+backColor[0][0]+", "+backColor[0][1]+")";
        break;
    }

  switch (params.image) {
      case "foto":
          new_config.segmentValuesArray[0].value = "media/pizza_foto.png";
          new_config.segmentValuesArray[0].text = "PIZZA";
          new_config.segmentValuesArray[2].value = "media/tiramisu_foto.png";
          new_config.segmentValuesArray[2].text = "TIRAMISU";
          new_config.segmentValuesArray[4].value = "media/lambrusco_foto.png";
          new_config.segmentValuesArray[4].text = "LAMBRUSCO";
        break;
      case "icono1":
          new_config.segmentValuesArray[0].value = "media/pizza.png";
          new_config.segmentValuesArray[0].text = "PIZZA";
          new_config.segmentValuesArray[2].value = "media/tiramisu.svg";
          new_config.segmentValuesArray[2].text = "TIRAMISU";
          new_config.segmentValuesArray[4].value = "media/lambrusco.svg";
          new_config.segmentValuesArray[4].text = "LAMBRUSCO";
        break;
      case "icono2":
          new_config.segmentValuesArray[0].value = "media/refresco.svg";
          new_config.segmentValuesArray[0].text = "REFRESCO";
          new_config.segmentValuesArray[2].value = "media/hamburguesa.svg";
          new_config.segmentValuesArray[2].text = "HAMBURGUESA";
          new_config.segmentValuesArray[4].value = "media/cookies.svg";
          new_config.segmentValuesArray[4].text = "COOKIES";
        break;
      default:
          new_config.segmentValuesArray[0].value = "media/pizza_foto.png";
          new_config.segmentValuesArray[0].text = "PIZZA";
          new_config.segmentValuesArray[2].value = "media/tiramisu_foto.png";
          new_config.segmentValuesArray[2].text = "TIRAMISU";
          new_config.segmentValuesArray[4].value = "media/lambrusco_foto.png";
          new_config.segmentValuesArray[4].text = "LAMBRUSCO";
        break;
    }

  switch (params.ruleta) {
      case "red":
          new_config.colorArray = ruleta.red;
          new_config.segmentValuesArray[1].backColor = "#6b0d03";
          new_config.segmentValuesArray[3].backColor = "#6b0d03";
          new_config.segmentValuesArray[5].backColor = "#6b0d03";

        break;
      case "blue-orange":
          new_config.colorArray = ruleta.blue_orange; 
          new_config.segmentValuesArray[1].backColor = "#13204c";
          new_config.segmentValuesArray[3].backColor = "#13204c";
          new_config.segmentValuesArray[5].backColor = "#13204c";
        break;
      case "colors1":
          new_config.colorArray = ruleta.colors1;
          new_config.segmentValuesArray[1].backColor = "rgb(228, 229, 230)";
          new_config.segmentValuesArray[3].backColor = "rgb(228, 229, 230)";
          new_config.segmentValuesArray[5].backColor = "rgb(228, 229, 230)";
        break;
      case "colors2":
          new_config.colorArray = ruleta.colors2;
          new_config.segmentValuesArray[1].backColor = "rgb(228, 229, 230)";
          new_config.segmentValuesArray[3].backColor = "rgb(228, 229, 230)";
          new_config.segmentValuesArray[5].backColor = "rgb(228, 229, 230)";
        break;
      default: //blue-orange
          new_config.colorArray = ruleta.blue_orange;
          new_config.segmentValuesArray[1].backColor = "#13204c";
          new_config.segmentValuesArray[3].backColor = "#13204c";
          new_config.segmentValuesArray[5].backColor = "#13204c";
        break;
    }

    switch (params.image_nowin) {
      case "nada":
          new_config.segmentValuesArray[1].value = "";
          new_config.segmentValuesArray[3].value = "";
          new_config.segmentValuesArray[5].value = "";
        break;
      case "estrella1":
          new_config.segmentValuesArray[1].value = "media/stars.svg";
          new_config.segmentValuesArray[3].value = "media/stars.svg";
          new_config.segmentValuesArray[5].value = "media/stars.svg";
        break;
      case "estrella2":
          new_config.segmentValuesArray[1].value = "media/stars_2.png";
          new_config.segmentValuesArray[3].value = "media/stars_2.png";
          new_config.segmentValuesArray[5].value = "media/stars_2.png";
        break;
      case "cara":
          new_config.segmentValuesArray[1].value = "media/sad.png";
          new_config.segmentValuesArray[3].value = "media/sad.png";
          new_config.segmentValuesArray[5].value = "media/sad.png";
        break;
      default:
          new_config.segmentValuesArray[1].value = "media/stars_2.png";
          new_config.segmentValuesArray[3].value = "media/stars_2.png";
          new_config.segmentValuesArray[5].value = "media/stars_2.png";
        break;
    }
    return new_config;

}

//your own function to capture the spin results
function myResult(e) {
    //e is the result object
    console.log('Spin Count: ' + e.spinCount + ' - ' + 'Win: ' + e.win + ' - ' + 'Message: ' + e.msg);
    console.log(e)
    // if you have defined a userData object...
    if (e.userData) {

        console.log('User defined score: ' + e.userData.score)

    }

    /*  if(e.spinCount == 3){
        show the game progress when the spinCount is 3
        console.log(e.target.getGameProgress());
        restart it if you like
        e.target.restart();
      }*/

}

//your own function to capture any errors
function myError(e) {
    //e is error object
    console.log('Spin Count: ' + e.spinCount + ' - ' + 'Message: ' + e.msg);

}

function myGameEnd(e) {

    //e is gameResultsArray
    console.log(e);
    //reset the wheel at the end of the game after 5 seconds
    /* TweenMax.delayedCall(5, function(){
      
      Spin2WinWheel.reset();

    })*/


}


function init() {

    loadJSON(function(response) {
        // Parse JSON string to an object

        var jsonData = response;

        //if you want to spin it using your own button, then create a reference and pass it in as spinTrigger
        var mySpinBtn = document.querySelector('.spinBtn');
        //create a new instance of Spin2Win Wheel and pass in the vars object
        var myWheel = new Spin2WinWheel();

        //WITH your own button
        myWheel.init({ data: jsonData, onResult: myResult, onGameEnd: myGameEnd, onError: myError, spinTrigger: mySpinBtn });

        //WITHOUT your own button
        //myWheel.init({data:jsonData, onResult:myResult, onGameEnd:myGameEnd, onError:myError});
    });
}



//And finally call it
init();