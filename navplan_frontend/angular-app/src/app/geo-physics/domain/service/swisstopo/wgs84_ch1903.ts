// Original source: https://github.com/ValentinMinder/Swisstopo-WGS84-LV03/blob/master/scripts/js/wgs84_ch1903.js
// Changes:
//  - renamed to .ts
//  - added "export const Swisstopo" to make it a module
//  - added type annotations (number, [number, number])
//  - replaces all 'var' with 'const' or 'let'
//  - replace ParseInt in "DECtoSEX" with Math.floor

// The MIT License (MIT)
//
// Copyright (c) 2014 Federal Office of Topography swisstopo, Wabern, CH
// Copyright (c) 2016 Sacha Bron https://github.com/BinaryBrain
// Copyright (c) 2016 Basile Vu https://github.com/Flagoul
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
//	of this software and associated documentation files (the "Software"), to deal
//	in the Software without restriction, including without limitation the rights
//	to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
//	copies of the Software, and to permit persons to whom the Software is
//	furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
//	all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
//	IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
//	FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
//	AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
//	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
//	OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
//	THE SOFTWARE.
//

// Source: http://www.swisstopo.admin.ch/internet/swisstopo/en/home/topics/survey/sys/refsys/projections.html (see PDFs under "Documentation")
// Updated 9 dec 2014
// Please validate your results with NAVREF on-line service: http://www.swisstopo.admin.ch/internet/swisstopo/en/home/apps/calc/navref.html (difference ~ 1-2m)

export const Swisstopo = {
    WGStoCH: function (lat: number, lng: number): [number, number] {
        return [
            this.WGStoCHy(lat, lng),
            this.WGStoCHx(lat, lng)
        ];
    },

    // Convert WGS lat/lng (� dec) to CH x
    WGStoCHx: function (lat: number, lng: number): number {

        // Convert decimal degrees to sexagesimal seconds
        lat = this.DECtoSEX(lat);
        lng = this.DECtoSEX(lng);

        // Auxiliary values (% Bern)
        const lat_aux = (lat - 169028.66) / 10000;
        const lng_aux = (lng - 26782.5) / 10000;

        // Process X
        const x = 200147.07 +
            308807.95 * lat_aux +
            3745.25 * Math.pow(lng_aux, 2) +
            76.63 * Math.pow(lat_aux, 2) -
            194.56 * Math.pow(lng_aux, 2) * lat_aux +
            119.79 * Math.pow(lat_aux, 3);

        return x;
    },

    // Convert WGS lat/lng (� dec) to CH y
    WGStoCHy: function (lat: number, lng: number): number {
        // Convert decimal degrees to sexagesimal seconds
        lat = this.DECtoSEX(lat);
        lng = this.DECtoSEX(lng);

        // Auxiliary values (% Bern)
        const lat_aux = (lat - 169028.66) / 10000;
        const lng_aux = (lng - 26782.5) / 10000;

        // Process Y
        const y = 600072.37 +
            211455.93 * lng_aux -
            10938.51 * lng_aux * lat_aux -
            0.36 * lng_aux * Math.pow(lat_aux, 2) -
            44.54 * Math.pow(lng_aux, 3);

        return y;
    },

    CHtoWGS: function (y: number, x: number): [number, number] {
        return [
            this.CHtoWGSlng(y, x),
            this.CHtoWGSlat(y, x)
        ];
    },

    // Convert CH y/x to WGS lat
    CHtoWGSlat: function (y: number, x: number): number {
        // Converts military to civil and to unit = 1000km
        // Auxiliary values (% Bern)
        const y_aux = (y - 600000) / 1000000;
        const x_aux = (x - 200000) / 1000000;

        // Process lat
        let lat = 16.9023892 +
            3.238272 * x_aux -
            0.270978 * Math.pow(y_aux, 2) -
            0.002528 * Math.pow(x_aux, 2) -
            0.0447 * Math.pow(y_aux, 2) * x_aux -
            0.0140 * Math.pow(x_aux, 3);

        // Unit 10000" to 1 " and converts seconds to degrees (dec)
        lat = lat * 100 / 36;

        return lat;
    },

    // Convert CH y/x to WGS lng
    CHtoWGSlng: function (y: number, x: number): number {
        // Converts military to civil and	to unit = 1000km
        // Auxiliary values (% Bern)
        const y_aux = (y - 600000) / 1000000;
        const x_aux = (x - 200000) / 1000000;

        // Process lng
        let lng = 2.6779094 +
            4.728982 * y_aux +
            0.791484 * y_aux * x_aux +
            0.1306 * y_aux * Math.pow(x_aux, 2) -
            0.0436 * Math.pow(y_aux, 3);

        // Unit 10000" to 1 " and converts seconds to degrees (dec)
        lng = lng * 100 / 36;

        return lng;
    },

    // Convert angle in decimal degrees to sexagesimal seconds
    DECtoSEX: function (angle: number): number {

        // Extract DMS
        const deg = Math.floor(angle);
        const min = Math.floor((angle - deg) * 60);
        const sec = (((angle - deg) * 60) - min) * 60;

        // Result sexagesimal seconds
        return sec + min * 60.0 + deg * 3600.0;
    }
};
