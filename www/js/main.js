var ivobos_20160125_fullwindow_main = (function() {
    var renderer = PIXI.autoDetectRenderer(window.innerWidth, window.innerHeight);

    renderer.view.style.position = "absolute";
    renderer.view.style.display = "block";
    renderer.autoResize = true;
    renderer.resize(window.innerWidth, window.innerHeight);

    document.body.appendChild(renderer.view);

    var stage = new PIXI.Container();

    var tileSprites = [
        { img: "img/download.jpeg", w: 6, h: 6},
        { img: "img/logo.png", w: 3, h: 2},
        { img: "img/lines.png", w: 2, h: 3}
    ];
    var count = 0;
    var fpsText;
    
    window.addEventListener("resize", function(event){
        var w = window.innerWidth;    
        var h = window.innerHeight;    
        //this part resizes the canvas but keeps ratio the same    
        renderer.view.style.width = w + "px";    
        renderer.view.style.height = h + "px";    
        //this part adjusts the ratio:    
        renderer.resize(w,h);
        resizeSprites();
    });

    // load images and start
    var loader = PIXI.loader;
    for (var n = 0; n < tileSprites.length; n++) {
        loader.add(tileSprites[n].img);
    }
    loader.load(setup);

    function resizeSprites() {
        // arrange sprites on screen
        var container = { x: 0, y: 0, w: renderer.width, h: renderer.height};
        var layout = [
            { w: 4, h: 4 },
            { w: 2, h: 2 },
            { w: 2, h: 2 }            
        ];
        var packResult = ivobos_panelPacker2.pack(container, layout);
        for (var n = 0; n < tileSprites.length; n++) {
            tileSprites[n].sprite.width = packResult[n].w;
            tileSprites[n].sprite.height = packResult[n].h;            
            tileSprites[n].sprite.x = packResult[n].x;
            tileSprites[n].sprite.y = packResult[n].y;
        }        
    }
    
    function setup() {
        // create sprites
        for (var n = 0; n < tileSprites.length; n++) {
            var tileTexture = PIXI.loader.resources[tileSprites[n].img].texture;
            tileSprites[n].sprite = new PIXI.extras.TilingSprite(tileTexture);
            stage.addChild(tileSprites[n].sprite);
        } 
        // FPS display
        fpsText = new PIXI.Text('FPS',{font : '14px Arial', fill : 0xf0f0f0, align : 'center'});
        stage.addChild(fpsText);
        resizeSprites();
        animate();
    }

    var lastTimestamp = null;
    function animate(timestamp) {

        if (timestamp) {
            if (lastTimestamp) {
                var measuredFps = Math.round(1000 / (timestamp - lastTimestamp));
                fpsText.text = "FPS:"+measuredFps;
            }
            lastTimestamp = timestamp;
        }

        count += 0.005;

        for (var n = 0; n < tileSprites.length; n++) {
            tileSprites[n].sprite.tileScale.x = 1 + Math.sin(count) / 10;
            tileSprites[n].sprite.tileScale.y = 1 + Math.sin(count) / 10;

            tileSprites[n].sprite.tilePosition.x = 100 * Math.sin(count);
            tileSprites[n].sprite.tilePosition.y = 100 * count;
        }

        // render the root container
        renderer.render(stage);

        requestAnimationFrame(animate);
    }

    return {};
})();
