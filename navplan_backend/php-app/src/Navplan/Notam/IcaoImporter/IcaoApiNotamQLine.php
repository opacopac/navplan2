<?php declare(strict_types=1);

namespace Navplan\Notam\IcaoImporter;


use Navplan\Common\Domain\Model\Altitude;
use Navplan\Common\Domain\Model\Circle2d;
use Navplan\Common\Domain\Model\Length;
use Navplan\Common\Domain\Model\Position2d;
use Navplan\Common\GeoHelper;

class IcaoApiNotamQLine
{
    public const string Q_LINE_PREFIX = "Q) ";
    private const string Q_LINE_SEPARATOR = "/";
    private const int EXPECTED_PARTS_COUNT = 8;

    public function __construct(
        public string $firCode,
        public string $notamCode,
        public string $traffic,
        public string $purpose,
        public string $scope,
        public Altitude $lowerLimit,
        public Altitude $upperLimit,
        public Position2d $coordinates,
        public Length $radius,
    )
    {
    }


    // format: LFEE/QWULW/IV/BO /W /000/020/4729N00725E005
    public static function tryParse(string $qLineText): ?IcaoApiNotamQLine {
        $parts = explode(self::Q_LINE_SEPARATOR, $qLineText);

        if (count($parts) !== self::EXPECTED_PARTS_COUNT) {
            return null;
        }

        return new IcaoApiNotamQLine(
            trim($parts[0]),
            trim($parts[1]),
            trim($parts[2]),
            trim($parts[3]),
            trim($parts[4]),
            self::parseAltitude($parts[5]),
            self::parseAltitude($parts[6]),
            self::parseCoordinates($parts[7]),
            self::parseRadius($parts[7])
        );
    }


    public function getCircle(): Circle2d {
        return new Circle2d($this->coordinates, $this->radius);
    }


    private static function parseAltitude(string $altText): Altitude {
        $altFl = intval($altText);

        return Altitude::fromFl($altFl);
    }


    // Format 4729N00725E005
    private static function parseCoordinates(string $coordRadiusTextPart): Position2d {
        $latText = substr($coordRadiusTextPart, 0, 5);
        $lonText = substr($coordRadiusTextPart, 5, 6);

        $latSign = substr($latText, -1);
        $latDeg = intval(substr($latText, 0, 2));
        $latMin = intval(substr($latText, 2, 2));

        $lonSign = substr($lonText, -1);
        $lonDeg = intval(substr($lonText, 0, 3));
        $lonMin = intval(substr($lonText, 3, 2));

        $lat = GeoHelper::getDecFromDms($latSign, $latDeg, $latMin, 0);
        $lon = GeoHelper::getDecFromDms($lonSign, $lonDeg, $lonMin, 0);

        return Position2d::fromLonLat($lon, $lat);
    }


    private static function parseRadius(string $coordRadiusTextPart): Length {
        $radiusText = substr($coordRadiusTextPart, -3);
        $radiusNm = intval($radiusText);

        return Length::fromNm($radiusNm);
    }
}
