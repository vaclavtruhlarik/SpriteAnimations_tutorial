const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const images = {};
images.player = new Image();
images.player.src = "character.png";
const character_actions = ["up", "top right", "step", "right", "down right", "blink", "down", "jump"];
const max_frames = [15, 14, 5, 13, 15, 8, 12, 9];
const characters = [];
let num_characters = 10;

class Character {
    constructor() {
        this.width = 103.0625;
        this.height = 113.125;
        this.x = Math.random() * canvas.width - this.width;
        this.y = Math.random() * canvas.height - this.height;
        this.speed = Math.random() * 1.5 + 3.5;
        this.frame_y = Math.floor(Math.random() * character_actions.length);
        if (this.frame_y == 2) this.frame_y += 1;
        else if (this.frame_y == 5) this.frame_y += 1;
        this.action = character_actions[this.frame_y];
        this.max_frame = max_frames[this.frame_y];
        this.frame_x = 3;
        console.log(this);
    }

    draw() {
        ctx.drawImage(
            images.player,
            this.frame_x * this.width,
            this.frame_y * this.height,
            this.width,
            this.height,
            this.x,
            this.y,
            this.width,
            this.height
        );
        this.frame_x++;
        if (this.frame_x > this.max_frame) this.frame_x = 3;
    }

    update() {
        if (this.action === "up") {
            this.y -= this.speed;
            if (this.y < 0 - this.width) {
                this.y = canvas.height;
                this.x = Math.random() * (canvas.width - this.width);
            }
        }
        if (this.action === "top right") {
            this.x += this.speed;
            if (this.x > canvas.width) {
                this.x = 0 - this.width;
                this.y = Math.random() * (canvas.height - this.height);
            }
            this.y -= this.speed;
            if (this.y < 0 - this.width) {
                this.y = canvas.height;
                this.x = Math.random() * (canvas.width - this.width);
            }
        }
        if (this.action === "right") {
            this.x += this.speed;
            if (this.x > canvas.width) {
                this.x = 0 - this.width;
                this.y = Math.random() * (canvas.height - this.height);
            }
        }
        if (this.action === "down right") {
            this.x += this.speed;
            if (this.x > canvas.width) {
                this.x = 0 - this.width;
                this.y = Math.random() * (canvas.height - this.height);
            }
            this.y += this.speed;
            if (this.y > canvas.height) {
                this.y = 0 - this.height;
                this.x = Math.random() * (canvas.width - this.width);
            }
        }
        if (this.action === "down") {
            this.y += this.speed;
            if (this.y > canvas.height) {
                this.y = 0 - this.height;
                this.x = Math.random() * (canvas.width - this.width);
            }
        }
        // console.log(this);
    }
}
for (i = 0; i < num_characters; i++) {
    characters.push(new Character());
}

function drawSprite(img, sx, sy, sw, sh, dx, dy, dw, dh) {
    ctx.drawImage(img, sx * sw, sy * sh, sw, sh, dx, dy, dw, dh);
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (i = 0; i < num_characters; i++) {
        characters[i].draw();
        characters[i].update();
    }
}

window.onload = setInterval(animate, 1000 / 30);

window.addEventListener("resize", function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});
