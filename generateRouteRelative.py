f = open("trainRoute.txt", "w")

trainSpeed = 2

    for (let x = 0; x < 0.25*canvas.width; x=x+trackSize) 
    {
        ctx.drawImage(horzTrack, x, 0.1*canvas.height,trackSize,trackSize);
    }



f.close()
