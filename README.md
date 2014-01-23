JSEmu [![Build Status](https://travis-ci.org/PachiSystems/JSEmu.png?branch=master)](https://travis-ci.org/PachiSystems/JSEmu)
=====
a.k.a. Random Hajemulator
-------------------------

* Try it here: [PachiSystems JSEmu](http://PachiSystems.com/JSEmu/chip8.html)
* Learn how to tackle an emulator in JavaScript: [Introduction to Emulation in JavaScript](http://PachiSystems.com/how-to-write-an-emulator-in-javascript/)
* Next project: MOS 6502 which is used in Commodore 64, Atari 2600 and NES! YEAH, BABY!

Or: An Adventure In Emulation For JavaScript
--------------------------------------------

So... Why do it? Why spend hours in my off time to create something like this? Simple: Because I want to.

Most of the programming I know has been self taught over the years since leaving college. I studied Information
Technology at college for a year and came away with a partial GNVQ, but whilst there was a module in there on
programming with Visual Basic and another on Pascal, most of it was based around database design and networking
computers in different configurations with the old co-axial networking cables... Ah... Those were the days...

These days, I try to fiddle when I can with as much as I can. My full-time job is as a Front-End Engineer for a large
educational company. So I work mostly in JavaScript (although there's a large amount of CSS and HTML... Not too keen on
those, but at least there's usually some JavaScript at the end of the tunnel). Fiddling is also why I have experience
with C#, ANSI C, Microchip PIC, Python, Java and use the big 3 OSs on a daily basis (Well... Win 7 still, but I always
keep my Linux up to date and the new Mac I got has Mavericks, so I'm happy with that).

I'm not the kind of guy that will jump on a new technology until it's widely adopted or it really perks my interest. I
tend to stick to pure JS and occasionally use jQuery to assist in that. Recently I've been using TroopJS as well, but
that's another story.

Notes about development
-----------------------

I found two awesome resources at the beginning of this project for the Chip-8 emulator. Those resources are [Cowgod's
Chip-8 Technical Reference](http://devernay.free.fr/hacks/chip8/C8TECH10.HTM‎) and [How To Write An Emulator (Chip-8 Interpreter)](http://www.multigesture.net/articles/how-to-write-an-emulator-chip-8-interpreter/) on MultiGesture.net. Please remember that
this is my first attempt at emulation and, whilst I really wanted to get it done, I did not (and this is important for
you to under stand) reference any other code that had been written for a Chip-8 emulator other than what was on those
two pages. That means the vast majority of the OPCODEs (with the exception of the examples given on the MultiGesture
page) were written myself. In addition, there were all kinds of bugs that threw up when writing it in JavaScript. The
biggest one was the fact that defining a byte means having to ensure that you %256... Something I'd forgotten and then
had to go back and change.

Using The Chip-8 Emulator
-------------------------

At present, only Space Invaders is available as it's hard coded into the HTML page and the only one in the repo. I do
plan on changing this in the future so that you can select any ROM designed for Chip-8. I might implement the SCHIP
OPCODEs at a later time if I find that I have a few of the Super Chip ROMs.

Anyway. Here's the files you need to have to make it work (I do plan on making a proper build which contains all 3):
- chip8.js
- display.js
- polyfill.js

You will also need a ROM... Feel free to download the roms folder, too. At the moment, only Space Invaders is there.

Set up your HTML page like so:
```
<!DOCTYPE html>
<html>
    <head>
        <script type="text/javascript" src="polyfill.js"></script>
        <script type="text/javascript" src="chip8.js"></script>
        <script type="text/javascript" src="display.js"></script>
    </head>
    <body>
        <canvas id="Chip8Display" width="640px" height="320px"></canvas>
        <script type="text/javascript">
            window.onload = function() {
                var Chip8Emulator = new Chip8Emu();
                var Chip8Screen = new Chip8Display();

                Chip8Screen.init("Chip8Display");
                Chip8Emulator.beginEmulation("roms/spaceinv.ch8",Chip8Screen);
            }
        </script>
    </body>
</html>
```

The things to watch out for are placing the correct paths to your .js files and ROM. The ROM path will be relative to
your HTML. Or you could use a full URL if you fancy. You could also use jQuery's document.ready as it would be a little
more reliable than window.onload. You should now have the Chip-8 Emulator working in the window and the following keymap
to play with:

```
  PC Keyboard   -->  Chip-8 Keypad
[1] [2] [3] [4]     [1] [2] [3] [C]
[Q] [W] [E] [R]     [4] [5] [6] [D]
[A] [S] [D] [F]     [7] [8] [9] [E]
[Z] [X] [C] [V]     [A] [0] [B] [F]
```

Make sure to follow this repo (maybe a star?... ;-P ) and get updates on its evolution. If I get some time over the
upcoming holiday, I may begin to implement a NES or Gameboy or some other 8-bit emulator... It's looking quite tempting
to emulate the MOS 6502 as that was used in the Apple II and Commodore 64 and later modified to the Rioch 2A03 for the
NES... What do you think?...