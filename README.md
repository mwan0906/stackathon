# The Story
Dr. Jackie Sable accidentally double-booked themself for Friday, and won't be able to make it to their weekly Blackjack game with friends! Thinking fast, they ordered an exact robot replica to take their place, and everything is perfect, except this robot has no idea how to play Blackjack! Jackie doesn't know a thing about JavaScript, but as long as they think things through logically, things should be okay!

# What is it?
A website to build an A.I. to play a multiplayer variation of Blackjack according to whatever rules you've given it, which is then pitted against other bots without intervention.

# The rules
The rules of this Blackjack variation are as followed:
* Each table has four players (you and three opponents)
* At the beginning of each round, everyone at the table is dealt two cards, one of them face-up and the other kept private
* During a round, any player may choose to Hit (draw another card from the deck) or Stand (end their turn)
* The goal of the game is to get a sum as close as possible to 21 without exceeding it
* Exceeding 21 is a Bust, or automatic loss
* Jacks, Queens, and Kings all count as 10 for the purposes of summing
* Aces count as 11 normally, or 1 when a 11 would cause a Bust
* If there are multiple Aces in the hand, they aren't necessarily the same value (for example, a hand of a 9 and two Aces sums up to 21-- 11 for the first Ace, and then a 1 for the second Ace)
* * Players with the highest score get 2 points
* * Players with the lowest score get 0 points
* * Any middling players get 1 point
* Three rounds are played per game, all using the same, unshuffled deck (in other words, an Ace revealed in the first round will not reappear in the next two rounds)

Once a bot is unleashed, there can be no modifications made to its behavior mid-game. Once a game has ended, then the user may tinker with the logic, but at the cost of completely wipng its score history.

# How To Build
- Buttons on the bottom describe the actions the user can add to the current working area.
- Clicking a button will add a block of that type to the work area, which can then be dragged and dropped as long as it's on the uppermost level (i.e. not nested.)
- If a block requires more information, then it will have clickable empty fields noted with a gray background and black text.
- Clicking on an empty field brings up new buttons on the bottom, which are the types of blocks that that field will accept. Blocks may be nested until no blanks remain.
- Blocks must ultimately end in either a HIT action or a STAND action. If the program doesn't encounter either after it's run through the whole workspace, then it will default to STAND.
- The program will refuse to let you proceed to game mode until all empty fields are filled. Attempting to hit Submit before then will display an error message.

# Libraries used
- Babel
- Webpack
- React
- Redux
- React-Redux
- React-Beautiful-DnD
- Express
- Axios
# APIs used
- Deck of Cards API