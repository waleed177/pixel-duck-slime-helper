class Images {
    constructor(debug, dir, ctx, pixelgetCTX) {
        this.imgPList = {}; //image path list
        this.imgList = {};
        this.debug = debug;
        this.dir = dir;
        this.ctx = ctx;
        this.pixelgetCTX = pixelgetCTX;
        this.tileSize = 16;
        this.loadings = 0;
    }

    AddImage(catagory, name, file) {
        if (this.imgPList[catagory] == null)
            this.imgPList[catagory] = {};
        this.imgPList[catagory][name] = this.dir + file;
        if (this.debug)
            console.log("[Images] Added " + catagory + "=>" + name + " Path: " + this.dir + file);
    }

    LoadImage(catagory, name) {
        let res = {onload: ()=> {}};
        var image = new Image();
        image.catagory = catagory;
        image.name = name;
        image.isLoading = true;
        this.loadings ++;
        image.onload = () => {
            image.isLoaded = true;
            if (this.debug)
                console.log("[Images] Loaded " + catagory + "=>" + name);
            res.onload();
            this.loadings--;
        };
        image.src = this.imgPList[catagory][name];
        if (this.imgList[catagory] == null)
            this.imgList[catagory] = {};
        this.imgList[catagory][name] = image;
        if (this.debug)
            console.log("[Images] Starting to load " + catagory + "=>" + name);
        return res;
    }

    SetPixel(catagory, name, x, y, r, g, b, a) {
        var img = this.GetImage(catagory, name);
        this.pixelgetCTX.clearRect(0, 0, img.width, img.height);
        this.pixelgetCTX.drawImage(img,0,0,256,256);
        var pixels = this.pixelgetCTX.getImageData(0,0,256,256);
        pixels.data[4*(y * 256 + x)] = r;
        pixels.data[4*(y * 256 + x)+1] = g;
        pixels.data[4*(y * 256 + x)+2] = b;
        pixels.data[4*(y * 256 + x)+3] = a;
        this.pixelgetCTX.clearRect(0, 0, img.width, img.height);
        this.pixelgetCTX.putImageData(pixels, 0,0);
        let _catagory = img.catagory;
        let _name = img.name;
        let image = new Image();
        image.isLoading = true;
        image.isLoaded = true;
        image.catagory = img.catagory;
        image.name = img.name;
        image.onload = () => {
            image.isLoaded = true;
            this.imgList[_catagory][_name] = image;
        };
        image.src = this.pixelgetCTX.canvas.toDataURL();
    }

    Get4NeighborAverage(pixelmap, x, y) {
        return addPairwise(pixelmap[x-1][y], pixelmap[x+1][y], pixelmap[x][y-1], pixelmap[x][y+1]).map((v)=>v/4);
    }

    GetImage(catagory, name) {
        if (this.imgList[catagory] != null && this.imgList[catagory][name] != null)
            return this.imgList[catagory][name];
        return { isLoading: false, isLoaded: false };
    }

    RenderImage(catagory, name, x, y, w, h, ctx) {
        if (!x)
            x = 0;
        if (!y)
            y = 0;
        var img = this.GetImage(catagory, name);
        if (!img.isLoading)
            this.LoadImage(catagory, name);
        else if (img.isLoaded) {
            if (!w)
                (ctx ? ctx : this.ctx).drawImage(img, x, y);
            else
                (ctx ? ctx : this.ctx).drawImage(img, x, y, w, h);
            return true;
        }
    }

    RenderTImage(catagory, name, tileX, tileY, x, y, w, h, ctx) {
        var img = this.GetImage(catagory, name);
        if (!img.isLoading)
            this.LoadImage(catagory, name);
        else if (img.isLoaded) {
            (ctx ? ctx : this.ctx).drawImage(img, this.tileSize*tileX, this.tileSize*tileY, this.tileSize, this.tileSize, x, y, w ? w : this.tileSize , h ? h : this.tileSize);
            return true;
        }
    }

    GetTPixelData(catagory, name, tileX, tileY) {
        //rect("white", 0, 0, 16, 16, this.pixelgetCTX);
        this.pixelgetCTX.clearRect(0, 0, 16, 16);
        this.RenderTImage(catagory, name, tileX, tileY, 0, 0, 16, 16, this.pixelgetCTX);
        var data = this.pixelgetCTX.getImageData(0,0,16,16).data;
        var data2d = [];
        for(var i = 0; i <16; i++)
            data2d[i] = [];
        var i = 0;
        for(var x = 0; x<16; x++) {
            for(var y = 0; y<16; y++){
                data2d[y][x] = [data[i], data[i+1], data[i+2], data[i+3]];
                i += 4;
            }
        }
        return data2d;
    }

    GetPixelData(catagory, name) {
        var img = this.GetImage(catagory, name);
        //rect("white", 0, 0, img.width, img.height, this.pixelgetCTX);
        this.pixelgetCTX.clearRect(0, 0, img.width, img.height);
        this.RenderImage(catagory, name, 0, 0, img.width, img.height, this.pixelgetCTX);
        var data = this.pixelgetCTX.getImageData(0,0,img.width,img.height).data;
        var data2d = [];
        for(var i = 0; i <img.width; i++)
            data2d[i] = [];
        var i = 0;
        for(var x = 0; x<img.width; x++) {
            for(var y = 0; y<img.height; y++){
                data2d[y][x] = [data[i], data[i+1], data[i+2], data[i+3]];
                i += 4;
            }
        }
        return data2d;
    }
}





