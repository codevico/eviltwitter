evilAccounts = []
$.getJSON("https://raw.githubusercontent.com/jacktritus/eviltwitter/master/evil.json", function(data){ // Retrieve THE LIST.
	evilAccounts = data["accounts"];
		$('#doc').bind('DOMSubtreeModified.event1', DOMModificationHandler);
});
function DOMModificationHandler(){
	$(this).unbind('DOMSubtreeModified.event1');
	setTimeout(function(){
		changeStuff();
		$(this).bind('DOMSubtreeModified.event1',
			DOMModificationHandler);
	},10);
}
function changeStuff(){
	$(".ProfileHeaderCard-name").each(function(){ // Add badges on the profile card.
		var t = $(this);
		var account = t.parent().find(".username b").html();
		var ifVerified = t.find(".Icon--verified").not(".evil");
		var ifEvil = t.find(".evil");
		if($.inArray(account, evilAccounts)>-1 && !ifEvil.length){
			if(ifVerified.length){
				t.find(".Icon--verified").remove();
			}
			var ifEvil = t.find(".evil");
			if(!ifEvil.length) setTimeout(function(){t.append(redVerifyHTML)}, 10);
		}
	});
	$(".UserBadges").each(function(){ // Add badges on tweets, search results, etc.
		var t = $(this);
		var account = t.parent().parent().find(".username b").html();
		var ifVerified = t.find(".Icon--verified");
		var ifEvil = t.find(".evil");
		if($.inArray(account, evilAccounts)>-1 && !ifEvil.length){
			if(ifVerified.length){
				t.find(".Icon--verified").remove();
			}
			var ifEvil = t.find(".evil");
			if(!ifEvil.length) setTimeout(function(){t.append(redVerifyHTML)}, 10);
		}
	});
}
// This is the HTML for the red verified badge.
redVerifyHTML = "<span class='Icon Icon--verified evil' style='color: #f21d1d'><span class='u-hiddenVisually'>Evil account</span></span>";
//evilAccounts = ['RichardBSpencer', 'LauraLoomer']; //sample list