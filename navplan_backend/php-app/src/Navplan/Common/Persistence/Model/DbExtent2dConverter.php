<?php declare(strict_types=1);

namespace Navplan\Common\Persistence\Model;

use Navplan\Common\Domain\Model\Extent2d;
use Navplan\Common\StringNumberHelper;


class DbExtent2dConverter {
    public static function toWktPolygon(Extent2d $extent, bool $wrapFromText = true): string {
        return DbRing2dConverter::toWktPolygon($extent->toRing2d(), $wrapFromText);
    }


    public static function fromDbRow(
        array $row,
        string $minlonColName = 'minlon',
        string $minlatColName = 'minlat',
        string $maxlonColName = 'maxlon',
        string $maxlatColName = 'maxlat'
    ): ?Extent2d {
        if (StringNumberHelper::isNullOrEmpty($row, $minlonColName)
            || StringNumberHelper::isNullOrEmpty($row, $minlatColName)
            || StringNumberHelper::isNullOrEmpty($row, $maxlonColName)
            || StringNumberHelper::isNullOrEmpty($row, $maxlatColName)
        ) {
            return null;
        }

        return new Extent2d(
            DbPosition2dConverter::fromDbRow($row, $minlonColName, $minlatColName),
            DbPosition2dConverter::fromDbRow($row, $maxlonColName, $maxlatColName),
        );
    }
}
