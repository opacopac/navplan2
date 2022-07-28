<?php declare(strict_types=1);

namespace Navplan\Webcam\Persistence\Model;

use Navplan\Common\DbModel\DbPosition2dConverter;
use Navplan\Webcam\Domain\Model\Webcam;


class DbWebcamConverter {
    public static function fromDbRow(array $row): Webcam {
        return new Webcam(
            $row["name"],
            $row["url"],
            DbPosition2dConverter::fromDbRow($row),
            $row["airport_icao"]
        );
    }
}
