<?php declare(strict_types=1);

namespace Navplan\Webcam\DbModel;

use Navplan\Common\DbModel\DbPosition2dConverter;
use Navplan\Webcam\DomainModel\Webcam;


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
