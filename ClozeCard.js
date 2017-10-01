ClozeCard = function(text, cloze) {
  this.cloze = cloze;
  this.text = text;
  this.partial = text.replace(cloze, "...")
  if (text.indexOf(cloze) == -1) {
  	console.log("Unable to create cloze card; 'cloze' string not found in 'text' string. Error details below.")
  	throw Error
  }
}

module.exports = ClozeCard;