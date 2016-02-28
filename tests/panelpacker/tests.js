QUnit.test( "pack test", function( assert ) {
    var result =  ;
    console.log(result);
    assert.ok(result.w == 1024);
    assert.ok(result.h == 640);
    assert.deepEqual(result, 
        {
          "blocks": [
            {
              "h": 640,
              "w": 640,
              "x": 0,
              "y": 0
            },
            {
              "h": 384,
              "w": 384,
              "x": 640,
              "y": 0
            }
          ],
          "h": 640,
          "w": 1024
        }
    );
});
