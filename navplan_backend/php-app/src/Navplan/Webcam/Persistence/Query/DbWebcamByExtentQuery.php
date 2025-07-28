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


readonly class DbWebcamByExtentQuery implements IWebcamByExtentQuery
{
    public function __construct(
        private IDbService $dbService
    )
    {
    }


    public function search(Extent2d $extent): array
    {
        $t = new DbTableWebcam();
        $query = $this->dbService->getQueryBuilder()
            ->selectAllFrom($t)
            ->where(DbCondMulti::all(
                DbCondSimple::equals($t->colAdIcao(), NULL),
                DbCondSimple::create($t->colLon(), DbCondOp::GT_OR_E, $extent->minPos->longitude),
                DbCondSimple::create($t->colLon(), DbCondOp::LT_OR_E, $extent->maxPos->longitude),
                DbCondSimple::create($t->colLat(), DbCondOp::GT_OR_E, $extent->minPos->latitude),
                DbCondSimple::create($t->colLat(), DbCondOp::LT_OR_E, $extent->maxPos->latitude)
            ))
            ->build();

        $result = $this->dbService->execMultiResultQuery($query, "error while searching webcams by extent");
        $converter = new DbWebcamConverter($t);

        return $converter->fromDbResult($result);
    }
}
