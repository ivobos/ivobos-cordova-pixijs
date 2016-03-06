// this is broken, don't use!!

var ivobos_panelPacker = (function() {
    var panelPacker = {};

    panelPacker.pack = function(display_w, display_h, blocks) {
        console.log("panelPacker.pack("+display_w+","+display_h+",[");
        for (var n = 0; n < blocks.length; n++) {
            console.log(" { w : " + blocks[n].w + ", h : " + blocks[n].h + "},");
        }
        console.log("])");
   //     console.log("panelPacker.pack("); //+display_w+","+display_h+","+blocks+")");
        var display_whratio = display_w / display_h;

        var result = this.packToRatio(display_whratio, blocks);
        return result;
        // scale up to screen dimentions
        var scaleUp = Math.min(display_w / result.w, display_h / result.h)
        result.w *= scaleUp;
        result.h *= scaleUp;
        for (var n = 0; n < result.blocks.length; n++) {
            result.blocks[n].x *= scaleUp;
            result.blocks[n].y *= scaleUp;
            result.blocks[n].w *= scaleUp;
            result.blocks[n].h *= scaleUp;
        }
        return result;
    }
    
    // given a container and a block
    // return the block expanded in the container
    panelPacker.expandToFit = function(container, block) {
        var result = {};
        var block_whratio = block.w / block.h;
        if (container.w / block_whratio > container.h) {
            // expand to maximum height
            result.w = container.h * block_whratio;
            result.h = container.h;
        } else {
            // expand to maximum width
            result.w = container.w;
            result.h = container.w / block_whratio;
        }
        return result;
    }
    
    panelPacker.packToRatio = function (whratio, blocks) {
        var area = 0;
        for (n = 0; n < blocks.length; n++) {
            area += blocks[n].w * blocks[n].h;
        }
        var w = Math.sqrt(area * whratio); 
        var h = Math.sqrt(area / whratio);
        var result;
        while (!(result = this.fit(w, h, blocks))) {
            w *= 1.1;
            h *= 1.1;
        }
        return  result;
    }
    
    panelPacker.fit = function(bin_w, bin_h, blocks) {
        var n, node, block;
        var root = {
          x: 0,
          y: 0,
          w: bin_w,
          h: bin_h
        };
        var result = {
            w: 0,
            h: 0,
            blocks : []
        };
        for (n = 0; n < blocks.length; n++) {
            block = blocks[n];
            if (node = this.findNode(root, block.w, block.h)) {
                this.splitNode(node, block.w, block.h, false);
                result.blocks[n] = {
                    x: node.x,
                    y: node.y,
                    w: block.w,
                    h: block.h
                };
                result.w = Math.max(result.w, node.x + block.w);
                result.h = Math.max(result.h, node.y + block.h);
            } else {
                return null;
            }
        }
        return result;
    }
    
    panelPacker.findNode = function(root, w, h) {
        if (root.used)
            return this.findNode(root.right, w, h) || this.findNode(root.down, w, h);
        else if ((w <= root.w) && (h <= root.h))
            return root;
        else
            return null;
    }
    
    panelPacker.splitNode = function(node, w, h, expand) {
        var block;
        if (expand) {
            block = this.expandToFit(node, {w:w, h:h});
        } else {
            block = { w: w, h:h };
        }
        node.used = true;
        node.w = block.w;
        node.h = block.h;
        var bigDown  =      { x: node.x,                y: node.y + block.h,  w: node.w,               h: node.h - block.h };
        var smallDown =     { x: node.x,                y: node.y + block.h,  w: block.w,           h: node.h - block.h };
        var smallRight =    { x: node.x + block.w,   y: node.y,               w: node.w - block.w,  h: block.h          };
        var bigRight =      { x: node.x + block.w,   y: node.y,               w: node.w - block.w,  h: node.h          };        
        if (smallDown.w * smallDown.h > bigRight.h * bigRight.h || bigDown.w * bigDown.h > bigRight.w * bigRight.h) {
            node.down = bigDown;
            node.right = smallRight;
        } else {
            node.down = smallDown;
            node.right = bigRight;
        }
        return node;
    }
    
    return panelPacker;
}());


