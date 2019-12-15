<?php declare(strict_types=1);

namespace NavplanTest\MeteoSma\Mocks;

use Navplan\Geometry\Domain\Altitude;
use Navplan\Geometry\Domain\AltitudeReference;
use Navplan\Geometry\Domain\AltitudeUnit;
use Navplan\Geometry\Domain\Position2d;
use Navplan\MeteoSma\Domain\SmaStation;


class DummySmaStation2 {
    public static function create(): SmaStation {
        return new SmaStation(
            "BEZ",
            "Beznau",
            new Position2d(8.23331, 47.55725),
            new Altitude(326, AltitudeUnit::M, AltitudeReference::MSL)
        );
    }


    public static function createRest(): array {
        return array(
            "id" => "BEZ",
            "name" => "Beznau",
            "pos" => [8.23331, 47.55725],
            "alt" => [326, "M", "MSL"]
        );
    }


    public static function createDbResult(): array {
        return array(
            "station_id" => "BEZ",
            "station_name" => "Beznau",
            "station_lon" => 8.23331,
            "station_lat" => 47.55725,
            "station_alt_m" => 326
        );
    }


    public static function createImportJsonString(): string
    {
        return <<<EOT
{ "type":"Feature",
"geometry":{
"type":"Point",
"coordinates":[659812,267696]},
"id":"BEZ",
"properties":{
"station_name":"Beznau",
"station_symbol":1,
"altitude": "326",
"description":"<table><tbody><tr><td class='text-nowrap'><strong>Stationsname</strong></td><td>Beznau (BEZ)</td></tr><tr><td class='text-nowrap'><strong>Stationstyp</strong></td><td>Wetterstation</td></tr><tr><td class='text-nowrap'><strong>Daten seit</strong></td><td>1.1.1981</td></tr><tr><td class='text-nowrap'><strong>Eigentümer</strong></td><td>MeteoSchweiz</td></tr><tr><td class='text-nowrap'><strong>Stationshöhe</strong></td><td>326 m</td></tr><tr><td class='text-nowrap'><strong>Messungen</strong></td><td>Temperatur, Feuchte, Taupunkt, Niederschlag, Druck, Wind, Globalstrahlung, Sonnenschein, Temperatur 5cm</td></tr><tr><td class='text-nowrap'><strong>Link</strong></td><td><a target=\"_blank\" href=\"https://www.meteoschweiz.admin.ch/home/messwerte.html?param=messnetz-automatisch&station=BEZ\">Informationen zu dieser Station</a></td></tr></tbody></table>"}
}
EOT;
    }
}
