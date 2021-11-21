<?php declare(strict_types=1);


namespace Navplan\Exporter\Builder;

use Navplan\Flightroute\Domain\Flightroute;
use Navplan\Track\DomainModel\Track;


class NavplanKmlBuilder {
    const ROUTE_ALT_FT = 1000;

    private string $xml;


    public function __construct() {
    }


    public function buildKml(?Flightroute $flightroute, ?Track $track): string {
        $this->xml = "";
        $this->createHeader($flightroute, $track);
        $this->createRoute($flightroute);
        $this->createTrack($track);
        $this->createFooter();

        return $this->xml;
    }


    private function createHeader(?Flightroute $flightroute, ?Track $track): void {
        $title = $flightroute ? $flightroute->title : ($track ? $track->name : "");

        $this->xml .= '' .
            '<?xml version="1.0" encoding="UTF-8"?>' . "\n" .
            '<kml xmlns="http://www.opengis.net/kml/2.2" xmlns:gx="http://www.google.com/kml/ext/2.2" xmlns:kml="http://www.opengis.net/kml/2.2" xmlns:atom="http://www.w3.org/2005/Atom">' . "\n" .
            '	<Document>' . "\n" .
            '		<name>' . $title . '</name>' . "\n" .
            '		<Style id="wp_track_style">' . "\n" .
            '			<LineStyle>' . "\n" .
            '				<color>ffff00ff</color>' . "\n" .
            '				<width>3</width>' . "\n" .
            '			</LineStyle>' . "\n" .
            '			<PolyStyle>' . "\n" .
            '				<color>4cff00ff</color>' . "\n" .
            '			</PolyStyle>' . "\n" .
            '		</Style>' . "\n" .
            '		<Style id="flight_track_style">' . "\n" .
            '			<LineStyle>' . "\n" .
            '				<color>ffff0000</color>' . "\n" .
            '				<width>2</width>' . "\n" .
            '			</LineStyle>' . "\n" .
            '			<PolyStyle>' . "\n" .
            '				<color>4cff00ff</color>' . "\n" .
            '			</PolyStyle>' . "\n" .
            '		</Style>' . "\n";
    }


    private function createRoute(?Flightroute $flightroute): void {
        $waypoints = $flightroute ? $flightroute->getWaypointsInclAlternate() : [];

        if ($waypoints && count($waypoints) > 0) {
            $this->xml .= '' .
                '		<Placemark>' . "\n" .
                '			<name>Waypoints</name>' . "\n" .
                '			<styleUrl>#wp_track_style</styleUrl>' . "\n" .
                '			<LineString>' . "\n" .
                '				<extrude>1</extrude>' . "\n" .
                '				<tessellate>1</tessellate>' . "\n" .
                '				<altitudeMode>relativeToGround</altitudeMode>' . "\n" .
                '				<coordinates>' . "\n";

            for ($i = 0; $i < count($waypoints); $i++) {
                $this->xml .= $waypoints[$i]->position->longitude . ","
                    . $waypoints[$i]->position->latitude . ","
                    . self::ROUTE_ALT_FT . " \n";
            }

            $this->xml .= '' .
                '				</coordinates>' . "\n" .
                '			</LineString>' . "\n" .
                '		</Placemark>' . "\n";
        }
    }


    private function createTrack(?Track $track): void {
        $trackpoints = $track ? $track->positionList : [];

        if ($trackpoints && count($trackpoints) > 0) {
            $this->xml .= '' .
                '		<Placemark>' . "\n" .
                '			<name>Flight Track</name>' . "\n" .
                '			<styleUrl>#flight_track_style</styleUrl>' . "\n" .
                '			<LineString>' . "\n" .
                '				<extrude>1</extrude>' . "\n" .
                '				<tessellate>1</tessellate>' . "\n" .
                '				<altitudeMode>absolute</altitudeMode>' . "\n" .
                '				<coordinates>' . "\n";

            for ($i = 0; $i < count($trackpoints); $i++) {
                $this->xml .= $trackpoints[$i]->longitude . ","
                    . $trackpoints[$i]->latitude . ","
                    . $trackpoints[$i]->altitude->getHeightAmsl()->getM() . " \n";
            }

            $this->xml .= '' .
                '				</coordinates>' . "\n" .
                '			</LineString>' . "\n" .
                '		</Placemark>' . "\n";
        }
    }


    private function createFooter(): void {
        $this->xml .= '' .
            '	</Document>' . "\n" .
            '</kml>';
    }
}
