/**
 * @file range.js
 * @author mengke01
 * @date
 * @description
 * 切割模式
 */


define(
    function (require) {

        var mode = {

            down: function (e) {
                if (1 === e.which) {
                    this.coverLayer.clearShapes();
                    this.splitLine = this.coverLayer.addShape({
                        type: 'line',
                        p0: {
                            x: e.x,
                            y: e.y
                        },
                        p1: {
                            x: e.x,
                            y: e.y
                        }
                    });
                }
            },


            move: function (e) {
                if (1 === e.which) {
                    if (this.splitLine) {
                        this.splitLine.p1.x = e.x;
                        this.splitLine.p1.y = e.y;
                        this.coverLayer.refresh();
                    }
                }
            },


            up: function (e) {
                if (1 === e.which) {
                    if (this.splitLine) {
                        var p0 = this.splitLine.p0;
                        var p1 = this.splitLine.p1;
                        // 对shape进行多选
                        if (Math.abs(p0.x - p1.x) >= 20 || Math.abs(p0.y - p1.y) >= 20) {
                            if (false !== this.execCommand('splitshapes', p0, p1)) {
                                return;
                            }
                        }
                    }

                    this.setMode();
                }
            },

            begin: function () {
            },

            end: function () {
                delete this.splitLine;
                this.coverLayer.clearShapes();
                this.coverLayer.refresh();
            }
        };

        return mode;
    }
);
