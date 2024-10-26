
function toggleMenu() {
            var navLinks = document.getElementById('nav-links');
            var menuIcon = document.getElementById('menu-icon');
            if (navLinks.classList.contains('show')) {
                navLinks.classList.remove('show');
                menuIcon.classList.remove('open');
            } else {
                navLinks.classList.add('show');
                menuIcon.classList.add('open');
            }
        }

        function toggleText() {
            var schoolText = document.getElementById('school-text');
            setTimeout(function() {
                if (schoolText.innerText === 'SMPN 3 MUARA BATU') {
                    schoolText.innerText = 'DAKUTA';
                } else {
                    schoolText.innerText = 'SMPN 3 MUARA BATU';
                }
            }, 5000);
        }

        function toggleRole() {
            var roleText = document.getElementById('role-text');
            roleText.style.animation = 'fadeOut 1s ease-in-out';
            setTimeout(function() {
                if (roleText.innerText === 'Web Designer') {
                    roleText.innerText = 'Web Developer';
                } else {
                    roleText.innerText = 'Web Designer';
                }
                roleText.style.animation = 'fadeIn 1s ease-in-out';
            }, 1000);
        }

        setInterval(toggleText, 10000);
        setInterval(toggleRole, 5000);

        // Pong Game
        var canvas, ctx;
        var ballX = 50, ballY = 50;
        var ballSpeedX = 10, ballSpeedY = 4;
        var paddle1Y = 250;
        const PADDLE_HEIGHT = 100;
        const PADDLE_WIDTH = 10;
        var playerScore = 0;

        window.onload = function() {
            canvas = document.getElementById('gameCanvas');
            ctx = canvas.getContext('2d');

            var framesPerSecond = 30;
            setInterval(function() {
                moveEverything();
                drawEverything();
            }, 1000 / framesPerSecond);

            canvas.addEventListener('mousemove', function(evt) {
                var mousePos = calculateMousePos(evt);
                paddle1Y = mousePos.y - (PADDLE_HEIGHT / 2);
            });

            canvas.addEventListener('touchmove', function(evt) {
                var touchPos = calculateTouchPos(evt);
                paddle1Y = touchPos.y - (PADDLE_HEIGHT / 2);
            });
        }

        function calculateMousePos(evt) {
            var rect = canvas.getBoundingClientRect(), root = document.documentElement;
            var mouseX = evt.clientX - rect.left - root.scrollLeft;
            var mouseY = evt.clientY - rect.top - root.scrollTop;
            return {
                x: mouseX,
                y: mouseY
            };
        }

        function calculateTouchPos(evt) {
            var rect = canvas.getBoundingClientRect(), root = document.documentElement;
            var touchX = evt.touches[0].clientX - rect.left - root.scrollLeft;
            var touchY = evt.touches[0].clientY - rect.top - root.scrollTop;
            return {
                x: touchX,
                y: touchY
            };
        }

        function moveEverything() {
            ballX += ballSpeedX;
            ballY += ballSpeedY;

            if (ballX < 0) {
                if (ballY > paddle1Y && ballY < paddle1Y + PADDLE_HEIGHT) {
                    ballSpeedX = -ballSpeedX;
                    var deltaY = ballY - (paddle1Y + PADDLE_HEIGHT / 2);
                    ballSpeedY = deltaY * 0.35;
                    playerScore++;
                } else {
                    ballReset();
                }
            }
            if (ballX > canvas.width) {
                ballSpeedX = -ballSpeedX;
            }
            if (ballY < 0) {
                ballSpeedY = -ballSpeedY;
            }
            if (ballY > canvas.height) {
                ballSpeedY = -ballSpeedY;
            }
        }

        function ballReset() {
            ballSpeedX = -ballSpeedX;
            ballX = canvas.width / 2;
            ballY = canvas.height / 2;
            playerScore = 0;
        }

        function drawEverything() {
            // clear the game view
            ctx.fillStyle = '#161b22';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // draw the paddle
            ctx.fillStyle = '#ffffff';
            ctx.fillRect(0, paddle1Y, PADDLE_WIDTH, PADDLE_HEIGHT);

            // draw the ball
            ctx.fillStyle = '#ffffff';
            ctx.beginPath();
            ctx.arc(ballX, ballY, 10, 0, Math.PI * 2, true);
            ctx.fill();

            // draw the score
            ctx.fillStyle = '#ffffff';
            ctx.font = '24px Arial';
            ctx.fillText('Score: ' + playerScore, canvas.width - 120, 30);

            // draw the middle line
            ctx.fillStyle = '#ffffff';
            ctx.fillRect(canvas.width / 2 - 1, 0, 2, canvas.height);
        }
