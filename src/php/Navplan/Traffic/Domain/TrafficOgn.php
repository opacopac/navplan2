<?php declare(strict_types=1);

namespace Navplan\Traffic\Domain;


class TrafficOgn {
    public $acAddress;
    public $addressType;
    public $acType;
    public $icaoType;
    public $registration;
    public $callsign;
    public $opIcao;
    public $acModel;
    public $positionList;


    public function __construct(
        string $acAddress,
        int $addressType,
        int $acType,
        ?string $icaoType,
        ?string $registration,
        ?string $callsign,
        ?string $opIcao,
        ?string $acModel,
        array $positionList
    ) {
        $this->acAddress = $acAddress;
        $this->addressType = $addressType;
        $this->acType = $acType;
        $this->icaoType = $icaoType;
        $this->registration = $registration;
        $this->callsign = $callsign;
        $this->opIcao = $opIcao;
        $this->acModel = $acModel;
        $this->positionList = $positionList;
    }
}
