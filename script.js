document.querySelector(".control-buttons span").onclick = function () {
    let yourName = prompt("Whats Your Name?");
    if (yourName == null || yourName == "") {
        document.querySelector(".name span").innerHTML = "Unknown";
    } else {
        document.querySelector(".name span").innerHTML = yourName;
    }
    document.querySelector(".control-buttons").remove();
}

let duration = 1000;

let blocksContainer = document.querySelector(".memory-game-block");
let blocks = Array.from(blocksContainer.children);
let orderRange = Array.from(Array(blocks.length).keys());

shuffle(orderRange);

function shuffle(array) {
    let current = array.length,
        temp,
        random;
    while (current > 0) {
        random = Math.floor(Math.random() * current);
        current--;
        temp = array[current];
        array[current] = array[random];
        array[random] = temp;
    }
    return array;
}

blocks.forEach((block, index) => {
    block.style.order = orderRange[index];
    block.addEventListener("click", function () {
        flipBlock(block);
    });
}); 

function flipBlock(block) {
    block.classList.add("is-flipped");
    let allFlippedBlock = blocks.filter(blockFlipped => blockFlipped.classList.contains("is-flipped"));
    if (allFlippedBlock.length === 2) {
        stopClicking();
        checkMatch(allFlippedBlock[0], allFlippedBlock[1]);
    }
}
function stopClicking() {
    blocksContainer.classList.add("no-clicking");
    setTimeout(() => {
        blocksContainer.classList.remove("no-clicking");
    }, duration);
}
function checkMatch(firstBlock, secondBlock) {
    let triesElement = document.querySelector(".tries span");
    if (firstBlock.dataset.photo === secondBlock.dataset.photo) {
        firstBlock.classList.remove("is-flipped");
        secondBlock.classList.remove("is-flipped");
        firstBlock.classList.add("is-match");
        secondBlock.classList.add("is-match"); 
        document.getElementById("success").play();
    } else {
        triesElement.innerHTML = parseInt(triesElement.innerHTML) + 1;
        setTimeout(() => {
            firstBlock.classList.remove("is-flipped");
            secondBlock.classList.remove("is-flipped");
            document.getElementById("fail").play();
        }, duration);
    }
}