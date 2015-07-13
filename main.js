// DEBUGGER  & TESTS---
console.log("jsLoadTrue");

function testFunction_log()	{ // logs the arrays below to the console
	console.log("stackArray: " + ship01.ID + "_stackArrayL: " + ship01.hold.stackArray.length);
	console.log("stackArray: " + stack12.ID + "_stackArrayL: " + stack12.stackArray.length);	
}
function testFunction_unload1()	{
	transferOne(ship01.hold,stack12,0);
}
function testFunction_unloadAll()	{
	transferAll(ship01.hold,stack12)	
}


// VARIABLES ---
var TPC = 4000;	//TimePerContainer - time it takes for a container to unload from source to target
var FPS = 30;


// JONATHAN JS
var reederei  = ["Maersk", "MSC", "CMA_CGM", "Evergreen_Line", "Hapag_Lloyd", "Cosco", "PIL", "CSCL", "MOL", "Hamburg_Süd"];
var ladung  = ["Pharmazeutika", "Obst", "Elektronik", "Autoreifen", "Gewürze"];
var hafen = ["Shanghai", "Singapur", "Hongkong", "Shenzhen", "Busan", "Ningbo", "Guangzhou", "Qingdao", "Dubai", "Rotterdam", "Tianjin", "Kaohsiung", "Port Klang", "Antwerpen", "Los Angeles", "Tanjung Pelepas", "Long Beach", "Xiamen", "New York"]

// 	OBJECTS ---

var stack12 = new containerStack("stack12","idle",[]);	//testStack
stack12.stackCreate();

var ship01 = new containerShip("ship01","idle",[]); //testShip
ship01.hold.stackCreate();

var crane01 = new containerCrane(crane01,"idle"); //testCrane


// MAINCODE SETUP---
for (var i = 0; i < 100; i++) { // creates new container and adds them to a ship
		var container = new standardContainer ("container" + i,"idle","x")
		ship01.hold.stackArray.push(container);
};
ship01.hold.stackUpdate();

crane01.transferContainers(ship01.hold,stack12,0);


// MAINLOOP ---
setInterval(function() {
	document.getElementById("stac12Perc").innerHTML = "test: " + stack12.stackFill;
}, 1000/FPS);


// CONSTRUCTORS ---
function standardContainer(ID,status,position,owner)	{	// containerConstructor
	this.ID = ID;
	this.status = status;
	this.position = position;
	this.owner = owner;
}

function containerStack(ID,mode) {	//stackConstructor
    this.ID = ID;
    this.mode = mode;
    this.stackColumns = 10;
    this.stackRows = 10;
    this.stackLevels = 0; // NOT YET IN USE
    this.stackSlots = this.stackColumns * this.stackRows;
    this.stackArray = []; // add stackCreate directly?
    this.stackFill = this.stackArray.length;
    this.unloadPerc = this.stackFill/this.stackSlots;


    this.stackCreate = function()	{ 
    	console.log("create stack with ID: " + ID);
	    for (var i = 0; i < this.stackSlots; i++) {
	    	var article = document.createElement("article");
	    	article.className = "stackSlot";
	    	article.id = ID + "slot" + i;
	    	document.getElementById(ID).appendChild(article);
	    };	
    }
    this.stackUpdate = function() {
    	for (var i = 0; i < this.stackArray.length; i++) {
    		//console.log("update stack slot " + i);
    		document.getElementById(ID + "slot" + i).className = "color_MOL";
    	}
    	for (var i = this.stackArray.length; i < this.stackSlots; i++)	{
    		document.getElementById(ID + "slot" + i).className = "stackSlot";
    	}
    	this.stackFill = this.stackArray.length;
    	this.unloadPerc = this.stackFill/this.stackSlots;
	}
}

function containerShip(ID,mode,stackArray) {	//shipConstructor
    this.ID = ID;
    this.mode = mode;
    this.hold =  new containerStack(ID + "Stack");
}

function containerCrane(ID,mode) {	//craneConstructor
    this.ID = ID;
    this.mode = mode;
    this.stackArray = [];
    var crane = this;

    this.transferContainers = function(source,target)	{ // transfers ALL objects from one array to another.
    	if (source.stackArray.length >= 1)	{
    		objName = this;

	    	this.transferContainer(ship01.hold,stack12,0);
	    	setInterval(function(){ 
	    		objName.transferContainer(ship01.hold,stack12,0);
	    	},TPC*2);
    	}
    	else	{
    		console.log("transferError: array is empty"); // doesn't work yet... FIX IT!
    	}
    }
	this.transferContainer = function(source,target,arrayPosition)	{ // takes a container from source array
		if (source.stackArray.length >= 1)	{
			var toTransfer = source.stackArray[arrayPosition];	
			source.stackArray.splice(arrayPosition,1);
			source.stackUpdate();

			document.getElementById("crane01").className = "containerCraneTransfer"; // make it dynamic! this
			document.getElementById("trolley01").className = "craneTrolleyTransfer"; // make it dynamic! this

			window.setTimeout(function(){ 
				target.stackArray.push(toTransfer); 	//REPLACE INSTEAD OF SPLICE!!!!
				target.stackUpdate();

				document.getElementById("crane01").className = "containerCraneReverse"; // make it dynamic! this
				document.getElementById("trolley01").className = "craneTrolleyReverse"; // make it dynamic! this
			}, TPC);
		}	
		else	{
			console.log("transferError: array is empty"); // doesn't work yet... FIX IT!
		}
	}
}

// JONATHAN JS
for (var i = 0; i < 15; i++) {
  if (i!=11) {
    var newSec = document.createElement("section");
    newSec.className = 'stack';

    var container = new Array(100);
    for (var c = 0; c < container.length; c++) {
        container[c]= Math.floor((Math.random() * 12));
    }

    for (var j = 0; j < 5; j++) {
      var newDiv = document.createElement("div");
      newDiv.style.left = 505 + (i*90) + "px";
      newDiv.className = 'level';
      newDiv.setAttribute('data-level','Level ' + (j+1));

      for (var k = 0; k < 100; k++) {
      var newArt = document.createElement("article");
      if (container[k] <= reederei.length - 1) {
        var newDes = document.createElement("div");
        newArt.className = 'container color_' + reederei[container[k]];
        newDes.innerHTML=
        "<span class='postion'>Position: " + String.fromCharCode(i+65) + "-" + (j+1) + "-" + String.fromCharCode(Math.floor(k/10)+65) + (k+1-(Math.floor(k/10)*10)) + "</span>" +
        "<span class='herkunft'>Herkunft: " + hafen[Math.floor((Math.random() * hafen.length))] +  "</span>" +
        "<span class='ziel'>Ziel: " + hafen[Math.floor((Math.random() * hafen.length))] + "</span>" +
        "<span class='ladung'>Ladung: " + ladung[Math.floor((Math.random() * ladung.length))] +  "</span>" +
        "<span class='reederei'>Reederei: " + reederei[container[k]].replace('_',' ') +  "</span>";
        newArt.appendChild(newDes);
      }
      newDiv.appendChild(newArt);
      if (container[k] >= 11) {} else {
          container[k] = Math.floor((Math.random() * 13) + 1);
      }

      }

      newSec.appendChild(newDiv);
    }
    document.body.appendChild(newSec);
  }
}


var stack = document.getElementsByClassName('stack');

for(var i = 0, len = stack.length; i < len; i++) {
    stack[i].onclick = function () {
        this.classList.add("active");
        document.getElementById("back").classList.add("blur");
        document.getElementById("fader").classList.add("fade");
    }
}

var container = document.querySelectorAll("article");

[].forEach.call(container, function(con) {
    con.onclick = function () {


      [].forEach.call(container, function(con) {
          con.classList.remove("info");
      });

      var levels = document.querySelectorAll(".level");
      [].forEach.call(levels, function(lev) {
          lev.classList.remove("front");
      });


      this.parentNode.classList.add("front");

      this.classList.add("info");



    }
});
document.getElementById("fader").onclick = function(){

  var levels = document.querySelectorAll(".level");
  [].forEach.call(levels, function(lev) {
      lev.classList.remove("front");
  });

  var container = document.querySelectorAll("article");

  [].forEach.call(container, function(con) {
      con.classList.remove("info");
  });


for(var i = 0, len = stack.length; i < len; i++) {
    stack[i].classList.remove("active");
    document.getElementById("back").classList.remove("blur");
    document.getElementById("fader").classList.remove("fade");
}


}

