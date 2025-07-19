<?php declare(strict_types=1);

namespace Navplan\Airspace\Persistence\Command;

use Navplan\Airspace\Domain\Command\IAirspaceInsertAllCommand;
use Navplan\Airspace\Persistence\Model\DbTableAirspace;
use Navplan\System\Db\Domain\Service\IDbService;
use Navplan\System\Domain\Service\ILoggingService;
use Throwable;


class DbAirspaceInsertAllCommand implements IAirspaceInsertAllCommand {
    public function __construct(
        private IDbService $dbService,
        private ILoggingService $loggingService
    ) {
    }


    public function insertAll(array $airspaces): void {
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

        $statement = $this->dbService->prepareStatement($query);

        foreach ($airspaces as $airspace) {
            try {
                $polygon = $airspace->polygon->toString();
                $extent = "POLYGON((" . $polygon . "))";
                $class = $airspace->class->value;
                $type = $airspace->type->value;
                $bot_unit = $airspace->alt_bottom->unit->value;
                $bot_ref = $airspace->alt_bottom->reference->value;
                $top_unit = $airspace->alt_top->unit->value;
                $top_ref = $airspace->alt_top->reference->value;

                $statement->bind_param("sssssdssdssss",
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

                $statement->execute();
            } catch (Throwable $ex) {
                $this->loggingService->error("error inserting airspace '" . $airspace->name . "'");
                throw $ex;
            }
        }
    }
}
