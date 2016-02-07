var ivobos_20160125_fullwindow_main = (function() {
    var renderer = PIXI.autoDetectRenderer(window.innerWidth, window.innerHeight);

    renderer.view.style.position = "absolute";
    renderer.view.style.display = "block";
    renderer.autoResize = true;
    renderer.resize(window.innerWidth, window.innerHeight);

    window.addEventListener("resize", function(event){
        var w = window.innerWidth;    
        var h = window.innerHeight;    
        //this part resizes the canvas but keeps ratio the same    
        renderer.view.style.width = w + "px";    
        renderer.view.style.height = h + "px";    
        //this part adjusts the ratio:    
        renderer.resize(w,h);
    });

    document.body.appendChild(renderer.view);

    var stage = new PIXI.Container();

    PIXI.loader
        .add("img/download.jpeg")
        .load(setup);

    var tileSprite;
    var count = 0;
    var fpsText;

    function setup() {
        var tileTexture = PIXI.loader.resources["img/download.jpeg"].texture;
        tileSprite = new PIXI.extras.TilingSprite(tileTexture, renderer.width, renderer.height);
        stage.addChild(tileSprite);
        fpsText = new PIXI.Text('FPS',{font : '14px Arial', fill : 0xf0f0f0, align : 'center'});
        stage.addChild(fpsText);
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

        tileSprite.tileScale.x = 1 + Math.sin(count) / 10;
        tileSprite.tileScale.y = 1 + Math.sin(count) / 10;

        tileSprite.tilePosition.x = 100 * Math.sin(count);
        tileSprite.tilePosition.y = 100 * count;

        // render the root container
        renderer.render(stage);

        requestAnimationFrame(animate);
    }

    return {};
})();
