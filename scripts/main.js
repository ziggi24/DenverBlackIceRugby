// Mobile nav toggle and active link handling
document.addEventListener('DOMContentLoaded', () => {
	const toggle = document.querySelector('.nav-toggle');
	const nav = document.getElementById('site-nav');
	if (toggle && nav) {
		toggle.addEventListener('click', () => {
			const expanded = toggle.getAttribute('aria-expanded') === 'true';
			toggle.setAttribute('aria-expanded', String(!expanded));
			nav.classList.toggle('open');
			// Swap hamburger and close icon when available
			const icon = toggle.querySelector('i');
			if (icon) {
				icon.classList.toggle('fa-bars', expanded);
				icon.classList.toggle('fa-xmark', !expanded);
			}
		});

		// Close nav on link click (mobile)
		nav.addEventListener('click', (e) => {
			const target = e.target;
			if (target && target.tagName === 'A') {
				nav.classList.remove('open');
				toggle.setAttribute('aria-expanded', 'false');
				const icon = toggle.querySelector('i');
				if (icon) {
					icon.classList.add('fa-bars');
					icon.classList.remove('fa-xmark');
				}
			}
		});
	}

	// Mark active link
	const links = document.querySelectorAll('#site-nav a');
	links.forEach((a) => {
		if (a.getAttribute('href')) {
			const same = location.pathname.endsWith(a.getAttribute('href').split('/').pop());
			if (same) {
				a.classList.add('active');
				a.setAttribute('aria-current', 'page');
			}
		}
	});

	// Lightbox modal for images with [data-lightbox]
	const lightbox = document.getElementById('lightbox');
	const lightboxImg = lightbox ? lightbox.querySelector('img') : null;
	const closeBtn = lightbox ? lightbox.querySelector('.lightbox-close') : null;

	function openLightbox(src, alt) {
		if (!lightbox || !lightboxImg) return;
		lightboxImg.src = src;
		lightboxImg.alt = alt || '';
		lightbox.classList.add('open');
		lightbox.setAttribute('aria-hidden', 'false');
		document.body.style.overflow = 'hidden';
		// focus for accessibility
		closeBtn && closeBtn.focus();
	}

	function closeLightbox() {
		if (!lightbox) return;
		lightbox.classList.remove('open');
		lightbox.setAttribute('aria-hidden', 'true');
		setTimeout(() => {
			if (lightboxImg) lightboxImg.src = '';
		}, 150);
		document.body.style.overflow = '';
	}

	if (lightbox) {
		// Click to open
		document.querySelectorAll('[data-lightbox]').forEach((img) => {
			img.addEventListener('click', () => openLightbox(img.src, img.alt));
			img.style.cursor = 'zoom-in';
		});
		// Close interactions
		closeBtn && closeBtn.addEventListener('click', closeLightbox);
		lightbox.addEventListener('click', (e) => {
			if (e.target === lightbox) closeLightbox();
		});
		document.addEventListener('keydown', (e) => {
			if (e.key === 'Escape') closeLightbox();
		});
	}
});
