
(function(){
	const layers = Array.from(document.querySelectorAll('.mountain img'));
	if (!layers.length) return;

	const speeds = [0.03, 0.05, 0.07, 0.09, 0.11];
	let latestScroll = window.scrollY || 0;
	let ticking = false;

	function update() {
		const scrollY = latestScroll;
		layers.forEach((layer, i) => {
			const speed = speeds[i] ?? (0.05 + i * 0.01);
			const offset = Math.round(scrollY * speed);
			layer.style.transform = `translate(-50%, -50%) translateY(${offset}px)`;
		});
		ticking = false;
	}

	function onScroll() {
		latestScroll = window.scrollY;
		if (!ticking) {
			window.requestAnimationFrame(update);
			ticking = true;
		}
	}

	window.addEventListener('scroll', onScroll, { passive: true });
	window.addEventListener('resize', () => { if (!ticking) { window.requestAnimationFrame(update); ticking = true; } });
	update();
})();
