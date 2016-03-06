/*global QUnit, ivobos_panelPacker2 */

QUnit.test("panelpacker 2 pack test", function (assert) {
    "use strict";
    var test_devices = [
        { w: 1920, h: 1080, device: "Nexus 5", rotate: true },
        { w: 1440, h: 2560, device: "Nexus 6P", rotate: true },
        { w: 2880, h: 1800, device: "MacBook Pro Retina 15-inch", rotate: false }
    ];
    var layout = [ { w: 4, h: 4, id: 0}, { w: 2, h: 2, id: 1}, { w: 2, h: 2, id: 2}];
    // loop over all test devices
    for (var dev_idx = 0; dev_idx < test_devices.length; dev_idx++) {
        var test_device = test_devices[dev_idx];
        // test both non-rotate and rotated orientation
        for (var rotate = 0; rotate < 2; rotate++) {
            if (rotate && !test_device.rotate) {
                continue; // this device doesn't support rotation, so don't test it
            }
            var container = { x: 0, y: 0};
            if (rotate) {
                container.w = test_device.h;
                container.h = test_device.w;
            } else {
                container.w = test_device.w;
                container.h = test_device.h;
            }
            console.log("container:");
            console.log(container);
            // now test packing
            var result = ivobos_panelPacker2.pack(container, layout);
            console.log("packed result");
            console.log(result[0]);
            console.log(result[1]);
            console.log(result[2]);
            // all items must be present
            assert.equal(result.length, layout.length);
            // all items must be in screen container
            for (var i = 0; i < result.length; i++) {
                assert.ok(container.x <= result[i].x, "packed block is left of screen container");
                assert.ok(container.x + container.w >= result[i].x + result[i].w, "packed block is right of screen container");
                assert.ok(container.y <= result[i].y, "packed block is above top of screen container");
                assert.ok(container.y + container.h >= result[i].y + result[i].h, "packed block is below bottom of screen container");
            }
            // items must not overlap
            for (var i = 0; i < result.length; i++) {
                for (var j = 0; j < result.length; j++) {
                    if (j != i) {
                        assert.ok(!ivobos_panelPacker2.overlap(result[i], result[j]), "rectangles must not overlap " + JSON.stringify(result[i]) + " and " + JSON.stringify(result[j]));
                    }
                }
            }
            // packing ratio must be above 50%
            var block_area = 0;
            for (var i = 0; i < result.length; i++) {
                block_area += result[i].w * result[i].h;
            }
            var efficiency = block_area / (container.w * container.h);
            console.log("packing efficiency: " + efficiency);
            assert.ok(efficiency > 0.84, "not packed tight enough");
        }
    }

});


//QUnit.test( "pack test", function( assert ) {
//    var result = ivobos_panelPacker.pack(444, 766, [{w:4, h:4},{w:4, h:2},{w:2, h:4}]);
//    var result = "Fdsfd";
//    console.log(result);
//    assert.deepEqual(result,
//        {
//          "blocks": [
//            {
//              "h": 296,
//              "w": 296,
//              "x": 0,
//              "y": 0
//            },
//            {
//              "h": 148,
//              "w": 296,
//              "x": 0,
//              "y": 296
//            },
//            {
//              "h": 296,
//              "w": 148,
//              "x": 296,
//              "y": 0
//            }
//          ],
//          "h": 444,
//          "w": 444
//        }
//    );
//});
//
//QUnit.test( "expand to fit test - max out width", function( assert ) {
//    var result = ivobos_panelPacker.expandToFit({w: 6, h: 6}, {w:2, h:1});
//    assert.deepEqual(result, { w: 6, h: 3});
//});
//
//QUnit.test( "expand to fit test - max out width", function( assert ) {
//    var result = ivobos_panelPacker.expandToFit({w: 6, h: 6}, {w:2, h:3});
//    assert.deepEqual(result, { w:4, h:6 }); 
//});
//
//QUnit.test( "expand to fit test - perfect fit", function( assert ) {
//    var result = ivobos_panelPacker.expandToFit({w: 6, h: 6}, {w:2, h:2});
//    assert.deepEqual(result, { w:6, h:6 }); 
//});
//
//QUnit.test( "test split node", function( assert ) {
//    var testData = [
//        { node: { x: 0, y: 0, w: 6, h : 4}, block: { w: 5, h: 1}},
//        { node: { x: 0, y: 0, w: 6, h : 4}, block: { w: 1, h: 5}}
//    ];
//    for (var i = 0; i < testData.length; i++) {
//        var node = testData[i].node;
//        var block = testData[i].block;
//        result = ivobos_panelPacker.splitNode(node, block.w, block.h, false);
//        assert.ok(result.used);
//        assert.ok(result.x == node.x);
//        assert.ok(result.y == node.y);
//        assert.ok(result.w == block.w);
//        assert.ok(result.h == block.h);
//        // check area of components is same as area of original node
//        assert.ok(result.w * result.h + result.down.w * result.down.h + result.right.w * result.right.h == node.w * node.h);
//    }
//});

