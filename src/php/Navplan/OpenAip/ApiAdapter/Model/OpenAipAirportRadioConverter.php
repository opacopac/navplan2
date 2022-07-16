<?php declare(strict_types=1);

namespace Navplan\OpenAip\ApiAdapter\Model;

use Navplan\Aerodrome\DomainModel\AirportRadio;
use Navplan\Enroute\DomainModel\Navaid;


class OpenAipAirportRadioConverter {
    public static function fromRest(array $restRadio): AirportRadio {
        $type = OpenAipAirportRadioTypeConverter::fromRest($restRadio["type"]);
        $category = AirportRadio::getCategoryString($type);
        $frequency = OpenAipFrequencyConverter::fromRest($restRadio);

        return new AirportRadio(
            $category,
            $frequency,
            $type,
            $restRadio["name"],
            boolval($restRadio["primary"])
        );
    }


    /**
     * @param array $restNavaids
     * @return Navaid[]
     */
    public static function fromRestList(array $restNavaids): array {
        return array_map(function ($restNavaid) { return self::fromRest($restNavaid); }, $restNavaids);
    }
}
