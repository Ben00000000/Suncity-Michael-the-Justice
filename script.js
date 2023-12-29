document.body.style.background = "url('bgg.gif') center/cover no-repeat fixed";
document.body.style.width = "100%";
document.body.style.height = "100%";
document.body.style.margin = "0";
document.body.style.overflow = "hidden";
document.body.style.userSelect = "none";

const character = document.getElementById('character');
const attackButton = document.getElementById('attackButton');
const moveLeftButton = document.getElementById('moveLeftButton');
const moveRightButton = document.getElementById('moveRightButton');
const healthBar = document.getElementById('healthBar');
const healthValue = document.getElementById('healthValue');
const ultimateButton = document.getElementById('ultimateButton');
const scoreElement = document.getElementById('score');
const preloader = document.getElementById('preloader');



character.style.bottom = "-35%"; // Set character at the bottom


let playerScore = 0;
let isAttacking = false;
let isWalkingRight = false;
let isWalkingLeft = false;
let animationTimeout;

let currentHealth = 100; // Initial health value
updateHealthBar();
updateHealthValue(); // Added to initialize the health value on page load

function updateHealthBar() {
    healthBar.style.width = `${currentHealth}%`;
}

function updateHealthValue() {

}

function decreaseHealth(amount) {
    currentHealth -= amount;
    if (currentHealth < 0) {
    currentHealth = 0;
            updateHealthBar();
            updateHealthValue();
        // Handle character death or other logic when health reaches zero
         // Display game over screen or perform other game over logic
                showGameOverScreen();
    }
    updateHealthBar();
    updateHealthValue(); // Added to update the displayed health value
}

function showGameOverScreen() {
    // Hide relevant game elements
    character.style.display = 'none';
    attackButton.style.display = 'none';
    moveLeftButton.style.display = 'none';
    moveRightButton.style.display = 'none';
    ultimateButton.style.display = 'none';
    scoreElement.style.display = 'none';

   // Display game over screen
      const gameOverScreen = document.getElementById('gameOverScreen');
      gameOverScreen.style.display = 'flex'; // Show the game over screen


    // Display the final score
    const finalScoreElement = document.getElementById('finalScore');
    finalScoreElement.innerText = `Final Score: ${playerScore}`;


    // Display restart button
    const restartButton = document.getElementById('restartButton');
    restartButton.addEventListener('click', restartGame);
    restartButton.addEventListener('touchstart', restartGame);
}


function restartGame() {
    // Clear existing enemies
    enemies.forEach(({ enemy }) => {
        document.body.removeChild(enemy);
    });
    enemies.length = 0;

    // Reset player score and health
    blueBar.style.width = '0px';
    playerScore = 0;
    currentHealth = 100;
    updateScore();
    updateHealthBar();

    // Show relevant game elements
    character.style.display = 'block';
    attackButton.style.display = 'block';
    moveLeftButton.style.display = 'block';
    moveRightButton.style.display = 'block';
    ultimateButton.style.display = 'block';
    scoreElement.style.display = 'block';

    // Hide game over screen
 // Display game over screen
      const gameOverScreen = document.getElementById('gameOverScreen');
      gameOverScreen.style.display = 'none'; // Show the game over screen

    // Remove event listener from restart button
    const restartButton = document.getElementById('restartButton');
    restartButton.removeEventListener('click', restartGame);

}






function animateCharacter(imageUrls, index = 0, timeout = 100, onFrameCallback = null) {
    if (isUltimateState() && imageUrls === playerImageUrls) {
        // Skip playing idle frames during the ultimate state
        return;
    }

    if ((isWalkingLeft || isWalkingRight) && imageUrls === playerImageUrls) {
        // Only play idle frames when not walking or attacking (excluding ultimate state)
        return;
    }

    if (index < imageUrls.length) {
        character.src = imageUrls[index];
        if (imageUrls === playerImageUrls) {
            character.style.width = '10%';
        } else if (imageUrls === attackRightImageUrls || imageUrls === attackLeftImageUrls) {
            character.style.width = '15%';
        } else {
            character.style.width = '';
        }

        if (onFrameCallback) {
            onFrameCallback(); // Call the callback after displaying each frame
        }

        animationTimeout = setTimeout(() => animateCharacter(imageUrls, index + 1, timeout, onFrameCallback), timeout);
    } else {
        animationTimeout = setTimeout(() => animateCharacter(imageUrls, 0, timeout, onFrameCallback), timeout);
    }
}

function isUltimateState() {
    return isAttacking;
}



function preloadImages(urls) {
    const promises = urls.map(url => {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => resolve();
            img.onerror = (error) => reject(error);
            img.src = url;
        });
    });

    return Promise.all(promises);
}

const playerImageUrls = [];
for (let i = 1; i <= 2; i++) {
    playerImageUrls.push(`https://raw.githubusercontent.com/Ben00000000/MJ-v2/main/idle%20(${i}).png`);
}

const attackRightImageUrls = [];
for (let i = 1; i <= 12; i++) {
    attackRightImageUrls.push(`https://raw.githubusercontent.com/Ben00000000/MJ-v2/main/attackt%20(${i}).png`);
}

const attackLeftImageUrls = [];
for (let i = 1; i <= 12; i++) {
    attackLeftImageUrls.push(`https://raw.githubusercontent.com/Ben00000000/MJ-v2/main/attacktleft%20(${i}).png`);
}

const walkRightImageUrls = [];
for (let i = 1; i <= 10; i++) {
    walkRightImageUrls.push(`https://raw.githubusercontent.com/Ben00000000/MJ-v2/main/right%20(${i}).png`);
}

const walkLeftImageUrls = [];
for (let i = 1; i <= 12; i++) {
    walkLeftImageUrls.push(`https://raw.githubusercontent.com/Ben00000000/MJ-v2/main/left%20(${i}).png`);
}

const enemyWalkLeftImageUrls = [];
for (let i = 1; i <= 8; i++) {
    enemyWalkLeftImageUrls.push(`https://raw.githubusercontent.com/Ben00000000/MJ-v2/main/enemy%20(${i}).png`);
}

const characterUltimateframes = [];
for (let i = 1; i <= 8; i++) {
    characterUltimateframes.push(`https://raw.githubusercontent.com/Ben00000000/MJ-v2/main/ulti%20(${i}).png`);
}

const hitFrames = [];
for (let i = 1; i <= 8; i++) {
    hitFrames.push(`https://raw.githubusercontent.com/Ben00000000/MJ-v2/main/hit%20(${i}).png`);
}

const summonFrame = [];
for (let i = 1; i <= 8; i++) {
    summonFrame.push(`https://raw.githubusercontent.com/Ben00000000/MJ-v2/main/summonFrame%20(${i}).png`);
}

const ultimateOpening = [];
for (let i = 1; i <= 8; i++) {
    ultimateOpening.push(`https://raw.githubusercontent.com/Ben00000000/MJ-v2/main/opening%20(${i}).png`);
}

const ultimateOpening2 = [];
for (let i = 1; i <= 5; i++) {
    ultimateOpening2.push(`https://raw.githubusercontent.com/Ben00000000/MJ-v2/main/opening2%20(${i}).png`);
}




preloadImages(enemyWalkLeftImageUrls);
preloadImages(playerImageUrls);
preloadImages(attackRightImageUrls);
preloadImages(attackLeftImageUrls);
preloadImages(walkRightImageUrls);
preloadImages(walkLeftImageUrls);
preloadImages(characterUltimateframes);
preloadImages(hitFrames);
preloadImages(summonFrame);
preloadImages(ultimateOpening);
preloadImages(ultimateOpening2);


Promise.all([
    preloadImages(playerImageUrls),
    preloadImages(attackRightImageUrls),
    // Add other image URLs as needed
]).then(() => {
    // All images are loaded, start the game
    initializeGame();
    preloader.style.display = 'none'; // Hide the preloader
}).catch((error) => {
    console.error("Error loading images:", error);
    // Handle the error and possibly inform the user that there was an issue loading the game
    preloader.innerText = 'Error loading game. Please refresh the page.';
});

let lastMoveDirection = null;

    let isAttackButtonPressed = false;

 function handleAttackStart() {
     if (!isAttacking) {
         isAttacking = true;
         clearTimeout(animationTimeout);

         // Use the last movement direction for attack frames
         const attackDirection = lastMoveDirection === 'right' ? 'right' : 'left';

         const onFrameCallback = () => {
             if (isAttacking) {
                 checkAttackCollision();
             }
         };

         if (attackDirection === 'right') {
             // Set a different timeout for attack frames
             animateCharacter(attackRightImageUrls, 0, 20, onFrameCallback); // 20 milliseconds for attack frames
         } else {
             // Set a different timeout for attack frames
             animateCharacter(attackLeftImageUrls, 0, 20, onFrameCallback); // 20 milliseconds for attack frames
         }
     }
 }



function checkAttackCollision() {
    const characterRect = character.getBoundingClientRect();

    enemies.forEach(({ enemy, enemyImage, direction, frameIndex, hasCollided }) => {
        if (!hasCollided) { // Check if the enemy has already collided
            const enemyRect = enemy.getBoundingClientRect();

            if (
                characterRect.right > enemyRect.left &&
                characterRect.left < enemyRect.right &&
                characterRect.bottom > enemyRect.top &&
                characterRect.top < enemyRect.bottom
            ) {
                // Collision detected, play hit frames
                playHitFrames(enemyImage, enemy, direction);
                // Increase the blue bar width (up to a maximum of 50)
                increaseBlueBarWidth(10); // Adjust the amount to increase as needed

                // Set 'hasCollided' to true to prevent further collisions
                enemies.find(e => e.enemy === enemy).hasCollided = true;
            }
        }
    });
}


function playHitFrames(enemyImage, enemy, direction) {
    const hitFrameTimeout = 100; // Adjust the timeout between hit frames
    const hitFramesTotal = hitFrames.length;

    function playNextHitFrame(index) {
        if (index < hitFramesTotal) {
            enemyImage.src = hitFrames[index];
            setTimeout(() => playNextHitFrame(index + 1), hitFrameTimeout);
        } else {
            // Remove the enemy after playing all hit frames
            document.body.removeChild(enemy);
            const enemyIndex = enemies.findIndex((e) => e.enemy === enemy);
            if (enemyIndex !== -1) {
                enemies.splice(enemyIndex, 1);
                playerScore += 1; // Add one point for each enemy removed
                updateScore();
            }
        }
    }

    // Reset enemy's image to the first hit frame
    enemyImage.src = hitFrames[0];

    // Play hit frames starting from the second frame
    playNextHitFrame(1);
}




function performUltimate() {
    if (!isAttacking) {
        isAttacking = true;
        clearTimeout(animationTimeout);
        ultimateButton.style.display = 'none'; // Hide the ultimate button

        const ultimateOpeningTimeout = 100; // Adjust the timeout between opening ultimate frames
        const ultimateOpeningFramesTotal = ultimateOpening.length;
        const originalWidth = character.style.width;
        const originalHeight = character.style.height;


        function playNextOpeningFrame(index) {
            if (index < ultimateOpeningFramesTotal) {
                const openingFrame = ultimateOpening[index];
                character.src = openingFrame;

                // Make the opening frame fullscreen
                character.style.width = '100%';
                character.style.height = '100%';
                 character.style.left = '50%'; // Center horizontally
                                character.style.top = '50%'; // Center vertically

                setTimeout(() => playNextOpeningFrame(index + 1), ultimateOpeningTimeout);
            } else {
                // Reset to default size after playing opening frames
                character.style.width = originalWidth;
                character.style.height = originalHeight;
                  character.style.left = '50%'; // Reset left property to default
                                character.style.top = ''; // Reset top property to default


                // Play the second set of opening frames
                playNextOpeningFrame2(0);
            }
        }

        function playNextOpeningFrame2(index) {
            const ultimateOpening2Timeout = 200; // Adjust the timeout between opening ultimate 2 frames
            const ultimateOpening2FramesTotal = ultimateOpening2.length;

            if (index < ultimateOpening2FramesTotal) {
                const openingFrame2 = ultimateOpening2[index];
                character.src = openingFrame2;

                // Make the opening frame fullscreen
                character.style.width = '100%';
                character.style.height = '100%';
                 character.style.left = '50%'; // Center horizontally
                             character.style.top = '50%'; // Center vertically


                setTimeout(() => playNextOpeningFrame2(index + 1), ultimateOpening2Timeout);
            } else {
                // Reset to default size after playing opening frames
                character.style.width = originalWidth;
                character.style.height = originalHeight;
                  character.style.left = '50%'; // Reset left property to default
                                character.style.top = ''; // Reset top property to default


                // Play the actual ultimate frames
                playNextUltimateFrame(0);
            }
        }

        function playNextUltimateFrame(index) {
            const ultimateTimeout = 100; // Adjust the timeout between ultimate frames
            const ultimateFramesTotal = characterUltimateframes.length;

            if (index < ultimateFramesTotal) {
                character.src = characterUltimateframes[index];
                setTimeout(() => playNextUltimateFrame(index + 1), ultimateTimeout);

            } else {
                // Play hit frames after the ultimate frames
                playHitFramesToAllEnemies();
                resetBlueBar();
            }
        }

        // Start playing the opening frames
        playNextOpeningFrame(0);
    }
}


function resetBlueBar() {
    const blueBar = document.getElementById('blueBar');
    blueBar.style.width = '0px';
}

function playHitFramesToAllEnemies() {
    const hitFrameTimeout = 100; // Adjust the timeout between hit frames
    const hitFramesTotal = hitFrames.length;

    function playNextHitFrame(index, enemy, enemyImage, direction) {
        if (index < hitFramesTotal) {
            enemyImage.src = hitFrames[index];
            setTimeout(() => playNextHitFrame(index + 1, enemy, enemyImage, direction), hitFrameTimeout);
        } else {
            // Remove the enemy after playing all hit frames
            document.body.removeChild(enemy);
            const enemyIndex = enemies.findIndex((e) => e.enemy === enemy);
            if (enemyIndex !== -1) {
                enemies.splice(enemyIndex, 1);
                playerScore += 1; // Add 1 score for each enemy removed
                updateScore();
            }
        }
    }

    // Play hit frames to all enemies
    enemies.forEach(({ enemy, enemyImage, direction, frameIndex }) => {
        // Reset enemy's image to the first hit frame
        enemyImage.src = hitFrames[0];

        // Play hit frames starting from the second frame
        playNextHitFrame(1, enemy, enemyImage, direction);
    });
}



function updateScore() {
    scoreElement.innerText = `Points: ${playerScore}`;
}


// Update the existing code for increasing the blue bar
function increaseBlueBarWidth(amount) {
    const blueBar = document.getElementById('blueBar');
    const currentWidth = parseFloat(getComputedStyle(blueBar).width);
    const maxWidth = 100; // Adjust the maximum width as needed

    const newWidth = Math.min(currentWidth + amount, maxWidth);

    blueBar.style.width = `${newWidth}px`;

    // Show the ultimate button when the blue bar is full
    const ultimateButton = document.getElementById('ultimateButton');
    if (newWidth >= maxWidth) {
        ultimateButton.style.display = 'block';
    } else {
        ultimateButton.style.display = 'none';
    }

    if (newWidth === maxWidth) {

    }
}




function handleAttackEnd() {
    if (isAttacking) {
        clearTimeout(animationTimeout);
        isAttacking = false;
        character.style.width = '';
        setTimeout(() => animateCharacter(playerImageUrls), 0);
                    isAttackButtonPressed = false; // Set the flag to false on button release

    }
}

let moveInterval;
let moveDirection = null;

function handleMove(direction) {
    lastMoveDirection = direction; // Update the last movement direction

    const currentLeft = parseInt(character.style.left, 10) || 0;
    const step = 10;

    if (direction === 'left') {
        character.style.left = `${Math.max(0, currentLeft - step)}px`;
        if (!isWalkingLeft) {
            isWalkingLeft = true;
            clearTimeout(animationTimeout);
            animateCharacter(walkLeftImageUrls);
        }
        isWalkingRight = false;
    } else if (direction === 'right') {
        character.style.left = `${Math.min(window.innerWidth - character.clientWidth, currentLeft + step)}px`;
        if (!isWalkingRight) {
            isWalkingRight = true;
            clearTimeout(animationTimeout);
            animateCharacter(walkRightImageUrls);
        }
        isWalkingLeft = false;
    }
}

  function stopMoving() {
        if (isWalkingRight) {
            isWalkingRight = false;
            clearTimeout(animationTimeout);
            if (!isAttackButtonPressed) {
                animateCharacter(playerImageUrls); // Reset to idle frames only if the attack button is not pressed
            }
        }
        if (isWalkingLeft) {
            isWalkingLeft = false;
            clearTimeout(animationTimeout);
            if (!isAttackButtonPressed) {
                animateCharacter(playerImageUrls); // Reset to idle frames only if the attack button is not pressed
            }
        }
    }

   attackButton.addEventListener('mousedown', () => {
        isAttackButtonPressed = true; // Set the flag to true on button press
        handleAttackStart();
    });
    attackButton.addEventListener('touchstart', () => {
        isAttackButtonPressed = true; // Set the flag to true on touch start
        handleAttackStart();
    });
    attackButton.addEventListener('mouseup', handleAttackEnd);
    attackButton.addEventListener('touchend', handleAttackEnd);

moveLeftButton.addEventListener('mousedown', () => {
    handleMove('left');
    moveInterval = setInterval(() => handleMove('left'), 100);
});
moveRightButton.addEventListener('mousedown', () => {
    handleMove('right');
    moveInterval = setInterval(() => handleMove('right'), 100);
});
moveLeftButton.addEventListener('mouseup', () => {
    clearInterval(moveInterval);
    stopMoving();
});
moveRightButton.addEventListener('mouseup', () => {
    clearInterval(moveInterval);
    stopMoving();
});

// Touch events for mobile
attackButton.addEventListener('touchstart', handleAttackStart);
moveLeftButton.addEventListener('touchstart', () => {
    handleMove('left');
    moveInterval = setInterval(() => handleMove('left'), 100);
});
moveRightButton.addEventListener('touchstart', () => {
    handleMove('right');
    moveInterval = setInterval(() => handleMove('right'), 100);
});

document.addEventListener('touchend', () => {
    clearInterval(moveInterval);
    stopMoving();
});

ultimateButton.addEventListener('click', performUltimate);

// Enemy logic
const enemies = [];

function createEnemy(direction) {
    const enemy = document.createElement('div');
    enemy.className = 'enemy';
    enemy.style.width = '15%';
    enemy.style.height = '60%';
    enemy.style.position = 'absolute';
    enemy.style.bottom = '-5%';
    enemy.hasCollided = false; // Initialize the property

    const enemyImage = document.createElement('img');
    enemyImage.style.width = '100%';
    enemyImage.style.height = '100%';
    enemyImage.style.transform = direction === 'left' ? '' : 'scaleX(-1)';

    enemy.appendChild(enemyImage);

    // Calculate initial position based on corners
    if (direction === 'left') {
        enemy.style.left = '0';
        enemyImage.src = enemyWalkLeftImageUrls[0];
    } else {
        enemy.style.left = `${window.innerWidth - 30}px`;
        // Assuming you want to use the same frames for right as left (flipped)
        enemyImage.src = enemyWalkLeftImageUrls[0];
    }

    document.body.appendChild(enemy);

    return { enemy, enemyImage, direction, frameIndex: 0, hasCollided: false };
}





function moveEnemiesTowardsCharacter() {
    const characterRect = character.getBoundingClientRect();

    enemies.forEach(({ enemy, enemyImage, direction, frameIndex }) => {
        const enemyRect = enemy.getBoundingClientRect();

        if (
            characterRect.right > enemyRect.left &&
            characterRect.left < enemyRect.right &&
            characterRect.bottom > enemyRect.top &&
            characterRect.top < enemyRect.bottom
        ) {
            // Collision detected, decrease character's health
            decreaseHealth(0.1); // Adjust the amount to decrease as needed
        }

        if (characterRect.left < enemyRect.left) {
            enemy.style.left = `${parseInt(enemy.style.left) - 1}px`;
        } else {
            enemy.style.left = `${parseInt(enemy.style.left) + 1}px`;
        }

        frameIndex = (frameIndex + 1) % enemyWalkLeftImageUrls.length;
        enemyImage.src = enemyWalkLeftImageUrls[frameIndex];

        enemies.find(e => e.enemy === enemy).frameIndex = frameIndex;
    });

    setTimeout(() => {
        requestAnimationFrame(moveEnemiesTowardsCharacter);
    }, 100);
}






function respawnEnemies() {
    setInterval(() => {
        // Calculate respawn position based on corners
        const respawnPosition = Math.random() < 0.5 ? 'left' : 'right';
        const newEnemy = createEnemy(respawnPosition);
        enemies.push(newEnemy);
    }, 5000); // Adjust the respawn interval as needed
}

function playSummonFrames() {
    function createSummonCharacter(frameIndex) {
        const summonCharacter = document.createElement('img');
        summonCharacter.style.width = '60%';
        summonCharacter.style.height = '60%';
        summonCharacter.style.position = 'absolute';
        summonCharacter.style.bottom = '0';
        summonCharacter.style.left = '70%'; // Adjust as needed
        summonCharacter.style.opacity = '0.6';
       // summonCharacter.style.transform = 'scaleX(-1)'; // Flip the image if needed
        summonCharacter.src = summonFrame[frameIndex];
        document.body.appendChild(summonCharacter);
        return summonCharacter;
    }

    function animateSummon(summonCharacter, frameIndex) {
        if (frameIndex < summonFrame.length) {
            summonCharacter.src = summonFrame[frameIndex];
            setTimeout(() => animateSummon(summonCharacter, frameIndex + 1), 100); // Adjust the interval as needed
        } else {
            // Move to the next frame after a short delay
            setTimeout(() => animateSummon(summonCharacter, 0), 100);
        }
    }

    // Start the summoning animation with the first frame
    const summonCharacter = createSummonCharacter(0);
    animateSummon(summonCharacter, 1); // Start from the second frame
}

// Call playSummonFrames to start the summoning animation
playSummonFrames();

function playSummonFrames1() {
    function createSummonCharacter(frameIndex) {
        const summonCharacter = document.createElement('img');
        summonCharacter.style.width = '60%';
        summonCharacter.style.height = '60%';
        summonCharacter.style.position = 'absolute';
        summonCharacter.style.bottom = '0';
        summonCharacter.style.left = '-30%'; // Adjust as needed
        summonCharacter.style.transform = 'scaleX(-1)'; // Flip the image if needed
        summonCharacter.style.opacity = '0.6';
        summonCharacter.src = summonFrame[frameIndex];
        document.body.appendChild(summonCharacter);
        return summonCharacter;
    }

    function animateSummon(summonCharacter, frameIndex) {
        if (frameIndex < summonFrame.length) {
            summonCharacter.src = summonFrame[frameIndex];
            setTimeout(() => animateSummon(summonCharacter, frameIndex + 1), 100); // Adjust the interval as needed
        } else {
            // Move to the next frame after a short delay
            setTimeout(() => animateSummon(summonCharacter, 0), 100);
        }
    }

    // Start the summoning animation with the first frame
    const summonCharacter = createSummonCharacter(0);
    animateSummon(summonCharacter, 1); // Start from the second frame
}

// Call playSummonFrames to start the summoning animation
playSummonFrames1();


function initializeGame() {
    enemies.push(createEnemy('left'));
    enemies.push(createEnemy('right'));

    requestAnimationFrame(moveEnemiesTowardsCharacter);
    respawnEnemies();
    updateScore();
}



