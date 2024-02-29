let resetButton = document.querySelectorAll("#resetBut"),
	theButtons = document.querySelectorAll("#buttonHolder img"),
	puzzleBoard = document.querySelector(".puzzle-board"),
	puzzleSpots = document.querySelectorAll(".puzzle-board div"),
	puzzlePieces = document.querySelector(".puzzle-pieces"),
	puzzlePiecesImg = document.querySelectorAll(".puzzle-pieces img"),
	dropZones = document.querySelectorAll('.drop-zone'),
	sameSpot = document.querySelector('#same_spot'),
	allPiecesCorrect = document.querySelector('#all_pieces_correct'),
	draggedPiece;

function changeBGImage() {
	puzzleBoard.style.backgroundImage = `url(images/backGround${this.id}.jpg)`;

	puzzlePiecesImg.forEach(piece => {
		const jpgPosition = piece.src.indexOf(".jpg");
		const pieceName = piece.src.slice(0, jpgPosition - 1);
		const newName = pieceName + this.id + ".jpg";
		piece.src = newName;
    });

	reset();
}

function reset() {
    puzzlePiecesImg.forEach(piece => {
        puzzlePieces.appendChild(piece);
    });
}

function handleStartDrag() {
	draggedPiece = this;
}

function handleDragOver(event) {
	event.preventDefault();
};

function handleDrop(event) {
	event.preventDefault();
	if (this.children.length == 0) {
		this.appendChild(draggedPiece);

		if (puzzlePieces.children.length === 0) {
            let allCorrect = true;
            puzzleSpots.forEach(spot => {
                if (spot.children.length === 1) {
                    const pieceSrc = spot.children[0].src;
                    if (pieceSrc.indexOf(spot.id) === -1) {
                        allCorrect = false;
                    }
                } else {
                    allCorrect = false;
                }
            });

            if (allCorrect) {
				allPiecesCorrect.style.opacity = 1;
				setTimeout(() => {
					allPiecesCorrect.style.opacity = 0;
				}, 7000);
            }
        }
	} else {
		sameSpot.style.opacity = 1;
		setTimeout(() => {
			sameSpot.style.opacity = 0;
		}, 3000);
	}
};

resetButton.forEach(button => button.addEventListener("click", reset));
theButtons.forEach(button => button.addEventListener("click", changeBGImage));

puzzlePiecesImg.forEach(piece => piece.addEventListener("dragstart", handleStartDrag));

dropZones.forEach(zone => zone.addEventListener('dragover', handleDragOver));
dropZones.forEach(zone => zone.addEventListener('drop', handleDrop));