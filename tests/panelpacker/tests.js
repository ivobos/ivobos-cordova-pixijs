QUnit.test( "pack test", function( assert ) {
    var result = ivobos_panelPacker.pack(1.5, [{w:5, h:5},{w:3, h:3}]);
    console.log(result);
    assert.ok(result.w == 8);
    assert.ok(result.h == 5);
});
