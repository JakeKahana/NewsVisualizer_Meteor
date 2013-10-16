

Meteor.startup(function () {
    // 1. do this on render of the template instead of onload
    // 2. calculate the values you want to use from the actual data (pulled from the Words collection)
    // 2a. frequencies
    // 2b. labels
    // 3. then call dotchart with that data
    var r = Raphael("holder"),
        xs = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23],
        ys = [7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7],
        data = [294, 300, 204, 255, 348, 383, 334, 217, 114, 33, 44, 26, 41, 39, 52, 17, 13, 2, 0, 2, 5, 6, 64, 153],
        axisy = ["Our Word", " ", " ", " ", " ", " ", " ", " "],
        axisx = ["1991", "1992", "1993", "1994", "1995", "1996", "1997", "1998", "1999", "2000", "2001", "2002", "2003", "2004", "2005", "2006", "2007", "2008", "2009", "2010", "2011", "2012", "2013"];
    r.dotchart(10, 10, 620, 260, xs, ys, data, {symbol: "o", max: 10, heat: true, axis: "0 0 1 1", axisxstep: 23, axisystep: 6, axisxlabels: axisx, axisxtype: " ", axisytype: " ", axisylabels: axisy}).hover(function () {
        this.marker = this.marker || r.tag(this.x, this.y, this.value, 0, this.r + 2).insertBefore(this);
        this.marker.show();
        r.g.txtattr.fill = "#fff";

    }, function () {
        this.marker && this.marker.hide();
    });
});