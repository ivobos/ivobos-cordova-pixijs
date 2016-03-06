var ivobos_panelPacker2 = (function () {
    "use strict";
    
    var panelPacker2 = {};

    // container is { w, h, x, y}
    // blocks is array of 3 {w, h}
    // returns { 3 blocks array of { w, h, x, y} }
    panelPacker2.pack = function (container, blocks) {
        if (blocks.length === 3) {
            return this.cloverPack(container, blocks);
        } else {
            return [];
        }
    };
    
    // take block and expand it into container
    // align the other two bocks to right or below
    // container is { w, h, x, y}
    // blocks is 3 of {w, h}
    // returns 3 of { w, h, x, y}
    panelPacker2.cloverPack = function (container, blocks) {
        var result1 = this.cloverPackHorizontal(container, blocks);
        var efficiency1 = this.packEfficiency(container, result1);
        var result2 = this.cloverPackVertical(container, blocks);
        var efficiency2 = this.packEfficiency(container, result2);
        if ( efficiency1 > efficiency2) {
            return result1;
        } else {
            return result2;
        }
    }

    // pack 1st block in left
    // pack 2nd block right of the 1st block
    // pack 3rd block right of 1st block but below 2nd block
    // expand grouping to fit container
    panelPacker2.cloverPackHorizontal = function(container, blocks) {
        var packed_blocks_w = blocks[0].w + Math.max(blocks[1].w, blocks[2].w);
        var packed_blocks_12_h = blocks[1].h + blocks[2].h;
        var packed_blocks_h = Math.max(blocks[0].h, packed_blocks_12_h);
        // pick a scaling factor that will allow us to fit it in container
        var scale = Math.min(container.w / packed_blocks_w, container.h / packed_blocks_h);
        packed_blocks_w *= scale;
        packed_blocks_h *= scale;
        packed_blocks_12_h *= scale;
        return [
            {   
                x: container.x + ( container.w - packed_blocks_w ) / 2,
                y: container.y + ( container.h - packed_blocks_h ) / 2,
                w: blocks[0].w * scale,
                h: blocks[0].h * scale
            },
            {
                x: container.x + ( container.w - packed_blocks_w ) / 2 + blocks[0].w * scale,
                y: container.y + (container.h - packed_blocks_12_h) / 2,
                w: blocks[1].w * scale,
                h: blocks[1].h * scale
            },
            {
                x: container.x + ( container.w - packed_blocks_w ) / 2 + blocks[0].w * scale,
                y: container.y + (container.h - packed_blocks_12_h) / 2 + blocks[1].h * scale,
                w: blocks[2].w * scale,
                h: blocks[2].h * scale
            }
        ];
    };

    // pack 1st block on top
    // pack 2nd block below the 1st block
    // pack 3rd block below 1st block but right of 2nd block
    // expand grouping to fit container
    panelPacker2.cloverPackVertical = function(container, blocks) {
        var packed_blocks_h = blocks[0].h + Math.max(blocks[1].h, blocks[2].h);
        var packed_blocks_12_w = blocks[1].w + blocks[2].w;
        var packed_blocks_w = Math.max(blocks[0].w, packed_blocks_12_w);
        // pick a scaling factor that will allow us to fit it in container
        var scale = Math.min(container.w / packed_blocks_w, container.h / packed_blocks_h);
        packed_blocks_w *= scale;
        packed_blocks_h *= scale;
        packed_blocks_12_w *= scale;
        return [
            {   
                x: container.x + ( container.w - packed_blocks_w ) / 2,
                y: container.y + ( container.h - packed_blocks_h ) / 2,
                w: blocks[0].w * scale,
                h: blocks[0].h * scale
            },
            {
                x: container.x + ( container.w - packed_blocks_12_w ) / 2,
                y: container.y + ( container.h - packed_blocks_h ) / 2 + blocks[0].h * scale,
                w: blocks[1].w * scale,
                h: blocks[1].h * scale
            },
            {
                x: container.x + ( container.w - packed_blocks_12_w ) / 2 + blocks[1].w * scale,
                y: container.y + ( container.h - packed_blocks_h ) / 2 + blocks[0].h * scale,
                w: blocks[2].w * scale,
                h: blocks[2].h * scale
            }
        ];
    };

    // assumes all blocks are inside container and don't overlap
    // container is { w, h, x, y }
    // packed_blocks is array of { x, y, w, h}
    // returns number between 0.0 and 1.0
    panelPacker2.packEfficiency = function(container, packed_blocks) {
        var available_area = container.w * container.h;
        var block_area = 0;
        for (var i = 0; i < packed_blocks.length; i++) {
            block_area += packed_blocks[i].w * packed_blocks[i].h;
        }
        return block_area / available_area;
    };
    
    // check whether two blocks overlap
    // rect1 is { x, y, w, h}
    // rect2 is { x, y, w, h}
    // returns true if overlap, false otherwise
    panelPacker2.overlap = function(rect1, rect2) {
        return !(rect1.x + rect1.w - 1 < rect2.x || 
                rect1.x > rect2.x + rect2.w - 1 || 
                rect1.y + rect1.h - 1 < rect2.y || 
                rect1.y > rect2.y + rect2.h - 1)
    }
    
    return panelPacker2;
}());


