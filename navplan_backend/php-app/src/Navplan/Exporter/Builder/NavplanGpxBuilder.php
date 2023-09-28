<?php declare(strict_types=1);


namespace Navplan\Exporter\Builder;

use Navplan\Flightroute\Domain\Model\Flightroute;
use Navplan\Flightroute\Domain\Model\Waypoint;
use Navplan\Track\Domain\Model\Track;


class NavplanGpxBuilder {
    private string $xml;


    public function __construct() {
    }


    public function buildGpx(?Flightroute $flightroute, ?Track $track): string {
        $this->xml = "";
        $this->createHeader();
        $this->createRoute($flightroute);
        $this->createTrack($track);
        $this->createFooter();

        return $this->xml;
    }


    private function createHeader(): void {
        $this->xml .= '' .
            '<?xml version="1.0" encoding="UTF-8" standalone="no" ?>' . "\n" .
            '<gpx creator="www.navplan.ch" version="1.1" xmlns="http://www.topografix.com/GPX/1/1" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.topografix.com/GPX/1/1 http://www.topografix.com/GPX/1/1/gpx.xsd">' . "\n" .
            '  <metadata>' . "\n" .
            '  </metadata>' . "\n";
    }


    private function createRoute(?Flightroute $flightroute): void {
        $waypoints = $flightroute ? $flightroute->getWaypointsInclAlternate() : [];

        if ($waypoints && count($waypoints) > 0) {
            // waypoints
            for ($i = 0; $i < count($waypoints); $i++) {
                $this->xml .= '' .
                    '  <wpt lat="' . $waypoints[$i]->position->latitude . '" lon="' . $waypoints[$i]->position->longitude . '">' . "\n" .
                    '    <name>' . $waypoints[$i]->checkpoint . '</name>' . "\n" .
                    '    <type>' . $this->getWpType($waypoints[$i]) . '</type>' . "\n" .
                    '  </wpt>' . "\n";
            }

            // route
            $this->xml .= '' .
                '  <rte>' . "\n" .
                '    <name>' . $flightroute->title . '</name>' . "\n";

            for ($i = 0; $i < count($waypoints); $i++) {
                $this->xml .= '    <rtept lat="' . $waypoints[$i]->position->latitude . '" lon="' . $waypoints[$i]->position->longitude . '">' . "\n";
                $this->xml .= '      <name>' . $waypoints[$i]->checkpoint . '</name>' . "\n";
                $this->xml .= '      <type>' . $this->getWpType($waypoints[$i]) . '</type>' . "\n";
                $this->xml .= '    </rtept>' . "\n";
            }

            $this->xml .= '  </rte>' . "\n";
        }
    }


    private function createTrack(?Track $track): void {
        $trackpoints = $track ? $track->positionList : [];

        if ($trackpoints && count($trackpoints) > 0) {
            $this->xml .= '' .
                '  <trk>' . "\n" .
                '    <name>' . $track->name . '</name>' . "\n" .
                '    <trkseg>' . "\n";

            for ($i = 0; $i < count($trackpoints); $i++) {
                $unixTimeStamp = floor($trackpoints[$i]->timestamp->toS());
                $this->xml .= '' .
                    '    <trkpt lat="' . $trackpoints[$i]->latitude . '" lon="' . $trackpoints[$i]->longitude . '">' .
                    '<ele>' . $trackpoints[$i]->altitude->getHeightAmsl()->getM() . '</ele>' .
                    '<time>' . getIsoTimeString($unixTimeStamp) . '</time>' .
                    '</trkpt>' . "\n";
            }

            $this->xml .= '' .
                '    </trkseg>' . "\n" .
                '  </trk>' . "\n";
        }
    }


    private function createFooter(): void {
        $this->xml .= '' .
            '</gpx>';
    }


    private function getWpType(Waypoint $waypoint): string {
        return match ($waypoint->type) {
            'airport' => "Airport",
            'report' => "Fix",
            'navaid' => "TODO", // $waypoint["navaid"]["type"],
            default => "Waypoint",
        };
    }
}
