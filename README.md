The Random Hajemulator (Thanks, Kirk!) a.k.a. JSEmu
===================================================

Or: An Adventure In Emulation For JavaScript
--------------------------------------------

Okay... so this is the thought process behind doing this. I'm a software engineer working on the front end
for a very large company. Most of my work involves CSS and HTML and whilst HTML isn't too bad, CSS tends
to numb my brain... There is some JavaScript stuff and that's where I revel. We use a framework at our
company called TroopJS (you should check it out on GitHub) and I enjoy working with it. However a lot of
the stuff we do is actually in .NET... I'm more familiar with LAMP stacks as opposed to WISA (Windows, IIS,
SQL, ASP.NET).

So that's where this came up. I like fiddling with things in my off-time. I was in my element when I got my
Raspberry Pi and began experimenting with home automation (although that came to an end when we moved to
a smaller apartment and things got packed away) and with the increasing popularity of HTML5 and associated
technologies, I wanted to start building on my knowledge of that as it can only help me in my career.

Browsing the web one day, I noticed there was a GameBoy emulator written in JavaScript and I thought to
myself: "What a great idea!". And then I thought: "I wish I knew how emulators worked internally". That was
quickly followed by: "I want to learn how to build one!". Luckily, this day and age, there are numerous
tutorials on the internet about building emulators. And the vast majority of them are for people who use
C or C++... There was a C# one somewhere and a Java one, but very little in terms of JavaScript. I guess
that even though JavaScript is the most deployed 'language' on the planet, it doesn't get taken too
seriously... Mind you, it is a perfect language for object-oriented programming on the web.

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

- [x] Loading a binary file into an array buffer.
- [x] When working with bytes, especially in JavaScript, make sure they remain bytes! Overflows suck.
- [x] A good, strong technical reference is essential in creating an emulation engine.
- [x] When emulators go wrong, you wish you'd have written unit tests.
- [x] When you write unit tests, probably best to do them before you implement an opcode.
- [x] Retroactively writing unit tests points out gaping flaws in the code.
- [x] Going over the code word-by-word is a good way to re-think implementation and find errors of judgement.
- [x] Coffee is king.