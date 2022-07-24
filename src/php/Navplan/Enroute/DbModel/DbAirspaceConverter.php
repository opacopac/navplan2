<?php declare(strict_types=1);

namespace Navplan\Enroute\DbModel;

use Navplan\Common\DomainModel\Altitude;
use Navplan\Common\DomainModel\AltitudeReference;
use Navplan\Common\DomainModel\AltitudeUnit;
use Navplan\Common\DomainModel\Ring2d;
use Navplan\Enroute\DomainModel\Airspace;
use Navplan\System\DomainModel\IDbResult;
use Navplan\System\DomainModel\IDbStatement;
use Navplan\System\DomainService\IDbService;


class DbAirspaceConverter {
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


    public static function prepareInsertStatement(IDbService $dbService): IDbStatement {
        $query = "INSERT INTO " . DbTableAirspace::TABLE_NAME . " (" . join(", ", [
                DbTableAirspace::COL_CLASS,
                DbTableAirspace::COL_TYPE,
                DbTableAirspace::COL_CATEGORY,
                DbTableAirspace::COL_COUNTRY,
                DbTableAirspace::COL_NAME,
                DbTableAirspace::COL_ALT_BOT_HEIGHT,
                DbTableAirspace::COL_ALT_BOT_UNIT,
                DbTableAirspace::COL_ALT_BOT_REF,
                DbTableAirspace::COL_ALT_TOP_HEIGHT,
                DbTableAirspace::COL_ALT_TOP_UNIT,
                DbTableAirspace::COL_ALT_TOP_REF,
                DbTableAirspace::COL_POLYGON,
                DbTableAirspace::COL_EXTENT,
            ]) . ") VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ST_GeomFromText(?))";

        return $dbService->prepareStatement($query);
    }


    public static function bindInsertStatement(Airspace $airspace, IDbStatement $insertStatement) {
        $polygon = $airspace->polygon->toString();
        $extent = "POLYGON((" . $polygon . "))";
        $class = $airspace->class->value;
        $type = $airspace->type->value;
        $bot_unit = $airspace->alt_bottom->unit->value;
        $bot_ref = $airspace->alt_bottom->reference->value;
        $top_unit = $airspace->alt_top->unit->value;
        $top_ref = $airspace->alt_top->reference->value;

        $insertStatement->bind_param("sssssdssdssss",
            $class,
            $type,
            $airspace->category,
            $airspace->country,
            $airspace->name,
            $airspace->alt_bottom->value,
            $bot_unit,
            $bot_ref,
            $airspace->alt_top->value,
            $top_unit,
            $top_ref,
            $polygon,
            $extent
        );
    }
}
