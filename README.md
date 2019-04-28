# The Story
Dr. Jackie Sable accidentally double-booked themself for Friday, and won't be able to make it to their weekly Blackjack game with friends! Thinking fast, they ordered an exact robot replica to take their place, and everything is perfect, except this robot has no idea how to play Blackjack! Jackie doesn't know a thing about JavaScript, but as long as they think things through logically, things should be okay!

# What
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
* Three rounds are played per game, all using THE SAME DECK (an Ace revealed in the first round will not reappear in the next two rounds)

Once a bot is unleashed, there can be no modifications made to its behavior mid-game. Once a game has ended, then the user may tinker with the logic, but at the cost of completely wipng its score history.

# TODO
* Have logic blocks be read and submitted

#How To Build
- User can press buttons on the side to add a block to the working area
- Uppermost level blocks can be rearranged by dragging and dropping
- Clicking in a block's empty fields lets you put more blocks within that block
- Clicking anywhere else within a block brings up the delete prompt
- The submit button will not be available unless all fillable blocks are filled and all branches lead to either a Hit or a Stand