const canvas = document.getElementById('canvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;


canvas.width = document.body.clientWidth;
canvas.height = document.body.clientHeight;

const screenRatio = Math.floor(window.innerWidth / window.innerHeight);
const treeLength = window.innerHeight / 3;



const random = {
    leafRadius: () => (Math.random() * 20) + 10,
    hex: (): string => `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`,
    treeAngle: (): number => (Math.random() * 20) + 5,
    branchWidth: (): number => ((Math.random() * 30) + 20) / screenRatio,
    leafLimit: (): number => Math.floor(Math.random() * 5) + 5,
    nop: (num: number) => Math.round(Math.random()) == 1 ? -num : num,
    curve: (): number => Math.random() * 10
}

let randomAngle = random.treeAngle(),
    leafLimit = random.leafLimit(),
    treeCurve = random.curve();

function drawTree(startX: number, startY: number, length: number, angle: number, branchWidth: number, color: { branch: string, leaf: string }) {
    ctx.beginPath();
    ctx.save();
    ctx.strokeStyle = color.branch;
    ctx.lineWidth = branchWidth;
    ctx.fillStyle = color.leaf;
    ctx.shadowBlur = 10
    ctx.shadowColor = 'black';
    ctx.translate(startX, startY);
    ctx.rotate(toRadians(angle));
    ctx.moveTo(0, 0);

    if (angle > 0) {
        ctx.bezierCurveTo(treeCurve, -length / 2, treeCurve, -length / 2, 0, -length);
    } else {
        ctx.bezierCurveTo(treeCurve, -length / 2, -treeCurve, -length / 2, 0, -length);
    }

    ctx.stroke();

    if (length < 10) {
        ctx.beginPath();
        ctx.arc(0, -length, random.leafRadius(), 0, Math.PI / 2);
        ctx.fill();
        ctx.restore();
        return;
    }

    length *= 0.75;
    branchWidth = Math.max(2, branchWidth * 0.5);


    drawTree(0, -length, length, angle + randomAngle, branchWidth, color);
    drawTree(0, -length, length, angle - randomAngle, branchWidth, color);

    ctx.restore();

}

function toRadians(degrees: number): number {
    return degrees * Math.PI / 180;
}


drawTree(canvas.width / 2, canvas.height, treeLength, 0, random.branchWidth(), { branch: random.hex(), leaf: random.hex() });

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    drawTree(canvas.width / 2, canvas.height, canvas.height / 3, 0, random.branchWidth(), { branch: random.hex(), leaf: random.hex() });
})