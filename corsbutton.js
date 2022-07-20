// some stuff to test a CORS setup in IIS web.config that handles multiple sub-domains per domains

function postCorsFetch(url, body) {
  return new Promise(async (resolve, reject) => {
    try {
      fetch(url, {
        body: JSON.stringify({ outputtype: "RawJson", ...body }),
        method: "POST",
        mode: "cors",
      })
        .then(function (res) {
          console.log("YAY CORS", res);
        })
        .catch(function (reason) {
          console.error("CORS FAILED", reason);
        })
        .finally(function () {
          console.log("cors finally...");
        });
    } catch (reason) {
      console.log("YAY CORS", res);
      reject(reason);
    }
  });
}
(function(){
    
    var corsButton = document.createElement('button');
    corsButton.innerText = "CAN HAZ CORZ?";
    document.getElementsByTagName('body')[0].appendChild(corsButton);
    console.log("DEBUG?", document.getElementsByTagName('body')[0])
    corsButton.onclick = function doTheThing() {
        postCorsFetch('http://win-machine/d-7/Primary/?FlowPath=My%20Apps/corsTest&action=api', {
            "something": "wicked this way comes",
            "sessionid": "NS-afedf927-1570-11e9-a392-902b34bb47a3"
        })
    }
})();
