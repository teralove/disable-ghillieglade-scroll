//vers 1.0

const format = require('./format.js');

module.exports = function DisableGhilliegladeScroll(dispatch) {

    dispatch.hook('C_CHAT', 1, function(event) {
		let command = format.stripTags(event.message).split(' ');
		
		if (['!ghilli', '!ghillieglade'].includes(command[0].toLowerCase())) {
			useScroll();
			return false;
		}
	});	
	
	function useScroll() {
		dispatch.toServer('C_PCBANGINVENTORY_USE_SLOT', {
			slot: 7
		})
	}
	
	dispatch.hook('C_PCBANGINVENTORY_USE_SLOT', 1, function(event) {
		if (event.slot == 7) return false;		
	})
	
	// slash support, thanks to wuaw for snippet
	try {
		const Slash = require('slash')
		const slash = new Slash(dispatch)
		slash.on('ghilli', args => useScroll())
		slash.on('ghillieglade', args => useScroll())
	} catch (e) {
		// do nothing because slash is optional
	}
	


}