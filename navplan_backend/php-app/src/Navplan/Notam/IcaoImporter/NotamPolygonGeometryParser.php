<?php declare(strict_types=1);

namespace Navplan\Notam\IcaoImporter;

use Navplan\Common\Domain\Model\Ring2d;
use Navplan\System\Domain\Service\ILoggingService;


class NotamPolygonGeometryParser implements INotamPolygonGeometryParser
{
    public function __construct(
        private readonly ILoggingService $logger,
        private readonly NotamCoordinateParser $coordinateParser
    )
    {
    }


    // detect polygon in notam text: 463447N0062121E, 341640N0992240W, 1st: without coordinates in brackets, 2nd: including coordinates in brackets
    // e.g. ... 472401N0083320E 472315N0082918E 471935N0083439E 472103N0083855E 472119N0083657E 472137N0083602E 472215N0083450E (CENTER POINT 472209N0083406E RADIUS 3.5 NM) ...
    public function tryParsePolygon(string $text): ?Ring2d
    {
        $regExp = "/" . NotamCoordinateParser::REGEXP_PART_COORDPAIR . "/im";

        // try without text in brackets
        $textNoBrackets = $this->getNonBracketText($text);
        $this->logger->debug("text: " . $text);
        $this->logger->debug("non bracket text: " . $textNoBrackets);

        $result = preg_match_all($regExp, $textNoBrackets, $matches, PREG_SET_ORDER);

        if ($result && count($matches) >= 3) {
            return $this->getRingFromPolygonMatches($matches);
        }

        // try with text in brackets
        $result = preg_match_all($regExp, $text, $matches, PREG_SET_ORDER);
        if ($result && count($matches) >= 3) {
            return $this->getRingFromPolygonMatches($matches);
        }

        // no match
        return null;
    }


    private function getRingFromPolygonMatches(array $matches): Ring2d
    {
        $posList = [];
        foreach ($matches as $match) {
            $posList[] = $this->coordinateParser->getLonLatFromGradMinSecStrings($match[1], $match[2], $match[3], $match[4], $match[5], $match[6], $match[7], $match[8]);
        }

        return new Ring2d($posList);
    }


    private function getNonBracketText(string $text): string
    {
        $pattern = "/\(.+?\)/ims";
        return preg_replace($pattern, "", $text);
    }
}
