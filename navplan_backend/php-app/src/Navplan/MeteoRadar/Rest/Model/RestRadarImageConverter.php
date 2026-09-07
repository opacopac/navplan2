<?php declare(strict_types=1);

namespace Navplan\MeteoRadar\Rest\Model;

use Navplan\Common\Rest\Converter\RestDateConverter;
use Navplan\Common\StringNumberHelper;
use Navplan\MeteoRadar\Domain\Model\RadarImage;


class RestRadarImageConverter
{
    const ARG_START_TIME = "starttime";
    const ARG_END_TIME = "endtime";
    const ARG_SUB_DIR_NAME = "subdirname";


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
            self::ARG_SUB_DIR_NAME => $radarImage->subDirName,
        );
    }


    public static function fromRest(array $args): RadarImage
    {
        return new RadarImage(
            RestDateConverter::fromRest(StringNumberHelper::parseStringOrError($args, self::ARG_START_TIME)),
            RestDateConverter::fromRest(StringNumberHelper::parseStringOrError($args, self::ARG_END_TIME)),
            StringNumberHelper::parseStringOrError($args, self::ARG_SUB_DIR_NAME)
        );
    }
}
