<?php declare(strict_types=1);

namespace Navplan\Traffic\Domain;


class TrafficAdsbex {
    public $address;
    public $icaoType;
    public $registration;
    public $callsign;
    public $opIcao;
    public $positionList;


    public function __construct(
        TrafficAddress $address,
        ?string $icaoType,
        ?string $registration,
        ?string $callsign,
        ?string $opIcao,
        array $positionList
    ) {
        $this->address = $address;
        $this->icaoType = $icaoType;
        $this->registration = $registration;
        $this->callsign = $callsign;
        $this->opIcao = $opIcao;
        $this->positionList = $positionList;
    }
}
