<?php declare(strict_types=1);

namespace Navplan\Webcam\Persistence\Query;

use Navplan\Common\Domain\Model\Extent2d;
use Navplan\System\Db\Domain\Service\IDbService;
use Navplan\System\DbQueryBuilder\Domain\Model\DbCondMulti;
use Navplan\System\DbQueryBuilder\Domain\Model\DbCondOp;
use Navplan\System\DbQueryBuilder\Domain\Model\DbCondSimple;
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
            ->where(DbCondMulti::all(
                DbCondSimple::equals(DbTableWebcam::COL_AD_ICAO, NULL),
                DbCondSimple::create(DbTableWebcam::COL_LON, DbCondOp::GT_OR_E, $extent->minPos->longitude),
                DbCondSimple::create(DbTableWebcam::COL_LON, DbCondOp::LT_OR_E, $extent->maxPos->longitude),
                DbCondSimple::create(DbTableWebcam::COL_LAT, DbCondOp::GT_OR_E, $extent->minPos->latitude),
                DbCondSimple::create(DbTableWebcam::COL_LAT, DbCondOp::LT_OR_E, $extent->maxPos->latitude)
            ))
            ->build();

        $result = $this->dbService->execMultiResultQuery($query, "error while searching webcams by extent");
        $converter = new DbWebcamConverter(new DbTableWebcam());

        return $converter->fromDbResult($result);
    }
}
