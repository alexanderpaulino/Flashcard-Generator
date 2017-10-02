ClozeCard = function(text, cloze) {
  this.cloze = cloze;
  this.text = text;
  this.partial = text.replace(cloze, "...")
  if (text.indexOf(cloze) == -1) {
  	console.log("Unable to create a cloze card: at least one 'cloze' string did not match a corresponding 'text' string."+
  		"\r\nPlease check 'cloze.json' and ensure that all cloze strings can be matched to their corresponding text strings.")
  	throw Error
  }
}

module.exports = ClozeCard;