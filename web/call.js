
var path = "../dist/";

{
  var script = document.currentScript;
  var fullUrl = script.src;

  //console.log(fullUrl);

  if (fullUrl.includes("github.io")){
    path = "https://unpkg.com/jslingua@latest/dist/";
  }
}


function addScript(name){
  document.write('<script type="text/javascript" src="' + path + name + '"><\/script>');
}
