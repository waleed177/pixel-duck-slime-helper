class Mouse
{
    constructor()
    {
        this.pos = new Vector();
        this.size = new Vector(1, 1);
        this.down = false;
        this.offset = canvas.getBoundingClientRect();
        document.onmousemove = (e) => {
            this.pos.x = e.clientX - this.offset.x;
            this.pos.y = e.clientY - this.offset.y;
        }

        document.onmousedown = (e) => {
            this.down = true;
        }

        document.onmouseup = (e) => {
            this.down = false;
            this.up = true;
        }
    }

    GetRectRT(obj)
    {
        var res = this.pos.Add(this.offset).Sub(obj.getBoundingClientRect());
        return {pos: res, size: new Vector(1,1)};
    }

    LateUpdate()
    {
        this.up = false;
    }
}