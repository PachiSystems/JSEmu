JSEmu
=====
a.k.a. Random Hajemulator
-------------------------

* Try it here: [PachiSystems JSEmu](http://PachiSystems.com/JSEmu/chip8.html)

Or: An Adventure In Emulation For JavaScript
--------------------------------------------

So... Why do it? Why spend hours in my off time to create something like this? Simple: Because I want to.

Programming used to be nomore than a hobby for me. I am self taught in almost every aspect of computer science and there
has been no other job in my woork history that has given me as much satisfaction. It's always been my goal to become a
developer. I never really bothered which language it was in (which is why I know a bit of quite a few languages) but
since becomming a real Front-End Engineer / Developer, I've kind of started doing more in the way of JavaScript.

Don't get me wrong, I will still dabble with C, Python and other languages on a regular basis, but JavaScript is the one
that pays the bills, so it's only natural I wanted to do more when it comes to that. I'd put myself in a mid-level
position when it comes down to it. Hence the desire to move myself up in the ranks of being able to develop things.

I'm not the kind of guy that will jump on a new technology until it's widely adopted or it really perks my interest. I
tend to stick to pure JS and occasionally use jQuery to assist in that. Recently I've been using TroopJS as well, but
that's another story.

Notes about development
-----------------------

I found two awesome resources at the beginning of this project for the Chip-8 emulator. Those resources are Cowgod's
Chip-8 Technical Reference and How To Write An Emulator (Chip-8 Interpreter) on MultiGesture.net. Please remember that
this is my first attempt at emulation and, whilst I really wanted to get it done, I did not (and this is important for
you to under stand) reference any other code that had been written for a Chip-8 emulator other than what was on those
two pages. That means the vast majority of the OPCODEs (with the exception of the examples given on the MultiGesture
page) were written myself. In addition, there were all kinds of bugs that threw up when writing it in JavaScript. The
biggest one was the fact that defining a byte means having to ensure that you %256... Something I'd forgotten and then
had to go back and change.

Apologies for the state of this README. However, once everything is working properly I'll make it a more useful
document as opposed to my ramblings and thoughts. Working also includes the test suite passing all tests. Sit tight, it
may take a while...

Things I've Learned Doing This
------------------------------

- Loading a binary file into an array buffer.
- When working with bytes, especially in JavaScript, make sure they remain bytes! Overflows suck.
- A good, strong technical reference is essential in creating an emulation engine.
- When emulators go wrong, you wish you'd have written unit tests.
- When you write unit tests, probably best to do them before you implement an opcode.
- Retroactively writing unit tests points out gaping flaws in the code.
- Going over the code word-by-word is a good way to re-think implementation and find errors of judgement.
- Coffee is king.
- setTimeout or a recursive call to requestAnimationFrame makes things perform much better than setInterval... D'oh!
