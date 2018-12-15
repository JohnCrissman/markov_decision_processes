# markov_decision_processes
simulation of a markov decision process

This project, MDP – John Crissman”, is a simulation of Markov Decision Processes.  Imagine what you see is a grid world or a maze and a robot (the agent) that can start in any of the black squares that have “0.00” on it.  Each of these black squares is a state (s).  The grey square is a wall and cannot be accessed.  If a robot moves towards the wall, or tries to move outside of the grid world, the robot will remain in the same square that it was just in.  The agent will move around the maze and, most likely, try to get to the green square “+1.00” and, in most cases, avoid the red square “-1.00”.  The “+1.00” and “-1.00” are rewards.  Once the agent gets to a red or green square, the agent exits the simulation.  The robot can only move north, west, east, or south.  The robot cannot move diagonally.  

There is also a living reward (r), which is a reward for being on the black squares.  The living reward may be zero, a negative number, or a positive number.  If the agent moves on the black squares for a while, the agent will accumulate the living rewards (r).  For example:  Suppose the living reward was (-0.2), then the following equation is true.      
(r) accumulated=∑_(each time the robot moves in the grid)▒〖-0.2〗
What if there is noise (n)?  The noise considers that the actions do not always go as planned.  Suppose the noise (n) is 0.1.  If the action of the agent is to go west, then there is a 0.9 chance the robot will go west.  There is a 0.05 (n/2) chance the robot will go north and the same chance the robot will go south.  Basically, if the noise is (n), then there is a (1-n) chance the robot will go in the desired direction and there is a (n/2) chance the robot will go left and a (n/2) chance the robot will go right.  All these values: 1-n, n/2, and n/2 all sum up to 1 giving us a probability distribution.  The robot lives in a stochastic grid world. 

We typically like to get our rewards sooner or later.  If we have our reward now, we are certain we received it and can maybe use it to get more reward, i.e. investing.  If we have our reward later, there is some uncertainty.  They are typically of more value to us now than they are later in time.  Also, we want our simulation to converge to a value over time.  In order to handle these two issues, we introduced a gamma (g).  We use gamma (g) to make the value of rewards decay exponentially.    

The goal of the agent is to maximize the sum of rewards that the agent accumulates over time, including the terminal states of “+1, green” and “-1, red”.  An action (a) is a direction (north, west, east, south) that the robot decides to move in from a given state (s).  The arrows in each state (s) show the possible actions for the agent.  A policy (π) is a set of actions(a) for each state.  An optimal policy (π^*) gives us the action (a) for each state that will give us the maximum expected reward, if the agent acts optimally over time.  

The expected reward starting in s and acting optimally is denoted as V*(s).  The probability that action (a) from state (s) leads to a specific / next state (s’) is denoted as P(s’|s, a).  The reward of taking action [a] from state (s) to a specific next sate (s’) is denoted as R(s,a,s’).  Using the formula below, we can calculate the expected value of our agent being in any given state and acting optimally as well as showing what the correct action should be.  
V*(s) = argmax(a) ∑_(for all s')▒█(P(s’│s,a)[R(s,a,s’)+g(gamma) V^* (s)]@)

The simulation will give the expected value and optimal policy of a robot being in each state and acting optimally.  The default values are: 
iterations (maximum number of time steps for the robot) = 99
living reward = 0
noise = 0.2
gamma = 0.9

The user will also have the option to enter their own values.  When the program starts the user will see a 3X4 grid with 9 black squares containing 4 directional arrows and “0.00”.  There will be one grey square, one green square with “+1”, and one red square with “-1”.  In order to start the simulation, the user needs to click on the button at the top left that reads “start MDP”.

When the user clicks that they have a choice of pressing 1 to enter their own values of iterations, r, n, and g.  They are also prompted to enter 0 for the default values.  If the user enters 1, they will enter their own values.  If the user presses anything else and clicks ok, they will be using the default values.  After using the default values, or their own values, the user will see different numbers appear in the black boxes (states) as well as an arrow illuminate to yellow in each state.  

These numbers indicate the expected value (expected utility) of starting in that specific state and acting optimally given the chosen iterations (maximum time steps by the agent), r (living reward), g (gamma), and n (noise).  The yellow arrows in each state indicate the optimal action for the agent in order to receive the maximum expected utility from that state assuming the agent acts optimally thereafter.  

Please refresh the page in order to try simulations using difference numbers. 
