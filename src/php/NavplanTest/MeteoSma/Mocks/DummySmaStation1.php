<?php declare(strict_types=1);

namespace NavplanTest\MeteoSma\Mocks;

use Navplan\Common\DomainModel\Altitude;
use Navplan\Common\DomainModel\Position2d;
use Navplan\MeteoSma\DomainModel\SmaStation;


class DummySmaStation1 {
    public static function create(): SmaStation {
        return new SmaStation(
            "BER",
            "Bern / Zollikofen",
            new Position2d(7.46406, 46.99075),
            Altitude::fromMtAmsl(553)
        );
    }


    public static function createRest(): array {
        return array(
            "id" => "BER",
            "name" => "Bern / Zollikofen",
            "pos" => [7.46406, 46.99075],
            "alt" => [553, "M", "MSL"]
        );
    }


    public static function createDbResult(): array {
        return array(
            "station_id" => "BER",
            "station_name" => "Bern / Zollikofen",
            "station_lon" => 7.46406,
            "station_lat" => 46.99075,
            "station_alt_m" => 553
        );
    }


    public static function createImportJsonString(): string {
        return <<<EOT
{ "type":"Feature",
"geometry":{
"type":"Point",
"coordinates":[601934,204410]},
"id":"BER",
"properties":{
"station_name":"Bern / Zollikofen",
"station_symbol":1,
"altitude": "553",
"description":"<table><tbody><tr><td class='text-nowrap'><strong>Stationsname</strong></td><td>Bern / Zollikofen (BER)</td></tr><tr><td class='text-nowrap'><strong>Stationstyp</strong></td><td>Wetterstation</td></tr><tr><td class='text-nowrap'><strong>Daten seit</strong></td><td>1.1.1864</td></tr><tr><td class='text-nowrap'><strong>Eigentümer</strong></td><td>MeteoSchweiz</td></tr><tr><td class='text-nowrap'><strong>Stationshöhe</strong></td><td>553 m</td></tr><tr><td class='text-nowrap'><strong>Messungen</strong></td><td>Temperatur, Feuchte, Taupunkt, Niederschlag, Druck, Wind, Globalstrahlung, Sonnenschein, Schnee, Temperatur 5cm, Bodentemperatur, Strahlung langwellig</td></tr><tr><td class='text-nowrap'><strong>Link</strong></td><td><a target=\"_blank\" href=\"https://www.meteoschweiz.admin.ch/home/messwerte.html?param=messnetz-automatisch&station=BER\">Informationen zu dieser Station</a></td></tr></tbody></table>"}
}
EOT;
    }
}
