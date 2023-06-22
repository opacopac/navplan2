<?php declare(strict_types=1);

namespace Navplan\Notam\Domain\Model;


class Notam {
    public function __construct(
        public int $id,
        public string $stateCode, // ISO 3-Letter code of the State
        public string $stateName, // Name of the State
        public string $notamId, // ID of the NOTAM
        public ?string $entity, // First 2 letters of the Q-code, if available
        public ?string $status, // Last 2 letters of the Q-code, if available
        public ?string $qcode, // Q-code of the NOTAM, if available
        public ?string $area, // Decoded category first 2 letters of the Q-code
        public ?string $subarea, // Decoded area of first 2 letters of the Q-code
        public ?string $condition, // Decoded sub-area of first 2 letters of the Q-code
        public ?string $subject, // Decoded area of last 2 letters of the Q-code
        public ?string $modifier, // Decoded sub-area of last 2 letters of the Q-code
        public ?string $message, // Message part of the NOTAM, if available
        public string $startdate, // Start datatime of the NOTAM
        public string $enddate, // End datatime of the NOTAM, 100 years after startdate for permanent (PERM) notams
        public string $all, // Full NOTAM
        public string $location, // ICAO code of the location the NOTAM applies to
        public bool $isIcao, // If the NOTAM is compliant with Doc ABC. If false, no Q-code decoding is available
        public string $created, // Dattime the NOTAM was created
        public string $key, // Concatenation of ID and Location to form unique id for all NOTAMS
        public string $type, // Location type, either airspace or airport
        public ?NotamGeometry $geometry
    ) {
    }


    public function isAreaNotam(): bool {
        if ($this->isIcao) {
            $qtype = strtoupper(substr($this->qcode, 0, 1));

            if ($qtype == "W" || $qtype == "R") { // || $qtype == "X")
                return true;
            }
        } else {
            if ($this->type == "airspace")
                return true;
        }

        return false;
    }
}
