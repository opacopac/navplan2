<?php declare(strict_types=1);

namespace Navplan\Aircraft\Rest\Converter;

use Navplan\Aircraft\Domain\Model\AircraftTypeDesignator;


class RestSearchAircraftTypeDesignatorResponse
{
    /**
     * @param AircraftTypeDesignator[] $acTypeDesignators
     */
    public function __construct(public array $acTypeDesignators)
    {
    }


    public function toRest(): array
    {
        return array("acTypeDesignators" => RestAircraftTypeDesignatorConverter::toRestList($this->acTypeDesignators));
    }
}
