

function CollisionBetween(a,b)
{
    return !(a.pos.x + a.size.x < b.pos.x || a.pos.y + a.size.y < b.pos.y ||
        b.pos.x + b.size.x < a.pos.x || b.pos.y + b.size.y < a.pos.y);
}

function rect(color, x, y, width, height, _ctx)
{
    if(_ctx == null) _ctx = ctx;
    _ctx.fillStyle = color;
    _ctx.fillRect(x, y, width, height);
}

function writeText(text, fontColor, x, y, font, _ctx, textAlign)
{
    if(_ctx == null) _ctx = ctx;
    if(font) _ctx.font = font; //eg 30px Comic Sans MS, 30px Arial
    _ctx.textAlign = textAlign || "center";
    _ctx.fillStyle = fontColor;
    _ctx.fillText(text, x, y);
}


function addPairwise(...args) {
    var res = [];
    for(var i = 0; i < args[0].length; i++) res.push(0);
    for(var i = 0; i < args.length; i++)
        for(var j = 0; j <args.length; j++)
            res[j] += args[i][j];
    return res;
}

function load()
{
    canvas = document.getElementById("game");
    ctx = canvas.getContext("2d");
    pixelDataCTX = document.getElementById("pixelget").getContext("2d");

    keyboard = new Keyboard();
    mouse = new Mouse();
    rImages = new Images(true, "", ctx, pixelDataCTX);

    width = canvas.width;
    height = canvas.height;
    halfWidth = canvas.width/2;
    halfHeight = canvas.height/2;

    pixelPerfect(ctx);
    pixelPerfect(pixelDataCTX);
    InitResources();

    setInterval(MainLoop, 1000/8);

    function pixelPerfect(ctx) {
        ctx.webkitImageSmoothingEnabled = false;
        ctx.mozImageSmoothingEnabled = false;
        ctx.msImageSmoothingEnabled = false;
        ctx.imageSmoothingEnabled = false;
    }
}

