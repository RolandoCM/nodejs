
module.exports = function(){
  var date = new Date();
  var days = ['Sunday','Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  var today = days[date.getDay()];
  //console.log("The day of the week is %s", today);
  return days[date.getDay()];
}
