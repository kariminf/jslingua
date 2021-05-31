/**
 * The tools module
 * @module tools
 */
"use strict";

/**
 * Read morse code and output as sound <br>
 * @example
 * readMorse("..-. .--   ..-.");
 *
 * @method readMorse
 * @public
 * @static
 * @param  {String} morse morse code written using ".", "-" and blacks " ".
 */
function readMorse(morse) {
  let dotLength = 0.07,
  AudioContext = window.AudioContext || window.webkitAudioContext,
  context = new AudioContext(),
  gain = context.createGain(),
  osc = context.createOscillator();

  gain.gain.value = 0;

  osc.frequency.value = 600;
  osc.connect(gain);
  gain.connect(context.destination);
  osc.start(0);
  let i,
  time0 = context.currentTime,
  time = time0;

  for (i =0; i< morse.length; i++){
    let char = morse.charAt(i);
    switch (char) {
      case ".":
        gain.gain.setValueAtTime(1.0, time);
        time += dotLength;
        gain.gain.setValueAtTime(0.0, time);
        time += dotLength;
        break;
      case "-":
        gain.gain.setValueAtTime(1.0, time);
        time += 3 * dotLength;
        gain.gain.setValueAtTime(0.0, time);
        time += dotLength;
        break;
      case " ":
        gain.gain.setValueAtTime(0.0, time);
        time += 3 * dotLength;
        break;
      default:
    }
  }

  osc.stop(time-time0);
}

/**
 * Transform HTML reserved characters to their equivalent codes in HTML.<br>
 * for example: "<" is transformed to "&lt;".
 *
 * @method htmlEntities
 * @public
 * @static
 * @param  {String} str normal string
 * @return {String}     skip string
 */
function htmlEntities(str) {
  let result = String(str).replace(/&/g, "&amp;").replace(/</g, "&lt;");
  result = result.replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/ /gi, "&nbsp;");
  return result;
}
