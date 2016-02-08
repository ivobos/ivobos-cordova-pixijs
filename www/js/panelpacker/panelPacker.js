var ivobos_panelPacker = (function() {
    var panelPacker = {};

    
    panelPacker.pack = function (whratio, blocks) {
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
                this.splitNode(node, block.w, block.h);
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
    
    panelPacker.splitNode = function(node, w, h) {
        node.used = true;
        node.down  = { x: node.x,     y: node.y + h, w: node.w,     h: node.h - h };
        node.right = { x: node.x + w, y: node.y,     w: node.w - w, h: h          };
        return node;
    }
    
    return panelPacker;
}());


