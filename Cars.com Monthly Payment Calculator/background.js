
 let form = document.getElementById("calculator");

 // chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
 //   chrome.tabs.sendMessage(tabs[0].id, {greeting: "hello"}, function(response) {
 //     console.log(response.farewell);
 //   });
 // });

form.addEventListener("submit", function(e){
  e.preventDefault();
  let downPayment = document.getElementById("down-payment").value;
  let interestRate = document.getElementById("interest-rate").value;
  let term = document.getElementById("term").value;
  let state = document.getElementById("state").value;

  let values = {
    "downPayment": downPayment,
    "interestRate": interestRate,
    "term": term,
    "state": state
  };

  // alert(values.downPayment);
  //calculateMonthlyPayment(24900, downPayment, interestRate, term);

/*
  chrome.tabs.executeScript({
    //alert(`${downPayment}, ${interestRate}, ${term}, ${state}`);
    //code: 'document.body.style.backgroundColor="red"'
    //put content_script code here
    code:
    `
    let pageHeader = document.getElementsByClassName("srp-header");
    pageHeader[0].innerText = "it worked";
    alert(term);
    `
  });

  */
/*
  chrome.storage.sync.set(values, function() {
    //console.log(values.downPayment);
    console.log("values set");
  });

  chrome.storage.sync.get(values, function() {
    console.log(`${values.downPayment} and ${values.interestRate} and ${values.term} and ${values.state}`);
    //console.log(values.downPayment);
  });

*/


//Sending values object to the content script
chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
  chrome.tabs.sendMessage(tabs[0].id, values, function(response) {
    // console.log(values.downPayment + "sent to");
  });
});


//Execute calculate monthly payment script
chrome.tabs.executeScript(null, {file: "content_script.js"});



}) //end of listener

/*
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log(sender.tab ?
                "from a content script:" + sender.tab.url :
                "from the extension");
    if (request.greeting == "hello")
      sendResponse({farewell: "goodbye"});
  });
*/
