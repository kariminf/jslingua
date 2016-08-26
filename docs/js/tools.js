/**
 * Read morse code and output as sound <br>
 * Example: readMorse("..-. .--   ..-.");
 * @param  {string} morse morse code written using ".", "-" and blacks " ".
 */
function readMorse(morse){
  var dotLength = 0.07;
  var AudioContext = window.AudioContext || window.webkitAudioContext;
  var context = new AudioContext();
  var gain = context.createGain();
  gain.gain.value = 0;
  var osc = context.createOscillator();
  osc.frequency.value = 600;
  osc.connect(gain);
  gain.connect(context.destination);
  osc.start(0);
  var i;
  var time0 = context.currentTime;
  var time = time0;
  for (i =0; i< morse.length; i++){
    var char = morse.charAt(i);
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
      default:
    }
  }

  osc.stop(time-time0);
}

/**
 * Transform HTML reserved characters to their equivalent codes in HTML.<br>
 * for example: "<" is transformed to "&lt;".
 * @param  {string} str normal string
 * @return {string}     skip string
 */
function htmlEntities(str) {
  var result = String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;');
  result = result.replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/ /gi, "&nbsp;");
  return result;
}
