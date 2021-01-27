function Spin2WinWheel() {

    var xmlns = "http://www.w3.org/2000/svg",
        xlinkns = "http://www.w3.org/1999/xlink",
        select = function(s) {
            return document.querySelector(s);
        },
        selectAll = function(s) {
            return document.querySelectorAll(s);
        },
        thisWheel = this,
        wheelSVG = select('.wheelSVG'),
        wheel = select('.wheel'),
        wheelOutline = select('.wheelOutline'),
        wheelContainer = select('.wheelContainer'),
        peg = select('.peg'),
        pegContainer = select('.pegContainer'),
        mainContainer = select('.mainContainer'),
        valueContainer = select('.valueContainer'),
        centerCircle = select('.centerCircle'),
        toast = select('.toast'),
        toastText = select('.toast p'),
        centerCircleImageContainer = select('.centerCircleImageContainer'),
        dataObj,
        svgWidth,
        svgHeight,
        wheelStrokeColor,
        wheelStrokeWidth,
        wheelFillColor = 'transparent',
        wheelSize,
        wheelRadius,
        wheelTextColor,
        wheelTextOffsetY,
        wheelImageOffsetY,
        wheelTextSize,
        wheelImageSize,
        wheelDragger,
        currentWheelRoation,
        centerCircleStrokeColor,
        centerCircleStrokeWidth,
        centerCircleFillColor,
        centerCircleSize,
        centerCircleImageUrl,
        centerCircleImageWidth,
        centerCircleImageHeight,
        centerCircleRadius,
        segmentStrokeColor,
        segmentStrokeWidth,
        segmentValuesArray,
        numSegments,
        numSpins,
        rotationStep,
        segmentStep,
        oldWheelPos,
        currentWheelPos = 0,
        centerX,
        centerY,
        colorArray,
        spinCount = 0,
        spinMultiplier = 2,
        colorCount = 0,
        startAngle = 0,
        endAngle = startAngle,
        segmentArray = [],
        minSpinDuration,
        gameOverText,
        invalidSpinText,
        introText,
        gameId,
        hasSound,
        hasShadows,
        clickToSpin,
        spinButton = null,
        onResult,
        onGameEnd,
        onError,
        spinVelocityTracker,
        gameResultsArray = [],
        pegSnd = new Audio('media/wheel_tick.mp3'),
        spinDestinationArray,
        randomSpins = true,
        spinDirection, // = -1,
        numRevsPerDestination,
        invalidSpinThreshold,
        probabilityArray = null,
        hasProbability = false,
        requiredProb,
        restrictPlayDuration,
        initError1 = "Invalid destination set - please ensure the destination in spinDestinationArray is greater than 0 and less than or equal to the number of segments",
        initError2 = "Not enough segments. Please add more entries to segmentValuesArray",
        probabilityErrorStr = "If you have set JSON probability values they must add up to 100",
        setInitData = function() {

            function calcularPantalla() {
                if(window.screen.width <= 800){
                    wheelSize = 1300 - window.screen.width*0.3;
                    console.log(wheelSize);
                }
            }

            

            wheelStrokeColor = dataObj.wheelStrokeColor;

            wheelSize = dataObj.wheelSize;
            //calcularPantalla()
            //Making it responsive

            wheelRadius = wheelSize / 2;


            wheelTextColor = dataObj.wheelTextColor;
            wheelStrokeColor = dataObj.wheelStrokeColor;
            wheelStrokeWidth = wheelSize*0.02;
            wheelTextOffsetY = wheelSize/900 * dataObj.wheelTextOffsetY;
            wheelImageOffsetY = wheelSize/900 * dataObj.wheelImageOffsetY;
            wheelImageSize = wheelSize/900 * dataObj.wheelImageSize;
            wheelTextSize = wheelSize/900 * dataObj.wheelTextSize;
            centerCircleStrokeColor = dataObj.centerCircleStrokeColor;
            centerCircleStrokeWidth = dataObj.centerCircleStrokeWidth;
            centerCircleFillColor = dataObj.centerCircleFillColor;
            centerCircleSize = dataObj.centerCircleSize;
            centerCircleRadius = centerCircleSize / 2;
            centerCircleImageUrl = dataObj.centerCircleImageUrl;
            centerCircleImageWidth = wheelSize/3;
            centerCircleImageHeight = wheelSize/3;
            segmentStrokeColor = dataObj.segmentStrokeColor;
            segmentStrokeWidth = wheelSize * dataObj.segmentStrokeWidth/900;
            segmentValuesArray = dataObj.segmentValuesArray;
            numSegments = segmentValuesArray.length;
            numSpins = (dataObj.numSpins == -1) ? 9999999999999999 : parseInt(dataObj.numSpins);
            minSpinDuration = dataObj.minSpinDuration;
            gameOverText = dataObj.gameOverText;
            invalidSpinText = dataObj.invalidSpinText;
            introText = dataObj.introText;
            hasSound = dataObj.hasSound;
            gameId = dataObj.gameId;
            clickToSpin = dataObj.clickToSpin;
            rotationStep = 360 / numSegments;
            segmentStep = rotationStep / 2;
            centerX = dataObj.centerX;
            centerY = dataObj.centerY;
            colorArray = dataObj.colorArray;
            hasShadows = dataObj.hasShadows;
            spinDestinationArray = dataObj.spinDestinationArray;
            spinDirection = (dataObj.spinDirection == "cw") ? -1 : 1;
            numRevsPerDestination = spinDirection * (3 * 360);
            invalidSpinThreshold = 0.5;
            restrictPlayDuration = dataObj.restrictPlayDuration;
            if (hasShadows) {
                wheelOutline.setAttributeNS(null, 'filter', 'url(#shadow)');
                valueContainer.setAttributeNS(null, 'filter', 'url(#shadow)');
                centerCircle.setAttributeNS(null, 'filter', 'url(#shadow)');
                pegContainer.setAttributeNS(null, 'filter', 'url(#shadow)');
                toast.style.boxShadow = "0px 0px 20px rgba(21,21,21,0.5)";
            }
        },
        setInitPos = function() {

            TweenMax.set('svg', {
                visibility: 'visible'
            })
            TweenMax.set(wheel, {
                svgOrigin: centerX + ' ' + centerY,
                x: 0,
                y: 0
            })
            TweenMax.set(peg, {
                x: centerX - (peg.getBBox().width / 2),
                y: centerY - wheelRadius,
                transformOrigin: '50% 25%',
                visibility: 'visible'
            })
            var peg_circle = document.querySelector(".peg_circle");
            peg_circle.setAttributeNS(null, "cx", centerX);
            peg_circle.setAttributeNS(null, "cy", centerY-wheelRadius-30);
            
            peg_circle.setAttributeNS(null, "r", 17);
            console.log(centerX)
            TweenMax.set(pegContainer, {
                transformOrigin: '50% 100%',
                scale: wheelSize / 500
            })

            TweenMax.set(mainContainer, {
                svgOrigin: centerX + ' ' + centerY,
                rotation: -90,
                x: 0,
                y: 0
            })


        },
        setCenterCircleImage = function() {

            //Foreign object
            var foreignObject = document.createElementNS(xmlns, "foreignObject");
            foreignObject.setAttribute("width", centerCircleImageWidth);
            foreignObject.setAttribute("height", centerCircleImageHeight);
            foreignObject.setAttribute("x", centerX - (centerCircleImageWidth / 2));
            foreignObject.setAttribute("y", centerY - (centerCircleImageHeight / 2));

            var centerImage = document.createElement("img");
            centerImage.setAttribute("width", centerCircleImageWidth - (wheelSize/900 * 60));
            centerImage.setAttribute("height", centerCircleImageHeight - (wheelSize/900 * 60));
            centerImage.setAttribute("src", centerCircleImageUrl);

            centerImage.setAttribute("class", "centerImage");
            foreignObject.appendChild(centerImage);

            centerCircleImageContainer.appendChild(foreignObject);

            // //centerCircleImageContainer
            // var centerCircleImage = document.createElementNS(xmlns, "image");
            // centerCircleImage.setAttributeNS(xlinkns, "xlink:href", centerCircleImageUrl);
            // centerCircleImage.setAttribute("width", centerCircleImageWidth);
            // centerCircleImage.setAttribute("height", centerCircleImageHeight);
            // centerCircleImage.setAttribute("x", centerX - (centerCircleImageWidth/2));
            // centerCircleImage.setAttribute("y", centerY - (centerCircleImageHeight/2));
            // centerCircleImageContainer.appendChild(centerCircleImage);

            /*<foreignObject x="35%" y="35%" width="100px" height="100px">
              <img width="100%" src="https://images-na.ssl-images-amazon.com/images/I/81NmiYz7ZCL._SX522_.jpg" style=" border-radius: 50px">
            </foreignObject>
            */

        },
        setSpinDestinations = function() {

            //console.log(dataObj.numSpins)
            if (numSpins == 0) {

                showInitError('numSpins MUST BE GREATER THAN 0')
                return;
            }

            if (hasProbability) {

                return;
            }


            if (spinDestinationArray.length > 0) {

                randomSpins = false;
                numSpins = spinDestinationArray.length;
                for (var i = 0; i < spinDestinationArray.length; i++) {
                    //check to see if the destination is available (if you set the destination to be more than the number of segments this will catch that)
                    if (spinDestinationArray[i] > numSegments || spinDestinationArray[i] === 0) {
                        showInitError(initError1);


                        return;
                    }
                    //make it zero based - this allows the author to set destinations using 1 as the first one (UX FTW!)
                    spinDestinationArray[i] = spinDestinationArray[i] - 1;
                    //ensure there is at least 2 spin revolutions (360 2 = 720) between destination spins
                    spinDestinationArray[i] = ((spinDestinationArray[i] * -1) * rotationStep) - (numRevsPerDestination * spinMultiplier);
                    //this multiplier increments to ensure the destination segment is indeed further around
                    spinMultiplier += 2;
                }

            } else {

                //no else
            }

            //console.log(spinDestinationArray)

            if (clickToSpin) {
                createClickToSpin();
            } else {
                createDraggable();
            }

            showIntroText();
        },
        randomBetween = function(min, max) {
            return Math.floor(Math.random() * (max - min + 1) + min);
        },
        drawSegments = function() {
            var x1, x2, y1, y2, d, p, g, t, tn, destFill;
            for (var i = 0; i < numSegments; i++) {
                //startAngle = endAngle;
                startAngle = -segmentStep;
                endAngle = startAngle + rotationStep;

                x1 = (centerX + wheelRadius * Math.cos(Math.PI * startAngle / 180));
                y1 = (centerY + wheelRadius * Math.sin(Math.PI * startAngle / 180));
                x2 = (centerX + wheelRadius * Math.cos(Math.PI * endAngle / 180));
                y2 = (centerY + wheelRadius * Math.sin(Math.PI * endAngle / 180));

                d = "M" + centerX + "," + centerY + "  L" + x1 + "," + y1 + "  A" + wheelRadius + "," + wheelRadius + " 0 0,1 " + x2 + "," + y2 + "z";

                g = document.createElementNS(xmlns, 'g');
                p = document.createElementNS(xmlns, 'path');
                g.appendChild(p);
                //g.appendChild(t);
                wheel.appendChild(g);
                TweenMax.set(p, {
                    rotation: (i * rotationStep),
                    svgOrigin: centerX + ' ' + centerY
                })
                p.setAttributeNS(null, 'd', d);

                //check if there are enough colors in the array to support the numer of segments
                if (colorArray[i]) {
                    destFill = colorArray[i];
                } else {
                    destFill = colorArray[colorCount];
                    colorCount++;
                    //if the extra color cycle count gets bigger than the number of listed colors set it back to 0 and start using them from the start (repeat the colors)
                    if (colorCount == colorArray.length) {
                        colorCount = 0;
                    }
                }

                p.setAttributeNS(null, "fill", destFill);
                p.setAttributeNS(null, "stroke", 0);
                segmentArray.push({
                    path: p,
                    x1: x1,
                    x2: x2,
                    y1: y1,
                    y2: y2
                });

            } //end for

            if (segmentStrokeWidth > 0) {
                drawSegmentStrokes()
            }

            addValues()

        },
        drawSegmentStrokes = function() {

            for (var i = 0; i < numSegments; i++) {

                var l = document.createElementNS(xmlns, 'line');
                l.setAttributeNS(null, 'x1', centerX);
                l.setAttributeNS(null, 'x2', segmentArray[i].x2);
                l.setAttributeNS(null, 'y1', centerY);
                l.setAttributeNS(null, 'y2', segmentArray[i].y2);
                l.setAttributeNS(null, 'stroke', segmentStrokeColor);
                l.setAttributeNS(null, 'stroke-width', segmentStrokeWidth);
                wheel.appendChild(l);

                TweenMax.set(l, {
                    svgOrigin: centerX + ' ' + centerY,
                    rotation: (i * rotationStep)
                })
            }

        },
        addValues = function() {

            for (var i = 0; i < numSegments; i++) {

                var g = document.createElementNS(xmlns, 'g');
                //var c = document.createElementNS(xmlns, 'circle');
                if (segmentValuesArray[i].type == "image") {

                    var circle = document.createElementNS(xmlns, 'circle');
                    g.appendChild(circle);
                    circle.setAttributeNS(null, 'cx', centerX);
                    circle.setAttributeNS(null, 'cy', centerY - wheelRadius + 2 * wheelImageOffsetY - (wheelSize/900 * 40));
                    circle.setAttributeNS(null, 'r', wheelSize/900 * 70);
                    circle.setAttributeNS(null, 'fill', segmentValuesArray[i].backColor);

                    var ig = document.createElementNS(xmlns, 'image');
                    g.appendChild(ig);
                    ig.setAttribute('class', 'wheelImage');
                    ig.setAttributeNS(null, 'x', centerX - (wheelImageSize / 2));
                    ig.setAttributeNS(null, 'y', centerY - wheelRadius + wheelImageOffsetY);
                    ig.setAttributeNS(null, 'width', wheelImageSize);
                    ig.setAttributeNS(null, 'height', wheelImageSize);
                    ig.setAttributeNS(xlinkns, 'xlink:href', segmentValuesArray[i].value);



                    var text = document.createElementNS(xmlns, 'text');
                    var tn = document.createTextNode(segmentValuesArray[i].text);
                    g.appendChild(text);
                    text.setAttributeNS(null, 'x', centerX);
                    text.setAttributeNS(null, 'y', centerY - wheelRadius + wheelImageOffsetY + (wheelSize/900 * 180));
                    text.setAttributeNS(null, 'fill', "#FFFFFF");
                    text.setAttributeNS(null, 'text-anchor', 'middle')
                    text.appendChild(tn);

                } else if (segmentValuesArray[i].type == "string") {

                    var t = document.createElementNS(xmlns, 'text');

                    var lines = segmentValuesArray[i].value.split('^'),
                        tn, ts;

                    lines.forEach(function(value, index) {
                        tn = document.createTextNode(value);
                        ts = document.createElementNS(xmlns, "tspan");

                        ts.setAttributeNS(null, 'dy', (index) ? "1.2em" : 0);

                        ts.setAttributeNS(null, 'x', centerX);

                        ts.setAttributeNS(null, 'text-anchor', 'middle');

                        ts.appendChild(tn);

                        t.appendChild(ts);
                    });

                    g.appendChild(t);
                    t.setAttribute('class', 'wheelText');
                    t.setAttributeNS(null, 'fill', wheelTextColor);
                    t.setAttributeNS(null, 'x', centerX);
                    t.setAttributeNS(null, 'y', centerY - wheelRadius + wheelTextOffsetY);
                    t.style.fontSize = wheelTextSize;
                }

                valueContainer.appendChild(g)

                TweenMax.set(g, {
                    svgOrigin: centerX + ' ' + centerY,
                    rotation: i * rotationStep
                })

            }

            TweenMax.set(valueContainer, {
                svgOrigin: centerX + ' ' + centerY
            })

        },
        getWheel = function() {

            var g = document.createElementNS(xmlns, 'g');
            var c = document.createElementNS(xmlns, 'circle');
            wheelOutline.appendChild(g);

            //wheel's outline
            c.setAttributeNS(null, 'fill', wheelFillColor);
            c.setAttributeNS(null, 'stroke', "#E79000");
            c.setAttributeNS(null, 'stroke-width', wheelSize*0.04);
            c.setAttributeNS(null, 'cx', centerX);
            c.setAttributeNS(null, 'cy', centerY);
            c.setAttributeNS(null, 'r', wheelRadius);
            g.appendChild(c);

            var c_in = document.createElementNS(xmlns, 'circle');
            c_in.setAttributeNS(null, 'fill', wheelFillColor);
            c_in.setAttributeNS(null, 'stroke', "#FFFFFF");
            c_in.setAttributeNS(null, 'stroke-width', wheelSize*0.00889);
            c_in.setAttributeNS(null, 'cx', centerX);
            c_in.setAttributeNS(null, 'cy', centerY);
            c_in.setAttributeNS(null, 'r', wheelRadius - wheelSize*0.01556);
            g.appendChild(c_in);

            var c_out = document.createElementNS(xmlns, 'circle');
            c_out.setAttributeNS(null, 'fill', wheelFillColor);
            c_out.setAttributeNS(null, 'stroke', "url(#grad1)");
            c_out.setAttributeNS(null, 'stroke-width', wheelSize*0.00889);
            c_out.setAttributeNS(null, 'cx', centerX);
            c_out.setAttributeNS(null, 'cy', centerY);
            c_out.setAttributeNS(null, 'r', wheelRadius + wheelSize*0.01556);
            g.appendChild(c_out);

            return g;
        },
        getCenterCircle = function() {

            var c = document.createElementNS(xmlns, 'circle');

            //circle's outline
            c.setAttributeNS(null, 'fill', centerCircleFillColor);
            c.setAttributeNS(null, 'stroke', centerCircleStrokeColor);
            c.setAttributeNS(null, 'stroke-width', centerCircleStrokeWidth);
            c.setAttributeNS(null, 'cx', centerX);
            c.setAttributeNS(null, 'cy', centerY);
            c.setAttributeNS(null, 'r', centerCircleRadius);

            return c;
        },
        onPegTweenStart = function() {
            pegSnd.play();
        },
        onWheelPress = function() {
            // popup.style.visibility = 'hidden';
            toast.style.visibility = 'hidden';

        },
        onButtonPress = function() {

            toast.style.visibility = 'hidden';
            spinButton.onclick = null;
            spinMultiplier += 2;

        },
        onWheelDragEnd = function() {
            disableWheel();
            //prevent players dragging and dropping the wheel onto a segment
            if (randomSpins) {
                spinVelocityTracker = VelocityTracker.track(wheel, "rotation");
            }
        },
        throwUpdate = function(e) {
            //this deals with the peg ticker (at the top) and decides which direction it should flick
            //personally I think this is a nice touch - hope you do too!
            oldWheelPos = currentWheelPos;

            currentWheelPos = Math.round(wheel._gsTransform.rotation / rotationStep);
            //peg code only
            if (currentWheelPos != oldWheelPos) {

                var rotation = (currentWheelPos > oldWheelPos) ? -35 : 35;

                TweenMax.fromTo(peg, 0.2, {

                    rotation: rotation
                }, {
                    onStart: (hasSound) ? onPegTweenStart : null,
                    rotation: 0,
                    ease: Back.easeOut
                })
            }
            //keep the values (images. text) sync'd with the wheel spinning
            TweenMax.set(valueContainer, {
                rotation: wheel._gsTransform.rotation
            })
        },
        throwComplete = function() {

            //work out where the wheel lands
            currentWheelRoation = wheel._gsTransform.rotation;
            var normalizedRotation = Math.round(currentWheelRoation % 360);
            normalizedRotation = (normalizedRotation > 0) ? 360 - normalizedRotation : normalizedRotation;

            normalizedRotation = (normalizedRotation < 0) ? normalizedRotation *= -1 : normalizedRotation;

            //check to see if spinVelocityTracker exists (only when randomSpins = true)

            if (spinVelocityTracker && Math.abs(spinVelocityTracker.getVelocity('rotation')) <= invalidSpinThreshold) {

                enableWheel();
                showResult('invalidSpin');
                return;

            }

            var segId = Math.round(normalizedRotation / rotationStep);
            var winningSegment = segmentArray[segId].path;

            showResult(Math.abs(segId));

            //randomSpins is true if no destinations have been set
            if (randomSpins) {
                //this means no destinations have been set        
                if (numSpins > -1) {
                    //this means no destinations have been set AND numSpins has been set to a positive number          
                    spinCount++;
                } else {
                    //this means no destinations have been set AND numSpins is -1 meaning you can spin randomly forever
                    //so stop executing anything else
                    return;
                }
            } else {
                //this means destinations have been set
                spinCount++;
                wheelDragger[0].vars.snap = [spinDestinationArray[spinCount]];
            }

            VelocityTracker.untrack(wheel);

            if (spinCount >= numSpins) {
                endGame();
                return;
            }

            enableWheel();

        },
        updateWheelBounds = function() {

            if (clickToSpin) return;

            wheelDragger[0].applyBounds({
                minRotation: spinDirection * -9999999999999999,
                maxRotation: currentWheelRoation
            });
        },
        getRandomSpinFunction = function(multiplier) {
            var f = function(endValue) {
                //console.log(endValue)
                return (Math.round((endValue / rotationStep)) * rotationStep) - multiplier
            }
            return f;
        },
        getRandomClickSpin = function() {
            var val = -(rotationStep * randomBetween(0, numSegments)) - numRevsPerDestination * spinMultiplier
            return val
        },
        getProbabilityClickSpin = function() {
            var probId = Math.floor(Math.random() * probabilityArray.length);
            var probSeg = probabilityArray[probId];
            var val = -(rotationStep * probSeg) - numRevsPerDestination * spinMultiplier

            return val

        },
        createDraggable = function() {
            wheelDragger = Draggable.create(wheel, {
                type: 'rotation',
                bounds: {
                    minRotation: spinDirection * -9999999999999999,
                    maxRotation: 0
                },
                throwProps: true,
                ease: Back.easeOut.config(0.2),
                snap: (randomSpins) ? getRandomSpinFunction(0) : [spinDestinationArray[spinCount]],
                throwResistance: 0,
                minDuration: minSpinDuration,
                maxDuration: minSpinDuration,
                onThrowComplete: throwComplete,
                onPress: onWheelPress,
                onDrag: throwUpdate,
                onThrowUpdate: throwUpdate,
                overshootTolerance: 1,
                onDragEnd: onWheelDragEnd

            })
        },

        checkHasProbability = function() {

            hasProbability = true;
            segmentValuesArray.forEach(function(el, val) {
                //console.log(!isNaN(el.probability))
                //if(!el.probability){
                if (isNaN(el.probability)) {

                    hasProbability = false;
                    //return false;

                }
            })

            if (hasProbability) {

                spinDestinationArray = []; //, numSpins)
                numSpins = (dataObj.numSpins == -1) ? 9999999999999999 : parseInt(dataObj.numSpins);
                checkProbabilityValues();

            }

        },

        checkProbabilityValues = function() {


            var totalProb = 0; //, requiredProb = 100;


            segmentValuesArray.forEach(function(el, val) {
                totalProb += el.probability;
            })

            requiredProb = totalProb;


            if (Math.ceil(totalProb) == requiredProb || Math.floor(totalProb) == requiredProb) {

                createProbabilityArray();

            } else {

                var r = confirm("Total probability: " + totalProb + ' - ' + probabilityErrorStr);
                if (r == true) {
                    TweenMax.set(wheelContainer, {
                        autoAlpha: 0
                    })
                    TweenMax.set(wheelContainer, {
                        autoAlpha: 0
                    })

                }


            }



        }

    createProbabilityArray = function() {


            probabilityArray = [];

            segmentValuesArray.forEach(function(el, val) {

                for (var i = 0; i < el.probability; i++) {

                    probabilityArray.push(val);
                }
            })



        },

        showProbabilityError = function() {


        },
        createClickToSpin = function() {

            if (checkHasProbability()) {

                createProbabilityArray();
            }
            //check to see if the author called setSpinTrigger before init();
            //if spinTrigger is defined then they set it before
            //if it's not then we set wheel to be the button. Later the author may
            //overwrite this with their own button
            if (spinButton) {
                spinButton.onclick = getTrigger();
            } else {
                spinButton = wheel;
                wheel.onclick = getTrigger();
            }


        },
        getTrigger = function() {
            return function() {

                if (hasProbability) {

                    ThrowPropsPlugin.to(wheel, {
                        throwProps: {
                            duration: 30,
                            rotation: {
                                velocity: (spinDirection == 1) ? randomBetween(-700, -500) : randomBetween(500, 700),
                                //if it's random spins then get a random spin but pass in the multiplier to ensure a long spin (plus the right slot id)
                                //if it has destinations set then use those
                                end: getProbabilityClickSpin()
                                //end:dest
                            }
                        },
                        onStart: onButtonPress,
                        onUpdate: throwUpdate,
                        ease: Back.easeOut.config(0.2),
                        overshootTolerance: 0,
                        onComplete: spinComplete
                    });

                } else {

                    var dest = -rotationStep * 2;

                    ThrowPropsPlugin.to(wheel, {
                        throwProps: {
                            duration: 30,
                            rotation: {
                                velocity: randomBetween(-700, -500),
                                //if it's random spins then get a random spin but pass in the multiplier to ensure a long spin (plus the right slot id)
                                //if it has destinations set then use those
                                end: (randomSpins) ? getRandomClickSpin() : [spinDestinationArray[spinCount]]
                                //end:dest
                            }
                        },
                        onStart: onButtonPress,
                        onUpdate: throwUpdate,
                        ease: Back.easeOut.config(0.2),
                        overshootTolerance: 0,
                        onComplete: spinComplete
                    });

                }
            }
        },
        spinComplete = function() {

            //work out where the wheel lands
            currentWheelRoation = wheel._gsTransform.rotation;
            var normalizedRotation = Math.round(currentWheelRoation % 360);
            normalizedRotation = (normalizedRotation > 0) ? 360 - normalizedRotation : normalizedRotation;

            normalizedRotation = (normalizedRotation < 0) ? normalizedRotation *= -1 : normalizedRotation;

            var segId = Math.round(normalizedRotation / rotationStep);
            var winningSegment = segmentArray[segId].path;

            showResult(Math.abs(segId));

            //randomSpins is true if no destinations have been set
            if (randomSpins) {
                //this means no destinations have been set        
                if (numSpins > -1) {
                    //this means no destinations have been set AND numSpins has been set to a positive number          
                    spinCount++;

                } else {
                    //this means no destinations have been set AND numSpins is -1 meaning you can spin randomly forever
                    //so stop executing anything else
                    return;
                }
            } else {
                //this means destinations have been set
                spinCount++;

            }

            if (spinCount >= numSpins) {
                endGame();
                return;
            }

            spinButton.onclick = getTrigger();
        },
        endGame = function() {

            //prevent the wheel being dragged once the game has finished
            disableWheel();

            TweenMax.set(wheelSVG, {
                alpha: 0.3
            })

            //show the gameOver text after 4 seconds
            TweenMax.to(toastText, 1, {
                text: gameOverText,
                ease: Linear.easeNone,
                delay: 2
            })

            onGameEnd({ gameId: gameId, target: thisWheel, results: gameResultsArray });

        },
        disableWheel = function() {
            if (clickToSpin) return;
            wheelDragger[0].disable();
        },
        enableWheel = function() {
            if (clickToSpin) return;
            wheelDragger[0].enable();
        },
        showResult = function(e) {

            updateWheelBounds();

            var resultObj;
            //if it's an error 
            if (e == "invalidSpin") {

                TweenMax.set(wheel, {
                    rotation: spinDestinationArray[spinCount]
                })
                showToast(invalidSpinText);
                //create a result object 
                resultObj = { target: thisWheel, type: 'error', spinCount: spinCount, win: null, msg: invalidSpinText, gameId: gameId };

                //fire the error event
                onError(resultObj);

                //add result to gameResultsArray
                gameResultsArray.push(resultObj);

                return;
            }
            //if it's a number then it's a segment
            if (!isNaN(e)) {
                //the JSON contains a property that defines whether the segment is a winner or loser. Useful for backend decisions.
                //var resultStr1 = (segmentValuesArray[e].win) ? 'WIN:' : 'LOSE:';
                var textColor = colorArray[e] === "rgb(228, 229, 230)" ? "rgb(9, 89, 142)" : "#FFFFFF";
                var text = segmentValuesArray[e].text === "" ? `<p style="color: ${textColor}">Prueba suerte en tu próxima visita</p>` : `<p>${segmentValuesArray[e].text}</p>`;
                var resultStr2 = `<img src="${segmentValuesArray[e].value}"/>${text}`
                var resultColor = colorArray[e]; 
                showToast(resultStr2, resultColor);
                //create a result object 
                resultObj = { target: thisWheel, type: 'result', spinCount: spinCount, win: segmentValuesArray[e].win, msg: segmentValuesArray[e].resultText, gameId: gameId, userData: segmentValuesArray[e].userData };

                //fire the result event
                onResult(resultObj);

                //add result to gameResultsArray
                gameResultsArray.push(resultObj);
            }
        },
        showIntroText = function(str) {
            //showToast(introText);
        },
        showInitError = function(str) {
            TweenMax.set([wheelContainer, spinButton], {
                autoAlpha: 0
            })
            TweenMax.delayedCall(0.1, function() {
                alert(str)
            });
        },
        showToast = function(str, bg_color) {
            toast.style.visibility = 'visible';
            toast.style.backgroundColor = bg_color;
            toastText.innerHTML = str;
            TweenMax.fromTo(toast, 0.6, {
                y: 20,
                alpha: 0
            }, {
                y: 0,
                alpha: 1,
                delay: 0.2,
                //onStart:onresize,
                ease: Elastic.easeOut.config(0.7, 0.7)
            })

        },
        checkNumSegments = function() {

            if (numSegments <= 1) {
                showInitError(initError2)
                TweenMax.set(wheelSVG, {
                    visibility: 'hidden'
                })

            }


        },
        setSpinTrigger = function() {

            if (spinButton) {
                clickToSpin = true;
            }
            if (clickToSpin) {

                if (spinButton) {
                    spinButton.onclick = getTrigger();
                } else {

                    wheel.onclick = getTrigger();
                }
            } else {

            }
        },
        checkRestriction = function() {

            //if (restrictPlayDuration > 0) {
            onRestrict(restrictPlayDuration);

            //}    
        },
        onResult = function(e) {
            thisWheel.onResult(e)
        },
        onError = function(e) {
            thisWheel.onError(e)
        },
        onGameEnd = function(e) {
            thisWheel.onGameEnd(e)
        },
        onRestrict = function(e) {
            thisWheel.onRestrict(e)
        }

    this.onResult = onResult;
    this.onError = onError;
    this.onGameEnd = onGameEnd;

    this.onRestrict = onRestrict;


    this.getGameProgress = function() { return gameResultsArray; };
    this.init = function(e) {
        //if(String.fromCharCode(57,66,51).toLowerCase() !=  _s){_uu();}       
        console.log(e)
        if (!e) {
            setInitPos();
            showInitError('PLEASE INCLUDE THE INIT OBJECT');
            return;
        }
        svgWidth = e.data.svgWidth;
        svgHeight = e.data.svgHeight;
        wheelSVG.setAttribute('viewBox', '0 0 ' + svgWidth + ' ' + e.data.svgHeight);
        dataObj = e.data;
        onGameEnd = (e.onGameEnd) ? e.onGameEnd : function() {};
        onResult = (e.onResult) ? e.onResult : function() {};
        onError = (e.onError) ? e.onError : function() {};
        onRestrict = (e.onRestrict) ? e.onRestrict : function() {};
        spinButton = (e.spinTrigger) ? e.spinTrigger : null;
        setSpinTrigger();
        setInitData();

        onRestrict(restrictPlayDuration);

        setInitPos();
        drawSegments();
        setCenterCircleImage();
        wheelOutline.appendChild(getWheel())
        centerCircle.appendChild(getCenterCircle());
        setSpinDestinations();
        checkNumSegments();
        //checkRestriction();






    }

    this.restart = function() {
        if (!clickToSpin) {
            wheelDragger[0].kill();
            currentWheelPos = oldWheelPos = null;
            TweenMax.to([wheel, valueContainer], 0.3, {
                rotation: '0_short',
                onComplete: createDraggable
            })
        }

        TweenMax.set(wheelSVG, {
            alpha: 1
        })
        TweenMax.to([wheel, valueContainer], 0.3, {
            rotation: '0_short'
        })

        toast.style.visibility = 'hidden';
        spinCount = 0;
        spinMultiplier = 2;
        gameResultsArray = [];


        showIntroText();
    }


}

Spin2WinWheel.reset = function() {

    document.querySelector('.wheel').innerHTML = "";
    document.querySelector('.wheelOutline').innerHTML = "";
    document.querySelector('.centerCircle').innerHTML = "";
    document.querySelector('.valueContainer').innerHTML = "";
    document.querySelector('.centerCircleImageContainer').innerHTML = "";
    TweenMax.set(['.wheel', '.valueContainer'], {
        rotation: 0
    })
    TweenMax.staggerTo(['.wheelSVG', '.toast'], 0, {
        cycle: {
            alpha: [1, 0]
        }
    }, 0)


}
Spin2WinWheel.hide = function() {

    TweenMax.set(document.querySelector('.wheelContainer'), {
        autoAlpha: 0
    })

}

Spin2WinWheel.remove = function() {

    document.body.removeChild(document.querySelector('.wheelContainer'));

}

Spin2WinWheel.checkCookie = function(callback) {

    var xobj = new XMLHttpRequest();
    xobj.open('GET', 'settings.php?f=checkCookie', true);
    xobj.onreadystatechange = function() {
        if (xobj.readyState == 4 && xobj.status == "200") {
            callback(xobj.responseText)
            //successfully called IP check
            //0 means they haven't been here before
            /*if(xobj.responseText == 0){

              callback();

            } else{
              alert("Please come back and play tomorrow!");
              Spin2WinWheel.remove();
              
              //hide your button here too
            }*/
        }
    };
    xobj.send(null);

}

Spin2WinWheel.setCookie = function() {

    var xobj = new XMLHttpRequest();
    xobj.open('GET', 'settings.php?f=setCookie', true);
    xobj.onreadystatechange = function() {
        if (xobj.readyState == 4 && xobj.status == "200") {
            console.log(xobj.responseText)
            //successfully called IP check
            //0 means they haven't been here before

        }
    };
    xobj.send(null);
}