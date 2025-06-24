<?php declare(strict_types=1);

namespace Navplan\AerodromeChart\Rest\Converter;

use Navplan\AerodromeChart\Domain\Model\AirportChart;
use Navplan\Common\Rest\Converter\RestExtent2dConverter;


class RestAirportChartConverter
{
    public static function fromRest(array $args, string $adIcao): AirportChart
    {
        return new AirportChart(
            intval($args["id"]),
            null, // userId from token is used
            $adIcao,
            $args["source"],
            $args["name"],
            $args["filename"],
            RestExtent2dConverter::fromArgs($args["extent"]),
            RestOriginalFileParametersConverter::fromRest($args["originalFileParameters"]),
            RestChartRegistrationConverter::fromRest($args["chartRegistration"])
        );
    }


    public static function toRest(AirportChart $adChart): array
    {
        return array(
            "id" => $adChart->id,
            "userId" => $adChart->userId,
            "source" => $adChart->source,
            "name" => $adChart->name,
            "filename" => $adChart->filename,
            "extent" => RestExtent2dConverter::toRest($adChart->extent),
            "originalFileParameters" => RestOriginalFileParametersConverter::toRest($adChart->originalFileParameters),
            "chartRegistration" => RestChartRegistrationConverter::toRest($adChart->chartRegistration),
        );
    }


    public static function toRestList(array $adChartList): array
    {
        return array_map(
            function ($adChart) {
                return self::toRest($adChart);
            },
            $adChartList
        );
    }
}
