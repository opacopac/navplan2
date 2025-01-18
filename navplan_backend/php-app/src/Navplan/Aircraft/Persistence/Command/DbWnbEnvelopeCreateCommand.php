<?php declare(strict_types=1);

namespace Navplan\Aircraft\Persistence\Command;

use Navplan\Aircraft\Domain\Command\IWnbEnvelopeCreateCommand;
use Navplan\Aircraft\Domain\Model\WnbEnvelope;
use Navplan\Aircraft\Persistence\Model\DbTableAircraftWnbEnvelopes;
use Navplan\Aircraft\Persistence\Query\DbWnbEnvelopeConverter;
use Navplan\System\Domain\Service\IDbService;
use Navplan\System\MySqlDb\DbHelper;


class DbWnbEnvelopeCreateCommand implements IWnbEnvelopeCreateCommand
{
    public function __construct(
        private IDbService $dbService
    )
    {
    }


    public function create(int $aircraftId, array $wnbEnvelopes): void
    {
        foreach ($wnbEnvelopes as $wnbEnvelope) {
            $query = $this->createSingleEntrySqlQuery($aircraftId, $wnbEnvelope);
            $this->dbService->execCUDQuery($query, "error inserting wnb envelope");
        }
    }


    private function createSingleEntrySqlQuery(int $aircraftId, WnbEnvelope $wnbEnvelope): string
    {
        $query = "INSERT INTO " . DbTableAircraftWnbEnvelopes::TABLE_NAME . " (" . join(",", [
                DbTableAircraftWnbEnvelopes::COL_ID_AIRCRAFT,
                DbTableAircraftWnbEnvelopes::COL_NAME,
                DbTableAircraftWnbEnvelopes::COL_AXIS_TYPE,
                DbTableAircraftWnbEnvelopes::COL_LON_ENVELOPE,
                DbTableAircraftWnbEnvelopes::COL_LAT_ENVELOPE,
                DbTableAircraftWnbEnvelopes::COL_ARM_UNIT,
                DbTableAircraftWnbEnvelopes::COL_WEIGHT_UNIT
            ]);
        $query .= ") VALUES (";
        $query .= join(",", array(
            DbHelper::getDbIntValue($aircraftId),
            DbHelper::getDbStringValue($this->dbService, $wnbEnvelope->name),
            DbHelper::getDbStringValue($this->dbService, $wnbEnvelope->axisType->value),
            DbWnbEnvelopeConverter::lonEnvtoDbString($this->dbService, $wnbEnvelope->lonCoordinates),
            DbWnbEnvelopeConverter::latEnvtoDbString($this->dbService, $wnbEnvelope->latCoordinates),
            DbHelper::getDbStringValue($this->dbService, $wnbEnvelope->lonCoordinates[0]->armCg->unit->value),
            DbHelper::getDbStringValue($this->dbService, $wnbEnvelope->lonCoordinates[0]->weight->unit->value),
        ));
        $query .= ")";

        return $query;
    }
}
