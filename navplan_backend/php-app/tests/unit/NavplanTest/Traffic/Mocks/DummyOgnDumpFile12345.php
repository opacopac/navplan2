<?php declare(strict_types=1);

namespace NavplanTest\Traffic\Mocks;


class DummyOgnDumpFile12345 {
    public static function getDate(): int {
        return strtotime("2019-06-09");
    }

    public static function createDumpFileLine1(): string {
        return '{"id":"4B05D7","addresstype":"ICAO","actype":"POWERED_AIRCRAFT","time":"10:16:18","latitude":47.06271666666667,"longitude":8.303566666666667,"altitude":792.794440380395,"receiver":"Rigi"}' . "\n";
    }


    public static function createDumpFileLine2(): string {
        return '{"id":"4B1A91","addresstype":"ICAO","actype":"TOW_PLANE","time":"10:16:18","latitude":47.17738333333333,"longitude":7.730933333333334,"altitude":548.951475249939,"receiver":"LSPL"}' . "\n";
    }


    public static function createDumpFileLine3(): string {
        return '{"id":"4B2928","addresstype":"ICAO","actype":"POWERED_AIRCRAFT","time":"10:16:19","latitude":46.92731666666667,"longitude":7.47375,"altitude":1230.7973664959766,"receiver":"Guemligen"}' . "\n";
    }


    public static function createDumpFileLine4(): string {
        return '{"id":"4B2928","addresstype":"ICAO","actype":"POWERED_AIRCRAFT","time":"10:16:19","latitude":46.9273,"longitude":7.47375,"altitude":1228.663740551085,"receiver":"LSTBSE"}' . "\n";
    }


    public static function createDumpFileLine5(): string {
        return '{"id":"4B05D7","addresstype":"ICAO","actype":"POWERED_AIRCRAFT","time":"10:16:20","latitude":47.0623,"longitude":8.3049,"altitude":790.6608144355035,"receiver":"Rigi"}' . "\n";
    }
}
