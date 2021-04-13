class Keyboard
{
    
    constructor()
    {
        this.keys = {};
        this.keysUp = {};

        document.onkeydown = (e) => {
            this.keys[e.code] = true;
        }
        document.onkeyup = (e) => {
            this.keys[e.code] = false;
            this.keysUp[e.code] = true;
        }
    }

    KeyDown(keyCode)
    {
        return this.keys[keyCode];
    }

    KeyUp(keyCode)
    {
        return this.keysUp[keyCode];
    }

    LateUpdate()
    {
        this.keysUp = {};
    }
}