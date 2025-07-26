<?php declare(strict_types=1);

namespace Navplan\Aerodrome\Persistence\Model;

use Navplan\Aerodrome\Domain\Model\AirportRunway;
use Navplan\Aerodrome\Domain\Model\AirportRunwayOperations;
use Navplan\Aerodrome\Domain\Model\AirportRunwayType;
use Navplan\Common\Domain\Model\Length;
use Navplan\System\Db\Domain\Model\DbEntityConverter;
use Navplan\System\Db\Domain\Model\IDbStatement;
use Navplan\System\Db\Domain\Service\IDbService;


/**
 * @extends DbEntityConverter<AirportRunway>
 */
class DbAirportRunwayConverter extends DbEntityConverter
{
    public function __construct(private readonly DbTableAirportRunway $table)
    {
    }

    public function fromDbRow(array $row): AirportRunway
    {
        $r = new DbRowAirportRunway($this->table, $row);

        return new AirportRunway(
            $r->getName(),
            AirportRunwayType::from($r->getSurface()),
            Length::fromM($r->getLength()),
            Length::fromM($r->getWidth()),
            $r->getDirection(),
            Length::fromM($r->getTora()),
            Length::fromM($r->getLda()),
            $r->getPapi(),
            AirportRunwayOperations::from($r->getOperations()),
        );
    }


    public static function prepareInsertStatement(IDbService $dbService): IDbStatement
    {
        $query = "INSERT INTO " . DbTableAirportRunway::TABLE_NAME . " (" . join(", ", [
                DbTableAirportRunway::COL_AIRPORT_ID,
                DbTableAirportRunway::COL_NAME,
                DbTableAirportRunway::COL_SURFACE,
                DbTableAirportRunway::COL_LENGTH,
                DbTableAirportRunway::COL_WIDTH,
                DbTableAirportRunway::COL_DIRECTION,
                DbTableAirportRunway::COL_TORA,
                DbTableAirportRunway::COL_LDA,
                DbTableAirportRunway::COL_PAPI,
                DbTableAirportRunway::COL_OPERATIONS,
            ]) . ") VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

        return $dbService->prepareStatement($query);
    }


    public static function bindInsertStatement(AirportRunway $rwy, int $airport_id, IDbStatement $insertStatement)
    {
        $surface = $rwy->surface->value;
        $length = $rwy->length->getM();
        $width = $rwy->width->getM();
        $tora = $rwy->tora?->getM();
        $lda = $rwy->lda?->getM();
        $operations = $rwy->operations->value;

        $insertStatement->bind_param("issddiiiis",
            $airport_id,
            $rwy->name,
            $surface,
            $length,
            $width,
            $rwy->direction,
            $tora,
            $lda,
            $rwy->papi,
            $operations
        );
    }
}
