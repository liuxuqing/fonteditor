/**
 * @file 寻找关键点
 * @author mengke01(kekee000@gmail.com)
 */

define(
    function (require) {

        var fitContour = require('graphics/image/contour/fitContour');
        var data = require('demo/../data/image-contours2');
        var drawPath = require('render/util/drawPath');
        var pathUtil = require('graphics/pathUtil');

        var entry = {

            /**
             * 初始化
             */
            init: function () {

                var html = '';
                var contours = [];
                data.forEach(function(contour) {

                    contour.splice(contour.length - 1, 1);

                    contour.forEach(function (p) {
                        html += '<i style="left:'+p.x+'px;top:'+p.y+'px;"></i>';
                    });

                    data = pathUtil.scale(data, 10);
                    contours.push(fitContour(contour));
                    data = pathUtil.scale(data, 0.1);
                });


                $('#points').html(html);

                html = '';

                var ctx = $('#canvas').get(0).getContext('2d');
                ctx.strokeStyle = 'pink';

                contours.forEach(function (contour) {
                    for (var i = 0, l = contour.length; i < l; i++) {
                        html += '<i style="left:'+contour[i].x+'px;top:'+contour[i].y+'px;" class="break"></i>';
                    }
                    drawPath(ctx, contour);
                });

                ctx.stroke();
                $('#points-break').html(html);
            }
        };

        entry.init();

        return entry;
    }
);
