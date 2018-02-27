/**
*Function to check letters, numbers, spaces and dashes
*/
export function alphaNumericSpaceDash(inputtxt)
{
  var reg = /^[0-9a-zA-Z -]+$/;
  if(inputtxt.match(reg))
  {
    return true;
  }
  else
  {
    return false;
  }
}