class Square {
  //var policy; // 1 is up, 2 is right, 3 is down, 4 is left, 5 is grey wall, 6 is +1 green, 7 is -1 red
  //var expectedValue; // expected value of being in this cell and then acting optimally
  
  
  /*constructor() {
    this.height = 5;
    this.width = 5;
	this.policy = 1; // initialize to up
	this.expectedValue = 0; // initialize to 0 expected value
  }*/
  
  constructor(wall) {
    this.height = 5;
	this.width = 5;
	this.policy = wall;
	if(wall != 5 && wall != 6 && wall != 7)
	  this.expectedValue = 0;
    else if(wall == 6)
	  this.expectedValue = 1;
    else if(wall == 7)
      this.expectedValue = -1;
    else if(wall == 5)
	  this.expectedValue = 0;
  
  }
  // Getter
  getExpectedValue() {
    return this.expectedValue;
  }
  // Method
  getPolicy() {
    return this.policy;
  }
  
  setExpectedValue(expectedV) {
	this.expectedValue = expectedV;
  }
  
  setPolicy(newPolicy) {
    this.policy = newPolicy;
  }
}


function runthis(){
	
	//var nn = prompt("Please enter the noise (decimal number between 0 and 1 which represents the chance the robot will not move as recommended)");
    //var rr = prompt("Enter the living reward (cost of living in each cell other than terminal cells ex: -0.01)");
	//var gg = prompt("Enter the discount factor (decimal between 0 and 1 - depreciating value of utility)");
	var enter = parseFloat(prompt("If you would like to enter values, press '1'. If you would like to use default values, press '0'" ))
	if(enter == 1){
		var iterations = parseInt(prompt("Enter the number of iterations between 1 and 100"));
		var r = parseFloat(prompt("Enter the living reward"));
		var n = parseFloat(prompt("Enter the noise (the chance the agent (robot) will not move as instructed"));
		var g = parseFloat(prompt("Enter the gamma (discount factor / depreciating value of utility)"));
	}
	else{
		var iterations = 99;
		var r = 0;
		var n = 0.200; // noise - chance the agent will not move as instructed -- user input
		//var r = 0; // living reward - cost of living in each cell other than terminal cells
		var g = 0.900;  // gamma - the discount factor - depreciating value of utility!
	}
	/*if (person != null) 
        document.getElementById("demo").innerHTML =
        "Hello " + person + "! How are you today?";
    }*/
	//var n = parseFloat(nn);
	//var r = parseFloat(rr);
	//var g = parseFloat(gg);
    
	
	
	var newSquare = new Square(1);
	console.log("main method is executed");
	
	
	var square00 = new Square(2);
	var square01 = new Square(2);
	var square02 = new Square(2);
	var square03 = new Square(6);  // 6 is green +1
	var square10 = new Square(2);
	var square11 = new Square(5);  // if 5 then this is a wall and should be grey
	var square12 = new Square(4); 
	var square13 = new Square(7);  // 7 is red -1
	var square20 = new Square(2);
	var square21 = new Square(2);
	var square22 = new Square(2);
	var square23 = new Square(3);
	
	var square00N = new Square(2);
	var square01N = new Square(2);
	var square02N = new Square(2);
	var square03N = new Square(6);  // 6 is green +1
	var square10N = new Square(2);
	var square11N = new Square(5);  // if 5 then this is a wall and should be grey
	var square12N = new Square(4); 
	var square13N = new Square(7);  // 7 is red -1
	var square20N = new Square(2);
	var square21N = new Square(2);
	var square22N = new Square(2);
	var square23N = new Square(3);
	
	var myGrid = [
       [square00, square01, square02, square03],
       [square10, square11, square12, square13],
       [square20, square21, square22, square23]
    ];

	var nextGrid = [
       [square00N, square01N, square02N, square03N],
       [square10N, square11N, square12N, square13N],
       [square20N, square21N, square22N, square23N]
    ];
	
	//document.getElementById('message').innerText= newSquare.getPolicy() + square11.getPolicy() + nextGrid[2][3];
	
	//document.getElementById('message').innerText= myGrid[0][0].getExpectedValue() + nextGrid[0][3].getExpectedValue() + nextGrid[0][3].getPolicy();
	
	for(var m = 1; m <= iterations; m++){
	    for(var i = 0; i < 3; i++)
		    for(var j = 0; j < 4; j++)
			    updatePolicyForSquare(myGrid, nextGrid, i, j, n, r, g);
		displayUpdates(nextGrid);
	    updateNextToMy(myGrid, nextGrid);
	}
	
	
	
	
	// testing my code!!!
	
	console.log(nextGrid[0][2].getExpectedValue());
	console.log(myGrid[0][2].getExpectedValue());
	console.log(nextGrid[0][1].getExpectedValue());
	console.log(myGrid[0][1].getExpectedValue());
	console.log(nextGrid[1][2].getExpectedValue());
	console.log(myGrid[1][2].getExpectedValue());
	console.log(nextGrid[0][0].getExpectedValue());
	console.log(myGrid[0][0].getExpectedValue());
	
	//displayUpdates(myGrid, nextGrid)	
}
    //
    // work on this.  check out the screen shot i took last night.  try to create a button that does this value iteration
	function displayUpdates(nextGrid){
		var a = document.getElementById("item11");
	    a.children[4].innerText = nextGrid[0][0].getExpectedValue().toFixed(2);
	    
		a.children[1].style.color = "yellow";
		a.children[3].style.color = "yellow";
		a.children[5].style.color = "yellow";
		a.children[7].style.color = "yellow";
		a.children[1].style.opacity = 0.1;
		a.children[3].style.opacity = 0.1;
		a.children[5].style.opacity = 0.1;
		a.children[7].style.opacity = 0.1;
		
		if(nextGrid[0][0].getPolicy() == 1)
			a.children[1].style.opacity = 1;
		else if(nextGrid[0][0].getPolicy() == 2)
			a.children[5].style.opacity = 1;
		else if(nextGrid[0][0].getPolicy() == 3)
			a.children[7].style.opacity = 1;
		else if(nextGrid[0][0].getPolicy() == 4)
			a.children[3].style.opacity = 1;
		
		var b = document.getElementById("item12");
	    b.children[4].innerText = nextGrid[0][1].getExpectedValue().toFixed(2);
	    
		b.children[1].style.color = "yellow";
		b.children[3].style.color = "yellow";
		b.children[5].style.color = "yellow";
	    b.children[7].style.color = "yellow";
		b.children[1].style.opacity = 0.1;
		b.children[3].style.opacity = 0.1;
		b.children[5].style.opacity = 0.1;
		b.children[7].style.opacity = 0.1;
		
		if(nextGrid[0][1].getPolicy() == 1)
			b.children[1].style.opacity = 1;
		else if(nextGrid[0][1].getPolicy() == 2)
			b.children[5].style.opacity = 1;
		else if(nextGrid[0][1].getPolicy() == 3)
			b.children[7].style.opacity = 1;
		else if(nextGrid[0][1].getPolicy() == 4)
			b.children[3].style.opacity = 1;
		
		var c = document.getElementById("item13");
	    c.children[4].innerText = nextGrid[0][2].getExpectedValue().toFixed(2);
	    
		c.children[1].style.color = "yellow";
		c.children[3].style.color = "yellow";
		c.children[5].style.color = "yellow";
		c.children[7].style.color = "yellow";
		c.children[1].style.opacity = 0.1;
		c.children[3].style.opacity = 0.1;
		c.children[5].style.opacity = 0.1;
		c.children[7].style.opacity = 0.1;
		
		if(nextGrid[0][2].getPolicy() == 1)
			c.children[1].style.opacity = 1;
		else if(nextGrid[0][2].getPolicy() == 2)
			c.children[5].style.opacity = 1;
		else if(nextGrid[0][2].getPolicy() == 3)
			c.children[7].style.opacity = 1;
		else if(nextGrid[0][2].getPolicy() == 4)
			c.children[3].style.opacity = 1;
		
		var d = document.getElementById("item21");
	    d.children[4].innerText = nextGrid[1][0].getExpectedValue().toFixed(2);
	    
		d.children[1].style.color = "yellow";
		d.children[3].style.color = "yellow";
		d.children[5].style.color = "yellow";
		d.children[7].style.color = "yellow";
		d.children[1].style.opacity = 0.1;
		d.children[3].style.opacity = 0.1;
		d.children[5].style.opacity = 0.1;
		d.children[7].style.opacity = 0.1;
		
		if(nextGrid[1][0].getPolicy() == 1)
			d.children[1].style.opacity = 1;
		else if(nextGrid[1][0].getPolicy() == 2)
			d.children[5].style.opacity = 1;
		else if(nextGrid[1][0].getPolicy() == 3)
			d.children[7].style.opacity = 1;
		else if(nextGrid[1][0].getPolicy() == 4)
			d.children[3].style.opacity = 1;

		var e = document.getElementById("item23");
		e.children[4].innerText = nextGrid[1][2].getExpectedValue().toFixed(2);

		e.children[1].style.color = "yellow";
		e.children[3].style.color = "yellow";
		e.children[5].style.color = "yellow";
		e.children[7].style.color = "yellow";
		e.children[1].style.opacity = 0.1;
		e.children[3].style.opacity = 0.1;
		e.children[5].style.opacity = 0.1;
		e.children[7].style.opacity = 0.1;

		if(nextGrid[1][2].getPolicy() == 1)
			e.children[1].style.opacity = 1;
		else if(nextGrid[1][2].getPolicy() == 2)
			e.children[5].style.opacity = 1;
		else if(nextGrid[1][2].getPolicy() == 3)
			e.children[7].style.opacity = 1;
		else if(nextGrid[1][2].getPolicy() == 4)
			e.children[3].style.opacity = 1;

		var f = document.getElementById("item31");
		f.children[4].innerText = nextGrid[2][0].getExpectedValue().toFixed(2);

		f.children[1].style.color = "yellow";
		f.children[3].style.color = "yellow";
		f.children[5].style.color = "yellow";
		f.children[7].style.color = "yellow";
		f.children[1].style.opacity = 0.1;
		f.children[3].style.opacity = 0.1;
		f.children[5].style.opacity = 0.1;
		f.children[7].style.opacity = 0.1;

		if(nextGrid[2][0].getPolicy() == 1)
			f.children[1].style.opacity = 1;
		else if(nextGrid[2][0].getPolicy() == 2)
			f.children[5].style.opacity = 1;
		else if(nextGrid[2][0].getPolicy() == 3)
			f.children[7].style.opacity = 1;
		else if(nextGrid[2][0].getPolicy() == 4)
			f.children[3].style.opacity = 1;

		var g = document.getElementById("item32");
		g.children[4].innerText = nextGrid[2][1].getExpectedValue().toFixed(2);

		g.children[1].style.color = "yellow";
		g.children[3].style.color = "yellow";
		g.children[5].style.color = "yellow";
		g.children[7].style.color = "yellow";
		g.children[1].style.opacity = 0.1;
		g.children[3].style.opacity = 0.1;
		g.children[5].style.opacity = 0.1;
		g.children[7].style.opacity = 0.1;

		if(nextGrid[2][1].getPolicy() == 1)
			g.children[1].style.opacity = 1;
		else if(nextGrid[2][1].getPolicy() == 2)
			g.children[5].style.opacity = 1;
		else if(nextGrid[2][1].getPolicy() == 3)
			g.children[7].style.opacity = 1;
		else if(nextGrid[2][1].getPolicy() == 4)
			g.children[3].style.opacity = 1;

		var h = document.getElementById("item33");
		h.children[4].innerText = nextGrid[2][2].getExpectedValue().toFixed(2);

		h.children[1].style.color = "yellow";
		h.children[3].style.color = "yellow";
		h.children[5].style.color = "yellow";
		h.children[7].style.color = "yellow";
		h.children[1].style.opacity = 0.1;
		h.children[3].style.opacity = 0.1;
		h.children[5].style.opacity = 0.1;
		h.children[7].style.opacity = 0.1;

		if(nextGrid[2][2].getPolicy() == 1)
			h.children[1].style.opacity = 1;
		else if(nextGrid[2][2].getPolicy() == 2)
			h.children[5].style.opacity = 1;
		else if(nextGrid[2][2].getPolicy() == 3)
			h.children[7].style.opacity = 1;
		else if(nextGrid[2][2].getPolicy() == 4)
			h.children[3].style.opacity = 1;

		var i = document.getElementById("item34");
		i.children[4].innerText = nextGrid[2][3].getExpectedValue().toFixed(2);

		i.children[1].style.color = "yellow";
		i.children[3].style.color = "yellow";
		i.children[5].style.color = "yellow";
		i.children[7].style.color = "yellow";
		i.children[1].style.opacity = 0.1;
		i.children[3].style.opacity = 0.1;
		i.children[5].style.opacity = 0.1;
		i.children[7].style.opacity = 0.1;

		if(nextGrid[2][3].getPolicy() == 1)
			i.children[1].style.opacity = 1;
		else if(nextGrid[2][3].getPolicy() == 2)
			i.children[5].style.opacity = 1;
		else if(nextGrid[2][3].getPolicy() == 3)
			i.children[7].style.opacity = 1;
		else if(nextGrid[2][3].getPolicy() == 4)
			i.children[3].style.opacity = 1;        


		
	}
    // copys the values of my nextGrid into myGrid.  
    function updateNextToMy(myGrid, nextGrid){
	    for(var i = 0; i < 3; i++)
			for(var j = 0; j < 4; j++){
			    myGrid[i][j].setPolicy(nextGrid[i][j].getPolicy());
				myGrid[i][j].setExpectedValue(nextGrid[i][j].getExpectedValue());
			}
    }

    // updates nextGrid to the next value iteration using myGrid
    function updatePolicyForSquare(myGrid, nextGrid, i, j, n, r, g)
    {
	// myGrid is the current grid
	// nextGrid is the the next grid
	// i is the row (0 - n-1)
	// j is the column (0 - m-1)
	// n is the noise ( % chance the agent will not move where we tell it to
	// r is the living reward
	// g is the gamma ( 0 < gamma <= 1)
	
	
	    if(i == 0 && j == 0){
	        var max = -10000000;
	        var a;
	        for(var k = 1; k <= 4; k++){
	            if(k == 1){
                    var a = (1-n)*(r+g*(myGrid[0][0].getExpectedValue())) + (n/2)*(r+g*myGrid[0][1].getExpectedValue()) + (n/2)*(r+g*myGrid[0][0].getExpectedValue());
			        if( a > max){
					   max = a;
                       nextGrid[0][0].setExpectedValue(a);
                       nextGrid[0][0].setPolicy(1);
			        }
	            }
                if(k == 2){
                    var a = (1-n)*(r+g*(myGrid[0][1].getExpectedValue())) + (n/2)*(r+g*myGrid[1][0].getExpectedValue()) + (n/2)*(r+g*myGrid[0][0].getExpectedValue());
                    if( a > max){
						max = a;
                        nextGrid[0][0].setExpectedValue(a);
                        nextGrid[0][0].setPolicy(2);
                    }
                }
				if(k == 3){
				    var a = (1-n)*(r+g*(myGrid[1][0].getExpectedValue())) + (n/2)*(r+g*myGrid[0][1].getExpectedValue()) + (n/2)*(r+g*myGrid[0][0].getExpectedValue());
				    if( a > max){
						max = a;
					    nextGrid[0][0].setExpectedValue(a);
				        nextGrid[0][0].setPolicy(3);
				    }
                }
                if(k == 4){
					var a = (1-n)*(r+g*(myGrid[0][0].getExpectedValue())) + (n/2)*(r+g*myGrid[1][0].getExpectedValue()) + (n/2)*(r+g*myGrid[0][0].getExpectedValue());
                    if( a > max){
						max = a;
                        nextGrid[0][0].setExpectedValue(a);
                        nextGrid[0][0].setPolicy(4);
				    }
				}
			}
        }
		
		else if(i == 0 && j == 1){
	        var max = -1000000;
	        var a;
	        for(var k = 1; k <= 4; k++){
	            if(k == 1){
                    var a = (1-n)*(r+g*(myGrid[0][1].getExpectedValue())) + (n/2)*(r+g*myGrid[0][0].getExpectedValue()) + (n/2)*(r+g*myGrid[0][2].getExpectedValue());
			        if( a > max){
					   max = a;
                       nextGrid[0][1].setExpectedValue(a);
                       nextGrid[0][1].setPolicy(1);
			        }
	            }
                if(k == 2){
                    var a = (1-n)*(r+g*(myGrid[0][2].getExpectedValue())) + (n/2)*(r+g*myGrid[0][1].getExpectedValue()) + (n/2)*(r+g*myGrid[0][1].getExpectedValue());
                    if( a > max){
						max = a;
                        nextGrid[0][1].setExpectedValue(a);
                        nextGrid[0][1].setPolicy(2);
                    }
                }
				if(k == 3){
				    var a = (1-n)*(r+g*(myGrid[0][1].getExpectedValue())) + (n/2)*(r+g*myGrid[0][0].getExpectedValue()) + (n/2)*(r+g*myGrid[0][2].getExpectedValue());
				    if( a > max){
						max = a;
					    nextGrid[0][1].setExpectedValue(a);
				        nextGrid[0][1].setPolicy(3);
				    }
                }
                if(k == 4){
					var a = (1-n)*(r+g*(myGrid[0][0].getExpectedValue())) + (n/2)*(r+g*myGrid[0][1].getExpectedValue()) + (n/2)*(r+g*myGrid[0][1].getExpectedValue());
                    if( a > max){
						max = a;
                        nextGrid[0][1].setExpectedValue(a);
                        nextGrid[0][1].setPolicy(4);
				    }
				}
			}
        }
		
		else if(i == 0 && j == 2){
	        var max = -1000000;
	        var a;
	        for(var k = 1; k <= 4; k++){
	            if(k == 1){
                    var a = (1-n)*(r+g*(myGrid[0][2].getExpectedValue())) + (n/2)*(r+g*myGrid[0][1].getExpectedValue()) + (n/2)*(r+g*myGrid[0][3].getExpectedValue());
			        if( a > max){
					   max = a;
                       nextGrid[0][2].setExpectedValue(a);
                       nextGrid[0][2].setPolicy(1);
			        }
	            }
                if(k == 2){
                    var a = (1-n)*(r+g*(myGrid[0][3].getExpectedValue())) + (n/2)*(r+g*myGrid[1][2].getExpectedValue()) + (n/2)*(r+g*myGrid[0][2].getExpectedValue());
                    if( a > max){
						max = a;
                        nextGrid[0][2].setExpectedValue(a);
                        nextGrid[0][2].setPolicy(2);
                    }
                }
				if(k == 3){
				    var a = (1-n)*(r+g*(myGrid[1][2].getExpectedValue())) + (n/2)*(r+g*myGrid[0][1].getExpectedValue()) + (n/2)*(r+g*myGrid[0][3].getExpectedValue());
				    if( a > max){
						max = a;
					    nextGrid[0][2].setExpectedValue(a);
				        nextGrid[0][2].setPolicy(3);
				    }
                }
                if(k == 4){
					var a = (1-n)*(r+g*(myGrid[0][1].getExpectedValue())) + (n/2)*(r+g*myGrid[1][2].getExpectedValue()) + (n/2)*(r+g*myGrid[0][2].getExpectedValue());
                    if( a > max){
						max = a;
                        nextGrid[0][2].setExpectedValue(a);
                        nextGrid[0][2].setPolicy(4);
				    }
				}
			}
        }
		
		else if(i == 1 && j == 0){
	        var max = -1000000;
	        var a;
	        for(var k = 1; k <= 4; k++){
	            if(k == 1){
                    var a = (1-n)*(r+g*(myGrid[0][0].getExpectedValue())) + (n/2)*(r+g*myGrid[1][0].getExpectedValue()) + (n/2)*(r+g*myGrid[1][0].getExpectedValue());
			        if( a > max){
					   max = a;
                       nextGrid[1][0].setExpectedValue(a);
                       nextGrid[1][0].setPolicy(1);
			        }
	            }
                if(k == 2){
                    var a = (1-n)*(r+g*(myGrid[1][0].getExpectedValue())) + (n/2)*(r+g*myGrid[0][0].getExpectedValue()) + (n/2)*(r+g*myGrid[2][0].getExpectedValue());
                    if( a > max){
						max = a;
                        nextGrid[1][0].setExpectedValue(a);
                        nextGrid[1][0].setPolicy(2);
                    }
                }
				if(k == 3){
				    var a = (1-n)*(r+g*(myGrid[2][0].getExpectedValue())) + (n/2)*(r+g*myGrid[1][0].getExpectedValue()) + (n/2)*(r+g*myGrid[1][0].getExpectedValue());
				    if( a > max){
						max = a;
					    nextGrid[1][0].setExpectedValue(a);
				        nextGrid[1][0].setPolicy(3);
				    }
                }
                if(k == 4){
					var a = (1-n)*(r+g*(myGrid[1][0].getExpectedValue())) + (n/2)*(r+g*myGrid[0][0].getExpectedValue()) + (n/2)*(r+g*myGrid[2][0].getExpectedValue());
                    if( a > max){
						max = a;
                        nextGrid[1][0].setExpectedValue(a);
                        nextGrid[1][0].setPolicy(4);
				    }
				}
			}
        }
		
		else if(i == 1 && j == 2){
	        var max = -1000000;
	        var a;
	        for(var k = 1; k <= 4; k++){
	            if(k == 1){
                    var a = (1-n)*(r+g*(myGrid[0][2].getExpectedValue())) + (n/2)*(r+g*myGrid[1][2].getExpectedValue()) + (n/2)*(r+g*myGrid[1][3].getExpectedValue());
			        if( a > max){
					   max = a;
                       nextGrid[1][2].setExpectedValue(a);
                       nextGrid[1][2].setPolicy(1);
			        }
	            }
                if(k == 2){
                    var a = (1-n)*(r+g*(myGrid[1][3].getExpectedValue())) + (n/2)*(r+g*myGrid[0][2].getExpectedValue()) + (n/2)*(r+g*myGrid[2][2].getExpectedValue());
                    if( a > max){
						max = a;
                        nextGrid[1][2].setExpectedValue(a);
                        nextGrid[1][2].setPolicy(2);
                    }
                }
				if(k == 3){
				    var a = (1-n)*(r+g*(myGrid[2][2].getExpectedValue())) + (n/2)*(r+g*myGrid[1][3].getExpectedValue()) + (n/2)*(r+g*myGrid[1][2].getExpectedValue());
				    if( a > max){
						max = a;
					    nextGrid[1][2].setExpectedValue(a);
				        nextGrid[1][2].setPolicy(3);
				    }
                }
                if(k == 4){
					var a = (1-n)*(r+g*(myGrid[1][2].getExpectedValue())) + (n/2)*(r+g*myGrid[0][2].getExpectedValue()) + (n/2)*(r+g*myGrid[2][2].getExpectedValue());
                    if( a > max){
						max = a;
                        nextGrid[1][2].setExpectedValue(a);
                        nextGrid[1][2].setPolicy(4);
				    }
				}
			}
        }
		
		else if(i == 2 && j == 0){
	        var max = -1000000;
	        var a;
	        for(var k = 1; k <= 4; k++){
	            if(k == 1){
                    var a = (1-n)*(r+g*(myGrid[1][0].getExpectedValue())) + (n/2)*(r+g*myGrid[2][0].getExpectedValue()) + (n/2)*(r+g*myGrid[2][1].getExpectedValue());
			        if( a > max){
					   max = a;
                       nextGrid[2][0].setExpectedValue(a);
                       nextGrid[2][0].setPolicy(1);
			        }
	            }
                if(k == 2){
                    var a = (1-n)*(r+g*(myGrid[2][1].getExpectedValue())) + (n/2)*(r+g*myGrid[2][0].getExpectedValue()) + (n/2)*(r+g*myGrid[1][0].getExpectedValue());
                    if( a > max){
						max = a;
                        nextGrid[2][0].setExpectedValue(a);
                        nextGrid[2][0].setPolicy(2);
                    }
                }
				if(k == 3){
				    var a = (1-n)*(r+g*(myGrid[2][0].getExpectedValue())) + (n/2)*(r+g*myGrid[2][0].getExpectedValue()) + (n/2)*(r+g*myGrid[2][1].getExpectedValue());
				    if( a > max){
						max = a;
					    nextGrid[2][0].setExpectedValue(a);
				        nextGrid[2][0].setPolicy(3);
				    }
                }
                if(k == 4){
					var a = (1-n)*(r+g*(myGrid[2][0].getExpectedValue())) + (n/2)*(r+g*myGrid[2][0].getExpectedValue()) + (n/2)*(r+g*myGrid[1][0].getExpectedValue());
                    if( a > max){
						max = a;
                        nextGrid[2][0].setExpectedValue(a);
                        nextGrid[2][0].setPolicy(4);
				    }
				}
			}
        }
		
		else if(i == 2 && j == 1){
	        var max = -1000000;
	        var a;
	        for(var k = 1; k <= 4; k++){
	            if(k == 1){
                    var a = (1-n)*(r+g*(myGrid[2][1].getExpectedValue())) + (n/2)*(r+g*myGrid[2][0].getExpectedValue()) + (n/2)*(r+g*myGrid[2][2].getExpectedValue());
			        if( a > max){
					   max = a;
                       nextGrid[2][1].setExpectedValue(a);
                       nextGrid[2][1].setPolicy(1);
			        }
	            }
                if(k == 2){
                    var a = (1-n)*(r+g*(myGrid[2][2].getExpectedValue())) + (n/2)*(r+g*myGrid[2][1].getExpectedValue()) + (n/2)*(r+g*myGrid[2][1].getExpectedValue());
                    if( a > max){
						max = a;
                        nextGrid[2][1].setExpectedValue(a);
                        nextGrid[2][1].setPolicy(2);
                    }
                }
				if(k == 3){
				    var a = (1-n)*(r+g*(myGrid[2][1].getExpectedValue())) + (n/2)*(r+g*myGrid[2][0].getExpectedValue()) + (n/2)*(r+g*myGrid[2][2].getExpectedValue());
				    if( a > max){
						max = a;
					    nextGrid[2][1].setExpectedValue(a);
				        nextGrid[2][1].setPolicy(3);
				    }
                }
                if(k == 4){
					var a = (1-n)*(r+g*(myGrid[2][0].getExpectedValue())) + (n/2)*(r+g*myGrid[2][1].getExpectedValue()) + (n/2)*(r+g*myGrid[2][1].getExpectedValue());
                    if( a > max){
						max = a;
                        nextGrid[2][1].setExpectedValue(a);
                        nextGrid[2][1].setPolicy(4);
				    }
				}
			}
        }
		
		else if(i == 2 && j == 2){
	        var max = -1000000;
	        var a;
	        for(var k = 1; k <= 4; k++){
	            if(k == 1){
                    var a = (1-n)*(r+g*(myGrid[1][2].getExpectedValue())) + (n/2)*(r+g*myGrid[2][1].getExpectedValue()) + (n/2)*(r+g*myGrid[2][3].getExpectedValue());
			        if( a > max){
					   max = a;
                       nextGrid[2][2].setExpectedValue(a);
                       nextGrid[2][2].setPolicy(1);
			        }
	            }
                if(k == 2){
                    var a = (1-n)*(r+g*(myGrid[2][3].getExpectedValue())) + (n/2)*(r+g*myGrid[2][2].getExpectedValue()) + (n/2)*(r+g*myGrid[1][2].getExpectedValue());
                    if( a > max){
						max = a;
                        nextGrid[2][2].setExpectedValue(a);
                        nextGrid[2][2].setPolicy(2);
                    }
                }
				if(k == 3){
				    var a = (1-n)*(r+g*(myGrid[2][2].getExpectedValue())) + (n/2)*(r+g*myGrid[2][1].getExpectedValue()) + (n/2)*(r+g*myGrid[2][3].getExpectedValue());
				    if( a > max){
						max = a;
					    nextGrid[2][2].setExpectedValue(a);
				        nextGrid[2][2].setPolicy(3);
				    }
                }
                if(k == 4){
					var a = (1-n)*(r+g*(myGrid[2][1].getExpectedValue())) + (n/2)*(r+g*myGrid[2][2].getExpectedValue()) + (n/2)*(r+g*myGrid[1][2].getExpectedValue());
                    if( a > max){
						max = a;
                        nextGrid[2][2].setExpectedValue(a);
                        nextGrid[2][2].setPolicy(4);
				    }
				}
			}
        }
		
		else if(i == 2 && j == 3){
	        var max = -1000000;
	        var a;
	        for(var k = 1; k <= 4; k++){
	            if(k == 1){
                    var a = (1-n)*(r+g*(myGrid[1][3].getExpectedValue())) + (n/2)*(r+g*myGrid[2][2].getExpectedValue()) + (n/2)*(r+g*myGrid[2][3].getExpectedValue());
			        if( a > max){
					   max = a;
                       nextGrid[2][3].setExpectedValue(a);
                       nextGrid[2][3].setPolicy(1);
			        }
	            }
                if(k == 2){
                    var a = (1-n)*(r+g*(myGrid[2][3].getExpectedValue())) + (n/2)*(r+g*myGrid[2][3].getExpectedValue()) + (n/2)*(r+g*myGrid[1][3].getExpectedValue());
                    if( a > max){
						max = a;
                        nextGrid[2][3].setExpectedValue(a);
                        nextGrid[2][3].setPolicy(2);
                    }
                }
				if(k == 3){
				    var a = (1-n)*(r+g*(myGrid[2][3].getExpectedValue())) + (n/2)*(r+g*myGrid[2][3].getExpectedValue()) + (n/2)*(r+g*myGrid[2][2].getExpectedValue());
				    if( a > max){
						max = a;
					    nextGrid[2][3].setExpectedValue(a);
				        nextGrid[2][3].setPolicy(3);
				    }
                }
                if(k == 4){
					var a = (1-n)*(r+g*(myGrid[2][2].getExpectedValue())) + (n/2)*(r+g*myGrid[2][3].getExpectedValue()) + (n/2)*(r+g*myGrid[1][3].getExpectedValue());
                    if( a > max){
						max = a;
                        nextGrid[2][3].setExpectedValue(a);
                        nextGrid[2][3].setPolicy(4);
				    }
				}
			}
        }
		
    }
	
	
	


