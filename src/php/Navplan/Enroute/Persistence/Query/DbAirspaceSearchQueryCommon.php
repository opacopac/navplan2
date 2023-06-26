<?php declare(strict_types=1);

namespace Navplan\Enroute\Persistence\Query;

use Navplan\Common\DomainModel\Altitude;
use Navplan\Common\DomainModel\AltitudeReference;
use Navplan\Common\DomainModel\AltitudeUnit;
use Navplan\Common\DomainModel\Ring2d;
use Navplan\Enroute\Domain\Model\Airspace;
use Navplan\Enroute\Persistence\Model\DbTableAirspace;
use Navplan\System\Domain\Model\IDbResult;


class DbAirspaceSearchQueryCommon {
    public const MAX_BOTTOM_ALT_FL = 200;
    public const MIN_PIXEL_AIRSPACE_DIAMETER = 50;  // TODO
    public const MIN_PIXEL_COORDINATE_RESOLUTION = 2;  // TODO


    public static function getSelectClauseCommonPart(): string {
        $query  = "SELECT";
        $query .= "  air." . DbTableAirspace::COL_ID . ",";
        $query .= "  air." . DbTableAirspace::COL_CATEGORY . ",";
        $query .= "  air." . DbTableAirspace::COL_COUNTRY . ",";
        $query .= "  air." . DbTableAirspace::COL_NAME . ",";
        $query .= "  air." . DbTableAirspace::COL_ALT_TOP_REF . ",";
        $query .= "  air." . DbTableAirspace::COL_ALT_TOP_HEIGHT . ",";
        $query .= "  air." . DbTableAirspace::COL_ALT_TOP_UNIT . ",";
        $query .= "  air." . DbTableAirspace::COL_ALT_BOT_REF . ",";
        $query .= "  air." . DbTableAirspace::COL_ALT_BOT_HEIGHT . ",";
        $query .= "  air." . DbTableAirspace::COL_ALT_BOT_UNIT . ",";

        return $query;
    }


    public static function fromDbResult(IDbResult $result): array {
        $airspaces = [];
        while ($row = $result->fetch_assoc()) {
            $airspaces[] = self::fromDbRow($row);
        }
        return $airspaces;
    }


    public static function fromDbRow(array $row): Airspace {
        return new Airspace(
            intval($row[DbTableAirspace::COL_ID]),
            $row[DbTableAirspace::COL_CLASS] ?? NULL, // TODO
            $row[DbTableAirspace::COL_TYPE] ?? NULL, // TODO
            $row[DbTableAirspace::COL_CATEGORY],
            $row[DbTableAirspace::COL_COUNTRY],
            $row[DbTableAirspace::COL_NAME],
            new Altitude(
                intval($row[DbTableAirspace::COL_ALT_BOT_HEIGHT]),
                AltitudeUnit::from($row[DbTableAirspace::COL_ALT_BOT_UNIT] === "F" ? "FT" : $row[DbTableAirspace::COL_ALT_BOT_UNIT]),
                AltitudeReference::from($row[DbTableAirspace::COL_ALT_BOT_REF])
            ),
            new Altitude(
                intval($row[DbTableAirspace::COL_ALT_TOP_HEIGHT]),
                AltitudeUnit::from($row[DbTableAirspace::COL_ALT_TOP_UNIT] === "F" ? "FT" : $row[DbTableAirspace::COL_ALT_TOP_UNIT]),
                AltitudeReference::from($row[DbTableAirspace::COL_ALT_TOP_REF])
            ),
            isset($row[DbTableAirspace::COL_POLYGON]) ? Ring2d::createFromString($row[DbTableAirspace::COL_POLYGON]) : NULL
        );
    }
}
