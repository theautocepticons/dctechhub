try {
	const logo = document.getElementById('logo');

	if (!logo) throw new Error('Logo element not found!');

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
	let lastTouchY = 0;
	let touchStartSide = null;  // 'left', 'right', 'top', or 'bottom'

	function animate() {
		if (isHovering) {
			velocity = Math.min(velocity + ACCEL_RATE, MAX_VELOCITY);
		} else {
			// Decelerate towards zero (works for both positive and negative velocity)
			if (velocity > 0) {
				velocity = Math.max(velocity - DECEL_RATE, 0);
			} else if (velocity < 0) {
				velocity = Math.min(velocity + DECEL_RATE, 0);
			}
		}

		rotation += velocity;

		logo.style.transform = `rotate(${rotation}deg)`;

		// Continue animating if velocity is significant (check absolute value)
		if (Math.abs(velocity) > 0.01) {
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
		lastTouchY = touch.clientY;

		// Determine which side/edge of the logo was touched
		const logoCenterX = rect.left + rect.width / 2;
		const logoCenterY = rect.top + rect.height / 2;
		const relativeX = touch.clientX - logoCenterX;
		const relativeY = touch.clientY - logoCenterY;

		// Determine which edge is closest (left, right, top, or bottom)
		if (Math.abs(relativeX) > Math.abs(relativeY)) {
			// Horizontal edge is closer
			touchStartSide = relativeX < 0 ? 'left' : 'right';
		} else {
			// Vertical edge is closer
			touchStartSide = relativeY < 0 ? 'top' : 'bottom';
		}

		e.preventDefault();
	}, { passive: false });

	logo.addEventListener('touchmove', (e) => {
		const touch = e.touches[0];
		lastTouchX = touch.clientX;
		lastTouchY = touch.clientY;

		e.preventDefault();
	}, { passive: false });

	logo.addEventListener('touchend', (e) => {
		const touchEndTime = Date.now();
		const touchDuration = touchEndTime - touchStartTime;
		const touchDistanceX = lastTouchX - touchStartX;
		const touchDistanceY = lastTouchY - touchStartY;

		// Use the larger movement (horizontal or vertical)
		const absDistanceX = Math.abs(touchDistanceX);
		const absDistanceY = Math.abs(touchDistanceY);
		const primaryDistance = Math.max(absDistanceX, absDistanceY);
		const isPrimaryHorizontal = absDistanceX > absDistanceY;

		// Only register as a flick if:
		// 1. Touch duration is short (< 500ms for a quick flick)
		// 2. There was meaningful movement (> 5px - sensitive for small logo)
		if (touchDuration < 500 && primaryDistance > 5) {
			const flickVelocity = primaryDistance / touchDuration * 10;
			const cappedVelocity = Math.min(flickVelocity, MAX_VELOCITY);

			// Determine rotation direction based on side and swipe direction
			// Like pushing a wheel from different edges
			let direction = 1; // Default clockwise

			if (touchStartSide === 'left') {
				// Left side: push down = CCW, push up = CW; push right = CW, push left = CCW
				if (isPrimaryHorizontal) {
					direction = touchDistanceX > 0 ? 1 : -1;
				} else {
					direction = touchDistanceY > 0 ? -1 : 1;  // FLIPPED
				}
			} else if (touchStartSide === 'right') {
				// Right side: push down = CW, push up = CCW; push left = CCW, push right = CW
				if (isPrimaryHorizontal) {
					direction = touchDistanceX > 0 ? 1 : -1;
				} else {
					direction = touchDistanceY > 0 ? 1 : -1;  // FLIPPED
				}
			} else if (touchStartSide === 'top') {
				// Top side: push right = CW, push left = CCW; push down = CW, push up = CCW
				if (isPrimaryHorizontal) {
					direction = touchDistanceX > 0 ? 1 : -1;
				} else {
					direction = touchDistanceY > 0 ? 1 : -1;  // SAME
				}
			} else if (touchStartSide === 'bottom') {
				// Bottom side: push right = CCW, push left = CW; push up = CW, push down = CCW
				if (isPrimaryHorizontal) {
					direction = touchDistanceX > 0 ? -1 : 1;
				} else {
					direction = touchDistanceY > 0 ? -1 : 1;  // SAME
				}
			}

			const finalVelocity = cappedVelocity * direction;

			velocity = finalVelocity;

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
} catch (error) {
	console.error('ERROR in spinner.js:', error);
}
