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
    public const TABLE_NAME = "openaip_airspace2";
    public const COL_ID = "id";
    public const COL_CLASS = "class";
    public const COL_TYPE = "type";
    public const COL_CATEGORY = "category";
    public const COL_COUNTRY = "country";
    public const COL_NAME = "name";
    public const COL_ALT_BOT_HEIGHT = "alt_bottom_height";
    public const COL_ALT_BOT_UNIT = "alt_bottom_unit";
    public const COL_ALT_BOT_REF = "alt_bottom_reference";
    public const COL_ALT_TOP_HEIGHT = "alt_top_height";
    public const COL_ALT_TOP_UNIT = "alt_top_unit";
    public const COL_ALT_TOP_REF = "alt_top_reference";
    public const COL_POLYGON = "polygon";
    public const COL_EXTENT = "extent";


    public static function fromDbResult(IDbResult $result): array {
        $airspaces = [];
        while ($row = $result->fetch_assoc()) {
            $airspaces[] = self::fromDbRow($row);
        }
        return $airspaces;
    }


    public static function fromDbRow(array $row): Airspace {
        return new Airspace(
            intval($row[self::COL_ID]),
            $row[self::COL_CLASS] ?? NULL, // TODO
            $row[self::COL_TYPE] ?? NULL, // TODO
            $row[self::COL_CATEGORY],
            $row[self::COL_COUNTRY],
            $row[self::COL_NAME],
            new Altitude(
                intval($row[self::COL_ALT_BOT_HEIGHT]),
                AltitudeUnit::from($row[self::COL_ALT_BOT_UNIT] === "F" ? "FT" : $row[self::COL_ALT_BOT_UNIT]),
                AltitudeReference::from($row[self::COL_ALT_BOT_REF])
            ),
            new Altitude(
                intval($row[self::COL_ALT_TOP_HEIGHT]),
                AltitudeUnit::from($row[self::COL_ALT_TOP_UNIT] === "F" ? "FT" : $row[self::COL_ALT_TOP_UNIT]),
                AltitudeReference::from($row[self::COL_ALT_TOP_REF])
            ),
            isset($row[self::COL_POLYGON]) ? Ring2d::createFromString($row[self::COL_POLYGON]) : NULL
        );
    }


    public static function prepareInsertStatement(IDbService $dbService): IDbStatement {
        $query = "INSERT INTO " . self::TABLE_NAME . " (" . join(", ", [
                self::COL_CLASS,
                self::COL_TYPE,
                self::COL_CATEGORY,
                self::COL_COUNTRY,
                self::COL_NAME,
                self::COL_ALT_BOT_HEIGHT,
                self::COL_ALT_BOT_UNIT,
                self::COL_ALT_BOT_REF,
                self::COL_ALT_TOP_HEIGHT,
                self::COL_ALT_TOP_UNIT,
                self::COL_ALT_TOP_REF,
                self::COL_POLYGON,
                self::COL_EXTENT,
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
