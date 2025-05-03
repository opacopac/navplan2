<?php declare(strict_types=1);

namespace Navplan\AerodromeChart\Rest\Converter;

use Navplan\AerodromeChart\Domain\Model\ChartRegistration;
use Navplan\AerodromeChart\Domain\Model\ChartRegistrationType;
use Navplan\AerodromeChart\Domain\Model\GeoCoordinateType;
use Navplan\Common\Rest\Converter\RestGeoCoordConverter;
use Navplan\Common\Rest\Converter\RestXyCoordConverter;
use Navplan\Common\StringNumberHelper;


class RestChartRegistrationConverter
{
    public static function fromRest(array $chartReg): ChartRegistration
    {
        return new ChartRegistration(
            ChartRegistrationType::from($chartReg["registrationType"]),
            GeoCoordinateType::from($chartReg["coordinateType"]),
            RestXyCoordConverter::fromRest($chartReg["pixelXy1"]),
            RestGeoCoordConverter::fromRest($chartReg["geoCoord1"]),
            RestXyCoordConverter::fromRest($chartReg["pixelXy2"]),
            RestGeoCoordConverter::fromRest($chartReg["geoCoord2"]),
            StringNumberHelper::parseIntOrDefault($chartReg, "scale", 0),
        );
    }


    public static function toRest(ChartRegistration $chartReg): array
    {
        return array(
            "registrationType" => $chartReg->registrationType->value,
            "geoCoordinateType" => $chartReg->coordinateType->value,
            "pixelXy1" => RestXyCoordConverter::toRest($chartReg->pixelXy1),
            "geoCoord1" => RestGeoCoordConverter::toRest($chartReg->geoCoord1),
            "pixelXy2" => RestXyCoordConverter::toRest($chartReg->pixelXy2),
            "geoCoord2" => RestGeoCoordConverter::toRest($chartReg->geoCoord2),
            "scale" => $chartReg->scale,
        );
    }
}
