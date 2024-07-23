<?php declare(strict_types=1);

namespace Navplan\Aircraft\Rest\Converter;

use Navplan\Aircraft\Domain\Model\Aircraft;


class RestAircraftResponse
{
    public function __construct(public ?Aircraft $aircraft)
    {
    }


    public function toRest(): array
    {
        return array(
            "aircraft" => $this->aircraft ? RestAircraftConverter::toRest($this->aircraft) : NULL
        );
    }
}
