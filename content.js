function genAmogus() {
	const img = document.createElement('img');
	img.crossOrigin = 'Anonymous';
	img.setAttribute('style', 'height: 1em; display: inline-block');
	img.setAttribute('alt', 'among');
	img.src = browser.runtime.getURL('amogus.png');
	return img;
}

function recur(node) {
	const tag = node.tagName?.toLowerCase();
	if(tag == 'script' || tag == 'style') return;
	for(let i = 0; i < node.childNodes.length; ++i) {
		const c = node.childNodes[i];
		if(c.nodeType == Node.TEXT_NODE) {
			const content = c.textContent
				.replace(/among/gi, 'among')
				.split('among')
				.map(v => [document.createTextNode(v), genAmogus()])
				.flat();
			content.pop();
			if(content.length > 1) {
				c.replaceWith(...content);
			}
		}
		else if(c.nodeType == Node.ELEMENT_NODE) {
			recur(c);
		}
	}
}

function onMutate(mutations) {
	for(const m of mutations) {
		try {
			if(m.type == 'childList') {
				for(const n of m.addedNodes) {
					recur(n);
				}
			}
		} catch(e) {
			console.log('amogusify onMutate:', m, e);
		}
	}
}

const config = { childList: true, subtree: true };

const observer = new MutationObserver(onMutate);

addEventListener('load', function() {
	try {
		recur(document.body);
		observer.observe(document.body, config);
	} catch(e) {
		console.log('amogusify init:', e);
	}
});
