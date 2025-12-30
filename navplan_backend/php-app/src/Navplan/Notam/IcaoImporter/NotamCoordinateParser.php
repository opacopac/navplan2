<?php declare(strict_types=1);

namespace Navplan\Notam\IcaoImporter;


use Navplan\Common\Domain\Model\Position2d;
use Navplan\Common\GeoHelper;

class NotamCoordinateParser
{
    public const string REGEXP_PART_COORDPAIR = '(\d{2})\D?(\d{2})\D?(\d{2}|\d{2}\.\d+)\D?(N|S)\s?(\d{2,3})\D?(\d{2})\D?(\d{2}|\d{2}\.\d+)\D?(E|W)';


    public static function getLonLatFromGradMinSecStrings(
        string $latGrad,
        string $latMin,
        string $latSec,
        string $latDir,
        string $lonGrad,
        string $lonMin,
        string $lonSec,
        string $lonDir
    ): Position2d
    {
        return new Position2d(
            GeoHelper::getDecFromDms($lonDir, intval($lonGrad), intval($lonMin), floatval($lonSec)),
            GeoHelper::getDecFromDms($latDir, intval($latGrad), intval($latMin), floatval($latSec))
        );
    }


    // TODO
    public static function normalizeCoordinates($text)
    {
        // switzerland, holland, sweden, finland, russia, turkey, greece, egypt, saudi arabia:
        // 465214N0090638E

        // germany, france, england, ukraine, iran, irak
        // 462600N 0022630E, 483441N 101110E

        // uae
        // 255002.25N 0535024.74E

        // oman
        // 1850.85N05217.50E (= 185085N 0521750E)

        // austria:
        // N475145.00 E0141828.00

        // brasil:
        // 033617N/0502606W or 335928S/0514745W

        //const REGEXP_PART_COORDPAIR = '(\d{2})\D?(\d{2})\D?(\d{2}|\d{2}\.\d+)\D?(N|S)\s?(\d{2,3})\D?(\d{2})\D?(\d{2}|\d{2}\.\d+)\D?(E|W)';
        //TODO
    }
}
