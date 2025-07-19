<?php declare(strict_types=1);

namespace Navplan\Webcam\Persistence\Model;

use Navplan\Common\Persistence\Model\DbPosition2dConverter;
use Navplan\System\Db\Domain\Model\IDbResult;
use Navplan\Webcam\Domain\Model\Webcam;


class DbWebcamConverter
{
    /**
     * @param IDbResult $result
     * @return Webcam[]
     */
    public static function fromDbResult(IDbResult $result): array
    {
        $reportingPoints = [];
        while ($row = $result->fetch_assoc()) {
            $reportingPoints[] = self::fromDbRow($row);
        }
        return $reportingPoints;
    }


    public static function fromDbRow(array $row): Webcam
    {
        return new Webcam(
            $row[DbTableWebcam::COL_NAME],
            $row[DbTableWebcam::COL_URL],
            DbPosition2dConverter::fromDbRow($row),
            $row[DbTableWebcam::COL_AD_ICAO]
        );
    }
}
