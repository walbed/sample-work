
  //Get list of prices from the page
  let priceSpans = document.getElementsByClassName("listing-row__price ");
  let prices = [];

  for (i = 0; i < priceSpans.length; i++){
    prices[i] = getPrice(priceSpans[i]);
    console.log(prices[i]);
  }

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    for (i=0; i < priceSpans.length; i++){
      console.log(`Car Number: ${i}, Price: ${prices[i]} Down Payment: ${request.downPayment}, Interest Rate: ${request.interestRate}, Term: ${request.term}`);
      //priceSpans[i].innerText = calculateMonthlyPayment(getPrice(priceSpans[i]), request.downPayment, request.interestRate, request.term);
      priceSpans[i].innerText = calculateMonthlyPayment(prices[i], request.downPayment, request.interestRate, request.term);
    }
  });




//Utility function to extract the integer price from
function getPrice(object){
  let priceString = object.innerText;
  priceString = priceString.slice(1);             //Remove the dollar sign
  priceString = priceString.replace(",", "");     //remove the comma
  let price = parseInt(priceString, 10);          //parse as an integer
  return price;
}


// function calculateMonthlyPayment(price, downPayment, interestRate, term, state){
function calculateMonthlyPayment(p, dP, iRP, t){
  //Math from https://www.youtube.com/watch?v=x77rCEKU29Y , somehow I couldn't
  //find a straightforward explanation of how to calculate car payments
  // that explans each component

  //Calculating the amount to finance
  let amtToFinance = p - dP;
  //console.log(amtToFinance);

  //Converting the interest rate to a decimal for use in calculations
  let interestRateDecimal = iRP/100;
  //console.log(interestRateDecimal);

  //Getting interest rate per year
  let step2 = interestRateDecimal/12;
  //console.log("Step 2 = " + step2);

  //Not sure what this does yet
  let step3 = step2 * amtToFinance;
  //console.log("Step 3 = "  + step3);

  let step4 = step2 + 1;
  //console.log("Step 4 = "  + step4);

  let step5 = Math.pow(step4, t);
  //console.log("Step 5 = "  + step5);

  let step6 = (1/step5);
  //console.log("Step 6 = "  + step6);

  let step7 = 1 - step6;
  //console.log("Step 7 = " +  step7);

  let step8 = step3/step7;
  //console.log("Step 8 = "  + step8);

  return("$" + step8.toFixed(2) + "/month");
  //return alert("$"+step8.toFixed(2));
}
