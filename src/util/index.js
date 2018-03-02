import he from 'he';
/**
*Function to check letters, numbers, spaces and dashes
*/
export function alphaNumericSpaceDash(inputtxt){
  var reg = /^[0-9a-zA-Z -']+$/;
  if(inputtxt.match(reg))
  {
    return true;
  }
  else
  {
    return false;
  }
}

export function stripHtml(input_html){
  let stripedHtml = input_html.replace(/<[^>]+>/g, '').replace(/\s\s+/g, ' ');
  return he.decode(stripedHtml);
}