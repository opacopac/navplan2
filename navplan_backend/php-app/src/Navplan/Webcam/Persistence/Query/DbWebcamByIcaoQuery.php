<?php declare(strict_types=1);

namespace Navplan\Webcam\Persistence\Query;

use Navplan\System\Db\Domain\Service\IDbService;
use Navplan\Webcam\Domain\Query\IWebcamByIcaoQuery;
use Navplan\Webcam\Persistence\Model\DbTableWebcam;
use Navplan\Webcam\Persistence\Model\DbWebcamConverter;


class DbWebcamByIcaoQuery implements IWebcamByIcaoQuery
{
    public function __construct(
        private readonly IDbService $dbService
    )
    {
    }


    public function read(string $airportIcao): array
    {
        $query = $this->dbService->getQueryBuilder()
            ->selectAllFrom(DbTableWebcam::TABLE_NAME)
            ->whereEquals(DbTableWebcam::COL_AD_ICAO, $airportIcao)
            ->build();

        $result = $this->dbService->execMultiResultQuery($query, "error reading webcams for airport $airportIcao");
        $converter = new DbWebcamConverter(new DbTableWebcam());

        return $converter->fromDbResult($result);
    }
}
