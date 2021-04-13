class Vector
{
    constructor(x, y)
    {
        this.x = x || 0;
        this.y = y || 0;
    }

    Add (vec)
    {
        return new Vector(this.x + vec.x, this.y + vec.y);
    }

    Sub (vec)
    {
        return new Vector(this.x - vec.x, this.y - vec.y);
    }

    Mul (num)
    {
        return new Vector(this.x * num, this.y * num);
    }

    Div (num)
    {
        return new Vector(this.x / num, this.y / num);
    }

    MulX(num)
    {
        return new Vector(this.x * num, this.y);
    }

    MulY(num)
    {
        return new Vector(this.x, this.y  * num);
    }

    DivX(num)
    {
        return new Vector(this.x / num, this.y);
    }

    DivY(num)
    {
        return new Vector(this.x, this.y  / num);
    }

    Norm ()
    {
        return Math.sqrt(this.x*this.x + this.y*this.y);
    }

    Normalized()
    {
        return this.Div(this.Norm());
    }

    GetVecDir(rad)
    {
        var norm = this.Norm();
        return new Vector(norm * Math.cos(rad), norm * Math.sin(rad));
    }

    GetVecNorm(norm)
    {
        return this.Mul(norm/this.Norm());
    }

    Clone()
    {
        return new Vector(this.x, this.y);
    }

    Gridized()
    {
        var absx = Math.abs(this.x);
        var absy = Math.abs(this.y);
        if(absx == absy) return new Vector(0, 0);
        if(absx > absy) return new Vector(Math.sign(this.x), 0);
        return new Vector(0, Math.sign(this.y));
    }

    f(func)
    {
        return new Vector(func(this.x), func(this.y));
    }

    Equal(vec)
    {
        return vec.x == this.x && vec.y == this.y;
    }

    ToString()
    {
        return this.x + ", " + this.y;
    }
}