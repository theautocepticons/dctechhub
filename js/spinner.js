document.addEventListener('DOMContentLoaded', () => {
	const logo = document.getElementById('logo');
	let rotation = 0;           // Current rotation angle in degrees
	let velocity = 0;           // Current rotational velocity (degrees per frame)
	let isHovering = false;     // Hover state
	let isAnimating = false;    // Animation running state

	const MAX_VELOCITY = 15;    // Maximum speed (degrees per frame)
	const MIN_VELOCITY = 0.3;   // Starting slow speed
	const ACCEL_RATE = 0.2;     // How fast it accelerates
	const DECEL_RATE = 0.08;    // How fast it decelerates (slower for smoother stop)

	let touchStartX = 0;
	let touchStartY = 0;
	let touchStartTime = 0;
	let lastTouchX = 0;
	let lastTouchTime = 0;
	let touchStartSide = null;  // 'left' or 'right'

	function animate() {
		if (isHovering) {
			velocity = Math.min(velocity + ACCEL_RATE, MAX_VELOCITY);
		} else {
			velocity = Math.max(velocity - DECEL_RATE, 0);
		}

		rotation += velocity;

		logo.style.transform = `rotate(${rotation}deg)`;

		if (velocity > 0.01) {
			requestAnimationFrame(animate);
		} else {
			isAnimating = false;
			velocity = 0;
		}
	}

	function startAnimation(initialVelocity = MIN_VELOCITY) {
		if (velocity === 0) velocity = initialVelocity;

		if (!isAnimating) {
			isAnimating = true;
			requestAnimationFrame(animate);
		}
	}

	logo.addEventListener('mouseenter', () => {
		isHovering = true;
		startAnimation();
	});

	logo.addEventListener('mouseleave', () => {
		isHovering = false;
	});

	logo.addEventListener('touchstart', (e) => {
		const touch = e.touches[0];
		const rect = logo.getBoundingClientRect();

		touchStartX = touch.clientX;
		touchStartY = touch.clientY;
		touchStartTime = Date.now();
		lastTouchX = touch.clientX;
		lastTouchTime = touchStartTime;

		// Determine which side of the logo was touched
		const logoCenter = rect.left + rect.width / 2;
		touchStartSide = touch.clientX < logoCenter ? 'left' : 'right';

		e.preventDefault();
	}, { passive: false });

	logo.addEventListener('touchmove', (e) => {
		const touch = e.touches[0];
		lastTouchX = touch.clientX;
		lastTouchTime = Date.now();

		e.preventDefault();
	}, { passive: false });

	logo.addEventListener('touchend', (e) => {
		const touchEndTime = Date.now();
		const touchDuration = touchEndTime - touchStartTime;
		const touchDistance = lastTouchX - touchStartX;

		// Only register as a flick if:
		// 1. Touch duration is short (< 300ms for a quick flick)
		// 2. There was meaningful movement (> 20px)
		if (touchDuration < 300 && Math.abs(touchDistance) > 20) {
			const flickVelocity = Math.abs(touchDistance) / touchDuration * 10;

			const cappedVelocity = Math.min(flickVelocity, MAX_VELOCITY);

			// Determine direction based on:
			// - Left side touch + right swipe = positive (clockwise)
			// - Right side touch + left swipe = negative (counter-clockwise)
			// - Left side touch + left swipe = negative (counter-clockwise)
			// - Right side touch + right swipe = positive (clockwise)

			let direction = 1; // Default clockwise

			if (touchStartSide === 'left') {
				direction = touchDistance > 0 ? 1 : -1;
			} else {
				direction = touchDistance > 0 ? 1 : -1;
			}

			velocity = cappedVelocity * direction;

			if (!isAnimating) {
				isAnimating = true;
				requestAnimationFrame(animate);
			}
		}

		e.preventDefault();
	}, { passive: false });

	logo.style.userSelect = 'none';
	logo.style.webkitUserSelect = 'none';
	logo.style.touchAction = 'none';
});
