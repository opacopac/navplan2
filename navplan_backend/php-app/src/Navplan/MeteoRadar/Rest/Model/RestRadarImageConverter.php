<?php declare(strict_types=1);

namespace Navplan\MeteoRadar\Rest\Model;

use Navplan\Common\Rest\Converter\RestDateConverter;
use Navplan\MeteoRadar\Domain\Model\RadarImage;


class RestRadarImageConverter
{
    const ARG_START_TIME = "starttime";
    const ARG_END_TIME = "endtime";


    /**
     * @param RadarImage[] $radarImages
     * @return array
     */
    public static function toRestList(array $radarImages): array
    {
        return array_map(
            function ($radarImage) {
                return self::toRest($radarImage);
            },
            $radarImages
        );
    }


    public static function toRest(RadarImage $radarImage): array
    {
        return array(
            self::ARG_START_TIME => RestDateConverter::toRest($radarImage->startTime),
            self::ARG_END_TIME => RestDateConverter::toRest($radarImage->endTime),
        );
    }


    public static function fromRest(string $args): RadarImage
    {
        return new RadarImage(
            RestDateConverter::fromRest($args),
            RestDateConverter::fromRest($args)
        );
    }
}
