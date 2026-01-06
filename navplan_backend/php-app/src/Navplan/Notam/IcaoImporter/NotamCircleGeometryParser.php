<?php declare(strict_types=1);

namespace Navplan\Notam\IcaoImporter;

use Navplan\Common\Domain\Model\Circle2d;
use Navplan\Common\Domain\Model\Length;
use Navplan\System\Domain\Service\ILoggingService;


class NotamCircleGeometryParser implements INotamCircleGeometryParser
{
    private const string REGEXP_PART_RADIUS = '(RADIUS|AROUND|CENTERED)';
    private const string REGEXP_PART_RADVAL = '(\d+[\.\,]?\d*)\s?(NM|KM|M)(?=\W)';
    private const string REGEXP_PART_NOBRACKETS_NUMS = '[^\(\)0-9]+?';


    public function __construct(
        private readonly ILoggingService $logger,
        private readonly NotamCoordinateParser $coordinateParser
    )
    {
    }


    // detect circle in notam text: 462340N0070230E RADIUS 3.0 NM
    public function tryParseCircleFromMessageVariant1(string $message): ?Circle2d
    {
        $regExp = "/" . NotamCoordinateParser::REGEXP_PART_COORDPAIR . self::REGEXP_PART_NOBRACKETS_NUMS . self::REGEXP_PART_RADIUS . self::REGEXP_PART_NOBRACKETS_NUMS . self::REGEXP_PART_RADVAL . "/im";
        $result = preg_match($regExp, $message, $matches);

        if ($result) {
            $center = $this->coordinateParser->getLonLatFromGradMinSecStrings($matches[1], $matches[2], $matches[3], $matches[4], $matches[5], $matches[6], $matches[7], $matches[8]);
            $radius = $this->getRadiusFromStrings($matches[10], $matches[11]);
            $circle = new Circle2d($center, $radius);

            $this->logger->debug("circle geometry v1 in message found: " . $circle->toString());

            return $circle;
        }

        // no match
        return null;
    }


    // detect circle in notam text: 3NM RADIUS OF 522140N 0023246W
    public function tryParseCircleFromMessageVariant2(string $message): ?Circle2d
    {
        $regExp = "/" . self::REGEXP_PART_RADVAL . self::REGEXP_PART_NOBRACKETS_NUMS . self::REGEXP_PART_RADIUS . self::REGEXP_PART_NOBRACKETS_NUMS . NotamCoordinateParser::REGEXP_PART_COORDPAIR . "/im";
        $result = preg_match($regExp, $message, $matches);

        if ($result) {
            $center = $this->coordinateParser->getLonLatFromGradMinSecStrings($matches[4], $matches[5], $matches[6], $matches[7], $matches[8], $matches[9], $matches[10], $matches[11]);
            $radius = $this->getRadiusFromStrings($matches[1], $matches[2]);
            $circle = new Circle2d($center, $radius);

            $this->logger->debug("circle geometry v2 in message found: " . $circle->toString());

            return $circle;
        }

        // no match
        return null;
    }


    // detect circle in notam text: RADIUS 2NM CENTERED ON 473814N 0101548E
    public function tryParseCircleFromMessageVariant3(string $message): ?Circle2d
    {
        $regExp = "/" . self::REGEXP_PART_RADIUS . self::REGEXP_PART_NOBRACKETS_NUMS . self::REGEXP_PART_RADVAL . self::REGEXP_PART_NOBRACKETS_NUMS . NotamCoordinateParser::REGEXP_PART_COORDPAIR . "/im";
        $result = preg_match($regExp, $message, $matches);

        if ($result) {
            $center = $this->coordinateParser->getLonLatFromGradMinSecStrings($matches[4], $matches[5], $matches[6], $matches[7], $matches[8], $matches[9], $matches[10], $matches[11]);
            $radius = $this->getRadiusFromStrings($matches[2], $matches[3]);
            $circle = new Circle2d($center, $radius);

            $this->logger->debug("circle geometry v3 in message found: " . $circle->toString());

            return $circle;
        }

        // no match
        return null;
    }


    private function getRadiusFromStrings(string $valueStr, string $unitStr): ?Length
    {
        $value = floatval(str_replace(",", ".", $valueStr));

        switch (trim(strtoupper($unitStr))) {
            case "NM" :
                return Length::fromNm($value);
            case "KM" :
                return Length::fromKm($value);
            case "M" :
                return Length::fromM($value);
            default :
                return null;
        }
    }
}
