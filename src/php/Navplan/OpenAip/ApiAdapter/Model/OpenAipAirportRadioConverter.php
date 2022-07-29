<?php declare(strict_types=1);

namespace Navplan\OpenAip\ApiAdapter\Model;

use Navplan\Aerodrome\Domain\Model\AirportRadio;


class OpenAipAirportRadioConverter {
    public static function fromRest(array $restRadio): AirportRadio {
        $type = OpenAipAirportRadioTypeConverter::fromRest($restRadio["type"]);
        $category = AirportRadio::getCategoryString($type);
        $frequency = OpenAipFrequencyConverter::fromRest($restRadio);

        return new AirportRadio(
            $category,
            $frequency,
            $type,
            $restRadio["name"] ?? null,
            boolval($restRadio["primary"])
        );
    }


    /**
     * @param array $restRadios
     * @return AirportRadio[]
     */
    public static function fromRestList(array $restRadios): array {
        return array_map(function ($restRadio) { return self::fromRest($restRadio); }, $restRadios);
    }
}
