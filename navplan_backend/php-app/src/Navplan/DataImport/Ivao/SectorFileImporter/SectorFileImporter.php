<?php declare(strict_types=1);

namespace Navplan\Ivao\SectorFileImporter;

use Navplan\AerodromeCircuit\Domain\Model\AirportCircuit;
use Navplan\AerodromeCircuit\Domain\Service\IAirportCircuitService;
use Navplan\Common\Domain\Model\Line2d;
use Navplan\Common\Domain\Model\Position2d;
use Navplan\Common\GeoHelper;
use Navplan\System\Domain\Service\ILoggingService;


class SectorFileImporter {
    private const COMMENT_CHAR = ";";
    private const ALLOWED_SECTIONS = ["SID", "STAR"];
    private const ALLOWED_SUBSECTIONS = ["VFR"];
    private const FILTER_COMMENT_WORDS = ["label", "sector"];
    private const SECTION_REGEXP = "/^\\[([A-Z ]+)\\]$/"; // e.g. [SID]
    private const SUBSECTION_REGEXP = "/^([A-Z]+) ([A-Z]{4})\s?(.*?)\s{2,}/"; // e.g. VFR LSZB ARR
    private const COMMENT_REXEXP = "/^;(.*)$/"; // e.g. ;LSZB ROUTE S ARR
    private const DMS_REGEXP_PART = "(\\d{3})\\.(\\d{2})\\.(\\d{2}\\.\\d{3})";
    private const LAT_REGEXP_PART = "([NS])" . self::DMS_REGEXP_PART; // e.g. N045.29.20.300
    private const LON_REGEXP_PART = "([EW])" . self::DMS_REGEXP_PART; // e.g. E005.26.20.600
    private const LAT_LON_REGEXP_PART = self::LAT_REGEXP_PART . " " . self::LON_REGEXP_PART; // e.g. N045.29.20.300 E005.26.20.600
    private const TWO_LAT_LON_REGEXP = "/" . self::LAT_LON_REGEXP_PART . " " . self::LAT_LON_REGEXP_PART . "/";
    private string $currentSection = "";
    private string $currentSubSection = "";
    private string $currentAirport = "";
    private ?string $currentAppendix = "";
    private ?string $currentComment = "";
    private array $currentCoordinateList = [];
    private array $currentLine2dList = [];


    public function __construct(
        private IAirportCircuitService $circuitService,
        private ILoggingService        $logger
    ) {
    }


    public function import(string $importFile) {
        $file = fopen($importFile, "r");

        while (!feof($file)) {
            $line = fgets($file);
            if ($line === false) {
                break;
            }

            $newSection = $this->checkSectionStart($line);
            if ($newSection !== null) {
                $this->saveCurrentObject();
                $this->currentSection = $newSection;
            };

            if ($this->isInAllowedSection()) {
                $newSubSection = $this->checkSubSectionStart($line);
                if ($newSubSection !== null) {
                    $this->saveCurrentObject();
                    $this->currentSubSection = $newSubSection[0];
                    $this->currentAirport = $newSubSection[1];
                    $this->currentAppendix = $newSubSection[2];
                }

                $newComment = $this->checkComment($line);
                if ($newComment !== null) {
                    $this->saveCurrentObject();
                    $this->currentComment = $newComment;
                };

                $this->checkCoordinates($line);
            }
        }

        fclose($file);
    }


    private function stripComment(string $line): string {
        $pos = strpos($line, self::COMMENT_CHAR);
        if ($pos !== false) {
            return trim(substr($line, 0, $pos));
        } else {
            return trim($line);
        }
    }


    private function isInAllowedSection(): bool {
        return in_array($this->currentSection, self::ALLOWED_SECTIONS);
    }


    private function isInAllowedSubSection(): bool {
        return in_array($this->currentSubSection, self::ALLOWED_SUBSECTIONS);
    }


    private function checkSectionStart(string $line): ?string {
         if (preg_match(self::SECTION_REGEXP, trim($line), $matches)) {
             return $matches[1];
         } else {
             return null;
         }
    }


    private function checkSubSectionStart(string $line): ?array {
        if (preg_match(self::SUBSECTION_REGEXP, trim($line), $matches)) {
            return [$matches[1], $matches[2], $matches[3]];
        } else {
            return null;
        }
    }


    private function checkComment(string $line): ?string {
        if (preg_match(self::COMMENT_REXEXP, trim($line), $matches)) {
            return $matches[1];
        } else {
            return null;
        }
    }


    private function checkCoordinates(string $line): bool {
        // N046.46.45.900 E010.15.32.400 N046.46.33.873 E010.15.45.188
        if (preg_match(self::TWO_LAT_LON_REGEXP, $line, $matches)) {
            $this->appendCoordinates(
                new Position2d(
                    GeoHelper::getDecFromDms($matches[5], intval($matches[6]), intval($matches[7]), floatval($matches[8])),
                    GeoHelper::getDecFromDms($matches[1], intval($matches[2]), intval($matches[3]), floatval($matches[4]))
                ),
                new Position2d(
                    GeoHelper::getDecFromDms($matches[13], intval($matches[14]), intval($matches[15]), floatval($matches[16])),
                    GeoHelper::getDecFromDms($matches[9], intval($matches[10]), intval($matches[11]), floatval($matches[12]))
                )
            );
            return true;
        } else {
            return false;
        }
    }


    private function appendCoordinates(Position2d $pos1, Position2d $pos2) {
        if (count($this->currentCoordinateList) === 0) { // first coordinates in line
            array_push($this->currentCoordinateList, $pos1);
            array_push($this->currentCoordinateList, $pos2);
        } else if ($pos1->equals(end($this->currentCoordinateList))) { // add second coordinate to same line
            array_push($this->currentCoordinateList, $pos2);
        } else { // start a new line
            array_push($this->currentLine2dList, new Line2d($this->currentCoordinateList));
            $this->currentCoordinateList = [$pos1, $pos2];
        }
    }


    private function saveCurrentObject() {
        if (count($this->currentCoordinateList) > 0) {
            array_push($this->currentLine2dList, new Line2d($this->currentCoordinateList));
            $this->currentCoordinateList = [];
        }

        if ($this->isInAllowedSection() && $this->isInAllowedSubSection() && count($this->currentLine2dList) > 0) {
            $circuit = new AirportCircuit(
                $this->currentAirport,
                $this->currentSection,
                $this->currentAppendix,
                $this->currentComment,
                $this->currentLine2dList
            );

            if ($this->shouldBeSaved($circuit)) {
                //$this->circuitRepo->writeCircuit($circuit);
                $circ = $this->circuitService->getCircuitsByIcao("LSZB");
                var_dump($circ);
                die;
            }
        }

        $this->currentLine2dList = [];
    }


    private function shouldBeSaved(AirportCircuit $circuit): bool {
        foreach (self::FILTER_COMMENT_WORDS as $filterWord) {
            if (str_contains(strtolower($circuit->comment), $filterWord)) {
                return false;
            }
        }

        return true;
    }
}
