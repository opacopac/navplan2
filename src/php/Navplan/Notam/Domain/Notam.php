<?php declare(strict_types=1);

namespace Navplan\Notam\Domain;


class Notam {
    public $id;
    public $stateCode; // ISO 3-Letter code of the State
    public $stateName; // Name of the State
    public $notamId; // ID of the NOTAM
    public $entity; // First 2 letters of the Q-code, if available
    public $status; // Last 2 letters of the Q-code, if available
    public $qcode; // Q-code of the NOTAM, if available
    public $area; // Decoded category first 2 letters of the Q-code
    public $subarea; // Decoded area of first 2 letters of the Q-code
    public $condition; // Decoded sub-area of first 2 letters of the Q-code
    public $subject; // Decoded area of last 2 letters of the Q-code
    public $modifier; // Decoded sub-area of last 2 letters of the Q-code
    public $message; // Message part of the NOTAM, if available
    public $startdate; // Start datatime of the NOTAM
    public $enddate; // End datatime of the NOTAM, 100 years after startdate for permanent (PERM) notams
    public $all; // Full NOTAM
    public $location; // ICAO code of the location the NOTAM applies to
    public $isIcao; // If the NOTAM is compliant with Doc ABC. If false, no Q-code decoding is available
    public $created; // Dattime the NOTAM was created
    public $key; // Concatenation of ID and Location to form unique id for all NOTAMS
    public $type; // Location type, either airspace or airport
    public $geometry;

    public function __construct(
        int $id,
        string $stateCode,
        string $stateName,
        string $notamId,
        ?string $entity,
        ?string $status,
        ?string $qcode,
        ?string $area,
        ?string $subarea,
        ?string $condition,
        ?string $subject,
        ?string $modifier,
        ?string $message,
        string $startdate,
        string $enddate,
        string $all,
        string $location,
        bool $isIcao,
        string $created,
        string $key,
        string $type,
        ?NotamGeometry $geometry
    ) {
        $this->id = $id;
        $this->stateCode = $stateCode;
        $this->stateName = $stateName;
        $this->notamId = $notamId;
        $this->entity = $entity;
        $this->status = $status;
        $this->qcode = $qcode;
        $this->area = $area;
        $this->subarea = $subarea;
        $this->condition = $condition;
        $this->subject = $subject;
        $this->modifier = $modifier;
        $this->message = $message;
        $this->startdate = $startdate;
        $this->enddate = $enddate;
        $this->all = $all;
        $this->location = $location;
        $this->isIcao = $isIcao;
        $this->created = $created;
        $this->key = $key;
        $this->type = $type;
        $this->geometry = $geometry;
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
