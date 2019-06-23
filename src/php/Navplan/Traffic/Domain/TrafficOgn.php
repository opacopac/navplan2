<?php declare(strict_types=1);

namespace Navplan\Traffic\Domain;


class TrafficOgn {
    public $address;
    public $acType;
    public $positionList;


    public function __construct(
        TrafficAddress $address,
        int $acType,
        array $positionList
    ) {
        $this->address = $address;
        $this->acType = $acType;
        $this->positionList = $positionList;
    }
}
