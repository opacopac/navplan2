<?php declare(strict_types=1);


namespace Navplan\Exporter\Builder;

use Navplan\Common\DateTimeHelper;
use Navplan\Flightroute\Domain\Model\Flightroute;
use Navplan\Flightroute\Domain\Model\Waypoint;


class NavplanFplBuilder {
    private string $xml;


    public function __construct() {
    }


    public function buildFpl(?Flightroute $flightroute): string {
        $this->xml = "";
        $this->createHeader();
        $this->createRoute($flightroute);
        $this->createFooter();

        return $this->xml;
    }


    private function createHeader(): void {
        $this->xml = '' .
            '<?xml version="1.0" encoding="UTF-8" standalone="no" ?>' . "\n" .
            '<flight-plan xmlns="http://www8.garmin.com/xmlschemas/FlightPlan/v1">' . "\n" .
            '<created>' . DateTimeHelper::getIsoTimeString() . '</created>' . "\n"; //  Format: 20170402T15:31:54Z
    }


    private function createRoute(?Flightroute $flightroute): void {
        $waypoints = $flightroute ? $flightroute->getWaypointsInclAlternate() : [];

        if ($waypoints && count($waypoints) > 0) {
            // waypoints
            $this->xml .= '' .
                '  <waypoint-table>' . "\n" .
                '    <flight-plan-index>1</flight-plan-index>' . "\n"; // TODO: nötig?

            for ($i = 0; $i < count($waypoints); $i++) {
                $this->xml .= '' .
                    '    <waypoint>' . "\n" .
                    '      <identifier>' . $this->getNormalizedName($waypoints[$i]->checkpoint) . '</identifier>' . "\n" .
                    '      <type>' . $this->getWpType($waypoints[$i]) . '</type>' . "\n" .
                    '      <lat>' . $waypoints[$i]->position->latitude . '</lat>' . "\n" .
                    '      <lon>' . $waypoints[$i]->position->longitude . '</lon>' . "\n" .
                    '    </waypoint>' . "\n";
            }

            $this->xml .= '  </waypoint-table>' . "\n";

            // route
            $this->xml .= '' .
                '  <route>' . "\n" .
                '    <route-name>' . $flightroute->title . '</route-name>' . "\n" .
                '    <flight-plan-index>1</flight-plan-index>' . "\n"; // TODO: nötig?

            for ($i = 0; $i < count($waypoints); $i++)
            {
                $this->xml .= '' .
                    '    <route-point lat="' . $waypoints[$i]->position->latitude . '" lon="' . $waypoints[$i]->position->longitude . '">' . "\n" .
                    '      <waypoint-identifier>' . $this->getNormalizedName($waypoints[$i]->checkpoint) . '</waypoint-identifier>' . "\n" .
                    '      <waypoint-type>' . $this->getWpType($waypoints[$i]) . '</waypoint-type>' . "\n" .
                    '    </route-point>' . "\n";
            }

            $this->xml .= '  </route>' . "\n";
        }
    }


    private function createFooter(): void {
        $this->xml .= '' .
            '</flight-plan>';
    }


    private function getWpType(Waypoint $waypoint): string {
        return match ($waypoint->type) {
            'airport' => "AIRPORT",
            'navaid' => "VOR", /*match ($waypoint["navaid"]["type"]) { // TODO
                'VOR-DME', 'DVOR-DME', 'VOR', 'DVOR', 'TACAN', 'VORTAC', 'DVORTAC' => "VOR",
                'NDB' => "NDB",
                default => "",
            },*/
            default => "",
        };
    }


    private function getNormalizedName(string $wpName): string {
        // only upper case
        $normName = mb_strtoupper($wpName, 'UTF-8');

        // no spaces
        $normName = str_replace(" ", "_", $normName);

        // min 3 letters
        while (strlen($normName) < 3) {
            $normName .= "_";
        }

        return $normName;
    }
}
