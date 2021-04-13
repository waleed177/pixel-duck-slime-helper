//To win you need 
//player.foundLittleDuck
//player.momDuckHasLittleDuckNow <--- most important, as it can be forgotten to do this! :D
//player.freedStuckDuck
//player.bigDuckHappy
//player.freedDucksFromJail
//player.badDuckGoodNow


//Tile Colors
Tiles = {};
Tiles.FullStop = [133, 72, 72, 255];
Tiles.White = [255, 255, 255, 255];
Tiles.Nothing = [0, 0, 0, 0];
Tiles.Collision = [0, 0, 0, 255];
/*Tiles.Water = [0, 0, 255];
Tiles.WaterShadow = [0, 0, 177];
Tiles.SandWall = [187, 189, 61];
Tiles.WoodWallTop = [171, 134, 70];
Tiles.WoodWallSide = [154, 111, 36];
Tiles.WoodGround = [167, 121, 41];
*/

Cutscenes = {
    MomDuckLookingForLittleDuck: ["cutscenes1", 0, 0],  //X
    MissingLittleDuckFound: ["cutscenes1", 0, 1],       //X
    MomDuckOnGiveDuck: ["cutscenes1", 0, 2],            //X

    Coin: ["cutscenes1", 0, 3],                         //X
    StuckDuckFreedTalk: ["cutscenes1", 0, 4],           //X
    //Empty: ["cutscenes1", 5],
    ShopKeeper1Intro: ["cutscenes1", 0, 6],             //X
    ShopKeeper1PickaxePurchase: ["cutscenes1", 0, 7],   //X
    ShopKeeper1GemPurchase: ["cutscenes1", 4, 6],       //X

    NotEnoughMoney: ["cutscenes1", 0, 9],               //X
    Sandcastle1: ["cutscenes1", 0, 10],                 //X
    NeedPickaxe: ["cutscenes1", 0, 11],                 //X
    MiningAWall: ["cutscenes1", 0, 12],                 //X
    NotNow: ["cutscenes1", 0, 13],                      //X
    BigDuckBiteEveryTree: ["cutscenes1", 0, 14],        //X
    BigDuckMoreTrees: ["cutscenes1", 5, 14],            //X
    BigDuckHappy: ["cutscenes1", 8, 14],                //X
    TreeBite: ["cutscenes1", 1, 14],                    //X
    PlayerMessingUpParkour: ["cutscenes1", 0, 15],      //X

    ThreatToEatYou: ["cutscenes1", 4, 0],               //X
    ThreatToEatDucks: ["cutscenes1", 11, 0],            //X
    BecomingAGoodDuck: ["cutscenes1", 7, 2],            //X
    IsAGoodDuck: ["cutscenes1", 9, 2],                  //X
    
    HelpUsDuck: ["cutscenes1", 6, 1],                   //X
    ThankYouDuck: ["cutscenes1", 9, 1],                 //X

    NotNowEndGame: ["cutscenes1", 3, 2],                //X

    JailBreakingPickaxePickup: ["cutscenes1", 9, 11],   //X
    JailBreakingPickaxeMining: ["cutscenes1", 4, 11],   //X
    JailBreakingPickaxeNeeded: ["cutscenes1", 2, 11],   //X
    DontForgetLittleDucksMom: ["cutscenes1", 3, 3],     //X
    FreeTheDucksSoNotNow: ["cutscenes1", 2, 13],        //X
    YouWin: ["cutscenes1", 0, 8],                       //X
    Chairy: ["cutscenes1", 6, 15]                       //X
};

NPCBehaviours = {
    //Mom duck
    0: {
        onTalk: (mem, x, y) => {
            if(!player.foundLittleDuck) {
                cutscene.Start(Cutscenes.MomDuckLookingForLittleDuck);
                player.momDuckHasLittleDuckNow = true;
            }
                
            else
                cutscene.Start(Cutscenes.MomDuckOnGiveDuck);
        }
    },
    
    //Missing duck
    1: {
        onTalk: (mem, x, y) => {
            cutscene.Start(Cutscenes.MissingLittleDuckFound);
            player.foundLittleDuck = true;
            removeObject(x,y);
        }
    },

    //Coin
    2: {
        onTalk: (mem, x, y) => {
            cutscene.Start(Cutscenes.Coin);
            player.coins++;
            removeObject(x,y);
        }
    },

    //Stuck Duck 
    3: {
        onTalk: (mem, x, y) => {
            cutscene.Start(Cutscenes.StuckDuckFreedTalk);
            player.freedStuckDuck = true;
            removeObject(49, 107);
            removeObject(50, 107);
        }
    },

    //Minable walls tier 1 (For stuck duck)
    4: {
        onTalk: (mem, x, y) => {
            if(!player.pickaxe1) {
                cutscene.Start(Cutscenes.NeedPickaxe);
            } else {
                player.pickaxe1--;
                cutscene.Start(Cutscenes.MiningAWall);
                removeObject(x, y);
            }
        }
    },

    //Shop keeper 1
    5: {
        onTalk: (mem, x, y) => {
            cutscene.Start(Cutscenes.ShopKeeper1Intro);
            removeObject(x-1, y);
        }
    },

    //Shop keeper 1 - pickaxe (3coins)
    6: {
        onTalk: (mem, x, y) => {
            if(player.coins >= 3) {
                cutscene.Start(Cutscenes.ShopKeeper1PickaxePurchase);
                player.coins -= 3;
                player.pickaxe1 = 3;
                removeObject(x, y);
            } else {
                cutscene.Start(Cutscenes.NotEnoughMoney);
            }
        }
    },

    //Shop keeper 1 - gem purchase
    7: {
        onTalk: (mem, x, y) => {
            if(player.coins >= 6) {
                cutscene.Start(Cutscenes.ShopKeeper1GemPurchase);
                player.coins -= 6;
                player.gem = 1;
                removeObject(x, y);
            } else {
                cutscene.Start(Cutscenes.NotEnoughMoney);
            }
        }
    },

    //Sandcastle
    8: {
        onTalk: (mem, x, y) => {
            cutscene.Start(Cutscenes.Sandcastle1);
        }
    },

    //NotNow Block
    9: {
        onTalk: (mem, x, y) => {
            cutscene.Start(Cutscenes.NotNow);
        }
    },

    //Big duck wants you to bite every tree
    10: {
        onTalk: (mem, x, y) => {
            if(player.treeBites == 0) 
                cutscene.Start(Cutscenes.BigDuckBiteEveryTree);
            else if(player.treeBites < 7)
                cutscene.Start(Cutscenes.BigDuckMoreTrees);
            else if(player.treeBites == 7) {
                cutscene.Start(Cutscenes.BigDuckHappy);
                player.bigDuckHappy = true;
                removeObject(104,176);
                removeObject(105,176);
                removeObject(105,175);
            }
        }
    },

    //Tree bite
    11: {
        onTalk: (mem, x, y) => {
            cutscene.Start(Cutscenes.TreeBite);
            removeObject(x, y);
            player.treeBites++;
        }
    },

    //Parkour checkpoint
    12: {
        onTalk: (mem, x, y) => {
            player.parkourCheckpoint = [x, y];
        }
    },

    //Cutscene threat to eat you.
    13: {
        onTalk: (mem, x, y) => {
            if(player.badDuckGoodNow) {
                cutscene.Start(Cutscenes.IsAGoodDuck);
            }
            else if(player.gem){
                if(player.momDuckHasLittleDuckNow) {
                    cutscene.Start(Cutscenes.BecomingAGoodDuck);
                    removeObject(182,99);
                    removeObject(185,99);

                    removeObject(142, 81);
                    removeObject(142, 82);
                    removeObject(142, 83);
                    removeObject(142, 84);
                    player.badDuckGoodNow = true;
                } else {
                    cutscene.Start(Cutscenes.DontForgetLittleDucksMom);
                }
                
            }
            else
                cutscene.Start(Cutscenes.ThreatToEatYou);
        }
    },

    //Threat to eat ducks
    14: {
        onTalk: (mem, x, y) => {
            cutscene.Start(Cutscenes.ThreatToEatDucks);
        }
    },

    //Jail block
    15: {
        onTalk: (mem, x, y) => {
            if(!player.pickaxeSuper) {
                cutscene.Start(Cutscenes.JailBreakingPickaxeNeeded);
            } else {
                player.pickaxeSuper--;
                cutscene.Start(Cutscenes.JailBreakingPickaxeMining);
                removeObject(x, y);
            }
        }
    },

    //Thank you ducks
    16: {
        onTalk: (mem, x, y) => {
            if(!player.freedDucksFromJail) {
                removeObject(59, 100);
                removeObject(59, 101);
            }
            cutscene.Start(Cutscenes.ThankYouDuck);
            player.freedDucksFromJail = true;
            
        }
    },

    //Help us duck!
    17: {
        onTalk: (mem, x, y) => {
            cutscene.Start(Cutscenes.HelpUsDuck);
        }
    },

    //End of the game not now block.
    18: {
        onTalk: (mem, x, y) => {
            cutscene.Start(Cutscenes.NotNowEndGame);
        }
    },

    //Super jail breaking pickaxe
    19: {
        onTalk: (mem, x, y) => {
            cutscene.Start(Cutscenes.JailBreakingPickaxePickup);
            removeObject(x, y);
            player.pickaxeSuper = 10;
        }
    },

    //You gotta freee the ducks, so not now.
    20: {
        onTalk: (mem, x, y) => {
            cutscene.Start(Cutscenes.FreeTheDucksSoNotNow);
        }
    },

    //You win
    21: {
        onTalk: (mem, x, y) =>{
            cutscene.Start(Cutscenes.YouWin);
        }
    },

    //Chairy guy
    22: {
        onTalk: (mem, x, y) =>{
            cutscene.Start(Cutscenes.Chairy);
        }
    }
};

entityTypes = {};

function InitResources()
{
    //rImages.AddImage("tiles", "back1", "Tiles/BackgroundTiles.bmp")
    artPixelData = {};
    mapsData = {};
    mapsOverlayRectangles = {};
    mapsOverlayLabels = {};
    cutsceneData = {};
    
    rImages.AddImage("maps", "map1", "map.png");
    rImages.AddImage("mapOverlays", "map1", "mapTop.png");
    rImages.AddImage("cutscenes", "cutscenes1", "cutscenes.png");
    rImages.AddImage("functionals", "map1", "Functional.png");

    rImages.LoadImage("maps", "map1").onload = () => {
        artPixelData.map1 = rImages.GetPixelData("maps", "map1");
    };

    rImages.LoadImage("cutscenes", "cutscenes1").onload = () => {
        cutsceneData.cutscenes1 = rImages.GetPixelData("cutscenes", "cutscenes1");

    };

    rImages.LoadImage("functionals", "map1").onload = () => {
        mapsData.map1 = rImages.GetPixelData("functionals", "map1");
        for(var x = 0; x < 256; x++)
            for(var y = 0; y < 256; y++) {
                var pixel = mapsData.map1[x][y];
                if(pixel[0] == 181) {
                    world.AddChild(new (entityTypes[pixel[1]])(x, y, pixel[2], pixel[3]));
                }
            }
    };

    rImages.LoadImage("mapOverlays", "map1").onload = () => {
        var pixels = rImages.GetPixelData("mapOverlays", "map1");
        var freeId = 1;
        mapsOverlayRectangles.map1 = new World();
        mapsOverlayLabels.map1 = [];
        for(var x = 0; x < 256; x++)
            mapsOverlayLabels.map1[x] = [];
        for(var x = 0; x < 256; x++)
            for(var y = 0; y < 256; y++) {
                if(colorsEqual(pixels[x][y], Tiles.Nothing) || mapsOverlayLabels.map1[x][y]) continue;
                var xEnd = 0;
                for(xEnd = x; xEnd < 256; xEnd++) if(colorsEqual( pixels[xEnd][y], Tiles.Nothing) || mapsOverlayLabels.map1[x][y]) break;
                var width = xEnd-x;

                var yEnd = 0;
                for(yEnd = y; yEnd < 256; yEnd++) {
                    var full = true;
                    for(var x2 = x; x2 < xEnd; x2++) 
                        if(colorsEqual( pixels[x2][yEnd], Tiles.Nothing) || mapsOverlayLabels.map1[x2][yEnd]) full = false;
                    
                    if(!full){
                        yEnd--;
                        break;
                    } else {
                        for(var x2 = x; x2 < xEnd; x2++) 
                            mapsOverlayLabels.map1[x2][yEnd] = freeId;
                    }
                }

                var height = yEnd-y+1;

                mapsOverlayRectangles.map1.AddChild(new OverlayRectangle(x, y, width, height, rImages.GetImage("mapOverlays", "map1"), freeId));
                freeId++
            }
    };

    world = new World();
    cutscene = new Cutscene(rImages.GetImage("maps", "map1"));
    player = new Player(24, 24);

    world.AddChild(player);

    tileSize = width/16;
}

function removeObject(x,y) {
    rImages.SetPixel("maps", "map1", x, y, ...rImages.Get4NeighborAverage(artPixelData.map1, x, y));
    mapsData.map1[x][y] = [0,0,0,0];
}

function colorsEqual(a,b){
    return (a[0] == b[0]) && (a[1] == b[1]) && (a[2] == b[2]) && (a[3] == b[3]);
}

function floorEqual(a,b) {
    return Math.floor(a) == Math.floor(b);
}

function collision(a,b) {
    return floorEqual(a.x, b.x) && floorEqual(a.y, b.y);
}

function walkableArea(x, y) {
    if(x < 0 || x >= 255 || y < 0 || y >= 255) return false;
    var area = mapsData.map1[Math.floor(x)][Math.floor(y)];
    return !(
        area == null
        || colorsEqual(area, Tiles.Collision)
        || (area[0] == 180 && area[1] == 180));
}

function talkToNPC(x, y) {
    var area = mapsData.map1[x][y];
    if(area[0] == 180 && (area[1] == 180 || area[1] == 181)) {
        NPCBehaviours[area[2]].onTalk(NPCBehaviours[area[2]], x, y);
        return true;
    }
    return false;
}

function MainLoop()
{
    if(rImages.loadings != 0) return;
    cutscene.Update();
    if(!cutscene.running) world.Update();

    keyboard.LateUpdate();

    rect("white", 0, 0, width, height);
    ctx.save();
        ctx.translate(Math.floor(tileSize*(8-player.x)), Math.floor(tileSize*(8-player.y)));
        rImages.RenderImage("maps", "map1", 0, 0, tileSize*256, tileSize*256);

        world.Render();
        mapsOverlayRectangles.map1.Render();
    ctx.restore();
    cutscene.Render();
}


class World {

    constructor() {
        this.children = [];
    }

    Render() {
        this.children.forEach((child) => {
            child.Render();
        });
    }

    Update() {
        this.children.forEach((child) => {
            child.Update();
        });
    }

    AddChild(child) {
        this.children.push(child);
    }
}

class GameObject {

    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.color = color;
    }

    Update() {
        
    }

    Render() {
        rect(this.color, Math.floor(this.x) * tileSize,  Math.floor(this.y) * tileSize, tileSize, tileSize);
    }
}


class Player extends GameObject {

    constructor(x, y) {
        super(x, y, "green");
        this.coins = 0;
        this.treeBites = 0;
    }

    Update() {

        if(keyboard.KeyDown("KeyD")) this.MoveTo(player.x+1, player.y);
        if(keyboard.KeyDown("KeyA")) this.MoveTo(player.x-1, player.y);
        if(keyboard.KeyDown("KeyS")) this.MoveTo(player.x, player.y+1);
        if(keyboard.KeyDown("KeyW")) this.MoveTo(player.x, player.y-1);
    }

    MoveTo(x, y) {
        if(walkableArea(x, y)) {
            player.x = x;
            player.y = y;
            talkToNPC(x, y);
            return true;
        }
        talkToNPC(x, y);
        return false;
    }
}

class Cutscene {

    constructor(mapImage) {
        this.cutsceneId = 0;
        this.mapImage = mapImage;
        this.frameId = 0;
        this.cutsceneFade = -2;

        this.state = "";
    }

    Update() {
        if(this.state == "fadeIn") {
            if(this.cutsceneFade < 12)
                this.cutsceneFade += 2;
            else
                this.state = "slideshow";
        } else if(this.state == "slideshow") {
            if(keyboard.KeyUp("Space")) {
                if(colorsEqual(cutsceneData.cutscenes1[(this.frameId+1)*16][this.cutsceneId*16], Tiles.FullStop))
                    this.state = "fadeOut";
                else
                    this.frameId++;
            }
        } else if(this.state == "fadeOut") {
            if(this.cutsceneFade >= 0)
                this.cutsceneFade -= 2;
            else
                this.state = "";
        }
    }

    Render() {
        if(this.cutsceneFade >= 0) {
            var yCut = (16-this.cutsceneFade)/2;

            ctx.drawImage(this.mapImage, player.x-8, player.y-(yCut-1), 16, yCut, 0, -tileSize, 16*tileSize, (yCut)*tileSize);
            ctx.drawImage(this.mapImage, player.x-8, player.y+1, 16, yCut, 0, (yCut+this.cutsceneFade+1)*tileSize, 16*tileSize, (yCut)*tileSize);
            
            rect("black", 0, (yCut-1)*tileSize, width, tileSize);
            rect("black", 0, (yCut+this.cutsceneFade)*tileSize, width, tileSize);
            
            rect("green", 8*tileSize, (yCut-2)*tileSize, tileSize, tileSize);
    
            ctx.drawImage(this.image, 16*this.frameId, 16*this.cutsceneId + yCut, 16, this.cutsceneFade, 0, yCut*tileSize, 16*tileSize, this.cutsceneFade*tileSize);
        }
    }

    Start(id) {
        this.state = "fadeIn";
        this.frameId = id[1];
        this.cutsceneFade = -2;
        this.cutsceneId = id[2];
        this.mapImage = rImages.GetImage(this.mapImage.catagory, this.mapImage.name);
        this.image = rImages.GetImage("cutscenes", id[0]);
    }

    get running() {
        return this.state != "";
    }
}

class OverlayRectangle extends GameObject {

    constructor(x,y,w,h, img, id) {
        super(0, 0, "");
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.id = id;
        this.img = img;
    }

    Render() {
        if(this.id != mapsOverlayLabels.map1[player.x][player.y])
            ctx.drawImage(this.img, this.x, this.y, this.w, this.h, Math.floor(this.x*tileSize), Math.floor(this.y*tileSize), Math.ceil(this.w*tileSize),  Math.ceil(this.h*tileSize));
    }
}

entityTypes[0] = class MovingBlock extends GameObject {
    constructor(x, y, dir){
        super(x, y, "red");
        //k = 2*n or 2*n + 1
        this.velX = 0;
        this.velY = 0;

        if(dir % 2 == 0)
            this.velX = dir/16;
        else
            this.velY = (dir-1)/16;
        
        
    }

    Update() {
        if(walkableArea(this.x+this.velX, this.y+this.velY)) {
            this.x += this.velX;
            this.y += this.velY;
        } else {
            this.velX *= -1;
            this.velY *= -1;
        }

        if(collision(this,player)) {
            player.x = player.parkourCheckpoint[0];
            player.y = player.parkourCheckpoint[1];
            cutscene.Start(Cutscenes.PlayerMessingUpParkour);
        }
    }
}