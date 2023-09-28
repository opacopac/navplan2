<?php declare(strict_types=1);

namespace NavplanTest\MeteoSma\Mocks;


class DummySmaStationList1 {
    public static function create(): array {
        return [
            DummySmaStation1::create(),
            DummySmaStation2::create()
        ];
    }


    public static function createImportJsonString(): string {
        $importString = <<<EOT
{
"crs": {
"type":"name",
"properties":{
"name":"EPSG:21781"}
},
"license": "https://www.meteoschweiz.admin.ch/content/dam/meteoswiss/de/service-und-publikationen/produkt/doc/agbgrundangebot.pdf",
"mapname": "ch.meteoschweiz.messnetz-automatisch",
"map_long_name": "Automatische meteorologische Bodenmessstationen",
"map_short_name": "Automatische Wetterstationen",
"map_abstract": "SwissMetNet, das automatische Messnetz von MeteoSchweiz, zählt 160 automatische Messstationen. Diese Stationen liefern alle zehn Minuten eine Vielzahl an aktuellen Daten zu Wetter und Klima in der Schweiz. Rund 140 automatische Niederschlagsstationen ergänzen das Messnetz. Zusammen bilden diese 300 automatische Bodenmessstationen die Basis, um zuverlässige lokale Wetterprognosen und Unwetter- und Hochwasserwarnungen zu erstellen.",
"creation_time": "15.12.2019 04:30",
"type":"FeatureCollection",
"features":[
EOT;
        $importString .= DummySmaStation1::createImportJsonString() . ',';
        $importString .= DummySmaStation2::createImportJsonString();
        $importString .= "]}";

        return $importString;
    }
}
