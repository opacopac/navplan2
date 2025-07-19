<?php declare(strict_types=1);

namespace Navplan\Webcam\Persistence\Query;

use Navplan\Common\Domain\Model\Extent2d;
use Navplan\System\Db\Domain\Service\IDbService;
use Navplan\System\DbQueryBuilder\Domain\Model\DbWhereOp;
use Navplan\System\DbQueryBuilder\Domain\Model\DbWhereSimple;
use Navplan\Webcam\Domain\Query\IWebcamByExtentQuery;
use Navplan\Webcam\Persistence\Model\DbTableWebcam;
use Navplan\Webcam\Persistence\Model\DbWebcamConverter;


class DbWebcamByExtentQuery implements IWebcamByExtentQuery
{
    public function __construct(
        private readonly IDbService $dbService
    )
    {
    }


    public function search(Extent2d $extent): array
    {
        $query = $this->dbService->getQueryBuilder()
            ->selectAllFrom(DbTableWebcam::TABLE_NAME)
            ->whereAll(
                DbWhereSimple::create(DbTableWebcam::COL_AD_ICAO, DbWhereOp::EQ, NULL),
                DbWhereSimple::create(DbTableWebcam::COL_LON, DbWhereOp::GT_OR_E, $extent->minPos->longitude),
                DbWhereSimple::create(DbTableWebcam::COL_LON, DbWhereOp::LT_OR_E, $extent->maxPos->longitude),
                DbWhereSimple::create(DbTableWebcam::COL_LAT, DbWhereOp::GT_OR_E, $extent->minPos->latitude),
                DbWhereSimple::create(DbTableWebcam::COL_LAT, DbWhereOp::LT_OR_E, $extent->maxPos->latitude)
            )
            ->build();

        $result = $this->dbService->execMultiResultQuery($query, "error while searching webcams by extent");

        return DbWebcamConverter::fromDbResult($result);
    }
}
