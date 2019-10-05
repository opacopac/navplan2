<?php declare(strict_types=1);

namespace Navplan\MeteoGrib2\Grib2Parser\Section3;

use Navplan\MeteoGrib2\Domain\Section3\NumberOfPoints;
use Navplan\MeteoGrib2\Domain\Section3\GridDefinitionSection;


class Section3Parser {
    public static function parse(string $data): GridDefinitionSection {
        $byteArray = unpack("C1b/N1c/C1d/C1e/n1f/a*g", $data);

        return new GridDefinitionSection(
            GridDefinitionSourceParser::parse($byteArray["b"]),
            $byteArray["c"],
            new NumberOfPoints(
                $byteArray["d"],
                NumberOfPointsInterpretationParser::parse($byteArray["e"]),
                []
            ),
            GridDefinitionTemplateParser::parse($byteArray["f"], $byteArray["g"])
        );
    }
}
